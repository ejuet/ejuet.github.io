import React from 'react';
import { useSearchParams } from 'react-router-dom';

export function NavLinkLang(props) {
    const [searchParams, setSearchParams] = useSearchParams(props.to);
    const language = searchParams.get('lang');
    const appendSymbol = (props.to.includes && (/(\?)(?=(?:[^'"]|'[^']*'|"[^"]*")*$)/).test(props.to)) ? "&" : "?";
    const appendix = language ? appendSymbol + "lang=" + language : "";

    //instead of using "Link" or "<a>", we use a div and implement link functionality ourselves so we don't have nested links (not html compliant)
    return <div {...props}
        style={{ cursor: 'pointer' }}
        className='navlinklang'
        onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();

            //TODO extract to router.tsx:
            window.location = window.origin + "/#" + props.to + appendix;
        }} />;
}
