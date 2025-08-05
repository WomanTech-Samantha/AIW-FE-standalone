import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Plus, 
  Edit, 
  Eye,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Palette
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface GeneratedContent {
  id: number;
  image: string;
  copy: {
    title: string;
    description: string;
    hashtags: string;
    cta: string;
  };
  features: string[];
  createdAt: string;
  scheduledDate?: string;
  scheduledTime?: string;
}

interface CalendarEvent {
  id: number;
  title: string;
  time: string;
  type: 'post' | 'story' | 'reel';
  platform: 'facebook' | 'instagram' | 'both';
  status: 'scheduled' | 'published' | 'draft';
}

const CalendarPage = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [draggedContent, setDraggedContent] = useState<GeneratedContent | null>(null);

  // Mock calendar events
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([
    {
      id: 1,
      title: "시원한 여름밤을 책임지는 냉감 이불",
      time: "09:00",
      type: "post",
      platform: "both",
      status: "scheduled"
    },
    {
      id: 2,
      title: "우리 집 딱 맞는 사이즈로 맞춤 제작",
      time: "15:00",
      type: "story",
      platform: "instagram",
      status: "scheduled"
    },
    {
      id: 3,
      title: "건강한 잠자리, 항균 처리된 프리미엄 침구",
      time: "19:00",
      type: "reel",
      platform: "instagram",
      status: "draft"
    }
  ]);

  useEffect(() => {
    // Load generated content from localStorage
    const stored = localStorage.getItem('generatedContent');
    if (stored) {
      setGeneratedContent(JSON.parse(stored));
    }
  }, []);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const formatDateKey = (day: number) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const getEventsForDay = (day: number) => {
    const dateKey = formatDateKey(day);
    return calendarEvents.filter(event => {
      // For demo purposes, show events on specific days
      if (day === 15) return event.id === 1;
      if (day === 18) return event.id === 2;
      if (day === 22) return event.id === 3;
      return false;
    });
  };

  const handleDragStart = (content: GeneratedContent) => {
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
        status: "scheduled"
      };
      setCalendarEvents(prev => [...prev, newEvent]);
      setDraggedContent(null);
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

  const monthNames = [
    "1월", "2월", "3월", "4월", "5월", "6월",
    "7월", "8월", "9월", "10월", "11월", "12월"
  ];

  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className="page-container">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">SNS 예약 발행 캘린더</h1>
            <p className="text-lg text-muted-foreground">
              생성된 콘텐츠를 원하는 날짜에 드래그해서 예약하세요
            </p>
          </div>
          <div className="flex space-x-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/studio')}
              className="btn-large"
            >
              <Palette className="mr-2 h-5 w-5" />
              스튜디오로
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/dashboard')}
              className="btn-large"
            >
              <BarChart3 className="mr-2 h-5 w-5" />
              대시보드
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Generated Content Sidebar */}
          <div className="xl:col-span-1">
            <Card className="card-soft">
              <CardHeader>
                <CardTitle className="text-xl">생성된 콘텐츠</CardTitle>
                <CardDescription>
                  아래 콘텐츠를 캘린더로 드래그해서 예약하세요
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {generatedContent.map((content) => (
                  <div
                    key={content.id}
                    draggable
                    onDragStart={() => handleDragStart(content)}
                    className="p-4 border rounded-lg cursor-move hover:shadow-md transition-all bg-card"
                  >
                    <img
                      src={content.image}
                      alt="콘텐츠 이미지"
                      className="w-full h-20 object-cover rounded mb-2"
                    />
                    <p className="text-sm font-medium line-clamp-2">
                      {content.copy.title}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {content.features.slice(0, 2).map((feature) => (
                        <Badge key={feature} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
                
                {generatedContent.length === 0 && (
                  <div className="text-center py-8">
                    <Plus className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-sm text-muted-foreground">
                      마케팅 에셋 생성하기에서<br />
                      콘텐츠를 생성해보세요
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => navigate('/studio')}
                      className="mt-4"
                    >
                      콘텐츠 생성하기
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Calendar */}
          <div className="xl:col-span-3">
            <Card className="card-soft">
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
                {/* Day headers */}
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

                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-2">
                  {getDaysInMonth(currentDate).map((day, index) => (
                    <div
                      key={index}
                      className={`min-h-[120px] p-2 border rounded-lg transition-all ${
                        day
                          ? "bg-card hover:bg-accent/50 cursor-pointer"
                          : "bg-muted/20"
                      }`}
                      onDragOver={day ? handleDragOver : undefined}
                      onDrop={day ? (e) => handleDrop(e, day) : undefined}
                    >
                      {day && (
                        <>
                          <div className="text-lg font-semibold mb-2">{day}</div>
                          <div className="space-y-1">
                            {getEventsForDay(day).map((event) => (
                              <div
                                key={event.id}
                                className={`text-xs p-1 rounded text-white text-center ${
                                  event.status === 'scheduled'
                                    ? 'bg-primary'
                                    : event.status === 'published'
                                    ? 'bg-success'
                                    : 'bg-muted-foreground'
                                }`}
                              >
                                <div className="flex items-center justify-center space-x-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{event.time}</span>
                                </div>
                                <div className="line-clamp-2 mt-1">
                                  {event.title}
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
                <Plus className="mx-auto h-8 w-8 text-primary mb-2" />
                <h3 className="font-semibold">새 게시물 예약</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  캡션 자동완성으로 빠르게 작성
                </p>
              </Card>
              <Card className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
                <Edit className="mx-auto h-8 w-8 text-primary mb-2" />
                <h3 className="font-semibold">예약 수정</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  시간과 내용을 언제든 변경
                </p>
              </Card>
              <Card className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
                <Eye className="mx-auto h-8 w-8 text-primary mb-2" />
                <h3 className="font-semibold">미리보기</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  게시 전 최종 확인
                </p>
              </Card>
            </div>
          </div>
        </div>
    </div>
  );
};

export default CalendarPage;