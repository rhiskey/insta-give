import React, { Component } from 'react';
// import React, { Component } from 'react';
import axios from 'axios';
const apilink = "http://api.instagive.ga/";

class Offer extends Component {
    // const Offer = () => {

    constructor(props) {
        super(props);

        this.state = {
            offerUserName: '',
            offerUserGiveinfo: '',
            offerUserAvatar: '',
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleInputNicknameChange = this.handleInputNicknameChange(this);
        // this.handleInputAvatarChange = this.handleInputAvatarChange(this);
    }

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    // //Allow only English Letters in Nickname
    // handleInputNicknameChange = e => {
    //     var value = e.target.value;

    //     value = value.replace(/[^A-Za-z]/ig, '');

    //     this.setState({
    //         [e.target.name]: value,
    //     })

    // };

    // handleInputAvatarChange = e => {
    //     var value = e.target.value

    //     value = value.replace(/[^A-Za-z]/ig, '')

    //     this.setState({
    //         [e.target.name]: value,
    //     })
    // };

    handleSubmit = e => {
        if (!e.target.checkValidity()) {
            // form is invalid! so we do nothing
            return;
        }
        e.preventDefault();

        const { offerUserName, offerUserGiveinfo, offerUserAvatar } = this.state;

        const offer = {
            offerUserName,
            offerUserGiveinfo,
            offerUserAvatar,
        };

        //
        if (window.confirm('Отправить предложенную раздачу? Введенные данные верны?\nНикнейм: ' + offerUserName + '\nИнфо: ' + offerUserGiveinfo)) {
            //Show Message Success
            alert('Спасибо, мы рассмотрим её в ближайшее время и возможно добавим на сайт!');
            axios
                .post(apilink + 'offer', offer)
                .then(() => {
                    console.log('Offer Created');
                    //Clear values
                    this.setState({
                        offerUserName: '',
                        offerUserGiveinfo: '',
                        offerUserAvatar: '',
                    });
                    //Clear Form Data
                    document.getElementById("offer-form").reset();
                    //Go To Main Page
                    window.location.href = '/';

                })
                .catch(err => {
                    console.error(err);
                    //Show Message 
                    alert('Что-то пошло не так, технические неполадки с базой данных...');
                });
        } else {
            // alert('Отмена... Зачем тогда предлагать? Определись уже!!!');
        }

    };

    render() {
        return (
            <div>
                <h1>Предложить раздачу</h1>
                {/* <p>Contact US page body content</p> */}
                <h6>Аккаунт должен быть ОТКРЫТЫЙ</h6><br></br>
                {/* <form method="POST">
                    <label>Никнейм *:</label><br></br>
                    <input type="text" name="offerUserName" class="field" required="required" /><br></br>
                    <label>Инфо раздачи *:</label><br></br>
                    <textarea name="offerUserGiveinfo" rows="15" cols="40" required="required" class="give-textarea"></textarea><br></br>
                    <label>Прямая ссылка на аватар (не обязательно):</label><br></br>
                    <input type="url" name="offerUserAvatar" class="field" /><br></br><br></br>
                    <input type="submit" value="Предложить" /><br></br><br></br>
                </form>
                <p>После нажатия на кнопку "Предложить" Ваша раздача будет рассмотрена модераторами.</p> */}

                <center>
                    <form id='offer-form' onSubmit={this.handleSubmit}>
                        {/* <div style={{ width: '30%' }} className="form-group"> */}
                        <div style={{ width: '60%' }} className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                name="offerUserName"
                                placeholder="Никнейм *"
                                onChange={this.handleInputChange}
                                required="required"
                            />
                        </div>
                        <br />
                        <div style={{ width: '60%' }} className="form-group">
                            {/* <input
                            type="text"
                            className="form-control"
                            name="offerUserGiveinfo"
                            placeholder="Инфо раздачи *"
                            onChange={this.handleInputChange}
                        /> */}
                            <textarea
                                name="offerUserGiveinfo"
                                className="form-control"
                                placeholder="Инфо раздачи *"
                                onChange={this.handleInputChange}
                                rows="15"
                                cols="40"
                                required="required"
                            >
                            </textarea>
                        </div>
                        <br />
                        {/* <div style={{ width: '60%' }} className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                name="offerUserAvatar"
                                placeholder="Прямая ссылка на аватар"
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <br /> */}
                        <div style={{ width: '60%' }}>
                            {/* Сделать успешное сообщение */}
                            <button className="btn btn-success" type="submit" >
                                {/* onClick={event => window.location.href = '/'} */}
                                {/* {() => { if (window.confirm('Are you sure you wish to delete this item?') window.location.href = '/' ) this.onCancel(item) } } */}
                                Предложить
                            </button>
                        </div>
                    </form>

                </center>
            </div>
        );
    }
}
export default Offer;