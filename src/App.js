'use strict';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Post from './components/Post';
import "bootstrap/dist/css/bootstrap.min.css";
import styled, { keyframes } from 'styled-components';

import { Card, CardWrapper } from 'react-swipeable-cards';

import { fadeInDown } from 'react-animations';

////React Native
// import {StyleSheet, Text, View, Image, Button, SwipeStyles} from 'react-native';
// import SwipeCards from 'react-native-swipeable-cards';
const fadInDonwAnimation = keyframes`${fadeInDown}`;
const fadeDiv = styled.div`
  animation: 3s ${fadInDonwAnimation};
`;

// Create custom end card
class MyEndCard extends Component {
  render() {
    return(
      <div>Больше нет раздач!</div>
    );
  }
}

class App extends Component {
  //state ={users: []}

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      childVisible: false,
      // cards: cards,
      // outOfCards: false
    };

  }

  componentDidMount() {
    //this.getUsers();

    //Subscribtion MAIN accs
    let self = this;
        fetch('https://dry-plains-18498.herokuapp.com/accounts', {
            method: 'GET'
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            self.setState({users: data});
        }).catch(err => {
        console.log('caught it!',err);
        })
  }

  //Cards
  onSwipe(data) {
    console.log(data.name + " was swiped.");
    //showPost
    //
    //this.setState(prevState => ({ childVisible: !prevState.childVisible }));
  }

  onSwipeLeft(data) {
    console.log("Свайп влево!");
  }

  onSwipeRight(data) {
    console.log("Свайп вправо!");
  }

  onDoubleTap(data) {
    console.log(data.name + "Даблклик!");
    
    //show users in page after card
    this.setState(prevState => ({ childVisible: !prevState.childVisible }));
      {/* more posts */}

  }

  renderCards() {
    const cardStyle = {
      //backgroundColor: "#059FFF"
      backgroundColor: "#FFFFFF",
          alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: 'grey',
    backgroundColor: 'white',
    borderWidth: 1,
    elevation: 1,
    }
    const thumbstyle = {
    width: 400,
    height: 400,
    align: "middle" 
    }
    let data = [{id: 1, name: "Аккаунт 1", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQxaWhMtrjqRIgh4JYLB0oDIGBU5hBIpT1QIO9y0C3-uoWrhD5h&usqp=CAU", info: "Раздача началась 💰Сделаю 5 стопа 🛑 по 5000 тр. Чем больше комментов, тем больше шансов выиграть бабло 🤑Обязательно должен быть подписанным на мою страницу"},
    {id: 2, name: "Аккаунт 2", avatar: "https://scontent-hel2-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/81640348_596430880914216_5009838966112953440_n.jpg?_nc_ht=scontent-hel2-1.cdninstagram.com&_nc_cat=100&_nc_ohc=PKa9EzwGwGcAX8v7ini&oh=ff91862943213f43df3843666c3188e4&oe=5EFD611F", info: "Условия раздачи 2"},
    {id: 1, name: "Аккаунт 3", avatar: "https://rubic.us/wp-content/uploads/2017/05/rich.jpg", info:"Условие раздачи 3"}];
    return data.map((d) => {
      return(   
        <Card style={cardStyle}
          key={d.id}
          //onSwipe={this.onSwipe.bind(this)}
          // onSwipeLeft={this.onSwipeLeft.bind(this)}
          // onSwipeRight={this.onSwipeRight.bind(this)}
          onDoubleTap={this.onDoubleTap.bind(this)}
          data={d}>  
            <div>
            <img style={thumbstyle} alt="Giveaway user avatar" src={d.avatar}></img>
            <b className ="App-give-text">{d.name}:</b>
            
            <span className ="App-give-text">{d.info}</span>
            </div>
            
        </Card>     
      );
    });

  }

  getEndCard() {  
    return(
      <MyEndCard/>
    );
  }
  
  // //REact Native
  // cardSwipedRight (card) {
  //   console.log("LIKED!")
  // }

  // cardSwipedLeft (card) {
  //   console.log("DISLIKED!")
  // }

  // cardRemoved (index) {
  //   console.log(`The index is ${index}`);

  //   let CARD_REFRESH_LIMIT = 3

  //   if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
  //     console.log(`There are only ${this.state.cards.length - index - 1} cards left.`);

  //     if (!this.state.outOfCards) {
  //       console.log(`Adding ${cards2.length} more cards`)

  //       this.setState({
  //         cards: this.state.cards.concat(cards2),
  //         outOfCards: true
  //       })
  //     }

  //   }

  // }
  render() {
    const { users } = this.state;
    const selvalue = this.state.value;
    const wrapperStyle = {
    backgroundColor: "#FFFFFF",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    }

    return <div className="App">
      <Header />
      <section className="App-main">
        <div><h1>Giveaway на сегодня: </h1></div>
      <div>

      <CardWrapper addEndCard={this.getEndCard.bind(this)}  style={wrapperStyle} >
        
        {this.renderCards()}
      </CardWrapper>


            {/* <SwipeCards
        cards={this.state.cards}
        ref = {(swiper) => this.swiper = swiper}
        loop={false}
        renderCard={(cardData) => <Card swiper={this.swiper} {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}
        showRightOverlay={true}
        showLeftOverlay={true}
        stackDepth={3}
        stack={true}
        keyExtractor={(card) => {
          return card.name
        }}
        onSwipeRight={this.cardSwipedRight}
        onSwipeLeft={this.cardSwipedLeft}
        cardRemoved={(card) => this.cardRemoved(card)}
      /> */}

      </div>
      </section>

      <section className ="App-user">
      {
          this.state.childVisible
            ? <Child />
            : null
        }
      </section>

    </div>
  }
}

// ReactDOM.render(
//   <App />,
//   mountNode
// );
export default App;

class Child extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],

    };

  }
  componentDidMount() {
    //this.getUsers();

    //Subscribtion accs
    let self = this;
        fetch('https://dry-plains-18498.herokuapp.com/accounts', {
            method: 'GET'
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            self.setState({users: data});
        }).catch(err => {
        console.log('caught it!',err);
        })
  }

  render() {
    const { users } = this.state;
    
    return ( <div id ="posts-containter">
      <h3>Подпишись на эти аккаунты для участия в раздаче: </h3>
    {this.state.users.map(member =>
    <center><tr key={member.username}>
    <Post nickname={member.username} avatar={member.avatar} followlink={member.link} />

    </tr></center>
    )}
  </div>
 );
  }
}

// //React Native Cards
// class Card extends Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       <View style={styles.card}>
//         <Image style={styles.thumbnail} source={{uri: this.props.image}} />
//         <Text style={styles.text}>This is card {this.props.name}</Text>
//         <Button type='outline' title='Nah' 
//         style={SwipeStyles.rejectButton} 
//         onPress={() => {
//             this.props.swiper._forceNextCard()
//         }}
//       />
//       </View>
//     )
//   }
// }

// class NoMoreCards extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       <View style={styles.noMoreCards}>
//         <Text>No more cards</Text>
//       </View>
//     )
//   }
// }

// const cards = [
//   {name: '1', image: 'https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif'},
//   {name: '2', image: 'https://media.giphy.com/media/irTuv1L1T34TC/giphy.gif'},
//   {name: '3', image: 'https://media.giphy.com/media/LkLL0HJerdXMI/giphy.gif'},
//   {name: '4', image: 'https://media.giphy.com/media/fFBmUMzFL5zRS/giphy.gif'},
//   {name: '5', image: 'https://media.giphy.com/media/oDLDbBgf0dkis/giphy.gif'},
//   {name: '6', image: 'https://media.giphy.com/media/7r4g8V2UkBUcw/giphy.gif'},
//   {name: '7', image: 'https://media.giphy.com/media/K6Q7ZCdLy8pCE/giphy.gif'},
//   {name: '8', image: 'https://media.giphy.com/media/hEwST9KM0UGti/giphy.gif'},
//   {name: '9', image: 'https://media.giphy.com/media/3oEduJbDtIuA2VrtS0/giphy.gif'},
// ]

// const cards2 = [
//   {name: '10', image: 'https://media.giphy.com/media/12b3E4U9aSndxC/giphy.gif'},
//   {name: '11', image: 'https://media4.giphy.com/media/6csVEPEmHWhWg/200.gif'},
//   {name: '12', image: 'https://media4.giphy.com/media/AA69fOAMCPa4o/200.gif'},
//   {name: '13', image: 'https://media.giphy.com/media/OVHFny0I7njuU/giphy.gif'},
// ]


// const styles = StyleSheet.create({
//   card: {
//     alignItems: 'center',
//     borderRadius: 5,
//     overflow: 'hidden',
//     borderColor: 'grey',
//     backgroundColor: 'white',
//     borderWidth: 1,
//     elevation: 1,
//   },
//   thumbnail: {
//     width: 300,
//     height: 300,
//   },
//   text: {
//     fontSize: 20,
//     paddingTop: 10,
//     paddingBottom: 10
//   },
//   noMoreCards: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   }
// })