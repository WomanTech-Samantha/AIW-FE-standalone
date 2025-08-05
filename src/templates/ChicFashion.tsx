import React from 'react';
import { Link } from 'react-router-dom';

const ChicFashion = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 - 미니멀하고 세련된 디자인 */}
      <header className="border-b border-gray-100">
        <div className="container">
          <div className="flex items-center justify-between h-20">
            <h1 className="text-3xl font-light tracking-wider" style={{ color: 'var(--color-primary)' }}>CHIC</h1>
            
            <nav className="hidden lg:flex space-x-12">
              <Link to="/chic" className="text-sm font-medium text-gray-700 hover:text-gray-900 tracking-wide">HOME</Link>
              <Link to="/chic/category" className="text-sm font-medium text-gray-700 hover:text-gray-900 tracking-wide">DRESSES</Link>
              <Link to="/chic/category" className="text-sm font-medium text-gray-700 hover:text-gray-900 tracking-wide">BLOUSES</Link>
              <Link to="/chic/category" className="text-sm font-medium text-gray-700 hover:text-gray-900 tracking-wide">ACCESSORIES</Link>
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
                Elegant<br />
                <span style={{ color: 'var(--color-primary)' }}>Style</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 font-light">
                세련되고 우아한 스타일로<br />
                당신만의 개성을 표현하세요
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

      {/* 특별 프로모션 - 심플한 배너 */}
      <section className="py-2 text-center text-white" style={{ backgroundColor: 'var(--color-primary)' }}>
        <p className="text-sm tracking-wider">FREE SHIPPING ON ORDERS OVER 150,000원</p>
      </section>

      {/* 베스트셀러 - 그리드 갤러리 */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-light text-gray-800 mb-4">Best Sellers</h3>
            <p className="text-gray-600 font-light">시그니처 컬렉션</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: '시그니처 블랙 원피스', desc: '미니멀한 실루엣', price: '189,000', originalPrice: '259,000', badge: 'NEW' },
              { name: '슬리브리스 블라우스', desc: '우아한 라인', price: '129,000', originalPrice: '169,000', badge: 'BEST' },
              { name: '핀턱 쇼츠', desc: '클래식 핏', price: '89,000', originalPrice: '119,000', badge: 'SALE' }
            ].map((item, idx) => (
              <div key={idx} className="group">
                <Link to="/chic/product">
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
        <div className="container">
          <h3 className="text-4xl font-light text-center text-gray-800 mb-16">Shop by Category</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'DRESSES', count: '45' },
              { name: 'BLOUSES', count: '32' },
              { name: 'ACCESSORIES', count: '28' },
              { name: 'OUTERWEAR', count: '18' }
            ].map((cat, idx) => (
              <Link key={idx} to="/chic/category">
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

      {/* 브랜드 스토리 - 대칭적 레이아웃 */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-3xl font-light text-gray-800 mb-6">Our Philosophy</h3>
              <p className="text-gray-600 leading-relaxed mb-4 font-light">
                시크는 미니멀리즘과 우아함을 추구하는 현대 여성을 위한 브랜드입니다.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8 font-light">
                각 피스는 시간을 초월한 디자인과 최고급 소재로 제작되어, 당신만의 스타일을 완성합니다.
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

      {/* 푸터 - 심플한 디자인 */}
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