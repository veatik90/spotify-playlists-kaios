import React from 'react';
import styled, { keyframes } from 'styled-components';
import HintIcon from '../../icons/Hint/Hint';
import GradientIcon from '../../icons/Gradient/Gradient';

const widget = ({ playlist }) => {
  return (
    <WidgetWrapper>
      <Ticker>
        <div className="blur">
          <GradientIcon />
        </div>
        <div className="ticker">
          <span>{playlist}</span>
          <span>{playlist}</span>          
        </div>
      </Ticker>
      <Hint >
        <HintIcon />
      </Hint>
    </WidgetWrapper>
  );
}

export default widget;

const WidgetWrapper = styled.div`
  position: absolute;
  bottom: 25px;
  z-index: 100;
  width: 240px;
  height: 26px;
  background-color: #0097a7; 
`;

const Hint = styled.div`
  position: absolute;
  right: 4px;
  bottom: 0;
  z-index: 2;
`;

const marquee = keyframes`
  0% { left: 0; }
  100% { left: -100%; }
`;


const Ticker = styled.div`
  position: relative;
  width: 240px;
  height: 26px;
  line-height: 26px;
  overflow: hidden;
  font-family: Circular;
  font-size: 14px;
  font-weight: 900;
  color: #ffffff;

  & .ticker {
    display: block;
    width: 200%;
    height: 26px;

    position: absolute;
    overflow: hidden;

    animation: ${marquee} 4s linear infinite;
  }

  & span {
    float: left;
    width: 50%;
  }


  & .blur {
    position: absolute;
    height: 26px;
    right: 0;
    z-index: 1;
  }
`;

