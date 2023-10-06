import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createHashRouter } from 'react-router-dom';

import { Container, Nav, Navbar } from 'react-bootstrap';
import { MyLocalizedStrings } from './Language/MyLocalizedStrings';
import { NavLinkLang, LanguageToggle } from './Language/LanguageComponents';

export var strings = new MyLocalizedStrings({
    en: {
        privacyPolicy: "Privacy Policy",
        language: "Language",
        flag: "🇬🇧"
    },
    de: {
        privacyPolicy: "Datenschutzerklärung",
        language: "Sprache",
        flag: "🇩🇪"
    },
})


const router = createHashRouter([
    {
        path: "",
        element: <WithNavbar>
            <App />
        </WithNavbar>,
    },
    {
        path: "/privacy",
        element: <WithNavbar>
            <App />
        </WithNavbar>,
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
            <NavLinkLang to="/">
                <Navbar.Brand href="" >ejuet</Navbar.Brand>
            </NavLinkLang>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto align-items-center">
                    <Nav.Item>
                        <NavLinkLang to="/">Home</NavLinkLang>
                    </Nav.Item>
                </Nav>
                <Nav className='align-items-center'>
                    <Nav.Item>
                        <NavLinkLang to="/privacy">{strings.privacyPolicy}</NavLinkLang>
                    </Nav.Item>
                    <Nav.Item>
                        <LanguageToggle />
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
}

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);


