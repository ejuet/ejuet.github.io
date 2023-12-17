import React, { useEffect, useRef, useState } from "react";
import Giscus from '@giscus/react';
import { generalTexts } from "./Blog.tsx";
import { getCurrentLanguage } from "../Language/MyLocalizedStrings.js";
import Alert from 'react-bootstrap/Alert';


export function TestEmbed() {
    return <div className="d-flex justify-content-center">
        <EmbedCode repo={"xournal-plugins"} file="/BatchHorizontal/main.lua" />
    </div>
}

export function EmbedCode({ repo, file, branch = "main", lines = "" }) {
    const ref = useRef();
    const [width, setW] = useState(-1);

    useEffect(() => {
        const script = document.createElement('script');

        const repoUrl = 'https://github.com/ejuet/' + repo + '/blob/' + branch + file + (lines != "" ? "%23L" + lines : "");

        const config = { //TODO emgithub selbst hosten
            src: "https://emgithub.com/embed-v2.js?target=" + repoUrl + '&style=base16%2Fdracula&type=code&showLineNumbers=on&showFileMeta=on&showFullPath=on&showCopy=on',
        };

        Object.entries(config).forEach(([key, value]) => {
            script.setAttribute(key, value);
        });

        setTimeout(() => {
            //@ts-ignore
            ref.current.append(script);
        }, 300);


        setW(getWidth());
        window.addEventListener("resize", onResize)

        //return window.removeEventListener("resize", onResize)

        function onResize() {
            setW(0) //set width to 0 so container can rescale
            setW(getWidth()); //fit iframe to container
        }

    }, []);


    return <div style={{ width: width > 0 ? width : 0, }} className="">
        <div style={{ width: "100% !important" }} ref={ref} />
    </div>
};

function getWidth(): React.SetStateAction<number> {
    var element = document.getElementsByClassName("page-content")[0];
    if(document.getElementsByClassName("page-content").length==0) return 0;
    var computedStyle = getComputedStyle(element);

    var elementHeight = element.clientHeight;  // height with padding
    var elementWidth = element.clientWidth;   // width with padding

    elementHeight -= parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);
    elementWidth -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);
    return elementWidth;
}

