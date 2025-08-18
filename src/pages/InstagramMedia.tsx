import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { checkInstagramConnection } from "@/utils/instagramAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Image as ImageIcon, 
  Video,
  Search,
  Grid3X3,
  List,
  Download,
  Share,
  Eye,
  Heart,
  MessageCircle,
  Calendar,
  Filter,
  ExternalLink,
  RefreshCw,
  Play
} from "lucide-react";

interface Media {
  id: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  caption: string;
  timestamp: string;
  like_count?: number;
  comments_count?: number;
  insights?: {
    impressions: number;
    reach: number;
    engagement: number;
  };
}

const InstagramMediaPage = () => {
  const navigate = useNavigate();
  
  const [mediaList, setMediaList] = useState<Media[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<'all' | 'image' | 'video' | 'carousel'>('all');

  // 연동 상태 확인
  useEffect(() => {
    const connection = checkInstagramConnection();
    if (!connection.isConnected) {
      navigate('/instagram/connect');
      return;
    }
  }, [navigate]);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);

  useEffect(() => {
    loadMediaData();
  }, []);

  const loadMediaData = async () => {
    setIsLoading(true);
    
    try {
      console.log('배포용 모의 미디어 데이터 로드 시작...');
      
      // 배포용: 모의 로딩 시간
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
      
      // 배포용 모의 데이터 사용
      const mockMedia: Media[] = [
        {
          id: "sample_1",
          media_type: 'IMAGE',
          media_url: `data:image/svg+xml;base64,${btoa(`
            <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="400" height="400" fill="#E5E7EB"/>
              <rect x="150" y="150" width="100" height="100" fill="#9CA3AF"/>
              <text x="200" y="320" font-family="Arial" font-size="16" fill="#6B7280" text-anchor="middle">샘플 이미지</text>
            </svg>
          `)}`,
          permalink: "https://instagram.com/p/sample1",
          caption: "새로운 커튼 컬렉션이 출시되었습니다! 🏠✨ #인테리어 #커튼 #홈데코",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
          like_count: 45,
          comments_count: 8,
          insights: {
            impressions: 432,
            reach: 287,
            engagement: 53
          }
        },
        {
          id: "sample_2",
          media_type: 'IMAGE',
          media_url: `data:image/svg+xml;base64,${btoa(`
            <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="400" height="400" fill="#FEE2E2"/>
              <rect x="150" y="150" width="100" height="100" fill="#EF4444"/>
              <text x="200" y="320" font-family="Arial" font-size="16" fill="#DC2626" text-anchor="middle">침구 세트</text>
            </svg>
          `)}`,
          permalink: "https://instagram.com/p/sample2",
          caption: "따뜻한 겨울밤을 위한 포근한 침구 세트 💤❄️ #침구 #겨울용품",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
          like_count: 32,
          comments_count: 12,
          insights: {
            impressions: 298,
            reach: 201,
            engagement: 44
          }
        },
        {
          id: "sample_3",
          media_type: 'CAROUSEL_ALBUM',
          media_url: `data:image/svg+xml;base64,${btoa(`
            <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="400" height="400" fill="#DBEAFE"/>
              <rect x="150" y="150" width="100" height="100" fill="#3B82F6"/>
              <text x="200" y="320" font-family="Arial" font-size="16" fill="#1E40AF" text-anchor="middle">다중 이미지</text>
            </svg>
          `)}`,
          permalink: "https://instagram.com/p/sample3",
          caption: "다양한 스타일의 홈 인테리어 아이디어 모음집 📸 스와이프해서 더 보기!",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
          like_count: 67,
          comments_count: 15,
          insights: {
            impressions: 521,
            reach: 342,
            engagement: 82
          }
        },
        {
          id: "sample_4",
          media_type: 'VIDEO',
          media_url: `data:image/svg+xml;base64,${btoa(`
            <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="400" height="400" fill="#F3E8FF"/>
              <circle cx="200" cy="200" r="40" fill="#8B5CF6"/>
              <polygon points="185,185 185,215 210,200" fill="white"/>
              <text x="200" y="320" font-family="Arial" font-size="16" fill="#7C3AED" text-anchor="middle">제품 소개 영상</text>
            </svg>
          `)}`,
          thumbnail_url: `data:image/svg+xml;base64,${btoa(`
            <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="400" height="400" fill="#F3E8FF"/>
              <circle cx="200" cy="200" r="40" fill="#8B5CF6"/>
              <polygon points="185,185 185,215 210,200" fill="white"/>
            </svg>
          `)}`,
          permalink: "https://instagram.com/p/sample4",
          caption: "새로운 상품 출시! 영상으로 자세히 보여드릴게요 🎥✨ #신상품 #영상리뷰",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
          like_count: 89,
          comments_count: 23,
          insights: {
            impressions: 765,
            reach: 542,
            engagement: 112
          }
        }
      ];

      setMediaList(mockMedia);
      console.log('배포용 모의 미디어 데이터 로드 완료:', mockMedia.length, '개 항목');
      
    } catch (error: any) {
      console.error('모의 데이터 로드 실패:', error);
      setMediaList([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredMedia = mediaList
    .filter(media => {
      const matchesSearch = media.caption.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === 'all' || 
        (filterType === 'image' && media.media_type === 'IMAGE') ||
        (filterType === 'video' && media.media_type === 'VIDEO') ||
        (filterType === 'carousel' && media.media_type === 'CAROUSEL_ALBUM');
      
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInDays = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return '오늘';
    if (diffInDays === 1) return '어제';
    return `${diffInDays}일 전`;
  };

  const getMediaIcon = (type: string) => {
    switch (type) {
      case 'VIDEO': return <Video className="h-4 w-4" />;
      case 'CAROUSEL_ALBUM': return <Grid3X3 className="h-4 w-4" />;
      default: return <ImageIcon className="h-4 w-4" />;
    }
  };

  const getMediaTypeBadge = (type: string) => {
    const variants = {
      'IMAGE': 'default',
      'VIDEO': 'destructive',
      'CAROUSEL_ALBUM': 'secondary'
    } as const;
    
    return (
      <Badge variant={variants[type as keyof typeof variants] || 'default'}>
        {getMediaIcon(type)}
        <span className="ml-1">
          {type === 'CAROUSEL_ALBUM' ? '앨범' : type === 'VIDEO' ? '동영상' : '이미지'}
        </span>
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="page-container flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">미디어 라이브러리 로드 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
                <ImageIcon className="h-8 w-8 text-blue-500" />
                미디어 라이브러리
              </h1>
              <p className="text-lg text-muted-foreground mt-2">
                Instagram에 게시된 모든 콘텐츠를 관리하세요
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={loadMediaData}
              variant="outline"
              size="sm"
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              새로고침
            </Button>
            <div className="flex border rounded-md">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 필터 및 검색 */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="캡션으로 검색..."
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
                  { key: 'all', label: '전체' },
                  { key: 'image', label: '이미지' },
                  { key: 'video', label: '동영상' },
                  { key: 'carousel', label: '앨범' }
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

      {/* 미디어 그리드 */}
      {filteredMedia.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">미디어가 없습니다</h3>
            <p className="text-muted-foreground">
              {searchTerm ? '검색 조건에 맞는 미디어가 없습니다.' : 'Instagram에 게시된 콘텐츠가 없습니다.'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
          : "space-y-4"
        }>
          {filteredMedia.map((media) => (
            <Card key={media.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {viewMode === 'grid' ? (
                // 그리드 뷰
                <>
                  <div className="relative aspect-square">
                    <img 
                      src={media.thumbnail_url || media.media_url} 
                      alt={media.caption} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      {getMediaTypeBadge(media.media_type)}
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center opacity-0 hover:opacity-100">
                      <div className="flex gap-4 text-white text-sm">
                        <span className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          {media.like_count}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          {media.comments_count}
                        </span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm line-clamp-2 mb-2">{media.caption}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{getTimeAgo(media.timestamp)}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(media.permalink, '_blank')}
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </>
              ) : (
                // 리스트 뷰
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={media.thumbnail_url || media.media_url} 
                        alt={media.caption} 
                        className="w-full h-full object-cover"
                      />
                      {media.media_type === 'VIDEO' && (
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                          <Play className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-sm line-clamp-2">{media.caption}</p>
                        {getMediaTypeBadge(media.media_type)}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {getTimeAgo(media.timestamp)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          {media.like_count}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3" />
                          {media.comments_count}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {media.insights?.impressions}
                        </span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(media.permalink, '_blank')}
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          보기
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedMedia(media)}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          상세
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* 요약 정보 */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-lg">미디어 요약</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">{mediaList.length}</p>
              <p className="text-sm text-muted-foreground">총 게시물</p>
            </div>
            <div>
              <p className="text-2xl font-bold">
                {mediaList.reduce((sum, m) => sum + (m.like_count || 0), 0)}
              </p>
              <p className="text-sm text-muted-foreground">총 좋아요</p>
            </div>
            <div>
              <p className="text-2xl font-bold">
                {mediaList.reduce((sum, m) => sum + (m.comments_count || 0), 0)}
              </p>
              <p className="text-sm text-muted-foreground">총 댓글</p>
            </div>
            <div>
              <p className="text-2xl font-bold">
                {mediaList.reduce((sum, m) => sum + (m.insights?.impressions || 0), 0).toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">총 노출수</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstagramMediaPage;