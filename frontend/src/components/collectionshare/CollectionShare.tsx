import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Image} from "../gallery/Gallery";
import './CollectionShare.css'

interface CollectionShare {
    name: string,
    description: string,
    images: Image[]
}

const CollectionShare = () => {
    const [images, setImages] = useState<Image[]>([]);
    const [collection, setCollection] = useState<CollectionShare>({name:'',description:'',images:[]});
    let {id} = useParams();
    const [hoveredImage, setHoveredImage] = useState<number | null>(null);

    useEffect(() => {
        fetch(`https://neuroartbackend.azurewebsites.net/collection/${id}`)
            .then(response => response.json())
            .then(data => {
                const collection: CollectionShare = data;
                setImages(collection.images);
                setCollection(collection);
            });
    }, []);

    const onMouseEnter = (index: number) => {
        setHoveredImage(index);
    };

    const onMouseLeave = () => {
        setHoveredImage(null);
    };

    return (
        <div className='collectionshare'>
            {collection.name === '' ? <div className='collectionshare__loading'>Loading...</div> :
                <div className='collectionshare__container'>
                    <h1 className='collectionshare__author'>Author: {collection.name}</h1>
                    <>
                    {images.map((image, index) =>
                        <img onMouseEnter={() => onMouseEnter(index)}
                             onMouseLeave={onMouseLeave}
                             className='collectionshare__img'
                             key={index}
                             src={image.url}/>

                    )}
                    </>
                </div>
            }
        </div>
    )
}

export {
    CollectionShare
}
