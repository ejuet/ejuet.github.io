import React, { useEffect, useRef, useState } from 'react';


export function WithParallax({ children }) {

    const scroll = useDelayedScroll();
    const content = useRef();
    const h = useElementHeight(content)
    const height = Math.max(h, window.innerHeight)
    const w = useElementWidth(content)
    const width = w && w > 0 ? w : 80


    return <div>
        <Layer speed={0.5} backgroundSize='50%' backgroundColor='#292d3e' url={require('./sterne.png')} />
        <Layer speed={0.4} backgroundSize='70%' url={require('./sterne.png')} />
        <Layer speed={0.3} backgroundSize='100%' url={require('./sterne.png')}/>

        <div id="parallaxcontent" ref={content}>
            {children}
        </div>
    </div>


    function Layer({ speed, backgroundSize = "100%", backgroundColor = "transparent", url=require('./sterne.png') }) {
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
                backgroundImage: 'url(' + url + ')',
                backgroundSize: backgroundSize,
                filter: "brightness(100%)",
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

function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end
}

function useDelayedScroll() {
    const scroll = useScroll();
    const [delayedScroll, setDelayedScroll] = useState(scroll);
    const [isMoving, setIsMoving] = useState(false);
    const [lastMoved, setLastMoved] = useState(0);

    useEffect(() => {
        //new Promise(resolve => setTimeout(resolve, 500)).then(()=>setDelayedScroll(scroll))


        setDelayedScroll(scroll)
        /*
        console.log(scroll)
        if(!isMoving){
            setIsMoving(true);
            setLastMoved(Date.now())
            setInterval(move, 300)
        */

    }, [scroll])
    return delayedScroll;

    function move() {
        var currentVal = delayedScroll;
        var goal = scroll;
        setDelayedScroll(lerp(currentVal, goal, Math.max(0, Math.min(Date.now() - lastMoved) / 3000, 1)))
        console.log("hallop")
        if (Date.now() - lastMoved > 3000) {
            clearInterval(move);
            setIsMoving(false);
        }
    }
}

function useElementHeight(ref) {
    return useElementProp(ref, (el) => el.scrollHeight)
}

function useElementWidth(ref) {
    return useElementProp(ref, (el) => el.scrollWidth)
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