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
    name: '아로마 캔들',
    description: '라벤더 향의 편안한 아로마 캔들',
    price: 25000,
    category: 'lifestyle',
    images: ['/placeholder.svg'],
    stock: 50,
    featured: false,
    createdAt: '2024-01-02T00:00:00Z'
  },
  {
    id: '3',
    name: '오가닉 립밤',
    description: '촉촉하고 부드러운 유기농 립밤',
    price: 8000,
    category: 'beauty',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    stock: 200,
    featured: true,
    createdAt: '2024-01-03T00:00:00Z'
  }
];

// Mock 스토어 데이터
export const mockStore = {
  id: '1',
  name: '뷰티 & 라이프',
  url: 'beauty-life',
  subdomain: 'beauty-life',
  description: '천연 뷰티 제품과 라이프스타일 아이템을 판매하는 온라인 스토어',
  theme: 'Beauty',
  color: '#E91E63',
  logo: '/placeholder.svg',
  bannerImage: '/placeholder.svg',
  tagline: '자연이 주는 아름다움',
  contactEmail: 'contact@beauty-life.com',
  contactPhone: '010-1234-5678',
  address: '서울시 강남구 테헤란로 123',
  socialMedia: {
    instagram: '@beauty_life_official',
    facebook: 'beauty.life.official'
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
    username: 'beauty_life_official',
    followersCount: 12450,
    followingCount: 890,
    postsCount: 234,
    profilePictureUrl: '/placeholder.svg',
    biography: '천연 뷰티 브랜드 🌿 | 자연이 주는 아름다움 ✨'
  },
  recentPosts: [
    {
      id: 'post1',
      mediaType: 'IMAGE',
      mediaUrl: '/placeholder.svg',
      caption: '새로운 핸드크림이 출시되었습니다! #핸드크림 #천연화장품',
      timestamp: '2024-08-18T10:00:00Z',
      likesCount: 156,
      commentsCount: 23,
      permalink: 'https://www.instagram.com/p/mock1'
    },
    {
      id: 'post2',
      mediaType: 'IMAGE',
      mediaUrl: '/placeholder.svg',
      caption: '라벤더 아로마 캔들로 편안한 하루 되세요 🕯️ #아로마캔들 #힐링',
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
        username: 'beauty_life_official',
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