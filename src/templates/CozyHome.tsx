import React from 'react';

const CozyHome = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>코지홈</h1>
            
            <nav className="hidden lg:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-gray-900">홈</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">침구류</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">커튼</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">홈데코</a>
            </nav>

            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 코지 템플릿 특징: 부드러운 곡선과 따뜻한 레이아웃 */}
      {/* 히어로 섹션 - 둥근 모서리와 오버레이 */}
      <section className="relative overflow-hidden" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-800">
                포근한 일상을<br />
                <span style={{ color: 'var(--color-primary)' }}>만들어가세요</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                편안함과 따뜻함이 가득한 공간을 위한<br />
                프리미엄 홈 텍스타일
              </p>
              <button 
                className="px-8 py-4 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                컬렉션 둘러보기
              </button>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl" style={{ backgroundColor: 'var(--color-secondary)' }}>
                <div className="aspect-square bg-gray-200 rounded-3xl"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full" style={{ backgroundColor: 'var(--color-accent)', opacity: 0.5 }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* 특별 프로모션 - 물결 모양 섹션 */}
      <section className="relative py-16">
        <div className="absolute inset-0 opacity-10" style={{ backgroundColor: 'var(--color-primary)' }}></div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white rounded-3xl shadow-xl p-12">
            <h3 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-primary)' }}>🎁 겨울맞이 특별 세일</h3>
            <p className="text-xl text-gray-600 mb-8">모든 침구류 최대 40% 할인!</p>
            <button 
              className="px-8 py-3 text-white font-medium rounded-full"
              style={{ backgroundColor: 'var(--color-accent)' }}
            >
              세일 상품 보기
            </button>
          </div>
        </div>
      </section>

      {/* 인기 상품 - 카드형 레이아웃 */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">이번 주 인기 상품</h3>
            <p className="text-lg text-gray-600">고객님들이 가장 사랑하는 아이템</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="group">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
                  <div className="relative">
                    <div className="h-64 bg-gray-200"></div>
                    <div 
                      className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-sm font-medium"
                      style={{ backgroundColor: 'var(--color-primary)' }}
                    >
                      30% OFF
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">프리미엄 침구 세트</h4>
                    <p className="text-sm text-gray-600 mb-4">부드러운 촉감의 프리미엄 소재</p>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>129,000원</span>
                        <span className="text-sm text-gray-400 line-through ml-2">189,000원</span>
                      </div>
                    </div>
                      <button 
                        className="w-full py-3 rounded-full border-2 font-medium hover:text-white transition-all"
                        style={{ 
                          borderColor: 'var(--color-primary)', 
                          color: 'var(--color-primary)',
                          backgroundColor: 'transparent'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-primary)'}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.color = 'var(--color-primary)';
                        }}
                      >
                        자세히 보기
                      </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 카테고리 - 원형 아이콘 레이아웃 */}
      <section className="py-20" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">카테고리별 쇼핑</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { name: '침구류', desc: '편안한 잠자리', icon: '🛏️' },
              { name: '커튼/블라인드', desc: '공간 연출', icon: '🪟' },
              { name: '홈데코', desc: '따뜻한 분위기', icon: '🏠' }
            ].map((cat, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="text-center">
                  <div 
                    className="w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center text-5xl group-hover:scale-110 transition-all"
                    style={{ backgroundColor: 'var(--color-secondary)' }}
                  >
                    {cat.icon}
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">{cat.name}</h4>
                  <p className="text-gray-600">{cat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-12 text-white" style={{ backgroundColor: 'var(--color-primary)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">코지홈</h4>
              <p className="text-sm opacity-90">포근하고 따뜻한 일상을<br />만들어가는 홈 텍스타일</p>
            </div>
            <div>
              <h5 className="font-semibold mb-3">고객센터</h5>
              <p className="text-sm opacity-90">1588-1234<br />평일 09:00-18:00</p>
            </div>
            <div>
              <h5 className="font-semibold mb-3">쇼핑정보</h5>
              <p className="text-sm opacity-90">배송안내<br />교환/반품</p>
            </div>
            <div>
              <h5 className="font-semibold mb-3">회사정보</h5>
              <p className="text-sm opacity-90">회사소개<br />이용약관</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CozyHome;