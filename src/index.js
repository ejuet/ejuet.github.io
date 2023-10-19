import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


import { Container, Nav, Navbar, Col, Row, Button } from 'react-bootstrap';
import { MyLocalizedStrings } from './Language/MyLocalizedStrings';
import { NavLinkLang, LanguageToggle } from './Language/LanguageComponents';
import { postLibrary } from "./Blog/Blog.tsx"
import { TableOfContents } from "./TableOfContents/TableOfContents.tsx";
import { useScrollbarActive } from './useScrollbarActive';
import {  Tag, getTagInfo, getTags } from './Blog/Tags';

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
            {postLibrary.getLatestPostCarousel(postLibrary.getPostsWithTag(Tag.chatgptauthor))}
        </WithNavbar>,
    },
    {
        path: "/blog",
        element: <WithNavbar>
            {//postLibrary.getPostsAsCards()
            }
            {
                getTags().reverse().map((tagKey, index) => {
                    return <PostsWithTagCards tagKey={tagKey} />
                })
            }
        </WithNavbar>,
    },
    {
        path: "/privacy",
        element: <WithNavbar>
            <div>Hallo</div>
        </WithNavbar>,
    },

    //pages for posts:
].concat(postLibrary.getPosts().map((post, index) => ({
    path: post.getLink(),
    element: <WithNavbar>
        <div className='App'>
            {post.getPage()}
        </div>
    </WithNavbar>
}))).concat(getTags().map((tagKey, index) => {
    return {
        path: getPathToTag(tagKey),
        element: <WithNavbar>
            <div className='App'>
                <PostsWithTagCards tagKey={tagKey} />
            </div>
        </WithNavbar>
    };
}))

);

export function getPathToTag(tagKey) {
    return "/blog/tag/" + tagKey;
}

function PostsWithTagCards({ tagKey }) {
    var tagInfo = getTagInfo(Tag[tagKey])
    return <>
        <h1 style={{ color: tagInfo.color }}>{tagInfo.translations.title}</h1>
        <p>{tagInfo.translations.description}</p>
        {postLibrary.getPostsAsCards(postLibrary.getPostsWithTag(Tag[tagKey]))}
    </>
}

function WithNavbar({ children }) {
    return <>
        <div className='App'>
            <MyNavbar />
            {children}
            <MyFooter />
        </div>
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

    const fixAtBottomResp = scrollbarIsActive ? {} : { position: "absolute", bottom: 0 }

    return <Container> {/* Extra Container is needed to center footer */}
        <Container fluid="xxl" style={{ ...fixAtBottomResp, marginTop: 5, zIndex: 0 }} className="footer navbar-static-bottom bg-tertiary border-top" >
            <Row className='p-3'>
                <Col xs={12} md={6} >
                    <p className='m-0'>© ejuet 2023</p>
                </Col>
                <Col xs={12} md={6} className='justify-content-end d-flex'>
                    <NavLinkLang to="/privacy">{strings.privacyPolicy}</NavLinkLang>
                </Col>
            </Row>
        </Container>
    </Container>
}

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);


