import { supabase } from "./supabaseClient";

//// Users
export default async function getUsers() {
  const { data, error } = await supabase.from("users").select("*");
  if (error) throw error;
  return data;
}

export async function registerUser(user) {
  const { data, error } = await supabase.from("users").insert([user]).select(); // select() vraća ubačeni row

  if (error) {
    console.error("Error registering user:", error);
    throw error;
  }

  return data;
}

export async function addBookmarkToUserArtifact(userId, updatedBookmarksArray) {
  const { data, error } = await supabase
    .from("users")
    .update({ bookmarksArtifacts: updatedBookmarksArray })
    .eq("id", userId)
    .select();
  if (error) throw error;
  return data;
}

export async function removeArtifactFromBookmarks(
  userId,
  updatedBookmarksArray
) {
  const { data, error } = await supabase
    .from("users")
    .update({ bookmarksArtifacts: updatedBookmarksArray })
    .eq("id", userId)
    .select();
  if (error) throw error;
  return data;
}

export async function addLikeToUserArtifact(userId, updatedLikesArray) {
  const { data, error } = await supabase
    .from("users")
    .update({ likesArtifacts: updatedLikesArray })
    .eq("id", userId)
    .select();
  if (error) throw error;
  return data;
}

export async function removeArtifactFromLikes(userId, updatedLikesArray) {
  const { data, error } = await supabase
    .from("users")
    .update({ likesArtifacts: updatedLikesArray })
    .eq("id", userId)
    .select();
  if (error) throw error;
  return data;
}

export async function addBookmarkToUserCollection(
  userId,
  updatedBookmarksArray
) {
  const { data, error } = await supabase
    .from("users")
    .update({ bookmarksCollections: updatedBookmarksArray })
    .eq("id", userId)
    .select();
  if (error) throw error;
  return data;
}

export async function removeCollectionFromBookmarks(
  userId,
  updatedBookmarksArray
) {
  const { data, error } = await supabase
    .from("users")
    .update({ bookmarksCollections: updatedBookmarksArray })
    .eq("id", userId)
    .select();
  if (error) throw error;
  return data;
}

export async function addLikeToUserCollection(userId, updatedLikesArray) {
  const { data, error } = await supabase
    .from("users")
    .update({ likesCollections: updatedLikesArray })
    .eq("id", userId)
    .select();
  if (error) throw error;
  return data;
}

export async function removeCollectionFromLikes(userId, updatedLikesArray) {
  const { data, error } = await supabase
    .from("users")
    .update({ likesCollections: updatedLikesArray })
    .eq("id", userId)
    .select();
  if (error) throw error;
  return data;
}

export async function addBookmarkToUserTimeline(userId, updatedBookmarksArray) {
  const { data, error } = await supabase
    .from("users")
    .update({ bookmarksTimelines: updatedBookmarksArray })
    .eq("id", userId)
    .select();
  if (error) throw error;
  return data;
}

export async function removeTimelineFromBookmarks(
  userId,
  updatedBookmarksArray
) {
  const { data, error } = await supabase
    .from("users")
    .update({ bookmarksTimelines: updatedBookmarksArray })
    .eq("id", userId)
    .select();
  if (error) throw error;
  return data;
}

export async function addLikeToUserTimelines(userId, updatedLikesArray) {
  const { data, error } = await supabase
    .from("users")
    .update({ likesTimelines: updatedLikesArray })
    .eq("id", userId)
    .select();
  if (error) throw error;
  return data;
}

export async function removeTimelineFromLikes(userId, updatedLikesArray) {
  const { data, error } = await supabase
    .from("users")
    .update({ likesTimelines: updatedLikesArray })
    .eq("id", userId)
    .select();
  if (error) throw error;
  return data;
}

export async function changeUserAvatar(userId, avatarImg) {
  const { data, error } = await supabase
    .from("users")
    .update({ avatar: avatarImg })
    .eq("id", userId)
    .select();
  if (error) throw error;
  return data;
}

export async function editUser(userId, editedObj) {
  const { data, error } = await supabase
    .from("users")
    .update(editedObj)
    .eq("id", userId)
    .select();
  if (error) throw error;
  return data;
}

export async function changeUserRole(id, role) {
  const { data, error } = await supabase
    .from("users")
    .update({ role })
    .eq("id", id)
    .select();
  if (error) throw error;
  return data;
}

export async function changeUserStatus(id, status) {
  const { data, error } = await supabase
    .from("users")
    .update({ status })
    .eq("id", id)
    .select();
  if (error) throw error;
  return data;
}

export async function updateMessageVisibility(userId, msgId, newVisibility) {
  const { data: user, error: fetchErr } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();
  if (fetchErr) throw fetchErr;

  const updatedInbox = (user.inbox || []).map((msg) =>
    msg.id === msgId ? { ...msg, visibility: newVisibility } : msg
  );

  const { data, error } = await supabase
    .from("users")
    .update({ inbox: updatedInbox })
    .eq("id", userId)
    .select();

  if (error) throw error;
  return data;
}

export async function sendMessage(userId, newMessage) {
  const { data: user, error: fetchErr } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();
  if (fetchErr) throw fetchErr;

  const updatedInbox = Array.isArray(user.inbox)
    ? [...user.inbox, newMessage]
    : [newMessage];

  const { data, error } = await supabase
    .from("users")
    .update({ inbox: updatedInbox })
    .eq("id", userId)
    .select();

  if (error) throw error;
  return data;
}

export async function deleteUser(userId) {
  const { data, error } = await supabase
    .from("users")
    .delete()
    .eq("id", userId)
    .select();
  if (error) throw error;
  return data;
}

//// Artifacts
export async function getArtifacts() {
  const { data, error } = await supabase.from("artifacts").select("*");
  if (error) throw error;
  return data;
}

export async function addLikeToArtifact(artifactsId, updatedLikesNum) {
  const { data, error } = await supabase
    .from("artifacts")
    .update({ likes: updatedLikesNum })
    .eq("id", artifactsId)
    .select();
  if (error) throw error;
  return data;
}

export async function addArtifact(artifact) {
  const { data, error } = await supabase
    .from("artifacts")
    .insert([artifact])
    .select();
  if (error) throw error;
  return data;
}

export async function deleteArtifact(id) {
  const { data, error } = await supabase
    .from("artifacts")
    .delete()
    .eq("id", id)
    .select();
  if (error) throw error;
  return data;
}

//// Collections
export async function getCollections() {
  const { data, error } = await supabase.from("collections").select("*");
  if (error) throw error;
  return data;
}

export async function addLikeToCollection(collectionId, updatedLikesNum) {
  const { data, error } = await supabase
    .from("collections")
    .update({ likes: updatedLikesNum })
    .eq("id", collectionId)
    .select();
  if (error) throw error;
  return data;
}

export async function addCollection(collection) {
  const { data, error } = await supabase
    .from("collections")
    .insert([collection])
    .select();
  if (error) throw error;
  return data;
}

export async function deleteCollection(id) {
  const { data, error } = await supabase
    .from("collections")
    .delete()
    .eq("id", id)
    .select();
  if (error) throw error;
  return data;
}

//// Timelines
export async function getTimelines() {
  const { data, error } = await supabase.from("timelines").select("*");
  if (error) throw error;
  return data;
}

export async function addLikeToTimelines(timelineId, updatedLikesNum) {
  const { data, error } = await supabase
    .from("timelines")
    .update({ likes: updatedLikesNum })
    .eq("id", timelineId)
    .select();
  if (error) throw error;
  return data;
}

export async function addTimeline(timeline) {
  const { data, error } = await supabase
    .from("timelines")
    .insert([timeline])
    .select();
  if (error) throw error;
  return data;
}

export async function deleteTimeline(id) {
  const { data, error } = await supabase
    .from("timelines")
    .delete()
    .eq("id", id)
    .select();
  if (error) throw error;
  return data;
}

//// Empires
export async function getEmpires() {
  const { data, error } = await supabase.from("empires").select("*");
  if (error) throw error;
  return data;
}

export async function addEmpire(empire) {
  const { data, error } = await supabase
    .from("empires")
    .insert([empire])
    .select();
  if (error) throw error;
  return data;
}

export async function deleteEmpire(id) {
  const { data, error } = await supabase
    .from("empires")
    .delete()
    .eq("id", id)
    .select();
  if (error) throw error;
  return data;
}

//// Figures
export async function getFigures() {
  const { data, error } = await supabase.from("figures").select("*");
  if (error) throw error;
  return data;
}

export async function addFigures(figure) {
  const { data, error } = await supabase
    .from("figures")
    .insert([figure])
    .select();
  if (error) throw error;
  return data;
}

export async function deleteFigure(id) {
  const { data, error } = await supabase
    .from("figures")
    .delete()
    .eq("id", id)
    .select();
  if (error) throw error;
  return data;
}

//// Comments
export async function getComments() {
  const { data, error } = await supabase.from("comments").select("*");
  if (error) throw error;
  return data;
}

export async function postComment(comment) {
  const { data, error } = await supabase
    .from("comments")
    .insert([comment])
    .select();
  if (error) throw error;
  return data;
}

export async function deleteComment(id) {
  const { data, error } = await supabase
    .from("comments")
    .delete()
    .eq("id", id)
    .select();
  if (error) throw error;
  return data;
}

export async function updateEntityStatus(table, id, status) {
  const { data, error } = await supabase
    .from(table)
    .update({ status })
    .eq("id", id)
    .select();

  if (error) {
    console.error(`Error updating status in ${table}:`, error);
    throw error;
  }

  return data;
}
