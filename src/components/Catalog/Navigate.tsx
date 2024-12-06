import React from 'react';
import styled from 'styled-components';

import rightArr from '../../img/right arrow.png';
import leftArr from '../../img/left arrow.png';
import emtyRow from '../../img/Ellipse.png';
import fullRow from '../../img/Ellipse full.png';

const Navigate: React.FC<{
  hasPrevPage: boolean | undefined;
  handlePagePrev: any;
  colPages: number | undefined;
  hasNextPage: boolean | undefined;
  handlePageNext: any;
}> = (props) => {
  return (
    <>
      {props.hasPrevPage ? (
        <div className="arr" onClick={props.handlePagePrev}>
          <img src={leftArr} alt="left arr"></img>
        </div>
      ) : null}
      {props.colPages === 1 ? (
        <img src={fullRow} alt="dot" />
      ) : props.colPages === 2 ? (
        <>
          <img src={fullRow} alt="dot" /> <img src={emtyRow} alt="dot" />
        </>
      ) : props.colPages && (props.colPages === 3 || props.colPages > 3) ? (
        <>
          <img src={fullRow} alt="dot" />
          <img src={emtyRow} alt="dot" /> <img src={emtyRow} alt="dot" />
        </>
      ) : null}
      {props.hasNextPage ? (
        <div className="arr" onClick={props.handlePageNext}>
          <img src={rightArr} alt="right arr"></img>{' '}
        </div>
      ) : null}
    </>
  );
};

export default Navigate;

const StyledWrapper = styled.div`
  /* padding: ${({ theme }) => theme.padding.header}; */
`;
