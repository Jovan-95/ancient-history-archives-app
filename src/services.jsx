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

// Delete HTTP method
// Put HTTP method

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
