import React, { useDeferredValue } from "react";
import LocalizedStrings, { LocalizedStringsMethods } from "react-localization"; import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import { MyLocalizedStrings } from "../Language/MyLocalizedStrings";
import { NavLinkLang } from "../Language/LanguageComponents";

interface BlogTranslations extends LocalizedStringsMethods {
    title: string;
    subtitle: string;
    content: JSX.Element
}

const generalTexts = new MyLocalizedStrings({
    en: {
        readmore: "Read More"
    },
    de: {
        readmore: "Mehr Erfahren"
    }
})

interface PostData {
    translations: BlogTranslations;
    titleImage?: string;
    link?: string;
    published?: Date | undefined;
    projectStart?: Date;
    projectEnd?: Date;
    tags: []
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
        return this.postData.translations.content
    }

    getPage() {
        return <div className="page">
            <div className="posttitle">{this.postData.translations.title}</div>
            <p>{this.postData.translations.subtitle}</p>
            {this.postData.published &&
                <small>Published: {this.postData.published.toLocaleDateString()}</small>
            }
            {this.getContent()}
        </div>

    }

    getCard() {
        return <NavLinkLang to={this.postData.link}>
            <Card>
                <Card.Img src={this.postData.titleImage} style={{ padding: "15px" }} />
                <Card.Body>
                    <Card.Title>{this.postData.translations.title}</Card.Title>
                    <Card.Text>{this.postData.translations.subtitle}</Card.Text>
                    <NavLinkLang to={this.postData.link}><Button>{generalTexts.readmore}</Button></NavLinkLang>
                </Card.Body>
            </Card>
        </NavLinkLang>

    }

    getCarouselItem() {
        return <Carousel.Item key={this.postData.translations.title} interval={3500} style={{ textAlign: "center" }}>
            <NavLinkLang to={this.postData.link}>
                <img src={this.postData.titleImage} style={{ height: "80vh", filter: "brightness(50%)" }} />
            </NavLinkLang>
            <Carousel.Caption>
                <h5>{this.postData.translations.title}</h5>
                <p>{this.postData.translations.subtitle}</p>
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

    getPostsWithTags(tags: string[]) {
        return this.posts.filter((post) => {
            for(var i in tags) {
                if(post.getPostData().tags.includes(tags[i])) {
                    return true;
                }
                return false;
            }
        })
    }

    getPostsWithTag(tag: string) {
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
        return <Carousel className="bg-dark">
            {posts.slice(0, 3).map((post, index) => post.getCarouselItem())}
        </Carousel>
    }
}

//Posts
export const postLibrary = new PostLibrary([
    {
        published: new Date("2023-01-01"),
        titleImage: "logo512.png",
        tags: ["cat 2", "cat 1"],
        translations: new LocalizedStrings({
            en: {
                title: "title",
                subtitle: "sub",
                content: <>
                    <p>This is a great Post.</p>
                    <h1>H1 Header</h1>
                    <h2>Blibliblubb h2 header</h2>
                    <p>irgendein content</p>
                    <p>irgendein content 2</p>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <h3>blubb h3</h3>
                    <h1>H1 Header no 2</h1>
                </>
            }
        }),
    },
    {
        published: new Date("2023-01-01"),
        tags: ["cat 1"],
        translations: new LocalizedStrings({
            en: {
                title: "title 2",
                subtitle: "sub",
                content: <><p>This is a great Post.</p></>
            }
        }),
    },
])


