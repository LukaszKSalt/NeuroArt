import React, {useState} from 'react';
import "./ImageContainer.css"
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
import {ImageContainerProps, ImageSaveData} from "../../interfaces";

const ImageContainer = (props: ImageContainerProps) => {
    const [isSaving, setIsSaving] = useState(false);
    const [inputTitleError, setInputTitleError] = useState(false);

    const handleSave = async () => {
        if (props.isDisabled) {
            return;
        }
        if (props.inputTitle == null) {
            setInputTitleError(true)
            return;
        }
        const trimmedTitle = props.inputTitle.trim();
        if (trimmedTitle === '') {
            setInputTitleError(true);
            return;
        }

        setIsSaving(true);

        const save: ImageSaveData = {
            temporaryUrl: props.image,
            prompt: props.prompt,
            title: trimmedTitle,
            description: props.inputDescription,
        };

        const response = await fetch("https://neuroartbackend.azurewebsites.net/image", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${props.credentials?.credential}`,
            },
            body: JSON.stringify(save),
        });

        if (!response.ok) {
            throw new Error(`Failed to save: ${response.status}`);
        }

        props.setIsSaved(true);
        setIsSaving(false);
        props.setSaveButtonText("Saved");
        props.setIsDisabled(true);
    };


    return (
        <div className="imagecontainer">
            {props.isLoading && <LoadingSpinner />}
            {props.image && (
                <>
                    <div className="imagecontainer__generated-image-div">
                        <img className="imagecontainer__generated-image" src={props.image} />
                    </div>
                    <div className="imagecontainer__input-div">
                        <label className="add-title-label">Add Title: </label>
                        <input
                            type="text"
                            className={`imagecontainer__title-input${inputTitleError ? '-error' : ''}`}
                            placeholder={inputTitleError ? 'Please provide title' : 'Add a title'}
                            value={props.inputTitle}
                            onChange={(e) => {
                                props.setInputTitle(e.target.value);
                                setInputTitleError(false);
                            }}
                        />
                        <label htmlFor="" className="add-description-label">
                            Add Description:{" "}
                        </label>
                        <input
                            type="text"
                            className="imagecontainer__description-input"
                            placeholder="Add a description"
                            value={props.inputDescription}
                            onChange={(e) => props.setInputDescription(e.target.value)}
                        />
                        {isSaving && (
                            <div className="letter-holder">
                                <div className="l-1 letter">S</div>
                                <div className="l-2 letter">a</div>
                                <div className="l-3 letter">v</div>
                                <div className="l-4 letter">i</div>
                                <div className="l-5 letter">n</div>
                                <div className="l-6 letter">g</div>
                                <div className="l-7 letter">.</div>
                                <div className="l-8 letter">.</div>
                                <div className="l-9 letter">.</div>
                            </div>
                        )}
                        <button
                            className={props.isSaved ? "imagecontainer__save-btn saved" : "imagecontainer__save-btn"}
                            onClick={handleSave}
                            disabled={props.isDisabled}
                        >
                            {props.saveButtonText}
                        </button>
                    </div>
                </>)
            }
        </div>
    );
};

export default ImageContainer;
