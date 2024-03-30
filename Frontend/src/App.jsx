import {
  // Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
// import Cookies from "js-cookie";

// import RequireAuth from "./components/auth/RequireAuth";
import RootLayout from "./components/RootLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

import "./App.css";

function App() {
  // const accessToken = Cookies.get("accessToken");

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<h1>Authentication App</h1>} />

        <Route path="auth">
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>

        <Route path="/dashboard" element={<Dashboard />} />

        {/* <Route path="auth">
          <Route
            path="login"
            element={
              accessToken ? <Navigate to="/dashboard" replace /> : <Login />
            }
          />
          <Route
            path="signup"
            element={
              accessToken ? <Navigate to="/dashboard" replace /> : <Signup />
            }
          />
        </Route>

        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route path="/dashboard" element={<Dashboard />} /> */}
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
