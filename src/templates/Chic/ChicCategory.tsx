import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Heart, Search, Menu, User, Filter, Grid, List, Crown } from "lucide-react";
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

const chicDressImage = createSimpleImage("#f3f4f6", "이미지");
const chicAccessoriesImage = createSimpleImage("#f3f4f6", "이미지");

const ChicCategory = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [storeData, setStoreData] = useState<any>(null);
  const [brandData, setBrandData] = useState<any>(null);
  
  // 현재 store 파라미터 가져오기
  const storeParam = new URLSearchParams(window.location.search).get('store');
  
  // 업종별 콘텐츠 설정
  const getBusinessContent = () => {
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
        categoryTitle: '수공예 작품',
        categorySubtitle: '장인의 손길로 만든 특별한 작품을 만나보세요',
        filterOptions: ['전체', '신작', '인기작품', '한정판'],
        footerInfo: {
          phone: '1588-7890',
          hours: '평일 10:00-18:00',
          saturday: '토요일 10:00-16:00',
          services: ['무료 포장', '작품 보증서', '맞춤 제작'],
          about: ['작가 소개', '공방 둘러보기', '전시 일정']
        },
        styleGuide: [
          { title: '전통 공예', desc: '한국의 멋을 담은 전통 작품' },
          { title: '현대 공예', desc: '현대적 감각의 실용적인 작품' },
          { title: '맞춤 제작', desc: '나만의 특별한 작품 주문' }
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
        categoryTitle: '침구 제품',
        categorySubtitle: '편안한 숙면을 위한 프리미엄 침구를 만나보세요',
        filterOptions: ['전체', '사계절용', '여름용', '겨울용'],
        footerInfo: {
          phone: '1588-5678',
          hours: '평일 10:00-19:00',
          saturday: '토요일 10:00-17:00',
          services: ['무료 배송', '품질 보증', '교환/반품'],
          about: ['브랜드 이야기', '매장 안내', '관리 방법']
        },
        styleGuide: [
          { title: '숙면 침구', desc: '깊은 잠을 위한 프리미엄 침구' },
          { title: '항균 침구', desc: '위생적이고 안전한 침구' },
          { title: '친환경 침구', desc: '자연 소재의 건강한 침구' }
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
        categoryTitle: '의류 제품',
        categorySubtitle: '우아하고 세련된 스타일로 완성하는 나만의 옷장',
        filterOptions: ['전체', '일상복', '정장', '파티복'],
        footerInfo: {
          phone: '1588-5678',
          hours: '평일 10:00-19:00',
          saturday: '토요일 10:00-17:00',
          services: ['무료 배송', '회원 혜택', '스타일 상담'],
          about: ['브랜드 이야기', '매장 안내', '채용 정보']
        },
        styleGuide: [
          { title: '출근복', desc: '전문적이고 세련된 사무실 스타일' },
          { title: '주말복', desc: '편안하면서도 우아한 휴일 스타일' },
          { title: '특별한 날', desc: '모임과 행사를 위한 특별한 스타일' }
        ]
      };
    }
  };
  
  const businessContent = getBusinessContent();
  
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
      
      // 테마 적용
      if (globalData.brand?.templateColor) {
        applyTheme(globalData.brand.templateColor);
      }
    }
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
          image: product.imageUrl || chicDressImage,
          title: product.name,
          price: `${product.price.toLocaleString()}원`,
          originalPrice: product.originalPrice ? `${product.originalPrice.toLocaleString()}원` : null,
          discount: product.originalPrice ? 
            `${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%` : null,
          rating: product.rating || (4.5 + Math.random() * 0.5),
          reviews: product.reviewCount || Math.floor(Math.random() * 200) + 30,
          badge: ['BEST', 'NEW', 'LIMITED', 'EXCLUSIVE'][Math.floor(Math.random() * 4)]
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

  // 기본 더미 데이터 (API 실패 시 사용)
  const defaultProducts = [
    {
      id: 1,
      image: chicDressImage,
      title: "검정 정장 원피스",
      price: "189,000원",
      originalPrice: "259,000원",
      discount: "27%",
      rating: 4.9,
      reviews: 142,
      badge: "인기"
    },
    {
      id: 2,
      image: chicAccessoriesImage,
      title: "금빛 목걸이",
      price: "125,000원",
      originalPrice: "178,000원",
      discount: "30%",
      rating: 4.7,
      reviews: 89,
      badge: "추천"
    },
    {
      id: 3,
      image: chicDressImage,
      title: "비단 블라우스",
      price: "159,000원",
      originalPrice: "229,000원",
      discount: "31%",
      rating: 4.8,
      reviews: 203,
      badge: "신상"
    },
    {
      id: 4,
      image: chicAccessoriesImage,
      title: "봄가을 외투",
      price: "389,000원",
      originalPrice: "550,000원",
      discount: "29%",
      rating: 4.9,
      reviews: 76,
      badge: "고급"
    },
    {
      id: 5,
      image: chicDressImage,
      title: "편한 니트 원피스",
      price: "149,000원",
      originalPrice: "215,000원",
      discount: "31%",
      rating: 4.6,
      reviews: 165,
      badge: ""
    },
    {
      id: 6,
      image: chicAccessoriesImage,
      title: "은빛 귀걸이 세트",
      price: "89,000원",
      originalPrice: "128,000원",
      discount: "30%",
      rating: 4.8,
      reviews: 134,
      badge: ""
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Menu className="h-6 w-6 mr-4 lg:hidden" />
              <Link to={`/?store=${storeParam}`} className="text-3xl font-light tracking-wider flex items-center" style={{ color: 'var(--color-primary)' }}>
                <Crown className="h-6 w-6 mr-2" />
                {businessContent.storeName}
              </Link>
            </div>
            
            <nav className="hidden lg:flex space-x-8">
              <Link to={`/?store=${storeParam}`} className="text-sm font-medium text-gray-700 hover:text-gray-900 tracking-wide">홈</Link>
              {businessContent.categories.map((cat, index) => (
                <Link 
                  key={cat.id}
                  to={`/category/${cat.path}?store=${storeParam}`} 
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 tracking-wide"
                  style={index === 0 ? { color: 'var(--color-primary)' } : {}}
                >
                  {cat.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <button className="text-gray-700 hover:text-gray-900"><Search className="h-5 w-5" /></button>
              <button className="text-gray-700 hover:text-gray-900"><Heart className="h-5 w-5" /></button>
              <button className="text-gray-700 hover:text-gray-900"><ShoppingCart className="h-5 w-5" /></button>
              <button className="text-gray-700 hover:text-gray-900"><User className="h-5 w-5" /></button>
            </div>
          </div>
        </div>
      </header>

      {/* 브레드크럼 */}
      <div className="bg-chic-muted py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-base text-gray-600">
            <Link to={`/?store=${storeParam}`} className="hover:text-chic-primary transition-smooth">홈</Link>
            <span className="mx-2">/</span>
            <span className="text-chic-primary font-medium">{businessContent.categoryTitle}</span>
          </div>
        </div>
      </div>

      {/* 카테고리 헤더 */}
      <section className="py-12 bg-chic-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-chic-primary mb-4">{businessContent.categoryTitle}</h1>
            <p className="text-xl text-gray-600">{businessContent.categorySubtitle}</p>
          </div>
        </div>
      </section>

      {/* 필터 및 정렬 */}
      <div className="bg-chic-card border-b border-chic-border py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Button variant="outline" className="border-chic-border hover:bg-chic-muted">
                <Filter className="h-4 w-4 mr-2" />
                필터
              </Button>
              <div className="flex space-x-4 text-base">
                {businessContent.filterOptions.map((option, index) => (
                  <button 
                    key={option}
                    className={index === 0 
                      ? "text-chic-primary font-medium border-b-2 border-chic-primary pb-1"
                      : "text-gray-600 hover:text-chic-primary transition-smooth"
                    }
                  >
                    {option}
                  </button>
                ))}
              </div>
              <span className="text-base text-gray-600">총 {products.length}개 상품</span>
            </div>
            <div className="flex items-center space-x-4">
              <select className="text-base border border-chic-border rounded-lg px-4 py-2 bg-chic-card focus:outline-none focus:ring-2 focus:ring-chic-primary">
                <option>추천순</option>
                <option>가격 낮은순</option>
                <option>가격 높은순</option>
                <option>최신순</option>
                <option>인기순</option>
              </select>
              <div className="flex space-x-2">
                <Grid className="h-6 w-6 cursor-pointer text-chic-primary" />
                <List className="h-6 w-6 cursor-pointer text-gray-400 hover:text-chic-primary transition-smooth" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 상품 목록 */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto"></div>
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
                <Card className="group cursor-pointer hover:shadow-chic transition-smooth bg-chic-card border-chic-border overflow-hidden">
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-smooth"
                  />
                  {product.badge && (
                    <div className="absolute top-4 left-4 bg-chic-accent text-black px-3 py-1 rounded-full text-sm font-bold">
                      {product.badge}
                    </div>
                  )}
                  {product.discount && (
                    <div className="absolute top-4 right-4 bg-chic-primary text-chic-primary-foreground px-2 py-1 rounded text-sm font-semibold">
                      {product.discount} OFF
                    </div>
                  )}
                  <Heart className="absolute bottom-4 right-4 h-7 w-7 text-white hover:text-chic-accent cursor-pointer transition-smooth bg-black/30 rounded-full p-1" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-chic-primary">{product.title}</h3>
                  <div className="flex items-center mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.floor(product.rating) ? "text-chic-accent" : "text-gray-300"}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                  </div>
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-2xl font-bold text-chic-primary">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-400 line-through">{product.originalPrice}</span>
                    )}
                  </div>
                  <div className="w-full bg-chic-primary hover:bg-chic-primary/90 text-chic-primary-foreground text-base font-medium py-3 transition-smooth text-center rounded">
                    자세히 보기
                  </div>
                </CardContent>
              </Card>
              </Link>
            ))}
            </div>
          )}

          {/* 페이지네이션 */}
          {!loading && !error && products.length > 0 && (
          <div className="flex justify-center mt-16">
            <div className="flex space-x-2">
              <Button variant="outline" className="border-chic-border hover:bg-chic-muted px-4 py-2">이전</Button>
              <Button className="bg-chic-primary text-chic-primary-foreground px-4 py-2">1</Button>
              <Button variant="outline" className="border-chic-border hover:bg-chic-muted px-4 py-2">2</Button>
              <Button variant="outline" className="border-chic-border hover:bg-chic-muted px-4 py-2">3</Button>
              <Button variant="outline" className="border-chic-border hover:bg-chic-muted px-4 py-2">다음</Button>
            </div>
          </div>
          )}
        </div>
      </section>

      {/* 스타일 가이드 */}
      <section className="py-16 bg-chic-muted">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-center mb-12 text-chic-primary">추천 스타일</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {businessContent.styleGuide.map((style, index) => (
              <Card key={index} className="text-center p-8 bg-chic-card border-chic-border">
                <CardContent className="p-0">
                  <h4 className="text-lg font-semibold mb-3">{style.title}</h4>
                  <p className="text-base text-gray-600">{style.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="bg-chic-primary text-chic-primary-foreground py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-2xl font-bold mb-6 flex items-center">
                <Crown className="h-6 w-6 mr-2" />
                {businessContent.storeName}
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
              <p className="text-base mb-2">{businessContent.footerInfo.phone}</p>
              <p className="text-base mb-2">{businessContent.footerInfo.hours}</p>
              <p className="text-base">{businessContent.footerInfo.saturday}</p>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-6">서비스</h5>
              {businessContent.footerInfo.services.map((service, index) => (
                <p key={index} className="text-base mb-2">{service}</p>
              ))}
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-6">소개</h5>
              {businessContent.footerInfo.about.map((item, index) => (
                <p key={index} className="text-base mb-2">{item}</p>
              ))}
            </div>
          </div>
          <div className="border-t border-chic-accent/20 mt-12 pt-8 text-center">
            <p className="text-base">&copy; 2024 {businessContent.storeName}. 모든 권리 보유.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ChicCategory;