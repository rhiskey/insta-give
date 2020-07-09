import React, { Component, Suspense } from 'react';
// import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
// import Post from './components/Post';
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, CardWrapper } from 'react-swipeable-cards';
// import styled from "styled-components";
// import { useTable, useSortBy } from "react-table";

// import InfiniteScroll from "react-infinite-scroll-component";
import InstagramLogin from 'react-instagram-login';
// import ReactDOM from 'react-dom';
//Multi-pages
import { BrowserRouter, Route, Switch } from 'react-router-dom';


// import FooterContent from './components/FooterContent';
import BottomNavigation from '@material-ui/core/BottomNavigation';
// import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
// import RestoreIcon from '@material-ui/icons/Restore';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import LocationOnIcon from '@material-ui/icons/LocationOn';
import 'fontsource-roboto';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ThemeProvider } from '@material-ui/styles';
// import ThemeSwitch from './components/ThemeSwitch'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switcher from '@material-ui/core/Switch';
// import { lightTheme, darkTheme } from './theme';
import MiniMenu from './components/miniDrawer';

import {
  AppBar,
  CssBaseline,
  Typography,
  createMuiTheme
} from "@material-ui/core";

//ROUTES
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Error from './components/Error';
import Navigation from'./components/Navigation';
import Agreement from'./components/Agreement';
import Privacy from './components/Privacy';
// //FUCK GG Theme not change in all elements нужно через CONTEXT
// const Home = lazy(()=>import('./components/Home'));
// const About = lazy(()=>import( './components/About'));
// const Contact = lazy(()=>import( './components/Contact'));
// const Error = lazy(()=>import( './components/Error'));
// const Navigation = lazy(()=>import( './components/Navigation'));
// const Agreement = lazy(()=>import( './components/Agreement'));
// const Privacy = lazy(()=>import( './components/Privacy'));

//Config
// require('dotenv').config();

const themeLight = createMuiTheme({
  palette: {
    type: "light"
  }
});
const themeDark = createMuiTheme({
  palette: {
    type: "dark"
  }
});


// Create custom end card
class MyEndCard extends Component {
  render() {
    return (
      <div>Больше нет раздач!</div>
    );
  }
}

// function App() {
//   const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

//   const theme = React.useMemo(
//     () =>
//       createMuiTheme({
//         palette: {
//           type: prefersDarkMode ? 'dark' : 'light',
//         },
//       }),
//     [prefersDarkMode],
//   );

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline/>
//       <Routes />
//     </ThemeProvider>
//   );
// }

// function Toolbar(props){
//   return(
//     <FormControlLabel
//     control={
//       <Switcher
//         checked={props.isThemeLight}
//         onChange={props.onThemeChange}
//         name="checkedB"
//         color="primary"
//       />
//     }
//     label={props.isThemeLight ? "Светлая тема" : "Темная тема"}
//   />
//   )
// }

class App extends Component {
  //state ={users: []}

  constructor(props) {
    super(props);
    this.state = {
      usersMain: [],
      childVisible: false,
      //followers: [],
      allJoin: [],
      // cards: cards,
      // outOfCards: false
      expandedRows: [],
      accessToken: '',
      // isToggleOn: true //ПОдписка
      navitem: undefined,
      setNav: undefined,
      isThemeLight: true
    };
    this.onClickMainUser = this.onClickMainUser.bind(this);
    // this.onThemeChange = this.onThemeChange.bind(this);
  }
  state = {
    // isThemeLight: false
  }

  componentDidMount(){

  }
  componentWillUnmount(){
    
  }
  
  onThemeChange = ( ) => {  
    // this.setState({
    //   isThemeLight: !this.state.isThemeLight
    // });
    this.setState(prevState => ({ isThemeLight: !prevState.isThemeLight }));
  }

  fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      this.setState({
        //usersMain: this.state.usersMain.concat(Array.from({ length: 20 }))
      });
    }, 1500);
  };

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

  onClickMainUser(data) {
    this.setState(prevState => ({ childVisible: !prevState.childVisible }));
  }

  render() {

    const { isThemeLight } =  this.state;
    // const theme = AutoTheme;
    // const { users } = this.state;
    const { index } = this.state;
    // const classes = useStyles();
    const navitem = this.state.navitem;
    const setNav = this.state.setNav;
    
    const responseInstagram = (response) => {
      console.log(response);

      // //Передаем код авторизации для получения токена
      fetch("https://dry-plains-18498.herokuapp.com"+'/oauth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          // user: {
          authCode: response
          // }
        })
      })
        .then(response2 => {
          if (response2.ok) {
            return response2.text();
          }
        }
        )
        .then(function (data) {
          console.log(data); // this will be a AccessToken
          this.setState.accessToken = data;

          // this.setState((state, props)=>({
          //   accessToken: data
          // }))

          // https://www.instagram.com/web/friendships/5401182145/follow/
          // https://www.instagram.com/web/friendships/5401182145/unfollow/
        })
        .catch(err => {
          console.log('caught it!', err);
        });
    }
    // this.state.usersMain.map(item => {
    //   const perItemRows = this.renderItem(item);
    //   allItemRows = allItemRows.concat(perItemRows);
    // });

  

    return <div className="App">
      {/* <ThemeProvider theme={theme}> */}
      <Suspense fallback={<div>Загрузка...</div>}>
      <ThemeProvider theme={ isThemeLight ? themeLight : themeDark}>
        <CssBaseline />
        <Typography style={{ marginTop: 60 }}>
          {/* Text should be white, background should be dark */}
        </Typography>

        <Header />

        <MiniMenu />
        {/* <CssBaseline />
      <Typography style={{ marginTop: 50 }}>
        Text should be white, background should be dark
      </Typography>
      <AppBar color="inherit">
        <Typography variant="h6">App bar background should be dark!</Typography>
      </AppBar> */}


        <BrowserRouter>
          <div>
            <Navigation />

          
            <Switch>
              <Route  path="/" component={Home} exact />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/privacy" component={Privacy} />
              <Route path="/agreement" component={Agreement} />
              <Route component={Error} />
            </Switch>

          </div>
        </BrowserRouter>

        <Footer>

          <span >

            <BottomNavigation
              value={this.navitem}
              onChange={(event, newValue) => {
                // this.state.setNav = newValue;
                this.setState((state,props) => ({
                  setNav: newValue
                }))
              }}
              showLabels
            >
              {/* <BottomNavigationAction label="Текушие раздачи" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Избранные раздачи" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Раздачи рядом" icon={<LocationOnIcon />} /> */}

              <InstagramLogin
                clientId='296560698030895'
                scope="user_profile,user_media"
                buttonText="Войти через Instagram"
                onSuccess={responseInstagram}
                onFailure={responseInstagram}
              />
              <span style={{ marginLeft: 15 }}>
                {/* <Toolbar isThemeLight = {isThemeLight} onThemeChange = {this.onThemeChange}/> */}
                <FormControlLabel
                  control={
                    <Switcher
                      checked={isThemeLight}
                      onChange={this.onThemeChange}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label={isThemeLight ? "Светлая тема" : "Темная тема"}
                />
              </span>
            </BottomNavigation>
          </span >
        </Footer>

      </ThemeProvider>
      </Suspense>
    </div>
    
  }
}


export default App;

function Footer({ children }) {
  return (
    <div>
      <div className="phantomStyle" />
      <div className="footerStyle">{children}</div>
    </div>
  );
}

class Child extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };

  }
  async componentDidMount() {
    //this.getUsers();

  }

  render() {
    // const { users } = this.state;

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

