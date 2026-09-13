import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import {
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  isWithinInterval,
  isBefore,
  isAfter,
  addYears,
  subYears,
  format,
  parseISO,
} from 'date-fns';
import { tr } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, ArrowRight, Loader2, CalendarDays, MapPin, Clock } from 'lucide-react';
import { Modal } from '@/components/shared/Modal';
import { supabase } from '@/api/config';
import { calendarEntryTypeConfig, CalendarEntryType } from '@/utils/calendarEntryTypes';

interface DayItem {
  key: string;
  title: string;
  color: string;
  typeLabel: string;
  kind: 'event' | 'entry';
  eventId?: string;
  time?: string;
  location?: string;
}

const EVENT_COLOR = 'var(--brand-primary)';

export function EventsCalendar({ events }: { events: any[] }) {
  const today = useMemo(() => new Date(), []);
  const minDate = useMemo(() => subYears(today, 1), [today]);
  const maxDate = useMemo(() => addYears(today, 1), [today]);

  const [visibleMonth, setVisibleMonth] = useState(startOfMonth(today));
  const [calendarEntries, setCalendarEntries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  useEffect(() => {
    const fetchEntries = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('calendar_entries')
          .select('*')
          .order('start_date', { ascending: true });
        if (error) throw error;
        setCalendarEntries(data || []);
      } catch (err) {
        console.error('Akademik takvim kayıtları çekilemedi:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEntries();
  }, []);

  // Her gün için o güne ait etkinlik/tatil/sınav haftası kayıtlarını haritalar
  const dayItemsMap = useMemo(() => {
    const map = new Map<string, DayItem[]>();

    const pushItem = (dateKey: string, item: DayItem) => {
      const list = map.get(dateKey) || [];
      list.push(item);
      map.set(dateKey, list);
    };

    (events || []).forEach((ev) => {
      if (!ev?.date) return;
      const d = new Date(ev.date);
      const dateKey = format(d, 'yyyy-MM-dd');
      pushItem(dateKey, {
        key: `event-${ev.id}`,
        title: ev.title,
        color: EVENT_COLOR,
        typeLabel: 'Kulüp Etkinliği',
        kind: 'event',
        eventId: ev.id,
        time: format(d, 'HH:mm'),
        location: ev.location,
      });
    });

    calendarEntries.forEach((entry) => {
      const start = parseISO(entry.start_date);
      const end = entry.end_date ? parseISO(entry.end_date) : start;
      const conf = calendarEntryTypeConfig[entry.type as CalendarEntryType] || calendarEntryTypeConfig.diger;
      try {
        eachDayOfInterval({ start, end }).forEach((d) => {
          const dateKey = format(d, 'yyyy-MM-dd');
          pushItem(dateKey, {
            key: `entry-${entry.id}-${dateKey}`,
            title: entry.title,
            color: conf.color,
            typeLabel: conf.label,
            kind: 'entry',
          });
        });
      } catch {
        // geçersiz tarih aralığı - atla
      }
    });

    return map;
  }, [events, calendarEntries]);

  const gridDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(visibleMonth), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(visibleMonth), { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  }, [visibleMonth]);

  const canGoPrev = isAfter(startOfMonth(visibleMonth), startOfMonth(minDate));
  const canGoNext = isBefore(startOfMonth(visibleMonth), startOfMonth(maxDate));

  const goPrev = () => canGoPrev && setVisibleMonth((m) => subMonths(m, 1));
  const goNext = () => canGoNext && setVisibleMonth((m) => addMonths(m, 1));
  const goToday = () => setVisibleMonth(startOfMonth(today));

  const selectedDayItems = selectedDay ? dayItemsMap.get(format(selectedDay, 'yyyy-MM-dd')) || [] : [];

  const weekDayLabels = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

  return (
    <div className="bg-elevated border border-default rounded-dynamic shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 sm:p-6 border-b border-default">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-primary capitalize">
            {format(visibleMonth, 'LLLL yyyy', { locale: tr })}
          </h3>
          <p className="text-xs text-muted font-medium mt-0.5">
            {isLoading ? 'Takvim yükleniyor...' : `${format(minDate, 'MMM yyyy', { locale: tr })} – ${format(maxDate, 'MMM yyyy', { locale: tr })} arası`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={goToday}
            className="px-3 py-2 text-xs font-bold rounded-lg border border-default bg-surface hover:bg-page text-muted hover:text-primary transition-colors cursor-pointer"
          >
            Bugün
          </button>
          <button
            onClick={goPrev}
            disabled={!canGoPrev}
            className="p-2 rounded-lg border border-default bg-surface hover:bg-page text-muted hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            title="Önceki Ay"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={goNext}
            disabled={!canGoNext}
            className="p-2 rounded-lg border border-default bg-surface hover:bg-page text-muted hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            title="Sonraki Ay"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekday labels */}
      <div className="grid grid-cols-7 border-b border-default bg-surface">
        {weekDayLabels.map((d) => (
          <div key={d} className="py-2 text-center text-[10px] sm:text-xs font-bold text-muted uppercase tracking-wider">
            {d}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7">
        {gridDays.map((day) => {
          const dateKey = format(day, 'yyyy-MM-dd');
          const items = dayItemsMap.get(dateKey) || [];
          const inMonth = isSameMonth(day, visibleMonth);
          const isCurrentDay = isToday(day);
          const inRange = isWithinInterval(day, { start: minDate, end: maxDate });
          const visibleItems = items.slice(0, 3);
          const extraCount = items.length - visibleItems.length;

          return (
            <button
              key={dateKey}
              disabled={!inRange || items.length === 0}
              onClick={() => setSelectedDay(day)}
              className={`relative flex flex-col items-start gap-1 min-h-[64px] sm:min-h-[92px] p-1.5 sm:p-2 border-b border-r border-default text-left transition-colors
                ${inMonth ? 'bg-page' : 'bg-surface/40'}
                ${inRange && items.length > 0 ? 'hover:bg-surface cursor-pointer' : 'cursor-default'}
              `}
            >
              <span
                className={`inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full text-[11px] sm:text-xs font-bold
                  ${isCurrentDay ? 'bg-[var(--brand-primary)] text-white' : inMonth ? 'text-primary' : 'text-muted opacity-50'}
                `}
              >
                {format(day, 'd')}
              </span>
              <div className="flex flex-col gap-0.5 w-full">
                {visibleItems.map((item) => (
                  <span
                    key={item.key}
                    className="hidden sm:block truncate text-[10px] font-bold px-1.5 py-0.5 rounded-sm"
                    style={{ color: item.color, backgroundColor: `${item.color}18` }}
                    title={item.title}
                  >
                    {item.title}
                  </span>
                ))}
                {/* Mobile: sadece nokta göster */}
                {items.length > 0 && (
                  <div className="flex sm:hidden items-center gap-1 flex-wrap">
                    {items.slice(0, 4).map((item) => (
                      <span key={item.key} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                    ))}
                  </div>
                )}
                {extraCount > 0 && (
                  <span className="hidden sm:block text-[10px] font-bold text-muted">+{extraCount} daha</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 p-4 sm:px-6 border-t border-default bg-surface">
        <span className="flex items-center gap-2 text-xs font-bold text-muted">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: EVENT_COLOR }} /> Kulüp Etkinliği
        </span>
        {Object.entries(calendarEntryTypeConfig).map(([key, conf]) => (
          <span key={key} className="flex items-center gap-2 text-xs font-bold text-muted">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: conf.color }} /> {conf.label}
          </span>
        ))}
      </div>

      {isLoading && (
        <div className="flex items-center justify-center gap-2 py-4 text-muted text-xs border-t border-default">
          <Loader2 className="w-3.5 h-3.5 animate-spin" /> Akademik takvim yükleniyor...
        </div>
      )}

      {/* Day Detail Modal */}
      <Modal
        isOpen={selectedDay !== null}
        onClose={() => setSelectedDay(null)}
        title={selectedDay ? format(selectedDay, 'd MMMM yyyy, EEEE', { locale: tr }) : ''}
      >
        <div className="space-y-3">
          {selectedDayItems.length === 0 ? (
            <div className="text-center text-muted py-6 flex flex-col items-center gap-2">
              <CalendarDays className="w-8 h-8 opacity-30" />
              <p>Bu tarihte kayıt bulunmuyor.</p>
            </div>
          ) : (
            selectedDayItems.map((item) => {
              const content = (
                <div
                  className="flex items-start gap-3 p-4 rounded-xl border border-default bg-surface hover:bg-page transition-colors"
                  style={{ borderLeftColor: item.color, borderLeftWidth: 3 }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: item.color }}>
                      {item.typeLabel}
                    </div>
                    <div className="font-bold text-primary">{item.title}</div>
                    {(item.time || item.location) && (
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-xs font-medium text-muted">
                        {item.time && <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {item.time}</span>}
                        {item.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {item.location}</span>}
                      </div>
                    )}
                  </div>
                  {item.kind === 'event' && (
                    <ArrowRight className="w-4 h-4 text-muted flex-shrink-0 mt-1" />
                  )}
                </div>
              );

              return item.kind === 'event' && item.eventId ? (
                <Link key={item.key} to={`/etkinlikler/${item.eventId}`} onClick={() => setSelectedDay(null)} className="block">
                  {content}
                </Link>
              ) : (
                <div key={item.key}>{content}</div>
              );
            })
          )}
        </div>
      </Modal>
    </div>
  );
}
