import React from 'react';
import styled from 'styled-components';
import LogoIcon from '../../icons/Logo/Logo';
import HintArrowIcon from '../../icons/HintArrow/HintArrow';

const infoScreen = ({ type }) => {
  switch (type) {
    case 'emptyLibrary': return (
      <InfoWrapper>
        <Logo>
          <LogoIcon />
        </Logo>
        <Title>Welcome here</Title>
        <Info>Discover playlists and</Info>
        <Info>add them to your Library</Info>
        <Arrow>
          <HintArrowIcon /> 
        </Arrow>
      </InfoWrapper>
    );
    case 'noResults': return (
      <InfoWrapper>
        <Logo>
          <LogoIcon />
        </Logo>
        <Title>No results</Title>
      </InfoWrapper>
    );
    case 'tipAdd': return (
      <InfoWrapper>
        <Logo>
          <LogoIcon />
        </Logo>
        <Title>Hello</Title>
        <Info>You can add a playlist</Info>
        <Info>to your Library</Info>
      </InfoWrapper>
    );
    case 'tipWidget': return (
      <InfoWrapper>
        <Logo>
          <LogoIcon />
        </Logo>
        <Title>Hello</Title>
        <Info>Tap <Tip>"#"</Tip> on your keyboard</Info>
        <Info>and get access to the full playlist</Info>
      </InfoWrapper>
    );
    default: return (
      <InfoWrapper />
    );
  }
 };

export default infoScreen;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 240px;
`;

const Logo = styled.div`
  margin-top: 48px;
`;

const Tip = styled.span`
  color: #ffffff;
`;

const Title = styled.div`
  height: 16px;
  font-family: Roboto;
  font-size: 14px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 16px;
  letter-spacing: normal;
  color: #ffffff;
  margin-bottom: 4px;
`;

const Info = styled.div`
  height: 18px;
  font-family: Circular;
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 18px;
  letter-spacing: normal;
  text-align: center;
  color: #666666;
`;

const Arrow = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 240px;
  margin-top: 18px;
  margin-left: 100px;
`;