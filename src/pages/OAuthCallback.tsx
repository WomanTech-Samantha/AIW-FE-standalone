import { useEffect, useState } from 'react';

export default function OAuthCallback() {
  const [status, setStatus] = useState('processing');

  useEffect(() => {
    // URL 파라미터 확인
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const error = urlParams.get('error');
    
    // 디버깅 정보를 화면에도 표시
    const debugInfo = {
      code: code || 'null',
      state: state || 'null',
      error: error || 'null',
      hasOpener: !!window.opener,
      openerClosed: window.opener ? window.opener.closed : 'N/A',
      origin: window.location.origin
    };
    
    console.log('OAuth Callback Debug:', debugInfo);
    
    // 디버깅 정보를 sessionStorage에 저장
    sessionStorage.setItem('oauth_debug', JSON.stringify(debugInfo));
    
    // localStorage를 통한 결과 전달
    try {
      // 결과를 localStorage에 저장
      const result = {
        code,
        state,
        error,
        timestamp: Date.now()
      };
      
      // 카카오와 네이버 구분을 위해 provider 확인
      const isKakao = sessionStorage.getItem('kakao_state') === state;
      const isNaver = sessionStorage.getItem('naver_state') === state;
      
      if (isKakao) {
        localStorage.setItem('kakao_oauth_result', JSON.stringify(result));
        console.log('Kakao OAuth result saved to localStorage:', result);
      } else if (isNaver) {
        localStorage.setItem('naver_oauth_result', JSON.stringify(result));
        console.log('Naver OAuth result saved to localStorage:', result);
      }
      
      // 부모 창으로 메시지 전송도 시도 (호환성을 위해)
      if (window.opener && !window.opener.closed) {
        try {
          window.opener.postMessage({
            type: 'oauth-callback',
            code,
            state,
            error
          }, window.location.origin);
          console.log('Message sent to opener');
        } catch (e) {
          console.log('Failed to send message to opener:', e);
        }
        
        setStatus('success');
      } else {
        setStatus('no-opener');
      }
      
      // 창 닫기
      setTimeout(() => {
        window.close();
        // 창이 닫히지 않으면 사용자에게 안내
        setTimeout(() => {
          setStatus('close-manually');
        }, 1000);
      }, 1500);
      
    } catch (err) {
      console.error('OAuth callback error:', err);
      setStatus('error');
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8">
        {status === 'processing' && (
          <>
            <h2 className="text-xl font-semibold mb-2">로그인 처리 중...</h2>
            <p className="text-muted-foreground">잠시만 기다려주세요.</p>
            <div className="mt-4 text-xs text-gray-500">
              <p>Code: {new URLSearchParams(window.location.search).get('code') || 'none'}</p>
              <p>State: {new URLSearchParams(window.location.search).get('state') || 'none'}</p>
              <p>Opener: {window.opener ? 'exists' : 'missing'}</p>
            </div>
          </>
        )}
        {status === 'success' && (
          <>
            <h2 className="text-xl font-semibold mb-2 text-green-600">로그인 성공!</h2>
            <p className="text-muted-foreground">창이 자동으로 닫힙니다.</p>
          </>
        )}
        {status === 'no-opener' && (
          <>
            <h2 className="text-xl font-semibold mb-2">처리 완료</h2>
            <p className="text-muted-foreground">창이 자동으로 닫힙니다.</p>
          </>
        )}
        {status === 'close-manually' && (
          <>
            <h2 className="text-xl font-semibold mb-2">로그인 완료</h2>
            <p className="text-muted-foreground mb-4">이 창을 닫아주세요.</p>
            <button 
              onClick={() => window.close()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              창 닫기
            </button>
          </>
        )}
        {status === 'error' && (
          <>
            <h2 className="text-xl font-semibold mb-2 text-red-600">오류 발생</h2>
            <p className="text-muted-foreground">로그인 처리 중 문제가 발생했습니다.</p>
          </>
        )}
      </div>
    </div>
  );
}