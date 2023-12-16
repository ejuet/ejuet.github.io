import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { MyLocalizedStrings } from './MyLocalizedStrings';
//import { strings } from '..';

export const strings = new MyLocalizedStrings({
    en: {
        language: "Language",
        flag: "🇬🇧",
    },
    de: {
        language: "Sprache",
        flag: "🇩🇪",
    },
})
export function NavLinkLang(props) {
    const [searchParams, setSearchParams] = useSearchParams(props.to);
    const language = searchParams.get('lang');
    const appendSymbol = (props.to.includes && (/(\?)(?=(?:[^'"]|'[^']*'|"[^"]*")*$)/).test(props.to)) ? "&" : "?"
    const appendix = language ? appendSymbol+"lang=" + language : "";
    return <NavLink {...props} to={props.to + appendix} />;
}
export function LanguageToggle() {

    const [searchParams, setSearchParams] = useSearchParams();
    const myParam = searchParams.get('lang');

    useEffect(() => {
        if (myParam && myParam!=strings.getLanguage()) {
            window.location.reload();
        }
    }, [myParam]);

    function setLanguage(newLang) {
        searchParams.set("lang", newLang)
        setSearchParams(searchParams); //TODO fix other params disappearing on setting
    }

    return <Dropdown>
        <DropdownToggle>{strings.flag}  {strings.language}</DropdownToggle>
        <DropdownMenu>
            <DropdownItem onClick={() => { setLanguage("en"); }}>English</DropdownItem>
            <DropdownItem onClick={() => { setLanguage("de"); }}>Deutsch</DropdownItem>
        </DropdownMenu>
    </Dropdown>;
}
