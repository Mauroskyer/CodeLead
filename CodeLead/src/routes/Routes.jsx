import { createBrowserRouter } from "react-router";
import { lazy } from "react";

import ProtectedRoute from "./ProtectedRoute.jsx";

const Login = lazy(() => import("../pages/Login/Login.jsx"));
const CodeLeadNetWork = lazy(() =>
  import("../pages/CodeLeadNetWork/CodeLeadNetWork.jsx")
);

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/codeleadnetwork",
    element: (
      <ProtectedRoute>
        <CodeLeadNetWork />
      </ProtectedRoute>
    ),
  },
]);

export default Routes;