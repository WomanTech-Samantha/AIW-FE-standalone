export const mockApiResponses = {
  auth: {
    login: {
      success: true,
      token: 'mock-jwt-token-123',
      user: {
        id: '1',
        email: 'test@example.com',
        name: 'Test User'
      }
    }
  },
  instagram: {
    connect: {
      success: true,
      connected: true,
      accountId: 'mock-insta-123'
    },
    metrics: {
      followers: 1234,
      posts: 56,
      engagement: 4.5
    }
  },
  facebook: {
    connect: {
      success: true,
      connected: true,
      pageId: 'mock-fb-page-123'
    }
  }
};

export const useMockApi = (endpoint: string) => {
  const parts = endpoint.split('/').filter(Boolean);
  let response: any = mockApiResponses;
  
  for (const part of parts) {
    response = response[part];
    if (!response) return { error: 'Endpoint not found' };
  }
  
  return response;
};