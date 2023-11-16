import React from 'react';
import './LoadingSpinner.css'

const LoadingSpinner = () => {
    return (
        <div className='spinning-container'>
            <div className="spinner-container__loading-spinner">
                <div className="letter-holder">
                    <div className="l-1 letter">L</div>
                    <div className="l-2 letter">o</div>
                    <div className="l-3 letter">a</div>
                    <div className="l-4 letter">d</div>
                    <div className="l-5 letter">i</div>
                    <div className="l-6 letter">n</div>
                    <div className="l-7 letter">g</div>
                    <div className="l-8 letter">.</div>
                    <div className="l-9 letter">.</div>
                    <div className="l-10 letter">.</div>
                </div>
                <img className='spinner-container__loading-spinner-img ' src={require('../../Images/LogoImgWhite.png')}/>
            </div>
        </div>
    );
};

export default LoadingSpinner;
