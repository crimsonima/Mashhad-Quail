import Spinner from "./Spinner";
import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  //1 load the authenticated user
  const { isAuthenticated, isLoading } = useUser();
  const navigate = useNavigate();

  //2 if there's no authenticated user, redirect
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );

  //3 while loading, show a spinner
  if (isLoading) return <Spinner />;

  //4 if there's user, render the app

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
