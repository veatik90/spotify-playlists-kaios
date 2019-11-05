import React from 'react';
import styled, { keyframes } from 'styled-components';
import LoaderGif from '../../assets/gif/loaderGIF.gif';

const loader = () => (
  <LoaderWrapper>
    <img src={LoaderGif} alt="loading..." />
    <Title>
      Waiting 
      <Dots>
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </Dots>
    </Title>
  </LoaderWrapper>
);

export default loader;


const LoaderWrapper = styled.div`
  position: absolute;
  z-index: 99999;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 240px;
  height: 294px;
  bottom: 0;
  background-color: #000000;
`;


const bouncedelay = keyframes`
  0%, 80%, 100% { 
    -webkit-transform: scale(0);
    transform: scale(0);
  } 40% { 
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
  }
`;

const Title = styled.div`
  position: absolute;
  display: flex;
  height: 16px;
  width: 59px;
  font-family: Roboto;
  font-size: 14px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 16px;
  letter-spacing: normal;
  color: #ffffff;
  top: 180px;
  left: 0;
  right: 0;
  margin: auto;
`;

const Dots = styled.div`
  margin-left: 1px;
  & > div {
    width: 3px;
    height: 3px;
    background-color: #ffffff;

    border-radius: 100%;
    display: inline-block;
    animation: ${bouncedelay} 1.4s infinite ease-in-out both;
  }

  & .bounce1 {
    animation-delay: -0.32s;
  }

  & .bounce2 {
    animation-delay: -0.16s;
  }
`;




