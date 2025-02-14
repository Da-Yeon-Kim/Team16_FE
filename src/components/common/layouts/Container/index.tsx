import styled from '@emotion/styled';
import { forwardRef } from 'react';

import { vars } from '@/styles';

type Props = {
  maxWidth?: string;
  flexDirection?: 'row' | 'column';
  justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'left';
  alignItems?: 'center' | 'flex-start' | 'flex-end' | 'baseline' | 'stretch';
  gap?: string;
  padding?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const Container: React.FC<Props> = forwardRef(
  (
    {
      children,
      maxWidth,
      flexDirection,
      justifyContent,
      alignItems,
      gap,
      padding,
      ...props
    }: Props,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    return (
      <Wrapper ref={ref} {...props}>
        <Inner
          className="inner"
          maxWidth={maxWidth}
          flexDirection={flexDirection}
          justifyContent={justifyContent}
          alignItems={alignItems}
          gap={gap}
          padding={padding}
        >
          {children}
        </Inner>
      </Wrapper>
    );
  },
);

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Inner = styled.div<
  Pick<Props, 'maxWidth' | 'flexDirection' | 'justifyContent' | 'alignItems' | 'gap' | 'padding'>
>`
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth ?? vars.breakpoints.lg};
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection ?? 'column'};
  justify-content: ${({ justifyContent }) => justifyContent ?? 'left'};
  align-items: ${({ alignItems }) => alignItems ?? 'flex-start'};
  gap: ${({ gap }) => gap ?? '0'};
  padding: ${({ padding }) => padding ?? '20px'};
`;
