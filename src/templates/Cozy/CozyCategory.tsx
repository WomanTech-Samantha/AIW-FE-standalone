import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Heart, Search, Menu, User, Filter, Grid, List } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import '../base.css';
// 간단한 이미지 플레이스홀더 생성 함수
const createSimpleImage = (bgColor: string, text: string) => {
  return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(`
    <svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="300" fill="${bgColor}"/>
      <text x="150" y="150" font-family="Arial" font-size="16" fill="#666" text-anchor="middle" dominant-baseline="middle">${text}</text>
    </svg>
  `)));
};

const cozyBeddingImage = createSimpleImage("#f3f4f6", "이미지");
const cozyCurtainsImage = createSimpleImage("#e5e7eb", "이미지");

const CozyCategory = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 현재 store 파라미터 가져오기
  const storeParam = new URLSearchParams(window.location.search).get('store');

  useEffect(() => {
    fetchCategoryProducts();
  }, [categoryName]);

  const fetchCategoryProducts = async () => {
    try {
      setLoading(true);
      
      // 배포용: 전역 상품 데이터 사용
      const storeData = (window as any).STORE_DATA;
      
      if (storeData && storeData.products) {
        console.log('전역 상품 데이터 발견:', storeData.products);
        
        // 업종 정보 가져오기
        const business = storeData.store?.business || '';
        
        // 업종에 따른 카테고리 매핑
        const getCategoryMap = () => {
          if (business.includes('침구') || business.includes('이불')) {
            return {
              'comforters': '이불',
              'pillows': '베개',
              'sheets': '시트',
              'baby': '아기침구',
              'sale': '세일',
              'new-collection': '신상품',
              'all': ''
            };
          } else if (business.includes('수공예')) {
            return {
              'pottery': '도자기',
              'textile': '직물',
              'woodwork': '목공예',
              'jewelry': '액세서리',
              'sale': '세일',
              'new-collection': '신상품',
              'all': ''
            };
          } else {
            // 기본값 (침구)
            return {
              'comforters': '이불',
              'pillows': '베개',
              'sheets': '시트',
              'baby': '아기침구',
              'sale': '세일',
              'new-collection': '신상품',
              'all': ''
            };
          }
        };
        
        const categoryMap = getCategoryMap();
        const categoryNameKr = categoryMap[categoryName] || '';
        
        // 카테고리별 필터링
        let filteredProducts = storeData.products;
        if (categoryNameKr) {
          filteredProducts = storeData.products.filter(product => 
            product.category === categoryNameKr
          );
        }
        
        // 템플릿에 맞는 형식으로 변환
        const formattedProducts = filteredProducts.map(product => ({
          id: product.id,
          image: product.imageUrl || cozyBeddingImage,
          title: product.name,
          price: `${product.price.toLocaleString()}원`,
          originalPrice: product.originalPrice ? `${product.originalPrice.toLocaleString()}원` : null,
          discount: product.originalPrice ? 
            `${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%` : null,
          rating: product.rating || (4.5 + Math.random() * 0.5),
          reviews: product.reviewCount || Math.floor(Math.random() * 200) + 50
        }));
        
        setProducts(formattedProducts);
        console.log('카테고리 상품 로드 완료:', formattedProducts.length, '개');
      } else {
        console.log('전역 상품 데이터 없음, 기본 데이터 사용');
        // 기본 데이터 사용
        setProducts(defaultProducts);
      }
    } catch (err) {
      console.error('상품 조회 오류:', err);
      // 에러 시에도 기본 데이터 사용
      setProducts(defaultProducts);
    } finally {
      setLoading(false);
    }
  };

  // 업종별 기본 상품 데이터 생성
  const getDefaultProducts = () => {
    const storeData = (window as any).STORE_DATA;
    const business = storeData?.store?.business || '';
    
    if (business.includes('수공예')) {
      return [
        {
          id: 1,
          image: cozyBeddingImage,
          title: "수제 도자기 찻잔 세트",
          price: "145,000원",
          originalPrice: "185,000원",
          discount: "22%",
          rating: 4.9,
          reviews: 87
        },
        {
          id: 2,
          image: cozyCurtainsImage,
          title: "전통 자수 벽걸이",
          price: "95,000원",
          originalPrice: "125,000원",
          discount: "24%",
          rating: 4.7,
          reviews: 134
        },
        {
          id: 3,
          image: cozyBeddingImage,
          title: "원목 트레이",
          price: "68,000원",
          originalPrice: "89,000원",
          discount: "24%",
          rating: 4.8,
          reviews: 76
        },
        {
          id: 4,
          image: cozyCurtainsImage,
          title: "천연염색 스카프",
          price: "125,000원",
          originalPrice: "165,000원",
          discount: "24%",
          rating: 4.6,
          reviews: 45
        },
        {
          id: 5,
          image: cozyBeddingImage,
          title: "핸드메이드 도자기 꽃병",
          price: "89,000원",
          originalPrice: "119,000원",
          discount: "25%",
          rating: 4.8,
          reviews: 92
        },
        {
          id: 6,
          image: cozyCurtainsImage,
          title: "자수 쿠션커버",
          price: "78,000원",
          originalPrice: "98,000원",
          discount: "20%",
          rating: 4.7,
          reviews: 156
        }
      ];
    } else {
      // 침구 기본값
      return [
        {
          id: 1,
          image: cozyBeddingImage,
          title: "프리미엄 코튼 침구 세트",
          price: "129,000원",
          originalPrice: "189,000원",
          discount: "32%",
          rating: 4.8,
          reviews: 156
        },
        {
          id: 2,
          image: cozyCurtainsImage,
          title: "메모리폼 베개",
          price: "89,000원",
          originalPrice: "125,000원",
          discount: "29%",
          rating: 4.6,
          reviews: 89
        },
        {
          id: 3,
          image: cozyBeddingImage,
          title: "울트라소프트 이불",
          price: "145,000원",
          originalPrice: "205,000원",
          discount: "29%",
          rating: 4.7,
          reviews: 234
        },
        {
          id: 4,
          image: cozyCurtainsImage,
          title: "실크 베개커버",
          price: "59,000원",
          originalPrice: "89,000원",
          discount: "34%",
          rating: 4.9,
          reviews: 167
        },
        {
          id: 5,
          image: cozyBeddingImage,
          title: "아기 침구 세트",
          price: "98,000원",
          originalPrice: "139,000원",
          discount: "29%",
          rating: 4.8,
          reviews: 122
        },
        {
          id: 6,
          image: cozyCurtainsImage,
          title: "호텔급 시트",
          price: "125,000원",
          originalPrice: "179,000원",
          discount: "30%",
          rating: 4.5,
          reviews: 93
        }
      ];
    }
  };

  const defaultProducts = getDefaultProducts();

  // 현재 카테고리 정보 가져오기
  const getCurrentCategoryInfo = () => {
    const storeData = (window as any).STORE_DATA;
    const business = storeData?.store?.business || '';
    
    if (business.includes('침구') || business.includes('이불')) {
      const categoryMap = {
        'comforters': { name: '이불·이불세트', desc: '편안한 잠자리를 위한 프리미엄 이불 컬렉션' },
        'pillows': { name: '베개·베개커버', desc: '건강한 수면을 위한 베개 컬렉션' },
        'sheets': { name: '시트·매트리스커버', desc: '부드러운 촉감의 시트 컬렉션' },
        'baby': { name: '아기침구', desc: '우리 아이를 위한 안전한 침구 컬렉션' },
        'sale': { name: '세일', desc: '특가 할인 침구 상품' },
        'new-collection': { name: '신상 컬렉션', desc: '2025 최신 침구 컬렉션' },
        'all': { name: '전체 상품', desc: '모든 침구 상품' }
      };
      return categoryMap[categoryName] || { name: '침구류', desc: '편안한 잠자리를 위한 프리미엄 침구 컬렉션' };
    } else if (business.includes('수공예')) {
      const categoryMap = {
        'pottery': { name: '도자기·세라믹', desc: '정성으로 빚어낸 수제 도자기 컬렉션' },
        'textile': { name: '직물·자수', desc: '섬세한 손끝에서 탄생한 직물 작품' },
        'woodwork': { name: '목공예', desc: '자연의 따뜻함을 담은 목공예품' },
        'jewelry': { name: '액세서리', desc: '특별한 순간을 위한 핸드메이드 액세서리' },
        'sale': { name: '세일', desc: '특가 할인 수공예품' },
        'new-collection': { name: '신작 컬렉션', desc: '2025 최신 수공예 작품' },
        'all': { name: '전체 상품', desc: '모든 수공예 작품' }
      };
      return categoryMap[categoryName] || { name: '수공예', desc: '정성으로 만든 핸드메이드 작품들' };
    } else {
      // 기본값 (침구)
      const categoryMap = {
        'comforters': { name: '이불·이불세트', desc: '편안한 잠자리를 위한 프리미엄 이불 컬렉션' },
        'pillows': { name: '베개·베개커버', desc: '건강한 수면을 위한 베개 컬렉션' },
        'sheets': { name: '시트·매트리스커버', desc: '부드러운 촉감의 시트 컬렉션' },
        'baby': { name: '아기침구', desc: '우리 아이를 위한 안전한 침구 컬렉션' },
        'sale': { name: '세일', desc: '특가 할인 침구 상품' },
        'new-collection': { name: '신상 컬렉션', desc: '2025 최신 침구 컬렉션' },
        'all': { name: '전체 상품', desc: '모든 침구 상품' }
      };
      return categoryMap[categoryName] || { name: '침구류', desc: '편안한 잠자리를 위한 프리미엄 침구 컬렉션' };
    }
  };

  const currentCategory = getCurrentCategoryInfo();

  // 업종별 네비게이션 메뉴 생성
  const getNavigationItems = () => {
    const storeData = (window as any).STORE_DATA;
    const business = storeData?.store?.business || '';
    
    if (business.includes('침구') || business.includes('이불')) {
      return [
        { path: 'comforters', name: '이불·이불세트' },
        { path: 'pillows', name: '베개·베개커버' },
        { path: 'sheets', name: '시트·매트리스커버' },
        { path: 'baby', name: '아기침구' },
        { path: 'sale', name: '세일' }
      ];
    } else if (business.includes('수공예')) {
      return [
        { path: 'pottery', name: '도자기·세라믹' },
        { path: 'textile', name: '직물·자수' },
        { path: 'woodwork', name: '목공예' },
        { path: 'jewelry', name: '액세서리' },
        { path: 'sale', name: '세일' }
      ];
    } else {
      // 기본값 (침구)
      return [
        { path: 'comforters', name: '이불·이불세트' },
        { path: 'pillows', name: '베개·베개커버' },
        { path: 'sheets', name: '시트·매트리스커버' },
        { path: 'baby', name: '아기침구' },
        { path: 'sale', name: '세일' }
      ];
    }
  };

  const navigationItems = getNavigationItems();

  // 테마 적용 함수
  const applyTheme = (templateColor: string) => {
    const themes = {
      'warm-rose': { primary: '#D4526E', secondary: '#F5B7B1', accent: '#E8A49C', background: '#FAF3F0' },
      'sage-green': { primary: '#6B8E65', secondary: '#A8C09C', accent: '#8FA885', background: '#F5F7F4' },
      'dusty-blue': { primary: '#7189A6', secondary: '#A8B8CC', accent: '#8DA3C0', background: '#F4F6F8' },
      'lavender': { primary: '#9B7EBD', secondary: '#C4A9D8', accent: '#B195CC', background: '#F7F5F9' },
      'terracotta': { primary: '#C67B5C', secondary: '#E5A985', accent: '#D69373', background: '#FAF6F3' }
    };
    const theme = themes[templateColor as keyof typeof themes] || themes['warm-rose'];
    const root = document.documentElement;
    root.style.setProperty('--color-primary', theme.primary);
    root.style.setProperty('--color-secondary', theme.secondary);
    root.style.setProperty('--color-accent', theme.accent);
    root.style.setProperty('--color-background', theme.background);
  };

  // 스토어 데이터에서 테마 적용
  useEffect(() => {
    const storeData = (window as any).STORE_DATA;
    if (storeData?.store?.templateColor) {
      applyTheme(storeData.store.templateColor);
    }
  }, []);

  // 스토어 정보 가져오기
  const getStoreInfo = () => {
    const storeData = (window as any).STORE_DATA;
    return {
      storeName: storeData?.store?.storeName || '코지홈',
      description: storeData?.store?.description || '포근하고 따뜻한 일상을 만들어가는 홈 텍스타일 전문몰'
    };
  };

  const storeInfo = getStoreInfo();

  return (
    <div className="min-h-screen bg-gray-50">
      
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Menu className="h-6 w-6 mr-4 lg:hidden" />
              <Link to={`/?store=${storeParam}`} className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>{storeInfo.storeName}</Link>
            </div>
            
            <nav className="hidden lg:flex space-x-8">
              <Link to={`/?store=${storeParam}`} className="text-gray-700 hover:text-gray-900 font-medium">홈</Link>
              {navigationItems.map((item) => (
                <Link 
                  key={item.path}
                  to={`/category/${item.path}?store=${storeParam}`} 
                  className={`text-gray-700 hover:text-gray-900 font-medium ${
                    categoryName === item.path ? 'font-bold' : ''
                  }`}
                  style={categoryName === item.path ? { color: 'var(--color-primary)' } : {}}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><Search className="h-5 w-5 text-gray-600" /></button>
              <button className="p-2 hover:bg-gray-100 rounded-full relative transition-colors"><Heart className="h-5 w-5 text-gray-600" /></button>
              <button className="p-2 hover:bg-gray-100 rounded-full relative transition-colors"><ShoppingCart className="h-5 w-5 text-gray-600" /></button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><User className="h-5 w-5 text-gray-600" /></button>
            </div>
          </div>
        </div>
      </header>

      
      <div className="bg-cozy-muted py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-base text-gray-600">
            <Link to={`/?store=${storeParam}`} className="hover:font-medium transition-smooth">홈</Link>
            <span className="mx-2">/</span>
            <span className="font-medium" style={{ color: 'var(--color-primary)' }}>{currentCategory.name}</span>
          </div>
        </div>
      </div>

      
      <section className="py-8 bg-cozy-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-primary)' }}>{currentCategory.name}</h1>
          <p className="text-lg text-gray-600">{currentCategory.desc}</p>
        </div>
      </section>

      
      <div className="bg-cozy-card border-b border-cozy-border py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-cozy-border hover:bg-cozy-muted">
                <Filter className="h-4 w-4 mr-2" />
                필터
              </Button>
              <span className="text-base text-gray-600">총 {products.length}개 상품</span>
            </div>
            <div className="flex items-center space-x-4">
              <select className="text-base border border-cozy-border rounded px-3 py-2 bg-cozy-card">
                <option>인기순</option>
                <option>낮은 가격순</option>
                <option>높은 가격순</option>
                <option>최신순</option>
              </select>
              <div className="flex space-x-2">
                <Grid className="h-6 w-6 cursor-pointer font-medium" />
                <List className="h-6 w-6 cursor-pointer text-gray-400 hover:font-medium transition-smooth" />
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">상품을 불러오는 중...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={() => fetchCategoryProducts()}>다시 시도</Button>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600">등록된 상품이 없습니다.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
              <Link key={product.id} to={`/product/${product.id}?store=${storeParam}`}>
                <Card className="group cursor-pointer hover:shadow-cozy transition-smooth bg-cozy-card border-cozy-border">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-smooth"
                  />
                  {product.discount && (
                    <div className="absolute top-2 left-2 px-2 py-1 rounded text-sm font-semibold text-white" style={{ backgroundColor: 'var(--color-primary)' }}>
                      {product.discount} OFF
                    </div>
                  )}
                  <Heart className="absolute top-2 right-2 h-6 w-6 text-white hover:text-cozy-accent cursor-pointer transition-smooth" />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">{product.title}</h3>
                  <div className="flex items-center mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.floor(product.rating) ? "text-cozy-accent" : "text-gray-300"}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-xl font-bold" style={{ color: 'var(--color-primary)' }}>{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-base text-gray-400 line-through">{product.originalPrice}</span>
                    )}
                  </div>
                  <div className="w-full bg-cozy-secondary hover:bg-cozy-secondary/80 text-gray-800 border border-cozy-border transition-smooth py-2 px-4 text-center rounded">
                    상품 보기
                  </div>
                </CardContent>
              </Card>
              </Link>
            ))}
            </div>
          )}

          
          {!loading && !error && products.length > 0 && (
            <div className="flex justify-center mt-12">
            <div className="flex space-x-2">
              <Button variant="outline" className="border-cozy-border hover:bg-cozy-muted">이전</Button>
              <Button className="px-2 py-1 rounded text-sm font-semibold text-white font-medium-foreground">1</Button>
              <Button variant="outline" className="border-cozy-border hover:bg-cozy-muted">2</Button>
              <Button variant="outline" className="border-cozy-border hover:bg-cozy-muted">3</Button>
              <Button variant="outline" className="border-cozy-border hover:bg-cozy-muted">다음</Button>
            </div>
            </div>
          )}
        </div>
      </section>

      
      <footer className="px-2 py-1 rounded text-sm font-semibold text-white font-medium-foreground" style={{ backgroundColor: 'var(--color-secondary)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">{storeInfo.storeName}</h4>
              <p className="text-base">{storeInfo.description}</p>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">고객센터</h5>
              <p className="text-base mb-2">1588-1234</p>
              <p className="text-base">평일 09:00-18:00</p>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">쇼핑 정보</h5>
              <p className="text-base mb-2">배송 안내</p>
              <p className="text-base">교환/반품</p>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">회사 정보</h5>
              <p className="text-base mb-2">회사소개</p>
              <p className="text-base">이용약관</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CozyCategory;