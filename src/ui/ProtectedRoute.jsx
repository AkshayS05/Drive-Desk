import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import { useEffect } from "react";
import Spinner from "./Spinner";
import styled from "styled-components";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  //load the authenticated user
  const { isLoading, isAuthenticated } = useUser();
  //if no autheticated user, redirect to login
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);
  //when data loading, show spinner
  if (isLoading)
    <FullPage>
      <Spinner />
    </FullPage>;
  //if user exists, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
