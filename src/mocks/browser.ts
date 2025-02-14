import { setupWorker } from 'msw';

import { calendarMockHandler } from '@/api/mock/calendar.mock';
import { foodMockHandler } from '@/api/mock/food.mock'
import { meetingMockHandler } from '@/api/mock/meeting.mock';
import { userMockhandler } from '@/api/mock/user.mock';

export const worker = setupWorker(
  ...userMockhandler,
  ...meetingMockHandler,
  ...calendarMockHandler,
  ...foodMockHandler,
);
