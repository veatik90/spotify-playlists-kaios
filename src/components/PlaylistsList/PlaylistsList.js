import React from 'react';
import styled from 'styled-components';
import LogoIcon from '../../icons/Logo/Logo';

const playlists = React.forwardRef((props, ref) => {

  const {list, position} = props;
  
  const playlistsList = list.map((playlist, index) => (
    <PlaylistItem 
      key={playlist.id}
      className={position===index && 'active'}
    > 
      {playlist.added && 
      <Added>
        <LogoIcon />
      </Added>}
      <Preview src={playlist.icon.url} alt={playlist.name} />
      <Info>
        <div className="title">{playlist.name.length < 20 ? playlist.name : playlist.name.slice(0, 18) + '...'}</div>
        <div className="total">{playlist.tracks} tracks</div>
      </Info>
    </PlaylistItem>
  ))
  return (
    <PlaylistsWrapper  ref={ref} >
      {playlistsList}
    </PlaylistsWrapper>
  );
});

export default playlists;

const PlaylistsWrapper = styled.div`
  height: 500px;
  overflow: hidden;
  position: relative;
  padding-bottom: 60px;
`;

const PlaylistItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 240px;
  height: 60px;
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

const Preview = styled.img`
  height: 52px;
  width: 52px;
  margin: 0 12px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Circular;
  font-size: 14px;
  & .title, & .total {
    display: flex;
    height: 30px;
  }
  & .title {
    align-items: flex-end;
    padding-bottom: 1px;
    font-weight: 900;
    color: #ffffff;
  }

  & .total {
    align-items: flex-start;
    padding-top: 1px;
    color: #666666;
  }
`;

const Added = styled.div`
  position: absolute;
  transform: scale(0.2, 0.2);
  top: -33px;
  left: -22px;
`;



