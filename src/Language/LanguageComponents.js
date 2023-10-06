import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { strings } from '..';

export function NavLinkLang(props) {
    const [searchParams, setSearchParams] = useSearchParams();
    const language = searchParams.get('lang');
    const appendix = language ? "?lang=" + language : "";
    return <NavLink {...props} to={props.to + appendix} />;
}
export function LanguageToggle() {

    const [searchParams, setSearchParams] = useSearchParams();
    const myParam = searchParams.get('lang');

    useEffect(() => {
        if (myParam && myParam != strings.getLanguage()) {
            window.location.reload();
        }
    }, [myParam]);

    function setLanguage(newLang) {
        setSearchParams({ lang: newLang });
    }

    return <Dropdown>
        <DropdownToggle>{strings.flag}  {strings.language}</DropdownToggle>
        <DropdownMenu>
            <DropdownItem onClick={() => { setLanguage("en"); }}>English</DropdownItem>
            <DropdownItem onClick={() => { setLanguage("de"); }}>Deutsch</DropdownItem>
        </DropdownMenu>
    </Dropdown>;
}
