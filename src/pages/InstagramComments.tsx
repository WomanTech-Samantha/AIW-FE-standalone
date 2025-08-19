import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { checkInstagramConnection } from "@/utils/instagramAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  MessageCircle, 
  Send,
  Loader2,
  Search,
  Filter,
  ExternalLink,
  Trash2,
  Reply,
  Heart,
  AlertTriangle,
  RefreshCw,
  TrendingUp,
  Clock,
  Users,
  Star,
  ThumbsUp,
  MessageSquare,
  BarChart,
  Copy,
  CheckCircle2,
  Info,
  Moon,
  Coffee,
  Sparkles,
  Image as ImageIcon
} from "lucide-react";
import { 
  getCurrentBusinessType, 
  setBusinessType, 
  commentsByType,
  businessPersonas,
  type BusinessType 
} from "@/utils/businessPersona";

interface Comment {
  id: string;
  text: string;
  username: string;
  timestamp: string;
  like_count: number;
  replies?: Comment[];
  media_id: string;
  media_permalink: string;
  media_caption: string;
  sentiment?: 'positive' | 'neutral' | 'negative' | 'question';
  priority?: 'high' | 'medium' | 'low';
  replied?: boolean;
}

// 답변 템플릿
const replyTemplates = {
  bedding: {
    sizeQuestion: "안녕하세요! 저희 제품은 싱글/슈퍼싱글/퀸/킹 사이즈 모두 준비되어 있습니다. DM으로 원하시는 사이즈 말씀해주시면 자세히 안내드리겠습니다 😊",
    allergyQuestion: "안녕하세요! 저희 제품은 항알레르기 처리가 되어 있어 안심하고 사용하실 수 있습니다. 먼지 날림도 최소화한 프리미엄 제품입니다 ✨",
    washingQuestion: "네, 가정용 세탁기에서도 세탁 가능합니다! 30도 이하 찬물 세탁을 권장드리며, 자세한 관리법은 제품과 함께 동봉해드립니다 🧺",
    priceQuestion: "안녕하세요! 가격 문의 감사합니다. DM으로 제품별 상세 가격표 보내드리겠습니다. 지금 구매하시면 10% 할인 혜택도 있어요! 💝",
    deliveryQuestion: "안녕하세요! 평일 기준 1-2일 내 배송 가능합니다. 급하신 경우 당일 퀵배송도 가능하니 DM 주세요 📦",
    colorQuestion: "네! 베이지, 그레이, 화이트, 네이비 등 다양한 색상이 준비되어 있습니다. 프로필 링크에서 전체 색상 확인 가능해요 🎨"
  },
  handcraft: {
    allergyQuestion: "안녕하세요! 모든 제품은 니켈프리 소재를 사용해 알레르기 걱정 없이 착용 가능합니다 ✨",
    giftPackaging: "네, 무료 선물포장 서비스 제공합니다! 메시지 카드도 원하시는 문구로 작성해드려요 🎁",
    customOrder: "맞춤 제작 가능합니다! 한글/영문 이니셜 모두 가능하며, 제작 기간은 3-5일 소요됩니다 💎",
    offlineStore: "감사합니다! 현재는 온라인으로만 운영 중이지만, 매월 마지막 주 토요일 플리마켓에 참여하고 있어요 📍",
    sizeAdjust: "네, 사이즈 조절 가능합니다! 구매 시 손목 둘레 알려주시면 맞춤 조절해드려요 📏",
    stockQuestion: "인기 제품이라 수량이 한정되어 있습니다. 원하시는 디자인 있으시면 빠른 구매 추천드려요! ⏰"
  }
};

// 자동 답변 제안 시스템
const getAutoReplyS = (comment: string, businessType: BusinessType): string | null => {
  const lowerComment = comment.toLowerCase();
  
  if (businessType === 'bedding') {
    const templates = replyTemplates.bedding;
    
    if (lowerComment.includes('사이즈') || lowerComment.includes('크기') || lowerComment.includes('퀸') || lowerComment.includes('싱글')) {
      return templates.sizeQuestion;
    }
    if (lowerComment.includes('알레르기') || lowerComment.includes('먼지')) {
      return templates.allergyQuestion;
    }
    if (lowerComment.includes('세탁') || lowerComment.includes('빨래') || lowerComment.includes('관리')) {
      return templates.washingQuestion;
    }
    if (lowerComment.includes('가격') || lowerComment.includes('얼마') || lowerComment.includes('dm')) {
      return templates.priceQuestion;
    }
    if (lowerComment.includes('배송') || lowerComment.includes('언제') || lowerComment.includes('받')) {
      return templates.deliveryQuestion;
    }
    if (lowerComment.includes('색') || lowerComment.includes('컬러') || lowerComment.includes('베이지')) {
      return templates.colorQuestion;
    }
  } else {
    const templates = replyTemplates.handcraft;
    
    if (lowerComment.includes('알레르기') || lowerComment.includes('착용')) {
      return templates.allergyQuestion;
    }
    if (lowerComment.includes('선물') || lowerComment.includes('포장')) {
      return templates.giftPackaging;
    }
    if (lowerComment.includes('이니셜') || lowerComment.includes('각인') || lowerComment.includes('맞춤')) {
      return templates.customOrder;
    }
    if (lowerComment.includes('오프라인') || lowerComment.includes('매장') || lowerComment.includes('직접')) {
      return templates.offlineStore;
    }
    if (lowerComment.includes('사이즈') || lowerComment.includes('조절') || lowerComment.includes('손목')) {
      return templates.sizeAdjust;
    }
    if (lowerComment.includes('재고') || lowerComment.includes('품절') || lowerComment.includes('남')) {
      return templates.stockQuestion;
    }
  }
  
  return null;
};

// 댓글 감정 분석
const analyzeSentiment = (text: string): 'positive' | 'neutral' | 'negative' | 'question' => {
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('?') || lowerText.includes('얼마') || lowerText.includes('어떻게') || lowerText.includes('언제')) {
    return 'question';
  }
  if (lowerText.includes('예쁘') || lowerText.includes('좋') || lowerText.includes('최고') || lowerText.includes('감사')) {
    return 'positive';
  }
  if (lowerText.includes('별로') || lowerText.includes('실망') || lowerText.includes('안') || lowerText.includes('불만')) {
    return 'negative';
  }
  return 'neutral';
};

// 우선순위 설정
const getPriority = (comment: Comment): 'high' | 'medium' | 'low' => {
  if (comment.sentiment === 'question' || comment.sentiment === 'negative') return 'high';
  if (comment.like_count > 10) return 'high';
  if (comment.sentiment === 'positive') return 'low';
  return 'medium';
};

const InstagramCommentsPage = () => {
  const navigate = useNavigate();
  
  const [businessType, setCurrentBusinessType] = useState<BusinessType>(getCurrentBusinessType());
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<'all' | 'recent' | 'most_liked' | 'unanswered' | 'questions'>('recent');
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});
  const [isReplying, setIsReplying] = useState<{ [key: string]: boolean }>({});
  const [selectedTab, setSelectedTab] = useState<'all' | 'priority' | 'insights'>('all');
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null);

  useEffect(() => {
    // 연동 상태 확인
    const connection = checkInstagramConnection();
    if (!connection.isConnected) {
      navigate('/instagram/connect');
      return;
    }
    loadComments();
  }, [navigate, businessType]);

  const handleBusinessTypeChange = (type: BusinessType) => {
    setCurrentBusinessType(type);
    setBusinessType(type);
  };

  const loadComments = async () => {
    setIsLoading(true);
    
    try {
      // 배포용: 모의 로딩 시간
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 업종별 댓글 데이터 로드
      const mockComments = commentsByType[businessType].map(comment => ({
        ...comment,
        sentiment: analyzeSentiment(comment.text),
        replied: false
      }));
      
      // 우선순위 설정
      const commentsWithPriority = mockComments.map(comment => ({
        ...comment,
        priority: getPriority(comment)
      }));
      
      setComments(commentsWithPriority);
      
    } catch (error: any) {
      console.error('댓글 로드 실패:', error);
      setComments([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReply = async (commentId: string) => {
    const text = replyText[commentId]?.trim();
    if (!text) return;

    setIsReplying(prev => ({ ...prev, [commentId]: true }));

    try {
      // 배포용: 모의 답변 처리
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 댓글 상태 업데이트
      setComments(prev => prev.map(comment => 
        comment.id === commentId ? { ...comment, replied: true } : comment
      ));
      
      // 답글 입력창 초기화
      setReplyText(prev => ({ ...prev, [commentId]: '' }));
      
    } catch (error: any) {
      console.error('답글 작성 실패:', error);
    } finally {
      setIsReplying(prev => ({ ...prev, [commentId]: false }));
    }
  };

  const handleAutoReply = (commentId: string, template: string) => {
    setReplyText(prev => ({ ...prev, [commentId]: template }));
  };

  const copyTemplate = (template: string) => {
    navigator.clipboard.writeText(template);
    setCopiedTemplate(template);
    setTimeout(() => setCopiedTemplate(null), 2000);
  };

  const filteredComments = comments
    .filter(comment => {
      const matchesSearch = comment.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           comment.username.toLowerCase().includes(searchTerm.toLowerCase());
      
      switch (filterType) {
        case 'unanswered':
          return matchesSearch && !comment.replied;
        case 'questions':
          return matchesSearch && comment.sentiment === 'question';
        default:
          return matchesSearch;
      }
    })
    .sort((a, b) => {
      switch (filterType) {
        case 'recent':
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        case 'most_liked':
          return b.like_count - a.like_count;
        default:
          return 0;
      }
    });

  const priorityComments = filteredComments.filter(c => c.priority === 'high');
  
  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - time.getTime()) / 1000);
    
    if (diffInSeconds < 60) return '방금 전';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}시간 전`;
    return `${Math.floor(diffInSeconds / 86400)}일 전`;
  };

  const getSentimentIcon = (sentiment: string) => {
    switch(sentiment) {
      case 'positive': return <ThumbsUp className="h-3 w-3 text-green-500" />;
      case 'negative': return <AlertTriangle className="h-3 w-3 text-red-500" />;
      case 'question': return <MessageSquare className="h-3 w-3 text-blue-500" />;
      default: return <MessageCircle className="h-3 w-3 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  // 댓글 통계
  const stats = {
    total: comments.length,
    unanswered: comments.filter(c => !c.replied).length,
    questions: comments.filter(c => c.sentiment === 'question').length,
    positive: comments.filter(c => c.sentiment === 'positive').length,
    totalLikes: comments.reduce((sum, c) => sum + c.like_count, 0),
    avgResponseTime: '평균 30분',
    responseRate: Math.round((comments.filter(c => c.replied).length / comments.length) * 100) || 0
  };

  if (isLoading) {
    return (
      <div className="page-container flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">댓글 데이터 로드 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
                <MessageCircle className="h-8 w-8 text-purple-500" />
                댓글 관리 센터
              </h1>
              <p className="text-lg text-muted-foreground mt-2">
                고객과의 소통을 효율적으로 관리하고 인사이트를 얻으세요
              </p>
            </div>
            <div className="flex items-center gap-4">
              {/* 업종 선택 */}
              <Select value={businessType} onValueChange={handleBusinessTypeChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bedding">
                    <div className="flex items-center gap-2">
                      <Moon className="h-4 w-4" />
                      침구 전문점
                    </div>
                  </SelectItem>
                  <SelectItem value="handcraft">
                    <div className="flex items-center gap-2">
                      <Coffee className="h-4 w-4" />
                      수공예 작품샵
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                onClick={loadComments}
                variant="outline"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                새로고침
              </Button>
            </div>
          </div>

          {/* 업종 정보 */}
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{businessPersonas[businessType].name}</h3>
                  <p className="text-sm text-muted-foreground">주요 고객: {businessPersonas[businessType].target}</p>
                </div>
                <div className="flex gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">{stats.responseRate}%</p>
                    <p className="text-xs text-muted-foreground">응답률</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{stats.avgResponseTime}</p>
                    <p className="text-xs text-muted-foreground">평균 응답시간</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">총 댓글</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <MessageCircle className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">미답변</p>
                  <p className="text-2xl font-bold text-red-600">{stats.unanswered}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">질문</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.questions}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">긍정적</p>
                  <p className="text-2xl font-bold text-green-600">{stats.positive}</p>
                </div>
                <ThumbsUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">총 좋아요</p>
                  <p className="text-2xl font-bold">{stats.totalLikes}</p>
                </div>
                <Heart className="h-8 w-8 text-pink-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 필터 및 검색 */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="댓글 내용이나 사용자명으로 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <div className="flex gap-2">
                  {[
                    { key: 'recent', label: '최신순' },
                    { key: 'most_liked', label: '인기순' },
                    { key: 'unanswered', label: '미답변' },
                    { key: 'questions', label: '질문만' }
                  ].map(filter => (
                    <Button
                      key={filter.key}
                      variant={filterType === filter.key ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFilterType(filter.key as any)}
                    >
                      {filter.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 메인 콘텐츠 */}
        <Tabs value={selectedTab} onValueChange={(v) => setSelectedTab(v as any)}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">
              전체 댓글 ({filteredComments.length})
            </TabsTrigger>
            <TabsTrigger value="priority">
              우선 답변 ({priorityComments.length})
            </TabsTrigger>
            <TabsTrigger value="insights">
              인사이트
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filteredComments.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">댓글이 없습니다</h3>
                  <p className="text-muted-foreground">
                    {searchTerm ? '검색 조건에 맞는 댓글이 없습니다.' : '아직 댓글이 없습니다.'}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredComments.map((comment) => {
                const autoReply = getAutoReplyS(comment.text, businessType);
                
                return (
                  <Card key={comment.id} className={comment.priority === 'high' ? 'border-red-200' : ''}>
                    <CardContent className="p-6">
                      {/* 댓글 헤더 */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                            {comment.username.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium">@{comment.username}</p>
                              {getSentimentIcon(comment.sentiment!)}
                              {comment.replied && (
                                <Badge variant="secondary" className="text-xs">
                                  <CheckCircle2 className="h-3 w-3 mr-1" />
                                  답변완료
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{getTimeAgo(comment.timestamp)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {comment.priority && (
                            <Badge className={`text-xs ${getPriorityColor(comment.priority)}`}>
                              {comment.priority === 'high' ? '높음' : comment.priority === 'medium' ? '보통' : '낮음'}
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-xs">
                            <Heart className="h-3 w-3 mr-1" />
                            {comment.like_count}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(comment.media_permalink, '_blank')}
                          >
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      {/* 댓글 내용 */}
                      <div className="mb-4">
                        <p className="text-sm mb-3">{comment.text}</p>
                        <div className="text-xs text-muted-foreground bg-gray-50 p-2 rounded flex items-center gap-2">
                          <ImageIcon className="h-3 w-3" />
                          게시물: {comment.media_caption}
                        </div>
                      </div>

                      {/* AI 추천 답변 */}
                      {autoReply && !comment.replied && (
                        <div className="mb-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="h-4 w-4 text-purple-600" />
                            <span className="text-sm font-medium text-purple-900">AI 추천 답변</span>
                          </div>
                          <p className="text-sm text-purple-800 mb-2">{autoReply}</p>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleAutoReply(comment.id, autoReply)}
                              className="text-xs"
                            >
                              답변 사용하기
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyTemplate(autoReply)}
                              className="text-xs"
                            >
                              {copiedTemplate === autoReply ? (
                                <>
                                  <CheckCircle2 className="h-3 w-3 mr-1" />
                                  복사됨
                                </>
                              ) : (
                                <>
                                  <Copy className="h-3 w-3 mr-1" />
                                  복사
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* 답글 영역 */}
                      {!comment.replied && (
                        <div className="border-t pt-4 space-y-3">
                          <div className="flex gap-2">
                            <Textarea
                              placeholder="답글을 작성하세요..."
                              value={replyText[comment.id] || ''}
                              onChange={(e) => setReplyText(prev => ({
                                ...prev,
                                [comment.id]: e.target.value
                              }))}
                              className="flex-1 min-h-[80px] resize-none"
                            />
                          </div>
                          
                          <div className="flex justify-between">
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const template = businessType === 'bedding' 
                                    ? "안녕하세요! 문의 감사합니다 😊 "
                                    : "안녕하세요! 관심 가져주셔서 감사합니다 ✨ ";
                                  setReplyText(prev => ({
                                    ...prev,
                                    [comment.id]: template + (prev[comment.id] || '')
                                  }));
                                }}
                              >
                                인사말 추가
                              </Button>
                            </div>
                            
                            <Button
                              size="sm"
                              onClick={() => handleReply(comment.id)}
                              disabled={!replyText[comment.id]?.trim() || isReplying[comment.id]}
                            >
                              {isReplying[comment.id] ? (
                                <>
                                  <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                                  답글 작성 중...
                                </>
                              ) : (
                                <>
                                  <Send className="h-3 w-3 mr-1" />
                                  답글 보내기
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })
            )}
          </TabsContent>

          <TabsContent value="priority" className="space-y-4">
            {priorityComments.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">우선 답변이 필요한 댓글이 없습니다</h3>
                  <p className="text-muted-foreground">
                    모든 중요한 댓글에 답변을 완료했습니다!
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                <Alert className="border-yellow-200 bg-yellow-50">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <AlertDescription className="text-yellow-800">
                    <strong>{priorityComments.length}개</strong>의 댓글이 즉시 답변이 필요합니다.
                    질문이나 부정적인 피드백을 우선적으로 처리해주세요.
                  </AlertDescription>
                </Alert>
                
                {priorityComments.map((comment) => {
                  const autoReply = getAutoReplyS(comment.text, businessType);
                  
                  return (
                    <Card key={comment.id} className="border-red-200">
                      <CardContent className="p-6">
                        {/* 동일한 댓글 카드 컴포넌트 */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                              {comment.username.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-medium">@{comment.username}</p>
                                {getSentimentIcon(comment.sentiment!)}
                              </div>
                              <p className="text-sm text-muted-foreground">{getTimeAgo(comment.timestamp)}</p>
                            </div>
                          </div>
                          <Badge className="text-xs bg-red-100 text-red-700 border-red-300">
                            우선 답변 필요
                          </Badge>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm mb-3">{comment.text}</p>
                        </div>

                        {autoReply && (
                          <div className="mb-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Sparkles className="h-4 w-4 text-purple-600" />
                              <span className="text-sm font-medium text-purple-900">AI 추천 답변</span>
                            </div>
                            <p className="text-sm text-purple-800 mb-2">{autoReply}</p>
                            <Button
                              size="sm"
                              onClick={() => handleAutoReply(comment.id, autoReply)}
                            >
                              이 답변 사용하기
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            {/* 인사이트 대시보드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 감정 분석 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart className="h-5 w-5" />
                    댓글 감정 분석
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ThumbsUp className="h-4 w-4 text-green-500" />
                        <span className="text-sm">긍정적</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{stats.positive}</span>
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-500" 
                            style={{ width: `${(stats.positive / stats.total) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">질문</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{stats.questions}</span>
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500" 
                            style={{ width: `${(stats.questions / stats.total) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageCircle className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">중립</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {comments.filter(c => c.sentiment === 'neutral').length}
                        </span>
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gray-500" 
                            style={{ width: `${(comments.filter(c => c.sentiment === 'neutral').length / stats.total) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 자주 묻는 질문 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    자주 묻는 질문 TOP 5
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {businessType === 'bedding' ? (
                      <>
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">사이즈 문의</span>
                          <Badge variant="secondary">15회</Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">가격 문의</span>
                          <Badge variant="secondary">12회</Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">세탁 방법</span>
                          <Badge variant="secondary">8회</Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">배송 기간</span>
                          <Badge variant="secondary">7회</Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">색상 옵션</span>
                          <Badge variant="secondary">5회</Badge>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">맞춤 제작</span>
                          <Badge variant="secondary">18회</Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">선물 포장</span>
                          <Badge variant="secondary">14회</Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">알레르기 소재</span>
                          <Badge variant="secondary">10회</Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">사이즈 조절</span>
                          <Badge variant="secondary">8회</Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">오프라인 매장</span>
                          <Badge variant="secondary">6회</Badge>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* 응답 템플릿 */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Copy className="h-5 w-5" />
                    빠른 응답 템플릿
                  </CardTitle>
                  <CardDescription>
                    자주 사용하는 답변을 클릭하여 복사하세요
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object.entries(replyTemplates[businessType]).map(([key, template]) => (
                      <div key={key} className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm mb-2">{template}</p>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyTemplate(template)}
                        >
                          {copiedTemplate === template ? (
                            <>
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              복사됨
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3 mr-1" />
                              템플릿 복사
                            </>
                          )}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 개선 제안 */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    고객 응대 개선 제안
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        <strong>빠른 응답이 중요합니다!</strong> 1시간 이내 답변 시 구매 전환율이 23% 증가합니다.
                      </AlertDescription>
                    </Alert>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-sm mb-1">자주 묻는 질문 FAQ 작성</h4>
                        <p className="text-xs text-muted-foreground">
                          반복되는 질문은 프로필이나 하이라이트에 정리해두세요
                        </p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <h4 className="font-medium text-sm mb-1">긍정 댓글 활용</h4>
                        <p className="text-xs text-muted-foreground">
                          만족한 고객의 댓글을 리뷰로 활용하세요
                        </p>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <h4 className="font-medium text-sm mb-1">개인화된 답변</h4>
                        <p className="text-xs text-muted-foreground">
                          고객 이름을 부르며 친근하게 응대하세요
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default InstagramCommentsPage;