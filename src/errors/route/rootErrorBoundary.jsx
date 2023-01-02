import React from "react";
import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";

import { NoResultNotFoundError } from "../footballAPIError";

const RootErrorBoundary = () => {
  const error = useRouteError();

  const showErrorSorry = () => {
    if (isRouteErrorResponse(error)) {
      if (error.status === 404) {
        return <div>This page doesn't exist!</div>;
      }
  
      if (error.status === 401) {
        return <div>You aren't authorized to see this</div>;
      }
  
      if (error.status === 503) {
        return <div>Looks like our API is down</div>;
      }
    } else {
      if (error instanceof NoResultNotFoundError) {
        return <div>데이터가 존재하지 않는 페이지를 요청했습니다.</div>
      }
    }
  }

  console.error(error);

  return (
    <>
      <div>에러가 발생했습니다.</div>
      { error?.status
        && <div>{error.status} 에러</div>
      }
      {showErrorSorry()}
      <Link to='/'>홈으로</Link>
    </>
  );
}

export default RootErrorBoundary;