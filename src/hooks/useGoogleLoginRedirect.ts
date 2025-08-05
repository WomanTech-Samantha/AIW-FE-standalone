import { useCallback } from 'react';

interface GoogleLoginOptions {
  onSuccess: (userData: any) => void;
  onFailure: (error: any) => void;
}

export const useGoogleLoginRedirect = ({ onSuccess, onFailure }: GoogleLoginOptions) => {
  const login = useCallback(() => {
    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    
    if (!googleClientId) {
      onFailure('구글 클라이언트 ID가 설정되지 않았습니다.');
      return;
    }

    // 구글 OAuth URL 생성 (redirect 방식)
    const redirectUri = encodeURIComponent(`${window.location.origin}/login`);
    const state = Math.random().toString(36).substring(2, 15);
    
    // 상태값 저장
    sessionStorage.setItem('google_state', state);
    
    const googleAuthUrl = `https://accounts.google.com/oauth/authorize?` +
      `client_id=${googleClientId}&` +
      `redirect_uri=${redirectUri}&` +
      `response_type=code&` +
      `scope=openid email profile&` +
      `state=${state}`;
    
    // 현재 창에서 리다이렉트
    window.location.href = googleAuthUrl;

  }, [onSuccess, onFailure]);

  // 페이지 로드 시 인증 코드 확인
  const checkAuthCode = useCallback(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const error = urlParams.get('error');
    const savedState = sessionStorage.getItem('google_state');

    if (error) {
      onFailure(`구글 로그인 오류: ${error}`);
      window.history.replaceState({}, document.title, window.location.pathname);
      return;
    }

    if (code && state === savedState) {
      // 실제 구현에서는 백엔드에서 토큰 교환
      // 임시로 성공 처리
      onSuccess({
        email: 'user@gmail.com',
        name: '구글사용자',
        picture: ''
      });
      
      // URL 정리
      window.history.replaceState({}, document.title, window.location.pathname);
      sessionStorage.removeItem('google_state');
    }
  }, [onSuccess, onFailure]);

  return { login, checkAuthCode };
};