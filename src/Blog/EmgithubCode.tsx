import React, { useEffect, useRef } from "react";
import Giscus from '@giscus/react';
import { generalTexts } from "./Blog.tsx";
import { getCurrentLanguage } from "../Language/MyLocalizedStrings.js";
import Alert from 'react-bootstrap/Alert';


export function TestEmbed() {
    return <div className="d-flex justify-content-center">
        <EmbedCode repo={"xournal-plugins"} file="/BatchHorizontal/main.lua" />
    </div>
}

export function EmbedCode({ repo, file, branch="main", lines="" }) {
    const ref = useRef();

    useEffect(() => {
        const script = document.createElement('script');

        const repoUrl = 'https://github.com/ejuet/'+repo+'/blob/'+branch+file+(lines!=""?"%23L"+lines:"");
        console.log(repoUrl)

        const config = {
            src: "https://emgithub.com/embed-v2.js?target="+repoUrl+'&style=default&type=code&showLineNumbers=on&showFileMeta=on&showFullPath=on&showCopy=on',
        };

        Object.entries(config).forEach(([key, value]) => {
            script.setAttribute(key, value);
        });

        setTimeout(() => {
            //@ts-ignore
            ref.current.append(script);
        }, 300);
    }, []);

    return <div style={{width:"100%"}} ref={ref} />;
};

