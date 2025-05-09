/* eslint-disable no-unused-vars */
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";
import SingleArtifact from "./pages/single-pages/SingleArtifact";
import SingleCollection from "./pages/single-pages/SingleCollection";
import SingleTimelines from "./pages/single-pages/SingleTimelines";
import SingleEmpire from "./pages/single-pages/SingleEmpire";
import SingleFigure from "./pages/single-pages/SingleFigure";
import SingleProfile from "./pages/single-pages/SingleProfile";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Explore = lazy(() => import("./pages/Explore"));
const Profile = lazy(() => import("./pages/Profile"));
const SubmitContent = lazy(() => import("./pages/SubmitContent"));
const Notifications = lazy(() => import("./pages/Notifications"));
const Bookmarks = lazy(() => import("./pages/Bookmarks"));
const TimelineViewer = lazy(() => import("./pages/TimelineViewer"));
const Settings = lazy(() => import("./pages/Settings"));
const AdminModeration = lazy(() => import("./pages/admin/AdminModeration"));
const AdminUserManagement = lazy(() =>
  import("./pages/admin/AdminUserManagement")
);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<h2>Loading...</h2>}>
          <ToastContainer position="top-right" autoClose={3000} />

          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Layout />
                </PrivateRoute>
              }
            >
              <Route
                path="/home"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="admin/admin-moderation"
                element={
                  <PrivateRoute>
                    <AdminModeration />
                  </PrivateRoute>
                }
              />
              <Route
                path="admin/admin-user-management"
                element={
                  <PrivateRoute>
                    <AdminUserManagement />
                  </PrivateRoute>
                }
              />
              <Route
                path="/explore"
                element={
                  <PrivateRoute>
                    <Explore />
                  </PrivateRoute>
                }
              >
                {/* dependent single page (use outlet) inside explore */}
                <Route
                  path="/explore/empires/:id"
                  element={
                    <PrivateRoute>
                      <SingleEmpire />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/explore/figures/:id"
                  element={
                    <PrivateRoute>
                      <SingleFigure />
                    </PrivateRoute>
                  }
                />
              </Route>

              {/*  independent single page routes */}
              <Route
                path="/explore/artifact/:id"
                element={
                  <PrivateRoute>
                    <SingleArtifact />
                  </PrivateRoute>
                }
              />
              <Route
                path="/explore/collections/:id"
                element={
                  <PrivateRoute>
                    <SingleCollection />
                  </PrivateRoute>
                }
              />
              <Route
                path="/explore/timelines/:id"
                element={
                  <PrivateRoute>
                    <SingleTimelines />
                  </PrivateRoute>
                }
              />

              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />

              <Route
                path="/profile/:id"
                element={
                  <PrivateRoute>
                    <SingleProfile />
                  </PrivateRoute>
                }
              />

              <Route
                path="/submit-content"
                element={
                  <PrivateRoute>
                    <SubmitContent />
                  </PrivateRoute>
                }
              />
              <Route
                path="/notifications"
                element={
                  <PrivateRoute>
                    <Notifications />
                  </PrivateRoute>
                }
              />
              {/* <Route
                path="/bookmarks"
                element={
                  <PrivateRoute>
                    <Bookmarks />
                  </PrivateRoute>
                }
              />
              <Route
                path="/timeline"
                element={
                  <PrivateRoute>
                    <TimelineViewer />
                  </PrivateRoute>
                }
              /> */}
              {/* <Route
                path="/settings"
                element={
                  <PrivateRoute>
                    <Settings />
                  </PrivateRoute>
                }
              /> */}
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
