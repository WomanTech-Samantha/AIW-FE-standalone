import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CozyHome = () => {
  const [storeData, setStoreData] = useState<any>(null);
  const [brandData, setBrandData] = useState<any>(null);

  // 현재 store 파라미터 가져오기
  const storeParam = new URLSearchParams(window.location.search).get('store');

  useEffect(() => {
    // 전역 스토어 데이터 가져오기
    const globalData = (window as any).STORE_DATA;
    if (globalData) {
      setStoreData(globalData.store);
      setBrandData(globalData.brand);
    }
  }, []);

  const storeName = storeData?.storeName || '코지홈';
  const brandName = brandData?.brandName || '브랜드명';
  const slogan = brandData?.slogan || '포근하고 따뜻한 우리집';
  const description = storeData?.description || '편안한 휴식을 위한 프리미엄 침구';
  const business = storeData?.business || '';

  // 업종에 따른 카테고리 메뉴 설정
  const getCategories = () => {
    if (business.includes('침구') || business.includes('이불')) {
      return [
        { path: 'comforters', name: '이불·이불세트' },
        { path: 'pillows', name: '베개·베개커버' },
        { path: 'sheets', name: '시트·매트리스커버' },
        { path: 'baby', name: '아기침구' },
        { path: 'sale', name: '세일' }
      ];
    } else if (business.includes('수공예')) {
      return [
        { path: 'pottery', name: '도자기·세라믹' },
        { path: 'textile', name: '직물·자수' },
        { path: 'woodwork', name: '목공예' },
        { path: 'jewelry', name: '액세서리' },
        { path: 'sale', name: '세일' }
      ];
    } else {
      // 기본값 (침구)
      return [
        { path: 'comforters', name: '이불·이불세트' },
        { path: 'pillows', name: '베개·베개커버' },
        { path: 'sheets', name: '시트·매트리스커버' },
        { path: 'baby', name: '아기침구' },
        { path: 'sale', name: '세일' }
      ];
    }
  };

  const categories = getCategories();

  // 업종별 문구 설정
  const getBusinessContent = () => {
    if (business.includes('침구') || business.includes('이불')) {
      return {
        heroSubtext: '프리미엄 침구와 편안한 수면 환경',
        collectionText: '2025 신상 침구 컬렉션 확인하기',
        promoTitle: '다가오는 겨울, 따뜻한 침구로 포근하게 보내세요',
        promoSubtitle: '겨울맞이 침구 특별 세일',
        saleInfo: '최대 40% 할인 침구 확인!',
        categoryPromo1: '🛏️ 프리미엄 이불세트',
        categoryPromo2: '🛏️ 호텔급 베개',
        categoryPromo3: '🛏️ 부드러운 시트',
        emoji: '🛏️'
      };
    } else if (business.includes('수공예')) {
      return {
        heroSubtext: '정성으로 만든 핸드메이드 작품들',
        collectionText: '2025 신작 수공예품 확인하기',
        promoTitle: '특별한 순간, 정성 담긴 수공예품과 함께하세요',
        promoSubtitle: '핸드메이드 작품 특가전',
        saleInfo: '최대 30% 할인 수공예품 확인!',
        categoryPromo1: '🎨 도자기·세라믹',
        categoryPromo2: '🧵 직물·자수작품',
        categoryPromo3: '🪵 목공예품',
        emoji: '🎨'
      };
    } else {
      // 기본값 (침구)
      return {
        heroSubtext: '프리미엄 침구와 편안한 수면 환경',
        collectionText: '2025 신상 침구 컬렉션 확인하기',
        promoTitle: '다가오는 겨울, 따뜻한 침구로 포근하게 보내세요',
        promoSubtitle: '겨울맞이 침구 특별 세일',
        saleInfo: '최대 40% 할인 침구 확인!',
        categoryPromo1: '🛏️ 프리미엄 이불세트',
        categoryPromo2: '🛏️ 호텔급 베개',
        categoryPromo3: '🛏️ 부드러운 시트',
        emoji: '🛏️'
      };
    }
  };

  const businessContent = getBusinessContent();

  // 업종별 인기 상품 설정
  const getPopularProducts = () => {
    if (business.includes('침구') || business.includes('이불')) {
      return [
        { name: '프리미엄 구스다운 이불', desc: '최고급 구스다운으로 만든 따뜻하고 부드러운 이불', price: '189,000', originalPrice: '220,000', discount: '15%', icon: '🛏️' },
        { name: '호텔식 베개 세트', desc: '5성급 호텔에서 사용하는 프리미엄 베개 2개 세트', price: '89,000', originalPrice: '110,000', discount: '20%', icon: '🛏️' },
        { name: '순면 침대 시트 세트', desc: '100% 순면으로 만든 부드러운 침대 시트 세트', price: '65,000', originalPrice: '85,000', discount: '25%', icon: '🛏️' }
      ];
    } else if (business.includes('수공예')) {
      return [
        { name: '핸드메이드 도자기 머그컵', desc: '수작업으로 만든 유니크한 도자기 머그컵', price: '45,000', originalPrice: '55,000', discount: '18%', icon: '🎨' },
        { name: '우드 카빙 트레이', desc: '천연 원목으로 제작한 핸드메이드 트레이', price: '68,000', originalPrice: '79,000', discount: '15%', icon: '🪵' },
        { name: '마크라메 월행잉', desc: '천연 코튼으로 만든 보헤미안 스타일 벽장식', price: '52,000', originalPrice: '65,000', discount: '20%', icon: '🧵' }
      ];
    } else {
      // 기본값 (침구)
      return [
        { name: '프리미엄 구스다운 이불', desc: '최고급 구스다운으로 만든 따뜻하고 부드러운 이불', price: '189,000', originalPrice: '220,000', discount: '15%', icon: '🛏️' },
        { name: '호텔식 베개 세트', desc: '5성급 호텔에서 사용하는 프리미엄 베개 2개 세트', price: '89,000', originalPrice: '110,000', discount: '20%', icon: '🛏️' },
        { name: '순면 침대 시트 세트', desc: '100% 순면으로 만든 부드러운 침대 시트 세트', price: '65,000', originalPrice: '85,000', discount: '25%', icon: '🛏️' }
      ];
    }
  };

  const popularProducts = getPopularProducts();

  // 업종별 카테고리 설정
  const getCategoryDisplay = () => {
    if (business.includes('침구') || business.includes('이불')) {
      return [
        { name: '침구류', desc: '편안한 잠자리를 위한', count: '120+ 개의 상품', icon: '🛏️', link: `/category/bedding?store=${storeParam}` },
        { name: '커튼/블라인드', desc: '완벽한 공간 연출을 위한', count: '85+ 개의 상품', icon: '🪟', link: `/category/curtains?store=${storeParam}` },
        { name: '홈데코', desc: '따뜻한 분위기 연출을 위한', count: '200+ 개의 상품', icon: '🏠', link: `/category/homedeco?store=${storeParam}` }
      ];
    } else if (business.includes('수공예')) {
      return [
        { name: '도자기·세라믹', desc: '정성으로 빚어낸', count: '95+ 개의 상품', icon: '🏺', link: `/category/pottery?store=${storeParam}` },
        { name: '직물·자수', desc: '섬세한 손끝에서 탄생한', count: '120+ 개의 상품', icon: '🧵', link: `/category/textile?store=${storeParam}` },
        { name: '목공예', desc: '자연의 따뜻함을 담은', count: '80+ 개의 상품', icon: '🪵', link: `/category/woodwork?store=${storeParam}` }
      ];
    } else {
      // 기본값 (침구)
      return [
        { name: '침구류', desc: '편안한 잠자리를 위한', count: '120+ 개의 상품', icon: '🛏️', link: `/category/bedding?store=${storeParam}` },
        { name: '커튼/블라인드', desc: '완벽한 공간 연출을 위한', count: '85+ 개의 상품', icon: '🪟', link: `/category/curtains?store=${storeParam}` },
        { name: '홈데코', desc: '따뜻한 분위기 연출을 위한', count: '200+ 개의 상품', icon: '🏠', link: `/category/homedeco?store=${storeParam}` }
      ];
    }
  };

  const categoryDisplay = getCategoryDisplay();
  return (
    <div className="bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>{storeName}</h1>
            
            <nav className="hidden lg:flex space-x-8">
              <Link to={`/?store=${storeParam}`} className="text-gray-700 hover:text-gray-900 font-medium">홈</Link>
              {categories.map((category) => (
                <Link 
                  key={category.path}
                  to={`/category/${category.path}?store=${storeParam}`} 
                  className="text-gray-700 hover:text-gray-900 font-medium"
                >
                  {category.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full relative transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full relative transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">2</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 코지 템플릿 특징: 부드러운 곡선과 따뜻한 레이아웃 */}
      {/* 히어로 섹션 - 둥근 모서리와 오버레이 */}
      <section className="relative overflow-hidden py-responsive" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h2 className="heading-xl-responsive font-bold mb-6 text-gray-800 leading-tight">
                {slogan.split(' ').slice(0, 2).join(' ')}<br />
                <span style={{ color: 'var(--color-primary)' }}>{slogan.split(' ').slice(2).join(' ')}</span>
              </h2>
              <p className="text-responsive text-gray-600 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                {description}<br />
                {businessContent.heroSubtext}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to={`/category/new-collection?store=${storeParam}`} className="btn btn-primary px-8 py-4 text-white font-medium rounded-full shadow-lg hover:shadow-xl text-center">
                  {businessContent.collectionText}
                </Link>
                <Link to={`/category/all?store=${storeParam}`} className="btn btn-secondary px-8 py-4 font-medium rounded-full text-center">
                  전체 상품 보기
                </Link>
              </div>
            </div>
            <div className="relative mt-8 lg:mt-0">
              <div className="rounded-3xl overflow-hidden shadow-2xl" style={{ backgroundColor: 'var(--color-secondary)' }}>
                <div className="aspect-square bg-muted/20 rounded-3xl flex items-center justify-center relative">
                  <svg className="w-24 h-24 text-gray-300 absolute" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div className="text-6xl opacity-30">{businessContent.emoji}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 특별 프로모션 - 물결 모양 섹션 */}
      <section className="relative py-responsive">
        <div className="absolute inset-0 opacity-10" style={{ backgroundColor: 'var(--color-primary)' }}></div>
        <div className="container relative">

          <h2 className="heading-xl-responsive font-bold mb-6 text-gray-800 leading-tight text-center">
              {businessContent.promoTitle.includes('침구') 
                ? <>다가오는 겨울, <span style={{ color: 'var(--color-primary)' }}>{storeName}</span>과 함께 따뜻하게 보내세요</>
                : <>특별한 순간, <span style={{ color: 'var(--color-primary)' }}>{storeName}</span>과 함께하세요</>
              }
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl px-responsive py-responsive text-center relative overflow-hidden">
              
              
              {/* 세일 딱지 */}
              <div className="absolute -top-2 -right-2 w-20 h-20 transform rotate-12">
                <div className="w-full h-full rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg animate-pulse" style={{ backgroundColor: 'var(--color-primary)' }}>
                  SALE
                </div>
              </div>
              
              <h3 className="heading-responsive font-bold mb-6 animate-bounce" style={{ color: 'var(--color-primary)', animationDuration: '3s' }}>
                {businessContent.promoSubtitle}
              </h3>
              
              <div className="mb-8">
                <p className="text-2xl font-bold mb-2 text-right">{businessContent.saleInfo}&nbsp;&nbsp;&nbsp;</p>
              </div>
              
              <div className="border-t border-b border-gray-200 py-6 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-lg font-semibold text-gray-800">{businessContent.categoryPromo1.split(' ')[1]}</p>
                    <p className="text-sm text-gray-600">{business.includes('침구') ? '40% 할인' : '30% 할인'}</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-800">{businessContent.categoryPromo2.split(' ')[1]}</p>
                    <p className="text-sm text-gray-600">{business.includes('침구') ? '30% 할인' : '25% 할인'}</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-800">{businessContent.categoryPromo3.split(' ')[1]}</p>
                    <p className="text-sm text-gray-600">25% 할인</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to={`/category/sale?store=${storeParam}`} className="btn btn-primary px-8 py-3 text-white font-medium rounded-full text-center">
                  세일 상품 보기
                </Link>
                <button className="btn btn-secondary px-6 py-3 font-medium rounded-full">
                  내 장바구니 보기
                </button>
              </div>
              
              <div className="mt-6 p-3 border border-gray-300 rounded-lg">
                <p className="text-sm text-gray-600">
                  12월 31일까지 한정 | 크리스마스 배송 마감 12월 23일
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 인기 상품 - 카드형 레이아웃 */}
      <section className="py-responsive">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="heading-responsive font-bold text-gray-800 mb-4">이번 주 인기 상품</h3>
            <p className="text-responsive text-gray-600">고객님들이 가장 사랑하는 상품들</p>
          </div>
          
          <div className="responsive-grid responsive-grid-3 gap-8">
            {popularProducts.map((item, idx) => (
              <Link key={idx} to={`/product/popular-${idx + 1}?store=${storeParam}`} className="group block">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:scale-105 cursor-pointer">
                  <div className="relative">
                    <div className="h-64 bg-muted/20 flex items-center justify-center relative group">
                      <svg className="w-16 h-16 text-gray-300 absolute" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div 
                      className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-sm font-medium"
                      style={{ backgroundColor: 'var(--color-primary)' }}
                    >
                      {item.discount} OFF
                    </div>
                    <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">{item.name}</h4>
                    <p className="text-sm text-gray-600 mb-4">{item.desc}</p>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>{item.price}원</span>
                        <span className="text-sm text-gray-400 line-through ml-2">{item.originalPrice}원</span>
                      </div>
                      <div className="flex items-center space-x-1 text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="text-sm text-gray-500 ml-1">(4.8)</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 btn btn-primary py-3 rounded-full font-medium">
                        장바구니
                      </button>
                      <button className="flex-1 btn btn-secondary py-3 rounded-full font-medium">
                        바로구매
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to={`/category/all?store=${storeParam}`} className="btn btn-secondary px-8 py-3 rounded-full font-medium text-center">
              더 많은 상품 보기
            </Link>
          </div>
        </div>
      </section>

      {/* 카테고리 - 원형 아이콘 레이아웃 */}
      <section className="py-responsive" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="heading-responsive font-bold text-center text-gray-800 mb-12">관심있는 카테고리부터 보세요</h3>
          <div className="responsive-grid responsive-grid-3 gap-12">
            {categoryDisplay.map((cat, idx) => (
              <Link key={idx} to={cat.link} className="group cursor-pointer block">
                <div className="text-center bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                  <div 
                    className="w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center text-5xl group-hover:scale-110 transition-all shadow-md"
                    style={{ backgroundColor: 'var(--color-secondary)' }}
                  >
                    {cat.icon}
                  </div>
                  <p className="text-gray-600 mb-2">{cat.desc}</p>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">{cat.name}</h4>
                  <div>&nbsp;</div>
                  <p className="text-sm font-medium" style={{ color: 'var(--color-primary)' }}>{cat.count}</p>
                  <div className="mt-4 btn btn-secondary px-6 py-2 rounded-full text-sm font-medium">
                    둘러보기
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-responsive text-white" style={{ backgroundColor: 'var(--color-primary)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="responsive-grid responsive-grid-4 gap-8 mb-8">
            <div>
              <h4 className="text-xl font-bold mb-4">{storeName}</h4>
              <p className="text-sm opacity-90 mb-4">{description}<br />만들어가는 홈 텍스타일</p>
              <div className="flex space-x-4">
                <a href="#" className="text-white hover:opacity-80 transition-opacity">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-white hover:opacity-80 transition-opacity">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.748.099.12.112.225.085.346-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.747 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001.017 0z"/>
                  </svg>
                </a>
                <a href="#" className="text-white hover:opacity-80 transition-opacity">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h5 className="font-semibold mb-3">고객센터</h5>
              <p className="text-sm opacity-90 mb-2">📞 1588-1234</p>
              <p className="text-sm opacity-90 mb-2">⏰ 평일 09:00-18:00</p>
              <p className="text-sm opacity-90">💬 카카오톡 상담</p>
            </div>
            <div>
              <h5 className="font-semibold mb-3">쇼핑정보</h5>
              <ul className="text-sm opacity-90 space-y-1">
                <li><a href="#" className="hover:underline">배송안내</a></li>
                <li><a href="#" className="hover:underline">교환/반품</a></li>
                <li><a href="#" className="hover:underline">사이즈 가이드</a></li>
                <li><a href="#" className="hover:underline">적립금 안내</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">회사정보</h5>
              <ul className="text-sm opacity-90 space-y-1">
                <li><a href="#" className="hover:underline">회사소개</a></li>
                <li><a href="#" className="hover:underline">이용약관</a></li>
                <li><a href="#" className="hover:underline">개인정보처리방침</a></li>
                <li><a href="#" className="hover:underline">사업자정보</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white border-opacity-20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm opacity-80">
              <p>© 2025 {storeName}. All rights reserved.</p>
              <p className="mt-2 md:mt-0">Made with ❤️ in Korea</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CozyHome;