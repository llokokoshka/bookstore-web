import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    border: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
  }

  .big-title{
    font-size: 40px;
    font-weight: 700;
    line-height: 60px;
    text-align: left;
    @media screen and (max-width: 834px) {
      font-size: 32px;
      font-weight: 700;
      line-height: 48px;
    }
    @media screen and (max-width: 320px) {
      font-size: 18px;
      font-weight: 700;
      line-height: 27px;
    }
  }
  
  .normal-title{
    font-size: 20px;
    font-weight: 400;
    line-height: 30px;
    text-align: left;
    @media screen and (max-width: 834px) {
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
    }
    @media screen and (max-width: 320px) {
      font-size: 14px;
      font-weight: 500;
      line-height: 21px;
    }
  }

  .base-text{
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    text-align: left;
    @media screen and (max-width: 320px) {
      font-size: 14px;
      font-weight: 500;
      line-height: 21px;
    }
  }

  .green-title{
    font-size: 14px;
    font-weight: 500;
    line-height: 21px;
    text-align: right;
    color: ${({ theme }) => theme.colors.dark_green};
    text-decoration: underline;
  }

  .green-title:hover{
    cursor: pointer;
  }
`;
