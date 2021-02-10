import React, { Component, Suspense } from 'react';
import './App.css';
import Header from './components/Header';
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import InstagramLogin from 'react-instagram-login';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import { ThemeProvider } from '@material-ui/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switcher from '@material-ui/core/Switch';
import MiniMenu from './components/miniDrawer';

import {
  // AppBar,
  CssBaseline,
  Typography,
  createMuiTheme
} from "@material-ui/core";

//ROUTES
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Error from './components/Error';
import Navigation from './components/Navigation';
import Agreement from './components/Agreement';
import Privacy from './components/Privacy';
import Offer from './components/Offer';


const apilink = "http://api.instagive.ga/";
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersMain: [],
      childVisible: false,
      allJoin: [],
      expandedRows: [],
      accessToken: '',
      navitem: undefined,
      setNav: undefined,
      isThemeLight: true,
    };
    this.onClickMainUser = this.onClickMainUser.bind(this);
  }

  onThemeChange = () => {
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

  
  onClickMainUser(data) {
    this.setState(prevState => ({ childVisible: !prevState.childVisible }));
  }

  

  render() {
    const { isThemeLight } = this.state;

      // //Передаем код авторизации для получения токена
      fetch(apilink+'oauth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          authCode: response
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
        })
        .catch(err => {
          console.log('caught it!', err);
        });




    return <div className="App">
      <Suspense fallback={<div>Загрузка...</div>}>
        <ThemeProvider theme={isThemeLight ? themeLight : themeDark}>
          <CssBaseline />
          <Typography style={{ marginTop: 60 }}>
          </Typography>

          <Header />
          <MiniMenu />

          <BrowserRouter>
            <div>

              <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/about" component={About} />
                <Route path="/contact" component={Contact} />
                <Route path="/privacy" component={Privacy} />
                <Route path="/agreement" component={Agreement} />
                <Route path="/offer" component={Offer} />
                <Route component={Error} />
              </Switch>

            </div>
          </BrowserRouter>

          <Footer>

            <span >

              <BottomNavigation
                value={this.navitem}
                onChange={(event, newValue) => {
                  this.setState((state, props) => ({
                    setNav: newValue
                  }))
                }}
                showLabels
              >

                <span style={{ marginLeft: 15 }}>
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
                <span style={{ marginLeft: 15 }}><a href="https://github.com/rhiskey">rhiskey(C) 2020</a></span>
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


const OtherComponent = React.lazy(() => import('fontsource-roboto'));