import React, { Component } from 'react';
import Search from '../../components/Search/Search';
import SoftKeys from '../Softkey/Softkey';
import GenresList from '../../components/GenresList/GenresList';
import InfoScreen from '../../components/InfoScreen/InfoScreen';
import WithListController from '../../hoc/WithListController';
import browse from '../../axiosBrowse';

const ITEMS_ON_SCREEN = 8;


class Genres extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      searchValue: ''
    }
    this.listRef = React.createRef();
  }

  componentDidMount() {
    const { token, playlist, widget } = this.props;
    navigator.spatialNavigationEnabled = false;
    this.fetchGenres(token);
    playlist && widget();
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchValue } = this.state;
    if (searchValue !== prevState.searchValue) {
      prevProps.updateList(prevState.genres, searchValue);
    }
  }

  onSearchChange = (e) => {
    const searchValue = e.target.value;
    
    this.setState({
      searchValue: searchValue.replace(/[^\w\s]/gi, "")
    });
  } 

  fetchGenres = (token) => {
    const { saveList, load, setError } = this.props;
    const headers = {
      Authorization: `Bearer ${token}`
    }
    const params = {
      limit: 50
    }

    load(true);

    browse.get('categories', {
      headers,
      params
    })
      .then(response => {
        const categories = response.data.categories.items;
      
        const categoriesArr = categories.map(item => {
          const img = new Image();
          img.src = item.icons[0].url;
          
          return {
            id: item.id,
            name: item.name,
            icon: item.icons[0]
          }
        })
        this.setState({
          genres: categoriesArr,
          isReady: true
        })
        saveList(categoriesArr);
        load(false);
      })
      .catch(err => setError(err.response.data.error))
  }

  onKeyUp = () => {
    this.props.listUp();
  }

  onKeyDown = () => {
    this.props.listDown();
  }

  setGenre = () => {
    const { setGenre, activeItem } = this.props;
    
    const id  = activeItem().id;    
    setGenre(id);
  }

  render() {
    const { position, back, getList, listAlign } = this.props;
    const { searchValue } = this.state;

    const renderGenres = () => {
      const list = getList();
      if (list.length) {
        const offset = 15;
        listAlign(this.listRef, offset);
      }
      
      return (
        <React.Fragment>
          <Search 
            placeholder="Find in genres"
            value={searchValue}
            change={this.onSearchChange}
          />
          { list.length
             ? <GenresList 
                  ref={this.listRef}
                  list={list}
                  position={position}  
                />
             :  <InfoScreen type="noResults" />
          }
          <SoftKeys 
            left="Back"
            center="SELECT"
            onKeyUp={this.onKeyUp} 
            onKeyDown={this.onKeyDown}
            onKeyCenter={this.setGenre}
            onSoftKeyLeft={back}
          />
        </React.Fragment>
    )};

    return(
      <React.Fragment>
      { this.state.isReady ? renderGenres() : null}
      </React.Fragment>
    ); 
  }
}

export default WithListController(Genres, ITEMS_ON_SCREEN);