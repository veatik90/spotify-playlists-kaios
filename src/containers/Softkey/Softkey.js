import React, { Component } from 'react';
import styled from 'styled-components';


class softkey extends Component {

  componentDidMount() {    
    navigator.spatialNavigationEnabled = false;
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {    
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  shouldComponentUpdate() {
    document.addEventListener('keydown', this.handleKeyDown);
    return true;
  }

  handleKeyDown = evt => {
    const {
      onKeyLeft,
      onKeyCenter,
      onKeyRight,
      onKeyDown,
      onKeyUp,
      onSoftKeyLeft,
      onSoftKeyRight,
    } = this.props;      
    
    switch (evt.key) {
      case "ArrowLeft":
        return onKeyLeft && onKeyLeft(evt);
      case "Enter":
        return onKeyCenter && onKeyCenter(evt);
      case "ArrowRight":
        return onKeyRight && onKeyRight(evt);
      case "ArrowDown":
        return onKeyDown && onKeyDown(evt);
      case "ArrowUp":
        return onKeyUp && onKeyUp(evt);
      case "Home":
      case "SoftLeft":
        return onSoftKeyLeft && onSoftKeyLeft(evt);
      case "End":
      case "SoftRight":
        return onSoftKeyRight && onSoftKeyRight(evt);
      default:
        return;
    }
  };

  
  render (){
    const {
      left,
      center,
      right,
    } = this.props;
    return (
      <KeysWrapper >
        <label className="left" >{left}</label>
        <label className="center">{center}</label>
        <label className="right">{right}</label>
      </KeysWrapper>
    );
  }

}

export default softkey;

const KeysWrapper = styled.div`
  height: 25px;
  max-height: 25px;
  min-height: 25px;
  width: 100%;
  max-width: 100%;
  background: #292929;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  white-space: nowrap;
  padding: 0 5px;
  font-weight: 700;
  box-sizing: border-box;
  line-height: 18px;
  margin-top: auto;
  bottom: 0;
  color: #f6f9ff;
  z-index: 200;

  & .left,
  & .right,
  & .center {
    font-family: Roboto;
    font-weight: 500;
    font-size: 14px;
    overflow: hidden;
    width: 100%;
    letter-spacing: -0.5px;
    box-sizing: border-box;
    text-overflow: ellipsis;
  }

  &  .left {
    text-align: left;
    padding-right: 10px;
  }

  & .center {
    text-align: center;
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }

  & .right {
    text-align: right;
    padding-left: 10px;
  }
`;