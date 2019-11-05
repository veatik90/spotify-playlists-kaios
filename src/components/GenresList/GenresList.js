import React from 'react';
import styled from 'styled-components';
import RightArrowIcon from '../../icons/RightArrow/RightArrow';

const genres = React.forwardRef((props, ref)=> {
  const {list, position} = props;

  const genresList = list.map((genre, index) => (
    <GenreItem 
      key={genre.id}
      className={position===index && 'active'}
    >
      <Preview>
        <img src={genre.icon.url} alt={genre.name}/>
      </Preview>
      {genre.name.length < 20 ? genre.name : genre.name.slice(0, 20) + '...'}
      <IconWrapper>
        <RightArrowIcon/>
      </IconWrapper>
    </GenreItem>
  ))
  return (
    <GenresWrapper ref={ref}>
      {genresList}
    </GenresWrapper>
  );
});

export default genres;

const GenresWrapper = styled.div`
  height: 227px;
  overflow: hidden;
  padding-bottom: 30px;
`;

const GenreItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
  font-family: Circular;
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #ffffff;
  &.active {
    background-color: #292929;
  }
`;

const Preview = styled.div`
  width: 25px;
  height: 25px;
  overflow: hidden;
  margin: 0 12px;
  & img {
    width: 38px;
    height: 38px;
    margin: -5px 0 0 -6px;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  height: 30px;
  right: 6px;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
`;


