import { useCallback, useEffect } from 'react';

interface KakaoLoginOptions {
  onSuccess: (userData: any) => void;
  onFailure: (error: any) => void;
}

export const useSimpleKakaoLoginV2 = ({ onSuccess, onFailure }: KakaoLoginOptions) => {
  // localStorage 변경 감지
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'kakao_oauth_result') {
        const data = e.newValue ? JSON.parse(e.newValue) : null;
        if (data) {
          console.log('Kakao OAuth result received:', data);
          
          if (data.error) {
            onFailure(`카카오 로그인 오류: ${data.error}`);
          } else if (data.code && data.state === sessionStorage.getItem('kakao_state')) {
            console.log('Kakao login success');
            onSuccess({
              email: 'user@kakao.com',
              name: '카카오사용자',
              picture: ''
            });
            sessionStorage.removeItem('kakao_state');
          }
          
          // 결과 처리 후 삭제
          localStorage.removeItem('kakao_oauth_result');
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [onSuccess, onFailure]);

  const login = useCallback(() => {
    const kakaoAppKey = import.meta.env.VITE_KAKAO_APP_KEY;
    
    if (!kakaoAppKey) {
      onFailure('카카오 앱 키가 설정되지 않았습니다.');
      return;
    }

    // 이전 결과 정리
    localStorage.removeItem('kakao_oauth_result');

    // 카카오 OAuth URL 생성
    const redirectUri = encodeURIComponent(`${window.location.origin}/oauth/callback`);
    const state = Math.random().toString(36).substring(2, 15);
    
    console.log('Kakao login V2 started');
    console.log('State:', state);
    
    // 상태값 저장
    sessionStorage.setItem('kakao_state', state);
    
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?` +
      `client_id=${kakaoAppKey}&` +
      `redirect_uri=${redirectUri}&` +
      `response_type=code&` +
      `state=${state}`;
    
    // 팝업으로 열기
    const popup = window.open(
      kakaoAuthUrl,
      'kakaoLogin',
      'width=500,height=600,scrollbars=yes,resizable=yes'
    );

    if (!popup) {
      onFailure('팝업 창을 열 수 없습니다. 팝업 차단을 해제해주세요.');
      return;
    }

    // 팝업 모니터링
    const checkInterval = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkInterval);
        
        // localStorage에서 결과 확인
        const result = localStorage.getItem('kakao_oauth_result');
        if (result) {
          const data = JSON.parse(result);
          if (data.code && data.state === state) {
            console.log('Kakao login success from popup check');
            onSuccess({
              email: 'user@kakao.com',
              name: '카카오사용자',
              picture: ''
            });
            sessionStorage.removeItem('kakao_state');
            localStorage.removeItem('kakao_oauth_result');
          }
        }
      }
    }, 500);

    // 타임아웃
    setTimeout(() => {
      clearInterval(checkInterval);
      if (!popup.closed) {
        popup.close();
        onFailure('로그인 시간이 초과되었습니다.');
      }
    }, 30000);

  }, [onSuccess, onFailure]);

  return { login };
};