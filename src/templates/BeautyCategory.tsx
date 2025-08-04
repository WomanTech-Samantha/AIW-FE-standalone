import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Heart, Search, Menu, User, Filter, Grid, List, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import beautySkincareImage from "@/assets/beauty-skincare-1.jpg";
import beautyMakeupImage from "@/assets/beauty-makeup-1.jpg";

const BeautyCategory = () => {
  const products = [
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
    <div className="min-h-screen bg-beauty-background">
      {/* 헤더 */}
      <header className="bg-beauty-card border-b border-beauty-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Menu className="h-6 w-6 mr-4 lg:hidden" />
              <Link to="/beauty" className="text-2xl font-bold text-beauty-primary flex items-center">
                <Leaf className="h-6 w-6 mr-2" />
                내추럴뷰티
              </Link>
            </div>
            
            <nav className="hidden lg:flex space-x-8">
              <Link to="/beauty" className="text-base font-medium hover:text-beauty-primary transition-smooth">홈</Link>
              <Link to="/beauty/category" className="text-base font-medium text-beauty-primary">스킨케어</Link>
              <Link to="/beauty/category" className="text-base font-medium hover:text-beauty-primary transition-smooth">메이크업</Link>
              <Link to="/beauty/category" className="text-base font-medium hover:text-beauty-primary transition-smooth">헤어케어</Link>
              <Link to="/beauty/category" className="text-base font-medium hover:text-beauty-primary transition-smooth">바디케어</Link>
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
            <Link to="/beauty" className="hover:text-beauty-primary transition-smooth">홈</Link>
            <span className="mx-2">/</span>
            <span className="text-beauty-primary font-medium">스킨케어</span>
          </div>
        </div>
      </div>

      {/* 카테고리 헤더 */}
      <section className="py-12 bg-beauty-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-beauty-primary mb-4 flex items-center justify-center">
              🌿 Skincare Collection
            </h1>
            <p className="text-xl text-gray-600">자연 성분으로 건강한 피부를 만드는 기초 화장품</p>
          </div>
        </div>
      </section>

      {/* 필터 및 정렬 */}
      <div className="bg-beauty-card border-b border-beauty-border py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Button variant="outline" className="border-beauty-border hover:bg-beauty-muted">
                <Filter className="h-4 w-4 mr-2" />
                필터
              </Button>
              <div className="flex space-x-4 text-base">
                <button className="text-beauty-primary font-medium border-b-2 border-beauty-primary pb-1">전체</button>
                <button className="text-gray-600 hover:text-beauty-primary transition-smooth">세럼</button>
                <button className="text-gray-600 hover:text-beauty-primary transition-smooth">크림</button>
                <button className="text-gray-600 hover:text-beauty-primary transition-smooth">토너</button>
                <button className="text-gray-600 hover:text-beauty-primary transition-smooth">클렌징</button>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="group cursor-pointer hover:shadow-beauty transition-smooth bg-beauty-card border-beauty-border overflow-hidden">
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-smooth"
                  />
                  <div className="absolute top-4 left-4 bg-beauty-accent text-black px-3 py-1 rounded-full text-sm font-bold">
                    {product.badge}
                  </div>
                  <div className="absolute top-4 right-4 bg-beauty-primary text-beauty-primary-foreground px-2 py-1 rounded text-sm font-semibold">
                    {product.discount} OFF
                  </div>
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
                    <span className="text-lg text-gray-400 line-through">{product.originalPrice}</span>
                  </div>
                  <Link to="/beauty/product">
                    <Button className="w-full bg-beauty-primary hover:bg-beauty-primary/90 text-beauty-primary-foreground text-base font-medium py-3 transition-smooth">
                      자세히 보기
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 페이지네이션 */}
          <div className="flex justify-center mt-16">
            <div className="flex space-x-2">
              <Button variant="outline" className="border-beauty-border hover:bg-beauty-muted px-4 py-2">이전</Button>
              <Button className="bg-beauty-primary text-beauty-primary-foreground px-4 py-2">1</Button>
              <Button variant="outline" className="border-beauty-border hover:bg-beauty-muted px-4 py-2">2</Button>
              <Button variant="outline" className="border-beauty-border hover:bg-beauty-muted px-4 py-2">3</Button>
              <Button variant="outline" className="border-beauty-border hover:bg-beauty-muted px-4 py-2">다음</Button>
            </div>
          </div>
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