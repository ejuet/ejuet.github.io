import React, { useEffect, useRef } from "react";
import Giscus from '@giscus/react';
import { generalTexts } from "./Blog.tsx";
import { getCurrentLanguage } from "../Language/MyLocalizedStrings.js";
import Alert from 'react-bootstrap/Alert';


export function CommentSection({ issueTerm }) {
    //return <Utterances repo="ejuet/utterances" theme="github-light" issueTerm={["[" + issueTerm + "]"]} />
    /*
    return <>
        <Giscus
            id="comments"
            repo="ejuet/giscus"
            repoId="R_kgDOKgEKcw"
            category="Announcements"
            mapping="specific"
            term="Welcome"
            reactionsEnabled="1"
            emitMetadata="1"
            inputPosition="top"
            theme="light"
            lang="en"
            loading="lazy" />
        <p>{generalTexts.utterancescookie}</p>
    </>;
    */

    return <div className="d-flex justify-content-center">
        <div style={{ width: "70vw" }}>
            {
                !localStorage.getItem("giscus-session") &&
                <Alert variant="warning">{generalTexts.commentcookie}</Alert>
            }
        <Comments term={issueTerm} />

        </div>
    </div>
}

function Comments({ term }) {
    const ref = useRef();

    useEffect(() => {
        const script = document.createElement('script');

        const config = {
            src: 'https://giscus.app/client.js',
            "data-repo":"ejuet/giscus",
            "data-repo-id":"R_kgDOKgEKcw",
            "data-category":"Announcements",
            "data-category-id":"DIC_kwDOKgEKc84CaHlh",
            "data-mapping":"specific",
            "data-term":"["+term+"]",
            "data-strict":"0",
            "data-reactions-enabled":"1",
            "data-emit-metadata":"0",
            "data-input-position":"top",
            "data-theme":"light",
            "data-lang":getCurrentLanguage(),
            "data-loading":"lazy",
            "crossorigin":"anonymous",
        };

        Object.entries(config).forEach(([key, value]) => {
            script.setAttribute(key, value);
        });

        setTimeout(() => {
            //@ts-ignore
            ref.current.append(script);
        }, 300);
    }, []);

    return <div ref={ref} />;
};

