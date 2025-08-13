import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Heart, Search, Menu, User, Filter, Grid, List } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import '../base.css';
// placeholder 이미지 사용
const cozyBeddingImage = "https://via.placeholder.com/600x400/f3f4f6/9ca3af?text=Bedding";
const cozyCurtainsImage = "https://via.placeholder.com/600x400/e5e7eb/6b7280?text=Curtains";

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
      const storeParam = new URLSearchParams(window.location.search).get('store');
      if (!storeParam) {
        setError('스토어 정보를 찾을 수 없습니다.');
        return;
      }

      // 카테고리 매핑
      const categoryMap = {
        'bedding': '침구류',
        'curtains': '커튼',
        'homedeco': '홈데코',
        'sale': '세일',
        'new-collection': '신상품',
        'all': ''
      };

      const categoryNameKr = categoryMap[categoryName] || '';
      
      // 카테고리별 상품 조회
      let apiUrl = `http://localhost:3001/api/v1/products/current?store=${storeParam}`;
      if (categoryNameKr) {
        // TODO: 실제로는 category ID로 조회해야 함
        apiUrl += `&category=${categoryNameKr}`;
      }

      const response = await fetch(apiUrl);
      
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          const formattedProducts = result.data.products.map(product => ({
            id: product.id,
            image: product.images?.[0]?.url || cozyBeddingImage,
            title: product.name,
            price: `${product.price.toLocaleString()}원`,
            originalPrice: product.comparePrice ? `${product.comparePrice.toLocaleString()}원` : null,
            discount: product.comparePrice ? 
              `${Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}%` : null,
            rating: 4.5 + Math.random() * 0.5, // 임시 평점
            reviews: Math.floor(Math.random() * 200) + 50 // 임시 리뷰 수
          }));
          setProducts(formattedProducts);
        }
      } else {
        setError('상품 정보를 불러올 수 없습니다.');
      }
    } catch (err) {
      console.error('상품 조회 오류:', err);
      setError('상품 정보를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 기본 더미 데이터 (API 실패 시 사용)
  const defaultProducts = [
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
      title: "모던 암막 커튼",
      price: "89,000원",
      originalPrice: "125,000원",
      discount: "29%",
      rating: 4.6,
      reviews: 89
    },
    {
      id: 3,
      image: cozyBeddingImage,
      title: "울트라소프트 베개",
      price: "45,000원",
      originalPrice: "65,000원",
      discount: "31%",
      rating: 4.7,
      reviews: 234
    },
    {
      id: 4,
      image: cozyCurtainsImage,
      title: "럭셔리 실크 이불",
      price: "299,000원",
      originalPrice: "450,000원",
      discount: "34%",
      rating: 4.9,
      reviews: 67
    },
    {
      id: 5,
      image: cozyBeddingImage,
      title: "천연 라텍스 매트리스",
      price: "359,000원",
      originalPrice: "520,000원",
      discount: "31%",
      rating: 4.8,
      reviews: 122
    },
    {
      id: 6,
      image: cozyCurtainsImage,
      title: "북유럽 스타일 블라인드",
      price: "125,000원",
      originalPrice: "179,000원",
      discount: "30%",
      rating: 4.5,
      reviews: 93
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Menu className="h-6 w-6 mr-4 lg:hidden" />
              <Link to={`/?store=${storeParam}`} className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>코지홈</Link>
            </div>
            
            <nav className="hidden lg:flex space-x-8">
              <Link to={`/?store=${storeParam}`} className="text-gray-700 hover:text-gray-900 font-medium">홈</Link>
              <Link to={`/category/bedding?store=${storeParam}`} className="text-gray-700 hover:text-gray-900 font-medium" style={{ color: 'var(--color-primary)' }}>침구류</Link>
              <Link to={`/category/curtains?store=${storeParam}`} className="text-gray-700 hover:text-gray-900 font-medium">커튼/블라인드</Link>
              <Link to={`/category/homedeco?store=${storeParam}`} className="text-gray-700 hover:text-gray-900 font-medium">홈데코</Link>
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

      {/* 브레드크럼 */}
      <div className="bg-cozy-muted py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-base text-gray-600">
            <Link to={`/?store=${storeParam}`} className="hover:text-cozy-primary transition-smooth">홈</Link>
            <span className="mx-2">/</span>
            <span className="text-cozy-primary font-medium">침구류</span>
          </div>
        </div>
      </div>

      {/* 카테고리 헤더 */}
      <section className="py-8 bg-cozy-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-cozy-primary mb-4">침구류</h1>
          <p className="text-lg text-gray-600">편안한 잠자리를 위한 프리미엄 침구 컬렉션</p>
        </div>
      </section>

      {/* 필터 및 정렬 */}
      <div className="bg-cozy-card border-b border-cozy-border py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <Grid className="h-6 w-6 cursor-pointer text-cozy-primary" />
                <List className="h-6 w-6 cursor-pointer text-gray-400 hover:text-cozy-primary transition-smooth" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 상품 목록 */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                    <div className="absolute top-2 left-2 bg-cozy-primary text-cozy-primary-foreground px-2 py-1 rounded text-sm font-semibold">
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
                    <span className="text-xl font-bold text-cozy-primary">{product.price}</span>
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

          {/* 페이지네이션 */}
          {!loading && !error && products.length > 0 && (
            <div className="flex justify-center mt-12">
            <div className="flex space-x-2">
              <Button variant="outline" className="border-cozy-border hover:bg-cozy-muted">이전</Button>
              <Button className="bg-cozy-primary text-cozy-primary-foreground">1</Button>
              <Button variant="outline" className="border-cozy-border hover:bg-cozy-muted">2</Button>
              <Button variant="outline" className="border-cozy-border hover:bg-cozy-muted">3</Button>
              <Button variant="outline" className="border-cozy-border hover:bg-cozy-muted">다음</Button>
            </div>
            </div>
          )}
        </div>
      </section>

      {/* 푸터 */}
      <footer className="bg-cozy-primary text-cozy-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">코지홈</h4>
              <p className="text-base">포근하고 따뜻한 일상을<br />만들어가는 홈 텍스타일 전문몰</p>
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