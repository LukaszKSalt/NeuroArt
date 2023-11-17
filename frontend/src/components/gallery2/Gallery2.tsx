import "./Gallery2.css";
import React, {useEffect, useState} from "react";
import ImageInfo from "./ImageInfo";
import Footer from "../footer/Footer";
import {useNavigate} from "react-router-dom";

type Image = {
    id: string;
    url: string;
    prompt: string;
    title: string;
    description: string;
};
const Gallery2 = () => {
    const [images, setImages] = useState<Image[]>([]);
    const [activeImages, setActiveImages] = useState<number[]>([]);
    const [hoveredImage, setHoveredImage] = useState<number | null>(null);
    const navigate = useNavigate();

    const quantity = images?.length;

    useEffect(() => {
        async function fetchImages() {
            const response = await fetch("https://neuroartbackend.azurewebsites.net/gallery");
            const images: Image[] = await response.json();
            setImages(images);
        }

        fetchImages();
    }, []);

    useEffect(() => {
        if (quantity) {
            const randomIndices: React.SetStateAction<number[]> = [];
            while (randomIndices.length < 4) {
                const randomIndex = Math.floor(Math.random() * quantity);
                if (!randomIndices.includes(randomIndex)) {
                    randomIndices.push(randomIndex);
                }
            }
            setActiveImages(randomIndices);
        }
    }, [quantity]);

    const nextImage = (event: React.MouseEvent) => {
        event.preventDefault()
        setActiveImages(activeImages.map((index) => (index === quantity - 1 ? 0 : index + 1)));
    };

    const previousImage = (event: React.MouseEvent) => {
        event.preventDefault()
        setActiveImages(activeImages.map((index) => (index === 0 ? quantity - 1 : index - 1)));
    };

    const onMouseEnter = (index: number) => {
        setHoveredImage(index);
    };

    const onMouseLeave = () => {
        setHoveredImage(null);
    };

    return (
        <div className="gallery2-container">
            <div className="gallery2-container__header">
                <p className="gallery2-container__getinspired">Get Inspired</p>
                <p className="gallery2-container__text">Step into our world of visual inspiration and marvel at the
                    stunning creations showcased in our gallery.
                    With a diverse range of styles and techniques on display, there's something for everyone in our
                    gallery.
                    We believe that anyone can tap into their inner creativity and become a master of their craft,
                    and our gallery is the perfect place to start. So come explore, get lost in the beauty of our
                    creations,
                    and let your own imagination take flight.</p>

            </div>

            <div className="gallery2-container__images">
                <button className='gallery2-container__images__button' onClick={previousImage}>❰</button>
                {activeImages.map((index, idx) => (
                    <div className="gallery2-container">
                        <a href="#" onMouseDown={(e) => { e.preventDefault(); navigate(`/collection/${images[index].id}`); }}>Go to Author</a>
                    <div

                        className="gallery2-container__images__carrousel"
                        key={idx}
                        onMouseEnter={() => onMouseEnter(index)}
                        onMouseLeave={onMouseLeave}
                    >
                        <img className="gallery2-container__images__image" key={index} src={images[index]?.url}/>
                        {hoveredImage === index &&
                            <ImageInfo description={images[index]?.description} title={images[index]?.title}/>}
                    </div>
                    </div>
                ))}
                <button className='gallery2-container__images__button' onClick={nextImage}>❱</button>
            </div>
        </div>
    );
};

export default Gallery2
