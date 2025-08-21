import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ChicFashion = () => {
  const [storeData, setStoreData] = useState<any>(null);
  const [brandData, setBrandData] = useState<any>(null);
  
  // 현재 store 파라미터 가져오기
  const storeParam = new URLSearchParams(window.location.search).get('store');

  useEffect(() => {
    // 전역 스토어 데이터 가져오기
    const globalData = (window as any).STORE_DATA;
    console.log('ChicHome - window.STORE_DATA:', globalData);
    if (globalData) {
      console.log('ChicHome - Setting store data:', globalData.store);
      console.log('ChicHome - Setting brand data:', globalData.brand);
      setStoreData(globalData.store);
      setBrandData(globalData.brand);
    } else {
      console.log('ChicHome - No STORE_DATA found, trying again...');
      // 데이터가 없으면 잠시 후 다시 시도
      setTimeout(() => {
        const retryData = (window as any).STORE_DATA;
        if (retryData) {
          console.log('ChicHome - Retry success:', retryData);
          setStoreData(retryData.store);
          setBrandData(retryData.brand);
        }
      }, 100);
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
        { path: 'comforters', name: 'COMFORTERS' },
        { path: 'pillows', name: 'PILLOWS' },
        { path: 'sheets', name: 'SHEETS' },
        { path: 'baby', name: 'BABY' }
      ];
    } else if (business.includes('수공예')) {
      return [
        { path: 'pottery', name: 'POTTERY' },
        { path: 'textile', name: 'TEXTILE' },
        { path: 'woodwork', name: 'WOODWORK' },
        { path: 'jewelry', name: 'JEWELRY' }
      ];
    } else {
      // 기본값 (침구)
      return [
        { path: 'comforters', name: 'COMFORTERS' },
        { path: 'pillows', name: 'PILLOWS' },
        { path: 'sheets', name: 'SHEETS' },
        { path: 'baby', name: 'BABY' }
      ];
    }
  };

  const categories = getCategories();

  // 업종별 문구 설정
  const getBusinessContent = () => {
    if (business.includes('침구') || business.includes('이불')) {
      return {
        heroTitle1: 'Premium',
        heroTitle2: 'Bedding',
        heroSubtext: '고급 침구로 완성하는\n품격 있는 수면 공간',
        promoText: 'FREE SHIPPING ON ORDERS OVER 100,000원',
        sectionTitle: 'Best Sellers',
        sectionSubtitle: '인기 침구 컬렉션',
        products: [
          { name: '프리미엄 이불 세트', desc: '호텔급 품질', price: '289,000', originalPrice: '359,000', badge: 'NEW' },
          { name: '메모리폼 베개', desc: '완벽한 지지력', price: '89,000', originalPrice: '129,000', badge: 'BEST' },
          { name: '실크 베개커버', desc: '부드러운 촉감', price: '59,000', originalPrice: '89,000', badge: 'SALE' }
        ],
        categoryTitle: 'Shop by Category'
      };
    } else if (business.includes('수공예')) {
      return {
        heroTitle1: 'Handmade',
        heroTitle2: 'Artisan',
        heroSubtext: '정성스런 손길로 완성된\n특별한 수공예 작품들',
        promoText: 'FREE SHIPPING ON ORDERS OVER 80,000원',
        sectionTitle: 'Featured Works',
        sectionSubtitle: '작가 추천 작품',
        products: [
          { name: '수제 도자기 볼', desc: '전통 기법', price: '125,000', originalPrice: '165,000', badge: 'NEW' },
          { name: '자수 쿠션커버', desc: '핸드스티치', price: '78,000', originalPrice: '98,000', badge: 'BEST' },
          { name: '원목 트레이', desc: '천연 원목', price: '45,000', originalPrice: '65,000', badge: 'SALE' }
        ],
        categoryTitle: 'Shop by Category'
      };
    } else {
      // 기본값 (침구)
      return {
        heroTitle1: 'Premium',
        heroTitle2: 'Bedding',
        heroSubtext: '고급 침구로 완성하는\n품격 있는 수면 공간',
        promoText: 'FREE SHIPPING ON ORDERS OVER 100,000원',
        sectionTitle: 'Best Sellers',
        sectionSubtitle: '인기 침구 컬렉션',
        products: [
          { name: '프리미엄 이불 세트', desc: '호텔급 품질', price: '289,000', originalPrice: '359,000', badge: 'NEW' },
          { name: '메모리폼 베개', desc: '완벽한 지지력', price: '89,000', originalPrice: '129,000', badge: 'BEST' },
          { name: '실크 베개커버', desc: '부드러운 촉감', price: '59,000', originalPrice: '89,000', badge: 'SALE' }
        ],
        categoryTitle: 'Shop by Category'
      };
    }
  };

  const businessContent = getBusinessContent();
  return (
    <div className="min-h-screen bg-white">
      
      <header className="border-b border-gray-100">
        <div className="container">
          <div className="flex items-center justify-between h-20">
            <h1 className="text-3xl font-light tracking-wider" style={{ color: 'var(--color-primary)' }}>{storeName.toUpperCase()}</h1>
            
            <nav className="hidden lg:flex space-x-12">
              <Link to={`/?store=${storeParam}`} className="text-sm font-medium text-gray-700 hover:text-gray-900 tracking-wide">HOME</Link>
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
                SHOP NOW
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

      
      <section className="py-2 text-center text-white" style={{ backgroundColor: 'var(--color-primary)' }}>
        <p className="text-sm tracking-wider">{businessContent.promoText}</p>
      </section>

      
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-light text-gray-800 mb-4">{businessContent.sectionTitle}</h3>
            <p className="text-gray-600 font-light">{businessContent.sectionSubtitle}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {businessContent.products.map((item, idx) => (
              <div key={idx} className="group">
                <Link to={`/product/1?store=${storeParam}`}>
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

      
      <section className="py-20" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="container">
          <h3 className="text-4xl font-light text-center text-gray-800 mb-16">{businessContent.categoryTitle}</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'DRESSES', count: '45' },
              { name: 'BLOUSES', count: '32' },
              { name: 'ACCESSORIES', count: '28' },
              { name: 'OUTERWEAR', count: '18' }
            ].map((cat, idx) => (
              <Link key={idx} to={`/category/all?store=${storeParam}`}>
                <div className="group cursor-pointer">
                  <div className="aspect-square bg-gray-100 mb-4 relative overflow-hidden flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div className="absolute inset-0 border group-hover:border-2 transition-all" style={{ borderColor: 'var(--color-primary)' }}></div>
                  </div>
                  <h4 className="text-sm font-medium tracking-wider text-center text-gray-800">{cat.name}</h4>
                  <p className="text-xs text-center text-gray-500 mt-1">{cat.count} items</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-3xl font-light text-gray-800 mb-6">Our Philosophy</h3>
              <p className="text-gray-600 leading-relaxed mb-4 font-light">
                시크는 미니멀리즘과 우아한 인테리어를 추구하는 현대인들을 위한 브랜드입니다.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8 font-light">
                각 상품은 최고급 소재로 제작되어, 당신만의 이상적인 방 안에 녹아듭니다.
              </p>
              <button 
                className="text-sm font-medium tracking-wider pb-1 border-b transition-all"
                style={{ 
                  color: 'var(--color-primary)',
                  borderColor: 'var(--color-primary)'
                }}
              >
                LEARN MORE
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

      
      <footer className="py-16 border-t border-gray-100">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="text-2xl font-light mb-4" style={{ color: 'var(--color-primary)' }}>CHIC</h4>
              <p className="text-sm text-gray-600 font-light">Timeless Elegance</p>
            </div>
            <div>
              <h5 className="text-sm font-medium tracking-wider mb-4 text-gray-800">CUSTOMER CARE</h5>
              <p className="text-sm text-gray-600 font-light">1588-5678<br />Mon-Fri 10AM-7PM</p>
            </div>
            <div>
              <h5 className="text-sm font-medium tracking-wider mb-4 text-gray-800">SERVICES</h5>
              <p className="text-sm text-gray-600 font-light">Free Shipping<br />VIP Membership</p>
            </div>
            <div>
              <h5 className="text-sm font-medium tracking-wider mb-4 text-gray-800">ABOUT</h5>
              <p className="text-sm text-gray-600 font-light">Our Story<br />Careers</p>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-gray-100">
            <p className="text-xs text-gray-500">&copy; 2025 CHIC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ChicFashion;