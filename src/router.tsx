import React from 'react';
import { Link, createHashRouter, useSearchParams } from 'react-router-dom';
import { Container, Nav, Navbar, Col, Row, Badge } from 'react-bootstrap';
import { MyLocalizedStrings } from './Language/MyLocalizedStrings.js';
import { LanguageToggle } from "./Language/LanguageComponents.js"
import { NavLinkLang } from './Language/NavLinkLang.js';
import { postLibrary } from "./BlogContent/PostLibrary.tsx";
import { useScrollbarActive } from './useScrollbarActive.js';
import { Tag, getCategories, getTagInfo, getTags, getTagsWithCategory, getTagsWithoutCategory } from './Blog/Tags.tsx';
import { MyPrivacy } from './MyPrivacy.js';
import { StarParallax } from './Parallax/Parallax.tsx';
import { LatestPostCarousel, PostPage, PostsAsCards } from "./Blog/BlogComponents.tsx";
import { PostsWithTagCards } from './Blog/BlogComponents.tsx';

const strings = new MyLocalizedStrings({
    en: {
        privacyPolicy: "Privacy Policy",
        language: "Language",
        flag: "🇬🇧",
        blogPosts: "Blog Posts",
        other: "Other"
    },
    de: {
        privacyPolicy: "Datenschutzerklärung",
        language: "Sprache",
        flag: "🇩🇪",
        blogPosts: "Beiträge",
        other: "Andere"
    },
});
export const router = createHashRouter([
    {
        path: "",
        element: <WithNavbar>
            <LatestPostCarousel library={postLibrary} />
        </WithNavbar>,
    },
    {
        path: "/blog_all",
        element: <WithNavbar>
            {getTags().reverse().map((tagKey, index) => {
                return <PostsWithTagCards key={index} tagKey={tagKey} />;
            })}
        </WithNavbar>,
    },
    {
        path: "/blog",
        element: <WithNavbar>
            {<PostsWithTagsByQueryParams />}
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
function PostsWithTagsByQueryParams() {

    const [params, setSearchParams] = useSearchParams();
    const tagParam = params.get("tags") ? JSON.parse(params.get("tags").replaceAll("'", "\"")) : [];
    const tags = tagParam.map((stringt) => Tag[stringt]);

    //console.log(params)
    return <>
        <Container className='mb-4'>
            {
                //<Row className='mb-3'><h1>{strings.blogPosts}</h1></Row>
                getCategories().map((categorytag) => {
                    const categoryInfo = getTagInfo(Tag[categorytag] as unknown as Tag);
                    return <CategoryTagBadges categoryName={categoryInfo.translations.title} key={categorytag}
                        categoryDescription={categoryInfo.translations.description}
                        tags={getTagsWithCategory(categorytag)} />
                })
            }
            <CategoryTagBadges categoryName={strings.other} categoryDescription="" tags={getTagsWithoutCategory()} />
        </Container>
        <PostsAsCards posts={postLibrary.getPostsWithTags(tags)} />
    </>;
}

function CategoryTagBadges({ categoryName, categoryDescription, tags }) {
    return <>
        <div className='blur-weak d-inline-block p-1'>
            <Row><h2>{categoryName}</h2></Row>
            {
                categoryDescription &&
                <p>{categoryDescription}</p>
            }
        </div>
        <Row className='justify-content-center'>
            {

                tags.map((tag) => {
                    return <TagBadge tagString={tag} key={tag} />
                })
            }
        </Row>
    </>
}

function TagBadge({ tagString }) {
    const [params, setSearchParams] = useSearchParams();
    const active = params.get("tags") ? JSON.parse(params.get("tags").replaceAll("'", "\"")).includes(tagString) : false;
    const tagInfo = getTagInfo(Tag[tagString as keyof typeof Tag]);

    return <TagBadgeElement color={tagInfo.color} active={active} setTag={setTag} title={tagInfo.translations.title} />

    function setTag() {
        setSearchParams(searchParams => {
            //const currentTags = (Array.from(searchParams.entries()).filter((elArr) => elArr[0] == "tags").flat()[1].replaceAll("'", "\"")) //instead of searchParams.get("tags") we have to do this so string stays the same
            var tags = searchParams.get("tags") ? JSON.parse(searchParams.get("tags").replaceAll("'", "\"")) : [];
            if(active) {
                tags.splice(tags.indexOf(tagString), 1);
            }
            else {
                if(!tags.includes(tagString)) tags.push(tagString);
                if(Tag[tagString as unknown as keyof Tag] != Tag.all) {
                    tags = tags.filter((tag) => Tag[tag as unknown as keyof Tag] != Tag.all)
                }
                else{
                    tags = tags.filter((tag) => Tag[tag as unknown as keyof Tag] == Tag.all)
                }

            }
            searchParams.set("tags", JSON.stringify(tags).replaceAll("\"", "'"));
            return searchParams;
        });
    }
}

function TagBadgeElement({ color, active, setTag, title }: { color: string; active: any; setTag: () => void; title: string; }) {
    return <h2 style={{ width: "fit-content" }}>
        <Badge as={Link} to={""} pill bg="" style={{
            "backgroundColor": color,
            "boxShadow": active ? "0 0 9px 4px var(--bs-primary)" : "",
            zIndex: 100
        }} onClick={(e) => {
            e.preventDefault();

            //muss über useSearchParams passieren weil sonst nicht mit HashRouter umgehen kann
            setTag();

        }}>
            {title}
        </Badge>
    </h2>;
}

function WithNavbar({ children }) {
    return <>
        <div className='App'>
            <StarParallax>
                <MyNavbar />
                {children}
                <MyFooter />
            </StarParallax>
        </div>
    </>;
}

function MyNavbar() {
    return <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
            <NavLinkLang to="/">
                <Navbar.Brand href="" className='navname'>ejuet</Navbar.Brand>
            </NavLinkLang>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto align-items-center">
                    <Nav.Item>
                        <NavLinkLang to="/">Home</NavLinkLang>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLinkLang to="/blog?tags=['all']" search="hello=4">Blog</NavLinkLang>
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
    </Navbar>;
}

function MyFooter() {
    const scrollbarIsActive = useScrollbarActive();

    return <Container className='d-flex justify-content-center'> {/* Extra Container is needed to center footer */}
        <Container fluid="xxl" style={{
            position: scrollbarIsActive ? "initial" : "fixed",
            bottom: scrollbarIsActive ? "initial" : "0",
            marginTop: 5,
            zIndex: 0
        }} className="footer navbar-static-bottom bg-tertiary border-top">
            <Row className='p-3'>
                <Col xs={12} md={6}>
                    <p className='m-0'>© ejuet 2023</p>
                </Col>
                <Col xs={12} md={6} className='justify-content-end d-flex'>
                    <NavLinkLang to="/privacy">{strings.privacyPolicy}</NavLinkLang>
                </Col>
            </Row>
        </Container>
    </Container>;
}
