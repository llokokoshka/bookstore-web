import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    border: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
  }

  .base-button {
    width: 231px;
    height: 44px;
    top: 8px;
    left: 1056px;
    padding: ${({ theme }) => theme.padding.button};
    gap: 10px;
    border-radius: ${({ theme }) => theme.sizes.base_radius}px;
    color: white;
    background-color: #344966;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0.75px;
    text-align: center;
    z-index: 5;

    @media screen and ( max-width: 834px ){
      width: 231px;
      height: 44px;
      padding: 10px 50px;
    }
  }

  .base-button:hover{
    cursor: pointer;
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

  .input__icon {
    position: absolute;
    padding: 22px 24px;
    @media screen and (max-width: 320px) {
      padding: 11px 16px;
    }
    
  }

  .input__field {
    display: flex;
    background-color: ${({ theme }) => theme.colors.light};
    border-radius: ${({ theme }) => theme.sizes.base_radius}px;
    padding-left: 64px;
    max-width: 630px;
    width: 100%;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.75px;
    text-align: left;
    @media screen and (max-width: 834px) {
      max-width: 392px;
      height: 64px;
    }
    @media screen and (max-width: 320px) {
      max-width: 290px;
      height: 47px;
      font-size: 12px;
      font-weight: 400;
      line-height: 28px;
    }
  }

  .input__dark-title{
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.75px;
    text-align: left;
    color: ${({ theme }) => theme.colors.dark_blue};
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
