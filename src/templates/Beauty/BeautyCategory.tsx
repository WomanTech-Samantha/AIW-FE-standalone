import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Heart, Search, Menu, User, Filter, Grid, List, Leaf } from "lucide-react";
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

const beautySkincareImage = createSimpleImage("#fdf2f8", "이미지");
const beautyMakeupImage = createSimpleImage("#fef7ff", "이미지");

const BeautyCategory = () => {
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
        
        // 카테고리 매핑
        const categoryMap = {
          'skincare': '스킨케어',
          'makeup': '메이크업',
          'fragrance': '향수',
          'beauty-tools': '뷰티툴',
          'cleansing': '클렌징',
          'sale': '세일',
          'new-collection': '신상품',
          'all': ''
        };

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
          image: product.imageUrl || beautySkincareImage,
          title: product.name,
          price: `${product.price.toLocaleString()}원`,
          originalPrice: product.originalPrice ? `${product.originalPrice.toLocaleString()}원` : null,
          discount: product.originalPrice ? 
            `${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%` : null,
          rating: product.rating || (4.5 + Math.random() * 0.5),
          reviews: product.reviewCount || Math.floor(Math.random() * 300) + 50,
          badge: ['ORGANIC', 'VEGAN', 'SENSITIVE', 'NATURAL'][Math.floor(Math.random() * 4)],
          benefits: ['브라이트닝 & 안티에이징', '촉촉함 & 자연스러운 컬러', '진정 & 보습'][Math.floor(Math.random() * 3)]
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
      image: beautySkincareImage,
      title: "오가닉 비타민C 세럼",
      price: "89,000원",
      originalPrice: "119,000원",
      discount: "25%",
      rating: 4.9,
      reviews: 284,
      badge: "ORGANIC",
      benefits: "브라이트닝 & 안티에이징"
    },
    {
      id: 2,
      image: beautyMakeupImage,
      title: "내추럴 틴트 립밤",
      price: "32,000원",
      originalPrice: "45,000원",
      discount: "29%",
      rating: 4.8,
      reviews: 156,
      badge: "VEGAN",
      benefits: "촉촉함 & 자연스러운 컬러"
    },
    {
      id: 3,
      image: beautySkincareImage,
      title: "허브 수딩 크림",
      price: "65,000원",
      originalPrice: "89,000원",
      discount: "27%",
      rating: 4.7,
      reviews: 203,
      badge: "SENSITIVE",
      benefits: "진정 & 보습"
    },
    {
      id: 4,
      image: beautyMakeupImage,
      title: "미네랄 파운데이션",
      price: "78,000원",
      originalPrice: "105,000원",
      discount: "26%",
      rating: 4.6,
      reviews: 127,
      badge: "CLEAN",
      benefits: "커버력 & 자연스러운 마무리"
    },
    {
      id: 5,
      image: beautySkincareImage,
      title: "하이알루론산 토너",
      price: "45,000원",
      originalPrice: "62,000원",
      discount: "27%",
      rating: 4.8,
      reviews: 189,
      badge: "HYDRATING",
      benefits: "깊은 수분 공급"
    },
    {
      id: 6,
      image: beautyMakeupImage,
      title: "천연 아이섀도 팔레트",
      price: "95,000원",
      originalPrice: "128,000원",
      discount: "26%",
      rating: 4.9,
      reviews: 98,
      badge: "NATURAL",
      benefits: "자연스러운 컬러 & 발색"
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
              <Link to={`/category/skincare?store=${storeParam}`} className="text-gray-700 hover:text-gray-900 font-medium" style={{ color: 'var(--color-primary)' }}>스킨케어</Link>
              <Link to={`/category/makeup?store=${storeParam}`} className="text-gray-700 hover:text-gray-900 font-medium">메이크업</Link>
              <Link to={`/category/fragrance?store=${storeParam}`} className="text-gray-700 hover:text-gray-900 font-medium">향수</Link>
              <Link to={`/category/sale?store=${storeParam}`} className="text-gray-700 hover:text-gray-900 font-medium">세일</Link>
            </nav>

            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><Search className="h-5 w-5 text-gray-600" /></button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><Heart className="h-5 w-5 text-gray-600" /></button>
              <button className="p-2 hover:bg-gray-100 rounded-lg relative transition-colors"><ShoppingCart className="h-5 w-5 text-gray-600" /></button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><User className="h-5 w-5 text-gray-600" /></button>
            </div>
          </div>
        </div>
      </header>

      {/* 브레드크럼 */}
      <div className="bg-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-base text-gray-600">
            <Link to={`/?store=${storeParam}`} className="text-gray-600 hover:text-gray-900">홈</Link>
            <span className="mx-2">/</span>
            <span className="font-medium" style={{ color: 'var(--color-primary)' }}>스킨케어</span>
          </div>
        </div>
      </div>

      {/* 카테고리 헤더 */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 flex items-center justify-center" style={{ color: 'var(--color-primary)' }}>
              🌿 Skincare Collection
            </h1>
            <p className="text-xl text-gray-600">자연 성분으로 건강한 피부를 만드는 기초 화장품</p>
          </div>
        </div>
      </section>

      {/* 필터 및 정렬 */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <button className="btn btn-secondary">
                <Filter className="h-4 w-4 mr-2" />
                필터
              </button>
              <div className="flex space-x-4 text-base">
                <button className="font-medium border-b-2 pb-1" style={{ color: 'var(--color-primary)', borderColor: 'var(--color-primary)' }}>전체</button>
                <button className="text-gray-600 hover:opacity-80">세럼</button>
                <button className="text-gray-600 hover:opacity-80">크림</button>
                <button className="text-gray-600 hover:opacity-80">토너</button>
                <button className="text-gray-600 hover:opacity-80">클렌징</button>
              </div>
              <span className="text-base text-gray-600">총 {products.length}개 제품</span>
            </div>
            <div className="flex items-center space-x-4">
              <select className="text-base border border-beauty-border rounded-lg px-4 py-2 bg-beauty-card focus:outline-none focus:ring-2 focus:ring-beauty-primary">
                <option>추천순</option>
                <option>가격 낮은순</option>
                <option>가격 높은순</option>
                <option>리뷰 많은순</option>
                <option>최신순</option>
              </select>
              <div className="flex space-x-2">
                <Grid className="h-6 w-6 cursor-pointer text-beauty-primary" />
                <List className="h-6 w-6 cursor-pointer text-gray-400 hover:text-beauty-primary transition-smooth" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 상품 목록 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
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
                <Card className="group cursor-pointer hover:shadow-beauty transition-smooth bg-beauty-card border-beauty-border overflow-hidden">
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-smooth"
                  />
                  <div className="absolute top-4 left-4 bg-beauty-accent text-black px-3 py-1 rounded-full text-sm font-bold">
                    {product.badge}
                  </div>
                  {product.discount && (
                    <div className="absolute top-4 right-4 bg-beauty-primary text-beauty-primary-foreground px-2 py-1 rounded text-sm font-semibold">
                      {product.discount} OFF
                    </div>
                  )}
                  <Heart className="absolute bottom-4 right-4 h-7 w-7 text-white hover:text-beauty-accent cursor-pointer transition-smooth bg-black/30 rounded-full p-1" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-beauty-primary">{product.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{product.benefits}</p>
                  <div className="flex items-center mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.floor(product.rating) ? "text-beauty-accent" : "text-gray-300"}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                  </div>
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-2xl font-bold text-beauty-primary">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-400 line-through">{product.originalPrice}</span>
                    )}
                  </div>
                  <div className="w-full bg-beauty-primary hover:bg-beauty-primary/90 text-beauty-primary-foreground text-base font-medium py-3 transition-smooth text-center rounded">
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
              <Button variant="outline" className="border-beauty-border hover:bg-beauty-muted px-4 py-2">이전</Button>
              <Button className="bg-beauty-primary text-beauty-primary-foreground px-4 py-2">1</Button>
              <Button variant="outline" className="border-beauty-border hover:bg-beauty-muted px-4 py-2">2</Button>
              <Button variant="outline" className="border-beauty-border hover:bg-beauty-muted px-4 py-2">3</Button>
              <Button variant="outline" className="border-beauty-border hover:bg-beauty-muted px-4 py-2">다음</Button>
            </div>
          </div>
          )}
        </div>
      </section>

      {/* 성분 정보 */}
      <section className="py-16 bg-beauty-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-center mb-12 text-beauty-primary">Key Ingredients</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: "🌿",
                name: "알로에 베라",
                benefit: "진정 & 보습"
              },
              {
                icon: "🫧",
                name: "하이알루론산",
                benefit: "깊은 수분 공급"
              },
              {
                icon: "🍊",
                name: "비타민C",
                benefit: "브라이트닝"
              },
              {
                icon: "🌹",
                name: "로즈힙 오일",
                benefit: "안티에이징"
              }
            ].map((ingredient, index) => (
              <Card key={index} className="text-center p-6 bg-beauty-card border-beauty-border">
                <CardContent className="p-0">
                  <div className="text-4xl mb-4">{ingredient.icon}</div>
                  <h4 className="text-lg font-semibold mb-2">{ingredient.name}</h4>
                  <p className="text-base text-gray-600">{ingredient.benefit}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 스킨케어 팁 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-center mb-12 text-beauty-primary">Skincare Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 bg-beauty-card border-beauty-border">
              <CardContent className="p-0">
                <h4 className="text-lg font-semibold mb-3">🌅 모닝 루틴</h4>
                <p className="text-base text-gray-600">토너 → 세럼 → 크림 → 선크림 순서로 발라주세요</p>
              </CardContent>
            </Card>
            <Card className="p-6 bg-beauty-card border-beauty-border">
              <CardContent className="p-0">
                <h4 className="text-lg font-semibold mb-3">🌙 이브닝 루틴</h4>
                <p className="text-base text-gray-600">클렌징 → 토너 → 세럼 → 크림으로 마무리하세요</p>
              </CardContent>
            </Card>
            <Card className="p-6 bg-beauty-card border-beauty-border">
              <CardContent className="p-0">
                <h4 className="text-lg font-semibold mb-3">✨ 주간 케어</h4>
                <p className="text-base text-gray-600">주 1-2회 엑스폴리에이션으로 각질을 제거해주세요</p>
              </CardContent>
            </Card>
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

export default BeautyCategory;