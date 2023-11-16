import {CredentialResponse} from "@react-oauth/google";
import {Image} from "./components/gallery/Gallery";

export interface Option {
    value: string,
    label: string
}

export interface DropdownProps {
    setPrompt: Function
    isLoading: boolean
    setGenerated: Function,
    setIsDisabled: Function
    setGeneratedImage: Function
    setInputTitle: Function
    setInputDescription: Function
    setIsSaved: Function
    saveButtonText: string
    setSaveButtonText: Function
    user:User
}

export interface User {
    username: String,
    collectionList: Collection[]
    email: String,
    picture: string
}

export interface Collection {
    description: String
    images: Image[]

}

export interface ImageContainerProps {
    image: string
    isLoading: boolean
    prompt: string,
    isDisabled: boolean,
    setIsDisabled: Function,
    inputTitle: string
    setInputTitle: Function
    inputDescription: string
    setInputDescription: Function
    credentials: CredentialResponse | null
    isSaved: boolean
    setIsSaved: Function
    saveButtonText: string
    setSaveButtonText: Function

}

export interface ImageSaveData {
    temporaryUrl: string,
    prompt: string,
    title: string,
    description: string
}

export type CarouselType = {
    imageSrc: string,
    imageAlt: string,
    imageId: string
}

export interface AuthorInfo {
    username: string,
    email: string,
    picture: string,
    collectionList: []
}

export interface FormProps {
    setPrompt: Function;
    isLoading: boolean;
    setIsDisable: Function;
    setGeneratedImage: Function;
    setInputTitle: Function
    setInputDescription: Function
    setIsSaved: Function
    saveButtonText: string
    setSaveButtonText: Function
    user: User
}
