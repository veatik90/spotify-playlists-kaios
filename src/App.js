import React, { Component } from 'react';
import hash from './hash';
import StatusBar from './components/StatusBar/StatusBar';
import LoginPage from './components/LoginPage/LoginPage';
import Playlists from './containers/Playlists/Playlists';
import Player from './containers/Player/Player';
import Genres from './containers/Genres/Genres';
import Library from './containers/Library/Library';
import Loader from './components/Loader/Loader';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Widget from './components/Widget/Widget';

import { openDb } from './helpers/dbHelper';

const SERVER_ERROR = 'Can\'t get data';

class App extends Component {

  state = {
    token: '',
    genre: '',
    currentPlaylist: '',
    page: 'library',
    prevPage: 'library',
    loading: true,
    db: null,
    error: ''
  }

  componentDidMount() {
    const { token } = this.state;
    let _token = hash.access_token;  
    navigator.spatialNavigationEnabled = true;
 
    
    if (_token) {
      this.setLoadingState(false);  

      this.isOnline();
      this.isHashPressed();
  
      openDb()
        .then(db => {
          this.setState({
            token: _token,
            db
          });
        })
        .catch(error => {
          this.setState({
            token: _token,
            error
          });
        });
    } else if(!_token && !token) {
      this.login();
    }
  }

  componentWillUnmount() {
    const { db } = this.state;
    db && db.close();
    document.removeEventListener('keydown', this.handleWidgetOpening);
  }

  componentDidUpdate(prevProps, prevState) {
    const { token } = this.state;
    
    if (token === '' && token !== prevState.token) {
      this.login();
    }
  }
  

  login = () => {
    const login = document.getElementById('login');
    login.click();  
  }

  handleWidgetOpening = (e) => {    
    if (e.key === '#') {
      this.setState(prevState => {
        if (prevState.page !== 'player' && prevState.currentPlaylist) {
          return {
            page: 'player',
            prevPage: prevState.page
          }
        }
        return prevState;
      })      
    }
  }

  isHashPressed = () => {
    document.addEventListener('keydown', this.handleWidgetOpening);
  }

  isOnline = () => {
    window.addEventListener('load', function() {
    
      const updateOnlineStatus = () => {
        if (!navigator.onLine) {
          this.setError();
        }
      }
    
      window.addEventListener('online',  updateOnlineStatus);
      window.addEventListener('offline', updateOnlineStatus);
    }); 
  }


  setCurrentPlaylist = (playlistId) => {    
    this.setState(prevState => {      
      return {
        currentPlaylist: playlistId,
        page: 'player',
        prevPage: prevState.page
      }
    })
  }

  setGenre = (genre) => {
    this.setState({
      genre: genre,
      page: 'playlists'
    });
  }

  setPage = (page) => {
    this.setState({
      page
    });
  }

  setError = (error) => {    
    this.setState(prevState => {
      switch (error.status) {
        case 404:
        case 500: return {
          page: 'error',
          error: SERVER_ERROR,
          loading: false
        }
        case 401: return {
          page: 'library',
          token: '',
          loading: false
        }
        default: break;
      }
    })
    // this.setState({
    //   page: 'error',
    //   loading: false
    // });
  }

  getBack = (page) => {
    this.setState(prevState => {      
      switch (page) {
        case 'error':
        case 'genres': return {
          page: 'library'
        }
        case 'playlists': return {
          page: 'genres'
        }
        case 'player': return {
          page: prevState.prevPage
        }
        default: return prevState;
      }
    });
  }

  setLoadingState = (state) => {
    this.setState({
      loading: state
    });
  }

  renderWidget = () => {
    const { currentPlaylist, page } = this.state;

    if (currentPlaylist.name && page !== 'player') {
      return <Widget playlist={currentPlaylist.name} />
    }

     return null;
  }

  renderPages = () => {
    const { token, genre, page, currentPlaylist, db, error } = this.state;

    switch (page) {
      case 'library': return (
        <Library 
          discover={() => {this.setPage('genres')}}
          play={this.setCurrentPlaylist}
          playlist={currentPlaylist.name}
          db={db}
        />
      );
      case 'genres': return (
        <Genres 
          token={token}
          setGenre={this.setGenre} 
          back={() => {this.getBack(page)}}
          playlist={currentPlaylist.name}
          load={this.setLoadingState}
          setError={this.setError}
        />);
      case 'playlists': return (
        <Playlists 
          token={token} 
          genre={genre} 
          play={this.setCurrentPlaylist}
          add={this.addToLibrary}
          back={() => {this.getBack(page)}}
          playlist={currentPlaylist.name}
          load={this.setLoadingState}
          db={db}
          setError={this.setError}
        />
      );
      case 'player': return (
        <Player 
          playlist={this.state.currentPlaylist}
          back={() => {this.getBack(page)}}
          load={this.setLoadingState}
          db={db}
        />
      );
      case 'error': return (
        <ErrorPage 
          error={error}
          back={() => {this.getBack(page)}}
        />
      ); 
      default: return <Library />
    }
  }

  render () {    
    const { token, loading } = this.state;
    
    return (
      <React.Fragment>
        <StatusBar ></StatusBar>
        { !token 
          ? <LoginPage />
          : this.renderPages()
        }
        { loading && <Loader /> }
        { this.renderWidget() }
      </React.Fragment>
    );
  }
}

export default App;
