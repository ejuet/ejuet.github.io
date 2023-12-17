import React, { useEffect, useRef, useState } from 'react';

import { Background, Parallax } from 'react-parallax';
import { ParallaxBanner, ParallaxBannerLayer, ParallaxProvider, useParallax } from 'react-scroll-parallax';


//TODO parallax macht table of contents zu headings springen pautt
//TODO parallax macht toc sticky kaputt

export function WithParallax({ children }) {

    const scroll = useDelayedScroll();
    const content = useRef();
    const h = useElementHeight(content)
    const height = Math.max(h, window.innerHeight)
    const w = useElementWidth(content)
    const width = w && w>0 ? w : 80


    return <div>
        <Layer speed={0.5} backgroundSize='50%' backgroundColor='#292d3e' />
        <Layer speed={0.3} backgroundSize='100%' />
        
        <div id="parallaxcontent" ref={content}>
            {children}
        </div>
    </div>


    function Layer({speed, backgroundSize="100%", backgroundColor="transparent"}) {
        return <div style={{
            backgroundColor: backgroundColor,
            position: "absolute",
            top: 0, left: 0,
            overflow: "hidden",
            zIndex: -20,
            height: height,
            width: width
        }}>
            <div style={{
                height: "2000vh",
                backgroundImage: 'url(' + require('./sterne.png') + ')',
                backgroundSize: backgroundSize,
                filter: "brightness(50%)",
                translate: "0px " + (scroll * speed) + "px",
            }} />
        </div>;
    }
}

function useScroll() {
    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return scrollPosition;
}

function useDelayedScroll(){
    const scroll = useScroll();
    const [delayedScroll, setDelayedScroll] = useState(scroll);

    useEffect(()=>{
        //new Promise(resolve => setTimeout(resolve, 500)).then(()=>setDelayedScroll(scroll))
        if(Math.abs(scroll-delayedScroll)>10){
            setDelayedScroll(scroll)
        }
    }, [scroll])
    return delayedScroll;
}

function useElementHeight(ref) {
    return useElementProp(ref, (el)=>el.scrollHeight)
}

function useElementWidth(ref) {
    return useElementProp(ref, (el)=>el.scrollWidth)
}

function useElementProp(ref, fn) {
    const [height, setHeight] = useState(undefined);

    useEffect(() => {
        const resizeObserver = new ResizeObserver(entries => {
            setHeight(fn(ref.current));
        });
        var toObserve = ref.current
        resizeObserver.observe(toObserve);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    return height;
}