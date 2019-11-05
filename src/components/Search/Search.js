import React from 'react';
import styled from 'styled-components';
import SearchIcon from '../../icons/Search/Search';

const search = ({ value, change, placeholder }) => (
  <SearchWrapper>
    <InputWrapper>
      <IconWrapper>
        <SearchIcon />
      </IconWrapper >
      <Input 
        placeholder={placeholder} 
        autoFocus 
        spellCheck={false}
        value={value}
        onChange={change}
      />
    </InputWrapper>
  </SearchWrapper>
);

export default search;

const SearchWrapper = styled.div`
  display:flex;
  height: 42px;
  min-height: 42px;
  max-height: 42px;
  background-color: #000000;
  flex-direction:row;
  box-sizing: border-box;
  align-items: middle;
  padding: 9px 9.5px 0 9px;
`;

const InputWrapper = styled.div`
  display:flex;
  box-sizing: border-box;
  align-items: middle;
  width: 221.5px;
  height: 24px;
`;

const IconWrapper = styled.div`
  padding: 3px;
  height: 24px;
  background-color: #292929;
`;

const Input = styled.input`
  background-color: #292929;
  height: 24px;
  line-height: 24px;
  border: 1px transparent;
  border-radius: 1px;
  vertical-align: middle;
  width: 196px;
  outline: none;
  overflow: auto;
  box-sizing: border-box;
  font-family: Circular;
  font-size: 12px;
  color: transparent;
  text-shadow: ${props => (props.value ? '0 0 0 #ffffff;' : '0 0 0 #666666')};

  &::placeholder {
    color: ${props => (props.value ? '0 0 0 #ffffff;' : '0 0 0 #666666')};
    font-size: 12px;
  }
`;

