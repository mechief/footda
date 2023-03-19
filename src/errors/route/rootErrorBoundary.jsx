import React from "react";
import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";
import styled, {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    width: 100%;
    height: 100%;
  } 
`;

const StyledErrorBoundary = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ErrorText = styled.h1`
  font-size: 24px;
  font-weight: 500;
`;

const ErrorCode = styled.div`
  margin-top: 20px;
  font-size: 20px;
`;

const ErrorDetail = styled.p`
  margin-top: 20px;
  font-size: 16px;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  width: 200px;
  margin-top: 20px;
  padding: 10px 16px;
  text-align: center;
  background: #d6eaea;
  font-size: 20px;
  font-weight: 500;
  color: #000;
  border-radius: 4px;
`;


import { NoResultNotFoundError } from "../footballAPIError";

const RootErrorBoundary = () => {
  const error = useRouteError();

  const showErrorSorry = () => {
    if (isRouteErrorResponse(error)) {
      if (error.status === 404) {
        return <ErrorDetail>This page doesn't exist!</ErrorDetail>;
      }
  
      if (error.status === 401) {
        return <ErrorDetail>You aren't authorized to see this</ErrorDetail>;
      }
  
      if (error.status === 503) {
        return <ErrorDetail>Looks like our API is down</ErrorDetail>;
      }
    } else {
      if (error instanceof NoResultNotFoundError) {
        return <ErrorDetail>데이터가 존재하지 않는 페이지를 요청했습니다.</ErrorDetail>
      }
    }
  }

  console.error(error);

  return (
    <>
      <GlobalStyle />
      <StyledErrorBoundary>
        <ErrorText>에러가 발생했습니다.</ErrorText>
        { error?.status
          && <ErrorCode>{error.status}</ErrorCode>
        }
        {showErrorSorry()}
        <StyledLink to='/'>홈으로</StyledLink>
      </StyledErrorBoundary>
    </>
  );
}

export default RootErrorBoundary;