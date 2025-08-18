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
      
      // 템플릿에서 사용할 수 있도록 전역 변수 설정
      (window as any).STORE_DATA = {
        store: mockStoreData,
        brand: mockBrandData
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

  if (error || !storeData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
          <p className="text-gray-600 mb-8">{error || '스토어를 찾을 수 없습니다.'}</p>
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