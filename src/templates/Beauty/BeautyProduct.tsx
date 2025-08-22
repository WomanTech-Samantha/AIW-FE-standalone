import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Heart, Search, Menu, User, Plus, Minus, Star, Truck, Shield, RotateCcw, Leaf, Award } from "lucide-react";
import { Link } from "react-router-dom";
import '../base.css';
import { useState, useEffect } from "react";
// 간단한 이미지 플레이스홀더 생성 함수
const createSimpleImage = (bgColor: string, text: string) => {
  return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(`
    <svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="300" fill="${bgColor}"/>
      <text x="150" y="150" font-family="Arial" font-size="16" fill="#666" text-anchor="middle" dominant-baseline="middle">${text}</text>
    </svg>
  `)));
};

const beautySkincareImage = createSimpleImage("#fdf2f8", "이미지");
const beautyMakeupImage = createSimpleImage("#fef7ff", "이미지");

const BeautyProduct = () => {
  const [quantity, setQuantity] = useState(1);
  const [storeData, setStoreData] = useState<any>(null);
  const [brandData, setBrandData] = useState<any>(null);
  const [productData, setProductData] = useState<any>(null);

  // 업종별 상품 정보 설정
  const getBusinessContent = () => {
    const storeData = (window as any).STORE_DATA;
    const business = storeData?.store?.business || '';
    
    if (business.includes('수공예')) {
      return {
        title: '수제 도자기 찻잔 세트',
        breadcrumb: '도자기·세라믹',
        colors: ['자연색', '청자색', '백자색', '갈색'],
        sizes: ['소형', '중형', '대형', '세트'],
        price: '145,000원',
        originalPrice: '185,000원',
        rating: 4.9,
        reviews: 87,
        description: '전통 기법으로 제작된 수제 도자기 찻잔 세트입니다. 작가의 정성이 담긴 특별한 작품으로, 차를 마시는 시간을 더욱 특별하게 만들어드립니다.',
        features: ['🎨 작가 수제작품', '🏺 전통 도예기법', '🌿 친환경 소재', '📦 안전 포장', '✨ 유니크 디자인']
      };
    } else {
      // 침구 기본값
      return {
        title: '오가닉 코튼 침구 세트',
        breadcrumb: '침구·이불',
        colors: ['베이지', '화이트', '그레이', '네이비'],
        sizes: ['싱글', '슈퍼싱글', '퀸', '킹'],
        price: '189,000원',
        originalPrice: '259,000원',
        rating: 4.8,
        reviews: 156,
        description: '100% 유기농 면으로 제작된 프리미엄 침구 세트입니다. 부드러운 촉감과 자연스러운 통기성으로 건강한 수면 환경을 제공합니다.',
        features: ['🌿 100% 유기농 면', '🛏️ 호텔급 품질', '💧 우수한 흡습성', '🧼 세탁 용이', '🌙 편안한 수면']
      };
    }
  };

  const businessContent = getBusinessContent();
  const [selectedSize, setSelectedSize] = useState(businessContent.sizes[0]);
  const storeParam = new URLSearchParams(window.location.search).get('store');

  // 테마 적용 함수
  const applyTheme = (templateColor: string) => {
    const themes = {
      'warm-rose': { primary: '#D4526E', secondary: '#F5B7B1', accent: '#E8A49C', background: '#FAF3F0', text: '#FFFFFF' },
      'sage-green': { primary: '#6B8E65', secondary: '#A8C09C', accent: '#8FA885', background: '#F5F7F4', text: '#FFFFFF' },
      'dusty-blue': { primary: '#7189A6', secondary: '#A8B8CC', accent: '#8DA3C0', background: '#F4F6F8', text: '#FFFFFF' },
      'lavender': { primary: '#9B7EBD', secondary: '#C4A9D8', accent: '#B195CC', background: '#F7F5F9', text: '#FFFFFF' },
      'terracotta': { primary: '#C67B5C', secondary: '#E5A985', accent: '#D69373', background: '#FAF6F3', text: '#FFFFFF' }
    };
    const theme = themes[templateColor as keyof typeof themes] || themes['sage-green'];
    const root = document.documentElement;
    root.style.setProperty('--color-primary', theme.primary);
    root.style.setProperty('--color-secondary', theme.secondary);
    root.style.setProperty('--color-accent', theme.accent);
    root.style.setProperty('--color-background', theme.background);
    root.style.setProperty('--color-text', theme.text);
  };

  // 스토어 데이터에서 테마 적용
  useEffect(() => {
    const globalData = (window as any).STORE_DATA;
    if (globalData) {
      setStoreData(globalData.store);
      setBrandData(globalData.brand);
      
      // URL에서 productId 추출
      const pathname = window.location.pathname;
      const productId = pathname.split('/product/')[1]?.split('?')[0];
      
      // 상품 찾기
      if (globalData.products && productId) {
        const foundProduct = globalData.products.find((p: any) => 
          p.id === productId || 
          p.id === `popular-${productId.split('-')[1]}` ||
          productId.includes(p.id)
        );
        if (foundProduct) {
          setProductData(foundProduct);
        }
      }
      
      // 테마 적용
      if (globalData.brand?.templateColor) {
        applyTheme(globalData.brand.templateColor);
      }
    }
  }, []);
  // 관련 상품 데이터 생성
  const getRelatedProducts = () => {
    if (storeData?.business?.includes('침구') || storeData?.business?.includes('이불')) {
      return [
        {
          id: 1,
          image: beautyMakeupImage,
          title: "메모리폼 베개",
          price: "89,000원",
          originalPrice: "129,000원"
        },
        {
          id: 2,
          image: beautySkincareImage,
          title: "실크 베개커버",
          price: "59,000원",
          originalPrice: "89,000원"
        }
      ];
    } else if (storeData?.business?.includes('수공예')) {
      return [
        {
          id: 1,
          image: beautyMakeupImage,
          title: "전통 자수 벽걸이",
          price: "95,000원",
          originalPrice: "125,000원"
        },
        {
          id: 2,
          image: beautySkincareImage,
          title: "원목 트레이",
          price: "68,000원",
          originalPrice: "89,000원"
        }
      ];
    } else {
      return [
        {
          id: 1,
          image: beautyMakeupImage,
          title: "내추럴 틴트 립밤",
          price: "32,000원",
          originalPrice: "45,000원"
        },
        {
          id: 2,
          image: beautySkincareImage,
          title: "허브 수딩 크림",
          price: "65,000원",
          originalPrice: "89,000원"
        }
      ];
    }
  };
  
  const relatedProducts = getRelatedProducts();

  return (
    <div className="min-h-screen bg-gray-50">
      
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Menu className="h-6 w-6 mr-4 lg:hidden" />
              <Link to={`/?store=${storeParam}`} className="text-2xl font-bold flex items-center">
                <Leaf className="h-6 w-6 mr-2" />
                <span style={{ color: 'var(--color-primary)' }}>{storeData?.storeName || '내추럴뷰티'}</span>
              </Link>
            </div>
            
            <nav className="hidden lg:flex space-x-8">
              <Link to={`/?store=${storeParam}`} className="text-gray-700 hover:text-gray-900 font-medium">홈</Link>
              {storeData?.business?.includes('침구') || storeData?.business?.includes('이불') ? (
                <>
                  <Link to={`/category/comforters?store=${storeParam}`} className="text-gray-700 hover:text-gray-900 font-medium">이불·이불세트</Link>
                  <Link to={`/category/pillows?store=${storeParam}`} className="text-gray-700 hover:text-gray-900 font-medium">베개·베개커버</Link>
                  <Link to={`/category/sheets?store=${storeParam}`} className="text-gray-700 hover:text-gray-900 font-medium">시트·매트리스커버</Link>
                  <Link to={`/category/baby?store=${storeParam}`} className="text-gray-700 hover:text-gray-900 font-medium">아기침구</Link>
                </>
              ) : storeData?.business?.includes('수공예') ? (
                <>
                  <Link to={`/category/pottery?store=${storeParam}`} className="text-gray-700 hover:text-gray-900 font-medium">도자기·세라믹</Link>
                  <Link to={`/category/textile?store=${storeParam}`} className="text-gray-700 hover:text-gray-900 font-medium">직물·자수</Link>
                  <Link to={`/category/woodwork?store=${storeParam}`} className="text-gray-700 hover:text-gray-900 font-medium">목공예</Link>
                  <Link to={`/category/jewelry?store=${storeParam}`} className="text-gray-700 hover:text-gray-900 font-medium">액세서리</Link>
                </>
              ) : (
                <>
                  <Link to={`/category/comforters?store=${storeParam}`} className="text-gray-700 hover:text-gray-900 font-medium">이불·이불세트</Link>
                  <Link to={`/category/pillows?store=${storeParam}`} className="text-gray-700 hover:text-gray-900 font-medium">베개·베개커버</Link>
                  <Link to={`/category/sheets?store=${storeParam}`} className="text-gray-700 hover:text-gray-900 font-medium">시트·매트리스커버</Link>
                  <Link to={`/category/baby?store=${storeParam}`} className="text-gray-700 hover:text-gray-900 font-medium">아기침구</Link>
                </>
              )}
            </nav>

            <div className="flex items-center space-x-4">
              <Search className="h-6 w-6 cursor-pointer hover:text-beauty-primary transition-smooth" />
              <Heart className="h-6 w-6 cursor-pointer hover:text-beauty-primary transition-smooth" />
              <ShoppingCart className="h-6 w-6 cursor-pointer hover:text-beauty-primary transition-smooth" />
              <User className="h-6 w-6 cursor-pointer hover:text-beauty-primary transition-smooth" />
            </div>
          </div>
        </div>
      </header>

      
      <div className="bg-beauty-muted py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-base text-gray-600">
            <Link to={`/?store=${storeParam}`} className="hover:text-beauty-primary transition-smooth">홈</Link>
            <span className="mx-2">/</span>
            <Link to={`/category/bedding?store=${storeParam}`} className="hover:text-beauty-primary transition-smooth">{businessContent.breadcrumb}</Link>
            <span className="mx-2">/</span>
            <span className="text-beauty-primary font-medium">{businessContent.title}</span>
          </div>
        </div>
      </div>

      
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            <div className="space-y-6">
              <div className="aspect-square overflow-hidden rounded-lg bg-beauty-card shadow-beauty">
                <img 
                  src={beautySkincareImage} 
                  alt={businessContent.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-square overflow-hidden rounded-lg bg-beauty-card border-2 border-beauty-primary cursor-pointer">
                    <img 
                      src={beautySkincareImage} 
                      alt={`제품 이미지 ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            
            <div className="space-y-8">
              <div>
                <div className="flex items-center mb-4">
                  <span className="bg-beauty-accent text-black px-3 py-1 rounded-full text-sm font-bold mr-3">ORGANIC</span>
                  <span className="bg-beauty-primary text-beauty-primary-foreground px-3 py-1 rounded-full text-sm font-bold mr-3">VEGAN</span>
                  <span className="text-base text-gray-600">SKU: NB-VC-001</span>
                </div>
                <h1 className="text-4xl font-bold mb-6" style={{ color: 'var(--color-primary)' }}>{productData?.name || businessContent.title}</h1>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-beauty-accent fill-current" />
                    ))}
                    <span className="text-base text-gray-600 ml-2">{businessContent.rating} ({businessContent.reviews} 리뷰)</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-beauty-accent mr-1" />
                    <span className="text-sm text-beauty-primary font-medium">베스트셀러</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4 mb-8">
                  <span className="text-4xl font-bold" style={{ color: 'var(--color-primary)' }}>{productData ? `${productData.price.toLocaleString()}원` : businessContent.price}</span>
                  <span className="text-2xl text-gray-400 line-through">{businessContent.originalPrice}</span>
                  <span className="bg-beauty-primary text-beauty-primary-foreground px-4 py-2 rounded text-lg font-semibold">
                    {Math.round(((parseInt(businessContent.originalPrice.replace(/[^\d]/g, '')) - parseInt(businessContent.price.replace(/[^\d]/g, ''))) / parseInt(businessContent.originalPrice.replace(/[^\d]/g, ''))) * 100)}% OFF
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-beauty-muted p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Leaf className="h-5 w-5 mr-2" />
                    제품 특징
                  </h3>
                  <ul className="text-base text-gray-700 space-y-2">
                    {storeData?.business?.includes('침구') || storeData?.business?.includes('이불') ? (
                      <>
                        <li>• 편안한 수면을 위한 최적의 설계</li>
                        <li>• 항균 및 항알레르기 소재 사용</li>
                        <li>• 사계절 사용 가능한 온도 조절 기능</li>
                        <li>• 세탁 후에도 변형 없는 내구성</li>
                      </>
                    ) : storeData?.business?.includes('수공예') ? (
                      <>
                        <li>• 작가의 손길이 느껴지는 수제 작품</li>
                        <li>• 천연 재료만을 사용한 친환경 제품</li>
                        <li>• 오직 하나뿐인 유니크한 디자인</li>
                        <li>• 선물용 특별 포장 서비스</li>
                      </>
                    ) : (
                      <>
                        <li>• 편안한 수면을 위한 최적의 설계</li>
                        <li>• 항균 및 항알레르기 소재 사용</li>
                        <li>• 사계절 사용 가능한 온도 조절 기능</li>
                        <li>• 세탁 후에도 변형 없는 내구성</li>
                      </>
                    )}
                  </ul>
                </div>

                <p className="text-lg text-gray-700 leading-relaxed">
                  {productData?.description || businessContent.description}
                </p>

                
                <div>
                  <h3 className="text-xl font-semibold mb-4">{storeData?.business?.includes('수공예') ? 'Type' : 'Size'}</h3>
                  <div className="flex space-x-3">
                    {businessContent.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-3 rounded-lg border-2 text-base font-medium transition-smooth ${
                          selectedSize === size
                            ? "border-beauty-primary bg-beauty-primary text-beauty-primary-foreground"
                            : "border-beauty-border bg-beauty-card hover:border-beauty-primary"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {storeData?.business?.includes('수공예') ? '각 작품은 수제작으로 약간의 차이가 있을 수 있습니다' : '사이즈를 정확히 확인 후 선택해주세요'}
                  </p>
                </div>

                
                <div>
                  <h3 className="text-xl font-semibold mb-4">{storeData?.business?.includes('수공예') ? 'Quantity' : '수량'}</h3>
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="border-beauty-border hover:bg-beauty-muted w-12 h-12"
                    >
                      <Minus className="h-5 w-5" />
                    </Button>
                    <span className="text-xl font-semibold w-16 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                      className="border-beauty-border hover:bg-beauty-muted w-12 h-12"
                    >
                      <Plus className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                
                <div className="space-y-4 pt-8">
                  <Button className="w-full py-4 text-lg font-semibold transition-smooth" style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    장바구니 담기
                  </Button>
                  <Button className="w-full py-4 text-lg font-semibold transition-smooth" style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-text)' }}>
                    바로 구매하기
                  </Button>
                  <Button variant="outline" className="w-full border-beauty-border hover:bg-beauty-muted py-4 text-lg">
                    <Heart className="h-5 w-5 mr-2" />
                    위시리스트 추가
                  </Button>
                </div>

                {/* 서비스 정보 */}
                <div className="p-8 rounded-lg space-y-4" style={{ backgroundColor: 'var(--color-background)' }}>
                  <div className="flex items-center space-x-4">
                    <Truck className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
                    <span className="text-base">무료배송 ({storeData?.business?.includes('침구') ? '10만원' : storeData?.business?.includes('수공예') ? '8만원' : '5만원'} 이상)</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Shield className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
                    <span className="text-base">
                      {storeData?.business?.includes('침구') ? '항균 테스트 통과 제품' : 
                       storeData?.business?.includes('수공예') ? '작가 품질 보증 인증' : 
                       '피부 테스트 통과 제품'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <RotateCcw className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
                    <span className="text-base">30일 무료 교환/반품</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Leaf className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
                    <span className="text-base">
                      {storeData?.business?.includes('수공예') ? '무료 선물 포장 서비스' :
                       storeData?.business?.includes('침구') ? '무료 세탁 가이드 제공' :
                       '무료 샘플 키트 증정'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-16 bg-beauty-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-b border-beauty-border mb-12">
            <nav className="flex space-x-12">
              <button className="text-xl font-semibold pb-4 border-b-2" style={{ color: 'var(--color-primary)', borderColor: 'var(--color-primary)' }}>
                {storeData?.business?.includes('수공예') ? '작품 정보' : storeData?.business?.includes('침구') ? '소재 정보' : '성분 정보'}
              </button>
              <button className="text-xl font-medium text-gray-600 hover:opacity-80 pb-4 transition-smooth">
                {storeData?.business?.includes('수공예') ? '관리법' : storeData?.business?.includes('침구') ? '관리법' : '사용법'}
              </button>
              <button className="text-xl font-medium text-gray-600 hover:opacity-80 pb-4 transition-smooth">리뷰 ({storeData?.business?.includes('수공예') ? '87' : storeData?.business?.includes('침구') ? '156' : '284'})</button>
              <button className="text-xl font-medium text-gray-600 hover:opacity-80 pb-4 transition-smooth">Q&A</button>
            </nav>
          </div>
          <div className="prose max-w-none">
            <h3 className="text-2xl font-bold mb-6">{storeData?.business?.includes('수공예') ? '작품 정보' : storeData?.business?.includes('침구') ? '제품 상세' : 'Product Details'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg">
              {storeData?.business?.includes('침구') || storeData?.business?.includes('이불') ? (
                <>
                  <div>
                    <h4 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>소재 정보</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="font-semibold mr-2">• 겉감:</span>
                        <span>오가닉 코튼 100%</span>
                      </li>
                      <li className="flex items-start">
                        <span className="font-semibold mr-2">• 충전재:</span>
                        <span>프리미엄 구스다운</span>
                      </li>
                      <li className="flex items-start">
                        <span className="font-semibold mr-2">• 원단 밀도:</span>
                        <span>400TC (Thread Count)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="font-semibold mr-2">• 제조국:</span>
                        <span>대한민국</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>품질 인증</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• KC 안전인증 획득</li>
                      <li>• 친환경 섬유 인증</li>
                      <li>• 항균 테스트 완료</li>
                      <li>• 무형광 증백제</li>
                      <li>• 오코텍스 100 인증</li>
                    </ul>
                    <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: 'var(--color-background)' }}>
                      <h5 className="font-semibold mb-2" style={{ color: 'var(--color-primary)' }}>관리 방법</h5>
                      <p className="text-base">🌡️ 30도 이하 세탁</p>
                      <p className="text-base">☀️ 그늘에서 건조</p>
                      <p className="text-base">🚫 표백제 사용 금지</p>
                    </div>
                  </div>
                </>
              ) : storeData?.business?.includes('수공예') ? (
                <>
                  <div>
                    <h4 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>작품 정보</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="font-semibold mr-2">• 작가:</span>
                        <span>김도예 작가</span>
                      </li>
                      <li className="flex items-start">
                        <span className="font-semibold mr-2">• 제작기법:</span>
                        <span>전통 물레 성형</span>
                      </li>
                      <li className="flex items-start">
                        <span className="font-semibold mr-2">• 소재:</span>
                        <span>백자토, 천연유약</span>
                      </li>
                      <li className="flex items-start">
                        <span className="font-semibold mr-2">• 제작기간:</span>
                        <span>약 2주</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>작품 특징</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• 1300도 고온 소성</li>
                      <li>• 식기세척기 사용 가능</li>
                      <li>• 전자레인지 사용 가능</li>
                      <li>• 납 성분 무검출</li>
                      <li>• 친환경 작업 공정</li>
                    </ul>
                    <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: 'var(--color-background)' }}>
                      <h5 className="font-semibold mb-2" style={{ color: 'var(--color-primary)' }}>작가 노트</h5>
                      <p className="text-base">🎨 수제작 특성상 개체차 존재</p>
                      <p className="text-base">✨ 오직 하나뿐인 작품</p>
                      <p className="text-base">📦 안전 포장 발송</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h4 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>소재 정보</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="font-semibold mr-2">• 겉감:</span>
                        <span>오가닉 코튼 100%</span>
                      </li>
                      <li className="flex items-start">
                        <span className="font-semibold mr-2">• 충전재:</span>
                        <span>프리미엄 구스다운</span>
                      </li>
                      <li className="flex items-start">
                        <span className="font-semibold mr-2">• 원단 밀도:</span>
                        <span>400TC (Thread Count)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="font-semibold mr-2">• 제조국:</span>
                        <span>대한민국</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>품질 인증</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• KC 안전인증 획득</li>
                      <li>• 친환경 섬유 인증</li>
                      <li>• 항균 테스트 완료</li>
                      <li>• 무형광 증백제</li>
                      <li>• 오코텍스 100 인증</li>
                    </ul>
                    <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: 'var(--color-background)' }}>
                      <h5 className="font-semibold mb-2" style={{ color: 'var(--color-primary)' }}>관리 방법</h5>
                      <p className="text-base">🌡️ 30도 이하 세탁</p>
                      <p className="text-base">☀️ 그늘에서 건조</p>
                      <p className="text-base">🚫 표백제 사용 금지</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold mb-12 text-center" style={{ color: 'var(--color-primary)' }}>
            {storeData?.business?.includes('수공예') ? '작품 관리법' : storeData?.business?.includes('침구') ? '사용 및 관리법' : 'How to Use'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8 bg-beauty-card border-beauty-border">
              <CardContent className="p-0">
                <div className="text-4xl mb-4">{storeData?.business?.includes('침구') || storeData?.business?.includes('이불') ? '🛏️' : storeData?.business?.includes('수공예') ? '🧽' : '🧴'}</div>
                <h4 className="text-lg font-semibold mb-3">STEP 1</h4>
                <p className="text-base text-gray-600">
                  {storeData?.business?.includes('침구') || storeData?.business?.includes('이불') ? 
                    '첫 사용 전 세탁 후 사용하시면 더욱 좋습니다' : 
                    storeData?.business?.includes('수공예') ? 
                      '부드러운 천으로 먼지를 닦아주세요' : 
                      '토너 사용 후 깨끗한 피부에 2-3방울을 발라주세요'
                  }
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-8 bg-beauty-card border-beauty-border">
              <CardContent className="p-0">
                <div className="text-4xl mb-4">{storeData?.business?.includes('침구') || storeData?.business?.includes('이불') ? '🌡️' : storeData?.business?.includes('수공예') ? '💧' : '🤲'}</div>
                <h4 className="text-lg font-semibold mb-3">STEP 2</h4>
                <p className="text-base text-gray-600">
                  {storeData?.business?.includes('침구') || storeData?.business?.includes('이불') ? 
                    '30도 이하 찬물 세탁, 중성세제 사용' : 
                    storeData?.business?.includes('수공예') ? 
                      '물세척 시 부드러운 스폰지 사용' : 
                      '얼굴 전체에 골고루 펴 발라 흡수시켜주세요'
                  }
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-8 bg-beauty-card border-beauty-border">
              <CardContent className="p-0">
                <div className="text-4xl mb-4">{storeData?.business?.includes('침구') || storeData?.business?.includes('이불') ? '☀️' : storeData?.business?.includes('수공예') ? '🌅' : '🌅'}</div>
                <h4 className="text-lg font-semibold mb-3">STEP 3</h4>
                <p className="text-base text-gray-600">
                  {storeData?.business?.includes('침구') || storeData?.business?.includes('이불') ? 
                    '직사광선을 피해 그늘에서 건조해주세요' : 
                    storeData?.business?.includes('수공예') ? 
                      '직사광선을 피해 보관해주세요' : 
                      '낮 사용시 반드시 자외선 차단제를 발라주세요'
                  }
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 관련 상품 */}
      <section className="py-20" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold mb-12 text-center" style={{ color: 'var(--color-primary)' }}>
            {storeData?.business?.includes('수공예') ? '추천 작품' : storeData?.business?.includes('침구') ? '함께 구매하면 좋은 제품' : '함께 사용하면 좋은 제품'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {relatedProducts.map((product) => (
              <Card key={product.id} className="group cursor-pointer hover:shadow-beauty transition-smooth bg-beauty-card border-beauty-border">
                <div className="flex">
                  <div className="w-40 h-40 overflow-hidden rounded-l-lg">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                    />
                  </div>
                  <CardContent className="flex-1 p-6">
                    <h4 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>{product.title}</h4>
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="text-xl font-bold" style={{ color: 'var(--color-primary)' }}>{product.price}</span>
                      <span className="text-lg text-gray-400 line-through">{product.originalPrice}</span>
                    </div>
                    <Button className="bg-beauty-primary hover:bg-beauty-primary/90 text-beauty-primary-foreground px-6 py-2">
                      자세히 보기
                    </Button>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-16 text-white" style={{ backgroundColor: 'var(--color-primary)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-2xl font-bold mb-6 flex items-center">
                <Leaf className="h-6 w-6 mr-2" />
                {storeData?.storeName || '내추럴뷰티'}
              </h4>
              <p className="text-base leading-relaxed">
                {storeData?.business?.includes('수공예') ? (
                  <>
                    작가의 정성이 담긴<br />특별한 작품을 만나보세요
                  </>
                ) : storeData?.business?.includes('침구') ? (
                  <>
                    편안한 수면을 위한<br />프리미엄 침구를 만나보세요
                  </>
                ) : (
                  <>
                    자연에서 온 순수한 아름다움으로<br />건강한 피부를 만들어가세요
                  </>
                )}
              </p>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-6">고객 지원</h5>
              <p className="text-base mb-2">1588-9999</p>
              <p className="text-base mb-2">평일 09:00-18:00</p>
              <p className="text-base">{storeData?.business?.includes('수공예') ? '작품 맞춤 상담' : storeData?.business?.includes('침구') ? '침구 상담 예약' : '뷰티 상담 예약'}</p>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-6">서비스</h5>
              <p className="text-base mb-2">무료 배송</p>
              <p className="text-base mb-2">{storeData?.business?.includes('수공예') ? '작품 주문제작' : storeData?.business?.includes('침구') ? '맞춤 제작' : '피부 진단'}</p>
              <p className="text-base">{storeData?.business?.includes('수공예') ? '선물 포장' : storeData?.business?.includes('침구') ? '방문 설치' : '샘플 키트'}</p>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-6">브랜드</h5>
              <p className="text-base mb-2">브랜드 스토리</p>
              <p className="text-base mb-2">{storeData?.business?.includes('수공예') ? '작가 소개' : storeData?.business?.includes('침구') ? '소재 이야기' : '성분 이야기'}</p>
              <p className="text-base">{storeData?.business?.includes('수공예') ? '전시회 일정' : '지속가능성'}</p>
            </div>
          </div>
          <div className="border-t border-beauty-accent/20 mt-12 pt-8 text-center">
            <p className="text-base">&copy; 2024 {storeData?.storeName || '내추럴뷰티'}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BeautyProduct;