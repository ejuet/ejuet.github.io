import { useState, useEffect } from 'react';

export function useScrollbarActive() {
    const [scrollbarIsActive, setSc] = useState(false);

    useEffect(() => {
        const resizeObserver = new ResizeObserver(entries => {
            setSc(document.body.clientHeight > window.innerHeight);
        });
        resizeObserver.observe(document.body);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    return scrollbarIsActive;
}
