import React, { useState } from "react";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import "bootstrap/dist/css/bootstrap.css";
// import * as legoData from "./legoloading.json";
import * as doneData from "./doneloading.json";
// import * as scrollFrames from "./scrollframesloading.json"
// import * as sckeletonFrames from "./skeletonframesloading.json"
import * as rippleLoading from "./rippleloading.json"
import './loading.css';
// import Button from '@material-ui/core/Button';

// import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
// import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';
// import Zoom from '@material-ui/core/Zoom';
// import Grow from '@material-ui/core/Grow';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
// import FaceIcon from '@material-ui/icons/Face';
// import DoneIcon from '@material-ui/icons/Done';
// import Grid from '@material-ui/core/Grid';

import Skeleton from '@material-ui/lab/Skeleton';
import Rating from '@material-ui/lab/Rating';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ChatIcon from '@material-ui/icons/Chat';
import PaymentIcon from '@material-ui/icons/Payment';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
// import clsx from 'clsx';
// import { AutoSizer, Column, Table } from 'react-virtualized';

// require('dotenv').config({ path: __dirname + '/./../.env' }) //Загружаем файл с переменными среды


const StyledRating = withStyles({
    iconFilled: {
        color: '#ff6d75',
    },
    iconHover: {
        color: '#ff3d47',
    },
})(Rating);



//Для таблицы
const numItemsPerRow = 8; //Максимально элементов в строке для полноэкранного

const containerStyle = {
    display: "flex",
    width: "200%", // Трюк, чтобы охватить 2 столбца. Костыль
    flexWrap: "wrap"
};

const itemStyle = {
    minWidth: `${100 / numItemsPerRow}%`,
    textAlign: "center",
    // border: "1px solid black",
    boxSizing: "border-box"
};
//Для таблицы

// function createData(avatar, name, info, link, avatarSponsor2set, nameSponsor2set, linkSponsor2set, nameOrganisator) {
//     return {
//         avatar,
//         name,
//         info,
//         link,
//         //   protein,
//         //   price,
//         sponsors: [
//             { avatarSponsor: avatarSponsor2set, nameSponsor: nameSponsor2set, linkSponsor: linkSponsor2set },
//         ],
//     };
// }

// Пытаемся перейти к новой версии, когда подгрузка только по клику 

// function Row(props) {
//     const { row } = props;
//     const [open, setOpen] = React.useState(false);
//     const classes = useRowStyles();

//     return (
//         <React.Fragment>

//             <TableRow className={classes.root} >
//                 {/* <TableCell> */}
//                 {/* <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
//                         {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//                     </IconButton> */}
//                 {/* </TableCell> */}

//                 <TableCell component="th" scope="row" >
//                     {/* <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
//                         {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//                     </IconButton>  */}
//                     <Tooltip title="Нажми сюда для просмотра спонсоров" arrow>{row.avatar} - {row.name}</Tooltip>
//                 </TableCell>

//                 {/* <TableCell align="right">{row.name}</TableCell> */}
//                 <TableCell align="right">{row.info}</TableCell>
//                 {/* <TableCell align="right">{row.carbs}</TableCell>
//           <TableCell align="right">{row.protein}</TableCell> */}
//             </TableRow>

//             <TableRow>
//                 <TableCell style={{ paddingBottom: 0, paddingTop: 0 }}>
//                     <Collapse in={open} timeout="auto" unmountOnExit>
//                         <Box margin={1}>
//                             <Typography variant="h6" gutterBottom component="div">
//                                 Спонсоры:
//                             </Typography>
//                             <Table size="small" aria-label="purchases">
//                                 <TableHead>
//                                     <TableRow>
//                                         <TableCell>Имя</TableCell>
//                                         <TableCell>Ссылка</TableCell>
//                                         {/* <TableCell align="right">Ссылка</TableCell> */}
//                                         {/* <TableCell align="right">Total price ($)</TableCell> */}
//                                     </TableRow>
//                                 </TableHead>
//                                 <TableBody>
//                                     {row.sponsors.map((sponsorsRow) => (
//                                         // row.sponsors.map((sponsorsRow) => ( 
//                                         // if(row.name) sponsorsRow.nameOrganisator //Collumn - alljoin

//                                         <TableRow key={sponsorsRow.nameSponsor} >
//                                             <TableCell component="th" scope="row">
//                                                 {sponsorsRow.avatarSponsor} - {sponsorsRow.nameSponsor}
//                                             </TableCell>
//                                             {/* <TableCell>{sponsorsRow.nameSponsor}</TableCell> */}
//                                             {/* <TableCell align="right">{sponsorsRow.linkSponsor}</TableCell> */}
//                                             <TableCell  >{sponsorsRow.linkSponsor}</TableCell>
//                                             {/* <TableCell align="right">
//                           {Math.round(historyRow.amount * row.price * 100) / 100}
//                         </TableCell> */}
//                                         </TableRow>

//                                     ))}
//                                 </TableBody>
//                             </Table>
//                         </Box>
//                     </Collapse>
//                 </TableCell>
//             </TableRow>
//         </React.Fragment>
//     );

// }

// Row.propTypes = {
//     row: PropTypes.shape({
//         avatar: PropTypes.string.isRequired,
//         name: PropTypes.string.isRequired,
//         info: PropTypes.string.isRequired,
//         link: PropTypes.string.isRequired,
//         sponsors: PropTypes.arrayOf(
//             PropTypes.shape({
//                 avatarSponsor: PropTypes.string.isRequired,
//                 nameSponsor: PropTypes.string.isRequired,
//                 linkSponsor: PropTypes.string.isRequired,
//                 nameOrganisator: PropTypes.string.isRequired,
//             }),
//         ).isRequired,
//         //   name: PropTypes.string.isRequired,
//         //   price: PropTypes.number.isRequired,
//         //   protein: PropTypes.number.isRequired,
//     }).isRequired,
// };

// const rows = [
//     createData('Avatar', "Name1", "info", "link", "sponsor Ava 1", "sponsor name", "sponsor link", "Name1"),
//     createData('Avatar2', "Name2", "info", "link", "sponsor Ava1", "sponsor name", "sponsor link", "Name1")
//     // createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
//     // createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
//     // createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
//     // createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
// ];

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: rippleLoading.default,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};
const defaultOptions2 = {
    loop: false,
    autoplay: true,
    animationData: doneData.default,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};

function OrganisatorInfo(props) {
    return (
        <Chip color="primary"
            component="a" target="_blank" rel="noopener noreferrer" href={props.user.link} clickable
            avatar={<Avatar alt="OrganisatorAvatar" src={props.user.avatar} />}
            label={props.user.username /*+ " Подпишись"*/}
        // onClick={handleChipClick}
        />
    )
}
function SponsorInfo(props) {
    return (
        <TableRow key={props.follower.id} >
            <TableCell className="paddingRow">
                {/* <Grid item xs 
        container
        direction="row"
        justify="center"
        alignItems="center"
        > */}
                <Chip color="secondary" size="small"
                    component="a" target="_blank" rel="noopener noreferrer" href={props.follower.linkFollower} clickable
                    avatar={<Avatar alt="SponsorAvatart" src={props.follower.avatarFollower} />}
                    label={props.follower.usernameFollower /*+ " Подпишись"*/}
                // onClick={handleChipClick}
                />
                {/* </Grid>   */}
            </TableCell>

            {/* OLD */}

            {/* <TableCell className="paddingRow">>
<a target="_blank" rel="noopener noreferrer" href={collumn.linkFollower}>
                <img className="instaImage" border="0" alt="FollowImage" src={collumn.avatarFollower} width="100" height="100"></img>
            </a>
            <a className="Loading-give-text" target="_blank" rel="noopener noreferrer" href={collumn.linkFollower}>{collumn.usernameFollower}</a>
        </TableCell>
        <TableCell>
            <a align="right" target="_blank" rel="noopener noreferrer" onClick={this.handleButtonClick} href={collumn.linkFollower} class="btn btn-primary">Подпишись</a>
        </TableCell> */}

            {/* <a align="right" target="_blank" rel="noopener noreferrer" onClick={this.handleButtonClick} href={"https://www.instagram.com/web/friendships/"+ collumn.useridFollower + this.state.isToggleOn ? '/follow/' : '/unfollow/'} class="btn btn-primary"> {this.state.isToggleOn ? 'Подпишись' : 'Отписаться'}</a> */}
        </TableRow>
    )
}

// // Пример отправки POST запроса:
// async function postData(url = '', data = {}) {
//     // Default options are marked with *
//     const response = await fetch(url, {
//         method: 'POST', // *GET, POST, PUT, DELETE, etc.
//         mode: 'cors', // no-cors, *cors, same-origin
//         cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//         credentials: 'same-origin', // include, *same-origin, omit
//         headers: {
//             'Content-Type': 'application/json'
//             // 'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         redirect: 'follow', // manual, *follow, error
//         referrerPolicy: 'no-referrer', // no-referrer, *client
//         body: JSON.stringify(data) // body data type must match "Content-Type" header
//     });
//     return await response.json(); // parses JSON response into native JavaScript objects
// }

export default class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            done: undefined,
            // user: undefined,
            loading: undefined,
            loadingFollowers: undefined,
            doneFollowers: undefined,
            usersMain: [],
            allJoin: [],
            expandedRows: [],
            accessToken: '',
            isToggleOn: true, //ПОдписка
            open: false,
            clickedUserFollowers: [], //Для спонсоров
            showGive: undefined // Показать раздачи?
        };
        // Эта привязка обязательна для работы `this` в колбэке.
        // this.handleButtonClick = this.handleButtonClick.bind(this);
        // this.handleChange = this.handleChange.bind(this);

    }
    state = {
        randomItem: '',

        setOpen: undefined
    }

    loadingTextArray = [
        'разгружаем вагоны...',
        "готовим пиццу...",
        "ждем...",
        "участвуем в...",
        "загрузка...",
        "приводим в порядок...",
        // "...",
        "подгружаем ...",
        "общаемся...",
        // "встречаемся...",
        "обновляем...",
        "читаем мануал...",
        "здесь будет таблица...",
        "изучаем JS...",
        "соединяем...",
        "читаем из базы...",
    ];
    randomLoadingTextenerator = () => (
        this.loadingTextArray[Math.floor(Math.random() * this.loadingTextArray.length)]
    )
    handleMouseEnter = (e) => {
        this.setState({
            left: e.target.getBoundingClientRect().x - 4,
        });
        //e.target.style. = 'purple';
        e.target.borderWidth = 2;
    }
    handleMouseLeave = (e) => {
        //e.target.style.background = 'white';
        e.target.borderWidth = 2;
    }

    // handleButtonClick() {
    //     this.setState(state => ({
    //         isToggleOn: !state.isToggleOn
    //     }));
    // }

    handleChipClick = () => {
        console.info('You clicked the Chip.');
    };

    componentDidMount() {

        this.setState({ randomLoadingText: this.randomLoadingTextenerator() })

        //Subscribtion MAIN accs
        let self = this;
        setTimeout(() => {
            // only show =1 
            fetch("https://dry-plains-18498.herokuapp.com" + '/onlyshow', {
                //fetch('https://dry-plains-18498.herokuapp.com/mainusers', { 
                method: 'GET'
            }).then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            }).then(function (data) {
                self.setState({ loading: true });
                self.setState({ usersMain: data });
                setTimeout(() => {
                    self.setState({ done: true });
                }, 1000);
            }).catch(err => {
                console.log('caught it!', err);
            })

            fetch("https://dry-plains-18498.herokuapp.com" + '/alljoin', {
                method: 'GET'
            }).then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            }).then(function (data) {
                self.setState({ loadingFollowers: true });
                self.setState({ allJoin: data });
                setTimeout(() => {
                    self.setState({ doneFollowers: true });
                }, 1000);
            }).catch(err => {
                console.log('caught it!', err);
            })


        }, 1200);


        //         //Followers
        // const size = 100;
        // // const size = 4;
        // var rsponsors = [...this.state.allJoin];
        // const res = rsponsors.reduce((acc, curr, i) => {
        //     if (!(i % size)) {    // if index is 0 or can be divided by the `size`...
        //         acc.push(rsponsors.slice(i, i + size));   // ..push a chunk of the original array to the accumulator
        //     }
        //     return acc;
        // }, []);

        // this.setState({allJoin: res})

    }
    componentWillUnmount() {
        this.setState({ loading: true, loadingFollowers: true, allJoin: undefined, usersMain: undefined, doneFollowers: false, done: false, clickedUserFollowers: undefined })
    }
    // shouldComponentUpdate(nextProps, nextState) {
    //     if (this.props.color !== nextProps.color) {
    //       return true;
    //     }
    //     if (this.state.count !== nextState.count) {
    //       return true;
    //     }
    //     return false;
    //   }

    // shouldComponentUpdate(nextProps, nextState) {
    //     // return this.state.usersMain != nextState.usersMain;
    //   }

    // componentDidUpdate(prevProps) { //
    //     // Популярный пример (не забудьте сравнить пропсы):
    //     if (this.props.userID !== prevProps.userID) {
    //         this.fetchData(this.props.userID);
    //     }
    // }

    // componentWillUpdate(prevProps) { //
    //     // Популярный пример (не забудьте сравнить пропсы):
    //     if (this.props.userID !== prevProps.userID) {
    //         this.fetchData(this.props.userID);
    //     }
    // }

    handleRowClick(rowId, username2Get) {
        //Load Data
        // let self = this;
        // Загружаем только фолловеров кликнутого! - Передаем в бэк запросом POST - item.username

        const currentExpandedRows = this.state.expandedRows;
        const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);

        const newExpandedRows = isRowCurrentlyExpanded ?
            currentExpandedRows.filter(id => id !== rowId) :
            currentExpandedRows.concat(rowId);

        this.setState({ expandedRows: newExpandedRows, open: true });

        {/* Должны получить имя организатора item.username - запрос к БД на получение фолловеров именно этого спонсора */ }


        // this.state.open = true;
        // this.setState(prevState => ({ open: !prevState.open }));
    }



    renderItem(item) {
        const clickCallback = () => {
            // Сделать разворот только при нажатии на поле (на ник не должно ничего происходить)
            this.handleRowClick(item.id, item.username);
            //Load Data
            //    this.setState(prevState => ({ open: !prevState.open })) 
        };


        const itemRows = [
            <React.Fragment>
                {/* <TableCell>

        </TableCell> */}
                <Tooltip title="Нажми  чтобы показать/скрыть спонсоров" TransitionComponent={Fade} interactive arrow>

                    <TableRow onClick={clickCallback} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} key={"row-data-" + item.id}>
                        {/* <TableCell component="th" scope="row"> */}
                        {/* <Tooltip TransitionComponent={Zoom} title="Нажми сюда чтобы открыть аккаунт организатора" > */}
                        <TableCell scope="row">
                            {!this.state.doneFollowers ? (<Skeleton variant="circle" width="50px" height="50px" />) : (
                                <Box>
                                    <IconButton aria-label="expand row" size="small" onClick={(e) => this.setState(prevState => ({ open: !prevState.open }))}>
                                        {this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                    </IconButton>
                                    <OrganisatorInfo user={item} />
                                </Box>
                            )}

                            {/* {!this.state.doneFollowers ? (<Skeleton variant="circle" width="50px" height="50px" />) : (
                                <OrganisatorInfo user={item} />
                            )} */}

                            {!this.state.doneFollowers ? (<Skeleton variant="rect" width="200px" height="20px" />) : (
                                <Box component="fieldset" mb={3} borderColor="transparent">
                                    <StyledRating
                                        name="customized-color"
                                        defaultValue={item.rating}
                                        getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                                        precision={0.5}
                                        icon={<FavoriteIcon fontSize="inherit" />} />
                                </Box>
                            )}
                            {/* {!this.state.doneFollowers ? (<Skeleton variant="circle" width="50px" height="50px" />) : (
                                <a target="_blank" rel="noopener noreferrer" href={item.link}>
                                    <img className="instaImage" border="0" alt="FollowImage" src={item.avatar} width="100" height="100"></img>
                                </a>
                            )}
                            {!this.state.doneFollowers ? (<Skeleton />) : (
                                <b><a className="Loading-give-user" target="_blank" rel="noopener noreferrer" href={item.link}>{item.username}</a> </b>
                            )} */}

                            {/* Текст раздачи */}
                        </TableCell>
                        {!this.state.doneFollowers ? (<Skeleton variant="rect" width="100%" height="80px" />) : (
                            <TableCell className="Loading-give-text">{item.giveinfo}
                            </TableCell>
                        )}
                        {/* Рейтинг */}
                        {/* <TableCell>
                            <Box component="fieldset" mb={3} borderColor="transparent">
                                <StyledRating
                                    name="customized-color"
                                    defaultValue={item.rating}
                                    getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                                    precision={0.5}
                                    icon={<FavoriteIcon fontSize="inherit" />}/>
                            </Box>
                        </TableCell> */}
                    </TableRow>
                </Tooltip>
            </React.Fragment>
        ];

        if (this.state.expandedRows.includes(item.id)) {
            itemRows.push(
                <FadeIn in={this.state.open}>
                    {/* <Collapse  in={this.state.open} {...(this.state.open ? { timeout: 1000 } : {})} unmountOnExit> */}
                    <TableRow key={"row-expanded-" + item.id}>
                        {/* <td>{item.followers}</td> */}
                        {/* <th>Спонсоры:</th>  */}

                        {/* <TableCell /> */}
                        <Typography variant="h7" gutterBottom component="div" style={{ marginLeft: 5 }}>
                            <AccountBalanceWalletIcon />Спонсоры:
                        </Typography>

                        {/* Должны получить имя организатора item.username - запрос к БД на получение фолловеров именно этого спонсора */}

                        {/* NEW */}
                        {/* {this.state.clickedUserFollowers.map(collumn => { //Проблема в том что 1 за раз отображает. Для каждого юзера придется свой список
                            // if (item.username === collumn.usernameFollower)
                            return (
                                // Возможно несогласование ID
                                <SponsorInfo follower={collumn} />

                            );
                        })} */}

                        {/* OLD */}

                        {/* <TableCell/> */}

                        <div style={containerStyle}>
                            {this.state.allJoin.map(collumn => {
                                if (item.username === collumn.username) //Collumn - alljoin
                                    return (
                                        <div style={itemStyle}>

                                            {/* // Возможно несогласование ID */}
                                            <SponsorInfo follower={collumn} />
                                        </div>
                                    );
                            })}
                        </div>
                        {/* </TableCell> */}
                    </TableRow>
                    {/* </Collapse> */}
                </FadeIn>
            );
        }

        return itemRows;
    }

    render() {
        // const classes = useRowStyles();
        // const wrapperStyle = {
        //     backgroundColor: "#FFFFFF",
        //     flex: 1,
        //     justifyContent: 'center',
        //     alignItems: 'center',
        // }

        let allItemRows = [];
        this.state.usersMain.map(item => {
            const perItemRows = this.renderItem(item);
            allItemRows = allItemRows.concat(perItemRows);
            return allItemRows;
        });

        // Если show=1 -> показывать, иначе скрыть раздачу

        return (


            <section className="Loading-main">

                {/* <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell>Организатор</TableCell>
                                <TableCell align="right">Раздача</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <Row key={row.id} row={row} />
                            ))}

                        </TableBody>
                    </Table>
                </TableContainer> */}

                {/* <Typography variant="h5">
                    {!this.state.loading ? <Skeleton width="300px" /> : 'Активные Giveaways:'}
                </Typography> */}


                <div><h4><PaymentIcon />Активные Giveaways: </h4></div>
                <center>
                    <>
                        <TableContainer component={Paper}>
                            <Table aria-label="collapsible table" className="Giveaway-table" size="small" >
                                {!this.state.done ? (<Skeleton variant="rect" width="100%" />) : (

                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                {/* {!this.state.done ? (<Skeleton  width="100%" />):( */}
                                                <Typography> <MonetizationOnIcon /> Организатор</Typography>
                                                {/* )} */}
                                            </TableCell>
                                            <TableCell>
                                                <ChatIcon /> Инфо раздачи
                                    </TableCell>
                                        </TableRow>
                                    </TableHead>
                                )}
                                <TableBody>
                                    {!this.state.done ? (
                                        <FadeIn>
                                            <tr class="d-flex justify-content-center align-items-center">

                                                <td className="Loading-loadingText"><h2>{this.state.randomLoadingText}</h2></td>
                                                <td>{!this.state.loading ? (

                                                    <Lottie options={defaultOptions} height={120} width={120} />

                                                ) : (
                                                        <Lottie options={defaultOptions2} height={120} width={120} />
                                                    )} </td>
                                            </tr>
                                        </FadeIn>
                                    ) : (allItemRows)}

                                    {/* {!this.state.loading ? (<Skeleton variant="rect" width="100%" />) : (
                                    allItemRows
                                )} */}

                                </TableBody>

                            </Table>
                        </TableContainer>
                    </>

                    {/* <table className="Giveaway-table">
                        <thead>
                            <tr>
                                <th>
                                    Организатор
                       </th>
                                <th>
                                    Инфо раздачи
                        </th>
                            </tr>
                        </thead>
                        <tbody>
                            {!this.state.done ? (
                                <FadeIn>
                                    <tr class="d-flex justify-content-center align-items-center">
                                        <td className="Loading-loadingText"><h2>{this.state.randomLoadingText}</h2></td>
                                        <td>{!this.state.loading ? (
                                            <Lottie options={defaultOptions} height={120} width={120} />
                                        ) : (
                                                <Lottie options={defaultOptions2} height={120} width={120} />
                                            )} </td>
                                    </tr>
                                </FadeIn>
                            ) : (
                                    allItemRows
                                )}

                        </tbody>

                    </table> */}

                </center>

                <div>

                    {/* <CardWrapper addEndCard={this.getEndCard.bind(this)}  style={wrapperStyle} >
            
            {this.renderCards()}
          </CardWrapper> */}

                </div>
            </section>
        );
    }
}