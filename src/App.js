import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Post from './components/Post';
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  //state ={users: []}

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      value: 'Раздача 1'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Раздача: ' + this.state.value);
    event.preventDefault();
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

  //showUsers = user => <div key={user.username}>{user.avatar}</div>

  render() {
    const { users } = this.state;
    const selvalue = this.state.value;
    return <div className="App">
      <Header />
      <section className="App-main">
        <div><h1>Giveaway на сегодня: </h1></div>

      <section className ="App-user">
       <span><h2>Main ЮЗЕР</h2></span>
        <img border="0" alt="Main user avatar" src="https://www.kinonews.ru/insimgs/2019/newsimg/newsimg87089.jpg" width="120px" height="120px"></img>
        <span className ="App-give-text"><button>Раздача конвейера говна подпишись на эти аккаунты </button></span>
      </section>

      <form onSubmit={this.handleSubmit}>
        <label>
          Выберите РАЗДАЧУ:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Грейпфрут</option>
            <option value="lime">Лайм</option>
            <option value="coconut">Кокос</option>
            <option value="mango">Манго</option>
          </select>
        </label>
        <input type="submit" value="Выбрать" />
      </form>

      <div>
        {this.state.users.map(member =>
        <center><tr key={member.username}>
        <Post nickname={member.username} avatar={member.avatar} followlink={member.link} />

        </tr></center>
        )}
      </div>
     
  
        {/* more posts */}
      </section>
{/* 
      <section className="Mysql">

      <div className="container"> 
            <div className="panel panel-default p50 uth-panel">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Member name</th>
                            <th>Member avatar</th>
                            <th>Member Link</th>

                        </tr>
                    </thead>
                    <tbody>
                    {this.state.users.map(member =>
                        <tr key={member.username}>
                        <td>{member.username} </td>
                        <td>{member.link}</td>
                        <td>{member.avatar}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>

      </section> */}

    </div>


  }
}

// ReactDOM.render(
//   <App />,
//   mountNode
// );
export default App;