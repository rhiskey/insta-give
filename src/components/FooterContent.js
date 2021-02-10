import React from 'react';
import InstagramLogin from 'react-instagram-login';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ReactDOM from 'react-dom';

const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

class FooterContent extends React.Component {

  render() {

    const responseInstagram = (response) => {
      console.log(response);

      // //Передаем код авторизации для получения токена
      fetch('https://dry-plains-18498.herokuapp.com/oauth', {
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
    }

    return (
      <span className="">

        <InstagramLogin
          clientId="296560698030895"
          scope="user_profile,user_media"
          buttonText="Войти через Instagram"
          onSuccess={responseInstagram}
          onFailure={responseInstagram}
        //implicitAuth = {getAccessToken} //Не работает: invalid response type=token
        />

      </span >
    );
  }
}
export default FooterContent;