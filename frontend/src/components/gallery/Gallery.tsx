import "./Gallery.css";
import ImageCarousel from "../imageCarousel/ImageCarousel";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export type Image = {
    id: string;
    url: string;
    prompt: string;
    title: string;
    description: string;
};

const Gallery = () => {

    const [images, setImages] = useState<Image[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchImages() {
            const response = await fetch("https://neuroartbackend.azurewebsites.net/gallery");
            const images: Image[] = await response.json();
            setImages(images);
        }
        fetchImages();
    }, []);

    const items = images
        .map((image) => ({
            imageAlt: image.title,
            imageSrc: image.url,
            imageId: image.id,
        }));


    return (
        <div className="gallery">
            <div className="gallery__carousel-container">{images.length > 0 && <ImageCarousel items={items} />}</div>
            <div className="gallery__image-container">
                {items.map((item, index) => (
                    <div key={index}>
                        <img onClick={() => navigate(`/image/${item.imageId}`)} className="gallery__image" src={item.imageSrc} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;
