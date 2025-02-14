import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { useGetMyMeeting } from '@/api/hooks/Meeting/useGetMyMeetings';
import { Container } from '@/components/common/layouts/Container';
import { Spacing } from '@/components/common/layouts/Spacing';
import { RouterPath } from '@/routes/path';

import { MeetingList } from './MeetingList';

export const MyMeetingList = () => {
  const { data, status } = useGetMyMeeting();

  if (status === 'error') return <div>Error</div>;

  if (status === 'pending') return <div>Loading...</div>;

  const { confirmedMeetings, nonConfirmedMeetings } = data;

  return (
    <Wrapper>
      <Container maxWidth="" flexDirection="row" alignItems="center" gap="2rem">
        <MyMeetingSectionTitle>모임 목록</MyMeetingSectionTitle>
        <Link to={RouterPath.create}>
          <MakeMeetingBtn>모임 생성하기 &rarr;</MakeMeetingBtn>
        </Link>
      </Container>
      <Spacing height={36} />
      <MeetingsTitle>확정 대기중인 모임</MeetingsTitle>
      <hr />

      {!!nonConfirmedMeetings.length && <MeetingList meetings={nonConfirmedMeetings} />}
      <Spacing height={52} />
      <MeetingsTitle>확정된 모임</MeetingsTitle>
      <hr />
      {!!confirmedMeetings.length && <MeetingList meetings={confirmedMeetings} showFoodName />}
    </Wrapper>
  );
};

const Wrapper = styled.section``;

const MyMeetingSectionTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: 800;
  user-select: none;
`;

const MakeMeetingBtn = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: #747474;
  text-decoration: underline;
  user-select: none;
`;

const MeetingsTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 500;
  user-select: none;
`;
