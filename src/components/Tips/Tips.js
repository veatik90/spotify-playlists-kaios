import React from 'react';
import styled from 'styled-components';
import InfoScreen from '../InfoScreen/InfoScreen';
import TipAddIcon from '../../icons/TipAdd/TipAdd';
import TipWidgetIcon from '../../icons/TipWidget/TipWidget';

const tips = ({ type }) => {
  switch (type) {
    case 'tipAdd': return (
      <TipWrapper>
        <TipAddIcon />
        <TipsInfo>
          <InfoScreen type={type} />
        </TipsInfo>
      </TipWrapper>
    );
    case 'tipWidget': return (
      <TipWrapper>
        <TipWidgetIcon />
        <TipsInfo>
          <InfoScreen type={type} />
        </TipsInfo>
      </TipWrapper>
    );
    default: break;
  }
}

export default tips;

const TipWrapper = styled.div`
  position: absolute;
  top: 0;
  height: 320px;
  width: 240px;
  z-index: 99999;
`;
const TipsInfo = styled.div`
  position: absolute;
  top: 36px;
`;
