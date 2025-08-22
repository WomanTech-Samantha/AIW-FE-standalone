import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Heart, Search, Menu, User, Plus, Minus, Star, Truck, Shield, RotateCcw, Crown } from "lucide-react";
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

const chicDressImage = createSimpleImage("#f3f4f6", "이미지");
const chicAccessoriesImage = createSimpleImage("#f3f4f6", "이미지");

const ChicProduct = () => {
  const [quantity, setQuantity] = useState(1);
  const [storeData, setStoreData] = useState<any>(null);
  const [brandData, setBrandData] = useState<any>(null);
  const [productData, setProductData] = useState<any>(null);
  
  // 업종별 콘텐츠 설정
  const getBusinessNavigation = () => {
    const business = storeData?.business || '';
    
    if (business.includes('수공예')) {
      return {
        storeName: brandData?.name || '공방이야기',
        categories: [
          { id: 'pottery', name: '도자기', path: 'pottery' },
          { id: 'textile', name: '직물공예', path: 'textile' },
          { id: 'woodwork', name: '목공예', path: 'woodwork' },
          { id: 'jewelry', name: '장신구', path: 'jewelry' },
          { id: 'art', name: '미술품', path: 'art' }
        ],
        breadcrumbCategory: '공예품',
        detailTabs: ['제품 상세', '후기', '제작 과정', '관리 방법'],
        specificationTitle: '제품 사양',
        leftSpecs: [
          { label: '소재', items: ['토기: 고온 소성 도자기', '유약: 친환경 천연 유약', '제작: 100% 수작업', '원산지: 한국'] },
        ],
        rightSpecs: [
          { label: '특징', items: ['규격: 직경 15cm', '높이: 8cm', '사용: 식기세척기 사용 가능', '포장: 선물용 포장 가능'] },
        ],
        relatedTitle: '함께 보면 좋은 작품',
        footerInfo: {
          phone: '1588-7890',
          hours: '평일 10:00-18:00',
          saturday: '토요일 10:00-16:00',
          services: ['무료 포장', '작품 보증서', '맞춤 제작'],
          about: ['작가 소개', '공방 둘러보기', '전시 일정']
        },
        serviceInfo: [
          { icon: 'Truck', text: '무료포장 (5만원 이상)' },
          { icon: 'Shield', text: '작품보증서 제공' },
          { icon: 'RotateCcw', text: '7일 내 교환/반품' },
          { icon: 'Crown', text: '회원 특별 혜택' }
        ]
      };
    } else if (business.includes('침구') || business.includes('이불')) {
      return {
        storeName: brandData?.name || '꿈의공간',
        categories: [
          { id: 'comforters', name: '이불', path: 'comforters' },
          { id: 'pillows', name: '베개', path: 'pillows' },
          { id: 'sheets', name: '침대커버', path: 'sheets' },
          { id: 'baby', name: '아기침구', path: 'baby' },
          { id: 'premium', name: '명품침구', path: 'premium' }
        ],
        breadcrumbCategory: '침구',
        detailTabs: ['제품 상세', '후기', '사이즈 안내', '관리 방법'],
        specificationTitle: '제품 사양',
        leftSpecs: [
          { label: '소재 및 구성', items: ['겹감: 면 100%', '속감: 고급 충전재', '원단: 항균 처리', '색상: 네이비', '원산지: 한국'] },
        ],
        rightSpecs: [
          { label: '크기 및 스타일', items: ['크기: 퀸/킹 선택 가능', '무게: 2.5kg', '스타일: 사계절용', '층수: 400TC', '특징: 항균 방진 기능'] },
        ],
        relatedTitle: '함께 구매하면 좋은 제품',
        footerInfo: {
          phone: '1588-5678',
          hours: '평일 10:00-19:00',
          saturday: '토요일 10:00-17:00',
          services: ['무료 배송', '품질 보증', '교환/반품'],
          about: ['브랜드 이야기', '매장 안내', '관리 방법']
        },
        serviceInfo: [
          { icon: 'Truck', text: '무료배송 (10만원 이상)' },
          { icon: 'Shield', text: '품질보증 및 애프터서비스' },
          { icon: 'RotateCcw', text: '14일 무료 교환/반품' },
          { icon: 'Crown', text: '회원 전용 혜택' }
        ]
      };
    } else {
      // 기본값 (패션)
      return {
        storeName: brandData?.name || '우아한옷장',
        categories: [
          { id: 'dresses', name: '원피스', path: 'dresses' },
          { id: 'tops', name: '상의', path: 'tops' },
          { id: 'bottoms', name: '하의', path: 'bottoms' },
          { id: 'outerwear', name: '외투', path: 'outerwear' },
          { id: 'accessories', name: '장신구', path: 'accessories' }
        ],
        breadcrumbCategory: '의류',
        detailTabs: ['제품 상세', '후기', '사이즈 안내', '관리 방법'],
        specificationTitle: '제품 사양',
        leftSpecs: [
          { label: '소재 및 구성', items: ['겹감: 폴리에스터 95%, 스판 5%', '안감: 실크 100%', '지퍼: 뒤 지퍼 여밈', '색상: 고급 블랙', '원산지: 한국'] },
        ],
        rightSpecs: [
          { label: '핀 및 스타일', items: ['핀: 슬림핀', '길이: 무릎 위 5cm', '스타일: A라인 실루엣', '목선: 라운드 목', '소매: 7부소매'] },
        ],
        relatedTitle: '함께 구매하면 좋은 제품',
        footerInfo: {
          phone: '1588-5678',
          hours: '평일 10:00-19:00',
          saturday: '토요일 10:00-17:00',
          services: ['무료 배송', '회원 혜택', '스타일 상담'],
          about: ['브랜드 이야기', '매장 안내', '채용 정보']
        },
        serviceInfo: [
          { icon: 'Truck', text: '무료배송 (10만원 이상)' },
          { icon: 'Shield', text: '품질보증 및 애프터서비스' },
          { icon: 'RotateCcw', text: '14일 무료 교환/반품' },
          { icon: 'Crown', text: '회원 전용 혜택' }
        ]
      };
    }
  };
  
  const navigationContent = getBusinessNavigation();
  
  // 테마 색상 적용 함수
  const applyTheme = (templateColor: string) => {
    const themes = {
      'warm-rose': { primary: '#D4526E', secondary: '#F5B7B1', accent: '#E8A49C', background: '#FAF3F0', text: '#333333' },
      'sage-green': { primary: '#6B8E65', secondary: '#A8C09C', accent: '#8FA885', background: '#F5F7F4', text: '#333333' },
      'dusty-blue': { primary: '#7189A6', secondary: '#A8B8CC', accent: '#8DA3C0', background: '#F4F6F8', text: '#333333' },
      'lavender': { primary: '#9B7EBD', secondary: '#C4A9D8', accent: '#B195CC', background: '#F7F5F9', text: '#333333' },
      'terracotta': { primary: '#C67B5C', secondary: '#E5A985', accent: '#D69373', background: '#FAF6F3', text: '#333333' }
    };
    const theme = themes[templateColor] || themes['dusty-blue'];
    const root = document.documentElement;
    root.style.setProperty('--color-primary', theme.primary);
    root.style.setProperty('--color-secondary', theme.secondary);
    root.style.setProperty('--color-accent', theme.accent);
    root.style.setProperty('--color-background', theme.background);
    root.style.setProperty('--color-text', theme.text);
  };
  
  useEffect(() => {
    // 전역 스토어 데이터 가져오기
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

  // 업종별 상품 정보 설정
  const getBusinessContent = () => {
    const storeData = (window as any).STORE_DATA;
    const business = storeData?.store?.business || '';
    
    if (business.includes('수공예')) {
      return {
        title: '수제 도자기 찻잔 세트',
        titleKr: '장인의 손길',
        breadcrumb: '도자기',
        colors: ['자연빛', '청자', '백자', '흑자'],
        sizes: ['소형', '중형', '대형', '세트'],
        price: '145,000',
        originalPrice: '185,000',
        rating: 4.9,
        reviews: 87,
        description: '전통 도자기 기법으로 정성스럽게 빚어낸 찻잔 세트로 일상에 품격을 더합니다.',
        features: ['🎨 장인 수제작', '🏺 전통 기법', '🌿 친환경 소재', '📦 안전 포장'],
        sku: 'HND-001',
        badge: '인기',
        relatedProducts: [
          {
            id: 1,
            image: chicAccessoriesImage,
            title: "전통 자수 벽걸이",
            titleKr: "전통 자수 벽걸이",
            price: "95,000원",
            originalPrice: "125,000원"
          },
          {
            id: 2,
            image: chicDressImage,
            title: "원목 찻상",
            titleKr: "원목 찻상",
            price: "68,000원",
            originalPrice: "89,000원"
          }
        ]
      };
    } else {
      // 침구 기본값
      return {
        title: '프리미엄 구스 이불 세트',
        titleKr: '편안한 잠자리',
        breadcrumb: '침구',
        colors: ['아이보리', '화이트', '차콜', '네이비'],
        sizes: ['싱글', '슈퍼싱글', '퀸', '킹'],
        price: '289,000',
        originalPrice: '359,000',
        rating: 4.8,
        reviews: 156,
        description: '최고급 면 소재와 구스다운으로 호텔 같은 편안함을 집에서 느껴보세요.',
        features: ['🛏️ 프리미엄 면', '🌙 숙면 보장', '🧼 손쉬운 관리', '📦 무료 배송'],
        sku: 'BED-001',
        badge: '베스트',
        relatedProducts: [
          {
            id: 1,
            image: chicAccessoriesImage,
            title: "메모리폼 경추 베개",
            titleKr: "메모리폼 경추 베개",
            price: "89,000원",
            originalPrice: "129,000원"
          },
          {
            id: 2,
            image: chicDressImage,
            title: "대나무 여름 이불",
            titleKr: "대나무 여름 이불",
            price: "59,000원",
            originalPrice: "89,000원"
          }
        ]
      };
    }
  };

  const businessContent = getBusinessContent();
  const [selectedColor, setSelectedColor] = useState(businessContent.colors[0]);
  const [selectedSize, setSelectedSize] = useState(businessContent.sizes[0]);

  const storeParam = new URLSearchParams(window.location.search).get('store');


  return (
    <div className="min-h-screen bg-gray-50">
      
      <header className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Menu className="h-6 w-6 mr-4 lg:hidden" />
              <Link to={`/?store=${storeParam}`} className="text-3xl font-light tracking-wider flex items-center" style={{ color: 'var(--color-primary)' }}>
                <Crown className="h-6 w-6 mr-2" />
                {navigationContent.storeName}
              </Link>
            </div>
            
            <nav className="hidden lg:flex space-x-8">
              <Link to={`/?store=${storeParam}`} className="text-sm font-medium text-gray-700 hover:text-gray-900 tracking-wide">홈</Link>
              {navigationContent.categories.map((cat) => (
                <Link 
                  key={cat.id}
                  to={`/category/${cat.path}?store=${storeParam}`} 
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 tracking-wide"
                >
                  {cat.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <Search className="h-6 w-6 cursor-pointer hover:text-chic-primary transition-smooth" />
              <Heart className="h-6 w-6 cursor-pointer hover:text-chic-primary transition-smooth" />
              <ShoppingCart className="h-6 w-6 cursor-pointer hover:text-chic-primary transition-smooth" />
              <User className="h-6 w-6 cursor-pointer hover:text-chic-primary transition-smooth" />
            </div>
          </div>
        </div>
      </header>

      
      <div className="bg-chic-muted py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-base text-gray-600">
            <Link to={`/?store=${storeParam}`} className="hover:text-chic-primary transition-smooth">홈</Link>
            <span className="mx-2">/</span>
            <Link to={`/category/${navigationContent.categories[0].path}?store=${storeParam}`} className="hover:text-chic-primary transition-smooth">{navigationContent.breadcrumbCategory}</Link>
            <span className="mx-2">/</span>
            <span className="text-chic-primary font-medium">{businessContent.title}</span>
          </div>
        </div>
      </div>

      
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            <div className="space-y-6">
              <div className="aspect-[3/4] overflow-hidden rounded-lg bg-chic-card shadow-chic">
                <img 
                  src={chicDressImage} 
                  alt={businessContent.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-square overflow-hidden rounded-lg bg-chic-card border-2 border-chic-primary cursor-pointer">
                    <img 
                      src={chicDressImage} 
                      alt={`상품 이미지 ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            
            <div className="space-y-8">
              <div>
                <div className="flex items-center mb-4">
                  <span className="bg-chic-accent text-black px-3 py-1 rounded-full text-sm font-bold mr-3">{businessContent.badge}</span>
                  <span className="text-base text-gray-600">제품번호: {businessContent.sku}</span>
                </div>
                <h1 className="text-4xl font-bold text-chic-primary mb-6">{businessContent.title}</h1>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-chic-accent fill-current" />
                    ))}
                    <span className="text-base text-gray-600 ml-2">{businessContent.rating} ({businessContent.reviews} 리뷰)</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4 mb-8">
                  <span className="text-4xl font-bold text-chic-primary">{businessContent.price}원</span>
                  <span className="text-2xl text-gray-400 line-through">{businessContent.originalPrice}원</span>
                  <span className="bg-chic-primary text-chic-primary-foreground px-4 py-2 rounded text-lg font-semibold">
                    {Math.round(((parseInt(businessContent.originalPrice) - parseInt(businessContent.price)) / parseInt(businessContent.originalPrice)) * 100)}% OFF
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {businessContent.description}
                </p>

                
                <div>
                  <h3 className="text-xl font-semibold mb-4">색상</h3>
                  <div className="flex space-x-3">
                    {businessContent.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-5 py-3 rounded-lg border-2 text-base font-medium transition-smooth ${
                          selectedColor === color
                            ? "border-chic-primary bg-chic-primary text-chic-primary-foreground"
                            : "border-chic-border bg-chic-card hover:border-chic-primary"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                
                <div>
                  <h3 className="text-xl font-semibold mb-4">크기</h3>
                  <div className="flex space-x-3">
                    {businessContent.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-5 py-3 rounded-lg border-2 text-base font-medium transition-smooth ${
                          selectedSize === size
                            ? "border-chic-primary bg-chic-primary text-chic-primary-foreground"
                            : "border-chic-border bg-chic-card hover:border-chic-primary"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  <Button variant="outline" className="mt-3 text-base border-chic-border hover:bg-chic-muted">
                    사이즈 가이드 보기
                  </Button>
                </div>

                
                <div>
                  <h3 className="text-xl font-semibold mb-4">수량</h3>
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="border-chic-border hover:bg-chic-muted w-12 h-12"
                    >
                      <Minus className="h-5 w-5" />
                    </Button>
                    <span className="text-xl font-semibold w-16 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                      className="border-chic-border hover:bg-chic-muted w-12 h-12"
                    >
                      <Plus className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                
                <div className="space-y-4 pt-8">
                  <Button className="w-full bg-chic-primary hover:bg-chic-primary/90 text-chic-primary-foreground py-4 text-lg font-semibold transition-smooth">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    장바구니 담기
                  </Button>
                  <Button className="w-full bg-chic-accent hover:bg-chic-accent/90 text-black py-4 text-lg font-semibold transition-smooth">
                    바로 구매
                  </Button>
                  <Button variant="outline" className="w-full border-chic-border hover:bg-chic-muted py-4 text-lg">
                    <Heart className="h-5 w-5 mr-2" />
                    찜하기
                  </Button>
                </div>

                
                <div className="bg-chic-muted p-8 rounded-lg space-y-4">
                  {navigationContent.serviceInfo.map((service, index) => {
                    const IconComponent = service.icon === 'Truck' ? Truck : 
                                         service.icon === 'Shield' ? Shield :
                                         service.icon === 'RotateCcw' ? RotateCcw : Crown;
                    return (
                      <div key={index} className="flex items-center space-x-4">
                        <IconComponent className="h-6 w-6 text-chic-primary" />
                        <span className="text-base">{service.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-16 bg-chic-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-b border-chic-border mb-12">
            <nav className="flex space-x-12">
              {navigationContent.detailTabs.map((tab, index) => (
                <button 
                  key={index}
                  className={index === 0 
                    ? "text-xl font-semibold text-chic-primary border-b-2 border-chic-primary pb-4"
                    : "text-xl font-medium text-gray-600 hover:text-chic-primary pb-4 transition-smooth"
                  }
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
          <div className="prose max-w-none">
            <h3 className="text-2xl font-bold mb-6">{navigationContent.specificationTitle}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg">
              <div>
                <h4 className="text-xl font-semibold mb-4">{navigationContent.leftSpecs[0].label}</h4>
                <ul className="space-y-2 text-gray-700">
                  {navigationContent.leftSpecs[0].items.map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-4">{navigationContent.rightSpecs[0].label}</h4>
                <ul className="space-y-2 text-gray-700">
                  {navigationContent.rightSpecs[0].items.map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold mb-12 text-center">{navigationContent.relatedTitle}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {businessContent.relatedProducts.map((product) => (
              <Card key={product.id} className="group cursor-pointer hover:shadow-chic transition-smooth bg-chic-card border-chic-border">
                <div className="flex">
                  <div className="w-40 h-40 overflow-hidden rounded-l-lg">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                    />
                  </div>
                  <CardContent className="flex-1 p-6">
                    <h4 className="text-xl font-semibold mb-4 text-chic-primary">{product.title}</h4>
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="text-xl font-bold text-chic-primary">{product.price}</span>
                      <span className="text-lg text-gray-400 line-through">{product.originalPrice}</span>
                    </div>
                    <Button className="bg-chic-primary hover:bg-chic-primary/90 text-chic-primary-foreground px-6 py-2">
                      자세히 보기
                    </Button>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      
      <footer className="bg-chic-primary text-chic-primary-foreground py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-2xl font-bold mb-6 flex items-center">
                <Crown className="h-6 w-6 mr-2" />
                {navigationContent.storeName}
              </h4>
              <p className="text-base leading-relaxed">
                {storeData?.business?.includes('수공예') 
                  ? '정성스런 손길로 만든 특별한 작품을 선보입니다'
                  : storeData?.business?.includes('침구')
                  ? '편안한 잠자리를 위한 최고의 침구를 제공합니다'
                  : '우아하고 세련된 스타일로 당신만의 개성을 표현하세요'
                }
              </p>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-6">고객 센터</h5>
              <p className="text-base mb-2">{navigationContent.footerInfo.phone}</p>
              <p className="text-base mb-2">{navigationContent.footerInfo.hours}</p>
              <p className="text-base">{navigationContent.footerInfo.saturday}</p>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-6">서비스</h5>
              {navigationContent.footerInfo.services.map((service, index) => (
                <p key={index} className="text-base mb-2">{service}</p>
              ))}
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-6">소개</h5>
              {navigationContent.footerInfo.about.map((item, index) => (
                <p key={index} className="text-base mb-2">{item}</p>
              ))}
            </div>
          </div>
          <div className="border-t border-chic-accent/20 mt-12 pt-8 text-center">
            <p className="text-base">&copy; 2024 {navigationContent.storeName}. 모든 권리 보유.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ChicProduct;