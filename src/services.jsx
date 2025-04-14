/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */

//// BE routes
// http://localhost:5000/artifacts
// http://localhost:5000/collections
// http://localhost:5000/timelines
// http://localhost:5000/comments
// http://localhost:5000/users

import { useState } from "react";

//// HTTP users
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
