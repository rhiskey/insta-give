import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Post from './components/Post';
import "bootstrap/dist/css/bootstrap.min.css";

import { Card, CardWrapper } from 'react-swipeable-cards';

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
      childVisible: false
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
      
    }
    let data = [{id: 1, name: "kslvus", avatar: "https://www.kinonews.ru/insimgs/2019/newsimg/newsimg87089.jpg", info: "Раздача началась 💰Сделаю 5 стопа 🛑 по 5000 тр. Чем больше комментов, тем больше шансов выиграть бабло 🤑Обязательно должен быть подписанным на мою страницу"},
    {id: 2, name: "Аккаунт 2", avatar: "https://scontent-hel2-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/81640348_596430880914216_5009838966112953440_n.jpg?_nc_ht=scontent-hel2-1.cdninstagram.com&_nc_cat=100&_nc_ohc=PKa9EzwGwGcAX8v7ini&oh=ff91862943213f43df3843666c3188e4&oe=5EFD611F", info: "Условия раздачи 2"},
    {id: 1, name: "Аккаунт 3", avatar: "", info:"Условие раздачи 3"}];
    return data.map((d) => {
      return(
        <Card style={cardStyle}
          key={d.id}
          //onSwipe={this.onSwipe.bind(this)}
          // onSwipeLeft={this.onSwipeLeft.bind(this)}
          // onSwipeRight={this.onSwipeRight.bind(this)}
          onDoubleTap={this.onDoubleTap.bind(this)}
          data={d}>
            <span><h2>{d.name} </h2></span>
            <img border="4" align="middle" hspace="5px" vspace="5px" alt="Giveaway user avatar" src={d.avatar} width="520px" height="370px"></img>
            <span className ="App-give-text">{d.info}</span>
        </Card>
      );
    });

  }

  getEndCard() {
    return(
      <MyEndCard/>
    );
  }
  
  render() {
    const { users } = this.state;
    const selvalue = this.state.value;
    const wrapperStyle = {
      backgroundColor: "#FFFFFF"
    }

    return <div className="App">
      <Header />
      <section className="App-main">
        <div><h1>Giveaway на сегодня: </h1></div>

      
{/* 
      <CardWrapper addEndCard={this.getEndCard.bind(this)}>
        <Card>First</Card>
        <Card>Second</Card>
      </CardWrapper> */}

      <CardWrapper addEndCard={this.getEndCard.bind(this)}  style={wrapperStyle}>
        {this.renderCards()}
      </CardWrapper>
      
      </section>

      <section className ="App-user">
      {
          this.state.childVisible
            ? <Child />
            : null
        }

     
        {/* more posts */}
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
    
    return (      <div id ="posts-containter">
      <h2>Подпишись на эти аккаунты для участия в раздаче: </h2>
    {this.state.users.map(member =>
    <center><tr key={member.username}>
    <Post nickname={member.username} avatar={member.avatar} followlink={member.link} />

    </tr></center>
    )}
  </div>);
  }
}