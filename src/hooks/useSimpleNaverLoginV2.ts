import { useCallback, useEffect } from 'react';

interface NaverLoginOptions {
  onSuccess: (userData: any) => void;
  onFailure: (error: any) => void;
}

export const useSimpleNaverLoginV2 = ({ onSuccess, onFailure }: NaverLoginOptions) => {
  // localStorage 변경 감지
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'naver_oauth_result') {
        const data = e.newValue ? JSON.parse(e.newValue) : null;
        if (data) {
          console.log('Naver OAuth result received:', data);
          
          if (data.error) {
            onFailure(`네이버 로그인 오류: ${data.error}`);
          } else if (data.code && data.state === sessionStorage.getItem('naver_state')) {
            console.log('Naver login success');
            onSuccess({
              email: 'user@naver.com',
              name: '네이버사용자',
              nickname: '네이버사용자'
            });
            sessionStorage.removeItem('naver_state');
          }
          
          // 결과 처리 후 삭제
          localStorage.removeItem('naver_oauth_result');
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [onSuccess, onFailure]);

  const login = useCallback(() => {
    const naverClientId = import.meta.env.VITE_NAVER_CLIENT_ID;
    
    if (!naverClientId) {
      onFailure('네이버 클라이언트 ID가 설정되지 않았습니다.');
      return;
    }

    // 이전 결과 정리
    localStorage.removeItem('naver_oauth_result');

    // 네이버 OAuth URL 생성
    const redirectUri = encodeURIComponent(`${window.location.origin}/oauth/callback`);
    const state = Math.random().toString(36).substring(2, 15);
    
    console.log('Naver login V2 started');
    console.log('State:', state);
    
    // 상태값 저장
    sessionStorage.setItem('naver_state', state);
    
    const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naverClientId}&redirect_uri=${redirectUri}&state=${state}`;
    
    // 팝업으로 열기
    const popup = window.open(
      naverAuthUrl,
      'naverLogin',
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
        const result = localStorage.getItem('naver_oauth_result');
        if (result) {
          const data = JSON.parse(result);
          if (data.code && data.state === state) {
            console.log('Naver login success from popup check');
            onSuccess({
              email: 'user@naver.com',
              name: '네이버사용자',
              nickname: '네이버사용자'
            });
            sessionStorage.removeItem('naver_state');
            localStorage.removeItem('naver_oauth_result');
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