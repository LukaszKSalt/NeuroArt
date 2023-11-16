import React, {useEffect, useRef, useState} from 'react';
import "./ImageCarousel.css"
import ImageCard from "../imageCard/ImageCard";
import {CarouselType} from "../../interfaces";
import {getRefValue, useStateRef} from "../../lib/hooks";

export type Props = {
    items: CarouselType[]
}

const MIN_SWIPE_REQUIRED = 40;

const ImageCarousel = ({ items }: Props) => {

    const containerRef = useRef<HTMLUListElement>(null);
    const containerWidthRef = useRef(0)
    const minOffSetXRef = useRef(0);
    const currentOffsetXRef = useRef(0);
    const startXRef = useRef(0);

    const [isSwiping, setIsSwiping] = useState(false);
    const [offsetX, setOffsetX, offsetXRef] = useStateRef(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    const onTouchMove = (event: TouchEvent | MouseEvent) => {
        const currentX = getTouchEventData(event).clientX;
        const diff = getRefValue(startXRef) - currentX;
        let newOffsetX = getRefValue(currentOffsetXRef) - diff;

        const maxOffsetX = 0;
        const minOffsetX = getRefValue(minOffSetXRef)

        if(newOffsetX > maxOffsetX) {
            newOffsetX = 0;
        }
        if(newOffsetX < minOffsetX) {
            newOffsetX = minOffsetX;
        }

        setOffsetX(newOffsetX)
    }

    const onTouchEnd = () => {
        const containerWidth = getRefValue(containerWidthRef);
        const currentOffsetX = getRefValue(currentOffsetXRef)
        let newOffsetX = getRefValue(offsetXRef);

        const diff = currentOffsetX - newOffsetX;

        if(Math.abs(diff) > MIN_SWIPE_REQUIRED) {
            if(diff > 0) {
                newOffsetX = Math.floor(newOffsetX / containerWidth) * containerWidth;
            } else {
                newOffsetX = Math.ceil(newOffsetX / containerWidth) * containerWidth;
            }
        } else {
            newOffsetX = Math.round(newOffsetX / containerWidth) * containerWidth;
        }

        setIsSwiping(false);
        setOffsetX(newOffsetX);
        setCurrentIndex(Math.abs(newOffsetX / containerWidth));

        window.removeEventListener('touchmove', onTouchMove)
        window.removeEventListener('touchend', onTouchEnd)
        window.removeEventListener('mousemove', onTouchMove)
        window.removeEventListener('mouseup', onTouchEnd)
    }

    const onTouchStart = (event: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
        setIsSwiping(true);

        currentOffsetXRef.current = getRefValue(offsetXRef);
        startXRef.current = getTouchEventData(event).clientX

        const containerEl = getRefValue(containerRef);
        const containerWidth = containerEl.offsetWidth;

        containerWidthRef.current = containerWidth;
        minOffSetXRef.current = containerEl.offsetWidth - containerEl.scrollWidth;

        window.addEventListener('touchmove', onTouchMove)
        window.addEventListener('touchend', onTouchEnd)
        window.addEventListener('mousemove', onTouchMove)
        window.addEventListener('mouseup', onTouchEnd)
    }

    function getTouchEventData(
        event:
            | TouchEvent
            | MouseEvent
            | React.TouchEvent<HTMLDivElement>
            | React.MouseEvent<HTMLDivElement>
    ) {
        return 'changedTouches' in event ? event.changedTouches[0] : event;
    }

    const indicatorOnClick = (index: number) => {
        const containerEl = getRefValue(containerRef);
        const containerWidth = containerEl.offsetWidth;

        setCurrentIndex(index);
        setOffsetX(-(containerWidth * index))
    }

    const [randomItems, setRandomItems] = useState<CarouselType[]>([])
    useEffect(() => {
        const itemsCopy = items;
        for (let i = itemsCopy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [itemsCopy[i], itemsCopy[j]] = [itemsCopy[j], itemsCopy[i]]
        }
        setRandomItems(itemsCopy.slice(0, 5))
    }, [])

    return (
        <div className='imagecarousel' onTouchStart={onTouchStart} onMouseDown={onTouchStart}>
            <ul ref={containerRef} className={`imagecarousel__list ${isSwiping ? 'swiping' : ''}`} style={{ transform: `translate3d(${offsetX}px, 0, 0)`}}>
                {randomItems.map((item, index) => (
                        <ImageCard key={index} {...item}/>
                ))}
            </ul>
            <ul className='imagecarousel__indicator'>
                {
                    randomItems.map((_item, index) => (
                        <li key={index}
                            className={`imagecarousel__indicator-item ${index === currentIndex ? 'active': ''}`}
                            onClick={() => indicatorOnClick(index)}
                        />
                    ))
                }
            </ul>
        </div>
    );
};

export default ImageCarousel;
