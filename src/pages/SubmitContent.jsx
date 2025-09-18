/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import {
  addArtifact,
  addCollection,
  addEmpire,
  addFigures,
  addTimeline,
} from "../services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  showSuccessToast,
  showErrorToast,
  showInfoToast,
} from "../components/Toast";

function SubmitContent() {
  const loggedUser = useSelector((state) => state.auth.loggedInUser);
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [period, setPeriod] = useState("");
  const [region, setRegion] = useState("");

  const [activeTab, setActiveTab] = useState("");

  const [eventObj, setEventObj] = useState({ year: "", title: "" });

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
      showSuccessToast("Collection is submited!");

      setTitle("");
      setDesc("");
    },
  });

  // HTTP ReactQuery POST method
  const addTimelineMutation = useMutation({
    mutationFn: addTimeline,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["timelines"] });
      setTitle("");
      setEventObj({ year: "", title: "" });
      showSuccessToast("Timeline is submited!");
    },
  });

  // HTTP ReactQuery POST method
  const addEmpireMutation = useMutation({
    mutationFn: addEmpire,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["empires"] });
      showSuccessToast("Empire is submited!");
      setTitle("");
      setDesc("");
      setPeriod("");
      setRegion("");
    },
  });

  // HTTP ReactQuery POST method
  const addFigureMutation = useMutation({
    mutationFn: addFigures,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["figures"] });
      setTitle("");
      setDesc("");
      setPeriod("");
      setRegion("");
      showSuccessToast("Figure is submited!");
    },
  });

  function handleArtifactSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !desc.trim()) {
      showErrorToast("Please fill out all required fields.");
      return;
    }

    // Post HTTP method calling
    addArtifactMutation.mutate({
      title: title,
      description: desc,
      period: period,
      region: region,
      userId: loggedUser.id,
      createdAt: new Date().toISOString(),
      likes: [],
      status: "pending",
    });
    showSuccessToast("Artifact is submited!");
  }

  function handleCollectionSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !desc.trim()) {
      showErrorToast("Please fill out all required fields.");
      return;
    }

    // Post HTTP method calling
    addCollectionMutation.mutate({
      title: title,
      description: desc,
      createdBy: loggedUser.id,
      createdAt: new Date().toISOString(),
      likes: 0,
      status: "pending",
    });
  }

  function handleTimelineSubmit(e) {
    e.preventDefault();

    if (!title.trim()) {
      showErrorToast("Please fill out all required fields.");
      return;
    }

    const newTimelineObj = {
      title: title,
      createdBy: loggedUser.id,
      createdAt: new Date().toISOString(),
      likes: 0,
      events: [{ year: eventObj.year, title: eventObj.title }],
      status: "pending",
    };
    // Post HTTP method calling
    addTimelineMutation.mutate(newTimelineObj);
  }

  function handleEmpireSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !desc.trim()) {
      showErrorToast("Please fill out all required fields.");
      return;
    }

    addEmpireMutation.mutate({
      name: title, //
      description: desc, //
      era: period, //
      region: region, //
      createdAt: new Date().toISOString(), //
      status: "pending", //
    });
  }

  function handleFigureSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !desc.trim()) {
      showErrorToast("Please fill out all required fields.");
      return;
    }
    addFigureMutation.mutate({
      name: title,
      knownFor: desc,
      era: period,
      region: region,
      createdAt: new Date().toISOString(),
      status: "pending",
    });
  }

  function handleFormShowing(e) {
    const tabName = e.target.textContent;
    setActiveTab(tabName.toLowerCase());
  }

  return (
    <div className="p-16">
      <h2>Create & submit content</h2>{" "}
      <div className="submit-content-forms">
        <button onClick={(e) => handleFormShowing(e)} className="btn">
          Create Artifact
        </button>
        <button onClick={(e) => handleFormShowing(e)} className="btn ml-4">
          Create Collection
        </button>
        <button onClick={(e) => handleFormShowing(e)} className="btn ml-4">
          Create Timeline
        </button>
        <button onClick={(e) => handleFormShowing(e)} className="btn ml-4">
          Create Empire
        </button>
        <button onClick={(e) => handleFormShowing(e)} className="btn ml-4">
          Create Figure
        </button>
      </div>
      {/* Artifacts form */}
      {activeTab === "create artifact" && (
        <div className="form-wrapper">
          <h3>New Artifact</h3>
          <form className="auth-form">
            <div className="auth-field">
              <label className="auth-label">Title</label>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                name="username"
                className="auth-input"
              />
            </div>
            <div className="comment-post__group">
              <label className="comment-post__label">Description:</label>
              <textarea
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
                className="comment-post__textarea"
              />
            </div>

            <div className="auth-field">
              <label className="auth-label">Period</label>
              <input
                onChange={(e) => setPeriod(e.target.value)}
                value={period}
                type="text"
                name="email"
                className="auth-input"
              />
            </div>

            <div className="auth-field">
              <label className="auth-label">Region</label>
              <input
                onChange={(e) => setRegion(e.target.value)}
                value={region}
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
        <div className="form-wrapper">
          <h3>New Collection</h3>
          <form className="auth-form">
            <div className="auth-field">
              <label className="auth-label">Title</label>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                name="username"
                className="auth-input"
              />
            </div>
            <div className="comment-post__group">
              <label className="comment-post__label">Description:</label>
              <textarea
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
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
      {/* Timelines form */}
      {activeTab === "create timeline" && (
        <div className="form-wrapper">
          <h3>New Timeline</h3>
          <form className="auth-form">
            <div className="auth-field">
              <label className="auth-label">Title</label>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                className="auth-input"
              />
            </div>

            <div className="auth-field">
              <label className="auth-label">Year</label>
              <input
                onChange={(e) =>
                  setEventObj({ ...eventObj, year: e.target.value })
                }
                value={eventObj.year}
                type="number"
                className="auth-input"
              />
              <label className="auth-label">Event</label>

              <input
                onChange={(e) =>
                  setEventObj({ ...eventObj, title: e.target.value })
                }
                value={eventObj.title}
                type="text"
                className="auth-input mt-16"
              />
            </div>

            <button
              onClick={handleTimelineSubmit}
              type="submit"
              className="btn btn--auth"
            >
              Submit
            </button>
          </form>
        </div>
      )}
      {/* Empire form */}
      {activeTab === "create empire" && (
        <div className="form-wrapper">
          <h3>New Empire</h3>
          <form className="auth-form">
            <div className="auth-field">
              <label className="auth-label">Title</label>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                className="auth-input"
              />
            </div>
            <div className="comment-post__group">
              <label className="comment-post__label">Description:</label>
              <textarea
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
                className="comment-post__textarea"
              />
            </div>

            <div className="auth-field">
              <label className="auth-label">Period</label>
              <input
                onChange={(e) => setPeriod(e.target.value)}
                value={period}
                type="text"
                name="email"
                className="auth-input"
              />
            </div>

            <div className="auth-field">
              <label className="auth-label">Region</label>
              <input
                onChange={(e) => setRegion(e.target.value)}
                value={region}
                type="text"
                name="password"
                className="auth-input"
              />
            </div>

            <button
              onClick={handleEmpireSubmit}
              type="submit"
              className="btn btn--auth"
            >
              Submit
            </button>
          </form>
        </div>
      )}
      {/* Figure form */}
      {activeTab === "create figure" && (
        <div className="form-wrapper">
          <h3>New Figure</h3>
          <form className="auth-form">
            <div className="auth-field">
              <label className="auth-label">Title</label>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                className="auth-input"
              />
            </div>
            <div className="comment-post__group">
              <label className="comment-post__label">Description:</label>
              <textarea
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
                className="comment-post__textarea"
              />
            </div>

            <div className="auth-field">
              <label className="auth-label">Period</label>
              <input
                onChange={(e) => setPeriod(e.target.value)}
                value={period}
                type="text"
                name="email"
                className="auth-input"
              />
            </div>

            <div className="auth-field">
              <label className="auth-label">Region</label>
              <input
                onChange={(e) => setRegion(e.target.value)}
                value={region}
                type="text"
                name="password"
                className="auth-input"
              />
            </div>

            <button
              onClick={handleFigureSubmit}
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
