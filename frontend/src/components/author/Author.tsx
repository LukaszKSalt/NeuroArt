import React, {useEffect, useState} from 'react';
import "./Author.css"
import {AuthorInfo} from "../../interfaces";

type Image = {
    id: string;
    url: string;
    prompt: string;
    title: string;
    description: string;
};
const Author = (props: AuthorInfo) => {

    const [authorImages, setAuthorImages] = useState<Image[]>([]);

    useEffect(() => {
        async function fetchImages() {
            const response = await fetch("https://neuroartbackend.azurewebsites.net/user");
            const data = await response.json();
            setAuthorImages(data.collectionList[0].images);
        }
        fetchImages();
    }, []);

    return (
        <div className='author'>
            <h1>Name: {props.username}</h1>
            <h2>Email; {props.email}</h2>
            <h3>{props.picture}</h3>
            <div className='author__images'>
                {authorImages.map((item, index) => (
                    <div key={index}>
                        <img className='author__image' src={item.url} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Author;
