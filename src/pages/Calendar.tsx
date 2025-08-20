import { useState, useEffect } from "react";
import { useAuth } from "@/context/MockAuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Plus, 
  Edit, 
  Eye,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Palette,
  Target,
  TrendingUp,
  Users,
  Hash,
  MessageSquare,
  Image as ImageIcon,
  Video,
  FileText,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Coffee,
  Moon,
  Play
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { 
  getCurrentBusinessType, 
  setBusinessType, 
  calendarEventsByType,
  generatedContentByType,
  businessPersonas,
  type BusinessType 
} from "@/utils/businessPersona";

interface CalendarEvent {
  id: number;
  title: string;
  time: string;
  type: 'post' | 'story' | 'reel';
  platform: 'facebook' | 'instagram' | 'both';
  status: 'scheduled' | 'published' | 'draft';
  content?: string;
  imageUrl?: string;
  date?: string;
}

interface PostingSchedule {
  bestTimes: string[];
  weeklyPlan: {
    day: string;
    posts: number;
    bestTime: string;
  }[];
}

const CalendarPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [draggedContent, setDraggedContent] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [pendingEvent, setPendingEvent] = useState<{content: any, day: number} | null>(null);
  const [selectedTime, setSelectedTime] = useState('10:00');
  const [selectedType, setSelectedType] = useState<'post' | 'story' | 'reel'>('post');
  const [customEvents, setCustomEvents] = useState<CalendarEvent[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragScrollInterval, setDragScrollInterval] = useState<NodeJS.Timeout | null>(null);
  const [lastMouseY, setLastMouseY] = useState(0);
  
  // user.business 정보를 기반으로 업종 자동 결정
  const getBusinessTypeFromUser = (): BusinessType => {
    if (user?.business?.includes('침구') || user?.business?.includes('bedding')) {
      return 'bedding';
    } else if (user?.business?.includes('수공예') || user?.business?.includes('handcraft') || user?.business?.includes('액세서리')) {
      return 'handcraft';
    }
    return getCurrentBusinessType();
  };
  
  const [businessType, setCurrentBusinessType] = useState<BusinessType>(getBusinessTypeFromUser());
  
  // 업종별 캘린더 이벤트
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(
    calendarEventsByType[businessType]
  );
  
  // 업종별 생성된 콘텐츠
  const [generatedContent, setGeneratedContent] = useState(
    generatedContentByType[businessType]
  );

  // 최적 게시 시간 데이터
  const postingSchedule: PostingSchedule = {
    bestTimes: businessType === 'bedding' 
      ? ['09:00-10:00', '14:00-15:00', '20:00-21:00']
      : ['11:00-12:00', '15:00-16:00', '19:00-20:00'],
    weeklyPlan: [
      { day: '월요일', posts: 1, bestTime: '10:00' },
      { day: '화요일', posts: 2, bestTime: '14:00' },
      { day: '수요일', posts: 1, bestTime: '20:00' },
      { day: '목요일', posts: 2, bestTime: '11:00' },
      { day: '금요일', posts: 3, bestTime: '15:00' },
      { day: '토요일', posts: 2, bestTime: '19:00' },
      { day: '일요일', posts: 1, bestTime: '20:00' }
    ]
  };

  useEffect(() => {
    // 업종 변경 시 데이터 업데이트
    setCalendarEvents(calendarEventsByType[businessType]);
    setGeneratedContent(generatedContentByType[businessType]);
  }, [businessType]);
  
  
  // 간단한 스크롤 체크
  useEffect(() => {
    let animationFrame: number;
    
    const checkScroll = () => {
      if (isDragging) {
        const scrollThreshold = 100;
        const scrollSpeed = 8;
        const viewportHeight = window.innerHeight;
        
        // 하단 스크롤
        if (lastMouseY > viewportHeight - scrollThreshold) {
          window.scrollBy(0, scrollSpeed);
        }
        // 상단 스크롤
        else if (lastMouseY < scrollThreshold) {
          window.scrollBy(0, -scrollSpeed);
        }
        
        animationFrame = requestAnimationFrame(checkScroll);
      }
    };
    
    if (isDragging) {
      checkScroll();
    }
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isDragging, lastMouseY]);

  const handleBusinessTypeChange = (type: BusinessType) => {
    setCurrentBusinessType(type);
    setBusinessType(type);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const getWeekDays = () => {
    const startOfWeek = new Date(currentDate);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);
    
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDays.push(date);
    }
    return weekDays;
  };

  const formatDateKey = (day: number) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const getEventsForDay = (day: number) => {
    const dayEvents = [];
    const today = new Date();
    const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const daysDiff = Math.floor((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const isPastDate = daysDiff < 0;
    
    // 오늘 기준으로 동적 이벤트 배치
    if (daysDiff === -5 && calendarEvents[0]) {
      // 5일 전: 게시 완료
      dayEvents.push({...calendarEvents[0], status: 'published'});
    }
    if (daysDiff === -2 && calendarEvents[1]) {
      // 2일 전: 게시 완료
      dayEvents.push({...calendarEvents[1], status: 'published'});
    }
    if (daysDiff === -1 && businessType === 'handcraft' && calendarEvents[1]) {
      // 어제: 게시 완료 (수공예품만)
      dayEvents.push({...calendarEvents[1], status: 'published'});
    }
    if (daysDiff === 2 && calendarEvents[2]) {
      // 2일 후: 예약됨 또는 과거면 게시완료
      dayEvents.push({...calendarEvents[2], status: isPastDate ? 'published' : 'scheduled'});
    }
    if (daysDiff === 3 && businessType === 'handcraft' && calendarEvents[2]) {
      // 3일 후: 예약됨 또는 과거면 게시완료 (수공예품만)
      dayEvents.push({...calendarEvents[2], status: isPastDate ? 'published' : 'scheduled'});
    }
    if (daysDiff === 5 && calendarEvents[3]) {
      // 5일 후: 예약됨 또는 과거면 게시완료
      dayEvents.push({...calendarEvents[3], status: isPastDate ? 'published' : 'scheduled'});
    }
    if (daysDiff === 6 && businessType === 'handcraft' && calendarEvents[3]) {
      // 6일 후: 예약됨 또는 과거면 게시완료 (수공예품만)
      dayEvents.push({...calendarEvents[3], status: isPastDate ? 'published' : 'scheduled'});
    }
    if (daysDiff === 7 && calendarEvents[4]) {
      // 7일 후: 임시저장 또는 과거면 예약상태로
      dayEvents.push({...calendarEvents[4], status: isPastDate ? 'scheduled' : 'draft'});
    }
    if (daysDiff === 8 && businessType === 'handcraft' && calendarEvents[4]) {
      // 8일 후: 임시저장 또는 과거면 예약상태로 (수공예품만)
      dayEvents.push({...calendarEvents[4], status: isPastDate ? 'scheduled' : 'draft'});
    }
    
    // 커스텀 이벤트 (드래그로 추가된 이벤트들)
    const dateKey = formatDateKey(day);
    const customEventsForDay = customEvents.filter(event => event.date === dateKey);
    dayEvents.push(...customEventsForDay.map(event => ({
      ...event,
      status: isPastDate ? 'published' : event.status
    })));
    
    return dayEvents;
  };

  const handleDragStart = (content: any) => {
    setDraggedContent(content);
    setIsDragging(true);
  };
  
  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedContent(null);
    setLastMouseY(0);
  };
  
  const handleDragMove = (e: React.DragEvent) => {
    if (isDragging) {
      setLastMouseY(e.clientY);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (isDragging) {
      setLastMouseY(e.clientY);
    }
  };

  const handleDrop = (e: React.DragEvent, day: number) => {
    e.preventDefault();
    
    // 과거 날짜에는 드래그 방지
    const today = new Date();
    const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const isPastDate = targetDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    if (isPastDate) {
      // 과거 날짜에 드롭 시도 시 조용히 무시
      setDraggedContent(null);
      return;
    }
    
    if (draggedContent) {
      // 모달 열고 시간 설정 대기
      setPendingEvent({content: draggedContent, day});
      setShowTimeModal(true);
      setDraggedContent(null);
    }
  };
  
  const handleTimeModalConfirm = () => {
    if (pendingEvent) {
      const dateKey = formatDateKey(pendingEvent.day);
      const newEvent: CalendarEvent = {
        id: Date.now(),
        title: pendingEvent.content.copy.title,
        time: selectedTime,
        type: selectedType,
        platform: "both",
        status: "scheduled",
        content: pendingEvent.content.copy.description,
        imageUrl: pendingEvent.content.image,
        date: dateKey
      };
      
      setCustomEvents(prev => [...prev, newEvent]);
      setShowTimeModal(false);
      setPendingEvent(null);
      
      // 성공 피드백
      setSelectedDate(dateKey);
      setTimeout(() => setSelectedDate(null), 3000);
    }
  };
  
  const handleTimeModalCancel = () => {
    setShowTimeModal(false);
    setPendingEvent(null);
    setSelectedTime('10:00');
    setSelectedType('post');
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      const weekOffset = direction === 'prev' ? -7 : 7;
      newDate.setDate(prev.getDate() + weekOffset);
      return newDate;
    });
  };

  const monthNames = [
    "1월", "2월", "3월", "4월", "5월", "6월",
    "7월", "8월", "9월", "10월", "11월", "12월"
  ];

  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

  const getContentTypeIcon = (type: string) => {
    switch(type) {
      case 'post': return <ImageIcon className="h-3 w-3" />;
      case 'story': return <FileText className="h-3 w-3" />;
      case 'reel': return (
        <div className="relative">
          <Video className="h-3 w-3" />
          <Play className="h-2 w-2 absolute -top-0.5 -right-0.5 text-white bg-black rounded-full p-0.5" />
        </div>
      );
      default: return <ImageIcon className="h-3 w-3" />;
    }
  };
  
  const getContentTypeLabel = (type: string) => {
    switch(type) {
      case 'post': return '피드';
      case 'story': return '스토리';
      case 'reel': return '릴스';
      default: return '피드';
    }
  };
  
  const getProductName = (businessType: BusinessType, contentId: number) => {
    if (businessType === 'bedding') {
      switch(contentId) {
        case 1: return '구스 이불';
        case 2: return '호텔 침구세트';
        default: return '침구 제품';
      }
    } else {
      switch(contentId) {
        case 1: return '이니셜 목걸이';
        case 2: return '플라워 귀걸이';
        default: return '수공예 제품';
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'scheduled': return 'bg-blue-500';
      case 'published': return 'bg-green-500';
      case 'draft': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };
  
  // 상태별 한글 라벨
  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'scheduled': return '예약됨';
      case 'published': return '게시완료';
      case 'draft': return '임시저장';
      default: return '알 수 없음';
    }
  };

  return (
    <div className="page-container">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">SNS 콘텐츠 캘린더</h1>
              <p className="text-lg text-muted-foreground">
                콘텐츠 일정 관리로 효과적인 마케팅을 실현하세요
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => navigate('/studio')}
              >
                <Palette className="mr-2 h-5 w-5" />
                콘텐츠 생성
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6" onDragOver={handleDragOver}>
          {/* 왼쪽 사이드바 */}
          <div className="xl:col-span-1 space-y-6">
            {/* 생성된 콘텐츠 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <ImageIcon className="h-5 w-5" />
                  생성된 콘텐츠
                </CardTitle>
                <CardDescription>
                  드래그하여 캘린더에 배치하세요
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {generatedContent.map((content) => (
                  <div
                    key={content.id}
                    draggable
                    onDragStart={() => handleDragStart(content)}
                    onDragEnd={handleDragEnd}
                    onDrag={handleDragMove}
                    className="p-3 border rounded-lg cursor-move hover:shadow-md transition-all bg-card hover:border-purple-300"
                  >
                    <div className="aspect-video bg-gray-100 rounded mb-3 overflow-hidden relative">
                      <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                        {/* 콘텐츠 유형에 따른 아이콘 */}
                        {content.id === 1 ? (
                          <ImageIcon className="h-8 w-8 text-gray-400" />
                        ) : content.id === 2 ? (
                          <div className="relative">
                            <Video className="h-8 w-8 text-gray-400" />
                            <Play className="h-4 w-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white bg-black bg-opacity-60 rounded-full p-1" />
                          </div>
                        ) : (
                          <FileText className="h-8 w-8 text-gray-400" />
                        )}
                      </div>
                    </div>
                    <p className="text-sm font-medium mb-2">
                      {getProductName(businessType, content.id)}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                      {content.copy.title}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge 
                        variant={content.id === 1 ? 'default' : content.id === 2 ? 'destructive' : 'secondary'} 
                        className="text-xs"
                      >
                        {content.id === 1 ? '피드' : content.id === 2 ? '릴스' : '스토리'}
                      </Badge>
                      <div className="flex gap-1">
                        {content.features.slice(0, 1).map((feature) => (
                          <Badge key={feature} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/studio')}
                  className="w-full"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* 메인 캘린더 영역 */}
          <div className="xl:col-span-3 space-y-6">
            {/* 뷰 모드 탭 */}
            <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'month' | 'week')}>
              <TabsList className="grid w-full max-w-[200px] grid-cols-2">
                <TabsTrigger value="month">월간</TabsTrigger>
                <TabsTrigger value="week">주간</TabsTrigger>
              </TabsList>

              <TabsContent value="month" className="mt-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl flex items-center">
                        <CalendarIcon className="mr-3 h-6 w-6" />
                        {currentDate.getFullYear()}년 {monthNames[currentDate.getMonth()]}
                      </CardTitle>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => navigateMonth('prev')}
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => navigateMonth('next')}
                        >
                          <ChevronRight className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* 요일 헤더 */}
                    <div className="grid grid-cols-7 gap-2 mb-4">
                      {dayNames.map((day) => (
                        <div
                          key={day}
                          className="p-3 text-center font-semibold text-muted-foreground"
                        >
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* 달력 그리드 */}
                    <div className="grid grid-cols-7 gap-2">
                      {getDaysInMonth(currentDate).map((day, index) => {
                        const isToday = day === new Date().getDate() && 
                                       currentDate.getMonth() === new Date().getMonth() &&
                                       currentDate.getFullYear() === new Date().getFullYear();
                        const events = day ? getEventsForDay(day) : [];
                        
                        return (
                          <div
                            key={index}
                            className={`min-h-[120px] p-2 border rounded-lg transition-all ${
                              day
                                ? (() => {
                                    const today = new Date();
                                    const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                                    const isPastDate = targetDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
                                    
                                    if (isToday) {
                                      return "bg-purple-50 border-purple-300 hover:bg-purple-100";
                                    } else if (isPastDate) {
                                      return "bg-gray-100 border-gray-200";
                                    } else {
                                      return "bg-card hover:bg-accent/50";
                                    }
                                  })()
                                : "bg-muted/20"
                            } ${selectedDate === formatDateKey(day!) ? 'ring-2 ring-green-500' : ''}`}
                            onDragOver={day && !(() => {
                              const today = new Date();
                              const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                              return targetDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
                            })() ? handleDragOver : undefined}
                            onDrop={day && !(() => {
                              const today = new Date();
                              const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                              return targetDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
                            })() ? (e) => handleDrop(e, day) : undefined}
                            onDragEnter={(e) => handleDragMove(e)}
                          >
                            {day && (
                              <>
                                <div className="flex justify-between items-start mb-2">
                                  <span className={`text-sm font-semibold ${
                                    isToday 
                                      ? 'text-purple-700' 
                                      : ''
                                  }`}>
                                    {day}
                                  </span>
                                  {events.length > 0 && (
                                    <Badge variant="secondary" className="text-xs px-1">
                                      {events.length}
                                    </Badge>
                                  )}
                                </div>
                                <div className="space-y-1">
                                  {events.map((event) => (
                                    <div
                                      key={event.id}
                                      onClick={() => setSelectedEvent(event)}
                                      className={`text-xs p-1.5 rounded text-white cursor-pointer hover:opacity-80 ${getStatusColor(event.status)}`}
                                    >
                                      <div className="flex items-center gap-1">
                                        {getContentTypeIcon(event.type)}
                                        <span className="truncate">{event.time}</span>
                                      </div>
                                      <div className="line-clamp-1 mt-0.5">
                                        {event.title}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="week" className="mt-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl">주간 일정</CardTitle>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => navigateWeek('prev')}
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => navigateWeek('next')}
                        >
                          <ChevronRight className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-7 gap-2">
                      {getWeekDays().map((date, idx) => {
                        const isToday = date.toDateString() === new Date().toDateString();
                        const day = date.getDate();
                        const events = getEventsForDay(day);
                        const isPastDate = date < new Date(new Date().setHours(0,0,0,0));
                        
                        return (
                          <div 
                            key={idx} 
                            className={`border rounded-lg p-3 min-h-[200px] ${
                              isToday 
                                ? 'bg-purple-50 border-purple-300' 
                                : isPastDate 
                                ? 'bg-gray-100 border-gray-200'
                                : 'bg-card hover:bg-accent/50'
                            }`}
                            onDragOver={!isPastDate ? handleDragOver : undefined}
                            onDrop={!isPastDate ? (e) => handleDrop(e, day) : undefined}
                          >
                            <div className="text-center mb-3">
                              <p className="text-xs text-muted-foreground">{dayNames[date.getDay()]}</p>
                              <p className={`text-lg font-semibold ${isToday ? 'text-purple-700' : ''}`}>
                                {date.getDate()}
                              </p>
                              {events.length > 0 && (
                                <Badge variant="secondary" className="text-xs mt-1">
                                  {events.length}개
                                </Badge>
                              )}
                            </div>
                            <div className="space-y-2">
                              {events.map((event) => (
                                <div
                                  key={event.id}
                                  onClick={() => setSelectedEvent(event)}
                                  className={`text-xs p-2 rounded text-white cursor-pointer hover:opacity-80 ${getStatusColor(event.status)}`}
                                >
                                  <div className="flex items-center gap-1 mb-1">
                                    {getContentTypeIcon(event.type)}
                                    <span className="truncate font-medium">{event.time}</span>
                                  </div>
                                  <div className="line-clamp-2">
                                    {event.title}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* 통계 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">이번 달 게시물</p>
                      <p className="text-2xl font-bold">{calendarEvents.length}</p>
                    </div>
                    <ImageIcon className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">예약된 콘텐츠</p>
                      <p className="text-2xl font-bold">
                        {calendarEvents.filter(e => e.status === 'scheduled').length}
                      </p>
                    </div>
                    <Clock className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">게시 완료</p>
                      <p className="text-2xl font-bold">
                        {calendarEvents.filter(e => e.status === 'published').length}
                      </p>
                    </div>
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">임시저장</p>
                      <p className="text-2xl font-bold">
                        {calendarEvents.filter(e => e.status === 'draft').length}
                      </p>
                    </div>
                    <FileText className="h-8 w-8 text-gray-500" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* 선택된 이벤트 상세 모달 */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedEvent(null)}>
            <Card className="max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{selectedEvent.title}</span>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedEvent(null)}>
                    ×
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                    <ImageIcon className="h-12 w-12 text-gray-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{selectedEvent.time}</span>
                    <Badge variant={selectedEvent.status === 'scheduled' ? 'default' : selectedEvent.status === 'published' ? 'secondary' : 'outline'}>
                      {selectedEvent.status === 'scheduled' ? '예약됨' : selectedEvent.status === 'published' ? '게시완료' : '임시저장'}
                    </Badge>
                  </div>
                  {selectedEvent.content && (
                    <p className="text-sm text-muted-foreground">{selectedEvent.content}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1" onClick={() => navigate('/instagram')}>
                    <Eye className="mr-2 h-4 w-4" />
                    미리보기
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Edit className="mr-2 h-4 w-4" />
                    수정하기
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 시간 설정 모달 */}
        {showTimeModal && pendingEvent && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="max-w-md w-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  게시 일정 설정
                </CardTitle>
                <CardDescription>
                  {pendingEvent.content.copy.title}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">게시 시간</label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'].map(time => (
                        <SelectItem key={time} value={time}>{time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">콘텐츠 유형</label>
                  <Select value={selectedType} onValueChange={(value) => setSelectedType(value as 'post' | 'story' | 'reel')}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="post">
                        <div className="flex items-center gap-2">
                          <ImageIcon className="h-4 w-4" />
                          일반 게시물
                        </div>
                      </SelectItem>
                      <SelectItem value="story">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          스토리
                        </div>
                      </SelectItem>
                      <SelectItem value="reel">
                        <div className="flex items-center gap-2">
                          <Video className="h-4 w-4" />
                          릴스
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <div className="flex gap-2 p-6 pt-0">
                <Button variant="outline" onClick={handleTimeModalCancel} className="flex-1">
                  취소
                </Button>
                <Button onClick={handleTimeModalConfirm} className="flex-1">
                  예약 하기
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* 드래그 성공 피드백 */}
        {selectedDate && (
          <div className="fixed bottom-4 right-4 z-50">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium">콘텐츠가 성공적으로 예약되었습니다!</span>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarPage;