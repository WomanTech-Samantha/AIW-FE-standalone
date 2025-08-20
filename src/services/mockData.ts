// Mock 상품 데이터
export const mockProducts = [
  {
    id: '1',
    name: '패치워크 코스터',
    description: '하트 모양의 귀여운 패치워크 코스터',
    price: 12000,
    category: 'lifestyle',
    images: ['https://res.cloudinary.com/dojsq7mnw/image/upload/v1755358464/products/original/1755358464564_%ED%95%98%ED%8A%B8_%ED%8C%A8%EC%B9%98%EC%9B%8C%ED%81%AC_original.jpg'],
    stock: 100,
    featured: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: '퀼트 러그 매트',
    description: '부드럽고 아늑한 퀼트 러그 매트',
    price: 35000,
    category: 'lifestyle',
    images: ['/placeholder.svg'],
    stock: 50,
    featured: false,
    createdAt: '2024-01-02T00:00:00Z'
  },
  {
    id: '3',
    name: '마크라메 벽걸이',
    description: '보헤미안 스타일의 마크라메 벽걸이',
    price: 28000,
    category: 'lifestyle',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    stock: 200,
    featured: true,
    createdAt: '2024-01-03T00:00:00Z'
  }
];

// Mock 스토어 데이터
export const mockStore = {
  id: '1',
  name: '수공예 & 라이프',
  url: 'craft-life',
  subdomain: 'craft-life',
  description: '따뜻한 손길로 만든 수공예품과 라이프스타일 아이템을 판매하는 온라인 스토어',
  theme: 'Beauty',
  color: '#E91E63',
  logo: '/placeholder.svg',
  bannerImage: '/placeholder.svg',
  tagline: '손으로 전하는 따뜻함',
  contactEmail: 'contact@craft-life.com',
  contactPhone: '010-1234-5678',
  address: '서울시 강남구 테헤란로 123',
  socialMedia: {
    instagram: '@craft_life_official',
    facebook: 'craft.life.official',
  },
  settings: {
    allowGuests: true,
    showInventory: true,
    enableReviews: true
  }
};

// Mock Instagram 데이터
export const mockInstagramData = {
  connected: true,
  accountInfo: {
    id: 'mock-insta-123',
    username: 'craft_life_official',
    followersCount: 12450,
    followingCount: 890,
    postsCount: 234,
    profilePictureUrl: '/placeholder.svg',
    biography: '수공예 브랜드 🧵 | 손으로 전하는 따뜻함 ✨'
  },
  recentPosts: [
    {
      id: 'post1',
      mediaType: 'IMAGE',
      mediaUrl: '/placeholder.svg',
      caption: '새로운 패치워크 쿠션이 출시되었습니다! #패치워크 #수공예',
      timestamp: '2024-08-18T10:00:00Z',
      likesCount: 156,
      commentsCount: 23,
      permalink: 'https://www.instagram.com/p/mock1'
    },
    {
      id: 'post2',
      mediaType: 'IMAGE',
      mediaUrl: '/placeholder.svg',
      caption: '마크라메 벽걸이로 공간을 더욱 아름답게 🌿 #마크라메 #인테리어',
      timestamp: '2024-08-17T15:30:00Z',
      likesCount: 203,
      commentsCount: 34,
      permalink: 'https://www.instagram.com/p/mock2'
    }
  ],
  insights: {
    reach: 8920,
    impressions: 12450,
    engagement: 4.2,
    profileViews: 567
  }
};

// Mock 댓글 데이터
export const mockComments = [
  {
    id: 'comment1',
    username: 'user123',
    text: '정말 좋은 제품이에요! 추천합니다 👍',
    timestamp: '2024-08-18T12:00:00Z',
    likeCount: 5,
    replies: [
      {
        id: 'reply1',
        username: 'craft_life_official',
        text: '감사합니다! 앞으로도 좋은 제품으로 찾아뵙겠습니다 😊',
        timestamp: '2024-08-18T12:30:00Z',
        likeCount: 2
      }
    ]
  },
  {
    id: 'comment2',
    username: 'skincare_lover',
    text: '향이 정말 좋아요. 언제 재입고 되나요?',
    timestamp: '2024-08-18T11:45:00Z',
    likeCount: 3,
    replies: []
  }
];

// Mock API 응답 데이터
export const mockApiResponses = {
  auth: {
    login: {
      success: true,
      token: 'mock-jwt-token-123',
      user: {
        id: 'demo-user-001',
        email: 'demo@example.com',
        name: '데모 사용자'
      }
    }
  },
  store: {
    products: mockProducts,
    store: mockStore
  },
  instagram: {
    connect: {
      success: true,
      connected: true,
      accountId: 'mock-insta-123'
    },
    data: mockInstagramData,
    comments: mockComments
  },
  analytics: {
    overview: {
      totalViews: 15420,
      totalSales: 2340000,
      totalOrders: 156,
      conversionRate: 3.2
    },
    dailyStats: [
      { date: '2024-08-18', views: 234, sales: 45000, orders: 3 },
      { date: '2024-08-17', views: 198, sales: 38000, orders: 2 },
      { date: '2024-08-16', views: 267, sales: 52000, orders: 4 }
    ]
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