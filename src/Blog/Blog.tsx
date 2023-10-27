import React, { useDeferredValue } from "react";
import LocalizedStrings, { LocalizedStringsMethods } from "react-localization"; import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import { MyLocalizedStrings } from "../Language/MyLocalizedStrings";
import { NavLinkLang } from "../Language/LanguageComponents";
import { Utterances } from "utterances-react-component";
import { CommentSection } from "./CommentSection.tsx";
import { TableOfContents } from "../TableOfContents/TableOfContents.tsx";
import { useLocation, useSearchParams } from "react-router-dom";
import { getPathToTag } from "..";
import { chatGPTPosts } from "./chatGPTPosts.tsx";
import { getTagInfo } from "./Tags.tsx";
import { Tag } from "./Tags.tsx";
import { examplePosts } from "./examplePosts.tsx";
import { xournalPosts } from "./xournalposts.tsx";

interface BlogTranslations extends LocalizedStringsMethods {
    title: string;
    subtitle: string;
    content: () => JSX.Element
}

export const generalTexts = new MyLocalizedStrings({
    en: {
        readmore: "Read More",
        comments: "Comments",
        pleasecomment: "Feel free to leave your opinion or questions in the comment section below.",
        commentcookie: "By clicking on 'Sign in with Github', a login cookie is created.",
        published: "Published"
    },
    de: {
        readmore: "Mehr Erfahren",
        comments: "Kommentare",
        pleasecomment: "Noch Fragen?",
        commentcookie: "Durch das Anmelden mit Github wird ein Login-Cookie erstellt und gespeichert.",
        published: "Veröffentlicht"
    }
})

export interface PostData {
    translations: BlogTranslations;
    titleImage?: string;
    link?: string;
    published?: Date | undefined;
    projectStart?: Date;
    projectEnd?: Date;
    tags: Tag[]
}

class Post {

    private postData: PostData;

    constructor(
        data: PostData
    ) {
        this.postData = data;
        this.postData.link = this.postData.link || "/" + this.postData.translations.getString("title", "en").replaceAll(" ", "-").replaceAll("/", "-");
        this.postData.titleImage = this.postData.titleImage || "robot.jpg";
    }

    getPostData() {
        return this.postData;
    }

    getLink() {
        return this.postData.link;
    }

    getContent() {
        return this.postData.translations.content()
    }

    getPage() { //TODO fix text being wider than window on resize => sth wrong with columns?
        return <>
            <div className="text-light bg-primary">
                <div style={{ fontSize: 60 }}>
                    {this.postData.translations.title}
                </div>
                <p>{this.postData.translations.subtitle}</p>
            </div>
            <div className="page">
                <Container fluid="xxl">
                    <Row className="p-0">
                        <Col xs={12} lg={8} className="d-flex justify-content-center">
                            <div className="page-content">
                                <img style={{ maxHeight: "50vh", maxWidth: "100%" }} src={this.getPostData().titleImage} />
                                {this.TagRow(true)}
                                {this.postData.published &&
                                    <small>{generalTexts.published}: {this.postData.published.toLocaleDateString()}</small>
                                }
                                <p>
                                    fdsfdsf fjdskfjds soaif ds,jiods
                                    fdsfdsf fjdskfjds soaif ds,jiods
                                    fdsfdsf fjdskfjds soaif ds,jiods
                                    fdsfdsf fjdskfjds soaif ds,jiods
                                    fdsfdsf fjdskfjds soaif ds,jiods
                                    fdsfdsf fjdskfjds soaif ds,jiods
                                    fdsfdsf fjdskfjds soaif ds,jiods
                                    fdsfdsf fjdskfjds soaif ds,jiods
                                    fdsfdsf fjdskfjds soaif ds,jiods
                                    fdsfdsf fjdskfjds soaif ds,jiods
                                    fdsfdsf fjdskfjds soaif ds,jiods
                                </p>
                                <div className="page-content">
                                    {this.getContent()}
                                </div>
                                <h1>{generalTexts.comments}</h1>
                                {generalTexts.pleasecomment}
                                <CommentSection issueTerm={this.getLink()} />

                            </div>
                        </Col>
                        <Col lg={{ span: 3, order: 'last' }} sm={{ order: 'first' }} xs={{ order: 'first' }}>
                            <TableOfContents />
                        </Col>
                    </Row>
                </Container>

            </div>

        </>

    }

    getCard() {
        return <NavLinkLang to={this.postData.link}>
            <Card>
                <Card.Img src={this.postData.titleImage} style={{ padding: "15px", borderRadius: "20px" }} />
                <Card.Body>
                    <Card.Title>{this.postData.translations.title}</Card.Title>
                    {this.TagRow()}

                    <Card.Text>{this.postData.translations.subtitle}</Card.Text>

                    <NavLinkLang to={this.postData.link}><Button>{generalTexts.readmore}</Button></NavLinkLang>
                </Card.Body>
            </Card>
        </NavLinkLang>

    }

    private TagRow(center: boolean = false) {
        return <Container>
            <Row className={center ? "justify-content-center" : ""}>
                {this.postData.tags.map((tag) => <Col className="col-md-auto p-0">
                    <NavLinkLang to={getPathToTag(Tag[tag])}>
                        <Badge bg="" pill style={{ backgroundColor: getTagInfo(tag).color, marginRight: "3px" }}>
                            {getTagInfo(tag).translations.title}
                        </Badge>

                    </NavLinkLang>

                </Col>)}
            </Row>
        </Container>;
    }

    getCarouselItem() {
        return <Carousel.Item key={this.postData.translations.title} interval={3500} style={{ textAlign: "center" }}>
            <NavLinkLang to={this.postData.link}>
                <div style={{
                    backgroundImage: "url(" + this.getPostData().titleImage + ")", backgroundRepeat: "no-repeat",
                    backgroundSize: "cover", filter: "brightness(50%)",
                    height: "80vh", width: "100%"
                }} />
            </NavLinkLang>
            <Carousel.Caption>
                <h5>{this.postData.translations.title}</h5>
                <p>{this.postData.translations.subtitle}</p>
                {this.TagRow(true)}
            </Carousel.Caption>
        </Carousel.Item>;
    }
}

class PostLibrary {
    private posts: Post[]
    constructor(postData: PostData[]) {
        this.posts = postData.map((dat, i) => new Post(dat))
    }

    getPosts() {
        return this.posts;
    }

    getLatestPosts(descending = true) {
        var ret = Array.from(this.getPosts());
        ret.sort((a, b) => {
            const aDate = a.getPostData().published;
            const bDate = b.getPostData().published;

            if(!aDate) return -1;
            if(!bDate) return 1;
            if(aDate < bDate) {
                return -1;
            }
            else if(aDate > bDate) {
                return 1;
            }
            return 0;
        })
        if(descending) ret.reverse();
        return ret;
    }

    getPostsWithTags(tags: Tag[]) {
        return this.posts.filter((post) => {
            for(var i in tags) {
                if(post.getPostData().tags.includes(tags[i])) {
                    return true;
                }
            }
            return false;
        })
    }

    getPostsWithTag(tag: Tag) {
        return this.getPostsWithTags([tag])
    }

    getAllTags() {
        const tags = this.posts.map((post) => post.getPostData().tags).flat();
        console.log(tags);
    }

    getPostsAsCards(posts?: Post[]) {
        if(!posts) { posts = this.posts }
        return <Container>
            <Row xs={2} md={4}>
                {
                    posts.map((item, i) => <Row key={i}>
                        {item.getCard()}
                    </Row>
                    )
                }
            </Row>
        </Container>
    }

    getLatestPostCarousel(posts?: Post[]) {
        if(!posts) { posts = this.posts }
        return <Carousel className="bg-light">
            {posts.slice(0, 3).map((post, index) => post.getCarouselItem())}
        </Carousel>
    }
}


//Posts
export const postLibrary = new PostLibrary([
    //example posts i only want to see if im working on the website
    ...(window.location.hostname == "localhost" ? examplePosts : []),

    ...chatGPTPosts,

    ...xournalPosts

    /*
    //post: wordpress
    {
        published: new Date("2023-10-14"),
        tags: [Tag.chatgptauthor],
        translations: MyLocalizedStrings.create({
            en: {
                title: "example title",
                subtitle: "subtitle of post",
                content: () => <>
                    
                </>
            },
        }),
    },
    */
])


const testcontent = ""
