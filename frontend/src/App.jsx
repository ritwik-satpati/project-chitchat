import { useEffect } from "react";
// import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import RestrictedRoute from "./utils/RestrictedRoute.jsx";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { getUserApi } from "./routes/auth.routes.js";
import { axiosConfig } from "./libs/axiosConfig.js";
import { useDispatch, useSelector } from "react-redux";
import { getUserFail, getUserSuccess } from "./redux/slices/auth.slice.js";

import WelcomePage from "./pages/WelcomePage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import UsersPage from "./pages/UsersPage.jsx";
import StartConversationPage from "./pages/StartConversationPage.jsx";
import { getSocket } from "./socket.jsx";

// const WelcomePage = lazy(() => import("./pages/WelcomePage.jsx"));
// const RegisterPage = lazy(() => import("./pages/RegisterPage.jsx"));
// const LoginPage = lazy(() => import("./pages/LoginPage.jsx"));
// const HomePage = lazy(() => import("./pages/HomePage.jsx"));
// const ChatPage = lazy(() => import("./pages/ChatPage.jsx"));
// const Test = lazy(() => import("./pages/Test.jsx"));

function App() {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const socket = getSocket();
  console.log(socket);

  useEffect(() => {
    axios
      .get(`${getUserApi}`, axiosConfig)
      .then(({ data }) => dispatch(getUserSuccess(data.data.user)))
      .catch((err) => dispatch(getUserFail()));
  }, [dispatch]);

  return (
    <div className="min-h-[100vh]">
      <Routes>
        {/* Restricted Routes */}
        <Route element={<RestrictedRoute user={!user} />}>
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* Protected Routes - No Redirection */}
        {/* <Route
          element={
            <SocketProvider>
              <ProtectedRoute user={user} />
            </SocketProvider>
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<HomePage />} />
        </Route> */}

        {/* Protected Routes - with Redirection */}
        <Route
          element={
            <ProtectedRoute user={user} currentPath={location.pathname} />
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<HomePage />} />

          <Route path="/chat/:conversationId" element={<ChatPage />} />
          <Route path="/user" element={<UsersPage />} />
          <Route
            path="/user/:userMobileNumber"
            element={<StartConversationPage />}
          />
        </Route>

        {/* Public Routes */}
        {/* <Route path="/test" element={<Test />} /> */}

        {/* Not Found */}
        {/* <Route path="*" element={<Test />} /> */}
      </Routes>

      {/* Toaster - Notification pop-up */}
      <div>
        <Toaster
          position="bottom-center"
          reverseOrder={false}
          toastOptions={{
            // Define default options customized using tailwindcss
            className: "font-Poppins bg-[#333] text-white rounded-sm",
            duration: 5000,
            // style: {
            //   borderRadius: '5px',
            //   background: "#333",
            //   color: "#fff",
            // },
          }}
        />
      </div>
    </div>
  );
}

export default App;
