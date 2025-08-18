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
  const [selectedColor, setSelectedColor] = useState("블랙");
  const [selectedSize, setSelectedSize] = useState("M");

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

  const colors = ["블랙", "네이비", "베이지", "화이트"];
  const sizes = ["XS", "S", "M", "L", "XL"];

  const relatedProducts = [
    {
      id: 1,
      image: chicAccessoriesImage,
      title: "골드 체인 목걸이",
      price: "125,000원",
      originalPrice: "178,000원"
    },
    {
      id: 2,
      image: chicDressImage,
      title: "실크 블라우스",
      price: "159,000원",
      originalPrice: "229,000원"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Menu className="h-6 w-6 mr-4 lg:hidden" />
              <Link to={`/?store=${storeParam}`} className="text-3xl font-light tracking-wider" style={{ color: 'var(--color-primary)' }}>
                <Crown className="h-6 w-6 mr-2" />
                시크패션
              </Link>
            </div>
            
            <nav className="hidden lg:flex space-x-8">
              <Link to={`/?store=${storeParam}`} className="text-sm font-medium text-gray-700 hover:text-gray-900 tracking-wide">홈</Link>
              <Link to={`/category/dresses?store=${storeParam}`} className="text-sm font-medium text-gray-700 hover:text-gray-900 tracking-wide">원피스</Link>
              <Link to={`/category/tops?store=${storeParam}`} className="text-sm font-medium text-gray-700 hover:text-gray-900 tracking-wide">블라우스</Link>
              <Link to={`/category/accessories?store=${storeParam}`} className="text-sm font-medium text-gray-700 hover:text-gray-900 tracking-wide">액세서리</Link>
              <Link to={`/category/outerwear?store=${storeParam}`} className="text-sm font-medium text-gray-700 hover:text-gray-900 tracking-wide">아우터</Link>
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
            <Link to={`/?store=${storeParam}`} className="hover:text-chic-primary transition-smooth">홈</Link>
            <span className="mx-2">/</span>
            <Link to={`/category/dresses?store=${storeParam}`} className="hover:text-chic-primary transition-smooth">원피스</Link>
            <span className="mx-2">/</span>
            <span className="text-chic-primary font-medium">시그니처 블랙 드레스</span>
          </div>
        </div>
      </div>

      {/* 상품 상세 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* 상품 이미지 */}
            <div className="space-y-6">
              <div className="aspect-[3/4] overflow-hidden rounded-lg bg-chic-card shadow-chic">
                <img 
                  src={chicDressImage} 
                  alt="시그니처 블랙 드레스"
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

            {/* 상품 정보 */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center mb-4">
                  <span className="bg-chic-accent text-black px-3 py-1 rounded-full text-sm font-bold mr-3">BEST</span>
                  <span className="text-base text-gray-600">SKU: CHC-001</span>
                </div>
                <h1 className="text-4xl font-bold text-chic-primary mb-6">Signature Black Dress</h1>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-chic-accent fill-current" />
                    ))}
                    <span className="text-base text-gray-600 ml-2">4.9 (142 리뷰)</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4 mb-8">
                  <span className="text-4xl font-bold text-chic-primary">189,000원</span>
                  <span className="text-2xl text-gray-400 line-through">259,000원</span>
                  <span className="bg-chic-primary text-chic-primary-foreground px-4 py-2 rounded text-lg font-semibold">27% OFF</span>
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  타임리스한 우아함을 담은 시그니처 블랙 드레스입니다. 고급 원단과 완벽한 핏으로 어떤 상황에서도 
                  세련된 스타일을 연출할 수 있습니다. 미니멀하면서도 디테일이 살아있는 디자인으로 
                  다양한 액세서리와 매치하여 개성 있는 룩을 완성해보세요.
                </p>

                {/* 색상 선택 */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Color</h3>
                  <div className="flex space-x-3">
                    {colors.map((color) => (
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

                {/* 사이즈 선택 */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Size</h3>
                  <div className="flex space-x-3">
                    {sizes.map((size) => (
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

                {/* 수량 선택 */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Quantity</h3>
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

                {/* 구매 버튼 */}
                <div className="space-y-4 pt-8">
                  <Button className="w-full bg-chic-primary hover:bg-chic-primary/90 text-chic-primary-foreground py-4 text-lg font-semibold transition-smooth">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button className="w-full bg-chic-accent hover:bg-chic-accent/90 text-black py-4 text-lg font-semibold transition-smooth">
                    Buy Now
                  </Button>
                  <Button variant="outline" className="w-full border-chic-border hover:bg-chic-muted py-4 text-lg">
                    <Heart className="h-5 w-5 mr-2" />
                    Add to Wishlist
                  </Button>
                </div>

                {/* 서비스 정보 */}
                <div className="bg-chic-muted p-8 rounded-lg space-y-4">
                  <div className="flex items-center space-x-4">
                    <Truck className="h-6 w-6 text-chic-primary" />
                    <span className="text-base">무료배송 (10만원 이상)</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Shield className="h-6 w-6 text-chic-primary" />
                    <span className="text-base">품질보증 & A/S</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <RotateCcw className="h-6 w-6 text-chic-primary" />
                    <span className="text-base">14일 무료 교환/반품</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Crown className="h-6 w-6 text-chic-primary" />
                    <span className="text-base">VIP 멤버 전용 혜택</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 상품 상세 정보 */}
      <section className="py-16 bg-chic-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-b border-chic-border mb-12">
            <nav className="flex space-x-12">
              <button className="text-xl font-semibold text-chic-primary border-b-2 border-chic-primary pb-4">Product Details</button>
              <button className="text-xl font-medium text-gray-600 hover:text-chic-primary pb-4 transition-smooth">Reviews (142)</button>
              <button className="text-xl font-medium text-gray-600 hover:text-chic-primary pb-4 transition-smooth">Size Guide</button>
              <button className="text-xl font-medium text-gray-600 hover:text-chic-primary pb-4 transition-smooth">Care Instructions</button>
            </nav>
          </div>
          <div className="prose max-w-none">
            <h3 className="text-2xl font-bold mb-6">Product Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg">
              <div>
                <h4 className="text-xl font-semibold mb-4">소재 & 구성</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• 외피: 폴리에스터 95%, 스판덱스 5%</li>
                  <li>• 안감: 실크 100%</li>
                  <li>• 지퍼: 은밀한 백 지퍼 클로저</li>
                  <li>• 색상: 딥 블랙</li>
                  <li>• 원산지: Made in Korea</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-4">핏 & 스타일</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• 핏: 슬림핏</li>
                  <li>• 길이: 무릎 위 5cm</li>
                  <li>• 스타일: A라인 실루엣</li>
                  <li>• 네크라인: 라운드 넥</li>
                  <li>• 소매: 7부소매</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 관련 상품 */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold mb-12 text-center">Complete the Look</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {relatedProducts.map((product) => (
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
                      View Details
                    </Button>
                  </CardContent>
                </div>
              </Card>
            ))}
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

export default ChicProduct;