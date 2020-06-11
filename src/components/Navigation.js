import React from 'react';
import './Navigation.css';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Pagination from './Pagination';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
// import 'fontsource-roboto';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const stylesTab = {
   root: {
      position: 'relative',
    },
   tabs: {
      // background: '#fff',

   },
   slide: {
      padding: 15,
      minHeight: 100,
      // color: '#fff',
   },
   slide1: {
      // backgroundColor: '#405DE6',
      // color: 'black'
   },
   slide2: {
      // backgroundColor: '#B3DC4A',
      // color: 'black'
   },
   slide3: {
      // backgroundColor: '#F77737',
      // color: 'black'
   },
};

class Navigation extends React.Component {

   state = {
      index: 0,
   };

   handleChange = (event, value) => {
      this.setState({
         index: value,
      });
   };

   handleChangeIndex = index => {
      this.setState({
         index,
      });
   };

   render() {
      const { index } = this.state;

      // const Navigation = () => {
      return (

         <div className="Nav-text">

            <Tabs value={index} fullWidth onChange={this.handleChange} style={stylesTab.tabs}>
            <NavLink to="/"><HomeIcon/><Tab label="Главная" /></NavLink>
               <NavLink to="/about"><InfoIcon/><Tab label="О сервисе" /></NavLink>
               <Tab label="FAQ" />
            </Tabs>

         <AutoPlaySwipeableViews index={index} onChangeIndex={this.handleChangeIndex} >
         {/* <div style={Object.assign({}, stylesTab.slide, stylesTab.slide1)}>slide n°1</div>
         <div style={Object.assign({}, stylesTab.slide, stylesTab.slide2)}>slide n°2</div>
         <div style={Object.assign({}, stylesTab.slide, stylesTab.slide3)}>slide n°3</div> */}
            {/* <SwipeableViews index={index} onChangeIndex={this.handleChangeIndex}> */}
               <div style={Object.assign({}, stylesTab.slide, stylesTab.slide1)}>
               <h3>Insta-give - аггрегатор новых giveaways</h3>
               </div>
               <div style={Object.assign({}, stylesTab.slide, stylesTab.slide2)}>
                  <h3>О сервисе</h3>
                  {/* <p>Чтобы сразу подписаться на аккаунты, необходимо авторизироваться в Инстаграм, нажав кнопку внизу страницы "Войти через Instagram"</p> */}
                  <p>Вы можете участвовать в активных раздачах от реальных проверенных пользователей, подписавшись на спонсоров аккаунтов организаторов!</p>
                  {/* <Select value={10} autoWidth={false}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
            </Select> */}
               </div>
               <div style={Object.assign({}, stylesTab.slide, stylesTab.slide3)}>В панели управления добавляете ссылку на свой аккаунт/пост в Instagram.</div>
            {/* </SwipeableViews> */}
            </AutoPlaySwipeableViews>
       <Pagination dots={3} index={index} onChangeIndex={this.handleChangeIndex} /> 

{/* Ссылки на другие страницы */}
            {/* <b className="Nav-text"><NavLink to="/">Главная</NavLink></b>
            <span className="Nav-text"><NavLink to="/about">О сервисе</NavLink> </span> */}
            {/* <NavLink to="/contact">Contact</NavLink> */}
            
         </div>
      );
   }
}

export default Navigation;