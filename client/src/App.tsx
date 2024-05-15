import { useEffect } from "react";
import { IGetUserOutput } from "./interfaces/outputs";
import { IUser } from "./interfaces/models";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./state/store";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { Navbar } from "./components/navbar/navbar";
import Register from "./screens/register";
import userSlice from "./state/slices/userSlice";
import { isLoggedInApi } from "./svc/auth";
import Unprotected from "./screens/unProtected";
import Login from "./screens/login";
import Protected from "./screens/protected";

const ProtectedRoute = (props: {
  isAuthenticated: boolean;
  redirectTo: string;
}) => {
  const { isAuthenticated, redirectTo } = props;
  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
};

function App() {
  const currentUser = useSelector((state: RootState) => state.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const isLoggedIn = async (): Promise<void> => {
      const setCurrentUser = userSlice.actions.setCurrentUser;
      try {
        const response: IGetUserOutput = await isLoggedInApi();
        if (response.isSuccess) {
          const currentUser = response.result;
          dispatch(setCurrentUser(currentUser));
        } else {
          const currentUser = {} as IUser;
          dispatch(setCurrentUser(currentUser));
        }
      } catch (error) {
        const currentUser = {} as IUser;
        dispatch(setCurrentUser(currentUser));
        console.error(error);
      }
    };
    isLoggedIn();
    // eslint-disable-next-line
  }, []);

  if (currentUser === null) {
    return <h1>Loading...</h1>;
  }

  const isAuthenticated: boolean = currentUser.id !== undefined;
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/unprotected" element={<Unprotected />} />
        <Route
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              redirectTo="/login"
            />
          }
        >
          <Route path="/" element={<Protected />} />
        </Route>
        <Route
          element={
            <ProtectedRoute isAuthenticated={!isAuthenticated} redirectTo="/" />
          }
        >
          <Route path="/login" element={<Login />} />
        </Route>
        <Route
          element={
            <ProtectedRoute isAuthenticated={!isAuthenticated} redirectTo="/" />
          }
        >
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
