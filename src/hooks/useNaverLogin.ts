import { useCallback } from 'react';

declare global {
  interface Window {
    naver: any;
  }
}

interface NaverLoginOptions {
  onSuccess: (userData: any) => void;
  onFailure: (error: any) => void;
}

export const useNaverLogin = ({ onSuccess, onFailure }: NaverLoginOptions) => {
  const loadNaverScript = useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      // 이미 로드된 경우 재사용
      if (window.naver) {
        resolve();
        return;
      }

      // 기존 스크립트 제거
      const existingScript = document.querySelector('script[src*="naveridlogin_js_sdk"]');
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement('script');
      script.src = 'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js';
      script.async = true;
      
      script.onload = () => {
        resolve();
      };
      
      script.onerror = () => {
        reject(new Error('네이버 SDK 로드에 실패했습니다.'));
      };
      
      document.head.appendChild(script);
    });
  }, []);

  const login = useCallback(async () => {
    try {
      await loadNaverScript();
      
      const naverClientId = import.meta.env.VITE_NAVER_CLIENT_ID;
      
      if (!naverClientId) {
        onFailure('네이버 클라이언트 ID가 설정되지 않았습니다.');
        return;
      }

      if (!window.naver) {
        onFailure('네이버 SDK가 로드되지 않았습니다.');
        return;
      }

      // 팝업으로 로그인 처리
      const naverLogin = new window.naver.LoginWithNaverId({
        clientId: naverClientId,
        callbackUrl: `${window.location.origin}/login`,
        isPopup: true,
        callbackHandle: true
      });

      // DOM 요소 없이 초기화 (버튼 생성 안함)
      naverLogin.init();

      // 팝업 로그인 실행
      naverLogin.authorize();

      // 로그인 결과 확인을 위한 interval 설정
      const checkInterval = setInterval(() => {
        naverLogin.getLoginStatus((status: boolean) => {
          if (status) {
            clearInterval(checkInterval);
            
            const user = naverLogin.user;
            const userData = {
              email: user.getEmail(),
              name: user.getName(),
              nickname: user.getNickname(),
              profile_image: user.getProfileImage()
            };
            
            onSuccess(userData);
          }
        });
      }, 1000);

      // 10초 후 타임아웃
      setTimeout(() => {
        clearInterval(checkInterval);
      }, 10000);

    } catch (error) {
      onFailure(error);
    }
  }, [loadNaverScript, onSuccess, onFailure]);

  return { login };
};