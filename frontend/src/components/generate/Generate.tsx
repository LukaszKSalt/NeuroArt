import React, {useEffect, useState} from 'react';
import "./Generate.css"
import Form from "../form/Form";
import ImageContainer from "../imageContainer/ImageContainer";
import {CredentialResponse} from "@react-oauth/google";
import {useNavigate} from "react-router-dom";
import {User} from "../../interfaces";

interface generateProps {
    credentials: CredentialResponse | null
    user: User
}

const Generate = (props: generateProps) => {

    const [prompt, setPrompt] = useState<string>('');
    const [generatedImage, setGeneratedImage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [inputTitle, setInputTitle] = useState("");
    const [inputDescription, setInputDescription] = useState("");
    const navigate = useNavigate();
    const [isSaved, setIsSaved] = useState(false);
    const [saveButtonText, setSaveButtonText] = useState('Save');


    useEffect(() => {
        setPrompt('')
    }, [])

    useEffect(() => {
        if (prompt === '') {
            return;
        }
        handleGenerate();
    }, [prompt]);

    const handleGenerate = async () => {
        if (props.credentials == null) {
            navigate("/login");
            return;
        }
        setIsLoading(true)
        const response = await fetch(
            "https://neuroart.azurewebsites.net/generate",
            {
                method: 'POST',
                headers: {
                    'content-type': 'text/plain',
                    'Authorization': `Bearer ${props.credentials.credential}`
                },
                body: prompt,
            }
        )

        if (!response.ok) {
            throw new Error(`Failed to generate image: ${response.status}`);
        }

        const url = await response.text();
        setGeneratedImage(url);
        setIsLoading(false)
    };

    return (
        <div className='generate'>
            <div className="generate__div">
                <p className='generate__heading'>Be Creative</p>
                <p className="generate__text">Explore your creativity. We provide different examples of options that you
                    can set
                    in order to translate your thoughts into art. All the examples are optional, but you can retrieve
                    precise results if you define your preferences.
                    Feel free to experiment with different options and see what kind of images you can create. You can
                    save your favorite creations to your account.
                    Start exploring today and see what you can create!</p>
            </div>
            <div className="form-container">
                <Form setInputTitle={setInputTitle}
                      setInputDescription={setInputDescription}
                      setPrompt={setPrompt}
                      isLoading={isLoading}
                      setIsDisable={setIsDisabled}
                      setGeneratedImage={setGeneratedImage}
                      setIsSaved={setIsSaved}
                      saveButtonText={saveButtonText}
                      setSaveButtonText={setSaveButtonText}
                      user={props.user}/>
            </div>
            <ImageContainer credentials={props.credentials} inputTitle={inputTitle}
                            setInputTitle={setInputTitle}
                            inputDescription={inputDescription}
                            setInputDescription={setInputDescription}
                            image={generatedImage}
                            isLoading={isLoading}
                            prompt={prompt}
                            isDisabled={isDisabled}
                            setIsDisabled={setIsDisabled}
                            isSaved={isSaved}
                            setIsSaved={setIsSaved}
                            saveButtonText={saveButtonText}
                            setSaveButtonText={setSaveButtonText}
            />
        </div>
    );
};

export default Generate;
