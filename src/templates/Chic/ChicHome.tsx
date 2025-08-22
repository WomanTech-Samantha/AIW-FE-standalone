import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ChicFashion = () => {
  const [storeData, setStoreData] = useState<any>(null);
  const [brandData, setBrandData] = useState<any>(null);
  const [productsData, setProductsData] = useState<any>([]);
  
  // 현재 store 파라미터 가져오기
  const storeParam = new URLSearchParams(window.location.search).get('store');
  
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
      setProductsData(globalData.products || []);
      
      // 테마 적용
      if (globalData.brand?.templateColor) {
        applyTheme(globalData.brand.templateColor);
      }
    }
  }, []);

  const storeName = storeData?.storeName || 'CHIC';
  const brandName = brandData?.brandName || 'CHIC';
  const slogan = brandData?.slogan || 'MINIMAL & ELEGANT';
  const description = storeData?.description || '세련된 감성의 프리미엄 패션';
  const business = storeData?.business || '';

  // 업종에 따른 카테고리 메뉴 설정
  const getCategories = () => {
    if (business.includes('침구') || business.includes('이불')) {
      return [
        { path: 'comforters', name: '이불' },
        { path: 'pillows', name: '베개' },
        { path: 'sheets', name: '침대커버' },
        { path: 'baby', name: '아기침구' }
      ];
    } else if (business.includes('수공예')) {
      return [
        { path: 'pottery', name: '도자기' },
        { path: 'textile', name: '직물공예' },
        { path: 'woodwork', name: '목공예' },
        { path: 'jewelry', name: '장신구' }
      ];
    } else {
      // 기본값 (패션)
      return [
        { path: 'dresses', name: '원피스' },
        { path: 'tops', name: '상의' },
        { path: 'outerwear', name: '외투' },
        { path: 'accessories', name: '장신구' }
      ];
    }
  };

  const categories = getCategories();

  // 업종별 문구 설정
  const getBusinessContent = () => {
    if (business.includes('침구') || business.includes('이불')) {
      return {
        heroTitle1: '프리미엄',
        heroTitle2: '침구',
        heroSubtext: '고급 침구로 완성하는\n품격 있는 수면 공간',
        promoText: '10만원 이상 구매 시 무료배송',
        sectionTitle: '인기 상품',
        sectionSubtitle: '고객님이 가장 사랑하는 침구',
        products: [
          { name: '구스 이불 세트', desc: '호텔급 품질', price: '289,000', originalPrice: '359,000', badge: '신상' },
          { name: '메모리폼 경추 베개', desc: '완벽한 지지력', price: '89,000', originalPrice: '129,000', badge: '인기' },
          { name: '대나무 여름 이불', desc: '시원한 촉감', price: '59,000', originalPrice: '89,000', badge: '할인' }
        ],
        categoryTitle: '카테고리별 쫼핑',
        categoryItems: [
          { name: '이불', count: '45', path: 'comforters' },
          { name: '베개', count: '32', path: 'pillows' },
          { name: '침대커버', count: '28', path: 'sheets' },
          { name: '아기침구', count: '18', path: 'baby' }
        ],
        philosophyTitle: '우리의 철학',
        philosophyText1: '편안한 잠자리는 건강한 삶의 시작입니다.',
        philosophyText2: '최고급 소재로 만든 침구로 당신의 숙면을 책임집니다.',
        shopNow: '쫼핑하기',
        learnMore: '더 알아보기',
        footerSlogan: '편안한 숙면의 동반자'
      };
    } else if (business.includes('수공예')) {
      return {
        heroTitle1: '수공예',
        heroTitle2: '작품',
        heroSubtext: '정성스런 손길로 완성된\n특별한 수공예 작품들',
        promoText: '8만원 이상 구매 시 무료포장',
        sectionTitle: '주목 작품',
        sectionSubtitle: '장인이 추천하는 작품',
        products: [
          { name: '수제 도자기 찻잔', desc: '전통 기법', price: '125,000', originalPrice: '165,000', badge: '신상' },
          { name: '자수 벽걸이', desc: '손 자수', price: '78,000', originalPrice: '98,000', badge: '인기' },
          { name: '원목 찻상', desc: '천연 원목', price: '45,000', originalPrice: '65,000', badge: '할인' }
        ],
        categoryTitle: '작품 둘러보기',
        categoryItems: [
          { name: '도자기', count: '38', path: 'pottery' },
          { name: '직물공예', count: '25', path: 'textile' },
          { name: '목공예', count: '22', path: 'woodwork' },
          { name: '장신구', count: '15', path: 'jewelry' }
        ],
        philosophyTitle: '장인 정신',
        philosophyText1: '하나하나 정성을 담아 만드는 작품입니다.',
        philosophyText2: '전통 기법과 현대적 감각이 조화를 이룹니다.',
        shopNow: '작품 보기',
        learnMore: '작가 소개',
        footerSlogan: '손길이 담긴 작품'
      };
    } else {
      // 기본값 (패션)
      return {
        heroTitle1: '우아한',
        heroTitle2: '스타일',
        heroSubtext: '세련된 감각으로 완성하는\n당신만의 특별한 스타일',
        promoText: '10만원 이상 구매 시 무료배송',
        sectionTitle: '인기 상품',
        sectionSubtitle: '이번 시즌 베스트 아이템',
        products: [
          { name: '비단 원피스', desc: '우아한 디자인', price: '189,000', originalPrice: '259,000', badge: '신상' },
          { name: '캐시미어 니트', desc: '부드러운 촉감', price: '125,000', originalPrice: '178,000', badge: '인기' },
          { name: '금빛 목걸이', desc: '고급 주얼리', price: '89,000', originalPrice: '129,000', badge: '할인' }
        ],
        categoryTitle: '카테고리별 쫼핑',
        categoryItems: [
          { name: '원피스', count: '45', path: 'dresses' },
          { name: '상의', count: '32', path: 'tops' },
          { name: '장신구', count: '28', path: 'accessories' },
          { name: '외투', count: '18', path: 'outerwear' }
        ],
        philosophyTitle: '우리의 철학',
        philosophyText1: '미니멀리즘과 우아한 스타일을 추구합니다.',
        philosophyText2: '최고급 소재로 당신만의 개성을 표현하세요.',
        shopNow: '쫼핑하기',
        learnMore: '더 알아보기',
        footerSlogan: '우아함의 정수'
      };
    }
  };

  const businessContent = getBusinessContent();
  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 - 미니멀하고 세련된 디자인 */}
      <header className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <h1 className="text-3xl font-light tracking-wider" style={{ color: 'var(--color-primary)' }}>{storeName.toUpperCase()}</h1>
            
            <nav className="hidden lg:flex space-x-12">
              <Link to={`/?store=${storeParam}`} className="text-sm font-medium text-gray-700 hover:text-gray-900 tracking-wide">홈</Link>
              {categories.map((category) => (
                <Link 
                  key={category.path}
                  to={`/category/${category.path}?store=${storeParam}`} 
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 tracking-wide"
                >
                  {category.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-6">
              <button className="text-gray-700 hover:text-gray-900">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button className="text-gray-700 hover:text-gray-900">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 시크 템플릿 특징: 미니멀하고 세련된 그리드 레이아웃 */}
      {/* 히어로 섹션 - 대칭적이고 깔끔한 디자인 */}
      <section className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="order-2 lg:order-1 flex items-center justify-center p-20" style={{ backgroundColor: 'var(--color-background)' }}>
            <div className="max-w-md">
              <h2 className="text-5xl font-light leading-tight mb-6 text-gray-800">
                {businessContent.heroTitle1}<br />
                <span style={{ color: 'var(--color-primary)' }}>{businessContent.heroTitle2}</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 font-light whitespace-pre-line">
                {businessContent.heroSubtext}
              </p>
              <button 
                className="px-10 py-4 border text-sm font-medium tracking-wider hover:text-white transition-all"
                style={{ 
                  borderColor: 'var(--color-primary)', 
                  color: 'var(--color-primary)'
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.backgroundColor = 'var(--color-primary)';
                  (e.target as HTMLElement).style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.backgroundColor = 'transparent';
                  (e.target as HTMLElement).style.color = 'var(--color-primary)';
                }}
              >
                {businessContent.shopNow}
              </button>
            </div>
          </div>
          <div className="order-1 lg:order-2 h-96 lg:h-auto bg-gray-100 flex items-center justify-center relative">
            <svg className="w-32 h-32 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      </section>

      {/* 특별 프로모션 - 심플한 배너 */}
      <section className="py-2 text-center text-white" style={{ backgroundColor: 'var(--color-primary)' }}>
        <p className="text-sm tracking-wider">{businessContent.promoText}</p>
      </section>

      {/* 베스트셀러 - 그리드 갤러리 */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-light text-gray-800 mb-4">{businessContent.sectionTitle}</h3>
            <p className="text-gray-600 font-light">{businessContent.sectionSubtitle}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {businessContent.products.map((item, idx) => (
              <div key={idx} className="group">
                <Link to={`/product/popular-${idx + 1}?store=${storeParam}`}>
                  <div className="relative overflow-hidden">
                    <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center relative">
                      <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all"></div>
                    <div 
                      className="absolute top-4 right-4 px-3 py-1 text-xs font-medium tracking-wider"
                      style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-text)' }}
                    >
                      {item.badge}
                    </div>
                  </div>
                  <div className="pt-4">
                    <h4 className="text-lg font-light text-gray-800 mb-2">{item.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{item.desc}</p>
                    <div className="flex items-center space-x-3">
                      <span className="text-xl" style={{ color: 'var(--color-primary)' }}>{item.price}원</span>
                      <span className="text-sm text-gray-400 line-through">{item.originalPrice}원</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 카테고리 - 미니멀 카드 */}
      <section className="py-20" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-light text-center text-gray-800 mb-16">{businessContent.categoryTitle}</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {businessContent.categoryItems.map((cat, idx) => (
              <Link key={idx} to={`/category/${cat.path}?store=${storeParam}`}>
                <div className="group cursor-pointer">
                  <div className="aspect-square bg-gray-100 mb-4 relative overflow-hidden flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div className="absolute inset-0 border group-hover:border-2 transition-all" style={{ borderColor: 'var(--color-primary)' }}></div>
                  </div>
                  <h4 className="text-sm font-medium tracking-wider text-center text-gray-800">{cat.name}</h4>
                  <p className="text-xs text-center text-gray-500 mt-1">{cat.count}개 상품</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 브랜드 스토리 - 대칭적 레이아웃 */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-3xl font-light text-gray-800 mb-6">{businessContent.philosophyTitle}</h3>
              <p className="text-gray-600 leading-relaxed mb-4 font-light">
                {businessContent.philosophyText1}
              </p>
              <p className="text-gray-600 leading-relaxed mb-8 font-light">
                {businessContent.philosophyText2}
              </p>
              <button 
                className="text-sm font-medium tracking-wider pb-1 border-b transition-all"
                style={{ 
                  color: 'var(--color-primary)',
                  borderColor: 'var(--color-primary)'
                }}
              >
                {businessContent.learnMore}
              </button>
            </div>
            <div className="h-96 bg-gray-100 flex items-center justify-center relative">
              <svg className="w-32 h-32 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* 푸터 - 심플한 디자인 */}
      <footer className="py-16 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="text-2xl font-light mb-4" style={{ color: 'var(--color-primary)' }}>{storeName.toUpperCase()}</h4>
              <p className="text-sm text-gray-600 font-light">{businessContent.footerSlogan}</p>
            </div>
            <div>
              <h5 className="text-sm font-medium tracking-wider mb-4 text-gray-800">고객 센터</h5>
              <p className="text-sm text-gray-600 font-light">1588-5678<br />평일 10:00-19:00</p>
            </div>
            <div>
              <h5 className="text-sm font-medium tracking-wider mb-4 text-gray-800">서비스</h5>
              <p className="text-sm text-gray-600 font-light">무료 배송<br />회원 혜택</p>
            </div>
            <div>
              <h5 className="text-sm font-medium tracking-wider mb-4 text-gray-800">소개</h5>
              <p className="text-sm text-gray-600 font-light">브랜드 이야기<br />채용 정보</p>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-gray-100">
            <p className="text-xs text-gray-500">&copy; 2025 {storeName.toUpperCase()}. 모든 권리 보유.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ChicFashion;