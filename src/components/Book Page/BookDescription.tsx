import React, { useState } from 'react';
import styled from 'styled-components';
import cn from 'classnames';

const MAX_LENGTH = 400;

type Props = {
  description: string;
};

const BookDescription: React.FC<Props> = (props) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  return (
    <StyledWrapper>
      <div className="normal-title">Description</div>
      <div
        className={cn('base-text base-text--size', {
          expanded: isDescriptionExpanded,
        })}
      >
        {props.description}
      </div>
      {!isDescriptionExpanded && props.description.length > MAX_LENGTH && (
        <div className="description__show-more" onClick={toggleDescription}>
          ...See more
        </div>
      )}
      {isDescriptionExpanded && (
        <div className="description__show-more" onClick={toggleDescription}>
          See less
        </div>
      )}
    </StyledWrapper>
  );
};

export default BookDescription;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 19px;

  .base-text--size {
    max-width: 630px;
    max-height: 264px;
    width: 100%;
    height: 100%;
    ${({ theme }) => theme.media.mobile} {
      max-width: none;
    }
  }

  .base-text {
    max-height: 264px;
    overflow: hidden;
    text-overflow: ellipsis;

    ${({ theme }) => theme.media.tablet} {
      max-height: 294px;
    }
  }

  .expanded {
    max-height: none;
    overflow: visible;
    text-overflow: unset;
    white-space: normal;
  }

  .description__show-more {
    display: flex;
    justify-content: end;
    color: ${({ theme }) => theme.colors.dark};
    cursor: pointer;
  }

  .description__show-more:hover {
    text-decoration: underline;
  }
`;
