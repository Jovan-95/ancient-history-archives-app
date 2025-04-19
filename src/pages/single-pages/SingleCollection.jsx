/* eslint-disable no-unused-vars */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import getUsers, {
  addBookmarkToUserCollection,
  addLikeToCollection,
  addLikeToUserCollection,
  getCollections,
  getComments,
  postComment,
} from "../../services";
import { useState } from "react";
import { useSelector } from "react-redux";

function SingleCollection() {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [commentText, setCommentText] = useState("");
  const [nickname, setNickname] = useState("");

  // ReactQuery GET
  const {
    data: collectionsData,
    isLoading: collectionsIsLoading,
    error: collectionsError,
  } = useQuery({
    queryKey: ["collections"],
    queryFn: getCollections,
  });

  // ReactQuery GET
  const {
    data: commentsData,
    isLoading: commentsIsLoading,
    error: commentsError,
  } = useQuery({
    queryKey: ["comments"],
    queryFn: getComments,
  });

  // ReactQuery Get users
  const {
    data: usersData,
    isLoading: usersIsLoading,
    error: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  // HTTP ReactQuery POST method calling
  const commentMutation = useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      // Automatski refresh komentara posle uspešnog posta
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      setCommentText("");
      setNickname("");
    },
  });

  // HTTP ReactQuery PATCH method (bookmark)
  const { mutate: bookmarkCollection, isPending: bookmarkIsPending } =
    useMutation({
      mutationFn: ({ userId, updatedBookmarks }) =>
        addBookmarkToUserCollection(userId, updatedBookmarks),
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]); // osvežava users podatke
      },
    });

  // HTTP ReactQuery PATCH method (like)
  const { mutate: likeCollection, isPending: likeIsPending } = useMutation({
    mutationFn: ({ userId, updatedLikes }) =>
      addLikeToUserCollection(userId, updatedLikes),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]); // osvežava users podatke
    },
  });

  // HTTP ReactQuery PATCH method for artifact object edit (increase like)
  const { mutate: likeCollectionIncrease } = useMutation({
    mutationFn: ({ collectionId, updatedLikesNum }) =>
      addLikeToCollection(collectionId, updatedLikesNum),
    onSuccess: () => {
      queryClient.invalidateQueries(["collections"]);
    },
  });

  // Temporary test for logged user
  const loggedUser = useSelector((state) => state.auth.loggedInUser);

  // HTTP loading and error
  if (collectionsIsLoading || commentsIsLoading || usersIsLoading)
    return <p>Loading...</p>;
  if (collectionsError || commentsError || usersError)
    return <p>Error loading data.</p>;

  // After HTTP loads we determine correct ID
  const singleCollection = collectionsData.find(
    (collection) => collection.id === id
  );

  // Collection comments
  const collectionComments = commentsData.filter(
    (comment) => comment.collectionId === Number(singleCollection.id)
  );

  // Comment posting
  function handleCommentPosting() {
    // console.log("Currently logged user:", loggedUser);

    // Post HTTP request form services and object sending
    commentMutation.mutate({
      nickname: nickname,
      text: commentText,
      collectionId: Number(singleCollection.id),
      userId: loggedUser.id,
      createdAt: new Date().toISOString(),
    });
  }

  // Finding logged user on backend for editing
  const patchedUser = usersData.find((user) => user.id === loggedUser.id);

  // Bookmarks
  function handleBookmark() {
    // Check for already bookmarked (duplicates)
    const alreadyBookmarked = patchedUser.bookmarksCollections.find(
      (bookmark) => bookmark === singleCollection.id
    );

    // Prevent duplicates bookmarks
    if (alreadyBookmarked) {
      return alert("You already bookmarked this one!");
    }

    const updatedBookmarks = [
      ...patchedUser.bookmarksCollections,
      singleCollection.id,
    ];

    // PATCH call
    bookmarkCollection({
      userId: patchedUser.id,
      updatedBookmarks,
    });
  }

  // Like
  function handleLike() {
    // Check for already Liked (duplicates)
    const alreadyLiked = patchedUser.likesCollections.find(
      (like) => like === singleCollection.id
    );

    // Prevent duplicates Liked
    if (alreadyLiked) {
      return alert("You already liked this one!");
    }

    const updatedLikes = [...patchedUser.likesCollections, singleCollection.id];

    // PATCH call
    likeCollection({
      userId: patchedUser.id,
      updatedLikes,
    });

    const updatedLikesNum = singleCollection.likes + 1;

    // PATCH call
    likeCollectionIncrease({
      collectionId: singleCollection.id,
      updatedLikesNum,
    });
  }

  return (
    <>
      <div className="single-page">
        <div className="single-page__header">
          <h2 className="single-page__title">{singleCollection.title}</h2>
        </div>
        <div className="single-page__content">
          <p className="single-page__text">{singleCollection.description}</p>
          <div className="single-page__text">
            Likes: {singleCollection.likes}
          </div>
        </div>
        <div>
          <button onClick={handleLike} className="btn btn--cta">
            Like
          </button>
          <button onClick={handleBookmark} className="btn btn--cta ml-4">
            Bookmark
          </button>
          <button
            onClick={() => navigate("/explore")}
            className="btn btn--cta ml-4"
          >
            Back
          </button>
        </div>
      </div>

      {/* Listing comments section */}
      <div className="single-page">
        <p className="single-page__text">
          <strong>Comments:</strong>
        </p>
        <div>
          {collectionComments.map((comment) => (
            <div className="comment-wrapper" key={comment.id}>
              <div className="type-id">
                <strong>Collection (type) ID : {comment.collectionId}</strong>{" "}
              </div>
              <div className="comment-id">
                <strong>Comment ID : {comment.id}</strong>
              </div>
              <div className="user-id">
                <strong>User ID : {comment.userId}</strong>
              </div>
              <div className="user-id">
                <strong>Nickname : {comment.nickname}</strong>
              </div>
              <div className="comment-text">{comment.text}</div>
              <div className="comment-id">
                <strong>{comment.createdAt}</strong>
              </div>
            </div>
          ))}
        </div>
        {/* Posting comment section */}
        <div className="comment-post">
          <h2 className="comment-post__title">Post a comment:</h2>

          <div className="comment-post__group">
            <label className="comment-post__label">Nickname:</label>
            <input
              onChange={(e) => setNickname(e.target.value)}
              value={nickname}
              type="text"
              className="comment-post__input"
            />
          </div>

          <div className="comment-post__group">
            <label className="comment-post__label">Your Comment:</label>
            <textarea
              onChange={(e) => setCommentText(e.target.value)}
              value={commentText}
              className="comment-post__textarea"
            />
          </div>

          <button onClick={handleCommentPosting} className="comment-post__btn">
            Post comment
          </button>
        </div>
      </div>
    </>
  );
}

export default SingleCollection;
