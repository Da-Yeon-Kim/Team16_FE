import { useMutation } from '@tanstack/react-query';

import type { JoinMeetingRequest, JoinMeetingResponse } from '@/types';

import { baseURL, fetchWithToken } from '../instance';

export const joinMeetingPath = ({ meetingId }: { meetingId: string }) =>
  `${baseURL}/meeting/${meetingId}/join`;

export const joinMeeting = async ({
  meetingId,
  joinData,
}: {
  meetingId: string;
  joinData: JoinMeetingRequest;
}) => {
  const response = await fetchWithToken<JoinMeetingResponse>(joinMeetingPath({ meetingId }), {
    method: 'POST',
    data: joinData,
  });
  return response.data;
};

export const useJoinMeeting = () => {
  return useMutation<
    JoinMeetingResponse,
    Error,
    { meetingId: string; joinData: JoinMeetingRequest }
  >({
    mutationFn: ({ meetingId, joinData }) => joinMeeting({ meetingId, joinData }),
  });
};
