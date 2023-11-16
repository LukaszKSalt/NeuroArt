import React from 'react';
import "./ImageCard.css"

type Props = {
    imageSrc: string,
    imageAlt: string
}

const ImageCard = ({ imageSrc, imageAlt }: Props) => {
    return (
        <li className='imagecard__list-item'>
            <img src={imageSrc} alt={imageAlt} className='imagecard__image' draggable={false}/>
        </li>
    );
};

export default ImageCard;
