import React from "react";
import Register from "./components/Register";
import Login from "./components/login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./components/Home";
import StudentHome from "./components/studentHome";
import ClassPage from "./components/classPage";
import TopicPage from "./components/TopicPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/student",
        element: <StudentHome />,
      },
      {
        path: "/students/classes/:classID",
        element: <ClassPage />,
      },
      {
        path: "/topics/:topicID",
        element: <TopicPage />,
      },
    ],
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
