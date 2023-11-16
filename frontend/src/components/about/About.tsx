import React from 'react';
import "./About.css"

const About = () => {
    return (
        <div className='about'>
            <h2 className='about__us'>Who are we?</h2>
            <p className='about__description'>Brainware is a dynamic team of four junior developers who have joined
                forces to unleash their creativity and passion for digital art. By combining their unique skills,
                aptitudes, and aspirations, they have created their first project: NeuroArt.
                With a collective expertise in software development, design, and AI technology, Brainware is dedicated
                to pushing the boundaries of innovation in the digital art world.</p>
            <p className='about__description'>The NeuroArt platform was built using cutting-edge technology, including
                Java and Spring Boot for the back-end, TypeScript and React.js for the front-end, PostgreSQL for the
                database, and Azure for deployment. This ensures a seamless user experience and a robust and reliable
                platform.
                At Brainware, the team is constantly exploring new ideas and technologies to create exciting and
                innovative digital art projects. Contact us today to learn more about our future projects and how we can
                help bring your creative vision to life.</p>
            <div className='about__logos'>
                <img className='about__java' src={require('../../Images/JavaLogo.png')}/>
                <img className='about__spring' src={require('../../Images/SpringbootLogo.png')}/>
                <img className='about__react' src={require('../../Images/ReactLogo.png')}/>
                <img className='about__ts' src={require('../../Images/TypeScriptLogo.png')}/>
                <img className='about__postgresql' src={require('../../Images/PostgresqlLogo.png')}/>
                <img className='about__azure' src={require('../../Images/Microsoft_Azure_Logo.png')}/>
            </div>
        </div>
    );
};

export default About;

