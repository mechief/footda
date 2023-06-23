import React from "react";

import { AxiosError } from "axios";
import { NetworkError } from "../../errors/footballAPIError";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트 합니다.
    return { 
      error,
      hasError: true,
    };
  }

  /*
  componentDidCatch(error, errorInfo) {
    // 에러 리포팅 서비스에 에러를 기록할 수도 있습니다.
    logErrorToMyService(error, errorInfo);
  }
  */

  render() {
    if (this.state.hasError) {
      // Network 에러의 경우 지정 메시지
      if (this.state.error instanceof AxiosError || this.state.error instanceof NetworkError) {
        return <p>네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.</p>;
      }

      // 폴백 UI를 커스텀하여 렌더링할 수 있습니다.
      return this.props.fallback || <p>실행중 에러가 발생했습니다.</p>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;