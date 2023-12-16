import { useState, useEffect } from 'react';

export function useScrollbarActive() {
    const [scrollbarIsActive, setSc] = useState(false);

    useEffect(() => {
        const resizeObserver = new ResizeObserver(entries => {
            var height = Math.max(document.body.clientHeight, document.getElementById("parallaxcontent")?.scrollHeight)
            setSc(height > window.innerHeight);
        });
        var toObserve = document.getElementById("parallaxcontent")? document.getElementById("parallaxcontent") : document.body;
        resizeObserver.observe(toObserve);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    return scrollbarIsActive;
}
