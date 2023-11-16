import React from 'react';
import "./ImageInfo.css";
import {useNavigate} from "react-router-dom";


type Props = {
    title: string,
    description: string
}

const ImageInfo = ({ title, description }: Props) => {
    const navigate = useNavigate();
    return (
        <div className='image-info'>
            <h3>Title: {title}</h3>
            <h4>Description: {description}</h4>
        </div>
    );
};

export default ImageInfo;

