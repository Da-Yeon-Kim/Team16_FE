import { useGetMyEvent } from '@/api/hooks/Calendar/useGetMyEvents';
import { DefaultCalendar } from '@/service/Calendar';
import type { Event } from '@/service/Calendar/types';
import { getCurrentDateStrings } from '@/utils/calculator';

export const MyCalendar = () => {
  const duration = getCurrentDateStrings(new Date().toISOString());
  const { data, status } = useGetMyEvent(duration);

  if (status === 'error') {
    return <div>Error</div>;
  }

  if (status === 'pending') {
    return <div>Loading...</div>;
  }

  const events: Event[] = data.map(({ id, title, color, time: { start_at, all_day, end_at } }) => ({
    id: id,
    title: title,
    date: start_at,
    allDay: all_day,
    start: start_at,
    end: end_at,
    backgroundColor: color,
    editable: true,
  }));

  return <DefaultCalendar event={events} />;
};
