/* eslint-disable no-unused-vars */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  showSuccessToast,
  showErrorToast,
  showInfoToast,
} from "../../components/Toast";
import getUsers, {
  addBookmarkToUserArtifact,
  addLikeToArtifact,
  addLikeToUserArtifact,
  getArtifacts,
  getComments,
  postComment,
} from "../../services";
import { useState } from "react";
import { useSelector } from "react-redux";

function SingleArtifact() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [commentText, setCommentText] = useState("");
  const [nickname, setNickname] = useState("");

  // ReactQuery Get artifacts
  const {
    data: artifactsData,
    isLoading: artifactsIsLoading,
    error: artifactsError,
  } = useQuery({
    queryKey: ["artifacts"],
    queryFn: getArtifacts,
  });

  // ReactQuery Get comments
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

  // HTTP ReactQuery POST method
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
  const { mutate: bookmarkArtifact, isPending: bookmarkIsPending } =
    useMutation({
      mutationFn: ({ userId, updatedBookmarks }) =>
        addBookmarkToUserArtifact(userId, updatedBookmarks),
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]); // osvežava users podatke
      },
    });

  // HTTP ReactQuery PATCH method (like)
  const { mutate: likeArtifact, isPending: likeIsPending } = useMutation({
    mutationFn: ({ userId, updatedLikes }) =>
      addLikeToUserArtifact(userId, updatedLikes),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]); // osvežava users podatke
    },
  });

  // HTTP ReactQuery PATCH method for artifact object edit (increase like)
  const { mutate: likeArtifactIncrease } = useMutation({
    mutationFn: ({ artifactsId, updatedLikesNum }) =>
      addLikeToArtifact(artifactsId, updatedLikesNum),
    onSuccess: () => {
      queryClient.invalidateQueries(["artifacts"]);
    },
  });

  // Logged user from local storage
  const loggedUser = useSelector((state) => state.auth.loggedInUser);

  // HTTP loading and error
  if (artifactsIsLoading || commentsIsLoading || usersIsLoading) return <p></p>;
  if (artifactsError || commentsError || usersError)
    return <p>Error loading data.</p>;

  // After HTTP loads we determine correct ID
  const singleArtifact = artifactsData.find((artifact) => artifact.id === id);

  // Finding comment for this specific artifact with ID comparation
  const artifactComments = commentsData.filter(
    (comment) => comment.artifactId === singleArtifact.id
  );

  // Sort by newest
  const sortedArtComments = [...artifactComments].reverse();

  // console.log("singleArt", singleArtifact);

  // Comment posting
  function handleCommentPosting() {
    // console.log("Currently logged user:", loggedUser);

    // Post HTTP method calling
    commentMutation.mutate({
      nickname: nickname,
      text: commentText,
      artifactId: singleArtifact.id,
      userId: loggedUser.id,
      createdAt: new Date().toISOString(),
      timelineId: "",
      collectionId: "",
    });
  }

  // Finding logged user on backend for editing
  const patchedUser = usersData.find((user) => user.id === loggedUser.id);

  // Bookmark artifact
  function handleBookmark() {
    // console.log("Bookmark!", singleArtifact);
    // console.log("Users", usersData);
    // console.log("Current user", patchedUser);

    // Check for already bookmarked (duplicates)
    const alreadyBookmarked = patchedUser.bookmarksArtifacts.find(
      (bookmark) => bookmark === singleArtifact.id
    );

    // Prevent duplicates bookmarks
    if (alreadyBookmarked) {
      return showInfoToast("You already bookmarked this one!");
    }

    // We keep artifactId and use it on other page to list artifact object
    const updatedBookmarks = [
      ...patchedUser.bookmarksArtifacts,
      singleArtifact.id,
    ];

    // Patch method calling
    bookmarkArtifact({
      userId: patchedUser.id,
      updatedBookmarks,
    });
    showSuccessToast("Item bookmarked!");
  }

  // Like artifact
  function handleLike() {
    // Check for already liked (duplicates)
    const alreadyLiked = patchedUser?.likesArtifacts?.find(
      (like) => like === singleArtifact.id
    );

    // Prevent duplicates bookmarks
    if (alreadyLiked) {
      return showInfoToast("You already liked this one!");
    }

    // We keep artifactId and use it on other page to list artifact object
    const updatedLikes = [...patchedUser.likesArtifacts, singleArtifact.id];

    // Patch method calling
    likeArtifact({
      userId: patchedUser.id,
      updatedLikes,
    });

    const updatedLikesNum = Number(singleArtifact.likes) + 1;
    console.log(updatedLikesNum);

    // Patch method calling
    likeArtifactIncrease({
      artifactsId: singleArtifact.id,
      updatedLikesNum,
    });
    showSuccessToast("Item liked!");
  }
  return (
    <>
      <div className="single-page">
        <div className="single-page__header">
          <h2 className="single-page__title">{singleArtifact.title}</h2>
        </div>
        <div className="single-page__content">
          <p className="single-page__text">{singleArtifact.description}</p>
          <p className="single-page__text">
            <strong>Period:</strong> {singleArtifact.period}
          </p>
          <p className="single-page__text">
            <strong>Region:</strong> {singleArtifact.region}
          </p>
          <p className="single-page__text">
            <strong>Discovered:</strong>{" "}
            {new Date(singleArtifact.createdAt).toLocaleString()}
          </p>

          <p>
            <strong>Likes : {singleArtifact.likes}</strong>{" "}
          </p>
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
          {sortedArtComments.map((comment) => (
            <div className="comment-wrapper" key={comment.id}>
              <div className="user-id">
                <strong>Nickname : {comment.nickname}</strong>
              </div>
              <div className="comment-text">{comment.text}</div>
              <div className="comment-id">
                <strong> {new Date(comment.createdAt).toLocaleString()}</strong>
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

export default SingleArtifact;
