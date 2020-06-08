import React from "react";
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
            isToggleOn: true //ПОдписка
      
        };
    }

    componentDidMount() {
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
    }

    renderItem(item) {
        const clickCallback = () => this.handleRowClick(item.id);

        const itemRows = [
            <tr onClick={clickCallback} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} key={"row-data-" + item.id}>
                <td>
                    <a target="_blank" rel="noopener noreferrer" href={item.link}>
                        <img className="instaImage" border="0" alt="FollowImage" src={item.avatar} width="100" height="100"></img>
                    </a>


                    <b><a className="Loading-give-user" target="_blank" rel="noopener noreferrer" href={item.link}>{item.username}</a> </b>
                </td>
                <td className="Loading-give-text">{item.giveinfo}</td>
            </tr>
        ];

        //Followers
        if (this.state.expandedRows.includes(item.id)) {
            itemRows.push(
                <tr key={"row-expanded-" + item.id}>
                    {/* <td>{item.followers}</td> */}
          {/* <th>Спонсоры:</th>  */}
          <p>Спонсоры:</p> 

          {this.state.allJoin.map(collumn => {
                        if (item.username == collumn.username) //Collumn - alljoin
                            return (
                                <tr key={collumn.id}>
                                    <td className="paddingRow">>
                  <a target="_blank" rel="noopener noreferrer" href={collumn.linkFollower}>
                                            <img className="instaImage" border="0" alt="FollowImage" src={collumn.avatarFollower} width="100" height="100"></img>
                                        </a>
                                        <a className="Loading-give-text" target="_blank" rel="noopener noreferrer" href={collumn.linkFollower}>{collumn.usernameFollower}</a>
                                    </td>
                                    <td>
                                        <a align="right" target="_blank" rel="noopener noreferrer" onClick={this.handleButtonClick} href={collumn.linkFollower} class="btn btn-primary">Подпишись</a>
                                        {/* <a align="right" target="_blank" rel="noopener noreferrer" onClick={this.handleButtonClick} href={"https://www.instagram.com/web/friendships/"+ collumn.useridFollower + "/follow/"} class="btn btn-primary">Подпишись</a> */}
                                        {/* <a align="right" target="_blank" rel="noopener noreferrer" onClick={this.handleButtonClick} href={"https://www.instagram.com/web/friendships/"+ collumn.useridFollower + this.state.isToggleOn ? '/follow/' : '/unfollow/'} class="btn btn-primary"> {this.state.isToggleOn ? 'Подпишись' : 'Отписаться'}</a> */}
                                    </td>
                                </tr>);
                    })}
                </tr>
            );
        }

        return itemRows;
    }

    render() {
        let allItemRows = [];
        this.state.usersMain.map(item => {
            const perItemRows = this.renderItem(item);
            allItemRows = allItemRows.concat(perItemRows);
        });

        return (
            <section className="Loading-main">
            <div><h4>Активные Giveaway: </h4></div>
            <center>
              <table className="Giveaway-table">
                <thead>
                  <tr>
                    {/* <th>
                  
                        </th> */}
                    <th>
                      Организатор
                       </th>
                    <th>
                      Инфо раздачи
                        </th>
                  </tr>
                </thead>
                <tbody>
                  {/* <InfiniteScroll
        dataLength={this.state.usersMain.length}
        next={this.fetchMoreData}
        hasMore={true}
        loader={<h4>Загрузка...</h4>}
      >
    
      </InfiniteScroll> */}
                  {!this.state.done ? (
                    <FadeIn>
                        <tr class="d-flex justify-content-center align-items-center">
                        <td><h5>Загрузка...</h5></td>
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
    
              </table>
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