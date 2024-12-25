import React from 'react';
import styled from 'styled-components';
import cn from 'classnames';

import rightArr from '../../assets/img/navigate-right-forward.png';
import leftArr from '../../assets/img/left arrow.png';

type Props = {
  hasPrevPage: boolean;
  handlePagePrev: () => void;
  page: number;
  colPages: number;
  hasNextPage: boolean;
  handlePageNext: () => void;
};

const Navigate: React.FC<Props> = (props) => {
  const allPages = props.colPages;
  const numberOfDots = Math.min(allPages, 3);
  const dotsArr: number[] = Array(numberOfDots).fill(1);

  return (
    <StyledWrapper>
      {props.hasPrevPage ? (
        <div className="arrow" onClick={props.handlePagePrev}>
          <img src={leftArr} alt="left arr"></img>
        </div>
      ) : (
        <div className="arrow"></div>
      )}
      <div className="dots">
        {dotsArr.map((_, id) => (
          <div
            key={id}
            className={cn('dot', {
              fill:
                (props.hasPrevPage && props.hasNextPage && id === 1) ||
                (!props.hasNextPage && id === 2) ||
                (!props.hasPrevPage && id === 0),
            })}
          ></div>
        ))}
      </div>
      {props.hasNextPage ? (
        <div className="arrow" onClick={props.handlePageNext}>
          <img src={rightArr} alt="right arr"></img>
        </div>
      ) : (
        <div className="arrow"></div>
      )}
    </StyledWrapper>
  );
};

export default Navigate;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 152px;
  margin-top: 54px;
  column-gap: 50px;

  ${({ theme }) => theme.media.tablet} {
    margin-bottom: 60px;
    margin-top: 60px;
  }

  .arrow:hover {
    cursor: pointer;
  }

  .dots {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    column-gap: 30px;
  }
  .dot {
    width: 13.33px;
    height: 13.33px;
    top: 3.33px;
    left: 3.33px;
    border: 2px solid ${({ theme }) => theme.colors.dark};
    border-radius: 50%;
  }
  .fill {
    background-color: ${({ theme }) => theme.colors.dark};
  }
`;
