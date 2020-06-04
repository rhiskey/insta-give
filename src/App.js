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

const fadInDonwAnimation = keyframes`${fadeInDown}`;
const fadeDiv = styled.div`
  animation: 3s ${fadInDonwAnimation};
`;

// Create custom end card
class MyEndCard extends Component {
  render() {
    return (
      <div>Больше нет раздач!</div>
    );
  }
}

class App extends Component {
  //state ={users: []}

  constructor(props) {
    super(props);
    this.state = {
      usersMain: [],
      childVisible: false,
      // cards: cards,
      // outOfCards: false
    };
    this.onClickMainUser = this.onClickMainUser.bind(this);

  }

  componentDidMount() {
    //this.getUsers();

    //Subscribtion MAIN accs
    let self = this;
    fetch('https://dry-plains-18498.herokuapp.com/mainusers', {
      method: 'GET'
    }).then(function (response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    }).then(function (data) {
      self.setState({ usersMain: data });
    }).catch(err => {
      console.log('caught it!', err);
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
    {/* more posts */ }

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
    let data = [{ id: 1, name: "Аккаунт 1", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQxaWhMtrjqRIgh4JYLB0oDIGBU5hBIpT1QIO9y0C3-uoWrhD5h&usqp=CAU", info: "Раздача началась 💰Сделаю 5 стопа 🛑 по 5000 тр. Чем больше комментов, тем больше шансов выиграть бабло 🤑Обязательно должен быть подписанным на мою страницу" },
    { id: 2, name: "Аккаунт 2", avatar: "https://scontent-hel2-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/81640348_596430880914216_5009838966112953440_n.jpg?_nc_ht=scontent-hel2-1.cdninstagram.com&_nc_cat=100&_nc_ohc=PKa9EzwGwGcAX8v7ini&oh=ff91862943213f43df3843666c3188e4&oe=5EFD611F", info: "Условия раздачи 2" },
    { id: 3, name: "Аккаунт 3", avatar: "https://rubic.us/wp-content/uploads/2017/05/rich.jpg", info: "Условие раздачи 3" }];
    return data.map((d) => {
      return (
        <Card style={cardStyle}
          key={d.id}
          //onSwipe={this.onSwipe.bind(this)}
          // onSwipeLeft={this.onSwipeLeft.bind(this)}
          // onSwipeRight={this.onSwipeRight.bind(this)}
          onDoubleTap={this.onDoubleTap.bind(this)}
          data={d}>
          <div className="App-card">
            <img className="App-giveaway-avatar" alt="Giveaway user avatar" src={d.avatar}></img>
            <b className="App-give-text">{d.name}:</b>

            <span className="App-give-text">{d.info}</span>
          </div>

        </Card>
      );
    });

  }

  getEndCard() {
    return (
      <MyEndCard />
    );
  }

  onClickMainUser(data){
    this.setState(prevState => ({ childVisible: !prevState.childVisible }));
  }

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

          {/* <CardWrapper addEndCard={this.getEndCard.bind(this)}  style={wrapperStyle} >
        
        {this.renderCards()}
      </CardWrapper> */}

          <center><table className="Giveaway-table" >
            <thead>
              <tr>
                <th>
                  Аватар
                    </th>
                <th>
                  Имя пользователя
                   </th>
                <th>
                  Инфо раздачи
                    </th>
              </tr>
            </thead>
            <tbody>
              {this.state.usersMain.map(member => {
                return (
                  <tr key={member.username}>
                    <td>
                      <a href={member.link}>
                        <img className="instaImage" border="0" alt="FollowImage" src={member.avatar} width="100" height="100"></img>
                      </a>
                    </td>
                    <td>
                      <a href={member.link}>{member.username}</a></td>
                    <td>
                      <b onClick={this.onClickMainUser}>{member.giveinfo}</b>
                    </td>
                    <td>
                    <section className="App-user">
                        {
                          this.state.childVisible
                            ? <Child />
                            : null
                        }
                      </section>
                    </td>
                    {/* <td dangerouslySetInnerHTML={{__html: member.Ban ? '<input checked="checked" class="check-box" disabled="disabled" type="checkbox">' : '<input class="check-box" disabled="disabled" type="checkbox">'}}></td> */}
                  </tr>
                );
              })
              }
            </tbody>
          </table></center>
        </div>
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
    }).then(function (response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    }).then(function (data) {
      self.setState({ users: data });
    }).catch(err => {
      console.log('caught it!', err);
    })
  }

  render() {
    const { users } = this.state;

    return (<div id="posts-containter">
      <h3>Подпишись на эти аккаунты:</h3>


      {/* {this.state.users.map(member =>
    <center><tr key={member.username}>
    <Post nickname={member.username} avatar={member.avatar} followlink={member.link} />
    </tr></center>
    )} */}

      <center><table className="User-table" >
        <thead>
          <tr>
            <th>
              Аватар
                    </th>
            <th>
              Имя пользователя
                   </th>
            <th>
              Ссылка на подписку
                    </th>
          </tr>
        </thead>
        <tbody>
          {this.state.users.map(member => {
            return (
              <tr key={member.username}>
                <td>
                  <a href={member.link}>
                    <img className="instaImage" border="0" alt="FollowImage" src={member.avatar} width="100" height="100"></img>
                  </a>
                </td>
                <td>
                  <a href={member.link}>{member.username}</a></td>
                <td>
                  <a href={member.link} class="btn btn-primary">Подпишись</a>
                </td>
                {/* <td dangerouslySetInnerHTML={{__html: member.Ban ? '<input checked="checked" class="check-box" disabled="disabled" type="checkbox">' : '<input class="check-box" disabled="disabled" type="checkbox">'}}></td> */}
              </tr>
            );
          })
          }
        </tbody>
      </table></center>

    </div>
    );
  }
}

