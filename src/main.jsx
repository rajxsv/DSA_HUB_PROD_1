import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserProvider } from "./UserContext";

import App from "./App.jsx";
import Landing from "./Pages/Landing";
import List from "./Pages/ListProblems";
import Problems from "./Pages/Problem";
import AddProblem from "./Pages/AddProblem";
import EditProblem from "./Pages/EditProblem";
import Discuss from "./Pages/Discuss";
import AddPost from "./Pages/AddPost";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Landing />
      },
      {
        path: "/content/list?",
        element: <List />,
      },
      {
        path: "/content/problems?",
        element: <Problems />,
      },
      {
        path: "/content/addProblem",
        element: <AddProblem />,
      },
      {
        path: "/content/editProblem",
        element: <EditProblem />,
      },
      {
        path: "/discuss",
        element: <Discuss />,
      },
      {
        path: "/discuss/addpost",
        element: <AddPost />,
      }
    ],
  }
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>
);
