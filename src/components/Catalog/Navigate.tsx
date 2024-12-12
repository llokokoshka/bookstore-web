import React from 'react';

import rightArr from '../../img/navigate-right-forward.png';
import leftArr from '../../img/left arrow.png';
import emtyRow from '../../img/Ellipse.png';
import fullRow from '../../img/Ellipse full.png';
import styled from 'styled-components';
import { INavigateProps } from '../../lib/bookTypes';

const Navigate: React.FC<INavigateProps> = (props) => {
  return (
    <StyledWrapper>
      {props.hasPrevPage ? (
        <div className="arrow" onClick={props.handlePagePrev}>
          <img src={leftArr} alt="left arr"></img>
        </div>
      ) : null}
      <div className="dots">
        {props.colPages === 1 ? (
          <img src={fullRow} alt="dot" />
        ) : props.colPages === 2 && props.page === 1 ? (
          <>
            <img src={fullRow} alt="dot" />
            <img src={emtyRow} alt="dot" />
          </>
        ) : props.colPages === 2 && props.page === 2 ? (
          <>
            <img src={emtyRow} alt="dot" />
            <img src={fullRow} alt="dot" />
          </>
        ) : props.colPages &&
          (props.colPages === 3 || props.colPages > 3) &&
          props.page === 1 ? (
          <>
            <img src={fullRow} alt="dot" />
            <img src={emtyRow} alt="dot" />
            <img src={emtyRow} alt="dot" />
          </>
        ) : props.colPages &&
          (props.colPages === 3 || props.colPages > 3) &&
          !props.hasNextPage ? (
          <>
            <img src={emtyRow} alt="dot" />
            <img src={emtyRow} alt="dot" />
            <img src={fullRow} alt="dot" />
          </>
        ) : props.colPages && (props.colPages === 3 || props.colPages > 3) ? (
          <>
            <img src={emtyRow} alt="dot" />
            <img src={fullRow} alt="dot" />
            <img src={emtyRow} alt="dot" />
          </>
        ) : null}
      </div>
      {props.hasNextPage ? (
        <div className="arrow" onClick={props.handlePageNext}>
          <img src={rightArr} alt="right arr"></img>{' '}
        </div>
      ) : null}
    </StyledWrapper>
  );
};

export default Navigate;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  column-gap: 50px;
  margin-bottom: 152px;
  margin-top: 54px;
  @media screen and (max-width: 834px) {
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
`;
