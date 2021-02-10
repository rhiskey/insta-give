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

    handleSubmit = e => {
        if (!e.target.checkValidity()) {
            return;
        }
        e.preventDefault();

        const { offerUserName, offerUserGiveinfo, offerUserAvatar } = this.state;

        const offer = {
            offerUserName,
            offerUserGiveinfo,
            offerUserAvatar,
        };
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
        }

    };

    render() {
        return (
            <div>
                <h1>Предложить раздачу</h1>
                <h6>Аккаунт должен быть ОТКРЫТЫЙ</h6><br></br>

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

                        <div style={{ width: '60%' }}>
                            {/* Сделать успешное сообщение */}
                            <button className="btn btn-success" type="submit" >

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