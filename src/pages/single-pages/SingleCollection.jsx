/* eslint-disable no-unused-vars */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getCollections, getComments, postComment } from "../../services";
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

  // Temporary test for logged user
  const loggedUser = useSelector((state) => state.auth.loggedInUser);

  // HTTP loading and error
  if (collectionsIsLoading || commentsIsLoading) return <p>Loading...</p>;
  if (collectionsError || commentsError) return <p>Error loading data.</p>;

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

  return (
    <>
      <div className="single-page">
        <div className="single-page__header">
          <h2 className="single-page__title">{singleCollection.title}</h2>
        </div>
        <div className="single-page__content">
          <p className="single-page__text">{singleCollection.description}</p>
        </div>
        <button onClick={() => navigate("/explore")} className="btn">
          Back
        </button>
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
