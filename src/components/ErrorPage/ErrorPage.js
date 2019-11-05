import React from 'react';
import styled from 'styled-components';
import SoftKeys from '../../containers/Softkey/Softkey';
import ErrorIcon from '../../icons/Error/Error';

const errorPage = ({ error, back }) => {
  return (
    <React.Fragment>
     <ErrorsWrapper>
        <ErrorIcon />
        <Title>{error}</Title>
        <Controls>
          <SoftKeys 
            left="Back"
            onSoftKeyLeft={back}
          />
        </Controls>
     </ErrorsWrapper>
    </React.Fragment>
  );
}

export default errorPage;

const ErrorsWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 240px;
  height: 294px;
  background-color: #000000;
  margin-top: 88px;
`;

const Title = styled.div`
  display: flex;
  height: 16px;
  font-family: Roboto;
  font-size: 14px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 16px;
  letter-spacing: normal;
  color: #ffffff;
  margin-top: 7px;
`;

const Controls = styled.div`
  position: absolute;
  bottom: 0;
  min-height: 25px;
  width: 100%;
  left: 0;
`;