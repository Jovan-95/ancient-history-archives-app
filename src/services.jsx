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
