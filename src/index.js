import React, { createContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createHashRouter, useSearchParams } from 'react-router-dom';

import { Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import LocalizedStrings from 'react-localization';

var strings = new LocalizedStrings({
    en: {
        privacyPolicy: "Privacy Policy",
        language: "Language",
        flag: "🇬🇧"
    },
    de: {
        privacyPolicy: "Datenschutzerklärung",
        language: "Sprache",
        flag: "🇩🇪"
    }
})

//set language in query param
var quer = window.location.href.match(/lang=(.*)&?/)
strings.setLanguage(quer ? quer[1] : navigator.language)

const router = createHashRouter([
    {
        path: "",
        element: <WithNavbar>
            <App />
        </WithNavbar>,
    },
    {
        path: "/privacy",
        element: <p>Aaa</p>,
    },
]);

function WithNavbar({ children }) {
    return <>
        <MyNavbar />
        {children}
    </>
}

function MyNavbar() {
    return <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
            <NavLink to="/" onlyActiveOnIndex exact activeClassName="active">
                <Navbar.Brand href="" >ejuet</Navbar.Brand>
            </NavLink>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link>
                        <NavLink to="/home">Home</NavLink>
                    </Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link>
                        <NavLinkLang to="/privacy">{strings.privacyPolicy}</NavLinkLang>
                    </Nav.Link>
                    <LanguageToggle />
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
}

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);

function NavLinkLang(props){
    const [searchParams, setSearchParams] = useSearchParams();
    const language = searchParams.get('lang');
    return <NavLink {...props} to={props.to+"?lang="+language} />
}

function LanguageToggle() {

    const [searchParams, setSearchParams] = useSearchParams();
    const myParam = searchParams.get('lang');

    useEffect(() => {
        if (myParam && myParam != strings.getLanguage()) {
            window.location.reload()
        }
    }, [myParam])

    function setLanguage(newLang) {
        setSearchParams({ lang: newLang })
    }

    return <Dropdown>
        <DropdownToggle>{strings.flag}  {strings.language}</DropdownToggle>
        <DropdownMenu>
            <DropdownItem onClick={() => { setLanguage("en") }}>English</DropdownItem>
            <DropdownItem onClick={() => { setLanguage("de") }}>Deutsch</DropdownItem>
        </DropdownMenu>
    </Dropdown>
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
