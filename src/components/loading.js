import React, { useState }  from "react";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import ReactLoading from "react-loading";
import "bootstrap/dist/css/bootstrap.css";
import * as legoData from "./legoloading.json";
import * as doneData from "./doneloading.json";
import * as scrollFrames from "./scrollframesloading.json"
import * as sckeletonFrames from "./skeletonframesloading.json"
import * as rippleLoading from "./rippleloading.json"
import './loading.css';
import Button from '@material-ui/core/Button';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
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

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function createData(avatar, name, info, link, avatarSponsor2set, nameSponsor2set, linkSponsor2set, nameOrganisator) {
    return {
        avatar,
        name,
        info,
        link,
        //   protein,
        //   price,
        sponsors: [
            { avatarSponsor: avatarSponsor2set, nameSponsor: nameSponsor2set, linkSponsor: linkSponsor2set },
        ],
    };
}


function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.avatar} - {row.name}
                </TableCell>
                {/* <TableCell align="right">{row.name}</TableCell> */}
                <TableCell align="right">{row.info}</TableCell>
                {/* <TableCell align="right">{row.carbs}</TableCell>
          <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Спонсоры:
                </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Имя</TableCell>
                                        <TableCell>Ссылка</TableCell>
                                        {/* <TableCell align="right">Ссылка</TableCell> */}
                                        {/* <TableCell align="right">Total price ($)</TableCell> */}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.sponsors.map((sponsorsRow) => (
                                        // row.sponsors.map((sponsorsRow) => ( 
                                        // if(row.name) sponsorsRow.nameOrganisator //Collumn - alljoin

                                        <TableRow key={sponsorsRow.nameSponsor}>
                                            <TableCell component="th" scope="row">
                                                {sponsorsRow.avatarSponsor} - {sponsorsRow.nameSponsor}
                                            </TableCell>
                                            {/* <TableCell>{sponsorsRow.nameSponsor}</TableCell> */}
                                            {/* <TableCell align="right">{sponsorsRow.linkSponsor}</TableCell> */}
                                            <TableCell  >{sponsorsRow.linkSponsor}</TableCell>
                                            {/* <TableCell align="right">
                          {Math.round(historyRow.amount * row.price * 100) / 100}
                        </TableCell> */}
                                        </TableRow>

                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );

}

Row.propTypes = {
    row: PropTypes.shape({
        avatar: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        info: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        sponsors: PropTypes.arrayOf(
            PropTypes.shape({
                avatarSponsor: PropTypes.string.isRequired,
                nameSponsor: PropTypes.string.isRequired,
                linkSponsor: PropTypes.string.isRequired,
                nameOrganisator: PropTypes.string.isRequired,
            }),
        ).isRequired,
        //   name: PropTypes.string.isRequired,
        //   price: PropTypes.number.isRequired,
        //   protein: PropTypes.number.isRequired,
    }).isRequired,
};

const rows = [
    createData('Avatar', "Name1", "info", "link", "sponsor Ava 1", "sponsor name", "sponsor link", "Name1"),
    createData('Avatar2', "Name2", "info", "link", "sponsor Ava1", "sponsor name", "sponsor link", "Name1")
    // createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
    // createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
    // createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
    // createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];

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

export default class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            done: undefined,
            loading: undefined,
            usersMain: [],
            allJoin: [],
            expandedRows: [],
            accessToken: '',
            isToggleOn: true, //ПОдписка
            open: false,
        };
        // Эта привязка обязательна для работы `this` в колбэке.
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }
    state = {
        randomItem: '',
        
        setOpen: undefined
    }

    loadingTextArray = [
        'разгружаем вагоны...',
        "готовим пиццу...",
        "ждем такси...",
        "участвуем в...",
        "загрузка...",
        "приводим все в порядок...",
        // "...",
        "подгружаем данные...",
        "общаемся с организаторами...",
        "встречаемся со спонсорами...",
        "обновляем список...",
        "читаем мануал...",
        "здесь будет таблица...",
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

    handleButtonClick() {
        this.setState(state => ({
            isToggleOn: !state.isToggleOn
        }));
    }

    componentDidMount() {

        this.setState({ randomLoadingText: this.randomLoadingTextenerator() })

        // setTimeout(() => {
        //     fetch("https://jsonplaceholder.typicode.com/posts")
        //         .then(response => response.json())
        //         .then(json => {
        //             this.setState({ loading: true });
        //             setTimeout(() => {
        //                 this.setState({ done: true });
        //             }, 1000);
        //         });
        // }, 1200);

        //Subscribtion MAIN accs
        let self = this;
        setTimeout(() => {
            fetch('https://dry-plains-18498.herokuapp.com/mainusers', {
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
            fetch('https://dry-plains-18498.herokuapp.com/alljoin', {
                method: 'GET'
            }).then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            }).then(function (data) {
                self.setState({ loading: true });
                self.setState({ allJoin: data });
                setTimeout(() => {
                    self.setState({ done: true });
                }, 1000);
            }).catch(err => {
                console.log('caught it!', err);
            })


        }, 1200);

    }

    handleRowClick(rowId) {
        const currentExpandedRows = this.state.expandedRows;
        const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);

        const newExpandedRows = isRowCurrentlyExpanded ?
            currentExpandedRows.filter(id => id !== rowId) :
            currentExpandedRows.concat(rowId);

        this.setState({ expandedRows: newExpandedRows });
        this.state.open = true;
    }

    renderItem(item) {
        const clickCallback = () => this.handleRowClick(item.id);

        const itemRows = [
            <React.Fragment>
                        {/* <TableCell>

        </TableCell> */}
            <TableRow onClick={clickCallback} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} key={"row-data-" + item.id}>
                {/* <TableCell component="th" scope="row"> */}
                <TableCell scope="row"> 
                <IconButton aria-label="expand row" size="small" onClick={(e) => this.setState(prevState => ({open: !prevState.open }))  }>
            {this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
                    <a target="_blank" rel="noopener noreferrer" href={item.link}>
                        <img className="instaImage" border="0" alt="FollowImage" src={item.avatar} width="100" height="100"></img>
                    </a>


                    <b><a className="Loading-give-user" target="_blank" rel="noopener noreferrer" href={item.link}>{item.username}</a> </b>
                </TableCell>
                <TableCell className="Loading-give-text">{item.giveinfo}</TableCell>
            </TableRow>
            </React.Fragment>
        ];

        //Followers

        if (this.state.expandedRows.includes(item.id)) {
            itemRows.push(
<Collapse in={this.state.open} timeout="auto" unmountOnExit>
                <TableRow key={"row-expanded-" + item.id}>
                    {/* <td>{item.followers}</td> */}
                    {/* <th>Спонсоры:</th>  */}
                    <Typography variant="h7" gutterBottom component="div">
                        Спонсоры:
                    </Typography>

                    {this.state.allJoin.map(collumn => {
                        if (item.username === collumn.username) //Collumn - alljoin
                            return (
                                <TableRow key={collumn.id}>
                                    <TableCell className="paddingRow">>
                  <a target="_blank" rel="noopener noreferrer" href={collumn.linkFollower}>
                                            <img className="instaImage" border="0" alt="FollowImage" src={collumn.avatarFollower} width="100" height="100"></img>
                                        </a>
                                        <a className="Loading-give-text" target="_blank" rel="noopener noreferrer" href={collumn.linkFollower}>{collumn.usernameFollower}</a>
                                    </TableCell>
                                    <TableCell>

                                        {/* <Button variant="contained" color="primary">
                                     Hello World
                                    </Button> */}

                                        <a align="right" target="_blank" rel="noopener noreferrer" onClick={this.handleButtonClick} href={collumn.linkFollower} class="btn btn-primary">Подпишись</a>
                                        {/* <a align="right" target="_blank" rel="noopener noreferrer" onClick={this.handleButtonClick} href={"https://www.instagram.com/web/friendships/"+ collumn.useridFollower + "/follow/"} class="btn btn-primary">Подпишись</a> */}
                                        {/* <a align="right" target="_blank" rel="noopener noreferrer" onClick={this.handleButtonClick} href={"https://www.instagram.com/web/friendships/"+ collumn.useridFollower + this.state.isToggleOn ? '/follow/' : '/unfollow/'} class="btn btn-primary"> {this.state.isToggleOn ? 'Подпишись' : 'Отписаться'}</a> */}
                                    </TableCell>
                                </TableRow>);
                    })}
                </TableRow>
                </Collapse>
            );
        }

        return itemRows;
    }

    render() {
        // const classes = useRowStyles();
        const wrapperStyle = {
            backgroundColor: "#FFFFFF",
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }

        let allItemRows = [];
        this.state.usersMain.map(item => {
            const perItemRows = this.renderItem(item);
            allItemRows = allItemRows.concat(perItemRows);
            return allItemRows;
        });

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

                <div><h4>Активные Giveaways: </h4></div>
                <center>
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table" className="Giveaway-table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Организатор
                                    </TableCell>
                                    <TableCell>
                                        Инфо раздачи
                                    </TableCell>
                                </TableRow>
                            </TableHead>
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
                                ) : (
                                        allItemRows
                                    )}

                            </TableBody>

                        </Table>
                    </TableContainer>
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