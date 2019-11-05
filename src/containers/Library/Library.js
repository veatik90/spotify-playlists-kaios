import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import SoftKeys from '../Softkey/Softkey';
import InfoScreen from '../../components/InfoScreen/InfoScreen';
import PlaylistsList from '../../components/PlaylistsList/PlaylistsList';
import WithListController from '../../hoc/WithListController';
import { getLibrary, removeFromLibrary } from '../../helpers/dbHelper';

const ITEMS_ON_SCREEN = 4;

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = {
      db: null,
      library: []
    }
    this.listRef = React.createRef();
  }
  
  componentDidMount() {
    navigator.spatialNavigationEnabled = false;
    this.fetchLibrary();
  }

  fetchLibrary = () => {
    const { db, saveList } = this.props;
    getLibrary(db)
      .then(result => {
        const sortTimestamp = (a, b) => {
          return b.timestamp - a.timestamp;
        } 
        this.setState({
          library: result.sort(sortTimestamp)
        });
        saveList(result.sort(sortTimestamp));
      })
      .catch(error =>{ 
        console.log(error);
        saveList([])
      });
  }

  playPlaylist = () => {    
    const { activeItem, play } = this.props;
    const playlist = activeItem();
    
    play(playlist);
  }

  removePlaylist = () => {
    const { isLastItem, db, activeItem } = this.props;
    const playlist = activeItem(); 
    
    removeFromLibrary(db, playlist.id)
      .then(result => {
        isLastItem();
        this.fetchLibrary();
      })
      .catch(error => {console.log(error)})
  }

  render() {
    const { discover, position, listUp, listDown, listAlign, getList } = this.props;
    const { library } = this.state;
    
    const renderBody = () => {
      const list = getList();
      list && listAlign(this.listRef, 25);
 
      return list.length 
        ? (
            <React.Fragment>
              <Header>Your Library</Header>
              <PlaylistsList 
                list={list}
                position={position}  
                ref={this.listRef}
              />
            </React.Fragment>
          )
        : <InfoScreen type="emptyLibrary" />;
    }
    return (
      <React.Fragment>
        {renderBody()}
        <SoftKeys 
          center={library.length ? "SELECT" : ""}
          right={library.length ? "Remove" : ""}
          left="Discover"
          onKeyUp={listUp} 
          onKeyDown={listDown}
          onKeyCenter={library.length && this.playPlaylist}
          onSoftKeyLeft={discover}
          onSoftKeyRight={library.length && this.removePlaylist}
        />
      </React.Fragment>
    );
  }
}

export default WithListController(Library, ITEMS_ON_SCREEN);

