import React, {useState} from 'react';
import './Form.css';
import Dropdown from '../dropdown/Dropdown';
import {FormProps} from "../../interfaces";

const Form = (props: FormProps) => {
    const [key, setKey] = useState<number>(0);

    const handleGenerated = () => {
        setKey((prevKey) => prevKey + 1);
    };

    return (
        <div className='dropdown'>
            <form>
                <Dropdown
                    key={key}
                    setInputTitle={props.setInputTitle}
                    setInputDescription={props.setInputDescription}
                    setGenerated={handleGenerated}
                    setPrompt={props.setPrompt}
                    isLoading={props.isLoading}
                    setIsDisabled={props.setIsDisable}
                    setGeneratedImage={props.setGeneratedImage}
                    setIsSaved={props.setIsSaved}
                    saveButtonText={props.saveButtonText}
                    setSaveButtonText={props.setSaveButtonText}
                    user={props.user}
                    />
            </form>
        </div>
    );
};

export default Form;
