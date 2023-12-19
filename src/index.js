import React, { createContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './App.scss';
import reportWebVitals from './reportWebVitals.js';
import { RouterProvider, createHashRouter, useSearchParams, } from 'react-router-dom';


import { Container, Nav, Navbar, Col, Row, Button, Badge } from 'react-bootstrap';
import { MyLocalizedStrings } from './Language/MyLocalizedStrings.js';
import { NavLinkLang, LanguageToggle } from './Language/LanguageComponents.js';
import { postLibrary } from "./Blog/Blog"
import { TableOfContents } from "./TableOfContents/TableOfContents";
import { useScrollbarActive } from './useScrollbarActive.js';
import { Tag, getTagInfo, getTags } from './Blog/Tags';
import { MyPrivacy } from './MyPrivacy.js';
import { WithParallax } from './WithParallax.js';

import {LatestPostCarousel, PostPage, PostsAsCards} from "./Blog/BlogElements.tsx"

const strings = new MyLocalizedStrings({
    en: {
        privacyPolicy: "Privacy Policy",
        language: "Language",
        flag: "🇬🇧",
        blogPosts: "Blog Posts"
    },
    de: {
        privacyPolicy: "Datenschutzerklärung",
        language: "Sprache",
        flag: "🇩🇪",
        blogPosts: "Beiträge"
    },
})


const router = createHashRouter([
    {
        path: "",
        element: <WithNavbar>
            <LatestPostCarousel library={postLibrary} />
        </WithNavbar>,
    },
    {
        path: "/blog_all",
        element: <WithNavbar>
            {
                getTags().reverse().map((tagKey, index) => {
                    return <PostsWithTagCards tagKey={tagKey} />
                })
            }
        </WithNavbar>,
    },
    {
        path: "/blog",
        element: <WithNavbar>
            {
                <PostsWithTagsByQueryParams />
            }
        </WithNavbar>,
    },
    {
        path: "/privacy",
        element: <WithNavbar>
            <MyPrivacy />
        </WithNavbar>,
    },

    //pages for posts:
].concat(postLibrary.getPosts().map((post, index) => ({
    path: post.getLink(),
    element: <WithNavbar>
        <div className='App'>
            <PostPage post={post} />
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
    <div className='d-flex justify-content-center'>
        <h1 className='blur' style={{ color: tagInfo.color, marginTop:"20px", padding:"5px" }}>{tagInfo.translations.title}</h1>
    </div>
        <p>{tagInfo.translations.description}</p>
        <PostsAsCards posts={postLibrary.getPostsWithTag(Tag[tagKey])} />
        <br></br>
    </>
}

function PostsWithTagsByQueryParams() {

    const [params, setSearchParams] = useSearchParams();
    const tagParam = params.get("tags") ? JSON.parse(params.get("tags").replaceAll("'", "\"")) : []
    const tags = tagParam.map((stringt) => Tag[stringt]);

    //console.log(params)

    return <>
        <Container className='mb-4'>
            <Row className='mb-3'><h1>{strings.blogPosts}</h1></Row>
            <Row className='justify-content-center'>
                {
                    getTags().map((tagString) => <TagBadge tagString={tagString} />)
                }
            </Row>
        </Container>
        <PostsAsCards posts={postLibrary.getPostsWithTags(tags)} />
    </>
}

function TagBadge({ tagString }) {
    const [params, setSearchParams] = useSearchParams();
    const active = params.get("tags") ? JSON.parse(params.get("tags").replaceAll("'", "\"")).includes(tagString) : false
    const tagInfo = getTagInfo(Tag[tagString]);
    return <h2 style={{ width: "fit-content" }}>
        <Badge as={NavLinkLang} to={window.location} pill bg="" style={{
            "backgroundColor": tagInfo.color,
            "boxShadow": active ? "0 0 9px 4px var(--bs-primary)" : "",
            zIndex: 100
        }} onClick={(e) => {
            e.preventDefault()

            //muss über useSearchParams passieren weil sonst nicht mit HashRouter umgehen kann
            setSearchParams(searchParams => {
                //const currentTags = (Array.from(searchParams.entries()).filter((elArr) => elArr[0] == "tags").flat()[1].replaceAll("'", "\"")) //instead of searchParams.get("tags") we have to do this so string stays the same

                var tags = searchParams.get("tags") ? JSON.parse(searchParams.get("tags").replaceAll("'", "\"")) : []
                if (active) {
                    tags.splice(tags.indexOf(tagString), 1)
                }
                else {
                    if (!tags.includes(tagString)) tags.push(tagString)
                }
                searchParams.set("tags", JSON.stringify(tags).replaceAll("\"", "'"));
                return searchParams;
            });

        }}>
            {tagInfo.translations.title}
        </Badge>
    </h2>
}



function WithNavbar({ children }) {
    return <>
        <div className='App'>
            <WithParallax>
                <MyNavbar />
                {children}
                <MyFooter />
            </WithParallax>
        </div>
    </>
}

function MyNavbar() {
    return <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
            <NavLinkLang activeClassName="holladiewaldfee" to="/">
                <Navbar.Brand href="" className='navname' >ejuet</Navbar.Brand>
            </NavLinkLang>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto align-items-center">
                    <Nav.Item>
                        <NavLinkLang to="/">Home</NavLinkLang>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLinkLang to="/blog?tags=['current']" search="hello=4">Blog</NavLinkLang>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLinkLang to="/blog_all">All Posts</NavLinkLang>
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

function MyFooter() { //TODO Footer privacy page too wide
    const scrollbarIsActive = useScrollbarActive()

    const fixAtBottomResp = scrollbarIsActive ? {} : { position: "fixed", bottom: 0 }

    return <Container className='d-flex justify-content-center'> {/* Extra Container is needed to center footer */}
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


