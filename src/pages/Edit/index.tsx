import { useParams } from 'react-router-dom';

import { useGetPersonalEvents } from '@/api/hooks/Calendar/useGetPersonalEvents';
import { useGetMeetingInfo } from '@/api/hooks/Meeting/useGetMeetingInfo';
import { Container } from '@/components/common/layouts/Container';
import { EditBtn } from '@/components/features/Edit/EditBtn';
import { EditNonPreferences } from '@/components/features/Edit/EditNonPreferences';
import { EditPreferences } from '@/components/features/Edit/EditPreferences';
import { JoinCalendar } from '@/components/features/Join/JoinCalendar';
import { JoinTitle } from '@/components/features/Join/JoinTitle';
import { JoinFormProvider } from '@/hooks/useJoinFormContext';
import { convertToInitialTimes } from '@/utils/calendar/converter';

export const EditPage: React.FC = () => {
  const { meetingId } = useParams<{ meetingId: string }>();
  const { data: meetingInfo, status: meetingStatus } = useGetMeetingInfo(meetingId || '');
  const { data: personalEvents, status: personalStatus } = useGetPersonalEvents(meetingId || '');

  if (!meetingId || meetingStatus === 'pending' || personalStatus === 'pending') {
    return <div>Loading...</div>;
  }
  if (meetingStatus === 'error' || personalStatus === 'error') return <div>Error</div>;

  const initialSelectedTimes = convertToInitialTimes(personalEvents);

  const { title, startDate, endDate, startTime, endTime } = meetingInfo;

  return (
    <JoinFormProvider
      initialData={{ times: initialSelectedTimes, preferences: [], nonPreferences: [] }}
    >
      <Container gap="40px">
        <JoinTitle title={title} />
        <JoinCalendar
          meetingId={meetingId}
          startDate={startDate}
          endDate={endDate}
          startTime={startTime}
          endTime={endTime}
        />
        <EditPreferences meetingId={meetingId} />
        <EditNonPreferences meetingId={meetingId} />
        <EditBtn meetingId={meetingId} />
      </Container>
    </JoinFormProvider>
  );
};
