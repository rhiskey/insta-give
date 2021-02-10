import React from 'react';
import './Home.css'
import Loading from "./loading.js";

const home = () => {
    return (
        <div className="Home-menu">
            <p>Сервис проверенных раздач в Instagram</p>
            <div>
                <Loading />
            </div>
        </div>
    );
}

export default home;