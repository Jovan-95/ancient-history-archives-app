/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import { addArtifact, addCollection } from "../services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

function SubmitContent() {
  const loggedUser = useSelector((state) => state.auth.loggedInUser);
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [period, setPeriod] = useState("");
  const [region, setRegion] = useState("");

  const [activeTab, setActiveTab] = useState("");

  // HTTP ReactQuery POST method
  const addArtifactMutation = useMutation({
    mutationFn: addArtifact,
    onSuccess: () => {
      // Automatski refresh komentara posle uspešnog posta
      queryClient.invalidateQueries({ queryKey: ["artifacts"] });
      setTitle("");
      setDesc("");
      setPeriod("");
      setRegion("");
    },
  });

  // HTTP ReactQuery POST method
  const addCollectionMutation = useMutation({
    mutationFn: addCollection,
    onSuccess: () => {
      // Automatski refresh komentara posle uspešnog posta
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      setTitle("");
      setDesc("");
    },
  });

  function handleArtifactSubmit() {
    // Post HTTP method calling
    addArtifactMutation.mutate({
      title: title,
      description: desc,
      period: period,
      region: region,
      id: Date.now().toString(),
      userId: loggedUser.id,
      createdAt: new Date().toISOString(),
      likes: [],
    });
  }

  function handleCollectionSubmit() {
    // Post HTTP method calling
    addCollectionMutation.mutate({
      title: title,
      description: desc,
      id: Date.now().toString(),
      userId: loggedUser.id,
      createdAt: new Date().toISOString(),
      likes: [],
    });
  }

  function handleFormShowing(e) {
    const tabName = e.target.textContent;
    setActiveTab(tabName.toLowerCase());
  }

  return (
    <div>
      <h2>Create & submit content</h2>{" "}
      <div>
        <button onClick={(e) => handleFormShowing(e)} className="btn">
          Create Artifact
        </button>
        <button onClick={(e) => handleFormShowing(e)} className="btn ml-4">
          Create Collection
        </button>
        <button onClick={(e) => handleFormShowing(e)} className="btn ml-4">
          Create Timeline
        </button>
      </div>
      {/* Artifacts form */}
      {activeTab === "create artifact" && (
        <div className="artifact-form-wrapper">
          <h3>New Artifact</h3>
          <form className="auth-form">
            <div className="auth-field">
              <label className="auth-label">Title</label>
              <input
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                name="username"
                className="auth-input"
              />
            </div>
            <div className="comment-post__group">
              <label className="comment-post__label">Description:</label>
              <textarea
                onChange={(e) => setDesc(e.target.value)}
                className="comment-post__textarea"
              />
            </div>

            <div className="auth-field">
              <label className="auth-label">Period</label>
              <input
                onChange={(e) => setPeriod(e.target.value)}
                type="text"
                name="email"
                className="auth-input"
              />
            </div>

            <div className="auth-field">
              <label className="auth-label">Region</label>
              <input
                onChange={(e) => setRegion(e.target.value)}
                type="text"
                name="password"
                className="auth-input"
              />
            </div>

            <button
              onClick={handleArtifactSubmit}
              type="submit"
              className="btn btn--auth"
            >
              Submit
            </button>
          </form>
        </div>
      )}
      {/* Collections form */}
      {activeTab === "create collection" && (
        <div className="artifact-form-wrapper">
          <h3>New Collection</h3>
          <form className="auth-form">
            <div className="auth-field">
              <label className="auth-label">Title</label>
              <input
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                name="username"
                className="auth-input"
              />
            </div>
            <div className="comment-post__group">
              <label className="comment-post__label">Description:</label>
              <textarea
                onChange={(e) => setDesc(e.target.value)}
                className="comment-post__textarea"
              />
            </div>

            <button
              onClick={handleCollectionSubmit}
              type="submit"
              className="btn btn--auth"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default SubmitContent;
