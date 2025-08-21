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
  
  // Store data 가져오기
  const storeData = (window as any).STORE_DATA;
  const storeName = storeData?.store?.storeName || '내추럴뷰티';
  const business = storeData?.store?.business || '';
  
  // 카테고리 제목 반환 함수
  const getCategoryTitle = (categoryName: string, business: string) => {
    if (business.includes('침구') || business.includes('이불')) {
      const titles = {
        'comforters': '이불 콜렉션',
        'pillows': '베개 콜렉션',
        'sheets': '시트 콜렉션',
        'baby': '아기침구 콜렉션',
        'sale': '특가 상품',
        'all': '전체 상품'
      };
      return titles[categoryName] || '침구 콜렉션';
    } else if (business.includes('수공예')) {
      const titles = {
        'pottery': '도자기 작품',
        'textile': '직물 작품',
        'woodwork': '목공예 작품',
        'jewelry': '액세서리 작품',
        'sale': '특가 작품',
        'all': '전체 작품'
      };
      return titles[categoryName] || '수공예 작품';
    }
    return '콜렉션';
  };
  
  // 카테고리 설명 반환 함수
  const getCategoryDescription = (categoryName: string, business: string) => {
    if (business.includes('침구') || business.includes('이불')) {
      const descriptions = {
        'comforters': '편안한 수면을 위한 프리미엄 이불',
        'pillows': '목과 건강을 위한 기능성 베개',
        'sheets': '부드럽고 시원한 침대 시트',
        'baby': '우리 아이를 위한 안전한 침구',
        'sale': '특별한 가격으로 만나보세요',
        'all': '모든 침구 상품을 한눈에'
      };
      return descriptions[categoryName] || '최고의 품질로 만든 침구';
    } else if (business.includes('수공예')) {
      const descriptions = {
        'pottery': '작가의 정성이 담긴 도자기',
        'textile': '섬세한 손길로 완성한 직물 작품',
        'woodwork': '자연의 아름다움을 담은 목공예',
        'jewelry': '특별한 순간을 빛내줄 액세서리',
        'sale': '특별 할인 작품',
        'all': '모든 수공예 작품을 한눈에'
      };
      return descriptions[categoryName] || '손끝에서 탄생한 특별한 작품';
    }
    return '제품을 만나보세요';
  };
  
  // 서브 카테고리 반환 함수
  const getSubCategories = (categoryName: string, business: string) => {
    if (business.includes('침구') || business.includes('이불')) {
      const subCats = {
        'comforters': ['극세사 이불', '구스다운', '카손이불', '계절이불'],
        'pillows': ['메모리폼', '라텍스', '구스다운', '경추베개'],
        'sheets': ['텐셀', '순면', '극세사', '에쥬집'],
        'baby': ['블랭킷', '이불', '베개', '방수패드'],
        'sale': ['이불', '베개', '시트', '세트'],
        'all': ['이불', '베개', '시트', '세트']
      };
      return subCats[categoryName] || ['이불', '베개', '시트', '세트'];
    } else if (business.includes('수공예')) {
      const subCats = {
        'pottery': ['찻잔', '그릇', '화병', '접시'],
        'textile': ['자수', '위빙', '테피스트리', '캐왈'],
        'woodwork': ['보울', '트레이', '좌탁', '소품'],
        'jewelry': ['목걸이', '귀걸이', '팔찌', '반지'],
        'sale': ['도자기', '직물', '목공예', '액세서리'],
        'all': ['도자기', '직물', '목공예', '액세서리']
      };
      return subCats[categoryName] || ['도자기', '직물', '목공예', '액세서리'];
    }
    return ['전체'];
  };

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
      
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Menu className="h-6 w-6 mr-4 lg:hidden" />
              <Link to={`/?store=${storeParam}`} className="text-2xl font-bold flex items-center">
                <span className="text-2xl mr-2">{business.includes('수공예') ? '🎨' : '🌿'}</span>
                <span style={{ color: 'var(--color-primary)' }}>{storeName}</span>
              </Link>
            </div>
            
            <nav className="hidden lg:flex space-x-8">
              <Link to={`/?store=${storeParam}`} className="text-gray-700 hover:text-gray-900 font-medium">홈</Link>
              {business.includes('침구') || business.includes('이불') ? (
                <>
                  <Link to={`/category/comforters?store=${storeParam}`} className="text-gray-700 hover:text-gray-900 font-medium">이불·이불세트</Link>
                  <Link to={`/category/pillows?store=${storeParam}`} className="text-gray-700 hover:text-gray-900 font-medium">베개·베개커버</Link>
                  <Link to={`/category/sheets?store=${storeParam}`} className="text-gray-700 hover:text-gray-900 font-medium">시트·매트리스커버</Link>
                  <Link to={`/category/baby?store=${storeParam}`} className="text-gray-700 hover:text-gray-900 font-medium">아기침구</Link>
                </>
              ) : business.includes('수공예') ? (
                <>
                  <Link to={`/category/pottery?store=${storeParam}`} className="text-gray-700 hover:text-gray-900 font-medium">도자기·세라믹</Link>
                  <Link to={`/category/textile?store=${storeParam}`} className="text-gray-700 hover:text-gray-900 font-medium">직물·자수</Link>
                  <Link to={`/category/woodwork?store=${storeParam}`} className="text-gray-700 hover:text-gray-900 font-medium">목공예</Link>
                  <Link to={`/category/jewelry?store=${storeParam}`} className="text-gray-700 hover:text-gray-900 font-medium">액세서리</Link>
                </>
              ) : (
                <>
                  <Link to={`/category/comforters?store=${storeParam}`} className="text-gray-700 hover:text-gray-900 font-medium">이불·이불세트</Link>
                  <Link to={`/category/pillows?store=${storeParam}`} className="text-gray-700 hover:text-gray-900 font-medium">베개·베개커버</Link>
                  <Link to={`/category/sheets?store=${storeParam}`} className="text-gray-700 hover:text-gray-900 font-medium">시트·매트리스커버</Link>
                  <Link to={`/category/baby?store=${storeParam}`} className="text-gray-700 hover:text-gray-900 font-medium">아기침구</Link>
                </>
              )}
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

      
      <div className="bg-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-base text-gray-600">
            <Link to={`/?store=${storeParam}`} className="text-gray-600 hover:text-gray-900">홈</Link>
            <span className="mx-2">/</span>
            <span className="font-medium" style={{ color: 'var(--color-primary)' }}>{categoryName}</span>
          </div>
        </div>
      </div>

      
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 flex items-center justify-center" style={{ color: 'var(--color-primary)' }}>
              {business.includes('수공예') ? '🎨' : '🌿'} {getCategoryTitle(categoryName, business)}
            </h1>
            <p className="text-xl text-gray-600">{getCategoryDescription(categoryName, business)}</p>
          </div>
        </div>
      </section>

      
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
                {getSubCategories(categoryName, business).map((subCat, idx) => (
                  <button key={idx} className="text-gray-600 hover:opacity-80">{subCat}</button>
                ))}
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

      
      <section className="py-16 bg-beauty-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-center mb-12 text-beauty-primary">
            {business.includes('수공예') ? '작품 특징' : business.includes('침구') ? '소재 특징' : 'Key Ingredients'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {(business.includes('침구') || business.includes('이불') ? [
              {
                icon: "🌿",
                name: "오가닉 코튼",
                benefit: "피부 친화적"
              },
              {
                icon: "🧺",
                name: "텐셀 소재",
                benefit: "시원한 촉감"
              },
              {
                icon: "🎍",
                name: "대나무 섬유",
                benefit: "항균 효과"
              },
              {
                icon: "☁️",
                name: "구스다운",
                benefit: "보온성 우수"
              }
            ] : business.includes('수공예') ? [
              {
                icon: "🏺",
                name: "천연 흙",
                benefit: "전통 기법"
              },
              {
                icon: "🧪",
                name: "핸드메이드",
                benefit: "정성스런 제작"
              },
              {
                icon: "🎨",
                name: "친환경 염료",
                benefit: "자연 색상"
              },
              {
                icon: "✨",
                name: "하나뿐인 작품",
                benefit: "특별한 가치"
              }
            ] : [
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
            ]).map((ingredient, index) => (
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

      
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-center mb-12 text-beauty-primary">
            {business.includes('수공예') ? '작품 관리 팁' : business.includes('침구') ? '침구 관리 팁' : 'Skincare Tips'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {business.includes('침구') || business.includes('이불') ? (
              <>
                <Card className="p-6 bg-beauty-card border-beauty-border">
                  <CardContent className="p-0">
                    <h4 className="text-lg font-semibold mb-3">🌞 세탁 방법</h4>
                    <p className="text-base text-gray-600">중성세제로 30도 미웩수에 세탁하세요</p>
                  </CardContent>
                </Card>
                <Card className="p-6 bg-beauty-card border-beauty-border">
                  <CardContent className="p-0">
                    <h4 className="text-lg font-semibold mb-3">🌬️ 보관 방법</h4>
                    <p className="text-base text-gray-600">통풍이 잘 되는 건조한 곳에 보관하세요</p>
                  </CardContent>
                </Card>
                <Card className="p-6 bg-beauty-card border-beauty-border">
                  <CardContent className="p-0">
                    <h4 className="text-lg font-semibold mb-3">✨ 교체 주기</h4>
                    <p className="text-base text-gray-600">계절별로 1-2년 주기로 교체를 권장합니다</p>
                  </CardContent>
                </Card>
              </>
            ) : business.includes('수공예') ? (
              <>
                <Card className="p-6 bg-beauty-card border-beauty-border">
                  <CardContent className="p-0">
                    <h4 className="text-lg font-semibold mb-3">🧽 청소 방법</h4>
                    <p className="text-base text-gray-600">부드러운 천으로 먼지를 닦아주세요</p>
                  </CardContent>
                </Card>
                <Card className="p-6 bg-beauty-card border-beauty-border">
                  <CardContent className="p-0">
                    <h4 className="text-lg font-semibold mb-3">☀️ 보관 환경</h4>
                    <p className="text-base text-gray-600">직사광선을 피하고 습도를 조절해주세요</p>
                  </CardContent>
                </Card>
                <Card className="p-6 bg-beauty-card border-beauty-border">
                  <CardContent className="p-0">
                    <h4 className="text-lg font-semibold mb-3">🎁 포장 팁</h4>
                    <p className="text-base text-gray-600">선물용 포장은 무료로 제공해드립니다</p>
                  </CardContent>
                </Card>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </section>

      
      <footer className="bg-beauty-primary text-beauty-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-2xl font-bold mb-6 flex items-center">
                <span className="text-2xl mr-2">{business.includes('수공예') ? '🎨' : '🌿'}</span>
                {storeName}
              </h4>
              <p className="text-base leading-relaxed">
                {business.includes('수공예') ? '작가의 정성이 담긴<br />특별한 작품을 만나보세요' : 
                 business.includes('침구') ? '편안한 수면을 위한<br />프리미엄 침구를 만나보세요' :
                 '자연에서 온 순수한 아름다움으로<br />건강한 피부를 만들어가세요'}
              </p>
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
              <p className="text-base mb-2">{business.includes('수공예') ? '작품 주문제작' : business.includes('침구') ? '맞춤 제작' : '피부 진단'}</p>
              <p className="text-base">{business.includes('수공예') ? '선물 포장' : business.includes('침구') ? '방문 설치' : '샘플 키트'}</p>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-6">브랜드</h5>
              <p className="text-base mb-2">브랜드 스토리</p>
              <p className="text-base mb-2">{business.includes('수공예') ? '작가 소개' : business.includes('침구') ? '소재 이야기' : '성분 이야기'}</p>
              <p className="text-base">{business.includes('수공예') ? '전시회 일정' : '지속가능성'}</p>
            </div>
          </div>
          <div className="border-t border-beauty-accent/20 mt-12 pt-8 text-center">
            <p className="text-base">&copy; 2024 {storeName}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BeautyCategory;