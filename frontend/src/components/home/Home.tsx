import React from 'react';
import "./Home.css"
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <div className='home'>
            <div className="home__image-text">
                <h1 className="home__motto">Explore Your Creativity</h1>                <p
                className="home__description">Welcome to NeuroArt, a website where you can unleash your creativity.
                With our tool, you can translate your thoughts into stunning and unique images.
                Our state-of-the-art AI technology allows you to experiment with various styles, colors,
                and themes to bring your vision to life.
                Whether you're an artist, designer, or simply someone who loves to create,
                NeuroArt is the perfect platform to explore your imagination.
                Our easy-to-use interface and intuitive controls make it simple to generate beautiful images in just
                a few clicks.
                With NeuroArt, the only limit is your imagination. Sign up now and see what you can create!</p>

                <div className='home__link-div'>
                    <Link to='/generate'>
                        <button className='home__visit-our-gallery'>Try Now</button>
                    </Link>
                    <div className='gallery1'>
                        <Link to='/gallery'>
                            <button className='home__visit-our-gallery'>Visit Our Gallery</button>
                        </Link>
                    </div>
                    <div className='gallery2'>
                        <Link to='/gallery2'>
                            <button className='home__visit-our-gallery'>Visit Our Gallery</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='wheel-container'>
            <img className='home__image-wheel' src={require('../../Images/LogoImgWhite.png')}/>
            </div>

        </div>
    );
};

export default Home


