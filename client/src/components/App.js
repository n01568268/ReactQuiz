import "../styles/App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

/** import components */
import Main from "./Main";
import Quiz from "./Quiz";
import Result from "./Result";
import { CheckUserExist } from "../helper/helper";
import Register from "./User/register";
import Login from "./User/Login";
import Greetings from "./Greetings";

/** react routes */
const router = createBrowserRouter([
  { path: "/greetings", element: <Greetings /> },
  {
    path: "/",
    element: (
      <CheckUserExist>
        <Main />
      </CheckUserExist>
    ),
  },
  {
    path: "/quiz",
    element: (
      <CheckUserExist>
        <Quiz />
      </CheckUserExist>
    ),
  },
  {
    path: "/result",
    element: (
      <CheckUserExist>
        <Result />
      </CheckUserExist>
    ),
  },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
