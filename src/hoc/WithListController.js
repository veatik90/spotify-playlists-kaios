import React, { Component } from 'react';

function WithListController(WrappedComponent, itemsOnScreen) {

  return class extends Component {
    state = {
      position: 0,
      listOffset: 0,
      amount: 0,
      topEdge: false,
      bottomEdge: false,
      withWidget: false,
      list: []
    }

    setPosition = (position) => {
      this.setState({
        position
      });
    }

    saveList = (list) => {
      this.setState({
        list: list,
        amount: list.length
      });
    }

    updateList = (items, searchValue = '') => {
      const result = this.handleItems(items, searchValue);

      this.setState({
        list: result,
        amount: result.length,
        position: 0,
        listOffset: 0,
        topEdge: false,
        bottomEdge: false
      });
    }

    getActiveItem = () => {
      const { list, listOffset, position } = this.state;
      return list[listOffset + position];
    }

    handleItems = (items, searchValue) => {
      if (searchValue) {
        const result = items.filter(item => item.name
          .toLowerCase()
          .indexOf(searchValue.toLowerCase()) > -1
        );
        return result;
      }
  
      return items;
    }

    getList = () => {
      const { list, listOffset } = this.state;

      return list.slice(listOffset, listOffset + itemsOnScreen);
    }

    setWithWidget = () => {
      this.setState({
        withWidget: true
      })
    }

    isLastItem = () => {
      const { position, listOffset, amount } = this.state;
      if (position + listOffset === amount- 1) {
        this.setPosition(position - 1);
      }
    }

    nextListItem = (prevState) => {
      const nextOffset = prevState.listOffset + 1;
      const items = prevState.withWidget ? itemsOnScreen - 1 : itemsOnScreen;
      if (nextOffset > prevState.amount - items) {
        return prevState;
      }

      return {
        listOffset: nextOffset
      }
    }
  
    prevListItem = (prevState) => {
      const nextOffset = prevState.listOffset - 1;
      if (nextOffset < 0) {
        return prevState;
      }

      return {
        listOffset: nextOffset
      }
    }

    listUp = () => {
      this.setState((prevState) => {
        const nextPos = prevState.position - 1;
        if (nextPos < 0) {
          return this.prevListItem(prevState);
        }

        if (nextPos === 0) {  
          return {
            position: nextPos,
            topEdge: true,
            bottomEdge: false
          }
        }
  
        return {
          position: nextPos,
          topEdge: false, 
          bottomEdge: false
        }
      });
    }
  
    listDown = () => {
      this.setState((prevState) => {
        const nextPos = prevState.position + 1;
        const offset = 1;
        const items = prevState.withWidget ? itemsOnScreen - 1 : itemsOnScreen;

        if (nextPos > prevState.amount - 1) {  
          return {
            position: prevState.position
          }
        }

        if (nextPos > items - offset) {  
          return this.nextListItem(prevState);
        }


        if (nextPos === items - offset) {  
          return {
            position: nextPos,
            bottomEdge: true,
            topEdge: false
          }
        }

  
        return {
          position: nextPos,
          bottomEdge: false,
          topEdge: false    
        }
      });
    }

    listAlign = (ref, y) => {
      const { topEdge, bottomEdge } = this.state;
      if (topEdge) {
        setTimeout(()=>ref.current.scrollTo(0, 0), 0)
      }

      if (bottomEdge) {
        setTimeout(()=>ref.current.scrollTo(0, y), 0)
      }
          
    }

    render() {
      const { position } = this.state;
      return <WrappedComponent
       {...this.props}
       position={position}
       listAlign={this.listAlign}
       listUp={this.listUp}
       listDown={this.listDown}
       getList={this.getList}
       widget={this.setWithWidget}
       saveList={this.saveList}
       updateList={this.updateList}
       activeItem={this.getActiveItem}
       isLastItem={this.isLastItem}
      />;
    }
  }
}

export default WithListController;