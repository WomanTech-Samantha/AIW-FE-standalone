import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Heart, Search, Menu, User, Filter, Grid, List, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import chicDressImage from "@/assets/chic-dress-1.jpg";
import chicAccessoriesImage from "@/assets/chic-accessories-1.jpg";

const ChicCategory = () => {
  const products = [
    {
      id: 1,
      image: chicDressImage,
      title: "시그니처 블랙 드레스",
      price: "189,000원",
      originalPrice: "259,000원",
      discount: "27%",
      rating: 4.9,
      reviews: 142,
      badge: "BEST"
    },
    {
      id: 2,
      image: chicAccessoriesImage,
      title: "골드 체인 목걸이",
      price: "125,000원",
      originalPrice: "178,000원",
      discount: "30%",
      rating: 4.7,
      reviews: 89,
      badge: "HOT"
    },
    {
      id: 3,
      image: chicDressImage,
      title: "실크 블라우스",
      price: "159,000원",
      originalPrice: "229,000원",
      discount: "31%",
      rating: 4.8,
      reviews: 203,
      badge: "NEW"
    },
    {
      id: 4,
      image: chicAccessoriesImage,
      title: "클래식 트렌치 코트",
      price: "389,000원",
      originalPrice: "550,000원",
      discount: "29%",
      rating: 4.9,
      reviews: 76,
      badge: "PREMIUM"
    },
    {
      id: 5,
      image: chicDressImage,
      title: "미니멀 니트 원피스",
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
      title: "실버 이어링 세트",
      price: "89,000원",
      originalPrice: "128,000원",
      discount: "30%",
      rating: 4.8,
      reviews: 134,
      badge: ""
    }
  ];

  return (
    <div className="min-h-screen bg-chic-background">
      {/* 헤더 */}
      <header className="bg-chic-card border-b border-chic-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Menu className="h-6 w-6 mr-4 lg:hidden" />
              <Link to="/chic" className="text-2xl font-bold text-chic-primary flex items-center">
                <Crown className="h-6 w-6 mr-2" />
                시크패션
              </Link>
            </div>
            
            <nav className="hidden lg:flex space-x-8">
              <Link to="/chic" className="text-base font-medium hover:text-chic-primary transition-smooth">홈</Link>
              <Link to="/chic/category" className="text-base font-medium text-chic-primary">원피스</Link>
              <Link to="/chic/category" className="text-base font-medium hover:text-chic-primary transition-smooth">블라우스</Link>
              <Link to="/chic/category" className="text-base font-medium hover:text-chic-primary transition-smooth">액세서리</Link>
              <Link to="/chic/category" className="text-base font-medium hover:text-chic-primary transition-smooth">아우터</Link>
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

      {/* 브레드크럼 */}
      <div className="bg-chic-muted py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-base text-gray-600">
            <Link to="/chic" className="hover:text-chic-primary transition-smooth">홈</Link>
            <span className="mx-2">/</span>
            <span className="text-chic-primary font-medium">원피스 컬렉션</span>
          </div>
        </div>
      </div>

      {/* 카테고리 헤더 */}
      <section className="py-12 bg-chic-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-chic-primary mb-4">Dress Collection</h1>
            <p className="text-xl text-gray-600">우아하고 세련된 원피스로 완성하는 완벽한 스타일</p>
          </div>
        </div>
      </section>

      {/* 필터 및 정렬 */}
      <div className="bg-chic-card border-b border-chic-border py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Button variant="outline" className="border-chic-border hover:bg-chic-muted">
                <Filter className="h-4 w-4 mr-2" />
                필터
              </Button>
              <div className="flex space-x-4 text-base">
                <button className="text-chic-primary font-medium border-b-2 border-chic-primary pb-1">전체</button>
                <button className="text-gray-600 hover:text-chic-primary transition-smooth">캐주얼</button>
                <button className="text-gray-600 hover:text-chic-primary transition-smooth">포멀</button>
                <button className="text-gray-600 hover:text-chic-primary transition-smooth">파티</button>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="group cursor-pointer hover:shadow-chic transition-smooth bg-chic-card border-chic-border overflow-hidden">
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
                  <div className="absolute top-4 right-4 bg-chic-primary text-chic-primary-foreground px-2 py-1 rounded text-sm font-semibold">
                    {product.discount} OFF
                  </div>
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
                    <span className="text-lg text-gray-400 line-through">{product.originalPrice}</span>
                  </div>
                  <Link to="/chic/product">
                    <Button className="w-full bg-chic-primary hover:bg-chic-primary/90 text-chic-primary-foreground text-base font-medium py-3 transition-smooth">
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
              <Button variant="outline" className="border-chic-border hover:bg-chic-muted px-4 py-2">이전</Button>
              <Button className="bg-chic-primary text-chic-primary-foreground px-4 py-2">1</Button>
              <Button variant="outline" className="border-chic-border hover:bg-chic-muted px-4 py-2">2</Button>
              <Button variant="outline" className="border-chic-border hover:bg-chic-muted px-4 py-2">3</Button>
              <Button variant="outline" className="border-chic-border hover:bg-chic-muted px-4 py-2">다음</Button>
            </div>
          </div>
        </div>
      </section>

      {/* 스타일 가이드 */}
      <section className="py-16 bg-chic-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-center mb-12 text-chic-primary">Style Guide</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8 bg-chic-card border-chic-border">
              <CardContent className="p-0">
                <h4 className="text-lg font-semibold mb-3">Business Casual</h4>
                <p className="text-base text-gray-600">미팅과 오피스룩을 위한 세련된 스타일링</p>
              </CardContent>
            </Card>
            <Card className="text-center p-8 bg-chic-card border-chic-border">
              <CardContent className="p-0">
                <h4 className="text-lg font-semibold mb-3">Evening Elegance</h4>
                <p className="text-base text-gray-600">특별한 저녁 모임을 위한 우아한 룩</p>
              </CardContent>
            </Card>
            <Card className="text-center p-8 bg-chic-card border-chic-border">
              <CardContent className="p-0">
                <h4 className="text-lg font-semibold mb-3">Weekend Chic</h4>
                <p className="text-base text-gray-600">편안하면서도 시크한 주말 스타일</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="bg-chic-primary text-chic-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-2xl font-bold mb-6 flex items-center">
                <Crown className="h-6 w-6 mr-2" />
                시크패션
              </h4>
              <p className="text-base leading-relaxed">세련되고 우아한 스타일로<br />당신만의 개성을 표현하세요</p>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-6">Customer Care</h5>
              <p className="text-base mb-2">1588-5678</p>
              <p className="text-base mb-2">평일 10:00-19:00</p>
              <p className="text-base">토요일 10:00-17:00</p>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-6">Services</h5>
              <p className="text-base mb-2">무료 배송</p>
              <p className="text-base mb-2">VIP 멤버십</p>
              <p className="text-base">스타일링 상담</p>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-6">About</h5>
              <p className="text-base mb-2">브랜드 스토리</p>
              <p className="text-base mb-2">매장 안내</p>
              <p className="text-base">채용 정보</p>
            </div>
          </div>
          <div className="border-t border-chic-accent/20 mt-12 pt-8 text-center">
            <p className="text-base">&copy; 2024 시크패션. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ChicCategory;