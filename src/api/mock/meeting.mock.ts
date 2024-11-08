import { rest } from 'msw';

import { getConfirmPath } from '../hooks/useConfirm';
import { createMeetingPath } from '../hooks/useCreateMeeting';
import { getCategoryPath } from '../hooks/useGetCategory';
import { getConfirmInfoPath } from '../hooks/useGetConfirmInfo';
import { getMeetingInfoPath } from '../hooks/useGetMeetingInfo';
import { getMyMeetingsPath } from '../hooks/useGetMyMeetings';
import { getparticipantPath } from '../hooks/useGetParticipant';
import { getPermissionPath } from '../hooks/useGetPermission';
import { getRecommendMenuPath } from '../hooks/useGetRecommandMenu';
import { joinMeetingPath } from '../hooks/useJoinMeeting';
import { getLeaveGroupPath } from '../hooks/useLeaveGroup';

export const meetingMockHandler = [
  rest.get(getMyMeetingsPath(), (_, res, ctx) => {
    return res(ctx.json(MY_MEETING_MOCK));
  }),
  rest.post(createMeetingPath(), (_, res, ctx) => {
    return res(ctx.json(CREATE_MEETING_MOCK));
  }),
  rest.get(
    getparticipantPath({
      meetingId: '1',
    }),
    (_, res, ctx) => {
      return res(ctx.json(PARTICIPANT));
    },
  ),
  rest.get(
    getRecommendMenuPath({
      meetingId: '1',
    }),
    (_, res, ctx) => {
      return res(ctx.json(RECOMMEND_MENU_MOCK));
    },
  ),
  rest.get(getCategoryPath(), (_, res, ctx) => {
    return res(ctx.json(MENU_CATEGORY_MOCK));
  }),
  rest.delete(getLeaveGroupPath({ meetingId: '1' }), (_, res, ctx) => {
    return res(ctx.json({ message: '성공' }));
  }),
  rest.get(getMeetingInfoPath({ meetingId: '1' }), (_, res, ctx) => {
    return res(ctx.json(MEETING_INFO_MOCK));
  }),
  rest.get(getPermissionPath({ meetingId: '1' }), (_, res, ctx) => {
    return res(ctx.json(PERMISSION_MOCK));
  }),
  rest.post(getConfirmPath({ meetingId: '1' }), (_, res, ctx) => {
    return res(ctx.json({ message: '확정 성공' }));
  }),
  rest.post(joinMeetingPath({ meetingId: '1' }), (_, res, ctx) => {
    return res(ctx.json(JOIN_MEETING_MOCK));
  }),
  rest.get(getConfirmInfoPath({ meetingId: '1' }), (_, res, ctx) => {
    return res(ctx.json(CONFIRMED_INFO_MOCK));
  }),
];

// mocks

const CREATE_MEETING_MOCK = {
  status: 200,
  message: '모임 생성 성공',
  data: null,
};

const MY_MEETING_MOCK = {
  status: null,
  message: null,
  data: [
    {
      meetingId: 1,
      baseLocation: {
        locationId: 18577297,
        address: '경기 성남시 분당구 판교역로 166',
        latitude: 37.39570088983171,
        longitude: 127.1104335101161,
      },
      title: '밥먹자',
      confirmedDateTime: '2022-10-28T03:00:00Z',
      confirmedFood: {
        food_id: 1001,
        category: '한식',
        name: '불고기',
      },
    },
    {
      meetingId: 2,
      baseLocation: {
        locationId: 18577297,
        address: '경기 성남시 분당구 판교역로 166',
        latitude: 37.39570088983171,
        longitude: 127.1104335101161,
      },
      title: '밥먹자',
      confirmedDateTime: null,
      confirmedFood: null,
    },
  ],
};

const PARTICIPANT = {
  status: 200,
  message: '참가자 조회 성공',
  data: [
    {
      member_id: 12345,
      nickname: '쿠키즈',
      thumbnail_image_url: 'https://example.com/thumbnails/sunshine_thumb.jpg',
      profile_image_url: 'https://example.com/profiles/sunshine_profile.jpg',
    },
    {
      member_id: 54312,
      nickname: '구키즈',
      thumbnail_image_url: 'https://example.com/thumbnails/sunshine_thumb.jpg',
      profile_image_url: 'https://example.com/profiles/sunshine_profile.jpg',
    },
    {
      member_id: 12345,
      nickname: '쿠키즈',
      thumbnail_image_url: 'https://example.com/thumbnails/sunshine_thumb.jpg',
      profile_image_url: 'https://example.com/profiles/sunshine_profile.jpg',
    },
    {
      member_id: 54312,
      nickname: '구키즈',
      thumbnail_image_url: 'https://example.com/thumbnails/sunshine_thumb.jpg',
      profile_image_url: 'https://example.com/profiles/sunshine_profile.jpg',
    },
    {
      member_id: 12345,
      nickname: '쿠키즈',
      thumbnail_image_url: 'https://example.com/thumbnails/sunshine_thumb.jpg',
      profile_image_url: 'https://example.com/profiles/sunshine_profile.jpg',
    },
    {
      member_id: 54312,
      nickname: '구키즈',
      thumbnail_image_url: 'https://example.com/thumbnails/sunshine_thumb.jpg',
      profile_image_url: 'https://example.com/profiles/sunshine_profile.jpg',
    },
    {
      member_id: 12345,
      nickname: '쿠키즈',
      thumbnail_image_url: 'https://example.com/thumbnails/sunshine_thumb.jpg',
      profile_image_url: 'https://example.com/profiles/sunshine_profile.jpg',
    },
    {
      member_id: 54312,
      nickname: '구키즈',
      thumbnail_image_url: 'https://example.com/thumbnails/sunshine_thumb.jpg',
      profile_image_url: 'https://example.com/profiles/sunshine_profile.jpg',
    },
    {
      member_id: 12345,
      nickname: '쿠키즈',
      thumbnail_image_url: 'https://example.com/thumbnails/sunshine_thumb.jpg',
      profile_image_url: 'https://example.com/profiles/sunshine_profile.jpg',
    },
    {
      member_id: 54312,
      nickname: '구키즈',
      thumbnail_image_url: 'https://example.com/thumbnails/sunshine_thumb.jpg',
      profile_image_url: 'https://example.com/profiles/sunshine_profile.jpg',
    },
  ],
};

const RECOMMEND_MENU_MOCK = {
  status: 200,
  message: '모임 추천 음식 조회 성공',
  data: [
    {
      food_id: 1,
      category: '한식',
      name: '삼겹살',
    },
    {
      food_id: 123,
      category: '한식',
      name: '제육볶음',
    },
    {
      food_id: 2,
      category: '한식',
      name: '김치찌개',
    },
    {
      food_id: 3,
      category: '한식',
      name: '된장찌개',
    },
    {
      food_id: 4,
      category: '중식',
      name: '짜장면',
    },
    {
      food_id: 5,
      category: '중식',
      name: '마라탕',
    },
    {
      food_id: 6,
      category: '중식',
      name: '양꼬치',
    },
    {
      food_id: 7,
      category: '일식',
      name: '라멘',
    },
    {
      food_id: 8,
      category: '일식',
      name: '우동',
    },
    {
      food_id: 9,
      category: '일식',
      name: '돈카츠',
    },
    {
      food_id: 10,
      category: '양식',
      name: '피자',
    },
    {
      food_id: 11,
      category: '양식',
      name: '함박스테이크',
    },
    {
      food_id: 12,
      category: '카페,디저트',
      name: '티라미수',
    },
    {
      food_id: 13,
      category: '카페,디저트',
      name: '마카롱',
    },
    {
      food_id: 14,
      category: '술집',
      name: '치킨',
    },
    {
      food_id: 15,
      category: '술집',
      name: '닭발',
    },
    {
      food_id: 10,
      category: '양식',
      name: '피자',
    },
    {
      food_id: 11,
      category: '양식',
      name: '함박스테이크',
    },
    {
      food_id: 12,
      category: '카페,디저트',
      name: '티라미수',
    },
    {
      food_id: 13,
      category: '카페,디저트',
      name: '마카롱',
    },
    {
      food_id: 14,
      category: '술집',
      name: '치킨',
    },
    {
      food_id: 15,
      category: '기타',
      name: '닭발',
    },
  ],
};

const MENU_CATEGORY_MOCK = {
  status: 200,
  message: '카테고리 조회 성공',
  data: ['한식', '중식', '일식', '양식', '카페,디저트', '술집', '기타'],
};

const MEETING_INFO_MOCK = {
  status: 200,
  message: '모임 정보 조회 성공',
  data: {
    title: `철수 모임`,
    startDate: '2024-10-01',
    endDate: '2024-10-12',
    startTime: '09:00:00',
    endTime: '15:00:00',
  },
};

const PERMISSION_MOCK = {
  status: 200,
  message: '권한 조회 성공',
  data: {
    isHost: true,
  },
};

const JOIN_MEETING_MOCK = {
  status: 200,
  message: '모임 참여 성공',
  data: null,
};

const CONFIRMED_INFO_MOCK = {
  status: 200,
  message: '모임 확정 날짜, 확정 음식 조회 성공',
  data: {
    confirmedDateTime: '2022-10-28T03:00:00Z',
    confirmedFood: {
      foodId: 1001,
      category: '한식',
      name: '불고기',
    },
  },
};
