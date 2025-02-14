import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import type { ConfirmMeetingRequest } from '@/api/hooks/Meeting/useConfirm';
import { useGetConfirmInfo } from '@/api/hooks/Meeting/useGetConfirmInfo';
import { useGetRecommendMenu } from '@/api/hooks/Meeting/useGetRecommandMenu';
import { Spacing } from '@/components/common/layouts/Spacing';
import { DefaultMenu } from '@/components/common/Menu/DefaultMenu';
import { MenuCategory } from '@/components/common/Menu/MenuCategory';
import { SelectedMenu } from '@/components/common/Menu/SelectedMenu/index';
import { useGetMeetingId } from '@/hooks/useGetMeetingId';
import { colors } from '@/styles/variants';

export const GroupHostCollectionMenuSection: React.FC = () => {
  const meetingId = useGetMeetingId();
  const [selectedMenuName, setSelectedMenuName] = useState('');
  const { setValue } = useFormContext<ConfirmMeetingRequest>();

  const { data: confirmedInfo, status: confirmStatus } = useGetConfirmInfo({ meetingId });
  const { data: foods, status: recommendMenuStatus } = useGetRecommendMenu(meetingId);

  useEffect(() => {
    if (selectedMenuName) {
      const selectedMenuId = foods?.find((food) => food.name === selectedMenuName)?.foodId;
      if (selectedMenuId) setValue('confirmFoodId', selectedMenuId);
    }
  }, [selectedMenuName, foods, setValue]);

  if (confirmStatus === 'pending' || recommendMenuStatus === 'pending')
    return <div>Loading...</div>;
  if (confirmStatus === 'error' || recommendMenuStatus === 'error') return <div>Error</div>;

  const displayMenuName = confirmedInfo?.confirmedFood?.name || selectedMenuName;

  return (
    <section>
      <HeaderTitle>추천 음식</HeaderTitle>
      <Spacing height={20} />
      <MenuCategory foods={foods}>
        {({ name }) => (
          <>
            {displayMenuName === name ? (
              <SelectedMenu menuName={name} />
            ) : (
              <div
                onClick={() => {
                  setSelectedMenuName(name);
                }}
              >
                <DefaultMenu menuName={name} />
              </div>
            )}
          </>
        )}
      </MenuCategory>
    </section>
  );
};

const HeaderTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 800;
  user-select: none;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${colors.gray};
`;
