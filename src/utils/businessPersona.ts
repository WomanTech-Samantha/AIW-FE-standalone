// 업종별 페르소나 정의 및 SNS 콘텐츠 데이터

export type BusinessType = 'bedding' | 'handcraft';

// 페르소나 정의
export const businessPersonas = {
  bedding: {
    name: '침구 전문점',
    description: '프리미엄 침구 및 홈 패브릭 전문 쇼핑몰',
    target: '30-50대 주부, 신혼부부',
    mainProducts: ['이불', '베개', '매트리스', '커튼', '쿠션'],
    style: '편안하고 따뜻한 감성, 고급스러운 분위기',
    keywords: ['숙면', '편안함', '프리미엄', '건강한수면', '홈인테리어'],
  },
  handcraft: {
    name: '수공예 작품샵',
    description: '핸드메이드 액세서리 및 소품 판매',
    target: '20-40대 여성, 선물구매자',
    mainProducts: ['귀걸이', '목걸이', '팔찌', '키링', '파우치'],
    style: '독특하고 개성있는, 감성적이고 예술적인',
    keywords: ['핸드메이드', '유니크', '데일리', '선물추천', '감성소품'],
  }
};

// 캘린더 이벤트 데이터 (8월 26일까지 데모 기준)
export const calendarEventsByType = {
  bedding: [
    {
      id: 1,
      title: "🌙 여름 냉감 이불 신상 출시",
      time: "10:00",
      type: "post" as const,
      platform: "both" as const,
      status: "published" as const,
      content: "열대야에도 시원한 밤을 선물하는 프리미엄 냉감 이불",
      imageUrl: "https://example.com/summer-bedding.jpg",
      date: "2024-08-15"
    },
    {
      id: 2,
      title: "🛏️ 매트리스 관리법 꿀팁",
      time: "14:00",
      type: "story" as const,
      platform: "instagram" as const,
      status: "published" as const,
      content: "매트리스 수명을 늘리는 올바른 관리법",
      imageUrl: "https://example.com/mattress-guide.jpg",
      date: "2024-08-18"
    },
    {
      id: 3,
      title: "💝 신혼부부 침구 세트 특가",
      time: "19:00",
      type: "post" as const,
      platform: "both" as const,
      status: "scheduled" as const,
      content: "새 출발을 위한 프리미엄 침구 풀세트",
      imageUrl: "https://example.com/wedding-set.jpg",
      date: "2024-08-22"
    },
    {
      id: 4,
      title: "🍂 가을맞이 따뜻한 베딩 컬렉션",
      time: "11:00",
      type: "reel" as const,
      platform: "instagram" as const,
      status: "scheduled" as const,
      content: "선선해지는 날씨에 딱 맞는 포근한 침구",
      imageUrl: "https://example.com/autumn-collection.jpg",
      date: "2024-08-25"
    },
    {
      id: 5,
      title: "🏠 침실 인테리어 팁",
      time: "15:00",
      type: "story" as const,
      platform: "instagram" as const,
      status: "draft" as const,
      content: "작은 변화로 만드는 호텔 같은 침실",
      imageUrl: "https://example.com/bedroom-tips.jpg",
      date: "2024-08-27"
    }
  ],
  handcraft: [
    {
      id: 1,
      title: "✨ 여름 한정 쉘 귀걸이 컬렉션",
      time: "11:00",
      type: "post" as const,
      platform: "both" as const,
      status: "published" as const,
      content: "바다의 감성을 담은 여름 한정 귀걸이",
      imageUrl: "https://example.com/shell-earring.jpg",
      date: "2024-08-16"
    },
    {
      id: 2,
      title: "🎨 핸드메이드 제작 과정 공개",
      time: "15:00",
      type: "reel" as const,
      platform: "instagram" as const,
      status: "published" as const,
      content: "정성 가득한 수작업 과정을 공개합니다",
      imageUrl: "https://example.com/making-process.jpg",
      date: "2024-08-19"
    },
    {
      id: 3,
      title: "📿 원석 팔찌 신상 출시",
      time: "18:00",
      type: "post" as const,
      platform: "both" as const,
      status: "scheduled" as const,
      content: "자연의 에너지를 담은 원석 팔찌",
      imageUrl: "https://example.com/gemstone-bracelet.jpg",
      date: "2024-08-23"
    },
    {
      id: 4,
      title: "🍂 가을 감성 액세서리 미리보기",
      time: "13:00",
      type: "story" as const,
      platform: "instagram" as const,
      status: "scheduled" as const,
      content: "따뜻한 가을 톤의 새로운 컬렉션",
      imageUrl: "https://example.com/autumn-accessories.jpg",
      date: "2024-08-26"
    },
    {
      id: 5,
      title: "💌 주문제작 서비스 안내",
      time: "14:00",
      type: "post" as const,
      platform: "both" as const,
      status: "draft" as const,
      content: "당신만을 위한 특별한 맞춤 제작 서비스",
      imageUrl: "https://example.com/custom-service.jpg",
      date: "2024-08-28"
    }
  ]
};

// SNS 콘텐츠 생성 데이터
export const generatedContentByType = {
  bedding: [
    {
      id: 1,
      image: "https://example.com/bedding1.jpg",
      copy: {
        title: "숙면을 위한 프리미엄 구스 이불",
        description: "가볍고 따뜻한 고급 구스다운으로 편안한 잠자리를 선물하세요",
        hashtags: "#프리미엄침구 #구스이불 #숙면 #홈인테리어 #침실인테리어",
        cta: "지금 구매하고 20% 할인받기"
      },
      features: ["항균처리", "알레르기프리", "세탁가능"],
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      image: "https://example.com/bedding2.jpg",
      copy: {
        title: "호텔식 침구로 집에서도 럭셔리하게",
        description: "5성급 호텔에서 사용하는 최고급 면 100% 침구세트",
        hashtags: "#호텔침구 #럭셔리침구 #프리미엄베딩 #신혼침구",
        cta: "무료배송 + 사은품 증정"
      },
      features: ["이집트면100%", "400수", "호텔급품질"],
      createdAt: new Date().toISOString()
    }
  ],
  handcraft: [
    {
      id: 1,
      image: "https://example.com/handcraft1.jpg",
      copy: {
        title: "당신만을 위한 맞춤 이니셜 목걸이",
        description: "특별한 날, 특별한 사람에게 전하는 유니크한 선물",
        hashtags: "#핸드메이드 #이니셜목걸이 #선물추천 #데일리주얼리",
        cta: "주문제작 문의하기"
      },
      features: ["맞춤제작", "925실버", "선물포장"],
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      image: "https://example.com/handcraft2.jpg",
      copy: {
        title: "봄을 닮은 플라워 귀걸이",
        description: "화사한 봄날처럼 당신을 빛나게 해줄 플라워 귀걸이",
        hashtags: "#봄신상 #플라워귀걸이 #핸드메이드액세서리 #데일리룩",
        cta: "신상 10% 할인 중"
      },
      features: ["수작업", "알레르기프리", "한정수량"],
      createdAt: new Date().toISOString()
    }
  ]
};

// 댓글 데이터 (8월 20일 기준)
export const commentsByType = {
  bedding: [
    {
      id: "comment_1",
      text: "냉감 이불 정말 시원해요! 사이즈는 어떻게 되나요? 퀸사이즈도 있을까요?",
      username: "cozy_home_lover",
      timestamp: new Date(2024, 7, 20, 10, 30).toISOString(), // 8월 20일 10:30
      like_count: 12,
      media_id: "media_1",
      media_permalink: "https://instagram.com/p/bedding1",
      media_caption: "🌙 여름 냉감 이불 신상 출시"
    },
    {
      id: "comment_2",
      text: "알레르기가 있는데 사용해도 괜찮을까요? 먼지 날림은 없나요?",
      username: "health_first_mom",
      timestamp: new Date(2024, 7, 20, 14, 15).toISOString(), // 8월 20일 14:15
      like_count: 8,
      media_id: "media_1",
      media_permalink: "https://instagram.com/p/bedding1",
      media_caption: "🌙 여름 냉감 이불 신상 출시"
    },
    {
      id: "comment_3",
      text: "매트리스 관리법 정말 유용해요! 세탁은 집에서 가능한가요? 💭",
      username: "clean_house_daily",
      timestamp: new Date(2024, 7, 19, 16, 45).toISOString(), // 8월 19일 16:45
      like_count: 15,
      media_id: "media_2",
      media_permalink: "https://instagram.com/p/bedding2",
      media_caption: "🛏️ 매트리스 관리법 꿀팁"
    },
    {
      id: "comment_4",
      text: "색상이 정말 고급스러워요! 베이지색도 있나요? 가격 DM 부탁드려요 🙏",
      username: "interior_design_kr",
      timestamp: new Date(2024, 7, 20, 11, 20).toISOString(), // 8월 20일 11:20
      like_count: 20,
      media_id: "media_1",
      media_permalink: "https://instagram.com/p/bedding1",
      media_caption: "🌙 여름 냉감 이불 신상 출시"
    },
    {
      id: "comment_5",
      text: "신혼부부 세트 언제 출시되나요? 미리 예약하고 싶어요!",
      username: "newlywed_2024",
      timestamp: new Date(2024, 7, 20, 18, 30).toISOString(), // 8월 20일 18:30
      like_count: 5,
      media_id: "media_3",
      media_permalink: "https://instagram.com/p/bedding3",
      media_caption: "💝 신혼부부 침구 세트 특가 (예약)"
    }
  ],
  handcraft: [
    {
      id: "comment_1",
      text: "쉘 귀걸이 너무 예뻐요!! 알레르기 있는데 착용 가능할까요? 😍",
      username: "jewelry_collector",
      timestamp: new Date(2024, 7, 20, 12, 15).toISOString(), // 8월 20일 12:15
      like_count: 25,
      media_id: "media_1",
      media_permalink: "https://instagram.com/p/handcraft1",
      media_caption: "✨ 여름 한정 쉘 귀걸이 컬렉션"
    },
    {
      id: "comment_2",
      text: "제작 과정 영상 너무 힐링이에요! 선물용 포장도 해주시나요? 💝",
      username: "gift_for_friend",
      timestamp: new Date(2024, 7, 19, 20, 30).toISOString(), // 8월 19일 20:30
      like_count: 18,
      media_id: "media_2",
      media_permalink: "https://instagram.com/p/handcraft2",
      media_caption: "🎨 핸드메이드 제작 과정 공개"
    },
    {
      id: "comment_3",
      text: "원석 팔찌 언제 출시되나요? 이니셜 각인도 가능한가요?",
      username: "custom_lover_22",
      timestamp: new Date(2024, 7, 20, 15, 45).toISOString(), // 8월 20일 15:45
      like_count: 10,
      media_id: "media_3",
      media_permalink: "https://instagram.com/p/handcraft3",
      media_caption: "📿 원석 팔찌 신상 출시 (예약)"
    },
    {
      id: "comment_4",
      text: "작가님 작품 정말 유니크하고 예뻐요! 오프라인 매장도 있나요? 🥰",
      username: "handmade_fan",
      timestamp: new Date(2024, 7, 20, 9, 30).toISOString(), // 8월 20일 9:30
      like_count: 30,
      media_id: "media_1",
      media_permalink: "https://instagram.com/p/handcraft1",
      media_caption: "✨ 여름 한정 쉘 귀걸이 컬렉션"
    },
    {
      id: "comment_5",
      text: "가을 감성 액세서리 기대돼요! 사이즈 조절 가능한가요?",
      username: "autumn_lover",
      timestamp: new Date(2024, 7, 20, 16, 20).toISOString(), // 8월 20일 16:20
      like_count: 7,
      media_id: "media_4",
      media_permalink: "https://instagram.com/p/handcraft4",
      media_caption: "🍂 가을 감성 액세서리 미리보기 (예약)"
    }
  ]
};

// 현재 업종 가져오기 (localStorage에서)
export function getCurrentBusinessType(): BusinessType {
  const stored = localStorage.getItem('business_type');
  return (stored as BusinessType) || 'bedding';
}

// 업종 설정하기
export function setBusinessType(type: BusinessType) {
  localStorage.setItem('business_type', type);
}