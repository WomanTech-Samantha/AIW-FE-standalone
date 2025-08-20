import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ImageIcon,
  Hash,
  Video,
  Clock,
  ArrowLeft,
  Plus,
  Edit,
  Package,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Trash2,
  Download,
  Upload,
  Loader2,
  Sparkles,
  PenTool,
  Send,
  Check
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// Mock data
import { mockProducts } from "@/services/mockData";

// 업종별 목데이터 생성 함수
const getBusinessMockProducts = () => {
  try {
    const demoUserData = JSON.parse(localStorage.getItem('demo_user_data') || '{}');
    const userBusiness = demoUserData.business || "수공예";
    
    if (userBusiness.includes("침구")) {
      return [
        {
          id: 'bedding-1',
          name: '모달 이불커버 세트',
          description: '고급스러운 모달 원단으로 제작된 이불커버 세트',
          price: 125000,
          category: 'bedding',
          images: ['https://thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/rs_quotation_api/rguwzf38/f670f405baf44da5a4ee3203177dedcb.jpg'],
          thumbnailUrl: 'https://thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/rs_quotation_api/rguwzf38/f670f405baf44da5a4ee3203177dedcb.jpg',
          stock: 30,
          featured: true,
          createdAt: '2024-01-05T00:00:00Z'
        },
        {
          id: 'bedding-2', 
          name: '차렵이불 세트',
          description: '전통적인 한국식 차렵이불 세트',
          price: 85000,
          category: 'bedding',
          images: ['https://image.hanssem.com/hsimg/gds/1050/1099/1099323_A1.jpg?v=20250626154653'],
          thumbnailUrl: 'https://image.hanssem.com/hsimg/gds/1050/1099/1099323_A1.jpg?v=20250626154653',
          stock: 45,
          featured: false,
          createdAt: '2024-01-06T00:00:00Z'
        },
        {
          id: 'bedding-3',
          name: '오가닉 코튼 베개커버',
          description: '100% 오가닉 코튼으로 만든 베개커버',
          price: 32000,
          category: 'bedding',
          images: ['https://thumbnail9.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/511847068563899-43ef49cb-7d24-4308-be5f-06fbbad6e0c9.jpg'],
          thumbnailUrl: 'https://thumbnail9.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/511847068563899-43ef49cb-7d24-4308-be5f-06fbbad6e0c9.jpg',
          stock: 80,
          featured: true,
          createdAt: '2024-01-07T00:00:00Z'
        }
      ];
    } else {
      // 수공예 업종
      return [
        {
          id: 'craft-1',
          name: '니팅 스카프',
          description: '따뜻한 손뜨개 울 스카프',
          price: 42000,
          category: 'craft',
          images: ['https://img.29cm.co.kr/item/202502/11efe476c8f297198521d39ce3235e75.jpg?width=700&format=webp'],
          thumbnailUrl: 'https://img.29cm.co.kr/item/202502/11efe476c8f297198521d39ce3235e75.jpg?width=700&format=webp',
          stock: 25,
          featured: true,
          createdAt: '2024-01-05T00:00:00Z'
        },
        {
          id: 'craft-2',
          name: '자수 파우치',
          description: '손자수로 장식된 감성 파우치',
          price: 18000,
          category: 'craft',
          images: ['https://image.artbox.co.kr/upload/C00001/goods/800_800/215/241212006231215.jpg?s=/goods/org/215/241212006231215.jpg'],
          thumbnailUrl: 'https://image.artbox.co.kr/upload/C00001/goods/800_800/215/241212006231215.jpg?s=/goods/org/215/241212006231215.jpg',
          stock: 60,
          featured: false,
          createdAt: '2024-01-06T00:00:00Z'
        },
        {
          id: 'craft-3',
          name: '비즈 액세서리',
          description: '수제 비즈로 만든 감성 액세서리',
          price: 24000,
          category: 'craft',
          images: ['https://cafe24.poxo.com/ec01/ckals34/UVTjSep0dwP4/wX7AtHyXKnHA9kyKo3xcZFma76xOcayiiZOLDJr4l1B6euOkIJTMDhkxEFrGHo32fLjj4w9lQ==/_/web/product/big/202310/6af0b0845cfd794ffdb62990c24f60b9.jpg'],
          thumbnailUrl: 'https://cafe24.poxo.com/ec01/ckals34/UVTjSep0dwP4/wX7AtHyXKnHA9kyKo3xcZFma76xOcayiiZOLDJr4l1B6euOkIJTMDhkxEFrGHo32fLjj4w9lQ==/_/web/product/big/202310/6af0b0845cfd794ffdb62990c24f60b9.jpg',
          stock: 40,
          featured: true,
          createdAt: '2024-01-07T00:00:00Z'
        }
      ];
    }
  } catch (error) {
    console.error('Error getting business mock products:', error);
    return mockProducts; // 기본값
  }
};

const AssetStudioPage = () => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  // 상품 상세 이미지 생성 상태
  const [detailImageGenerating, setDetailImageGenerating] = useState(false);
  const [generatedDetailImage, setGeneratedDetailImage] = useState<string | null>(null);
  const [generatedImageModalOpen, setGeneratedImageModalOpen] = useState(false);

  // 인스타 피드 이미지 생성 상태
  const [feedImageGenerating, setFeedImageGenerating] = useState(false);
  const [generatedFeedImage, setGeneratedFeedImage] = useState<string | null>(null);
  const [feedImageModalOpen, setFeedImageModalOpen] = useState(false);
  
  // 피드 캡션 생성 상태
  const [feedCaptionGenerating, setFeedCaptionGenerating] = useState(false);
  const [generatedCaption, setGeneratedCaption] = useState<string | null>(null);
  const [feedStep, setFeedStep] = useState<'image' | 'caption' | 'complete'>('image');
  
  // 백그라운드 생성 추적 상태
  const [backgroundDetailGeneration, setBackgroundDetailGeneration] = useState<{
    isGenerating: boolean;
    productId: string | null;
    startTime: number | null;
    expectedDuration: number | null;
  }>({ isGenerating: false, productId: null, startTime: null, expectedDuration: null });
  
  const [backgroundFeedGeneration, setBackgroundFeedGeneration] = useState<{
    isGenerating: boolean;
    productId: string | null;
    startTime: number | null;
    expectedDuration: number | null;
    captionGenerating: boolean;
  }>({ isGenerating: false, productId: null, startTime: null, expectedDuration: null, captionGenerating: false });

  // 삭제 모달 상태
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<any>(null);
  const [deleting, setDeleting] = useState(false);

  // 팁 상태
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  // 마케팅 팁 목록
  const marketingTips = [
    "💡 상품 상세 이미지는 구매 전환율을 최대 30% 높일 수 있어요!",
    "🎨 깔끔한 디자인의 상품 이미지는 브랜드 신뢰도를 높여줍니다.",
    "📸 모바일 최적화된 이미지는 필수! 70% 이상이 모바일로 쇼핑해요.",
    "✨ 상품의 특징을 시각적으로 표현하면 기억에 더 오래 남아요.",
    "🎯 첫 3초가 중요해요! 고객의 시선을 사로잡는 이미지를 만들어요.",
    "💝 감성적인 이미지는 구매 욕구를 자극합니다.",
    "📱 SNS 공유가 쉬운 이미지는 자연스러운 홍보 효과를 가져와요.",
    "🏆 경쟁사와 차별화된 이미지로 고객의 선택을 받으세요."
  ];

  // 상품 목록 조회 (Mock)
  const fetchProducts = async (page = 1) => {
    try {
      setLoading(true);

      // Mock API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 500));

      // localStorage에서 사용자가 추가한 상품들 가져오기
      const savedProducts = JSON.parse(localStorage.getItem('demo_products') || '[]');

      // 업종별 Mock 상품들과 사용자 추가 상품들 합치기
      const businessMockProducts = getBusinessMockProducts();
      const allProducts = [...businessMockProducts, ...savedProducts].map((p, index) => ({
        ...p,
        id: p.id || `product-${index}`,
        thumbnailUrl: p.images?.[0] || p.thumbnailUrl || '/placeholder.svg',
        price: p.price || 0
      }));

      // 페이징 처리
      const itemsPerPage = 4;
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedProducts = allProducts.slice(startIndex, endIndex);

      setProducts(paginatedProducts);
      setTotalPages(Math.ceil(allProducts.length / itemsPerPage) || 1);

      console.log('Mock 상품 목록 조회 성공:', paginatedProducts);
    } catch (error) {
      console.error('상품 목록 조회 실패:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 상품 목록 조회
  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  // 팁 순환 효과
  useEffect(() => {
    if (detailImageGenerating || feedImageGenerating || feedCaptionGenerating) {
      const interval = setInterval(() => {
        setCurrentTipIndex((prev) => (prev + 1) % marketingTips.length);
      }, 3000); // 3초마다 팁 변경

      return () => clearInterval(interval);
    }
  }, [detailImageGenerating, feedImageGenerating, feedCaptionGenerating, marketingTips.length]);

  // 백그라운드 생성 상태 확인
  useEffect(() => {
    const checkBackgroundGeneration = () => {
      // 상세 이미지 백그라운드 생성 확인
      if (backgroundDetailGeneration.isGenerating && backgroundDetailGeneration.startTime && backgroundDetailGeneration.expectedDuration) {
        const elapsed = Date.now() - backgroundDetailGeneration.startTime;
        
        if (elapsed >= backgroundDetailGeneration.expectedDuration) {
          // 생성 완료
          setGeneratedDetailImage('/placeholder.svg');
          setDetailImageGenerating(false);
          setBackgroundDetailGeneration({ isGenerating: false, productId: null, startTime: null, expectedDuration: null });
        }
      }

      // 피드 이미지 백그라운드 생성 확인
      if (backgroundFeedGeneration.isGenerating && backgroundFeedGeneration.startTime && backgroundFeedGeneration.expectedDuration && !backgroundFeedGeneration.captionGenerating) {
        const elapsed = Date.now() - backgroundFeedGeneration.startTime;
        
        if (elapsed >= backgroundFeedGeneration.expectedDuration) {
          // 이미지 생성 완료
          setGeneratedFeedImage('/placeholder.svg');
          setFeedImageGenerating(false);
          setFeedStep('image');
          setBackgroundFeedGeneration(prev => ({ ...prev, isGenerating: false }));
        }
      }
    };

    const interval = setInterval(checkBackgroundGeneration, 1000); // 1초마다 확인
    return () => clearInterval(interval);
  }, [backgroundDetailGeneration, backgroundFeedGeneration]);

  const currentProducts = products;

  // 캡션에서 해시태그와 멘션을 파란색으로 렌더링하는 함수
  const formatCaption = (text: string) => {
    if (!text) return text;
    
    const parts = text.split(/(\s+)/);
    return parts.map((part, index) => {
      if (part.startsWith('#') || part.startsWith('@')) {
        return (
          <span key={index} className="text-blue-600 font-medium">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : totalPages));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : 1));
  };

  // 콘텐츠 생성 핸들러 (Mock)
  const handleContentGeneration = async (contentType: string) => {
    if (!selectedProduct) {
      alert('상품을 먼저 선택해주세요.');
      return;
    }

    const selectedProductData = currentProducts.find(p => p.id === selectedProduct);
    if (!selectedProductData) {
      alert('선택된 상품 정보를 찾을 수 없습니다.');
      return;
    }

    if (contentType === 'detail') {
      // 백그라운드에서 생성 중이거나 완료된 상태 확인
      if (backgroundDetailGeneration.isGenerating && backgroundDetailGeneration.productId === selectedProduct) {
        // 백그라운드에서 진행 중인 생성이 있음
        setGeneratedImageModalOpen(true);
        setDetailImageGenerating(true);
        
        // 진행 상황 확인
        const elapsed = Date.now() - (backgroundDetailGeneration.startTime || 0);
        const expectedDuration = backgroundDetailGeneration.expectedDuration || 37500;
        
        if (elapsed >= expectedDuration) {
          // 이미 완료되었어야 할 시간
          setGeneratedDetailImage('/placeholder.svg');
          setDetailImageGenerating(false);
          setBackgroundDetailGeneration({ isGenerating: false, productId: null, startTime: null, expectedDuration: null });
        }
      } else if (generatedDetailImage) {
        // 이미 생성 완료된 상태
        setGeneratedImageModalOpen(true);
        setDetailImageGenerating(false);
      } else {
        // 새로운 생성 시작
        await handleDetailImageGeneration(selectedProductData);
      }
    } else if (contentType === 'feed') {
      // 백그라운드에서 생성 중이거나 완료된 상태 확인
      if (backgroundFeedGeneration.isGenerating && backgroundFeedGeneration.productId === selectedProduct) {
        // 백그라운드에서 진행 중인 생성이 있음
        setFeedImageModalOpen(true);
        setFeedImageGenerating(!generatedFeedImage);
        
        // 진행 상황 확인
        const elapsed = Date.now() - (backgroundFeedGeneration.startTime || 0);
        const expectedDuration = backgroundFeedGeneration.expectedDuration || 37500;
        
        if (elapsed >= expectedDuration && !generatedFeedImage) {
          // 이미 완료되었어야 할 시간
          setGeneratedFeedImage('/placeholder.svg');
          setFeedImageGenerating(false);
          setFeedStep('image'); // 이미지만 완료된 상태로 설정
          setBackgroundFeedGeneration({ isGenerating: false, productId: null, startTime: null, expectedDuration: null, captionGenerating: false });
        }
      } else if (generatedFeedImage) {
        // 이미 생성 완료된 상태
        setFeedImageModalOpen(true);
        setFeedImageGenerating(false);
        // 캡션이 생성되지 않았다면 이미지 단계로 설정
        if (!generatedCaption) {
          setFeedStep('image');
        }
      } else {
        // 새로운 생성 시작
        await handleFeedImageGeneration(selectedProductData);
      }
    } else {
      // 다른 콘텐츠 타입들은 간단한 알림으로 처리
      alert(`${contentType} 콘텐츠 생성이 완료되었습니다! (데모)`);
    }
  };

  // 상품 상세 이미지 생성 (Mock)
  const handleDetailImageGeneration = async (productData: any) => {
    setDetailImageGenerating(true);
    setGeneratedImageModalOpen(true); // 모달 바로 열기
    setCurrentTipIndex(0); // 팁 초기화
    setGeneratedDetailImage(null); // 이전 이미지 초기화

    try {
      console.log('Mock 상품 상세 이미지 생성 시작:', productData);

      // Mock 이미지 생성 시뮬레이션 (30-45초 사이 랜덤)
      const delay = Math.floor(Math.random() * 15000) + 30000; // 30-45초
      
      // 백그라운드 생성 상태 초기화 - 실제 지연 시간으로 설정
      setBackgroundDetailGeneration({
        isGenerating: true,
        productId: productData.id,
        startTime: Date.now(),
        expectedDuration: delay
      });

      await new Promise(resolve => setTimeout(resolve, delay));

      // 백그라운드에서 진행 중이 아닌 경우에만 완료 처리
      if (backgroundDetailGeneration.isGenerating && backgroundDetailGeneration.productId === productData.id) {
        setGeneratedDetailImage('/placeholder.svg');
        setDetailImageGenerating(false);
        setBackgroundDetailGeneration({ isGenerating: false, productId: null, startTime: null, expectedDuration: null });
        console.log('Mock 상품 상세 이미지 생성 완료');
      }

    } catch (error) {
      console.error('상품 상세 이미지 생성 실패:', error);
      alert('상품 상세 이미지 생성 중 오류가 발생했습니다.');
      setDetailImageGenerating(false);
      setBackgroundDetailGeneration({ isGenerating: false, productId: null, startTime: null, expectedDuration: null });
    }
  };

  // 인스타 피드 이미지 생성 (Mock)
  const handleFeedImageGeneration = async (productData: any) => {
    setFeedImageGenerating(true);
    setFeedImageModalOpen(true); // 모달 바로 열기
    setCurrentTipIndex(0); // 팁 초기화
    setGeneratedFeedImage(null); // 이전 이미지 초기화
    setGeneratedCaption(null); // 이전 캡션 초기화
    setFeedStep('image'); // 이미지 단계로 시작

    try {
      console.log('Mock 인스타 피드 이미지 생성 시작:', productData);

      // Mock 이미지 생성 시뮬레이션 (30-45초 사이 랜덤)
      const delay = Math.floor(Math.random() * 15000) + 30000; // 30-45초
      
      // 백그라운드 생성 상태 초기화 - 실제 지연 시간으로 설정
      setBackgroundFeedGeneration({
        isGenerating: true,
        productId: productData.id,
        startTime: Date.now(),
        expectedDuration: delay,
        captionGenerating: false
      });

      await new Promise(resolve => setTimeout(resolve, delay));

      // 백그라운드에서 진행 중이 아닌 경우에만 완료 처리
      if (backgroundFeedGeneration.isGenerating && backgroundFeedGeneration.productId === productData.id) {
        setGeneratedFeedImage('/placeholder.svg');
        setFeedImageGenerating(false);
        setFeedStep('image'); // 이미지만 완료된 상태로 설정
        setBackgroundFeedGeneration(prev => ({ ...prev, isGenerating: false }));
        console.log('Mock 인스타 피드 이미지 생성 완료');
      }

    } catch (error) {
      console.error('인스타 피드 이미지 생성 실패:', error);
      alert('인스타 피드 이미지 생성 중 오류가 발생했습니다.');
      setFeedImageGenerating(false);
      setBackgroundFeedGeneration({ isGenerating: false, productId: null, startTime: null, expectedDuration: null, captionGenerating: false });
    }
  };

  // 상품 상세 이미지 다운로드 함수 (Mock)
  const handleDownloadImage = async () => {
    if (!generatedDetailImage) return;

    try {
      // Mock 다운로드 시뮬레이션
      console.log('Mock 상품 상세 이미지 다운로드:', generatedDetailImage);
      alert('상품 상세 이미지가 다운로드되었습니다! (데모)');
    } catch (error) {
      console.error('다운로드 실패:', error);
      alert('이미지 다운로드에 실패했습니다.');
    }
  };

  // 인스타 피드 이미지 다운로드 함수 (Mock)
  const handleDownloadFeedImage = async () => {
    if (!generatedFeedImage) return;

    try {
      // Mock 다운로드 시뮬레이션
      console.log('Mock 인스타 피드 이미지 다운로드:', generatedFeedImage);
      alert('인스타 피드 이미지가 다운로드되었습니다! (데모)');
    } catch (error) {
      console.error('다운로드 실패:', error);
      alert('이미지 다운로드에 실패했습니다.');
    }
  };

  // 상품 상세 이미지 쇼핑몰 업로드 함수 (Mock)
  const handleUploadToStore = async () => {
    // Mock 업로드 시뮬레이션
    console.log('Mock 상품 상세 이미지 쇼핑몰 업로드');
    alert('상품 상세 이미지가 쇼핑몰에 업로드되었습니다! (데모)');
  };

  // 인스타 피드 캡션 생성 함수 (Mock)
  const handleGenerateCaption = async () => {
    setFeedCaptionGenerating(true);
    setFeedStep('caption');
    setCurrentTipIndex(0); // 팁 초기화
    setGeneratedCaption(""); // 캡션 초기화

    try {
      console.log('Mock 인스타 피드 캡션 생성 시작');

      // Mock 캡션 생성 시뮬레이션 (15-20초 사이 랜덤)
      const delay = Math.floor(Math.random() * 5000) + 15000; // 15-20초
      await new Promise(resolve => setTimeout(resolve, delay));

      // Mock 생성된 캡션 - 차분하고 자연스러운 톤
      const mockCaptions = [
        "마음을 담아 한 땀 한 땀 만든 패치워크 하트 코스터입니다.\n서로 다른 원단들이 만나 하나의 아름다운 작품이 되었어요.\n\n일상 속 작은 여유를 선사하는 특별한 아이템이에요.\n따뜻한 차 한 잔과 함께 소중한 시간을 만들어보세요.\n\n정성스럽게 마무리된 스티치가 오래도록 변하지 않는 품질을 보장합니다.\n선물용으로도 정말 좋은 선택이 될 것 같아요.\n\n하나하나 수작업으로 만들어지는 특별함을 느껴보세요.\n\n#패치워크 #하트코스터 #수공예 #핸드메이드 #일상소품 #홈카페 #선물추천 #정성스런손길 #따뜻한감성 #소중한시간 #수작업 #빈티지감성",
        
        "포근하고 따뜻한 밤을 위한 특별한 이불을 소개합니다.\n천연 소재로만 선별하여 만든 프리미엄 침구예요.\n\n부드러운 촉감과 적당한 무게감이 깊은 잠을 도와줍니다.\n계절에 관계없이 쾌적한 온도를 유지해주는 것이 특징이에요.\n\n꼼꼼한 퀼팅 작업으로 오랜 시간 사용해도 형태가 변하지 않아요.\n가족 모두가 안심하고 사용할 수 있는 건강한 소재입니다.\n\n매일 밤이 더욱 소중해질 것 같은 특별한 이불이에요.\n\n#천연이불 #프리미엄침구 #포근함 #깊은잠 #건강한잠자리 #퀼팅 #가족용 #침실인테리어 #안심소재 #편안한밤 #품질보장 #따뜻한집",
        
        "소중한 사람을 위한 마음을 담은 자수 파우치입니다.\n하나씩 정성스럽게 놓인 자수가 특별한 의미를 전해드려요.\n\n작지만 실용적인 크기로 언제 어디서나 유용하게 사용하실 수 있어요.\n화장품부터 작은 소품까지 깔끔하게 정리할 수 있습니다.\n\n전통 자수 기법으로 완성된 아름다운 패턴이 시선을 사로잡아요.\n오래 사용할수록 더욱 애착이 가는 특별한 아이템입니다.\n\n소중한 분께 마음을 전하는 의미 있는 선물이 될 거예요.\n\n#자수파우치 #핸드메이드 #전통자수 #소품정리 #실용적선물 #정성스런손길 #의미있는선물 #전통기법 #아름다운패턴 #감성소품 #수공예품 #특별한마음",
        
        "자연스러운 비즈의 아름다움을 담은 감성 액세서리예요.\n하나하나 선별한 비즈로 완성한 세상에 하나뿐인 작품입니다.\n\n은은한 광택과 부드러운 색감이 어떤 스타일에도 잘 어울려요.\n일상 속에서도 특별함을 연출할 수 있는 포인트 아이템이에요.\n\n섬세한 손끝의 감각으로 완성된 정교한 마무리가 돋보입니다.\n착용할 때마다 기분 좋은 하루를 만들어줄 것 같아요.\n\n나만의 개성을 표현할 수 있는 유니크한 액세서리입니다.\n\n#비즈액세서리 #감성액세서리 #핸드메이드쥬얼리 #유니크디자인 #개성표현 #일상포인트 #은은한광택 #섬세한마무리 #특별한하루 #나만의스타일 #수제액세서리 #감성소품",
        
        "마음을 담아 뜨개질한 따뜻한 울 스카프입니다.\n부드러운 천연 울 실로 정성스럽게 완성한 겨울 필수템이에요.\n\n목과 어깨를 포근하게 감싸주는 적당한 길이와 두께예요.\n추운 바람으로부터 소중한 분을 지켜줄 든든한 동반자입니다.\n\n클래식한 패턴으로 오래도록 사랑받을 수 있는 디자인이에요.\n세월이 지나도 변하지 않는 따뜻함을 선사해드릴게요.\n\n겨울이 기다려지는 특별한 스카프로 함께해보세요.\n\n#울스카프 #뜨개질 #겨울필수템 #포근함 #천연울실 #따뜻함 #클래식디자인 #정성스런손길 #겨울패션 #목도리 #핸드니팅 #오래도록사랑"
      ];
      
      const randomCaption = mockCaptions[Math.floor(Math.random() * mockCaptions.length)];
      setGeneratedCaption(randomCaption);
      setFeedCaptionGenerating(false);
      setFeedStep('complete');
      console.log('Mock 인스타 피드 캡션 생성 완료');

    } catch (error) {
      console.error('인스타 피드 캡션 생성 실패:', error);
      alert('인스타 피드 캡션 생성 중 오류가 발생했습니다.');
      setFeedCaptionGenerating(false);
      setFeedStep('image');
    }
  };

  // 인스타 피드 이미지 인스타그램 업로드 함수 (Mock)
  const handleUploadToInstagram = async () => {
    // Mock 업로드 시뮬레이션
    console.log('Mock 인스타 피드 이미지 인스타그램 업로드');
    alert('인스타 피드 이미지가 인스타그램에 업로드되었습니다! (데모)');
  };

  // 상품 삭제 함수 (Mock)
  const handleDeleteProduct = async () => {
    if (!productToDelete) return;

    setDeleting(true);
    try {
      // Mock 삭제 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000));

      // localStorage에서 사용자 추가 상품 삭제
      const savedProducts = JSON.parse(localStorage.getItem('demo_products') || '[]');
      const updatedSavedProducts = savedProducts.filter((p: any) => p.id !== productToDelete.id);
      localStorage.setItem('demo_products', JSON.stringify(updatedSavedProducts));

      // UI 업데이트
      setProducts(prev => prev.filter(p => p.id !== productToDelete.id));

      // 선택된 상품이 삭제된 상품인 경우
      if (selectedProduct === productToDelete.id) {
        setSelectedProduct(null);
      }

      setDeleteModalOpen(false);
      setProductToDelete(null);

      // 현재 페이지에 상품이 없고 이전 페이지가 있으면 이전 페이지로 이동
      const remainingProducts = products.filter(p => p.id !== productToDelete.id);
      if (remainingProducts.length === 0 && currentPage > 1) {
        setCurrentPage(prev => prev - 1);
        fetchProducts(currentPage - 1);
      }

    } catch (error) {
      console.error('상품 삭제 실패:', error);
      alert('상품 삭제에 실패했습니다.');
    } finally {
      setDeleting(false);
    }
  };

  // Content type configuration
  const contentTypes = [
    {
      id: "detail" as const,
      icon: <ImageIcon className="h-8 w-8" />,
      title: "상품 상세 이미지",
      description: "상품의 세부 정보를 담은 상세 페이지용 이미지"
    },
    {
      id: "feed" as const,
      icon: <Hash className="h-8 w-8" />,
      title: "인스타 피드",
      description: "인스타 피드에 올라갈 정방형 이미지"
    },
    {
      id: "reels" as const,
      icon: <Video className="h-8 w-8" />,
      title: "인스타 릴스",
      description: "인스타 업로드용 짧은 동영상"
    },
    {
      id: "story" as const,
      icon: <Clock className="h-8 w-8" />,
      title: "인스타 스토리",
      description: "24시간 동안만 유지되는 인스타 게시물"
    }
  ];


  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">마케팅 에셋 생성하기</h1>
          <p className="text-lg text-muted-foreground">
            AI가 상품 사진을 마케팅 자료로 자동 변환해드려요
          </p>
        </div>
      </div>

      {/* Product Selection */}
      <div className="mb-8">
        <Card className="card-soft">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">STEP 1. 홍보할 제품 선택하기</CardTitle>
              </div>
              {/* 상품이 있을 때만 상단 추가 버튼 표시 */}
              {currentProducts.length > 0 && !loading && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="h-14 text-lg font-medium px-8 bg-gray-50 hover:bg-primary hover:text-white transition-colors border-gray-300"
                    onClick={() => navigate("/product-add")}
                  >
                    <Plus className="h-6 w-6 mr-2" />
                    상품 추가하기
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* 좌측 넘기기 버튼 - 페이지가 2개 이상일 때만 표시 */}
              {currentProducts.length > 0 && !loading && totalPages > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 rounded-full bg-white shadow-lg hover:bg-gray-100"
                  onClick={handlePrevPage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
              )}

              {/* 우측 넘기기 버튼 - 페이지가 2개 이상일 때만 표시 */}
              {currentProducts.length > 0 && !loading && totalPages > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 rounded-full bg-white shadow-lg hover:bg-gray-100"
                  onClick={handleNextPage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              )}

              {/* 상품 카드들 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {loading ? (
                  Array.from({ length: 4 }).map((_, index) => (
                    <Card key={index} className="border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex flex-col space-y-3">
                          <div className="w-full h-24 bg-gray-200 rounded-md animate-pulse" />
                          <div className="flex items-center justify-between">
                            <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
                            <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : currentProducts.length > 0 ? (
                  currentProducts.map((product) => (
                    <Card
                      key={product.id}
                      className={`relative cursor-pointer transition-all hover:shadow-md ${selectedProduct === product.id
                        ? "border-primary border-2 shadow-lg"
                        : "border-gray-200"
                        }`}
                      onClick={() => setSelectedProduct(product.id)}
                      onMouseEnter={() => setHoveredProduct(product.id)}
                      onMouseLeave={() => setHoveredProduct(null)}
                    >
                      <CardContent className="p-4">
                        <div className="flex flex-col space-y-3">
                          <div className="relative w-full h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-md flex items-center justify-center overflow-hidden border border-gray-200">
                            {product.thumbnailUrl ? (
                              <img
                                src={product.thumbnailUrl}
                                alt={product.name}
                                className="w-full h-full object-contain scale-[1.4]"
                              />
                            ) : (
                              <Package className="h-10 w-10 text-gray-400" />
                            )}
                            {/* 편집/삭제 버튼 - 호버 시에만 표시 */}
                            {hoveredProduct === product.id && (
                              <div className="absolute top-1 right-1 flex gap-1">
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  className="h-6 px-2 text-xs opacity-90 hover:opacity-100"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    console.log(`편집: ${product.name}`);
                                  }}
                                >
                                  <Edit className="h-3 w-3 mr-1" />
                                  편집
                                </Button>
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  className="h-6 px-2 text-xs opacity-90 hover:opacity-100 hover:bg-red-50 hover:text-red-600"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setProductToDelete(product);
                                    setDeleteModalOpen(true);
                                  }}
                                >
                                  <Trash2 className="h-3 w-3 mr-1" />
                                  삭제
                                </Button>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-sm line-clamp-1 flex-1 mr-2">
                              {product.name}
                            </h4>
                            <span className="text-sm font-bold text-primary whitespace-nowrap">
                              {product.price.toLocaleString()}원
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  // 상품이 없을 때
                  <div className="col-span-full text-center py-8">
                    <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">저장된 상품이 없습니다</p>
                    <Button
                      onClick={() => navigate("/product-add")}
                      variant="outline"
                      className="px-6 py-3 text-lg"
                    >
                      <Plus className="h-5 w-5 mr-2" />
                      상품 추가하기
                    </Button>
                  </div>
                )}
              </div>

              {/* 페이지 인디케이터 - 상품이 있고 페이지가 여러 개일 때만 표시 */}
              {currentProducts.length > 0 && !loading && totalPages > 1 && (
                <div className="flex justify-center items-center mt-4 space-x-1">
                  {/* 처음 페이지로 */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronsLeft className="h-4 w-4" />
                  </Button>

                  {/* 이전 페이지 */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  {/* 페이지 번호들 */}
                  <div className="flex space-x-1">
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <Button
                        key={index}
                        variant={index + 1 === currentPage ? "default" : "ghost"}
                        size="sm"
                        className={`h-8 w-8 p-0 ${index + 1 === currentPage
                          ? "bg-primary text-white hover:bg-primary/90"
                          : "hover:bg-gray-100"
                          }`}
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </Button>
                    ))}
                  </div>

                  {/* 다음 페이지 */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>

                  {/* 마지막 페이지로 */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronsRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>


      {/* Content Type Selection */}
      <div className="mb-8">
        <Card className="card-soft">
          <CardHeader>
            <CardTitle className="text-2xl">STEP 2. 어떤 종류의 콘텐츠를 만드시겠어요?</CardTitle>
            <CardDescription>
              콘텐츠 종류에 따라 최적화된 이미지와 문구를 생성해드려요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {contentTypes.map((type) => (
                <Button
                  key={type.id}
                  variant="outline"
                  onClick={() => handleContentGeneration(type.id)}
                  className="h-auto flex-col p-4 space-y-2 relative"
                  disabled={!selectedProduct || (type.id === 'detail' && detailImageGenerating) || (type.id === 'feed' && feedImageGenerating) || (type.id !== 'detail' && type.id !== 'feed')}
                >
                  {/* 생성 완료 체크 표시 */}
                  {((type.id === 'detail' && generatedDetailImage) || 
                    (type.id === 'feed' && generatedFeedImage)) && (
                    <div className="absolute -top-1 -right-1 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center shadow-lg border-2 border-background">
                      <Check className="h-4 w-4 text-white font-bold" />
                    </div>
                  )}
                  
                  <div className="flex flex-col items-center space-y-1">
                    {type.icon}
                    <span className="font-bold text-lg">{type.title}</span>
                  </div>
                  <span className="text-xs opacity-80">
                    {type.id === 'detail' && detailImageGenerating ? '생성 중...' : 
                     type.id === 'feed' && feedImageGenerating ? '생성 중...' : 
                     type.description}
                  </span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 삭제 확인 모달 */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>상품 삭제 확인</DialogTitle>
            <DialogDescription>
              정말로 "{productToDelete?.name}" 상품을 삭제하시겠습니까?
              <br />
              이 작업은 되돌릴 수 없으며, 관련된 모든 콘텐츠도 함께 삭제됩니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteModalOpen(false)}
              disabled={deleting}
            >
              취소
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteProduct}
              disabled={deleting}
            >
              {deleting ? "삭제 중..." : "삭제"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 상품 상세 이미지 생성 모달 */}
      <Dialog open={generatedImageModalOpen} onOpenChange={setGeneratedImageModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {detailImageGenerating ? "상품 상세 이미지 생성 중..." : "상품 상세 이미지 생성 완료"}
            </DialogTitle>
            <DialogDescription>
              {detailImageGenerating
                ? "올인움 AI가 멋진 상품 상세 이미지를 만들고 있어요!"
                : "올인움 AI가 생성한 상품 상세 이미지입니다. 다운로드하거나 쇼핑몰에 업로드할 수 있습니다."}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            {detailImageGenerating ? (
              // 로딩 상태
              <div className="flex flex-col items-center justify-center py-12 space-y-6">
                {/* 애니메이션 로더 */}
                <div className="relative">
                  <Loader2 className="h-16 w-16 animate-spin text-primary" />
                  <Sparkles className="absolute top-0 right-0 h-6 w-6 text-yellow-500 animate-pulse" />
                </div>

                {/* 진행 상태 메시지 */}
                <div className="text-center space-y-2">
                  <p className="text-lg font-medium">잠시만 기다려주세요...</p>
                  <p className="text-sm text-gray-500">보통 30-45초 정도 소요됩니다</p>
                </div>

                {/* 마케팅 팁 */}
                <div className="w-full max-w-md p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                  <p className="text-sm text-center text-gray-700 transition-all duration-500">
                    {marketingTips[currentTipIndex]}
                  </p>
                </div>
              </div>
            ) : generatedDetailImage ? (
              <div className="relative w-full max-h-[60vh] overflow-auto border rounded-lg bg-gray-50 p-4">
                <img
                  src={generatedDetailImage}
                  alt="Generated Product Detail"
                  className="w-[50%] h-auto mx-auto"
                />
              </div>
            ) : null}
          </div>

          <DialogFooter className="mt-6">
            {detailImageGenerating ? (
              <Button
                variant="outline"
                onClick={() => setGeneratedImageModalOpen(false)}
              >
                백그라운드에서 진행
              </Button>
            ) : (
              // 완료 후 버튼
              <>
                <Button
                  variant="outline"
                  onClick={() => setGeneratedImageModalOpen(false)}
                >
                  닫기
                </Button>
                <Button
                  variant="outline"
                  onClick={handleDownloadImage}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  다운로드
                </Button>
                <Button
                  onClick={handleUploadToStore}
                  className="flex items-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  쇼핑몰에 업로드
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* \uc778\uc2a4\ud0c0 \ud53c\ub4dc \uc774\ubbf8\uc9c0 \uc0dd\uc131 \ubaa8\ub2ec */}
      <Dialog open={feedImageModalOpen} onOpenChange={setFeedImageModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {feedStep === 'image' && feedImageGenerating ? "인스타 피드 이미지 생성 중..." : 
               feedStep === 'caption' && feedCaptionGenerating ? "인스타 피드 캡션 생성 중..." :
               feedStep === 'complete' ? "인스타 피드 콘텐츠 생성 완료" :
               "인스타 피드 이미지 생성 완료"}
            </DialogTitle>
            <DialogDescription>
              {feedStep === 'image' && feedImageGenerating ? "올인움 AI가 멋진 인스타 피드 이미지를 만들고 있어요!" :
               feedStep === 'caption' && feedCaptionGenerating ? "올인움 AI가 매력적인 캡션을 작성하고 있어요!" :
               feedStep === 'complete' ? "이미지와 캡션이 모두 준비되었습니다. 인스타그램에 바로 업로드하세요!" :
               "생성된 이미지를 확인하고 캡션을 생성해보세요."}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            {feedImageGenerating ? (
              // 이미지 생성 로딩 상태
              <div className="flex flex-col items-center justify-center py-12 space-y-6">
                <div className="relative">
                  <Loader2 className="h-16 w-16 animate-spin text-primary" />
                  <Sparkles className="absolute top-0 right-0 h-6 w-6 text-yellow-500 animate-pulse" />
                </div>
                <div className="text-center space-y-2">
                  <p className="text-lg font-medium">잠시만 기다려주세요...</p>
                  <p className="text-sm text-gray-500">보통 30-45초 정도 소요됩니다</p>
                </div>
                <div className="w-full max-w-md p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                  <p className="text-sm text-center text-gray-700 transition-all duration-500">
                    {marketingTips[currentTipIndex]}
                  </p>
                </div>
              </div>
            ) : generatedFeedImage ? (
              // 이미지 생성 완료 상태
              <div className={feedStep === 'image' ? 'flex justify-center' : 'grid grid-cols-1 lg:grid-cols-2 gap-6'}>
                {/* 왼쪽: 생성된 이미지 */}
                <div className="relative w-full max-h-[60vh] overflow-auto border rounded-lg bg-gray-50 p-4">
                  <img
                    src={generatedFeedImage}
                    alt="Generated Instagram Feed"
                    className={feedStep === 'image' ? 'w-[50%] h-auto mx-auto' : 'w-full h-auto mx-auto'}
                  />
                </div>
                
                {/* 오른쪽: 캡션 영역 - feedStep이 'caption' 또는 'complete'일 때만 표시 */}
                {feedStep !== 'image' && (
                  <div className="space-y-4">
                    {feedCaptionGenerating ? (
                      // 캡션 생성 로딩
                      <div className="flex flex-col items-center justify-center h-full space-y-6">
                        <div className="relative">
                          <Loader2 className="h-12 w-12 animate-spin text-primary" />
                          <Sparkles className="absolute top-0 right-0 h-4 w-4 text-yellow-500 animate-pulse" />
                        </div>
                        <div className="text-center space-y-2">
                          <p className="text-lg font-medium">캡션 생성 중...</p>
                          <p className="text-sm text-gray-500">보통 15-20초 정도 소요됩니다</p>
                        </div>
                        <div className="w-full p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                          <p className="text-sm text-center text-gray-700 transition-all duration-500">
                            {marketingTips[currentTipIndex]}
                          </p>
                        </div>
                      </div>
                    ) : (
                      // 캡션 입력 필드
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="generated-caption" className="text-gray-700 font-medium">캡션</Label>
                          <Textarea
                            id="generated-caption"
                            placeholder="생성된 캡션이 여기에 표시됩니다..."
                            value={generatedCaption || ""}
                            onChange={(e) => setGeneratedCaption(e.target.value)}
                            className="mt-2 min-h-[300px] resize-none !border-gray-300 focus:!border-gray-400 focus:!ring-gray-400 focus:!ring-2"
                            maxLength={2200}
                          />
                          <div className="flex justify-end text-xs text-gray-500 mt-2">
                            <span className={(generatedCaption?.length || 0) > 2000 ? 'text-red-500 font-medium' : ''}>
                              {generatedCaption?.length || 0}/2200
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : null}
          </div>

          <DialogFooter className="mt-6">
            {feedImageGenerating || feedCaptionGenerating ? (
              <Button
                variant="outline"
                onClick={() => setFeedImageModalOpen(false)}
              >
                백그라운드에서 진행
              </Button>
            ) : feedStep === 'complete' ? (
              // 최종 완료 상태 버튼들
              <>
                <Button
                  variant="outline"
                  onClick={() => setFeedImageModalOpen(false)}
                >
                  닫기
                </Button>
                <Button
                  variant="outline"
                  onClick={handleDownloadFeedImage}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  이미지 다운로드
                </Button>
                <Button
                  onClick={handleUploadToInstagram}
                  className="flex items-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  인스타그램에 업로드
                </Button>
              </>
            ) : (
              // 이미지만 생성된 상태 버튼들
              <>
                <Button
                  variant="outline"
                  onClick={() => setFeedImageModalOpen(false)}
                >
                  닫기
                </Button>
                <Button
                  variant="outline"
                  onClick={handleDownloadFeedImage}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  이미지 다운로드
                </Button>
                <Button
                  onClick={handleGenerateCaption}
                  className="flex items-center gap-2"
                  disabled={feedCaptionGenerating}
                >
                  <PenTool className="h-4 w-4" />
                  캡션 생성하기
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AssetStudioPage;