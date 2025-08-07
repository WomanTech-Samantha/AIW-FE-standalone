import { useCallback } from 'react';

interface KakaoLoginOptions {
  onSuccess: (userData: any) => void;
  onFailure: (error: any) => void;
}

export const useSimpleKakaoLogin = ({ onSuccess, onFailure }: KakaoLoginOptions) => {
  const login = useCallback(() => {
    const kakaoAppKey = import.meta.env.VITE_KAKAO_APP_KEY;
    
    if (!kakaoAppKey) {
      onFailure('카카오 앱 키가 설정되지 않았습니다.');
      return;
    }

    // 카카오 OAuth URL 생성
    const redirectUri = encodeURIComponent(`${window.location.origin}/oauth/callback`);
    const state = Math.random().toString(36).substring(2, 15);
    
    console.log('Kakao login started');
    console.log('Redirect URI:', redirectUri);
    console.log('State:', state);
    
    // 상태값 저장 (CSRF 방지)
    sessionStorage.setItem('kakao_state', state);
    
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?` +
      `client_id=${kakaoAppKey}&` +
      `redirect_uri=${redirectUri}&` +
      `response_type=code&` +
      `state=${state}`;
    
    // 팝업으로 로그인 창 열기
    const popup = window.open(
      kakaoAuthUrl,
      'kakaoLogin',
      'width=500,height=600,scrollbars=yes,resizable=yes,toolbar=no,menubar=no,location=no,status=no'
    );

    if (!popup) {
      onFailure('팝업 창을 열 수 없습니다. 팝업 차단을 해제해주세요.');
      return;
    }

    // 메시지 리스너 설정
    const handleMessage = (event: MessageEvent) => {
      console.log('Message received:', event.origin, event.data);
      
      // 같은 origin에서 온 메시지만 처리
      if (event.origin !== window.location.origin) {
        console.log('Origin mismatch:', event.origin, window.location.origin);
        return;
      }
      
      if (event.data.type === 'oauth-callback') {
        console.log('OAuth callback message received');
        const { code, state: returnedState, error } = event.data;
        const savedState = sessionStorage.getItem('kakao_state');
        
        console.log('Code:', code);
        console.log('State:', returnedState, 'Saved state:', savedState);
        console.log('Error:', error);
        
        if (error) {
          onFailure(`카카오 로그인 오류: ${error}`);
          window.removeEventListener('message', handleMessage);
          return;
        }
        
        if (code && returnedState === savedState) {
          console.log('Login success - calling onSuccess');
          // 실제 구현에서는 백엔드에서 토큰 교환 및 사용자 정보 획득
          // 여기서는 임시로 성공 처리
          onSuccess({
            email: 'user@kakao.com', // 실제로는 API 호출로 획득
            name: '카카오사용자',
            picture: ''
          });
          
          sessionStorage.removeItem('kakao_state');
        } else {
          console.log('State mismatch or no code');
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