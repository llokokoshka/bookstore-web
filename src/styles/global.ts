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
  }

  .green-title:hover{
    cursor: pointer;
  }
  
  .base-round-button{
    width: 48px;
    height: 48px;
    opacity: 0px;
    background-color: ${({ theme }) => theme.colors.dark_blue};
    border-radius: 50%;
    @media screen and (max-width: 320px) {
      width: 32.73px;
      height: 32.73px;
    }
  }

  .base-round-button:hover{
    cursor: pointer;
  }
`;
