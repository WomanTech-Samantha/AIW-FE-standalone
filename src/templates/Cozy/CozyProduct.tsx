import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Heart, Search, Menu, User, Plus, Minus, Star, Truck, Shield, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import '../base.css';
import { useState } from "react";
// placeholder 이미지 사용
const cozyBeddingImage = "https://via.placeholder.com/600x400/f3f4f6/9ca3af?text=Bedding";
const cozyCurtainsImage = "https://via.placeholder.com/600x400/e5e7eb/6b7280?text=Curtains";

const CozyProduct = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("베이지");
  const [selectedSize, setSelectedSize] = useState("킹");
  const storeParam = new URLSearchParams(window.location.search).get('store');
  const colors = ["베이지", "화이트", "그레이", "네이비"];
  const sizes = ["싱글", "슈퍼싱글", "퀸", "킹"];

  const relatedProducts = [
    {
      id: 1,
      image: cozyCurtainsImage,
      title: "모던 암막 커튼",
      price: "89,000원",
      originalPrice: "125,000원"
    },
    {
      id: 2,
      image: cozyBeddingImage,
      title: "울트라소프트 베개",
      price: "45,000원",
      originalPrice: "65,000원"
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
              <Link to={`/category/bedding?store=${storeParam}`} className="text-gray-700 hover:text-gray-900 font-medium">침구류</Link>
              <Link to={`/category/curtains?store=${storeParam}`} className="text-gray-700 hover:text-gray-900 font-medium">커튼/블라인드</Link>
              <Link to={`/category/homedeco?store=${storeParam}`} className="text-gray-700 hover:text-gray-900 font-medium">홈데코</Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Search className="h-6 w-6 cursor-pointer hover:text-cozy-primary transition-smooth" />
              <Heart className="h-6 w-6 cursor-pointer hover:text-cozy-primary transition-smooth" />
              <ShoppingCart className="h-6 w-6 cursor-pointer hover:text-cozy-primary transition-smooth" />
              <User className="h-6 w-6 cursor-pointer hover:text-cozy-primary transition-smooth" />
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
            <Link to={`/category/bedding?store=${storeParam}`} className="hover:text-cozy-primary transition-smooth">침구류</Link>
            <span className="mx-2">/</span>
            <span className="text-cozy-primary font-medium">프리미엄 코튼 침구 세트</span>
          </div>
        </div>
      </div>

      {/* 상품 상세 */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* 상품 이미지 */}
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-lg bg-cozy-card">
                <img 
                  src={cozyBeddingImage} 
                  alt="프리미엄 코튼 침구 세트"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-square overflow-hidden rounded-lg bg-cozy-card border-2 border-cozy-primary cursor-pointer">
                    <img 
                      src={cozyBeddingImage} 
                      alt={`상품 이미지 ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* 상품 정보 */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">프리미엄 코튼 침구 세트</h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-cozy-accent fill-current" />
                    ))}
                    <span className="text-base text-gray-600 ml-2">4.8 (156 리뷰)</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-3xl font-bold text-cozy-primary">129,000원</span>
                  <span className="text-xl text-gray-400 line-through">189,000원</span>
                  <span className="bg-cozy-primary text-cozy-primary-foreground px-3 py-1 rounded text-base font-semibold">32% OFF</span>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-base text-gray-600 leading-relaxed">
                  100% 순면으로 제작된 프리미엄 침구 세트입니다. 부드럽고 촉촉한 감촉으로 편안한 잠자리를 선사합니다. 
                  고밀도 직조 기법으로 내구성이 뛰어나며, 세탁 후에도 형태가 유지됩니다.
                </p>

                {/* 색상 선택 */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">색상</h3>
                  <div className="flex space-x-3">
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded border-2 text-base transition-smooth ${
                          selectedColor === color
                            ? "border-cozy-primary bg-cozy-primary text-cozy-primary-foreground"
                            : "border-cozy-border bg-cozy-card hover:border-cozy-primary"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 사이즈 선택 */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">사이즈</h3>
                  <div className="flex space-x-3">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded border-2 text-base transition-smooth ${
                          selectedSize === size
                            ? "border-cozy-primary bg-cozy-primary text-cozy-primary-foreground"
                            : "border-cozy-border bg-cozy-card hover:border-cozy-primary"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 수량 선택 */}
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

                {/* 구매 버튼 */}
                <div className="space-y-3 pt-6">
                  <Button className="w-full bg-cozy-primary hover:bg-cozy-primary/90 text-cozy-primary-foreground py-4 text-lg font-semibold transition-smooth">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    장바구니 담기
                  </Button>
                  <Button className="w-full bg-gradient-cozy text-white py-4 text-lg font-semibold shadow-cozy transition-bounce hover:scale-105">
                    바로 구매하기
                  </Button>
                  <Button variant="outline" className="w-full border-cozy-border hover:bg-cozy-muted py-4 text-lg">
                    <Heart className="h-5 w-5 mr-2" />
                    찜하기
                  </Button>
                </div>

                {/* 배송/보장 정보 */}
                <div className="bg-cozy-muted p-6 rounded-lg space-y-4">
                  <div className="flex items-center space-x-3">
                    <Truck className="h-5 w-5 text-cozy-primary" />
                    <span className="text-base">무료배송 (3만원 이상 구매시)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-cozy-primary" />
                    <span className="text-base">품질보증 1년</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RotateCcw className="h-5 w-5 text-cozy-primary" />
                    <span className="text-base">7일 무료 교환/반품</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 상품 상세 정보 */}
      <section className="py-12 bg-cozy-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-b border-cozy-border mb-8">
            <nav className="flex space-x-8">
              <button className="text-lg font-semibold text-cozy-primary border-b-2 border-cozy-primary pb-4">상품정보</button>
              <button className="text-lg font-medium text-gray-600 hover:text-cozy-primary pb-4 transition-smooth">리뷰 (156)</button>
              <button className="text-lg font-medium text-gray-600 hover:text-cozy-primary pb-4 transition-smooth">Q&A</button>
              <button className="text-lg font-medium text-gray-600 hover:text-cozy-primary pb-4 transition-smooth">배송/교환/반품</button>
            </nav>
          </div>
          <div className="prose max-w-none">
            <h3 className="text-xl font-bold mb-4">제품 특징</h3>
            <ul className="text-base leading-relaxed space-y-2 text-gray-700">
              <li>• 100% 순면 소재로 부드럽고 통기성이 뛰어남</li>
              <li>• 고밀도 직조 기법으로 내구성과 형태 안정성 확보</li>
              <li>• 저자극 천연염료 사용으로 피부에 안전</li>
              <li>• 세탁 후에도 색상 변화 없이 오래 사용 가능</li>
              <li>• 구성품: 이불커버 1개, 베개커버 2개, 침대시트 1개</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 관련 상품 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold mb-8">함께 보면 좋은 상품</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedProducts.map((product) => (
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
                      <span className="text-lg font-bold text-cozy-primary">{product.price}</span>
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

export default CozyProduct;