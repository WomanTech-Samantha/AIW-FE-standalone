import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BeautyShop = () => {
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

  const storeName = storeData?.storeName || '내추럴코스뷰';
  const brandName = brandData?.brandName || '내추럴코스뷰';
  const slogan = brandData?.slogan || 'Natural Beauty';
  const description = storeData?.description || '자연에서 온 순수한 아름다움';
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 - 자연스럽고 부드러운 디자인 */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-medium flex items-center" style={{ color: 'var(--color-primary)' }}>
              <span className="text-3xl mr-2">🌿</span>
              <span className="hidden sm:block">{storeName}</span>
              <span className="sm:hidden">{storeName.length > 6 ? storeName.slice(0, 6) : storeName}</span>
            </h1>
            
            <nav className="hidden lg:flex space-x-8">
              <Link to={`/?store=${storeParam}`} className="text-gray-700 hover:text-gray-900 font-medium">홈</Link>
              <Link to={`/category/skincare?store=${storeParam}`} className="text-gray-700 hover:text-gray-900 font-medium">스킨케어</Link>
              <Link to={`/category/makeup?store=${storeParam}`} className="text-gray-700 hover:text-gray-900 font-medium">메이크업</Link>
              <Link to={`/category/fragrance?store=${storeParam}`} className="text-gray-700 hover:text-gray-900 font-medium">향수</Link>
              <Link to={`/category/sale?store=${storeParam}`} className="text-gray-700 hover:text-gray-900 font-medium">세일</Link>
            </nav>

            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg relative transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">2</span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg relative transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">1</span>
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
        <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full overflow-hidden shadow-2xl opacity-90" style={{ backgroundColor: 'var(--color-secondary)' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-orange-100 flex items-center justify-center">
            <svg className="w-24 h-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        
        <div className="container relative py-responsive">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left relative z-10">
              <h2 className="heading-xl-responsive font-light mb-6 text-gray-800 leading-tight">
                자연에서 온<br />
                <span style={{ color: 'var(--color-primary)' }}>순수한 아름다움</span>
              </h2>
              <p className="text-responsive text-gray-600 mb-10 leading-relaxed">
                피부에 순하고 환경에 친화적인<br />
                천연 화장품으로 건강한 아름다움을 찾아보세요
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="btn btn-primary px-8 py-4 text-white font-medium rounded-lg shadow-lg hover:shadow-xl">
                  바로 상품 둘러보기
                </button>
                <button className="btn btn-secondary px-8 py-4 font-medium rounded-lg">
                  브랜드 알아보기
                </button>
              </div>
            </div>
            <div className="relative">
              {/* 이 공간은 이미지 원과 겹치는 영역 */}
            </div>
          </div>
        </div>
      </section>

      {/* 특별 혜택 - 웨이브 배경 */}
      <section className="relative py-16" style={{ backgroundColor: 'var(--color-background)' }}>
        <svg className="absolute top-0 left-0 w-full h-24" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V60C150,90 350,30 600,60C850,90 1050,30 1200,60V0H0Z" fill="white"></path>
        </svg>
        <div className="container relative text-center pt-32">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <h3 className="heading-responsive font-medium mb-6" style={{ color: 'var(--color-primary)' }}>
                <br></br>
                신규 고객님께 드리는 선물
                <span className="text-4xl ml-3">✨</span>
              </h3>
              <p className="text-responsive text-gray-700 mb-8">첫 구매시, 전 상품 25% 할인 + 무료 샘플 키트까지 증정</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn btn-primary px-10 py-4 text-white rounded-lg shadow-lg hover:shadow-xl font-medium">
                  지금 혜택 받으러 가기
                </button>
                <button className="btn btn-secondary px-8 py-4 bg-white rounded-lg shadow-md hover:shadow-lg font-medium">
                  상품 구경하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 베스트 상품 - 오가닉 카드 디자인 */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h3 className="heading-responsive font-medium text-gray-800 mb-4">Best Products</h3>
            <p className="text-responsive text-gray-600">가장 사랑받는 제품들</p>
          </div>
          
          <div className="responsive-grid responsive-grid-3 gap-8">
            {[
              { title: '오가닉 비타민C 세럼', desc: '브라이트닝 & 안티에이징', badge: 'ORGANIC', price: '89,000', originalPrice: '119,000' },
              { title: '내추럴 틴트 립밤', desc: '촉촉함 & 자연스러운 컬러', badge: 'VEGAN', price: '45,000', originalPrice: '65,000' },
              { title: '허브 수딩 크림', desc: '진정 & 보습', badge: 'SENSITIVE', price: '62,000', originalPrice: '89,000' }
            ].map((item, idx) => (
              <div key={idx} className="group">
                <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all">
                  <div className="relative">
                    <div className="h-64 bg-gray-200 relative overflow-hidden flex items-center justify-center">
                      <svg className="w-16 h-16 text-gray-300 absolute" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
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
                        <span className="text-2xl font-semibold" style={{ color: 'var(--color-primary)' }}>{item.price}원</span>
                        <span className="text-sm text-gray-400 line-through ml-2">{item.originalPrice}원</span>
                      </div>
                      <div className="flex items-center space-x-1 text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="text-sm text-gray-500 ml-1">(4.9)</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link to={`/product/1?store=${storeParam}`} className="flex-1">
                        <button className="btn btn-primary w-full py-3 rounded-lg font-medium">
                          장바구니
                        </button>
                      </Link>
                      <button className="flex-1 btn btn-secondary py-3 rounded-lg font-medium">
                        바로구매
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 성분 스토리 - 아이콘 기반 레이아웃 */}
      <section className="py-20 bg-white">
        <div className="container">
          <h3 className="heading-responsive font-medium text-center mb-16 text-gray-800">천연 화장품에 대한 우리 브랜드의 자세</h3>
          <div className="responsive-grid responsive-grid-3 gap-12">
            {[
              { icon: '🌿', title: 'Natural Ingredients', desc: '깨끗한 자연에서 추출한 순수 성분으로만' },
              { icon: '🧪', title: 'Non-Toxic Formula', desc: '파라벤, 실리콘 무첨가' },
              { icon: '🐰', title: 'Cruelty-Free', desc: '동물실험을 하지 않습니다' }
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


      {/* 고객 후기 - 말풍선 스타일 */}
      <section className="py-20">
        <div className="container">
          <h3 className="heading-responsive font-medium text-center mb-16 text-gray-800">고객님들의 성원에 보답하는 마음으로 만듭니다</h3>
          <div className="responsive-grid responsive-grid-3 gap-8">
            {[
              { name: '김민정', review: '천연 성분이라 피부가 정말 좋아졌어요.', product: '비타민C-아마노이드 세럼' },
              { name: '이수진', review: '촉촉함이 하루종일 지속돼요.', product: '허니팟 틴트 립밤' },
              { name: '박지영', review: '민감한 피부에도 자극이 없어요.', product: '알로에 수딩 크림' }
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
      <footer className="py-responsive text-white" style={{ backgroundColor: 'var(--color-primary)' }}>
        <div className="container">
          <div className="responsive-grid responsive-grid-4 gap-8 mb-8">
            <div>
              <h4 className="text-2xl font-medium mb-4 flex items-center">
                <span className="text-3xl mr-2">🌿</span>
                <span className="hidden sm:block">내추럴코스뷰</span>
                <span className="sm:hidden">코스뷰</span>
              </h4>
              <p className="text-sm opacity-90 mb-4">자연에서 온 순수한<br />아름다움</p>
              <div className="flex space-x-4">
                <a href="#" className="text-white hover:opacity-80 transition-opacity">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
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
              <h5 className="font-medium mb-3">고객 지원</h5>
              <ul className="text-sm opacity-90 space-y-1">
                <li>📞 1588-9999</li>
                <li>⏰ 평일 09:00-18:00</li>
                <li>💬 카카오톡 상담</li>
                <li><a href="#" className="hover:underline">자주 묻는 질문</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-3">서비스</h5>
              <ul className="text-sm opacity-90 space-y-1">
                <li><a href="#" className="hover:underline">무료 배송</a></li>
                <li><a href="#" className="hover:underline">피부 진단</a></li>
                <li><a href="#" className="hover:underline">교환/반품</a></li>
                <li><a href="#" className="hover:underline">리뷰 포인트</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-3">브랜드</h5>
              <ul className="text-sm opacity-90 space-y-1">
                <li><a href="#" className="hover:underline">브랜드 스토리</a></li>
                <li><a href="#" className="hover:underline">지속가능성</a></li>
                <li><a href="#" className="hover:underline">인증서</a></li>
                <li><a href="#" className="hover:underline">채용정보</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white border-opacity-20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm opacity-80">
              <p>© 2025 내추럴뷰티. All rights reserved.</p>
              <p className="mt-2 md:mt-0">Certified Organic & Cruelty-Free 🌿</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BeautyShop;