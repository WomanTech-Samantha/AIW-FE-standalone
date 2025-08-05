import React from 'react';
import { Link } from 'react-router-dom';

const BeautyShop = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 - 자연스럽고 부드러운 디자인 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-medium flex items-center" style={{ color: 'var(--color-primary)' }}>
              <span className="text-3xl mr-2">🌿</span>
              내추럴뷰티
            </h1>
            
            <nav className="hidden lg:flex space-x-8">
              <Link to="/beauty" className="text-gray-700 hover:text-gray-900">홈</Link>
              <Link to="/beauty/category" className="text-gray-700 hover:text-gray-900">스킨케어</Link>
              <Link to="/beauty/category" className="text-gray-700 hover:text-gray-900">메이크업</Link>
              <Link to="/beauty/category" className="text-gray-700 hover:text-gray-900">헤어/바디</Link>
            </nav>

            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 뷰티 템플릿 특징: 유기적이고 자연스러운 레이아웃 */}
      {/* 히어로 섹션 - 유동적인 모양과 그라데이션 */}
      <section className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20" style={{ backgroundColor: 'var(--color-secondary)' }}></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-20" style={{ backgroundColor: 'var(--color-accent)' }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-5xl font-light mb-6 text-gray-800">
              자연에서 온<br />
              <span style={{ color: 'var(--color-primary)' }}>순수한 아름다움</span>
            </h2>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              피부에 순하고 환경에 친화적인<br />
              천연 화장품으로 건강한 아름다움을 찾아보세요
            </p>
            <button 
              className="px-8 py-4 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all"
              style={{ 
                background: `linear-gradient(135deg, var(--color-primary), var(--color-secondary))`
              }}
            >
              지금 둘러보기
            </button>
          </div>
        </div>
      </section>

      {/* 특별 혜택 - 웨이브 배경 */}
      <section className="relative py-16" style={{ backgroundColor: 'var(--color-background)' }}>
        <svg className="absolute top-0 left-0 w-full h-24" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V60C150,90 350,30 600,60C850,90 1050,30 1200,60V0H0Z" fill="white"></path>
        </svg>
        <div className="relative max-w-4xl mx-auto px-4 text-center pt-12">
          <h3 className="text-3xl font-medium mb-4 flex items-center justify-center" style={{ color: 'var(--color-primary)' }}>
            <span className="text-4xl mr-3">✨</span>
            신규 고객 특가
          </h3>
          <p className="text-xl text-gray-700 mb-8">첫 구매시 전 상품 25% 할인 + 무료 샘플 키트</p>
          <button 
            className="px-10 py-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all font-medium"
            style={{ color: 'var(--color-primary)' }}
          >
            혜택 받기
          </button>
        </div>
      </section>

      {/* 베스트 상품 - 오가닉 카드 디자인 */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-medium text-gray-800 mb-4">Best Natural Products</h3>
            <p className="text-lg text-gray-600">가장 사랑받는 천연 뷰티 제품들</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: '오가닉 비타민C 세럼', desc: '브라이트닝 & 안티에이징', badge: 'ORGANIC' },
              { title: '내추럴 틴트 립밤', desc: '촉촉함 & 자연스러운 컬러', badge: 'VEGAN' },
              { title: '허브 수딩 크림', desc: '진정 & 보습', badge: 'SENSITIVE' }
            ].map((item, idx) => (
              <div key={idx} className="group">
                <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all">
                  <div className="relative">
                    <div className="h-64 bg-gray-200 relative overflow-hidden">
                      <div className="absolute inset-0 opacity-30" style={{ 
                        background: `linear-gradient(135deg, var(--color-secondary), transparent)`
                      }}></div>
                    </div>
                    <div 
                      className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium"
                      style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-text)' }}
                    >
                      {item.badge}
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-lg font-medium text-gray-800 mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-600 mb-4">{item.desc}</p>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-2xl font-semibold" style={{ color: 'var(--color-primary)' }}>89,000원</span>
                        <span className="text-sm text-gray-400 line-through ml-2">119,000원</span>
                      </div>
                    </div>
                    <Link to="/beauty/product">
                      <button 
                        className="w-full py-3 rounded-lg font-medium transition-all"
                        style={{ 
                          backgroundColor: 'var(--color-surface)',
                          border: `2px solid var(--color-primary)`,
                          color: 'var(--color-primary)'
                        }}
                        onMouseEnter={(e) => {
                          (e.target as HTMLElement).style.backgroundColor = 'var(--color-primary)';
                          (e.target as HTMLElement).style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                          (e.target as HTMLElement).style.backgroundColor = 'var(--color-surface)';
                          (e.target as HTMLElement).style.color = 'var(--color-primary)';
                        }}
                      >
                        자세히 보기
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 성분 스토리 - 아이콘 기반 레이아웃 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-medium text-center mb-16 text-gray-800">Natural Ingredients</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: '🌿', title: '자연 추출물', desc: '깨끗한 자연에서 추출한 순수 성분' },
              { icon: '🧪', title: '무독성 포뮬러', desc: '파라벤, 실리콘 무첨가' },
              { icon: '🐰', title: '크루얼티 프리', desc: '동물실험을 하지 않습니다' }
            ].map((feature, idx) => (
              <div key={idx} className="text-center group">
                <div 
                  className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center text-5xl group-hover:scale-110 transition-all"
                  style={{ backgroundColor: 'var(--color-background)' }}
                >
                  {feature.icon}
                </div>
                <h4 className="text-xl font-medium mb-3 text-gray-800">{feature.title}</h4>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 카테고리 - 플로우 레이아웃 */}
      <section className="py-20" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-medium text-center mb-16 text-gray-800">Shop by Category</h3>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { name: '스킨케어', icon: '🧴', count: '45+' },
              { name: '메이크업', icon: '💄', count: '32+' },
              { name: '헤어케어', icon: '🧴', count: '28+' },
              { name: '바디케어', icon: '🧴', count: '22+' }
            ].map((cat, idx) => (
              <Link key={idx} to="/beauty/category">
                <div className="bg-white rounded-2xl p-8 hover:shadow-lg transition-all cursor-pointer text-center">
                  <div className="text-4xl mb-4">{cat.icon}</div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">{cat.name}</h4>
                  <p className="text-sm" style={{ color: 'var(--color-primary)' }}>{cat.count} 제품</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 고객 후기 - 말풍선 스타일 */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-medium text-center mb-16 text-gray-800">Customer Love</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: '김민정', review: '천연 성분이라 피부가 정말 좋아졌어요.', product: '비타민C 세럼' },
              { name: '이수진', review: '촉촉함이 하루종일 지속돼요.', product: '틴트 립밤' },
              { name: '박지영', review: '민감한 피부에도 자극이 없어요.', product: '수딩 크림' }
            ].map((review, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-md relative">
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} style={{ color: 'var(--color-accent)' }}>★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{review.review}"</p>
                <div className="text-sm">
                  <p className="font-medium text-gray-800">{review.name}</p>
                  <p className="text-gray-500">{review.product} 구매</p>
                </div>
                <div className="absolute -bottom-2 left-8 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-white"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-16 text-white" style={{ backgroundColor: 'var(--color-primary)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-2xl font-medium mb-4 flex items-center">
                <span className="text-3xl mr-2">🌿</span>
                내추럴뷰티
              </h4>
              <p className="text-sm opacity-90">자연에서 온 순수한<br />아름다움</p>
            </div>
            <div>
              <h5 className="font-medium mb-3">고객 지원</h5>
              <p className="text-sm opacity-90">1588-9999<br />평일 09:00-18:00</p>
            </div>
            <div>
              <h5 className="font-medium mb-3">서비스</h5>
              <p className="text-sm opacity-90">무료 배송<br />피부 진단</p>
            </div>
            <div>
              <h5 className="font-medium mb-3">브랜드</h5>
              <p className="text-sm opacity-90">브랜드 스토리<br />지속가능성</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BeautyShop;