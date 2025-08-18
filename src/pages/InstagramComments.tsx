import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { checkInstagramConnection } from "@/utils/instagramAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
  RefreshCw
} from "lucide-react";

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
}

const InstagramCommentsPage = () => {
  const navigate = useNavigate();
  
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<'all' | 'recent' | 'most_liked'>('recent');
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});
  const [isReplying, setIsReplying] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    // 연동 상태 확인
    const connection = checkInstagramConnection();
    if (!connection.isConnected) {
      navigate('/instagram/connect');
      return;
    }
    loadComments();
  }, [navigate]);

  const loadComments = async () => {
    setIsLoading(true);
    
    try {
      console.log('배포용 모의 댓글 데이터 로드 시작...');
      
      // 배포용: 모의 로딩 시간
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 800));
      
      // 배포용 모의 댓글 데이터
      const mockComments: Comment[] = [
        {
          id: "comment_1",
          text: "정말 예쁜 상품이네요! 어디서 구매할 수 있나요?",
          username: "user123",
          timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30분 전
          like_count: 5,
          media_id: "media_1",
          media_permalink: "https://instagram.com/p/sample1",
          media_caption: "새로운 커튼 컬렉션 출시!"
        },
        {
          id: "comment_2",
          text: "색상이 너무 마음에 들어요 💕",
          username: "fashionlover",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2시간 전
          like_count: 12,
          media_id: "media_1",
          media_permalink: "https://instagram.com/p/sample1",
          media_caption: "새로운 커튼 컬렉션 출시!"
        },
        {
          id: "comment_3",
          text: "DM으로 가격 문의드려도 될까요?",
          username: "interior_mom",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5시간 전
          like_count: 3,
          media_id: "media_2",
          media_permalink: "https://instagram.com/p/sample2",
          media_caption: "따뜻한 색감의 침구 세트"
        },
        {
          id: "comment_4",
          text: "언제쯤 재입고 되나요? 기다리고 있어요 ㅠㅠ",
          username: "homelover",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1일 전
          like_count: 8,
          media_id: "media_3",
          media_permalink: "https://instagram.com/p/sample3",
          media_caption: "인기 상품 품절 안내"
        }
        ];

        setComments(mockComments);
        console.log('배포용 모의 댓글 데이터 로드 완료:', mockComments.length, '개 댓글');
      
    } catch (error: any) {
      console.error('모의 댓글 로드 실패:', error);
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
      console.log('배포용 모의 댓글 답변:', { commentId, text });
      
      // 배포용: 모의 답변 처리 시간
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
      
      alert('답글이 성공적으로 작성되었습니다! 📝');
      
      // 답글 입력창 초기화
      setReplyText(prev => ({ ...prev, [commentId]: '' }));
      
    } catch (error: any) {
      console.error('모의 답글 작성 실패:', error);
      alert('답글 작성에 실패했습니다: ' + error.message);
    } finally {
      setIsReplying(prev => ({ ...prev, [commentId]: false }));
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('이 댓글을 삭제하시겠습니까?')) return;

    try {
      const instagramData = {
        token: localStorage.getItem('instagram_access_token')
      };

      // 백엔드 API 호출
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api/v1';
      const authToken = localStorage.getItem('token');
      
      const response = await fetch(`${apiBaseUrl}/instagram/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          access_token: instagramData.token
        })
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || '댓글 삭제에 실패했습니다.');
      }
      
      // 로컬에서 댓글 제거
      setComments(prev => prev.filter(comment => comment.id !== commentId));
      
      alert('댓글이 삭제되었습니다.');
      
    } catch (error: any) {
      console.error('댓글 삭제 실패:', error);
      alert('댓글 삭제에 실패했습니다: ' + error.message);
    }
  };

  const filteredComments = comments
    .filter(comment => 
      comment.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.username.toLowerCase().includes(searchTerm.toLowerCase())
    )
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

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - time.getTime()) / 1000);
    
    if (diffInSeconds < 60) return '방금 전';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}시간 전`;
    return `${Math.floor(diffInSeconds / 86400)}일 전`;
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
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
                <MessageCircle className="h-8 w-8 text-purple-500" />
                댓글 관리
              </h1>
              <p className="text-lg text-muted-foreground mt-2">
                게시물의 댓글을 관리하고 답변하세요
              </p>
            </div>
          </div>
          <Button
            onClick={loadComments}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            새로고침
          </Button>
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
                  { key: 'most_liked', label: '좋아요순' },
                  { key: 'all', label: '전체' }
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

      {/* 댓글 목록 */}
      <div className="space-y-4">
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
          filteredComments.map((comment) => (
            <Card key={comment.id}>
              <CardContent className="p-6">
                {/* 댓글 헤더 */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
                      {comment.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium">@{comment.username}</p>
                      <p className="text-sm text-muted-foreground">{getTimeAgo(comment.timestamp)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
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
                  <p className="text-sm mb-2">{comment.text}</p>
                  <div className="text-xs text-muted-foreground bg-gray-50 p-2 rounded">
                    게시물: {comment.media_caption}
                  </div>
                </div>

                {/* 답글 영역 */}
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
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteComment(comment.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      삭제
                    </Button>
                    
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
                          <Reply className="h-3 w-3 mr-1" />
                          답글 작성
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* 요약 정보 */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-lg">댓글 요약</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">{comments.length}</p>
              <p className="text-sm text-muted-foreground">총 댓글 수</p>
            </div>
            <div>
              <p className="text-2xl font-bold">
                {comments.reduce((sum, c) => sum + c.like_count, 0)}
              </p>
              <p className="text-sm text-muted-foreground">총 좋아요</p>
            </div>
            <div>
              <p className="text-2xl font-bold">
                {new Set(comments.map(c => c.media_id)).size}
              </p>
              <p className="text-sm text-muted-foreground">댓글 있는 게시물</p>
            </div>
            <div>
              <p className="text-2xl font-bold">
                {comments.filter(c => 
                  new Date().getTime() - new Date(c.timestamp).getTime() < 24 * 60 * 60 * 1000
                ).length}
              </p>
              <p className="text-sm text-muted-foreground">24시간 내 댓글</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstagramCommentsPage;