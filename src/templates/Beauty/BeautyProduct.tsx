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
      'warm-rose': { primary: '#D4526E', secondary: '#F5B7B1', accent: '#E8A49C', background: '#FAF3F0' },
      'sage-green': { primary: '#6B8E65', secondary: '#A8C09C', accent: '#8FA885', background: '#F5F9F3' },
      'dusty-blue': { primary: '#6B8CAE', secondary: '#A8BFD6', accent: '#8DA4C7', background: '#F3F6F9' },
      'lavender': { primary: '#9B6BB0', secondary: '#C5A3D1', accent: '#B085C2', background: '#F8F5FA' },
      'terracotta': { primary: '#C17A74', secondary: '#E0B8B3', accent: '#D19B95', background: '#FAF7F6' }
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
  const relatedProducts = [
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Menu className="h-6 w-6 mr-4 lg:hidden" />
              <Link to={`/?store=${storeParam}`} className="text-2xl font-bold flex items-center">
                <Leaf className="h-6 w-6 mr-2" />
                <span style={{ color: 'var(--color-primary)' }}>내추럴뷰티</span>
              </Link>
            </div>
            
            <nav className="hidden lg:flex space-x-8">
              <Link to={`/?store=${storeParam}`} className="text-gray-700 hover:text-gray-900 font-medium">홈</Link>
              <Link to={`/category/skincare?store=${storeParam}`} className="text-gray-700 hover:text-gray-900 font-medium">스킨케어</Link>
              <Link to={`/category/makeup?store=${storeParam}`} className="text-gray-700 hover:text-gray-900 font-medium">메이크업</Link>
              <Link to={`/category/haircare?store=${storeParam}`} className="text-gray-700 hover:text-gray-900 font-medium">헤어케어</Link>
              <Link to={`/category/bodycare?store=${storeParam}`} className="text-gray-700 hover:text-gray-900 font-medium">바디케어</Link>
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

      {/* 브레드크럼 */}
      <div className="bg-beauty-muted py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-base text-gray-600">
            <Link to={`/?store=${storeParam}`} className="hover:text-beauty-primary transition-smooth">홈</Link>
            <span className="mx-2">/</span>
            <Link to={`/category/bedding?store=${storeParam}`} className="hover:text-beauty-primary transition-smooth">{businessContent.breadcrumb}</Link>
            <span className="mx-2">/</span>
            <span className="text-beauty-primary font-medium">{businessContent.title}</span>
          </div>
        </div>
      </div>

      {/* 상품 상세 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* 상품 이미지 */}
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

            {/* 상품 정보 */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center mb-4">
                  <span className="bg-beauty-accent text-black px-3 py-1 rounded-full text-sm font-bold mr-3">ORGANIC</span>
                  <span className="bg-beauty-primary text-beauty-primary-foreground px-3 py-1 rounded-full text-sm font-bold mr-3">VEGAN</span>
                  <span className="text-base text-gray-600">SKU: NB-VC-001</span>
                </div>
                <h1 className="text-4xl font-bold text-beauty-primary mb-6">{businessContent.title}</h1>
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
                  <span className="text-4xl font-bold text-beauty-primary">{businessContent.price}</span>
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
                    제품 혜택
                  </h3>
                  <ul className="text-base text-gray-700 space-y-2">
                    <li>• 피부 톤 개선 및 브라이트닝 효과</li>
                    <li>• 콜라겐 생성 촉진으로 안티에이징</li>
                    <li>• 항산화 성분으로 환경 스트레스 보호</li>
                    <li>• 모든 피부 타입 사용 가능</li>
                  </ul>
                </div>

                <p className="text-lg text-gray-700 leading-relaxed">
                  20% 순수 비타민C와 자연 추출 성분을 함유한 프리미엄 세럼입니다. 
                  매일 사용으로 맑고 투명한 피부 톤을 만들어주며, 강력한 항산화 효과로 
                  피부 노화를 방지합니다. 파라벤, 실리콘, 인공향료 무첨가로 민감한 피부에도 안전합니다.
                </p>

                {/* 용량 선택 */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Size</h3>
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
                  <p className="text-sm text-gray-600 mt-2">권장: 하루 2-3방울, 약 3개월 사용 가능 (30ml 기준)</p>
                </div>

                {/* 수량 선택 */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Quantity</h3>
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

                {/* 구매 버튼 */}
                <div className="space-y-4 pt-8">
                  <Button className="w-full bg-beauty-primary hover:bg-beauty-primary/90 text-beauty-primary-foreground py-4 text-lg font-semibold transition-smooth">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    장바구니 담기
                  </Button>
                  <Button className="w-full bg-beauty-accent hover:bg-beauty-accent/90 text-black py-4 text-lg font-semibold transition-smooth">
                    바로 구매하기
                  </Button>
                  <Button variant="outline" className="w-full border-beauty-border hover:bg-beauty-muted py-4 text-lg">
                    <Heart className="h-5 w-5 mr-2" />
                    위시리스트 추가
                  </Button>
                </div>

                {/* 서비스 정보 */}
                <div className="bg-beauty-muted p-8 rounded-lg space-y-4">
                  <div className="flex items-center space-x-4">
                    <Truck className="h-6 w-6 text-beauty-primary" />
                    <span className="text-base">무료배송 (5만원 이상)</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Shield className="h-6 w-6 text-beauty-primary" />
                    <span className="text-base">피부 테스트 통과 제품</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <RotateCcw className="h-6 w-6 text-beauty-primary" />
                    <span className="text-base">30일 무료 교환/반품</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Leaf className="h-6 w-6 text-beauty-primary" />
                    <span className="text-base">무료 샘플 키트 증정</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 상품 상세 정보 */}
      <section className="py-16 bg-beauty-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-b border-beauty-border mb-12">
            <nav className="flex space-x-12">
              <button className="text-xl font-semibold text-beauty-primary border-b-2 border-beauty-primary pb-4">성분 정보</button>
              <button className="text-xl font-medium text-gray-600 hover:text-beauty-primary pb-4 transition-smooth">사용법</button>
              <button className="text-xl font-medium text-gray-600 hover:text-beauty-primary pb-4 transition-smooth">리뷰 (284)</button>
              <button className="text-xl font-medium text-gray-600 hover:text-beauty-primary pb-4 transition-smooth">Q&A</button>
            </nav>
          </div>
          <div className="prose max-w-none">
            <h3 className="text-2xl font-bold mb-6">Ingredients</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg">
              <div>
                <h4 className="text-xl font-semibold mb-4 text-beauty-primary">주요 성분</h4>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">• 비타민C (20%):</span>
                    <span>브라이트닝, 항산화</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">• 하이알루론산:</span>
                    <span>깊은 보습, 수분 공급</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">• 나이아신아마이드:</span>
                    <span>모공 케어, 피지 조절</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">• 알로에 베라:</span>
                    <span>진정, 수분 공급</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-4 text-beauty-primary">무첨가 성분</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• 파라벤 무첨가</li>
                  <li>• 실리콘 무첨가</li>
                  <li>• 인공향료 무첨가</li>
                  <li>• 동물성 원료 무첨가</li>
                  <li>• 미네랄 오일 무첨가</li>
                </ul>
                <div className="mt-6 p-4 bg-beauty-muted rounded-lg">
                  <h5 className="font-semibold mb-2 text-beauty-primary">인증 마크</h5>
                  <p className="text-base">🌿 ECOCERT 유기농 인증</p>
                  <p className="text-base">🐰 크루얼티 프리 인증</p>
                  <p className="text-base">✅ FDA 승인 성분</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 사용법 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold mb-12 text-center text-beauty-primary">How to Use</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8 bg-beauty-card border-beauty-border">
              <CardContent className="p-0">
                <div className="text-4xl mb-4">🧴</div>
                <h4 className="text-lg font-semibold mb-3">STEP 1</h4>
                <p className="text-base text-gray-600">토너 사용 후 깨끗한 피부에 2-3방울을 발라주세요</p>
              </CardContent>
            </Card>
            <Card className="text-center p-8 bg-beauty-card border-beauty-border">
              <CardContent className="p-0">
                <div className="text-4xl mb-4">🤲</div>
                <h4 className="text-lg font-semibold mb-3">STEP 2</h4>
                <p className="text-base text-gray-600">얼굴 전체에 골고루 펴 발라 흡수시켜주세요</p>
              </CardContent>
            </Card>
            <Card className="text-center p-8 bg-beauty-card border-beauty-border">
              <CardContent className="p-0">
                <div className="text-4xl mb-4">🌅</div>
                <h4 className="text-lg font-semibold mb-3">STEP 3</h4>
                <p className="text-base text-gray-600">낮 사용시 반드시 자외선 차단제를 발라주세요</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 관련 상품 */}
      <section className="py-20 bg-beauty-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold mb-12 text-center">함께 사용하면 좋은 제품</h3>
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
                    <h4 className="text-xl font-semibold mb-4 text-beauty-primary">{product.title}</h4>
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="text-xl font-bold text-beauty-primary">{product.price}</span>
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
      <footer className="bg-beauty-primary text-beauty-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-2xl font-bold mb-6 flex items-center">
                <Leaf className="h-6 w-6 mr-2" />
                내추럴뷰티
              </h4>
              <p className="text-base leading-relaxed">자연에서 온 순수한 아름다움으로<br />건강한 피부를 만들어가세요</p>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-6">고객 지원</h5>
              <p className="text-base mb-2">1588-9999</p>
              <p className="text-base mb-2">평일 09:00-18:00</p>
              <p className="text-base">뷰티 상담 예약</p>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-6">서비스</h5>
              <p className="text-base mb-2">무료 배송</p>
              <p className="text-base mb-2">피부 진단</p>
              <p className="text-base">샘플 키트</p>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-6">브랜드</h5>
              <p className="text-base mb-2">브랜드 스토리</p>
              <p className="text-base mb-2">성분 이야기</p>
              <p className="text-base">지속가능성</p>
            </div>
          </div>
          <div className="border-t border-beauty-accent/20 mt-12 pt-8 text-center">
            <p className="text-base">&copy; 2024 내추럴뷰티. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BeautyProduct;