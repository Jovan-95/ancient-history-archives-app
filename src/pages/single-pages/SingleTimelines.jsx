/* eslint-disable no-unused-vars */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  showSuccessToast,
  showErrorToast,
  showInfoToast,
} from "../../components/Toast";
import getUsers, {
  addBookmarkToUserTimeline,
  addLikeToTimelines,
  addLikeToUserTimelines,
  getComments,
  getTimelines,
  postComment,
} from "../../services";
import { useState } from "react";
import { useSelector } from "react-redux";

function SingleTimelines() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState("");
  const [nickname, setNickname] = useState("");
  const queryClient = useQueryClient();

  // ReactQuery HTTP Get timelines
  const {
    data: timelinesData,
    isLoading: timelinesIsLoading,
    error: timelinesError,
  } = useQuery({
    queryKey: ["timelines"],
    queryFn: getTimelines,
  });

  // ReactQuery HTTP Get Comments
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
  const { mutate: bookmarkTimeline, isPending: bookmarkIsPending } =
    useMutation({
      mutationFn: ({ userId, updatedBookmarks }) =>
        addBookmarkToUserTimeline(userId, updatedBookmarks),
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]); // osvežava users podatke
      },
    });

  // HTTP ReactQuery PATCH method (like)
  const { mutate: likeTimeline, isPending: likeIsPending } = useMutation({
    mutationFn: ({ userId, updatedLikes }) =>
      addLikeToUserTimelines(userId, updatedLikes),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]); // osvežava users podatke
    },
  });

  // HTTP ReactQuery PATCH method for timleine object edit (increase like)
  const { mutate: likeTimelineIncrease } = useMutation({
    mutationFn: ({ timelineId, updatedLikesNum }) =>
      addLikeToTimelines(timelineId, updatedLikesNum),
    onSuccess: () => {
      queryClient.invalidateQueries(["timelines"]);
    },
  });

  // Temporary test for logged user
  const loggedUser = useSelector((state) => state.auth.loggedInUser);

  // HTTP loading and error
  if (timelinesIsLoading || commentsIsLoading || usersIsLoading) return <p></p>;
  if (timelinesError || commentsError || usersError)
    return <p>Error loading data.</p>;

  // Finding clicked timeline card through comparation with param ID
  const singleTimeline = timelinesData.find((timeline) => timeline.id === id);

  // Finding comment for this specific timeline with ID comparation
  const timelinesComments = commentsData.filter(
    (comment) => comment.timelineId === singleTimeline.id
  );

  // Sort by newest
  const sortedTlComments = [...timelinesComments].reverse();

  // Comment posting
  function handleCommentPosting() {
    // console.log("Currently logged user:", loggedUser);

    // Post HTTP request form services and object sending
    commentMutation.mutate({
      nickname: nickname,
      text: commentText,
      timelineId: singleTimeline.id,
      userId: loggedUser.id,
      createdAt: new Date().toISOString(),
      artifactId: "",
      collectionId: "",
    });
  }

  // Finding logged user on backend for editing
  const patchedUser = usersData.find((user) => user.id === loggedUser.id);

  // Bookmarks
  function handleBookmark() {
    // Check for already bookmarked (duplicates)
    const alreadyBookmarked = patchedUser.bookmarksTimelines.find(
      (bookmark) => bookmark === singleTimeline.id
    );

    // Prevent duplicates bookmarks
    if (alreadyBookmarked) {
      return showInfoToast("You already bookmarked this one!");
    }

    const updatedBookmarks = [
      ...patchedUser.bookmarksTimelines,
      singleTimeline.id,
    ];

    // PATCH call
    bookmarkTimeline({
      userId: patchedUser.id,
      updatedBookmarks,
    });
    showSuccessToast("Item bookmarked!");
  }

  // Like
  function handleLike() {
    // Check for already Liked (duplicates)
    const alreadyLiked = patchedUser.likesTimelines.find(
      (like) => like === singleTimeline.id
    );

    // Prevent duplicates Liked
    if (alreadyLiked) {
      return showInfoToast("You already liked this one!");
    }

    const updatedLikes = [...patchedUser.likesTimelines, singleTimeline.id];

    // PATCH call
    likeTimeline({
      userId: patchedUser.id,
      updatedLikes,
    });

    const updatedLikesNum = singleTimeline.likes + 1;

    // PATCH call
    likeTimelineIncrease({
      timelineId: singleTimeline.id,
      updatedLikesNum,
    });
    showSuccessToast("Item liked!");
  }

  return (
    <>
      <div className="single-page">
        <div className="single-page__header">
          <h2 className="single-page__title">{singleTimeline.title}</h2>
        </div>
        <div className="single-page__content">
          <div className="single-page__text">
            {singleTimeline.events.map((event) => (
              <div key={event.title}>
                Year: {event.year} {event.title}
              </div>
            ))}
          </div>
          <p className="single-page__text">
            <strong>Likes:</strong> {singleTimeline.likes}
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
          {sortedTlComments.map((comment) => (
            <div className="comment-wrapper" key={comment.id}>
              <div className="user-id">
                <strong>Nickname : {comment.nickname}</strong>
              </div>
              <div className="comment-text">{comment.text}</div>
              <div className="comment-id">
                <strong>{new Date(comment.createdAt).toLocaleString()}</strong>
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

export default SingleTimelines;
