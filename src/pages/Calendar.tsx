import { useState, useEffect } from "react";
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
  Moon
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
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [draggedContent, setDraggedContent] = useState<any>(null);
  const [businessType, setCurrentBusinessType] = useState<BusinessType>(getCurrentBusinessType());
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  
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
    // 데모용: 특정 날짜에 이벤트 표시
    const dayEvents = [];
    if (day === 15) dayEvents.push(calendarEvents[0]);
    if (day === 18 && calendarEvents[1]) dayEvents.push(calendarEvents[1]);
    if (day === 22 && calendarEvents[2]) dayEvents.push(calendarEvents[2]);
    if (day === 25 && calendarEvents[3]) dayEvents.push(calendarEvents[3]);
    return dayEvents;
  };

  const handleDragStart = (content: any) => {
    setDraggedContent(content);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, day: number) => {
    e.preventDefault();
    if (draggedContent) {
      const dateKey = formatDateKey(day);
      const newEvent: CalendarEvent = {
        id: Date.now(),
        title: draggedContent.copy.title,
        time: "10:00",
        type: "post",
        platform: "both",
        status: "scheduled",
        content: draggedContent.copy.description,
        imageUrl: draggedContent.image
      };
      setCalendarEvents(prev => [...prev, newEvent]);
      setDraggedContent(null);
      
      // 피드백 메시지
      setSelectedDate(dateKey);
      setTimeout(() => setSelectedDate(null), 3000);
    }
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
      case 'reel': return <Video className="h-3 w-3" />;
      default: return <ImageIcon className="h-3 w-3" />;
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

  return (
    <div className="page-container">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">SNS 콘텐츠 캘린더</h1>
              <p className="text-lg text-muted-foreground">
                전략적인 콘텐츠 일정 관리로 효과적인 마케팅을 실현하세요
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
                variant="outline" 
                onClick={() => navigate('/studio')}
              >
                <Palette className="mr-2 h-5 w-5" />
                콘텐츠 생성
              </Button>
            </div>
          </div>

          {/* 업종 정보 표시 */}
          <Card className="mb-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg mb-1">{businessPersonas[businessType].name}</h3>
                  <p className="text-sm text-muted-foreground">{businessPersonas[businessType].description}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary">타겟: {businessPersonas[businessType].target}</Badge>
                    <Badge variant="outline">{businessPersonas[businessType].style}</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium mb-1">추천 해시태그</p>
                  <div className="flex flex-wrap gap-1 justify-end">
                    {businessPersonas[businessType].keywords.slice(0, 3).map(keyword => (
                      <span key={keyword} className="text-xs text-blue-600">#{keyword}</span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* 왼쪽 사이드바 */}
          <div className="xl:col-span-1 space-y-6">
            {/* 생성된 콘텐츠 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-yellow-500" />
                  준비된 콘텐츠
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
                    className="p-3 border rounded-lg cursor-move hover:shadow-md transition-all bg-card hover:border-purple-300"
                  >
                    <div className="aspect-video bg-gray-100 rounded mb-2 overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                        <ImageIcon className="h-8 w-8 text-gray-400" />
                      </div>
                    </div>
                    <p className="text-sm font-medium line-clamp-2 mb-2">
                      {content.copy.title}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {content.features.slice(0, 2).map((feature) => (
                        <Badge key={feature} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
                
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/studio')}
                  className="w-full"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  콘텐츠 생성하기
                </Button>
              </CardContent>
            </Card>

            {/* 최적 게시 시간 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  최적 게시 시간
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium mb-2">골든 타임</p>
                    <div className="space-y-1">
                      {postingSchedule.bestTimes.map((time, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{time}</span>
                          {idx === 0 && <Badge variant="default" className="text-xs">최고</Badge>}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t">
                    <p className="text-sm font-medium mb-2">타겟 고객 활동 시간</p>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div className="flex items-center gap-2">
                        <Users className="h-3 w-3" />
                        <span>{businessPersonas[businessType].target}</span>
                      </div>
                      <p className="pl-5">
                        {businessType === 'bedding' 
                          ? '아침 준비시간, 점심시간, 저녁 휴식시간'
                          : '출퇴근 시간, 점심시간, 저녁 여가시간'}
                      </p>
                    </div>
                  </div>
                </div>
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
                          onClick={() => setCurrentDate(new Date())}
                        >
                          오늘
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
                                ? isToday 
                                  ? "bg-purple-50 border-purple-300 hover:bg-purple-100"
                                  : "bg-card hover:bg-accent/50 cursor-pointer"
                                : "bg-muted/20"
                            } ${selectedDate === formatDateKey(day!) ? 'ring-2 ring-green-500' : ''}`}
                            onDragOver={day ? handleDragOver : undefined}
                            onDrop={day ? (e) => handleDrop(e, day) : undefined}
                          >
                            {day && (
                              <>
                                <div className="flex justify-between items-start mb-2">
                                  <span className={`text-sm font-semibold ${isToday ? 'text-purple-700' : ''}`}>
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
                          onClick={() => setCurrentDate(new Date())}
                        >
                          오늘
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
                        return (
                          <div key={idx} className={`border rounded-lg p-3 min-h-[200px] ${
                            isToday ? 'bg-purple-50 border-purple-300' : 'bg-card'
                          }`}>
                            <div className="text-center mb-2">
                              <p className="text-xs text-muted-foreground">{dayNames[date.getDay()]}</p>
                              <p className={`text-lg font-semibold ${isToday ? 'text-purple-700' : ''}`}>
                                {date.getDate()}
                              </p>
                            </div>
                            <div className="space-y-1">
                              {/* 주간 뷰 이벤트 표시 */}
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

            {/* 빠른 작업 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">빠른 작업</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Button variant="outline" className="justify-start" onClick={() => navigate('/instagram')}>
                    <Plus className="mr-2 h-4 w-4" />
                    새 게시물
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Edit className="mr-2 h-4 w-4" />
                    일정 수정
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Hash className="mr-2 h-4 w-4" />
                    해시태그 관리
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    성과 분석
                  </Button>
                </div>
              </CardContent>
            </Card>
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