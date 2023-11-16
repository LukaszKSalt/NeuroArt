import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Image} from "../gallery/Gallery";
import "./ImageShare.css"

const ImageShare = () => {
    const [image, setImage] = useState<Image>({id:'',url:'',prompt:'',title:'',description:''});
    let {id} = useParams();

    useEffect(() => {
        fetch(`https://neuroart.azurewebsites.net/image/${id}`)
            .then(response => response.json())
            .then(data => {
                const image: Image = data
                setImage(image)
            });
    }, []);

    return (
        <div>
            {image.url === '' ? <div>Loading...</div> :
                <div className='imageshare__container'>
                    <div>
                        <h1 className='imageshare__title'>Title: {image.title}</h1>
                        {image.description &&
                            <h2>Description: {image.description}</h2>}
                            <p>Prompt: {image.prompt}</p>
                    </div>
                    <div>
                        <img className='imageshare__image' src={image.url}/>
                    </div>


                </div>
            }
        </div>
    )
}

export {
    ImageShare
}
