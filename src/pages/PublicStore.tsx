import { useState, useEffect } from "react";
import { useSearchParams, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "@/context/MockAuthContext";
import CozyHome from "@/templates/Cozy/CozyHome";
import ChicHome from "@/templates/Chic/ChicHome";
import BeautyHome from "@/templates/Beauty/BeautyHome";
import CozyCategory from "@/templates/Cozy/CozyCategory";
import ChicCategory from "@/templates/Chic/ChicCategory";
import BeautyCategory from "@/templates/Beauty/BeautyCategory";
import CozyProduct from "@/templates/Cozy/CozyProduct";
import ChicProduct from "@/templates/Chic/ChicProduct";
import BeautyProduct from "@/templates/Beauty/BeautyProduct";
import "@/templates/base.css";

interface StoreData {
  id: string;
  storeName: string;
  subdomain: string;
  description: string;
  bannerImageUrl: string;
  templateType: string;
  templateColor: string;
  visitorCount: number;
}

interface BrandData {
  id: string;
  brandName: string;
  slogan: string;
  logoUrl: string;
  category: string;
  description: string;
  brandColor: string;
  targetAudience: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  imageUrl: string;
  category: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
}

// UTF-8 문자열을 base64로 인코딩하는 안전한 함수
const encodeToBase64 = (str: string): string => {
  // UTF-8 문자열을 UTF-16 코드 단위로 변환 후 base64 인코딩
  return btoa(unescape(encodeURIComponent(str)));
};

// 업종별 상품 데이터 생성 함수
const generateMockProducts = (business: string): Product[] => {
  const businessType = business.split(' ')[1] || business; // 이모지 제거
  
  const productsByBusiness: Record<string, Product[]> = {
    "침구·이불": [
      {
        id: "bedding-001",
        name: "프리미엄 구스다운 이불",
        price: 189000,
        originalPrice: 220000,
        description: "최고급 구스다운으로 만든 따뜻하고 부드러운 이불입니다.",
        imageUrl: "data:image/svg+xml;base64," + encodeToBase64(`
          <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="300" fill="#F8F3F0"/>
            <rect x="50" y="100" width="200" height="120" rx="10" fill="#E8D5C4"/>
            <rect x="60" y="110" width="180" height="100" rx="8" fill="#F5E6D8"/>
            <text x="150" y="240" font-family="Arial" font-size="14" fill="#8B7355" text-anchor="middle">프리미엄 이불</text>
          </svg>
        `),
        category: "침구",
        inStock: true,
        rating: 4.8,
        reviewCount: 127
      },
      {
        id: "bedding-002", 
        name: "호텔식 베개 세트",
        price: 89000,
        description: "5성급 호텔에서 사용하는 프리미엄 베개 2개 세트",
        imageUrl: "data:image/svg+xml;base64," + encodeToBase64(`
          <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="300" fill="#F8F3F0"/>
            <ellipse cx="100" cy="150" rx="60" ry="30" fill="#E8D5C4"/>
            <ellipse cx="200" cy="150" rx="60" ry="30" fill="#E8D5C4"/>
            <text x="150" y="240" font-family="Arial" font-size="14" fill="#8B7355" text-anchor="middle">호텔식 베개</text>
          </svg>
        `),
        category: "침구",
        inStock: true,
        rating: 4.6,
        reviewCount: 89
      },
      {
        id: "bedding-003",
        name: "순면 침대 시트 세트",
        price: 65000,
        description: "100% 순면으로 만든 부드러운 침대 시트 세트",
        imageUrl: "data:image/svg+xml;base64," + encodeToBase64(`
          <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="300" fill="#F8F3F0"/>
            <rect x="40" y="80" width="220" height="140" rx="5" fill="#F0E6D6"/>
            <rect x="50" y="90" width="200" height="120" rx="3" fill="#FFFFFF"/>
            <text x="150" y="240" font-family="Arial" font-size="14" fill="#8B7355" text-anchor="middle">순면 시트</text>
          </svg>
        `),
        category: "침구",
        inStock: true,
        rating: 4.7,
        reviewCount: 156
      }
    ],
    "커튼·블라인드": [
      {
        id: "curtain-001",
        name: "모던 암막 커튼",
        price: 129000,
        originalPrice: 159000,
        description: "99% 차광률을 자랑하는 모던한 디자인의 암막 커튼",
        imageUrl: "data:image/svg+xml;base64," + encodeToBase64(`
          <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="300" fill="#F5F7F4"/>
            <rect x="60" y="40" width="180" height="200" fill="#6B8E65"/>
            <rect x="70" y="50" width="160" height="180" fill="#8FA885"/>
            <text x="150" y="270" font-family="Arial" font-size="14" fill="#4A5D47" text-anchor="middle">암막 커튼</text>
          </svg>
        `),
        category: "커튼",
        inStock: true,
        rating: 4.9,
        reviewCount: 203
      },
      {
        id: "curtain-002",
        name: "우드 블라인드",
        price: 95000,
        description: "천연 우드로 만든 고급스러운 블라인드",
        imageUrl: "data:image/svg+xml;base64," + encodeToBase64(`
          <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="300" fill="#F5F7F4"/>
            <g>
              <rect x="50" y="60" width="200" height="8" fill="#A8923B"/>
              <rect x="50" y="75" width="200" height="8" fill="#B5A245"/>
              <rect x="50" y="90" width="200" height="8" fill="#A8923B"/>
              <rect x="50" y="105" width="200" height="8" fill="#B5A245"/>
              <rect x="50" y="120" width="200" height="8" fill="#A8923B"/>
              <rect x="50" y="135" width="200" height="8" fill="#B5A245"/>
              <rect x="50" y="150" width="200" height="8" fill="#A8923B"/>
            </g>
            <text x="150" y="200" font-family="Arial" font-size="14" fill="#7A6D2E" text-anchor="middle">우드 블라인드</text>
          </svg>
        `),
        category: "블라인드",
        inStock: true,
        rating: 4.5,
        reviewCount: 78
      }
    ],
    "의류·패션": [
      {
        id: "fashion-001",
        name: "캐시미어 니트 가디건",
        price: 159000,
        originalPrice: 189000,
        description: "100% 캐시미어로 만든 고급스러운 가디건",
        imageUrl: "data:image/svg+xml;base64," + encodeToBase64(`
          <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="300" fill="#FEF7F7"/>
            <path d="M100 80 L200 80 L200 220 L100 220 Z" fill="#D4526E"/>
            <path d="M90 90 L110 90 L110 200 L90 200 Z" fill="#D4526E"/>
            <path d="M190 90 L210 90 L210 200 L190 200 Z" fill="#D4526E"/>
            <text x="150" y="260" font-family="Arial" font-size="14" fill="#A03851" text-anchor="middle">캐시미어 가디건</text>
          </svg>
        `),
        category: "상의",
        inStock: true,
        rating: 4.8,
        reviewCount: 94
      },
      {
        id: "fashion-002",
        name: "실크 블라우스",
        price: 89000,
        description: "고급 실크 소재의 우아한 블라우스",
        imageUrl: "data:image/svg+xml;base64," + encodeToBase64(`
          <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="300" fill="#FEF7F7"/>
            <path d="M110 70 L190 70 L190 200 L110 200 Z" fill="#F5B7B1"/>
            <path d="M100 80 L120 80 L120 120 L100 120 Z" fill="#F5B7B1"/>
            <path d="M180 80 L200 80 L200 120 L180 120 Z" fill="#F5B7B1"/>
            <text x="150" y="240" font-family="Arial" font-size="14" fill="#A03851" text-anchor="middle">실크 블라우스</text>
          </svg>
        `),
        category: "상의",
        inStock: true,
        rating: 4.6,
        reviewCount: 67
      },
      {
        id: "fashion-003", 
        name: "데님 스키니 진",
        price: 72000,
        originalPrice: 89000,
        description: "편안한 핏의 스트레치 데님 팬츠",
        imageUrl: "data:image/svg+xml;base64," + encodeToBase64(`
          <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="300" fill="#FEF7F7"/>
            <path d="M120 80 L180 80 L175 250 L125 250 Z" fill="#4A90E2"/>
            <path d="M125 80 L175 80 L170 160 L130 160 Z" fill="#5BA0F2"/>
            <text x="150" y="280" font-family="Arial" font-size="14" fill="#A03851" text-anchor="middle">데님 진</text>
          </svg>
        `),
        category: "하의",
        inStock: true,
        rating: 4.4,
        reviewCount: 123
      }
    ],
    "음식·요리": [
      {
        id: "food-001",
        name: "수제 딸기잼 세트",
        price: 35000,
        description: "국산 딸기로 만든 수제 잼 3종 세트",
        imageUrl: "data:image/svg+xml;base64," + encodeToBase64(`
          <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="300" fill="#FFF9F0"/>
            <ellipse cx="100" cy="180" rx="30" ry="50" fill="#C67B5C"/>
            <ellipse cx="150" cy="180" rx="30" ry="50" fill="#C67B5C"/>
            <ellipse cx="200" cy="180" rx="30" ry="50" fill="#C67B5C"/>
            <text x="150" y="260" font-family="Arial" font-size="14" fill="#8B5A42" text-anchor="middle">수제 딸기잼</text>
          </svg>
        `),
        category: "잼",
        inStock: true,
        rating: 4.9,
        reviewCount: 167
      }
    ],
    "뷰티·화장품": [
      {
        id: "beauty-001",
        name: "천연 수분 크림",
        price: 89000,
        description: "천연 성분으로 만든 보습 크림",
        imageUrl: "data:image/svg+xml;base64," + encodeToBase64(`
          <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="300" fill="#F9F7F9"/>
            <ellipse cx="150" cy="150" rx="50" ry="60" fill="#9B7EBD"/>
            <ellipse cx="150" cy="130" rx="40" ry="15" fill="#B195CC"/>
            <text x="150" y="240" font-family="Arial" font-size="14" fill="#6D5B7D" text-anchor="middle">천연 수분 크림</text>
          </svg>
        `),
        category: "스킨케어",
        inStock: true,
        rating: 4.7,
        reviewCount: 234
      },
      {
        id: "beauty-002",
        name: "글로우 비타민 세럼",
        price: 125000,
        originalPrice: 149000,
        description: "비타민 C 고농축 브라이트닝 세럼",
        imageUrl: "data:image/svg+xml;base64," + encodeToBase64(`
          <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="300" fill="#F9F7F9"/>
            <rect x="130" y="80" width="40" height="140" rx="20" fill="#9B7EBD"/>
            <circle cx="150" cy="70" r="15" fill="#B195CC"/>
            <text x="150" y="250" font-family="Arial" font-size="14" fill="#6D5B7D" text-anchor="middle">비타민 세럼</text>
          </svg>
        `),
        category: "스킨케어",
        inStock: true,
        rating: 4.8,
        reviewCount: 189
      },
      {
        id: "beauty-003",
        name: "모이스처 립밤 세트",
        price: 42000,
        description: "천연 오일 성분의 촉촉한 립밤 3종 세트",
        imageUrl: "data:image/svg+xml;base64," + encodeToBase64(`
          <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="300" fill="#F9F7F9"/>
            <rect x="80" y="120" width="25" height="80" rx="12" fill="#C4A9D8"/>
            <rect x="135" y="120" width="25" height="80" rx="12" fill="#9B7EBD"/>
            <rect x="190" y="120" width="25" height="80" rx="12" fill="#B195CC"/>
            <text x="150" y="240" font-family="Arial" font-size="14" fill="#6D5B7D" text-anchor="middle">립밤 세트</text>
          </svg>
        `),
        category: "메이크업",
        inStock: true,
        rating: 4.6,
        reviewCount: 156
      },
      {
        id: "beauty-004",
        name: "하이드라 클렌징 폼",
        price: 68000,
        description: "순한 성분의 수분 클렌징 폼",
        imageUrl: "data:image/svg+xml;base64," + encodeToBase64(`
          <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="300" fill="#F9F7F9"/>
            <ellipse cx="150" cy="150" rx="40" ry="80" fill="#9B7EBD"/>
            <rect x="130" y="60" width="40" height="20" rx="10" fill="#B195CC"/>
            <text x="150" y="260" font-family="Arial" font-size="14" fill="#6D5B7D" text-anchor="middle">클렌징 폼</text>
          </svg>
        `),
        category: "클렌징",
        inStock: true,
        rating: 4.5,
        reviewCount: 203
      }
    ],
    "수공예": [
      {
        id: "craft-001",
        name: "핸드메이드 도자기 머그컵",
        price: 45000,
        description: "수작업으로 만든 유니크한 도자기 머그컵",
        imageUrl: "data:image/svg+xml;base64," + encodeToBase64(`
          <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="300" fill="#F4F6F8"/>
            <path d="M120 100 L180 100 L185 200 L115 200 Z" fill="#7189A6"/>
            <path d="M185 130 L220 130 Q225 130 225 140 L225 160 Q225 170 220 170 L185 170" fill="#7189A6"/>
            <text x="150" y="240" font-family="Arial" font-size="14" fill="#4A5D6B" text-anchor="middle">핸드메이드 머그컵</text>
          </svg>
        `),
        category: "도자기",
        inStock: true,
        rating: 4.6,
        reviewCount: 87
      },
      {
        id: "craft-002",
        name: "우드 카빙 트레이",
        price: 68000,
        originalPrice: 79000,
        description: "천연 원목으로 제작한 핸드메이드 트레이",
        imageUrl: "data:image/svg+xml;base64," + encodeToBase64(`
          <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="300" fill="#F4F6F8"/>
            <rect x="60" y="120" width="180" height="100" rx="10" fill="#A8923B"/>
            <rect x="70" y="130" width="160" height="80" rx="5" fill="#B5A245"/>
            <text x="150" y="250" font-family="Arial" font-size="14" fill="#4A5D6B" text-anchor="middle">우드 트레이</text>
          </svg>
        `),
        category: "목공예",
        inStock: true,
        rating: 4.8,
        reviewCount: 124
      },
      {
        id: "craft-003",
        name: "마크라메 월행잉",
        price: 52000,
        description: "천연 코튼으로 만든 보헤미안 스타일 벽장식",
        imageUrl: "data:image/svg+xml;base64," + encodeToBase64(`
          <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="300" fill="#F4F6F8"/>
            <rect x="100" y="60" width="100" height="10" fill="#8DA3C0"/>
            <line x1="120" y1="70" x2="120" y2="120" stroke="#8DA3C0" stroke-width="3"/>
            <line x1="150" y1="70" x2="150" y2="140" stroke="#8DA3C0" stroke-width="3"/>
            <line x1="180" y1="70" x2="180" y2="120" stroke="#8DA3C0" stroke-width="3"/>
            <circle cx="150" cy="160" r="20" fill="none" stroke="#8DA3C0" stroke-width="3"/>
            <text x="150" y="220" font-family="Arial" font-size="14" fill="#4A5D6B" text-anchor="middle">마크라메 월행잉</text>
          </svg>
        `),
        category: "직조",
        inStock: true,
        rating: 4.7,
        reviewCount: 93
      }
    ]
  };
  
  // 기본 상품이 없으면 침구 상품 반환
  return productsByBusiness[businessType] || productsByBusiness["침구·이불"];
};

export default function PublicStore() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { user } = useAuth();
  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [brandData, setBrandData] = useState<BrandData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 쿼리 파라미터에서 store 추출
    const storeParam = searchParams.get('store');
    
    if (storeParam) {
      // store 파라미터가 있으면 스토어 정보 로드
      loadStoreData(storeParam);
    } else {
      // 메인 도메인인 경우 메인 앱으로 리디렉션 (개발환경에서는 로딩만 false로)
      setLoading(false);
    }
  }, [searchParams]);

  const loadStoreData = async (subdomain: string) => {
    try {
      console.log('Loading mock store data for:', subdomain);
      console.log('Current user data:', user);
      
      // Mock 스토어 데이터 (사용자 설정 반영)
      const mockStoreData: StoreData = {
        id: "demo-store-001",
        storeName: user?.storeName || "데모 스토어",
        subdomain: subdomain,
        description: user?.tagline || "데모용 온라인 스토어입니다",
        bannerImageUrl: user?.brandImageUrl || "",
        templateType: user?.template || "cozy", // 사용자가 선택한 템플릿
        templateColor: user?.theme || "warm-rose", // 사용자가 선택한 색상
        visitorCount: 1254
      };
      
      console.log('Generated store data:', mockStoreData);

      const mockBrandData: BrandData = {
        id: "demo-brand-001",
        brandName: user?.storeName || "데모 브랜드",
        slogan: user?.tagline || "당신의 편안한 일상을 위한 프리미엄 제품",
        logoUrl: user?.brandImageUrl || "",
        category: user?.business || "침구·이불",
        description: "고품질 제품으로 고객의 만족을 추구합니다",
        brandColor: user?.theme || "warm-rose",
        targetAudience: "20-40대 여성"
      };

      setStoreData(mockStoreData);
      setBrandData(mockBrandData);
      
      // 하드코딩된 상품 데이터 생성
      const mockProducts = generateMockProducts(user?.business || "침구·이불");
      
      // 템플릿에서 사용할 수 있도록 전역 변수 설정
      (window as any).STORE_DATA = {
        store: mockStoreData,
        brand: mockBrandData,
        products: mockProducts
      };
      console.log('Global STORE_DATA set:', (window as any).STORE_DATA);
      
    } catch (err) {
      console.error('Store loading error:', err);
      setError('스토어 정보를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const applyTheme = (templateColor: string) => {
    const themes = {
      'warm-rose': {
        primary: '#D4526E',
        secondary: '#F5B7B1',
        accent: '#E8A49C',
        background: '#FAF3F0'
      },
      'sage-green': {
        primary: '#6B8E65',
        secondary: '#A8C09C',
        accent: '#8FA885',
        background: '#F5F7F4'
      },
      'dusty-blue': {
        primary: '#7189A6',
        secondary: '#A8B8CC',
        accent: '#8DA3C0',
        background: '#F4F6F8'
      },
      'terracotta': {
        primary: '#C67B5C',
        secondary: '#E5A985',
        accent: '#D69373',
        background: '#FAF6F3'
      },
      'lavender': {
        primary: '#9B7EBD',
        secondary: '#C4A9D8',
        accent: '#B195CC',
        background: '#F7F5F9'
      }
    };

    const theme = themes[templateColor as keyof typeof themes] || themes['warm-rose'];
    const root = document.documentElement;
    
    root.style.setProperty('--color-primary', theme.primary);
    root.style.setProperty('--color-secondary', theme.secondary);
    root.style.setProperty('--color-accent', theme.accent);
    root.style.setProperty('--color-background', theme.background);
  };

  useEffect(() => {
    if (storeData?.templateColor) {
      applyTheme(storeData.templateColor);
    }
  }, [storeData]);

  // 스토어 데이터를 전역으로 설정 (템플릿에서 사용할 수 있도록)
  useEffect(() => {
    if (storeData && brandData) {
      console.log('Setting window.STORE_DATA:', { store: storeData, brand: brandData });
      (window as any).STORE_DATA = {
        store: storeData,
        brand: brandData
      };
    }
  }, [storeData, brandData]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">스토어를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">오류 발생</h1>
          <p className="text-gray-600 mb-8">{error}</p>
          <a 
            href={`http://localhost:${import.meta.env.VITE_FRONTEND_PORT || '5173'}`} 
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            메인 사이트로 이동
          </a>
        </div>
      </div>
    );
  }

  // storeData가 없으면 기본값으로 초기화
  if (!storeData) {
    const defaultStoreData: StoreData = {
      id: "default-store",
      storeName: "데모 스토어",
      subdomain: "demo",
      description: "데모용 온라인 스토어입니다",
      bannerImageUrl: "",
      templateType: "cozy",
      templateColor: "warm-rose",
      visitorCount: 1254
    };
    
    const defaultBrandData: BrandData = {
      id: "default-brand",
      brandName: "데모 브랜드", 
      slogan: "당신의 편안한 일상을 위한 프리미엄 제품",
      logoUrl: "",
      category: "침구·이불",
      description: "고품질 제품으로 고객의 만족을 추구합니다",
      brandColor: "warm-rose",
      targetAudience: "20-40대 여성"
    };

    setStoreData(defaultStoreData);
    setBrandData(defaultBrandData);
    
    // 기본 상품 데이터 생성
    const defaultProducts = generateMockProducts("침구·이불");
    
    // 전역 변수 설정
    (window as any).STORE_DATA = {
      store: defaultStoreData,
      brand: defaultBrandData,
      products: defaultProducts
    };
    
    console.log('기본 스토어 데이터 설정 완료');
  }

  // store 파라미터가 없으면 메인 페이지로 리다이렉트
  const storeParam = searchParams.get('store');
  if (!storeParam) {
    return <Navigate to="/" replace />;
  }

  // URL 경로에 따른 컴포넌트 선택
  const getComponent = () => {
    const templateType = storeData?.templateType?.toLowerCase() || 'cozy';
    const pathname = location.pathname;
    
    console.log('PublicStore getComponent:', { 
      templateType, 
      pathname, 
      storeData: storeData?.templateType,
      userTemplate: user?.template 
    });
    
    // 경로별 컴포넌트 매핑
    const componentMap = {
      cozy: {
        home: CozyHome,
        category: CozyCategory,
        product: CozyProduct
      },
      chic: {
        home: ChicHome,
        category: ChicCategory,
        product: ChicProduct
      },
      beauty: {
        home: BeautyHome,
        category: BeautyCategory,
        product: BeautyProduct
      }
    };

    const components = componentMap[templateType] || componentMap.cozy;

    // 경로 분석하여 적절한 컴포넌트 반환
    if (pathname.startsWith('/category/')) {
      return components.category;
    } else if (pathname.startsWith('/product/')) {
      return components.product;
    } else {
      return components.home;
    }
  };

  const SelectedComponent = getComponent();

  // 정상적으로 스토어 데이터가 있는 경우에만 템플릿 렌더링
  return (
    <div className="public-store">
      <SelectedComponent />
    </div>
  );
}