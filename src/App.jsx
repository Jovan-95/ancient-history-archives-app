/* eslint-disable no-unused-vars */
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Explore = lazy(() => import("./pages/Explore"));
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
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="admin-moderation" element={<AdminModeration />} />
              <Route
                path="admin-user-management"
                element={<AdminUserManagement />}
              />
            </Route>
            <Route path="/explore" element={<Explore />} />
            <Route path="/submit-content" element={<SubmitContent />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/timeline" element={<TimelineViewer />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

//// Notes
// Item Detail Page, route and connect with type and id
// Profile Page, route and connect with id
