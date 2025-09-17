/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */

//// BE routes
// http://localhost:5000/artifacts
// http://localhost:5000/collections
// http://localhost:5000/timelines
// http://localhost:5000/empires
// http://localhost:5000/figures
// http://localhost:5000/comments
// http://localhost:5000/users

import { useState } from "react";

////  Users
// Get HTTP method
export default async function getUsers() {
  try {
    const res = await fetch("http://localhost:5000/users");

    if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

// Post HTTP method
export async function registerUser(user) {
  try {
    const res = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

// Patch HTTP method for partialy editing user object (bookmarkArtifact)
export async function addBookmarkToUserArtifact(userId, updatedBookmarksArray) {
  try {
    const res = await fetch(`http://localhost:5000/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookmarksArtifacts: updatedBookmarksArray }),
    });
    if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

//// Patch HTTP method remove elements from user object array
export async function removeArtifactFromBookmarks(
  userId,
  updatedBookmarksArray
) {
  try {
    const res = await fetch(`http://localhost:5000/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookmarksArtifacts: updatedBookmarksArray }),
    });
    if (!res.ok) {
      throw new Error(`${res.status}, ${res.statusText}`);
    }
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

// Patch HTTP method for partialy editing user object (likesArtifact)
export async function addLikeToUserArtifact(userId, updatedLikesArray) {
  try {
    const res = await fetch(`http://localhost:5000/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likesArtifacts: updatedLikesArray }),
    });
    if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

//// Patch HTTP method remove elements from user object array
export async function removeArtifactFromLikes(userId, updatedLikesArray) {
  try {
    const res = await fetch(`http://localhost:5000/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likesArtifacts: updatedLikesArray }),
    });
    if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

// Patch HTTP method for partialy editing user object (bookmarkCollections)
export async function addBookmarkToUserCollection(
  userId,
  updatedBookmarksArray
) {
  try {
    const res = await fetch(`http://localhost:5000/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookmarksCollections: updatedBookmarksArray }),
    });
    if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

//// Patch HTTP method remove elements from user object array(collections)
export async function removeCollectionFromBookmarks(
  userId,
  updatedBookmarksArray
) {
  try {
    const res = await fetch(`http://localhost:5000/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookmarksCollections: updatedBookmarksArray }),
    });
    if (!res.ok) {
      throw new Error(`${res.status}, ${res.statusText}`);
    }
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

// Patch HTTP method for partialy editing user object (likesCollections)
export async function addLikeToUserCollection(userId, updatedLikesArray) {
  try {
    const res = await fetch(`http://localhost:5000/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likesCollections: updatedLikesArray }),
    });
    if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

//// Patch HTTP method remove elements from user object array(collections)
export async function removeCollectionFromLikes(userId, updatedLikesArray) {
  try {
    const res = await fetch(`http://localhost:5000/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likesCollections: updatedLikesArray }),
    });
    if (!res.ok) {
      throw new Error(`${res.status}, ${res.statusText}`);
    }
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

// Patch HTTP method for partialy editing user object (bookmarkTimelines)
export async function addBookmarkToUserTimeline(userId, updatedBookmarksArray) {
  try {
    const res = await fetch(`http://localhost:5000/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookmarksTimelines: updatedBookmarksArray }),
    });
    if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

//// Patch HTTP method remove elements from user object array(collections)
export async function removeTimelineFromBookmarks(
  userId,
  updatedBookmarksArray
) {
  try {
    const res = await fetch(`http://localhost:5000/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookmarksTimelines: updatedBookmarksArray }),
    });
    if (!res.ok) {
      throw new Error(`${res.status}, ${res.statusText}`);
    }
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

// Patch HTTP method for partialy editing user object (likesTimelines)
export async function addLikeToUserTimelines(userId, updatedLikesArray) {
  try {
    const res = await fetch(`http://localhost:5000/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likesTimelines: updatedLikesArray }),
    });
    if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

//// Patch HTTP method remove elements from user object array(collections)
export async function removeTimelineFromLikes(userId, updatedLikesArray) {
  try {
    const res = await fetch(`http://localhost:5000/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likesTimelines: updatedLikesArray }),
    });
    if (!res.ok) {
      throw new Error(`${res.status}, ${res.statusText}`);
    }
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

//// Patch HTTP method change user avatar
export async function changeUserAvatar(userId, avatarImg) {
  try {
    const res = await fetch(`http://localhost:5000/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ avatar: avatarImg }),
    });
    if (!res.ok) {
      throw new Error(`${res.status}, ${res.statusText}`);
    }
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

//// Patch HTTP method Edit user
export async function editUser(userId, editedObj) {
  try {
    const res = await fetch(`http://localhost:5000/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedObj),
    });
    if (!res.ok) {
      throw new Error(`${res.status}, ${res.statusText}`);
    }
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

//// Patch HTTP method change user role
export async function changeUserRole(id, role) {
  try {
    const res = await fetch(`http://localhost:5000/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role: role }),
    });
    if (!res.ok) {
      throw new Error(`${res.status}, ${res.statusText}`);
    }
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

//// Patch HTTP method change user status (ban, unban)
export async function changeUserStatus(id, status) {
  try {
    const res = await fetch(`http://localhost:5000/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: status }),
    });
    if (!res.ok) {
      throw new Error(`${res.status}, ${res.statusText}`);
    }
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

//// Patch HTTP method send message
export async function sendMessage(userId, newMessage) {
  try {
    const resUser = await fetch(`http://localhost:5000/users/${userId}`);
    if (!resUser.ok) throw new Error(`${resUser.status} ${resUser.statusText}`);
    const user = await resUser.json();

    // 2. Napravi updated inbox (ako inbox ne postoji, koristi prazno polje)
    const updatedInbox = Array.isArray(user.inbox)
      ? [...user.inbox, newMessage]
      : [newMessage];

    const resPatch = await fetch(`http://localhost:5000/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inbox: updatedInbox }),
    });

    if (!resPatch.ok)
      throw new Error(`${resPatch.status} ${resPatch.statusText}`);

    const data = await resPatch.json();
    console.log("Message sent:", data);
    return data;
  } catch (err) {
    console.error("Error sending message:", err);
  }
}

// Delete HTTP method
export async function deleteUser(userId) {
  try {
    const res = await fetch(`http://localhost:5000/users/${userId}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error(`${res.status}, ${res.statusText}`);
    }
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

// Put (edit) HTTP method

//// Artifacts
// Get HTTP method
export async function getArtifacts() {
  try {
    const res = await fetch("http://localhost:5000/artifacts");

    if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

// Patch HTTP method for partialy editing artifact object (likes)
export async function addLikeToArtifact(artifactsId, updatedLikesNum) {
  try {
    const res = await fetch(`http://localhost:5000/artifacts/${artifactsId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: updatedLikesNum }),
    });
    if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

// Post HTTP method for adding new artifact
export async function addArtifact(artifact) {
  try {
    const res = await fetch("http://localhost:5000/artifacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(artifact),
    });
    if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

// Delete HTTP method
export async function deleteArtifact(id) {
  try {
    const res = await fetch(`http://localhost:5000/artifacts/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error(`${res.status}, ${res.statusText}`);
    }
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

//// Collections
// Get HTTP method
export async function getCollections() {
  try {
    const res = await fetch("http://localhost:5000/collections");

    if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

// Patch HTTP method for partialy editing collection object (likes)
export async function addLikeToCollection(collectionId, updatedLikesNum) {
  try {
    const res = await fetch(
      `http://localhost:5000/collections/${collectionId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ likes: updatedLikesNum }),
      }
    );
    if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

// Post HTTP method for adding new collection
export async function addCollection(collection) {
  try {
    const res = await fetch("http://localhost:5000/collections", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(collection),
    });
    if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

// Delete HTTP method
export async function deleteCollection(id) {
  try {
    const res = await fetch(`http://localhost:5000/collections/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error(`${res.status}, ${res.statusText}`);
    }
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

//// Timelines
// Get HTTP method
export async function getTimelines() {
  try {
    const res = await fetch("http://localhost:5000/timelines");

    if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

// Patch HTTP method for partialy editing timeline object (likes)
export async function addLikeToTimelines(timelineId, updatedLikesNum) {
  try {
    const res = await fetch(`http://localhost:5000/timelines/${timelineId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: updatedLikesNum }),
    });
    if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

// Post HTTP method for adding new timeline
export async function addTimeline(timeline) {
  try {
    const res = await fetch("http://localhost:5000/timelines", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(timeline),
    });
    if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

// Delete HTTP method
export async function deleteTimeline(id) {
  try {
    const res = await fetch(`http://localhost:5000/timelines/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error(`${res.status}, ${res.statusText}`);
    }
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

//// Empires
// Get HTTP method
export async function getEmpires() {
  try {
    const res = await fetch("http://localhost:5000/empires");

    if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

// Post HTTP method for adding new empire
export async function addEmpire(empire) {
  try {
    const res = await fetch("http://localhost:5000/empires", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(empire),
    });
    if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

// Delete HTTP method
export async function deleteEmpire(id) {
  try {
    const res = await fetch(`http://localhost:5000/empires/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error(`${res.status}, ${res.statusText}`);
    }
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

//// Figures
// Get HTTP method
export async function getFigures() {
  try {
    const res = await fetch("http://localhost:5000/figures");

    if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

// Post HTTP method for adding new figure
export async function addFigures(figure) {
  try {
    const res = await fetch("http://localhost:5000/figures", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(figure),
    });
    if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

// Delete HTTP method
export async function deleteFigure(id) {
  try {
    const res = await fetch(`http://localhost:5000/figures/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error(`${res.status}, ${res.statusText}`);
    }
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

//// Comments
// Get HTTP method
export async function getComments() {
  try {
    const res = await fetch("http://localhost:5000/comments");

    if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

// Post HTTP method
export async function postComment(comment) {
  try {
    const res = await fetch("http://localhost:5000/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });
    if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

// Delete HTTP method
export async function deleteComment(id) {
  try {
    const res = await fetch(`http://localhost:5000/comments/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error(`${res.status}, ${res.statusText}`);
    }
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

/////////// Dynamic HTTP request for approving all data types
export async function updateEntityStatus(endpoint, id, status) {
  const res = await fetch(`http://localhost:5000/${endpoint}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    throw new Error(`Error updating ${endpoint}: ${res.statusText}`);
  }

  return await res.json();
}
