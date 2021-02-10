import React, { useState, useRef } from "react";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import "bootstrap/dist/css/bootstrap.css";
import * as doneData from "./doneloading.json";
import * as rippleLoading from "./rippleloading.json"
import './loading.css';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
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
import Skeleton from '@material-ui/lab/Skeleton';
import Rating from '@material-ui/lab/Rating';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ChatIcon from '@material-ui/icons/Chat';
import PaymentIcon from '@material-ui/icons/Payment';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import { TableFooter } from "@material-ui/core";


const apilink = "http://api.instagive.ga/";

const StyledRating = withStyles({
    iconFilled: {
        color: '#ff6d75',
    },
    iconHover: {
        color: '#ff3d47',
    },
})(Rating);


const numItemsPerRow = 8; //Максимально элементов в строке для полноэкранного

const containerStyle = {
    display: "flex",
    width: "200%", 
    flexWrap: "wrap"
};

const itemStyle = {
    minWidth: `${100 / numItemsPerRow}%`,
    textAlign: "center",
    boxSizing: "border-box"
};



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
        />
    )
}
function SponsorInfo(props) {
    return (
        <TableRow key={props.follower.id} >
            <TableCell className="paddingRow">
                <Chip color="secondary" size="small"
                    component="a" target="_blank" rel="noopener noreferrer" href={props.follower.linkFollower} clickable
                    avatar={<Avatar alt="SponsorAvatart" src={props.follower.avatarFollower} />}
                    label={props.follower.usernameFollower /*+ " Подпишись"*/}
                />
            </TableCell>
        </TableRow>
    )
}


export default class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            done: undefined,
            loading: undefined,
            loadingFollowers: undefined,
            doneFollowers: undefined,
            usersMain: [],
            allJoin: [],
            expandedRows: [],
            accessToken: '',
            isToggleOn: true, 
            open: false,
            clickedUserFollowers: [], 
            showGive: undefined, 
        };

        this.tableRef = React.createRef();

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

    handleChipClick = () => {
        console.info('You clicked the Chip.');
    };

    componentDidMount() {

        this.setState({ randomLoadingText: this.randomLoadingTextenerator() })

        //Subscribtion MAIN accs
        let self = this;
        setTimeout(() => {
            fetch(apilink + 'onlyshow', {
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

            fetch(apilink + 'alljoin', {
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

    }
    componentWillUnmount() {
        this.setState({ loading: true, loadingFollowers: true, allJoin: undefined, usersMain: undefined, doneFollowers: false, done: false, clickedUserFollowers: undefined })
    }


    handleRowClick(rowId, username2Get) {
        const currentExpandedRows = this.state.expandedRows;
        const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);

        //В зависимости от строки, нажата или нет?
        const newExpandedRows = isRowCurrentlyExpanded ?
            currentExpandedRows.filter(id => id !== rowId) :
            currentExpandedRows.concat(rowId);

        this.setState(prevState => ({ expandedRows: newExpandedRows, open: !prevState.open }));


    }

    //Элементы таблицы, данные
    renderItem(item) {
        const clickCallback = () => {
            // Сделать разворот только при нажатии на поле (на ник не должно ничего происходить)
            this.handleRowClick(item.id, item.username);
        };


        const itemRows = [
            <React.Fragment>
                <TableRow key={"row-data-" + item.id }>

                    <TableCell scope="row" ref={this.tableRef} >
                        {!this.state.doneFollowers ? (<Skeleton variant="circle" width="50px" height="50px" />) : (
                            < Box >
                                < OrganisatorInfo user={item} />
                            </Box>

                        )}
                    </TableCell>
                    {/* Текст раздачи */}
                    {!this.state.doneFollowers ? (<Skeleton variant="rect" width="100%" height="80px" />) : (
                        <Tooltip title="Нажми  чтобы показать/скрыть спонсоров" TransitionComponent={Fade} interactive arrow>
                            <Box border={1} borderColor="primary.main" borderRadius={16}  >

                                <TableCell className="Loading-give-text" onClick={clickCallback} >
                                    <Box borderBottom={1}>
                                        <Typography>{item.giveinfo}</Typography>
                                    </Box>
                                    <Box component="fieldset" mb={3} borderColor="transparent">
                                        <IconButton aria-label="expand row" size="small" onClick={(e) => this.setState(prevState => ({ open: !prevState.open }))}>
                                            {this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                        </IconButton>
                                        <StyledRating
                                            name="customized-color"
                                            defaultValue={item.rating}
                                            getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                                            precision={0.5}
                                            icon={<FavoriteIcon fontSize="inherit" />} />
                                    </Box>
                                </TableCell>
                            </Box>
                        </Tooltip>
                    )}
                </TableRow>

            </React.Fragment >
        ];

        if (this.state.expandedRows.includes(item.id)) {
            itemRows.push(
                <FadeIn in={this.state.open}>
                    <TableRow key={"row-expanded-" + item.id}>
                        <Box style={containerStyle} border={1} borderColor="grey.500" borderRadius={1} >
                            <Typography variant="h7" gutterBottom component="div" style={{ marginLeft: 5 }}>
                                <AccountBalanceWalletIcon />Спонсоры:
                        </Typography>
                            <div style={containerStyle}>
                                {this.state.allJoin.map(collumn => {
                                    if (item.username === collumn.username)
                                        return (
                                            <div style={itemStyle}>
                                                <SponsorInfo follower={collumn} />
                                            </div>
                                        );
                                })}
                            </div>
                        </Box>
                    </TableRow>
                </FadeIn>
            );
        }

        return itemRows;
    }

    render() {
        let allItemRows = [];
        this.state.usersMain.map(item => {
            const perItemRows = this.renderItem(item);
            allItemRows = allItemRows.concat(perItemRows);
            return allItemRows;
        });

        return (


            <section className="Loading-main">
                <div><h4><PaymentIcon />Активные Giveaways: </h4></div>
                <center>
                    <>
                        <TableContainer component={Paper}>
                            <Table aria-label="collapsible table" className="Giveaway-table" size="small" >
                                {!this.state.done ? (<Skeleton variant="rect" width="100%" />) : (
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                <Typography> <MonetizationOnIcon /> Организатор</Typography>
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
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>

                </center>
                <div>

                </div>
            </section>
        );
    }
    scrollToMyRef = () => window.scrollTo(0, this.tableRef.current.offsetTop);
}