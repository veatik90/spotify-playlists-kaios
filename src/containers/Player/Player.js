import React, { Component } from 'react';
import styled from 'styled-components';
import SoftKeys from '../Softkey/Softkey';

import { getLibraryKeys, removeFromLibrary, addToLibrary } from '../../helpers/dbHelper';

  class Player extends Component {
    state = {
      added: false
    };
    componentDidMount() {
      const { playlist, load, db } = this.props;
    
      load(true);
      getLibraryKeys(db)
      .then(result => {
        const added = result.some(id => id === playlist.id);
        this.setState({
          added
        });
      })
      .catch(error => console.log(error));
    }
    
    onLoad = () => {
      const { load } = this.props;
      load(false);
      navigator.spatialNavigationEnabled = true;
    }

    playlistAction = () => {
      const { added } = this.state;
      const { db, playlist } = this.props;

      if (added) {
        removeFromLibrary(db, playlist.id)
          .then(() => {
            this.setState({
              added: false
            })
          })
          .catch(error => {console.log(error)})
      } else {
        addToLibrary(db, playlist)
          .then(() => {
            this.setState({
              added: true
            })
          })
          .catch(error => {console.log(error)})
          }
    }

    render() {
      const { playlist, back } = this.props;
      const { added } = this.state;
      
      return (
      <PlayerWrapper>
        <iframe
          onLoad={ this.onLoad }
          title="player"
          src={`https://open.spotify.com/embed/playlist/${playlist.id}`}
          width="240" 
          height="269" 
          frameBorder="0" 
          allowtransparency="true" 
          allow="encrypted-media"
        ></iframe>
        <Controls>
          <SoftKeys 
            left="Back"
            center="SELECT"
            right={added ? "Remove" : "Add"}
            onSoftKeyLeft={back}
            onSoftKeyRight={this.playlistAction}
          />
        </Controls>
      </PlayerWrapper>
    );
  }
}

export default Player;

const PlayerWrapper = styled.div`
  width: 240px;
  bottom: 0;
  height: 269px;
`;

const Controls = styled.div`
  position: absolute;
  bottom: 0;
  min-height: 25px;
  width: 100%;
`;