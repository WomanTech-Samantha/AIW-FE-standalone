import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Heart, Search, Menu, User, Plus, Minus, Star, Truck, Shield, RotateCcw } from "lucide-react";
import { Link, useParams } from "react-router-dom";
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

const cozyBeddingImage = createSimpleImage("#f3f4f6", "이미지");
const cozyCurtainsImage = createSimpleImage("#e5e7eb", "이미지");

const CozyProduct = () => {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const storeParam = new URLSearchParams(window.location.search).get('store');

  // 기본 상품 데이터 생성
  const createDefaultProduct = (business, id) => {
    if (business.includes('수공예')) {
      return {
        id: id,
        name: '수제 도자기 찻잔 세트',
        category: '도자기',
        price: 145000,
        originalPrice: 185000,
        description: '전통 기법으로 제작된 수제 도자기 찻잔 세트입니다. 작가의 정성이 담긴 특별한 작품으로, 차를 마시는 시간을 더욱 특별하게 만들어드립니다.',
        imageUrl: createSimpleImage("#f3f4f6", "수제 도자기"),
        inStock: true,
        rating: 4.9,
        reviewCount: 87
      };
    } else {
      return {
        id: id,
        name: '프리미엄 코튼 침구 세트',
        category: '침구',
        price: 129000,
        originalPrice: 189000,
        description: '100% 프리미엄 코튼으로 제작된 침구 세트입니다. 부드러운 촉감과 뛰어난 통기성으로 편안한 수면을 제공합니다.',
        imageUrl: createSimpleImage("#f3f4f6", "프리미엄 침구"),
        inStock: true,
        rating: 4.8,
        reviewCount: 156
      };
    }
  };

  // 업종별 상품 정보 설정
  const getBusinessContent = (product) => {
    if (!product) return null;
    
    const storeData = (window as any).STORE_DATA;
    const business = storeData?.store?.business || '';
    
    if (business.includes('수공예')) {
      return {
        title: product.name || '수제 도자기 찻잔 세트',
        breadcrumb: product.category || '도자기·세라믹',
        colors: ['자연색', '청자색', '백자색', '갈색'],
        sizes: ['소형', '중형', '대형', '세트'],
        price: `${product.price?.toLocaleString() || '145,000'}원`,
        originalPrice: product.originalPrice ? `${product.originalPrice.toLocaleString()}원` : '185,000원',
        rating: product.rating || 4.9,
        reviews: product.reviewCount || 87,
        description: product.description || '전통 기법으로 제작된 수제 도자기 찻잔 세트입니다. 작가의 정성이 담긴 특별한 작품으로, 차를 마시는 시간을 더욱 특별하게 만들어드립니다.',
        features: ['🎨 작가 수제작품', '🏺 전통 도예기법', '🌿 친환경 소재', '📦 안전 포장'],
        relatedProducts: [
          {
            id: 1,
            image: cozyCurtainsImage,
            title: "전통 자수 벽걸이",
            price: "95,000원",
            originalPrice: "125,000원"
          },
          {
            id: 2,
            image: cozyBeddingImage,
            title: "원목 트레이",
            price: "68,000원",
            originalPrice: "89,000원"
          }
        ]
      };
    } else {
      // 침구 기본값
      return {
        title: product.name || '프리미엄 코튼 침구 세트',
        breadcrumb: product.category || '침구류',
        colors: ['베이지', '화이트', '그레이', '네이비'],
        sizes: ['싱글', '슈퍼싱글', '퀸', '킹'],
        price: `${product.price?.toLocaleString() || '129,000'}원`,
        originalPrice: product.originalPrice ? `${product.originalPrice.toLocaleString()}원` : '189,000원',
        rating: product.rating || 4.8,
        reviews: product.reviewCount || 156,
        description: product.description || '100% 프리미엄 코튼으로 제작된 침구 세트입니다. 부드러운 촉감과 뛰어난 통기성으로 편안한 수면을 제공합니다.',
        features: ['🛏️ 100% 프리미엄 코튼', '🌙 편안한 수면', '🧼 세탁 용이', '📦 무료배송'],
        relatedProducts: [
          {
            id: 1,
            image: cozyCurtainsImage,
            title: "메모리폼 베개",
            price: "89,000원",
            originalPrice: "125,000원"
          },
          {
            id: 2,
            image: cozyBeddingImage,
            title: "실크 베개커버",
            price: "59,000원",
            originalPrice: "89,000원"
          }
        ]
      };
    }
  };

  const [selectedColor, setSelectedColor] = useState('베이지');
  const [selectedSize, setSelectedSize] = useState('퀸');

  // productData가 로드된 후에만 businessContent 계산
  const businessContent = productData ? getBusinessContent(productData) : null;

  // productData가 로드되면 기본 색상과 사이즈 업데이트
  useEffect(() => {
    if (businessContent) {
      setSelectedColor(businessContent.colors?.[0] || '베이지');
      setSelectedSize(businessContent.sizes?.[0] || '퀸');
    }
  }, [businessContent]);

  // URL의 productId로 상품 데이터 찾기
  useEffect(() => {
    const loadProductData = () => {
      console.log('CozyProduct - Loading product data for ID:', productId);
      const storeData = (window as any).STORE_DATA;
      console.log('CozyProduct - Store data:', storeData);
      
      if (storeData && storeData.products && productId) {
        // 전역 상품 데이터에서 해당 ID의 상품 찾기
        const foundProduct = storeData.products.find(product => 
          product.id === productId || 
          product.id === `popular-${productId.split('-')[1]}` ||
          productId.includes(product.id)
        );
        
        console.log('CozyProduct - Found product:', foundProduct);
        if (foundProduct) {
          setProductData(foundProduct);
        } else {
          // 상품을 찾지 못한 경우 기본 상품 생성
          const business = storeData?.store?.business || '';
          console.log('CozyProduct - Creating default product for business:', business);
          setProductData(createDefaultProduct(business, productId));
        }
      } else {
        // 전역 데이터가 없는 경우 기본 상품 생성
        const storeData = (window as any).STORE_DATA;
        const business = storeData?.store?.business || '';
        setProductData(createDefaultProduct(business, productId));
      }
      setLoading(false);
    };

    loadProductData();
  }, [productId]);

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

  // 스토어 정보 가져오기
  const getStoreInfo = () => {
    const storeData = (window as any).STORE_DATA;
    return {
      storeName: storeData?.store?.storeName || '코지홈',
      description: storeData?.store?.description || '포근하고 따뜻한 일상을 만들어가는 홈 텍스타일 전문몰'
    };
  };

  const storeInfo = getStoreInfo();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">상품을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!productData || !businessContent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">상품 정보를 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

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
              <Link to={`/category/bedding?store=${storeParam}`} className="text-gray-700 hover:text-gray-900 font-medium">침구류</Link>
              <Link to={`/category/curtains?store=${storeParam}`} className="text-gray-700 hover:text-gray-900 font-medium">커튼/블라인드</Link>
              <Link to={`/category/homedeco?store=${storeParam}`} className="text-gray-700 hover:text-gray-900 font-medium">홈데코</Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Search className="h-6 w-6 cursor-pointer hover:opacity-70 transition-smooth" />
              <Heart className="h-6 w-6 cursor-pointer hover:opacity-70 transition-smooth" />
              <ShoppingCart className="h-6 w-6 cursor-pointer hover:opacity-70 transition-smooth" />
              <User className="h-6 w-6 cursor-pointer hover:opacity-70 transition-smooth" />
            </div>
          </div>
        </div>
      </header>

      
      <div className="bg-cozy-muted py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-base text-gray-600">
            <Link to={`/?store=${storeParam}`} className="hover:opacity-70 transition-smooth">홈</Link>
            <span className="mx-2">/</span>
            <Link to={`/category/bedding?store=${storeParam}`} className="hover:opacity-70 transition-smooth">{businessContent.breadcrumb}</Link>
            <span className="mx-2">/</span>
            <span className="font-medium" style={{ color: 'var(--color-primary)' }}>{businessContent.title}</span>
          </div>
        </div>
      </div>

      
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-lg bg-cozy-card">
                <img 
                  src={cozyBeddingImage} 
                  alt={businessContent.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-square overflow-hidden rounded-lg bg-cozy-card border-2 border-gray-600 cursor-pointer">
                    <img 
                      src={cozyBeddingImage} 
                      alt={`상품 이미지 ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{businessContent.title}</h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-cozy-accent fill-current" />
                    ))}
                    <span className="text-base text-gray-600 ml-2">{businessContent.rating} ({businessContent.reviews} 리뷰)</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>{businessContent.price}</span>
                  <span className="text-xl text-gray-400 line-through">{businessContent.originalPrice}</span>
                  <span className="text-white px-3 py-1 rounded text-base font-semibold" style={{ backgroundColor: 'var(--color-primary)' }}>
                    {Math.round(((parseInt(businessContent.originalPrice.replace(/[^\d]/g, '')) - parseInt(businessContent.price.replace(/[^\d]/g, ''))) / parseInt(businessContent.originalPrice.replace(/[^\d]/g, ''))) * 100)}% OFF
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-base text-gray-600 leading-relaxed">
                  {businessContent.description}
                </p>

                
                <div>
                  <h3 className="text-lg font-semibold mb-3">색상</h3>
                  <div className="flex space-x-3">
                    {businessContent.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded border-2 text-base transition-smooth ${
                          selectedColor === color
                            ? "text-white border-2" 
                            : "border-gray-300 bg-white hover:border-gray-400"
                        }`}
                        style={selectedColor === color ? { 
                          backgroundColor: 'var(--color-primary)', 
                          borderColor: 'var(--color-primary)' 
                        } : {}}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                
                <div>
                  <h3 className="text-lg font-semibold mb-3">사이즈</h3>
                  <div className="flex space-x-3">
                    {businessContent.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded border-2 text-base transition-smooth ${
                          selectedSize === size
                            ? "text-white"
                            : "border-gray-300 bg-white hover:border-gray-400"
                        }`}
                        style={selectedSize === size ? { 
                          backgroundColor: 'var(--color-primary)', 
                          borderColor: 'var(--color-primary)' 
                        } : {}}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                
                <div>
                  <h3 className="text-lg font-semibold mb-3">수량</h3>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="border-cozy-border hover:bg-cozy-muted"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                      className="border-cozy-border hover:bg-cozy-muted"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                
                <div className="space-y-3 pt-6">
                  <Button className="w-full text-white hover:opacity-90 py-4 text-lg font-semibold transition-smooth" style={{ backgroundColor: 'var(--color-primary)' }}>
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    장바구니 담기
                  </Button>
                  <Button className="w-full text-gray-800 py-4 text-lg font-semibold transition-smooth hover:opacity-90" style={{ backgroundColor: 'var(--color-secondary)' }}>
                    바로 구매하기
                  </Button>
                  <Button variant="outline" className="w-full border-cozy-border hover:bg-cozy-muted py-4 text-lg">
                    <Heart className="h-5 w-5 mr-2" />
                    찜하기
                  </Button>
                </div>

                
                <div className="bg-cozy-muted p-6 rounded-lg space-y-4">
                  <div className="flex items-center space-x-3">
                    <Truck className="h-5 w-5 font-medium" />
                    <span className="text-base">무료배송 (3만원 이상 구매시)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 font-medium" />
                    <span className="text-base">품질보증 1년</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RotateCcw className="h-5 w-5 font-medium" />
                    <span className="text-base">7일 무료 교환/반품</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-12 bg-cozy-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-b border-cozy-border mb-8">
            <nav className="flex space-x-8">
              <button className="text-lg font-semibold pb-4 border-b-2" style={{ color: 'var(--color-primary)', borderBottomColor: 'var(--color-primary)' }}>상품정보</button>
              <button className="text-lg font-medium text-gray-600 hover:opacity-70 pb-4 transition-smooth">리뷰 ({businessContent.reviews})</button>
              <button className="text-lg font-medium text-gray-600 hover:opacity-70 pb-4 transition-smooth">Q&A</button>
              <button className="text-lg font-medium text-gray-600 hover:opacity-70 pb-4 transition-smooth">배송/교환/반품</button>
            </nav>
          </div>
          <div className="prose max-w-none">
            <h3 className="text-xl font-bold mb-4">제품 특징</h3>
            <ul className="text-base leading-relaxed space-y-2 text-gray-700">
              {businessContent.features.map((feature, index) => (
                <li key={index}>• {feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold mb-8">함께 보면 좋은 상품</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {businessContent.relatedProducts.map((product) => (
              <Card key={product.id} className="group cursor-pointer hover:shadow-cozy transition-smooth bg-cozy-card border-cozy-border">
                <div className="flex">
                  <div className="w-32 h-32 overflow-hidden rounded-l-lg">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                    />
                  </div>
                  <CardContent className="flex-1 p-4">
                    <h4 className="text-lg font-semibold mb-2">{product.title}</h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold font-medium">{product.price}</span>
                      <span className="text-base text-gray-400 line-through">{product.originalPrice}</span>
                    </div>
                    <Button className="mt-3 bg-cozy-secondary hover:bg-cozy-secondary/80 text-gray-800 border border-cozy-border">
                      상품 보기
                    </Button>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      
      <footer className="text-white font-medium-foreground py-12">
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

export default CozyProduct;