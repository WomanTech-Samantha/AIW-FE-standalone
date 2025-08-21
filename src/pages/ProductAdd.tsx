import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Upload,
  X,
  Plus,
  Save,
  Package,
  Wand2,
  RefreshCw,
  CheckCircle,
  ArrowRight,
  ImageIcon
} from "lucide-react";

const ProductAddPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 폼 상태
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [productImage, setProductImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedDemo, setSelectedDemo] = useState<number | null>(null);

  // 사용자의 업종 정보 가져오기
  const getUserBusiness = () => {
    try {
      // MockAuthContext에서 저장한 키 사용
      const demoUserData = JSON.parse(localStorage.getItem('demo_user_data') || '{}');
      const userBusiness = demoUserData.business || "수공예";
      
      console.log('업종 정보:', userBusiness);
      
      return userBusiness;
    } catch (error) {
      console.error('Error getting user business:', error);
      return "수공예";
    }
  };

  const userBusiness = getUserBusiness();

  // 업종에 따른 데모 상품 데이터
  const getDemoProducts = () => {
    if (userBusiness.includes("침구")) {
      // 침구/이불 업종 데모 상품
      return [
        {
          id: 1,
          name: "시어버터 알로카시아 모달 이불",
          price: "229000",
          keywords: ["모달", "시어버터", "피부 보호", "알로카시아 패턴"],
          imageUrl: "https://res.cloudinary.com/dojsq7mnw/image/upload/v1755712735/asset-studio/jbzjhq7dxqpazgrcludw.png",
          enhancedImageUrl: "https://res.cloudinary.com/dojsq7mnw/image/upload/v1755712736/asset-studio/yso7rjacug9e3cwribyh.png"
        },
        {
          id: 2,
          name: "푹자요 극세사 이불",
          price: "139000",
          keywords: ["극세사", "숙면", "정전기 방지", "포근함"],
          imageUrl: "https://res.cloudinary.com/dojsq7mnw/image/upload/v1755743611/asset-studio/wmrlylncwaimvvqqovzx.png",
          enhancedImageUrl: "https://res.cloudinary.com/dojsq7mnw/image/upload/v1755743612/asset-studio/wotkmxtbltjpw2qvdkxc.png"
        },
        {
          id: 3,
          name: "구름마시멜로 소프트 스프레드",
          price: "119000",
          keywords: ["스프레드", "마이크로파이버", "가벼움", "포근함"],
          imageUrl: "https://res.cloudinary.com/dojsq7mnw/image/upload/v1755744269/asset-studio/rgdtobcxq57gqyjqnprq.png",
          enhancedImageUrl: "https://res.cloudinary.com/dojsq7mnw/image/upload/v1755744272/asset-studio/mfwalbpepsstl2dhdsja.png"
        },
        {
          id: 4,
          name: "숨쉬는 에어폼 경추 베개",
          price: "99000",
          keywords: ["메모리폼", "경추 건강", "자세 교정", "통기성"],
          imageUrl: "https://res.cloudinary.com/dojsq7mnw/image/upload/v1755747861/asset-studio/ubidw0o4j1wwwuqyhjhi.png",
          enhancedImageUrl: "https://res.cloudinary.com/dojsq7mnw/image/upload/v1755747862/asset-studio/rwvruqs9guh7dzipjvb6.png"
        }
      ];
    } else {
      // 수공예품 업종 데모 상품 (기본값)
      return [
        {
          id: 1,
          name: "솜털 포근 손뜨개 담요",
          price: "129000",
          keywords: ["핸드메이드", "손뜨개", "블랭킷", "포근함"],
          imageUrl: "https://res.cloudinary.com/dojsq7mnw/image/upload/v1755358464/products/original/1755358464564_%ED%95%98%ED%8A%B8_%ED%8C%A8%EC%B9%98%EC%9B%8C%ED%81%AC_original.jpg",
          enhancedImageUrl: ""
        },
        {
          id: 2,
          name: "스칸디나비아 패턴 쿠션",
          price: "59000",
          keywords: ["짜임", "스칸디나비아", "쿠션", "패턴"],
          imageUrl: "https://res.cloudinary.com/dojsq7mnw/image/upload/v1755358464/products/original/1755358464564_%ED%95%98%ED%8A%B8_%ED%8C%A8%EC%B9%98%EC%9B%8C%ED%81%AC_original.jpg",
          enhancedImageUrl: ""
        },
        {
          id: 3,
          name: "알록달록 줄무늬 손뜨개 파우치",
          price: "25000",
          keywords: ["뜨개", "파우치", "스트라이프", "수납"],
          imageUrl: "https://res.cloudinary.com/dojsq7mnw/image/upload/v1755358464/products/original/1755358464564_%ED%95%98%ED%8A%B8_%ED%8C%A8%EC%B9%98%EC%9B%8C%ED%81%AC_original.jpg",
          enhancedImageUrl: "https://res.cloudinary.com/dojsq7mnw/image/upload/v1755358463/products/enhanced/1755358461387_%ED%95%98%ED%8A%B8_%ED%8C%A8%EC%B9%98%EC%9B%8C%ED%81%AC_enhanced.jpg"
        },
        {
          id: 4,
          name: "모던 자수 캔버스 에코백",
          price: "49000",
          keywords: ["자수", "에코백", "모던", "패턴"],
          imageUrl: "https://res.cloudinary.com/dojsq7mnw/image/upload/v1755358464/products/original/1755358464564_%ED%95%98%ED%8A%B8_%ED%8C%A8%EC%B9%98%EC%9B%8C%ED%81%AC_original.jpg",
          enhancedImageUrl: ""
        }
      ];
    }
  };

  const demoProducts = getDemoProducts();


  // 가격 포맷팅 함수
  const formatPrice = (value: string) => {
    const numbers = value.replace(/[^\d]/g, '');
    if (!numbers) return '';
    return Number(numbers).toLocaleString() + '원';
  };

  // 가격 입력 처리
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    setProductPrice(value);
  };

  // AI 처리 상태
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasProcessed, setHasProcessed] = useState(false);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [generatedFeatures, setGeneratedFeatures] = useState<Array<{ feature: string, detail: string }>>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<Array<{ feature: string, detail: string }>>([]);
  const [editingFeature, setEditingFeature] = useState<number | null>(null);
  const [regeneratingImage, setRegeneratingImage] = useState(false);
  const [isSaving, setIsSaving] = useState(false);


  // 로딩 메시지 상태
  const [currentLoadingMessage, setCurrentLoadingMessage] = useState("");

  // 로딩 메시지 배열
  const loadingMessages = [
    "AI 작업중... 🎨",
    "완벽한 이미지를 위해 고민중입니다 ☕",
    "AI 화가가 열심히 그리고 있어요! ✨",
    "픽셀 하나하나 정성스럽게 배치중... 🔍",
    "잠깐 기지개라도 펴보시는 건 어떠세요? 🙆‍♀️",
    "색상 조합 중... 🌈",
    "프로 사진작가처럼 각도를 조정중이에요 📸",
    "빛과 그림자 조화... 💡",
    "평균 1분 정도의 시간이 필요해요 ⏰",
    "마법을 부리는 중... ✨"
  ];

  // 단계 관리
  const [currentStep, setCurrentStep] = useState<"input" | "preview" | "complete">("input");

  // 로딩 메시지 순환 useEffect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isProcessing || regeneratingImage) {
      // 첫 번째 메시지 즉시 설정
      const getRandomMessage = () => {
        const randomIndex = Math.floor(Math.random() * loadingMessages.length);
        return loadingMessages[randomIndex];
      };

      setCurrentLoadingMessage(getRandomMessage());

      // 2~4초 랜덤 간격으로 메시지 변경
      const scheduleNext = () => {
        const randomDelay = Math.floor(Math.random() * 2000) + 2000; // 2000~4000ms
        interval = setTimeout(() => {
          setCurrentLoadingMessage(getRandomMessage());
          scheduleNext(); // 다음 메시지 스케줄
        }, randomDelay);
      };

      scheduleNext();
    } else {
      setCurrentLoadingMessage("");
    }

    return () => {
      if (interval) {
        clearTimeout(interval);
      }
    };
  }, [isProcessing, regeneratingImage]);

  // 키워드 추가
  const handleAddKeyword = () => {
    if (keywords.length >= 4) {
      alert("최대 4개까지 키워드를 추가할 수 있습니다.");
      return;
    }
    if (currentKeyword.trim()) {
      setKeywords([...keywords, currentKeyword.trim()]);
      setCurrentKeyword("");
    }
  };

  // 키워드 삭제
  const handleRemoveKeyword = (index: number) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  // 키워드 입력 시 엔터 처리
  const handleKeywordKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddKeyword();
    }
  };

  // 데모 상품 로드
  const loadDemoProduct = async (demo: typeof demoProducts[0]) => {
    // 즉시 UI 업데이트 (이미지 미리보기 포함)
    setSelectedDemo(demo.id);
    setProductName(demo.name);
    setProductPrice(demo.price);
    setKeywords(demo.keywords);
    setImagePreview(demo.imageUrl); // 이미지를 즉시 표시

    // 백그라운드에서 File 객체 생성 (비동기)
    try {
      const response = await fetch(demo.imageUrl);
      const blob = await response.blob();
      const file = new File([blob], `${demo.name}.jpg`, { type: blob.type });
      setProductImage(file);
    } catch (error) {
      console.error('데모 상품 이미지 로드 실패:', error);
      // File 객체 생성 실패 시에도 계속 진행
    }
  };

  // 이미지를 Base64로 변환하는 유틸리티 함수
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        // data:image/jpeg;base64, 부분을 제거하고 base64 데이터만 추출
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // 이미지 업로드 처리
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProductImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 이미지 제거
  const handleRemoveImage = () => {
    setProductImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // AI 처리 시작 (Mock)
  const handleProcessWithAI = async () => {
    if (!productName || !productPrice || keywords.length === 0 || !productImage) {
      alert("모든 필수 정보를 입력해주세요.");
      return;
    }

    setIsProcessing(true);

    try {
      console.log('Mock AI 처리 시작:', {
        productName: productName.trim(),
        keywords: keywords
      });

      // Mock 생성된 이미지 URL을 미리 준비 - 각 데모 상품별 개별 이미지 사용
      const selectedDemoProduct = demoProducts.find(d => d.id === selectedDemo);
      const enhancedImageUrl = selectedDemoProduct?.enhancedImageUrl || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%234F46E5'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='24' font-family='sans-serif'%3EEnhanced Product%3C/text%3E%3C/svg%3E";

      // Mock 상품 특징도 미리 생성 (키워드 기반)
      const mockFeatures = generateMockFeatures(keywords);

      // 모든 상태를 한 번에 업데이트하여 화면 전환과 동시에 결과 표시
      setCurrentStep("preview");
      setEnhancedImage(enhancedImageUrl);
      setGeneratedFeatures(mockFeatures);
      setSelectedFeatures(mockFeatures);

      // 이미지와 특징이 모두 설정된 후 지연 시뮬레이션 (10-15초 사이 랜덤)
      const delay = Math.floor(Math.random() * 5000) + 10000; // 10-15초
      await new Promise(resolve => setTimeout(resolve, delay));

      setHasProcessed(true);

      console.log('Mock AI 처리 완료');

    } catch (error: any) {
      console.error("AI 처리 실패:", error);
      alert("AI 처리 중 오류가 발생했습니다. (데모)");
    } finally {
      setIsProcessing(false);
    }
  };

  // Mock 특징 생성 함수
  const generateMockFeatures = (keywords: string[]) => {
    // 선택된 데모 제품이 있는지 확인
    if (selectedDemo) {
      const demoProduct = demoProducts.find(p => p.id === selectedDemo);
      
      if (demoProduct?.name === "시어버터 알로카시아 모달 이불") {
        return [
          {
            feature: "시어버터로 부드러운 촉감",
            detail: "시어버터 성분을 가공해 섬유에 부드러운 촉감을 부여했습니다. 건조한 피부에 자극 없이 닿아 수면 중에도 편안하게 피부를 보호해 줍니다."
          },
          {
            feature: "피부 자극 없는 모달 소재",
            detail: "너도밤나무에서 추출한 모달 섬유를 사용해 피부에 닿는 촉감이 매우 부드럽습니다. 민감성 피부나 아토피가 있는 분들도 안심하고 사용할 수 있습니다."
          },
          {
            feature: "싱그러운 알로카시아 패턴",
            detail: "알로카시아 잎 패턴을 모티브로 하여 침실에 싱그럽고 감각적인 분위기를 더합니다. 자연적인 색감으로 어떤 인테리어에도 잘 어울립니다."
          },
          {
            feature: "우수한 흡습성 및 통기성",
            detail: "땀을 빠르게 흡수하고 건조시키는 기능이 뛰어나 쾌적한 수면 환경을 유지합니다. 사계절 내내 끈적임 없이 사용할 수 있습니다."
          }
        ];
      }
      
      if (demoProduct?.name === "푹자요 극세사 이불") {
        return [
          {
            feature: "몸을 감싸는 포근한 감촉",
            detail: "고밀도 극세사 소재로 제작하여 구름처럼 부드럽고 포근한 감촉을 선사합니다. 잠자리에 들면 몸을 부드럽게 감싸주어 깊은 잠을 유도합니다."
          },
          {
            feature: "정전기 방지 가공으로 쾌적하게",
            detail: "건조한 겨울철, 이불을 덮을 때 발생하는 정전기를 최소화하도록 특수 가공했습니다. 찌릿한 정전기 걱정 없이 편안하게 사용할 수 있습니다."
          },
          {
            feature: "높은 보온성으로 따뜻하게",
            detail: "공기층을 많이 머금는 극세사 섬유의 특성상 뛰어난 보온성을 자랑합니다. 한겨울에도 따뜻하고 아늑한 수면을 보장합니다."
          },
          {
            feature: "특수 공법 처리로 더욱 높아진 내구성",
            detail: "여러 번 세탁해도 변형이 적고, 먼지가 잘 붙지 않아 관리가 쉽습니다. 위생적이고 오래 사용할 수 있는 실용적인 제품입니다."
          }
        ];
      }
      
      if (demoProduct?.name === "구름마시멜로 소프트 스프레드") {
        return [
          {
            feature: "깃털처럼 가벼운 무게감",
            detail: "초극세 섬유인 마이크로파이버로 제작되어 매우 가볍습니다. 몸에 부담 없이 포근하게 덮을 수 있어 답답함을 싫어하는 분들에게 적합합니다."
          },
          {
            feature: "마시멜로처럼 폭신한 촉감",
            detail: "촘촘한 섬유 조직으로 마치 마시멜로를 만지는 것처럼 폭신하고 부드러운 촉감을 선사합니다. 수면의 질을 높여줍니다."
          },
          {
            feature: "사계절 활용 가능한 실용성",
            detail: "여름에는 시원하게 에어컨 바람을 막아주고, 겨울에는 이불 속 공기층을 형성해 보온성을 더합니다. 얇고 가벼워 활용도가 높습니다."
          },
          {
            feature: "세련된 컬러와 패턴",
            detail: "현대적이고 세련된 컬러 팔레트로 침실 인테리어를 업그레이드할 수 있습니다. 무심하게 걸쳐두는 것만으로도 감각적인 공간을 연출합니다."
          }
        ];
      }
      
      if (demoProduct?.name === "숨쉬는 에어폼 경추 베개") {
        return [
          {
            feature: "목의 곡선에 맞춘 경추 지지",
            detail: "인체공학적 디자인으로 C자 형태의 목 곡선을 따라 빈틈없이 지지합니다. 목과 어깨의 긴장을 완화하여 편안한 수면을 유도합니다."
          },
          {
            feature: "통기성 에어폼으로 쾌적",
            detail: "기존 메모리폼의 단점인 통풍 문제를 개선한 에어폼을 사용했습니다. 수면 중 땀이나 열기를 빠르게 배출해 쾌적한 상태를 유지합니다."
          },
          {
            feature: "체압 분산으로 편안한 숙면",
            detail: "머리의 무게를 고르게 분산하여 한 부분에 압력이 집중되는 것을 막습니다. 장시간 누워 있어도 배기는 느낌 없이 편안합니다."
          },
          {
            feature: "복원력이 뛰어난 기능성 소재",
            detail: "고밀도 메모리폼으로 제작되어 눌려도 빠르게 원래 형태로 복원됩니다. 오랫동안 변형 없이 사용할 수 있는 내구성을 자랑합니다."
          }
        ];
      }
      
      // 수공예품 제품들의 특징
      if (demoProduct?.name === "솜털 포근 손뜨개 담요") {
        return [
          {
            feature: "두툼한 짜임의 포근함",
            detail: "두꺼운 실을 사용하여 한 코 한 코 손으로 직접 짜낸 블랭킷입니다. 몸을 부드럽게 감싸는 포근한 감촉이 특징입니다."
          },
          {
            feature: "모던한 색상의 세련됨",
            detail: "차분하고 세련된 모노톤 색상을 사용해 어떤 인테리어에도 잘 어울립니다. 거실 소파나 침대에 무심하게 걸쳐두는 것만으로도 공간에 포인트를 줄 수 있습니다."
          },
          {
            feature: "활용도 높은 실용적 디자인",
            detail: "낮잠 이불, 무릎 담요, 또는 침대 스프레드 등 다양한 용도로 활용할 수 있습니다. 가볍고 따뜻해 사계절 내내 실용적입니다."
          },
          {
            feature: "수작업으로 느껴지는 정성",
            detail: "기계로는 흉내 낼 수 없는 불규칙한 짜임과 따뜻한 손맛이 담겨 있습니다. 세상에 단 하나뿐인 나만의 블랭킷을 소장할 수 있습니다."
          }
        ];
      }
      
      if (demoProduct?.name === "스칸디나비아 패턴 쿠션") {
        return [
          {
            feature: "정교한 짜임의 디자인",
            detail: "장인이 한 올 한 올 정성스럽게 짜낸 쿠션입니다. 복잡하지만 규칙적인 패턴이 모던하고 세련된 분위기를 연출합니다."
          },
          {
            feature: "북유럽 감성의 따뜻한 색감",
            detail: "북유럽 특유의 자연에서 영감을 받은 차분하고 따뜻한 색상을 사용했습니다. 어떤 공간에도 자연스럽게 어우러집니다."
          },
          {
            feature: "뛰어난 복원력의 충전재",
            detail: "형태가 잘 변하지 않는 탄력적인 충전재를 사용하여 편안한 사용감을 제공합니다. 오랫동안 푹신함을 유지해 소파나 침대에서 편안하게 기댈 수 있습니다."
          },
          {
            feature: "쉽게 분리 가능한 커버",
            detail: "커버와 충전재가 분리되어 세탁이 용이합니다. 위생적으로 관리할 수 있어 청결한 사용이 가능합니다."
          }
        ];
      }
      
      if (demoProduct?.name === "알록달록 줄무늬 손뜨개 파우치") {
        return [
          {
            feature: "생동감 있는 줄무늬 패턴",
            detail: "다채로운 색상의 조합으로 생동감 넘치는 줄무늬 패턴을 구현했습니다. 가방 속에서도 쉽게 눈에 띄어 편리합니다."
          },
          {
            feature: "손으로 직접 짜낸 부드러운 촉감",
            detail: "부드러운 실을 사용해 손뜨개로 제작되었습니다. 손에 닿는 촉감이 좋고, 유연한 소재로 물건을 담기 편리합니다."
          },
          {
            feature: "다용도로 활용 가능한 수납력",
            detail: "화장품, 펜, 충전기 등 다양한 소지품을 깔끔하게 정리할 수 있습니다. 가방 안을 정리하는 데 유용한 아이템입니다."
          },
          {
            feature: "견고한 지퍼와 꼼꼼한 마감",
            detail: "튼튼한 지퍼를 사용해 내용물을 안전하게 보관할 수 있습니다. 꼼꼼한 마감으로 오래 사용해도 변형이 적습니다."
          }
        ];
      }
      
      if (demoProduct?.name === "모던 자수 캔버스 에코백") {
        return [
          {
            feature: "심플한 라인의 모던 자수",
            detail: "직선과 곡선으로 이루어진 간결한 패턴을 자수로 표현했습니다. 화려하지 않지만 세련된 디자인으로 어떤 스타일에도 잘 어울립니다."
          },
          {
            feature: "튼튼한 캔버스 원단의 내구성",
            detail: "두툼하고 튼튼한 캔버스 원단으로 제작되어 무거운 소지품을 넣어도 처짐 없이 형태를 유지합니다. 오래 사용해도 변형이 적습니다."
          },
          {
            feature: "수작업으로 더해진 가치",
            detail: "자수 하나하나를 손으로 직접 놓아 제작되었습니다. 제작자의 정성과 손맛이 더해져 더욱 특별한 가치를 지닙니다."
          },
          {
            feature: "일상에 활력을 주는 포인트 백",
            detail: "단조로운 일상 패션에 포인트를 줄 수 있는 아이템입니다. 가볍고 실용적이면서도 스타일을 살려주는 가방입니다."
          }
        ];
      }
    }
    
    // 기본 특징 템플릿 (데모 제품이 아닌 경우)
    const featureTemplates = [
      {
        feature: "프리미엄 품질",
        detail: "최고급 소재와 정교한 기술로 제작된 프리미엄 품질의 제품입니다. 오래도록 변함없는 우수한 품질을 경험해보세요."
      },
      {
        feature: "편리한 사용",
        detail: "사용자의 편의를 고려한 실용적인 설계로 일상생활에서 더욱 편리하게 사용할 수 있습니다."
      },
      {
        feature: "만족도 보장",
        detail: "많은 고객들의 긍정적인 후기와 높은 만족도를 자랑하는 검증된 제품입니다."
      }
    ];

    // 키워드 수에 맞게 특징 반환
    return featureTemplates.slice(0, Math.min(keywords.length, 3));
  };

  // 개별 특징 재생성 (Mock)
  const handleRegenerateFeature = async (index: number) => {
    setEditingFeature(index);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock 대안 특징들
      const alternativeFeatures = [
        [
          { feature: "즉각 냉감 효과", detail: "쿨링 폴리에스터 원단을 채택하여 몸에 닿는 순간 즉시 청량한 느낌을 줍니다. 더운 날씨에도 땀과 열기를 빠르게 흡수하고 배출해 수면 내내 시원하고 쾌적한 환경을 제공합니다." },
          { feature: "프리미엄 통기성", detail: "3D 메쉬 구조로 공기 순환이 원활하여 습기와 열기를 효과적으로 배출합니다. 밤새 쾌적한 온도를 유지하여 깊은 잠에 빠질 수 있도록 도와줍니다." },
          { feature: "순간 냉각 시스템", detail: "특수 냉각 섬유가 체온을 감지하여 자동으로 온도를 조절합니다. 무더운 여름밤에도 시원함을 유지하여 편안한 잠자리를 제공합니다." }
        ],
        [
          { feature: "항균 & 방취 기능", detail: "특수 항균 처리로 세균 번식을 억제하고 불쾌한 냄새를 방지합니다. 오랜 시간 사용해도 깨끗하고 상쾌한 상태를 유지하여 건강하고 위생적인 수면 환경을 조성합니다." },
          { feature: "친환경 소재", detail: "100% 재활용 폴리에스터를 사용한 친환경 제품입니다. 환경을 생각하는 마음과 함께 건강한 수면을 제공하여 지구와 가족 모두에게 좋은 선택입니다." },
          { feature: "자연 항균 처리", detail: "천연 은이온 기술로 99.9% 항균 효과를 제공합니다. 화학 처리 없이도 자연스럽게 세균과 바이러스를 억제하여 안전하고 깨끗한 수면 환경을 만들어줍니다." }
        ],
        [
          { feature: "극세사 부드러운 터치", detail: "고밀도 극세사 원단으로 비단처럼 부드럽고 매끄러운 촉감을 선사합니다. 민감한 피부에도 자극 없이 편안하며, 고급스러운 질감으로 호텔급 수면의 품질을 경험할 수 있습니다." },
          { feature: "간편한 세탁 관리", detail: "일반 가정용 세탁기로 간편하게 세탁 가능하며, 빠른 건조로 관리가 용이합니다. 형태 변형 없이 오래도록 부드러운 촉감을 유지합니다." },
          { feature: "실크 같은 질감", detail: "마이크로파이버 기술로 실크보다 더 부드러운 촉감을 구현했습니다. 피부에 닿는 순간 느껴지는 매끄러움으로 최상급 편안함을 선사합니다." }
        ]
      ];

      // 현재 특징과 다른 대안 선택
      const currentFeature = selectedFeatures[index].feature;
      const alternatives = alternativeFeatures[index];
      const newFeature = alternatives.find(alt => alt.feature !== currentFeature) || alternatives[0];

      const updatedFeatures = [...selectedFeatures];
      updatedFeatures[index] = newFeature;
      setSelectedFeatures(updatedFeatures);

    } catch (error) {
      console.error("특징 재생성 실패:", error);
      alert("재생성 중 오류가 발생했습니다. (데모)");
    } finally {
      setEditingFeature(null);
    }
  };

  // 이미지 생성 또는 재생성 (Mock)
  const handleRegenerateImage = async () => {
    setRegeneratingImage(true);

    try {
      // Mock 재생성 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Mock 이미지 색상 변경
      const colors = ['4F46E5', '10B981', 'F59E0B', 'EF4444'];
      const currentColor = enhancedImage?.match(/fill='%23([A-F0-9]+)'/)?.[1] || '4F46E5';
      const currentIndex = colors.indexOf(currentColor);
      const nextColor = colors[(currentIndex + 1) % colors.length];
      setEnhancedImage(`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%23${nextColor}'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='24' font-family='sans-serif'%3EEnhanced Product%3C/text%3E%3C/svg%3E`);

    } catch (error) {
      console.error("이미지 재생성 실패:", error);
      alert("이미지 재생성 중 오류가 발생했습니다. (데모)");
    } finally {
      setRegeneratingImage(false);
    }
  };

  // 최종 저장 (Mock)
  const handleFinalSave = async () => {
    if (isSaving) {
      return; // 이미 저장 중이면 중복 실행 방지
    }

    if (!enhancedImage || selectedFeatures.length === 0) {
      alert('생성된 이미지와 특징이 필요합니다.');
      return;
    }

    if (!productName.trim() || !productPrice) {
      alert('상품명과 가격을 입력해주세요.');
      return;
    }

    setIsSaving(true);

    try {
      console.log('[Mock Product Save] 상품 저장 시작');

      // Mock 저장 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 2000));

      // localStorage에 저장
      const savedProducts = JSON.parse(localStorage.getItem('demo_products') || '[]');
      const newProduct = {
        id: `product-${Date.now()}`,
        name: productName.trim(),
        price: parseInt(productPrice.toString()),
        keywords: keywords,
        features: selectedFeatures,
        thumbnailUrl: enhancedImage,
        originalImage: imagePreview,
        images: [enhancedImage],
        createdAt: new Date().toISOString()
      };

      savedProducts.push(newProduct);
      localStorage.setItem('demo_products', JSON.stringify(savedProducts));

      console.log('[Mock Product Save] 저장 완료:', newProduct);

      // 완료 화면으로 이동
      setCurrentStep("complete");

      // 2초 후 스튜디오로 이동
      setTimeout(() => {
        navigate("/studio");
      }, 2000);

    } catch (error) {
      console.error('[Mock Product Save] 저장 실패:', error);
      alert(`상품 저장 중 오류가 발생했습니다: 데모 환경에서는 오류가 발생할 수 있습니다.`);
    } finally {
      setIsSaving(false);
    }
  };

  // 완료 화면
  if (currentStep === "complete") {
    return (
      <div className="page-container">
        <div className="max-w-2xl mx-auto text-center py-16">
          <CheckCircle className="mx-auto h-16 w-16 text-green-600 mb-6" />
          <h1 className="text-3xl font-bold mb-4">상품이 성공적으로 추가되었습니다!</h1>
          <p className="text-lg text-muted-foreground mb-6">
            AI가 보정한 이미지와 설명으로 마케팅 에셋을 생성할 준비가 완료되었습니다.
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/studio")}
            className="px-8"
          >
            스튜디오로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/studio")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {currentStep === "input" ? "상품 추가하기" : "AI 처리 결과 확인"}
            </h1>
            <p className="text-lg text-muted-foreground">
              {currentStep === "input"
                ? "사장님의 제품을 소개해주세요. 올인움이 멋진 마케팅 자료를 만들어드릴게요!"
                : "AI가 생성한 이미지와 설명을 확인하고 수정하세요"
              }
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        
        {currentStep === "input" && (
          <div className="space-y-6">
            
            <Card className="card-soft border-emerald-200 bg-emerald-50/50">
              <CardHeader>
                <CardTitle className="text-xl text-emerald-800">🚀 빠른 데모 시연을 위한 상품 예시</CardTitle>
                <CardDescription className="text-emerald-600">
                  아래 번호를 선택하시면 AI 처리 과정을 바로 확인하실 수 있습니다!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-start gap-3">
                  {demoProducts.map((demo) => (
                    <Button
                      key={demo.id}
                      variant="outline"
                      onClick={() => loadDemoProduct(demo)}
                      className={`relative w-20 h-20 p-0 rounded-t-xl font-bold text-2xl transition-all duration-300 transform ${selectedDemo === demo.id
                        ? 'bg-white text-emerald-600 border-emerald-400 shadow-lg scale-110 translate-y-[-12px] z-10 border-b-white'
                        : 'bg-gray-100 text-gray-500 border-gray-300 hover:bg-gray-200 hover:text-gray-600 translate-y-0'
                        }`}
                      style={{
                        boxShadow: selectedDemo === demo.id ? '0 -6px 16px rgba(16, 185, 129, 0.2)' : undefined
                      }}
                    >
                      {demo.id}
                    </Button>
                  ))}
                </div>
                
                <div className="h-1 bg-emerald-100 rounded-full mt-[-1px] relative z-0"></div>
              </CardContent>
            </Card>

            
            <Card className="card-soft">
              <CardHeader>
                <CardTitle>상품 정보 입력</CardTitle>
                <CardDescription>
                  데모 버전에서는 위의 예시 상품을 선택해주세요. 실제 버전에서는 직접 입력이 가능합니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                <div className="space-y-2">
                  <Label htmlFor="product-name" className="text-base font-semibold">
                    상품 이름
                  </Label>
                  <Input
                    id="product-name"
                    type="text"
                    placeholder="위의 예시 상품을 선택하면 자동으로 입력됩니다"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="h-12 text-base"
                    disabled={true}
                  />
                </div>

                
                <div className="space-y-2">
                  <Label htmlFor="product-price" className="text-base font-semibold">
                    가격
                  </Label>
                  <div className="relative">
                    <Input
                      id="product-price"
                      type="text"
                      placeholder="예시 상품 선택 시 자동 입력"
                      value={productPrice}
                      onChange={handlePriceChange}
                      className="h-12 text-base"
                      disabled={true}
                    />
                    {productPrice && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                        → {formatPrice(productPrice)}
                      </div>
                    )}
                  </div>
                </div>

                
                <div className="space-y-2">
                  <Label htmlFor="keywords" className="text-base font-semibold">
                    제품 강조 키워드 (최대 4개)
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="keywords"
                      type="text"
                      placeholder="예시 상품 선택 시 키워드가 자동으로 설정됩니다"
                      value={currentKeyword}
                      onChange={(e) => setCurrentKeyword(e.target.value)}
                      onKeyPress={handleKeywordKeyPress}
                      className="h-12 text-base flex-1"
                      disabled={true}
                    />
                    <Button
                      onClick={handleAddKeyword}
                      disabled={true}
                      className="h-12 px-6"
                    >
                      <Plus className="h-5 w-5 mr-1" />
                      추가
                    </Button>
                  </div>

                  
                  {keywords.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {keywords.map((keyword, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-sm py-2 px-3"
                        >
                          {keyword}
                          <button
                            onClick={() => handleRemoveKeyword(index)}
                            className="ml-2 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}

                  <p className="text-sm text-muted-foreground">
                    데모 버전에서는 위의 예시 상품을 선택하면 키워드가 자동으로 설정됩니다. 이 키워드를 토대로 다음 페이지에 마케팅 문구가 생성됩니다.
                  </p>
                </div>


                
                <div className="space-y-2">
                  <Label className="text-base font-semibold">
                    상품 이미지
                  </Label>

                  {!imagePreview ? (
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center bg-gray-50">
                      <Package className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                      <p className="text-base font-medium text-gray-500">예시 상품 선택 시 이미지가 자동으로 설정됩니다</p>
                      <p className="text-sm text-gray-400 mt-1">
                        데모 버전에서는 직접 업로드가 제한됩니다
                      </p>
                    </div>
                  ) : (
                    <div className="relative border rounded-lg p-4">
                      <img
                        src={imagePreview}
                        alt="상품 미리보기"
                        className="w-full max-w-48 mx-auto"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute top-2 right-2 bg-white/90 hover:bg-white border-gray-300 text-gray-600 hover:text-gray-800"
                        onClick={handleRemoveImage}
                        disabled={true}
                      >
                        <X className="h-4 w-4 mr-1" />
                        사진 변경
                      </Button>
                    </div>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />

                  <p className="text-sm text-muted-foreground">
                    데모 버전에서는 예시 상품의 이미지만 사용 가능합니다. 실제 버전에서는 올인움 AI가 업로드한 이미지를 자동으로 보정해드립니다.
                  </p>
                </div>

              </CardContent>
            </Card>
          </div>
        )}

        {currentStep === "preview" && (
          <div className="space-y-6">
            
            <Card className="card-soft">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>이미지 보정 결과</CardTitle>
                    <CardDescription>
                      AI가 원본 이미지를 마케팅용으로 보정했습니다
                    </CardDescription>
                  </div>
                  {hasProcessed && (
                    <Button
                      variant="outline"
                      onClick={handleRegenerateImage}
                      disabled={regeneratingImage}
                      className="flex items-center gap-2 transition-all duration-500 ease-in-out min-w-[140px]"
                      style={{
                        width: regeneratingImage ? 'auto' : undefined,
                        minWidth: regeneratingImage ? '200px' : '140px'
                      }}
                    >
                      <RefreshCw className={`h-4 w-4 ${regeneratingImage ? 'animate-spin' : ''}`} />
                      {regeneratingImage ? (currentLoadingMessage || "이미지 재생성 중...") : "이미지 재생성"}
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  <div>
                    <Label className="text-base font-semibold mb-3 block">원본 이미지</Label>
                    <div className="border rounded-lg p-4 bg-gray-50 min-h-[280px] flex items-center justify-center">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="원본 이미지"
                          className="w-full max-w-48 mx-auto"
                        />
                      ) : (
                        <div className="w-full max-w-48 mx-auto aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                          <Package className="h-12 w-12 text-gray-400" />
                        </div>
                      )}
                    </div>
                  </div>

                  
                  <div>
                    <Label className="text-base font-semibold mb-3 block">AI 보정 이미지</Label>
                    <div className="border rounded-lg p-4 bg-gradient-to-br from-blue-50 to-purple-50 relative min-h-[280px] flex items-center justify-center">
                      {enhancedImage ? (
                        <img
                          src={enhancedImage}
                          alt="보정된 이미지"
                          className="w-full max-w-48 mx-auto"
                        />
                      ) : (
                        <div className="w-full max-w-48 mx-auto aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                          <div className="flex flex-col items-center gap-2">
                            <ImageIcon className="h-12 w-12 text-gray-400" />
                            <span className="text-sm text-gray-500">이미지 생성 중...</span>
                          </div>
                        </div>
                      )}
                      {regeneratingImage && (
                        <div className="absolute inset-0 bg-white/80 rounded-lg flex items-center justify-center">
                          <div className="flex flex-col items-center gap-2 text-primary">
                            <RefreshCw className="h-6 w-6 animate-spin" />
                            <span className="text-sm font-medium">{enhancedImage ? '새 이미지 생성 중...' : '이미지 생성 중...'}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            
            <Card className="card-soft">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>AI 생성 상품 특징</CardTitle>
                    <CardDescription>
                      입력한 키워드를 바탕으로 생성된 3가지 특징을 확인하세요
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedFeatures.length === 0 ? (
                  // 플레이스홀더 상태
                  <div className="space-y-4">
                    {[1, 2, 3].map((num) => (
                      <Card key={num} className="border-gray-200 bg-gray-50/50">
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="text-sm font-medium">
                                  특징 {num}
                                </Badge>
                                <div className="h-5 bg-gray-200 rounded w-32 animate-pulse"></div>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                              <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
                              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  selectedFeatures.map((item, index) => (
                    <Card
                      key={index}
                      className="border-gray-200 bg-gray-50/50 relative"
                    >
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="text-sm font-medium">
                                특징 {index + 1}
                              </Badge>
                              <h4 className="text-lg font-bold text-primary">
                                {item.feature}
                              </h4>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRegenerateFeature(index)}
                              disabled={editingFeature === index}
                              className="text-gray-500 hover:text-primary"
                            >
                              <RefreshCw className={`h-4 w-4 ${editingFeature === index ? 'animate-spin' : ''}`} />
                            </Button>
                          </div>
                          <p className="text-base leading-relaxed text-gray-700">
                            {item.detail}
                          </p>
                          {editingFeature === index && (
                            <div className="absolute inset-0 bg-white/80 rounded-lg flex items-center justify-center">
                              <div className="flex items-center gap-2 text-primary">
                                <RefreshCw className="h-4 w-4 animate-spin" />
                                <span className="text-sm font-medium">새로운 특징 생성 중...</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        )}

        
        <div className="flex justify-end gap-3 mt-6">
          <Button
            variant="outline"
            size="lg"
            onClick={() => currentStep === "preview" ? setCurrentStep("input") : navigate("/studio")}
            className="px-8"
          >
            {currentStep === "preview" ? "이전" : "취소"}
          </Button>

          {currentStep === "input" && (
            <Button
              size="lg"
              onClick={handleProcessWithAI}
              disabled={isProcessing || !productName || !productPrice || keywords.length === 0 || !productImage}
              className="px-8 bg-primary hover:bg-primary/90 transition-all duration-500 ease-in-out min-w-[200px]"
              style={{
                width: isProcessing ? 'auto' : undefined,
                minWidth: isProcessing ? '250px' : '200px'
              }}
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                  {currentLoadingMessage || "AI 처리 중..."}
                </>
              ) : (
                <>
                  <Wand2 className="h-5 w-5 mr-2" />
                  스마트 생성하기
                </>
              )}
            </Button>
          )}

          {currentStep === "preview" && (
            <Button
              size="lg"
              onClick={handleFinalSave}
              className="px-8 bg-primary hover:bg-primary/90"
              disabled={isSaving}
            >
              <Save className="h-5 w-5 mr-2" />
              {isSaving ? '저장 중...' : '상품 저장하기'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductAddPage;