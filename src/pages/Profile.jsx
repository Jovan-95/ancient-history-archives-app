/* eslint-disable no-unused-vars */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import getUsers, {
  getArtifacts,
  getCollections,
  getTimelines,
  removeArtifactFromBookmarks,
  removeArtifactFromLikes,
  removeCollectionFromBookmarks,
  removeCollectionFromLikes,
  removeTimelineFromBookmarks,
  removeTimelineFromLikes,
} from "../services";
import { useState } from "react";
import ProfileCard from "../components/profile-components/ProfileCard";
import UserCard from "../components/profile-components/UserCard";
import {
  showSuccessToast,
  showErrorToast,
  showInfoToast,
} from "../components/Toast";

function Profile() {
  // Logged user from redux
  const loggedUser = useSelector((state) => state.auth.loggedInUser);
  const queryClient = useQueryClient();
  const [avatarImg, setAvatarImg] = useState();
  const [showAvatars, setShowAvatars] = useState(false);

  // ReactQuery Get users
  const {
    data: usersData,
    isLoading: usersIsLoading,
    error: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  // ReactQuery Get artifacts
  const {
    data: artifactsData,
    isLoading: artifactsIsLoading,
    error: artifactsError,
  } = useQuery({
    queryKey: ["artifacts"],
    queryFn: getArtifacts,
  });

  // ReactQuery Get collections
  const {
    data: collectionsData,
    isLoading: collectionsIsLoading,
    error: collectionsError,
  } = useQuery({
    queryKey: ["collections"],
    queryFn: getCollections,
  });

  // ReactQuery Get timelines
  const {
    data: timelinesData,
    isLoading: timelinesIsLoading,
    error: timelinesError,
  } = useQuery({
    queryKey: ["timelines"],
    queryFn: getTimelines,
  });

  // Patch HTTP method calling
  const { mutate: bookmarkArtifact } = useMutation({
    mutationFn: ({ userId, updatedBookmarks }) =>
      removeArtifactFromBookmarks(userId, updatedBookmarks),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]); // osvežava users podatke
    },
  });

  // Patch HTTP method calling
  const { mutate: bookmarkCollection } = useMutation({
    mutationFn: ({ userId, updatedBookmarks }) =>
      removeCollectionFromBookmarks(userId, updatedBookmarks),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]); // osvežava users podatke
    },
  });

  // Patch HTTP method calling
  const { mutate: bookmarkTimeline } = useMutation({
    mutationFn: ({ userId, updatedBookmarks }) =>
      removeTimelineFromBookmarks(userId, updatedBookmarks),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]); // osvežava users podatke
    },
  });

  // Patch HTTP method calling
  const { mutate: likesArtifact } = useMutation({
    mutationFn: ({ userId, updatedLikes }) =>
      removeArtifactFromLikes(userId, updatedLikes),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]); // osvežava users podatke
    },
  });

  // Patch HTTP method calling
  const { mutate: likesCollection } = useMutation({
    mutationFn: ({ userId, updatedLikes }) =>
      removeCollectionFromLikes(userId, updatedLikes),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]); // osvežava users podatke
    },
  });

  // Patch HTTP method calling
  const { mutate: likesTimeline } = useMutation({
    mutationFn: ({ userId, updatedLikes }) =>
      removeTimelineFromLikes(userId, updatedLikes),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]); // osvežava users podatke
    },
  });

  // HTTP loading and error
  if (
    usersIsLoading ||
    artifactsIsLoading ||
    collectionsIsLoading ||
    timelinesIsLoading
  )
    return <p>Loading...</p>;
  if (usersError || artifactsError || collectionsError || timelinesError)
    return <p>Error loading data.</p>;

  // Finding logged user on backend by comparing with logged user from redux
  const user = usersData.find((user) => user.id === loggedUser.id);

  // Create new array with user bookmark artifact
  const userBookmarkedArtifacts = artifactsData.filter((artifact) =>
    user.bookmarksArtifacts?.includes(String(artifact.id))
  );

  // Create new array with user liked artifact
  const userLikedArtifacts = artifactsData.filter((artifact) =>
    user.likesArtifacts?.includes(String(artifact.id))
  );

  // Create new array with user bookmark collections
  const userBookmarkedCollections = collectionsData.filter((collection) =>
    user.bookmarksCollections?.includes(String(collection.id))
  );

  // Create new array with user like collections
  const userLikedCollections = collectionsData.filter((collection) =>
    user.likesCollections?.includes(String(collection.id))
  );

  // Create new array with user bookmark timelines
  const userBookmarkedTimelines = timelinesData.filter((timeline) =>
    user.bookmarksTimelines?.includes(String(timeline.id))
  );

  // Create new array with user like timelines
  const userLikedTimelines = timelinesData.filter((timeline) =>
    user.likesTimelines?.includes(String(timeline.id))
  );

  // Removing artifact from bookmarks array
  function handleRemoveBookmarksFromUserArtifacts(artifact) {
    // Patch method calling
    bookmarkArtifact({
      userId: user.id,
      updatedBookmarks: user.bookmarksArtifacts.filter(
        (id) => id !== String(artifact.id)
      ),
    });
    showSuccessToast("Bookmark removed!");
  }

  // Removing collection from bookmarks array
  function handleRemoveBookmarksFromUserCollections(collection) {
    bookmarkCollection({
      userId: user.id,
      updatedBookmarks: user.bookmarksCollections.filter(
        (id) => id !== String(collection.id)
      ),
    });
    showSuccessToast("Bookmark removed!");
  }

  // Removing timeline from bookmarks array
  function handleRemoveBookmarksFromUserTimelines(timeline) {
    bookmarkTimeline({
      userId: user.id,
      updatedBookmarks: user.bookmarksTimelines.filter(
        (id) => id !== String(timeline.id)
      ),
    });
    showSuccessToast("Bookmark removed!");
  }

  // Removing artifact from likes array
  function handleRemoveLikesFromUserArtifacts(artifact) {
    likesArtifact({
      userId: user.id,
      updatedLikes: user.likesArtifacts.filter(
        (id) => id !== String(artifact.id)
      ),
    });
    showSuccessToast("Like removed!");
  }

  // Removing collection from likes array
  function handleRemoveLikesFromUserCollection(collection) {
    likesCollection({
      userId: user.id,
      updatedLikes: user.likesCollections.filter(
        (id) => id !== String(collection.id)
      ),
    });
    showSuccessToast("Like removed!");
  }

  // Removing timeline from likes array
  function handleRemoveLikesFromUserTimeline(timeline) {
    likesTimeline({
      userId: user.id,
      updatedLikes: user.likesTimelines.filter(
        (id) => id !== String(timeline.id)
      ),
    });
    showSuccessToast("Like removed!");
  }

  return (
    <>
      <div className="profile-page">
        <ProfileCard
          showAvatars={showAvatars}
          user={user}
          avatarImg={avatarImg}
          setShowAvatars={setShowAvatars}
          setAvatarImg={setAvatarImg}
        />
        <section className="user-section">
          <h3>Bookmarked Artifacts:</h3>
          <div className="card-list" id="bookmarkedList">
            {/* <!-- Bookmark kartice --> */}
            {userBookmarkedArtifacts.map((el) => (
              <div key={el.id}>
                {el.title}{" "}
                <button
                  onClick={() => handleRemoveBookmarksFromUserArtifacts(el)}
                  className="btn btn--cta"
                >
                  Remove from bookmarks
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="user-section">
          <h3>Bookmarked Collections:</h3>
          <div className="card-list" id="bookmarkedList">
            {/* <!-- Bookmark kartice --> */}
            {userBookmarkedCollections.map((el) => (
              <div key={el.id}>
                {el.title}{" "}
                <button
                  onClick={() => handleRemoveBookmarksFromUserCollections(el)}
                  className="btn btn--cta"
                >
                  Remove from bookmarks
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="user-section">
          <h3>Bookmarked Timelines:</h3>
          <div className="card-list" id="bookmarkedList">
            {/* <!-- Bookmark kartice --> */}
            {userBookmarkedTimelines.map((el) => (
              <div key={el.id}>
                {el.title}{" "}
                <button
                  onClick={() => handleRemoveBookmarksFromUserTimelines(el)}
                  className="btn btn--cta"
                >
                  Remove from bookmarks
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="user-section">
          <h3>Liked Artifacts:</h3>
          <div className="card-list" id="likedList">
            {/* <!-- Liked kartice --> */}
            {userLikedArtifacts.map((el) => (
              <div key={el.id}>
                {el.title}
                <button
                  onClick={() => handleRemoveLikesFromUserArtifacts(el)}
                  className="btn btn--cta"
                >
                  Remove from likes
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="user-section">
          <h3>Liked Collections:</h3>
          <div className="card-list" id="likedList">
            {/* <!-- Liked kartice --> */}
            {userLikedCollections.map((el) => (
              <div key={el.id}>
                {el.title}{" "}
                <button
                  onClick={() => handleRemoveLikesFromUserCollection(el)}
                  className="btn btn--cta"
                >
                  Remove from likes
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="user-section">
          <h3>Liked Timelines:</h3>
          <div className="card-list" id="likedList">
            {/* <!-- Liked kartice --> */}
            {userLikedTimelines.map((el) => (
              <div key={el.id}>
                {el.title}{" "}
                <button
                  onClick={() => handleRemoveLikesFromUserTimeline(el)}
                  className="btn btn--cta"
                >
                  Remove from likes
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="all-users">
          <h2>Other Users</h2>
          <div className="user-cards" id="userCards">
            {/* <!-- Kartice drugih korisnika --> */}
            {usersData.map((el) => (
              <UserCard key={el.id} el={el} user={user} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default Profile;
