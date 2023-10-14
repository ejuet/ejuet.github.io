import React, { createContext } from 'react';
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
import { useScrollbarActive } from './useScrollbarActive';

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
    const scrollbarIsActive = useScrollbarActive()

    const fixAtBottomResp=scrollbarIsActive ? {} : { position: "absolute", bottom: 0 }

    return <Container fluid="xxl" style={{...fixAtBottomResp, marginTop:5, zIndex:0}} className="footer navbar-static-bottom bg-tertiary border-top" >
        <Row className='p-3'>
            <Col xs={12} md={6} >
                <p className='m-0'>© ejuet 2023</p>
            </Col>
            <Col xs={12} md={6} className='justify-content-end d-flex'>
                <NavLinkLang to="/privacy">{strings.privacyPolicy}</NavLinkLang>
            </Col>
        </Row>

    </Container>
}

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);


