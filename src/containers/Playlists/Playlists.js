import React, { Component } from 'react';
import browse from '../../axiosBrowse';
import WithListController from '../../hoc/WithListController';
import Search from '../../components/Search/Search';
import SoftKeys from '../Softkey/Softkey';
import PlaylistsList from '../../components/PlaylistsList/PlaylistsList';
import InfoScreen from '../../components/InfoScreen/InfoScreen';
import Tips from '../../components/Tips/Tips';

import { getLibraryKeys, addToLibrary, removeFromLibrary, getTips, updateTips } from '../../helpers/dbHelper';

const ITEMS_ON_SCREEN = 4;

class Playlists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      next: false,
      isReady: false,
      offset: 0,
      playlists: [],
      ids: [],
      searchValue: '',
      tips: {}
    }
    this.listRef = React.createRef();
  }

  componentDidMount() {
    navigator.spatialNavigationEnabled = false;
    this.getPlaylists(0);
    this.getKeys();
    this.getTipsState();
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchValue } = this.state;
    if (searchValue !== prevState.searchValue) {
      prevProps.updateList(prevState.playlists, searchValue);
    }
  }

  getKeys = () => {
    const { db } = this.props;
    getLibraryKeys(db)
      .then(result => {
        this.setState({
          ids: result
        });
      })
      .catch(error => console.log(error));
  }

  getTipsState = () => {
    const { db, playlist } = this.props;
    getTips(db)
      .then(result => {
        this.setState({
          tips: result
        });

        if (!result.addTip || (!result.widgetTip && playlist)) {
          document.addEventListener('keydown', (e) => {this.handleTipKeyDown(e, db, result, playlist)});
        }
      })
      .catch(error => console.log(error));
  }

  handleTipKeyDown = (e, db, tips, playlist) => {

    e.preventDefault();

    if (playlist) {
      tips.widgetTip = true; 
    } else {
      tips.addTip = true; 
    }
    updateTips(db, tips)
      .then(() => {
        this.setState({
          tips: tips
        });
        document.removeEventListener('keydown', this.handleTipKeyDown);
      })
      .catch(error => console.log(error));
  }

  isTip = () => {
    const { tips } = this.state;
    const { playlist } = this.props;

    return (!tips.addTip || (!tips.widgetTip && playlist))
  }

  onSearchChange = (e) => {
    const searchValue = e.target.value;
    this.setState({searchValue});
  }

  getPlaylists = () => {
    const { token, genre, load, saveList, setError } = this.props;
    const { offset } = this.state;

    const headers = {
      Authorization: `Bearer ${token}`
    }
    const params = {
      limit: 50,
      offset: offset
    }

    load(true);
    
    browse.get(`categories/${genre}/playlists`, {
      headers,
      params
    })
      .then(response => {
        const playlistsData = response.data.playlists;
        const playlists = playlistsData.items.map(item => {             
          const added = this.state.ids.some(id => id === item.id);
          const img = new Image();
          img.src = item.images[0].url;
                   
          return {
            id: item.id,
            icon: item.images[0],
            name: item.name,
            uri: item.uri,
            tracks: item.tracks.total,
            added
          }
        })        
 
        this.setState(prevState => {
          let offset = prevState.offset;
          let isReady = false;
          if (!!playlistsData.next) {
            offset+= 50;
            this.getPlaylists();
          } else {
            isReady = true;
            saveList(prevState.playlists.concat(playlists));
            load(false);
          }
          return {
            playlists: prevState.playlists.concat(playlists),
            offset,
            isReady,
          };
        })
      })
      .catch(err => setError(err.response.data.error))
  }

  playPlaylist = () => {    
    const { activeItem, play } = this.props;
    const playlist = activeItem();
    
    play(playlist);
  }

  addPlaylist = () => {
    const { activeItem, db } = this.props;
    const playlist = activeItem();
    playlist.timestamp = new Date();

    addToLibrary(db, playlist)
      .then(result => {
        this.getKeys();
      })
      .catch(error => {console.log(error)})
  }

  removePlaylist = () => {
    const { activeItem, db } = this.props;
    const playlist = activeItem();

    removeFromLibrary(db, playlist.id)
      .then(result => {
        this.getKeys();
      })
      .catch(error => {console.log(error)})
  }


  isAddedHelper = (id) => {
    const { ids } = this.state;
    return ids.indexOf(id) > -1;
  }

  isAdded = () => {    
    const { activeItem } = this.props;
    const playlist = activeItem();    
    
    return playlist && this.isAddedHelper(playlist.id);
  }

  addedToLibrary = (playlists) => {
    return playlists.map(item => {
      if (this.isAddedHelper(item.id)) {
        return {
          ...item,
          added: true
        }
      }
      return {
        ...item,
        added: false
      }
    });
  } 

  playlistAction = () => {
    if (this.isAdded()) {
      this.removePlaylist();
    } else {
      this.addPlaylist();
    }
  }

  getList = () => {
    const { getList } = this.props;
    const list = getList();    
    return this.addedToLibrary(list);
  }

  render() {    
    const { position, listUp, listDown, back, playlist, listAlign } = this.props;
    const { searchValue, isReady } = this.state;

    const renderPlaylists = () => {
      let tips = null;
      const list = this.getList();
      
      if (list.length) {
        const offset = playlist ? 45 : 15;
        listAlign(this.listRef, offset);
      }
      
      const softKeys = this.isTip()
        ? (
            <SoftKeys 
              left="Back"
              center="SELECT"
              right="Add"
            />
          )
        : (
          <SoftKeys 
            left="Back"
            center="SELECT"
            right={this.isAdded() ? "Remove" : "Add"}
            onKeyUp={listUp} 
            onKeyDown={listDown}
            onSoftKeyLeft={back}
            onKeyCenter={this.playPlaylist}
            onSoftKeyRight={this.playlistAction}
          />
        );

      if (this.isTip()) {
        if (playlist) {
          tips = <Tips type="tipWidget" />;
        } else {
          tips = <Tips type="tipAdd" />;
        }
      }

      return (
        <React.Fragment>
          <Search 
            placeholder="Find in playlist"
            value={searchValue}
            change={this.onSearchChange}
          />
          { list.length
             ? <PlaylistsList 
                ref={this.listRef}
                list={list}
                position={position}  
              />
             :  <InfoScreen type="noResults" />
          }
          { softKeys }
          { tips }
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
      { isReady ? renderPlaylists() : null}
      </React.Fragment>
    );
  }
}

export default WithListController(Playlists, ITEMS_ON_SCREEN);