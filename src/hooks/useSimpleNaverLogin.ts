import { useCallback } from 'react';

interface NaverLoginOptions {
  onSuccess: (userData: any) => void;
  onFailure: (error: any) => void;
}

export const useSimpleNaverLogin = ({ onSuccess, onFailure }: NaverLoginOptions) => {
  const login = useCallback(() => {
    const naverClientId = import.meta.env.VITE_NAVER_CLIENT_ID;
    
    if (!naverClientId) {
      onFailure('네이버 클라이언트 ID가 설정되지 않았습니다.');
      return;
    }

    // 네이버 OAuth URL 생성
    const redirectUri = encodeURIComponent(`${window.location.origin}/oauth/callback`);
    const state = Math.random().toString(36).substring(2, 15);
    
    // 상태값 저장 (CSRF 방지)
    sessionStorage.setItem('naver_state', state);
    
    const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naverClientId}&redirect_uri=${redirectUri}&state=${state}`;
    
    // 팝업으로 로그인 창 열기
    const popup = window.open(
      naverAuthUrl,
      'naverLogin',
      'width=500,height=600,scrollbars=yes,resizable=yes'
    );

    if (!popup) {
      onFailure('팝업 창을 열 수 없습니다. 팝업 차단을 해제해주세요.');
      return;
    }

    // 메시지 리스너 설정
    const handleMessage = (event: MessageEvent) => {
      // 같은 origin에서 온 메시지만 처리
      if (event.origin !== window.location.origin) return;
      
      if (event.data.type === 'oauth-callback') {
        const { code, state: returnedState, error } = event.data;
        const savedState = sessionStorage.getItem('naver_state');
        
        if (error) {
          onFailure(`네이버 로그인 오류: ${error}`);
          window.removeEventListener('message', handleMessage);
          return;
        }
        
        if (code && returnedState === savedState) {
          // 실제 구현에서는 백엔드에서 토큰 교환 처리
          // 여기서는 임시로 성공 처리
          onSuccess({
            email: 'user@naver.com', // 실제로는 API 호출로 획득
            name: '네이버사용자',
            nickname: '네이버사용자'
          });
          
          sessionStorage.removeItem('naver_state');
        }
        
        window.removeEventListener('message', handleMessage);
      }
    };
    
    window.addEventListener('message', handleMessage);

    // 타임아웃 설정 (30초)
    setTimeout(() => {
      if (!popup.closed) {
        popup.close();
        window.removeEventListener('message', handleMessage);
        onFailure('로그인 시간이 초과되었습니다.');
      }
    }, 30000);

  }, [onSuccess, onFailure]);

  return { login };
};