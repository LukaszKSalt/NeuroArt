import React, {useState} from "react";
import './CopyLinkButton.css'

interface CopyLinkButtonProps {
    id: string;
    onCopy: (id: string) => void;
}

export const CopyLinkButton = (props: CopyLinkButtonProps) => {
    const [copied, setCopied] = useState(false);

    function copyLink() {
        navigator.clipboard.writeText(`https://mango-cliff-0ac4f4f03.4.azurestaticapps.net/image/${props.id}`)
            .then(() => {
                setCopied(true);
                props.onCopy(props.id);
            })
            .catch((error) => console.error(error));
        setTimeout(() => {
            setCopied(false)
        }, 3000)
    }

    return (
        <div className='button'>
            <button className='button__share' onClick={copyLink}>
                {copied ? "Link copied!" : "Share"}
                <img src={require('../../Images/ShareWhite.png')} alt="" className="share-icon"/>
            </button>
        </div>
    );
}
