import React, {useState} from 'react';
import './Dropdown.css'
import Select, {OnChangeValue} from 'react-select';
import {DropdownProps, Option} from "../../interfaces";
import {customStyles, customTheme} from "./customsThemeAndStyle";
import {
    colorOptions,
    landscapeOptions,
    lightingOptions,
    moodOptions,
    shapeOptions,
    styleOptions,
    textureOptions
} from "./options";
import {useNavigate} from "react-router-dom";

const Dropdown = (props: DropdownProps) => {

    const [lightingOption, setLightingOption] = useState<Option>(lightingOptions[0]);
    const [styleOption, setStyleOption] = useState<Option>(styleOptions[0]);
    const [colorOption, setColorOption] = useState<Option>(colorOptions[0]);
    const [landscapeOption, setLandscapeOption] = useState<Option>(landscapeOptions[0]);
    const [textureOption, setTextureOption] = useState<Option>(textureOptions[0]);
    const [shapeOption, setShapeOption] = useState<Option>(shapeOptions[0]);
    const [moodOption, setMoodOption] = useState<Option>(moodOptions[0]);
    const [userInput, setUserInput] = useState('');
    const navigate = useNavigate();

    const handleReset = () => {
        setLightingOption(lightingOptions[0]);
        setStyleOption(styleOptions[0]);
        setColorOption(colorOptions[0]);
        setLandscapeOption(landscapeOptions[0]);
        setTextureOption(textureOptions[0]);
        setShapeOption(shapeOptions[0]);
        setMoodOption(moodOptions[0])
        setUserInput('');
    };

    const handleChangeLighting = (event: OnChangeValue<unknown, false>) => {
        if (event) {
            setLightingOption(event as Option);
        }
    };

    const handleChangeStyle = (event: OnChangeValue<unknown, false>) => {
        if (event) {
            setStyleOption(event as Option);
        }
    };

    const handleChangeColor = (event: OnChangeValue<unknown, false>) => {
        if (event) {
            setColorOption(event as Option);
        }
    };

    const handleChangeLandscape = (event: OnChangeValue<unknown, false>) => {
        if (event) {
            setLandscapeOption(event as Option);
        }
    };

    const handleChangeTexture = (event: OnChangeValue<unknown, false>) => {
        if (event) {
            setTextureOption(event as Option);
        }
    };

    const handleChangeShape = (event: OnChangeValue<unknown, false>) => {
        if (event) {
            setShapeOption(event as Option);
        }
    };

    const handleChangeMood = (event: OnChangeValue<unknown, false>) => {
        if (event) {
            setMoodOption(event as Option);
        }
    };

    const makePrompt = () => {
        let prompt: string = userInput;
        if(userInput !== '') {
            if (lightingOption.value !== '') {
                prompt = [prompt, lightingOption.value].join(' ').toString()
            }
            if (styleOption.value !== '') {
                prompt = [prompt, styleOption.value].join(' ').toString()
            }
            if (colorOption.value !== '') {
                prompt = [prompt, colorOption.value].join(' ').toString()
            }
            if (landscapeOption.value !== '') {
                prompt = [prompt, landscapeOption.value].join(' ').toString()
            }
            if (textureOption.value !== '') {
                prompt = [prompt, textureOption.value].join(' ').toString()
            }
            if (shapeOption.value !== '') {
                prompt = [prompt, shapeOption.value].join(' ').toString()
            }
            if (moodOption.value !== '') {
                prompt = [prompt, moodOption.value].join(' ').toString()
            }
            return prompt;
        }
    }

    const handleGenerate = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        props.setInputTitle(null)
        props.setInputDescription(null)
        props.setIsDisabled(false)
        props.setIsSaved(false)
        props.setSaveButtonText('Save');
        handleReset();
        let promptMade = makePrompt()
        if (promptMade) {
            props.setPrompt(promptMade)
        }
        props.setGeneratedImage(null)
        props.setGenerated(true)
    }

    const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(event.target.value);
    }

    return (
        <div className='dropdown'>
            {props.user.username === '' ? <button className='dropdown__generate-btn'
                                                  onClick={(event) => navigate('/login')}>Please Log In</button>
                :
            <>
            <div>
                <div className="dropdown__text-div">
                    <label>
                        Text input:
                    </label>
                    <input className='dropdown__text-input' placeholder='Manifest your ideas ...' type="text"
                           onChange={event => handleUserInput(event)}/>
                    <button className='dropdown__generate-btn'
                            onClick={event => handleGenerate(event)}
                            disabled={props.isLoading}>Generate</button>
                </div>
            </div>
            <div className='dropdown__select-div-container'>
                <div className="dropdown__select-div">
                    <label>Select Lighting:</label>
                    <Select theme={customTheme}
                            styles={customStyles}
                            className='dropdown__select'
                            defaultValue={lightingOptions[0]}
                            options={lightingOptions}
                            onChange={(event) => handleChangeLighting(event)}
                    />
                </div>
                <div className="dropdown__select-div">
                    <label>Select Style:</label>
                    <Select theme={customTheme}
                            styles={customStyles}
                            className='dropdown__select'
                            defaultValue={styleOptions[0]}
                            options={styleOptions}
                            onChange={(event) => handleChangeStyle(event)}
                    />
                </div>
                <div className="dropdown__select-div">
                    <label>Select Color:</label>
                    <Select theme={customTheme}
                            styles={customStyles}
                            className='dropdown__select'
                            defaultValue={colorOptions[0]}
                            options={colorOptions}
                            onChange={(event) => handleChangeColor(event)}
                    />
                </div>
                <div className="dropdown__select-div">
                    <label>Select Landscape:</label>
                    <Select theme={customTheme}
                            styles={customStyles}
                            className='dropdown__select'
                            defaultValue={landscapeOptions[0]}
                            options={landscapeOptions}
                            onChange={(event) => handleChangeLandscape(event)}
                    />
                </div>
                <div className="dropdown__select-div">
                    <label>Select Texture:</label>
                    <Select theme={customTheme}
                            styles={customStyles}
                            className='dropdown__select'
                            defaultValue={textureOptions[0]}
                            options={textureOptions}
                            onChange={(event) => handleChangeTexture(event)}
                    />
                </div>
                <div className="dropdown__select-div">
                    <label>Select Shape:</label>
                    <Select theme={customTheme}
                            styles={customStyles}
                            className='dropdown__select'
                            defaultValue={shapeOptions[0]}
                            options={shapeOptions}
                            onChange={(event) => handleChangeShape(event)}
                    />
                </div>
                <div className="dropdown__select-div">
                    <label>Select Mood:</label>
                    <Select theme={customTheme}
                            styles={customStyles}
                            className='dropdown__select'
                            defaultValue={moodOptions[0]}
                            options={moodOptions}
                            onChange={(event) => handleChangeMood(event)}
                    />
                </div>
            </div>
            </>
            }
        </div>
    );
};

export default Dropdown;
