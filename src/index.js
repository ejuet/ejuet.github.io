import React, { createContext, useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createHashRouter } from 'react-router-dom';

import { Container, Nav, Navbar, Col, Row, Button } from 'react-bootstrap';
import { MyLocalizedStrings } from './Language/MyLocalizedStrings';
import { NavLinkLang, LanguageToggle } from './Language/LanguageComponents';
import { Tag, postLibrary } from "./Blog/Blog.tsx"
import { TableOfContents } from "./TableOfContents/TableOfContents.tsx";

const strings = new MyLocalizedStrings({
    en: {
        privacyPolicy: "Privacy Policy",
        language: "Language",
        flag: "🇬🇧",
    },
    de: {
        privacyPolicy: "Datenschutzerklärung",
        language: "Sprache",
        flag: "🇩🇪",
    },
})


const router = createHashRouter([
    {
        path: "",
        element: <WithNavbar>
            {postLibrary.getLatestPostCarousel()}
        </WithNavbar>,
    },
    {
        path: "/blog",
        element: <WithNavbar>
            {postLibrary.getPostsAsCards()}
            {postLibrary.getPostsAsCards(postLibrary.getPostsWithTag(Tag.school))}
        </WithNavbar>,
    },
    {
        path: "/privacy",
        element: <WithNavbar>
            <App />
        </WithNavbar>,
    },
].concat(postLibrary.getPosts().map((post, index) => ({
    path: post.getLink(),
    element: <WithNavbar>
        <div className='App'>
            {post.getPage()}
            <TableOfContents />
        </div>
    </WithNavbar>
}))));

function WithNavbar({ children }) {
    return <>
        <MyNavbar />
        {children}
        <MyFooter />
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
                    <Nav.Item>
                        <NavLinkLang to="/blog">Blog</NavLinkLang>
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

function MyFooter() {
    const [scrollbarIsActive, setSc] = useState(false);
    useEffect(()=>{
        setSc(document.body.clientHeight > window.innerHeight)
    }) 

    return <Container fluid="xxl" style={scrollbarIsActive?{}:{position:"absolute", bottom:0}} className="footer navbar-static-bottom bg-tertiary border-top" >
    <Row className='justify-content-center p-3'>
        <Col xs={12} md={"auto"}>
            <NavLinkLang>Ganz langer toller Name oh wow wirklich super</NavLinkLang>
        </Col>
        <Col className='justify-content-center d-flex'>
            <NavLinkLang>Test</NavLinkLang>
            {JSON.stringify(scrollbarIsActive)}
        </Col>
    </Row>

</Container>
}

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);


