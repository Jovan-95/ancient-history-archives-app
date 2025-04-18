/* eslint-disable no-unused-vars */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getArtifacts, getComments, postComment } from "../../services";
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
  if (artifactsIsLoading || commentsIsLoading) return <p>Loading...</p>;
  if (artifactsError || commentsError) return <p>Error loading data.</p>;

  // After HTTP loads we determine correct ID
  const singleArtifact = artifactsData.find((artifact) => artifact.id === id);

  // Finding comment for this specific artifact with ID comparation
  const artifactComments = commentsData.filter(
    (comment) => comment.artifactId === Number(singleArtifact.id)
  );

  // Comment posting
  function handleCommentPosting() {
    // console.log("Currently logged user:", loggedUser);

    // Post HTTP request form services and object sending
    commentMutation.mutate({
      nickname: nickname,
      text: commentText,
      artifactId: Number(singleArtifact.id),
      userId: loggedUser.id,
      createdAt: new Date().toISOString(),
    });
  }

  // Bookmark this artifact
  function handleBookmark() {
    console.log("Bookmark!", singleArtifact);
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
            <strong>Discovered:</strong> {singleArtifact.createdAt}
          </p>
          <p>
            <strong>Type ID : {singleArtifact.id}</strong>{" "}
          </p>
          <p>
            <strong>Likes : {singleArtifact.likes}</strong>{" "}
          </p>
        </div>
        <div>
          <button className="btn btn--cta">Like</button>
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
          {artifactComments.map((comment) => (
            <div className="comment-wrapper" key={comment.id}>
              <div className="type-id">
                <strong>Artifact (type) ID : {comment.artifactId}</strong>{" "}
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

export default SingleArtifact;
