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
    opacity: 0px;
    color: white;
    background-color: #344966;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0.75px;
    text-align: center;
    z-index: 5;
  }

  .base-button:hover{
    cursor: pointer;
  }

  .big-title{
    font-size: 40px;
    font-weight: 700;
    line-height: 60px;
    text-align: left;
  }
  .normal-title{
    font-size: 20px;
    font-weight: 400;
    line-height: 30px;
    text-align: left;
  }

  .base-text{
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    text-align: left;
  }

  .input {
    display: flex;
    flex-direction: row;
    height: 64px;
    width: 100%;
  }
  
  .input__icon {
    position: absolute;
    padding: 22px 24px;
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
  }

  .green-title{
    font-size: 14px;
    font-weight: 500;
    line-height: 21px;
    text-align: right;
    color: ${({ theme }) => theme.colors.dark_green};
  }
  
  .base-round-button{
    position: absolute;
    width: 48px;
    height: 48px;
    top: 237px;
    left: 237px;
    gap: 0px;
    opacity: 0px;
    background-color: #344966;
    border-radius: 50%;
  }

  .base-round-button:hover{
    cursor: pointer;
  }

`;
