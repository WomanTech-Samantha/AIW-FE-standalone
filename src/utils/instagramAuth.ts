// Instagram 연동 상태 확인 유틸리티

export const checkInstagramConnection = () => {
  const token = localStorage.getItem('instagram_access_token');
  const user = localStorage.getItem('instagram_user');
  
  if (!token || !user) {
    return { isConnected: false, data: null };
  }
  
  try {
    const userData = JSON.parse(user);
    return {
      isConnected: true,
      data: {
        token,
        user: userData
      }
    };
  } catch (e) {
    console.error('Instagram 데이터 파싱 실패:', e);
    return { isConnected: false, data: null };
  }
};

export const disconnectInstagram = () => {
  localStorage.removeItem('instagram_access_token');
  localStorage.removeItem('instagram_user');
};

export const saveInstagramConnection = (token: string, userData: any) => {
  localStorage.setItem('instagram_access_token', token);
  localStorage.setItem('instagram_user', JSON.stringify(userData));
  // 토큰 저장 시간도 기록
  localStorage.setItem('instagram_token_saved_at', Date.now().toString());
};

// 토큰 유효성 검사
export const validateInstagramToken = async (token: string): Promise<{isValid: boolean, userData?: any, error?: string}> => {
  try {
    const response = await fetch(`https://graph.instagram.com/me?fields=id,username,account_type&access_token=${token}`);
    const data = await response.json();
    
    if (data.error) {
      return {
        isValid: false,
        error: data.error.message || 'Token validation failed'
      };
    }
    
    return {
      isValid: true,
      userData: data
    };
  } catch (error) {
    return {
      isValid: false,
      error: 'Network error during token validation'
    };
  }
};

// 토큰 갱신이 필요한지 확인 (토큰 저장된 지 50일 이상 경과시)
export const isTokenRefreshNeeded = (): boolean => {
  const savedAt = localStorage.getItem('instagram_token_saved_at');
  if (!savedAt) return true;
  
  const daysSinceStored = (Date.now() - parseInt(savedAt)) / (1000 * 60 * 60 * 24);
  return daysSinceStored > 50; // Instagram 토큰은 60일 유효, 50일에 갱신 권장
};

// 계정 유형 확인
export const getAccountType = (): string | null => {
  const user = localStorage.getItem('instagram_user');
  if (!user) return null;
  
  try {
    const userData = JSON.parse(user);
    return userData.account_type || null;
  } catch (e) {
    return null;
  }
};

// 비즈니스/크리에이터 계정 여부 확인
export const isBusinessOrCreatorAccount = (): boolean => {
  const accountType = getAccountType();
  return accountType === 'BUSINESS' || accountType === 'CREATOR';
};