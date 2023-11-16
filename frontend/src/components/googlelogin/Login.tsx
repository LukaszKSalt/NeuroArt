import React, {useEffect, useState} from 'react';
import {CredentialResponse, GoogleLogin, googleLogout} from '@react-oauth/google';
import {User} from "../../interfaces";
import "./Login.css";
import {CopyLinkButton} from "./CopyLinkButton";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";

interface loginProps {
    setCredentials: Function
    credentials: CredentialResponse | null
    setUser: Function
    user: User
}

const Login = (props: loginProps) => {
    const [copied, setCopied] = useState(false);
    const [hoveredImage, setHoveredImage] = useState<number | null>(null);
    const [deletedImages, setDeletedImages] = useState<string[]>([]);
    const [clickedButtons, setClickedButtons] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const handleLogout = () => {
        googleLogout();
        props.setCredentials(null);
        props.setUser({
            username: '', collectionList: [],
            email: '', picture: ''
        })
    };
    useEffect(() => {
        if (props.credentials !== null) {
            handleLogin(props.credentials)
        }
    }, [deletedImages])

    const handleLogin = async (credentials: CredentialResponse) => {
        setIsLoading(true)
        const response = await fetch(
            "https://neuroart.azurewebsites.net/user",
            {
                method: 'POST',
                headers: {'Authorization': `Bearer ${credentials.credential}`},
            }
        )
        if (!response.ok) {
            throw new Error(`Failed to get user: ${response.status}`);
        }
        const data: User = await response.json();
        props.setUser(data)
        setIsLoading(false)
    };
    const onMouseEnter = (index: number) => {
        setHoveredImage(index);
    };
    const onMouseLeave = () => {
        setHoveredImage(null);
    };

    async function deleteImage(event: React.MouseEvent<HTMLButtonElement>, id: string) {
        event.preventDefault();
        await fetch(`https://neuroart.azurewebsites.net/image/${id}`,
            {
                method: "DELETE",
                headers: {'Authorization': `Bearer ${props.credentials?.credential}`},
            });
        setDeletedImages([...deletedImages, id]);
    }

    const copyLink = (id: string) => {
        navigator.clipboard.writeText(`https://blue-sky-0e47a0403.2.azurestaticapps.net/collection/${id}`)
            .then(() => setCopied(true))
            .catch((error) => console.error(error));
        setTimeout(() => {
            setCopied(false)
        }, 2000)
    }

    function handleCopy(id: string) {
        setClickedButtons([...clickedButtons, id]);
    }

    return (
        <div className='login'>

            {props.user.username !== '' ?
                <div>
                    <div className='login__info'>
                        <div className='info-container'>
                            <div className='info'>
                                <img src={props.user.picture} className='image-pic-profile' alt={'no'}/>
                                <div className='login__info__text'>
                                    <h1>{props.user.username}</h1>
                                    <h2>{props.user.email}</h2>
                                </div>
                            </div>
                            <div className='buttons-container'>
                                <button className='login__button__share'
                                        onClick={() => copyLink(props.user.collectionList[0].images[0].id)}>
                                    {copied ? "Link copied!" : "Share Gallery"} <img
                                    src={require('../../Images/ShareWhite.png')} alt="" className="share-icon"/>
                                </button>
                                <div className="logout-container">
                                    <button className='login__button__logout' onClick={handleLogout}>Logout</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='login__images'>
                        {props.user.collectionList[0].images.map((image, index) => {
                            return (
                                <div key={index} className='login__images__container'>
                                    <div className="image_container">
                                        <div className='delete-text-btn'>
                                            <p className='delete-text'>Delete</p>
                                            <button className="login__button-delete"
                                                    onClick={(event) => deleteImage(event, image.id)}>
                                                X
                                            </button>
                                        </div>
                                        <img
                                            onMouseEnter={() => onMouseEnter(index)}
                                            onMouseLeave={onMouseLeave}
                                            className='login__images__image'
                                            src={image.url}
                                            alt='image'
                                        />
                                        {hoveredImage === index && (
                                            <div className='login__images__info'>
                                                <h2>Title: {image.title}</h2>
                                                <h3>Description: {image.description}</h3>
                                            </div>
                                        )}
                                        <CopyLinkButton id={image.id} onCopy={handleCopy}/>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                :
                <div className="container-handleLogin">
                    {isLoading ? <div className="loading"><LoadingSpinner/></div> : <div className="login__button-div">
                        <p className="sign-in">Sign in and start generating</p>
                        <GoogleLogin
                            onSuccess={(credentialResponse) => {
                                handleLogin(credentialResponse)
                                props.setCredentials(credentialResponse);
                            }}
                            onError={() => {
                                console.log('Login Failed:');
                            }}
                        />
                    </div>}
                </div>
            }
        </div>
    )
        ;
};
export default Login;





