import React from 'react';
import './Home.css'
import Loading from "./loading.js";

const home = () => {
    return (
        <div className="Home-menu">
            {/* <h1>Insta-Give</h1> */}
            <p>Сервис проверенных раздач в Instagram</p>
            {/* Перенести сюда таблицу */}
            <div>
                {/* <Loading /> */}
            </div>
        </div>
    );
}

export default home;