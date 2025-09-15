/* eslint-disable no-unused-vars */
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import PermissionRoute from "./components/PermissionRoute";
import PublicRoute from "./components/PublicRoute";
import Layout from "./components/Layout";
import SingleArtifact from "./pages/single-pages/SingleArtifact";
import SingleCollection from "./pages/single-pages/SingleCollection";
import SingleTimelines from "./pages/single-pages/SingleTimelines";
import SingleEmpire from "./pages/single-pages/SingleEmpire";
import SingleFigure from "./pages/single-pages/SingleFigure";
import SingleProfile from "./pages/single-pages/SingleProfile";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import getUsers from "./services";
import { useSelector } from "react-redux";

const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Explore = lazy(() => import("./pages/Explore"));
const Profile = lazy(() => import("./pages/Profile"));
const SubmitContent = lazy(() => import("./pages/SubmitContent"));
const Notifications = lazy(() => import("./pages/Notifications"));
const Unauthorized = lazy(() => import("./pages/Unauthorized"));
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
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route
              path="/"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />

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
                path="/stats"
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
                    <PermissionRoute allowedRoles={["Admin"]}>
                      <AdminModeration />
                    </PermissionRoute>
                  </PrivateRoute>
                }
              />
              <Route
                path="admin/admin-user-management"
                element={
                  <PrivateRoute>
                    <PermissionRoute allowedRoles={["Admin"]}>
                      <AdminUserManagement />
                    </PermissionRoute>
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
                    <PermissionRoute allowedRoles={["Admin", "Researcher"]}>
                      <SubmitContent />
                    </PermissionRoute>
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
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
