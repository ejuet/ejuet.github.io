import React from "react";
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
}

class Post {

    private postData: PostData;

    constructor(
        data: PostData
    ) {
        this.postData = data;
        this.postData.link = this.postData.link || "/"+this.postData.translations.getString("title", "en").replaceAll(" ", "-").replaceAll("/","-");
        this.postData.titleImage = this.postData.titleImage || "robot.jpg";
    }

    getLink() {
        return this.postData.link;
    }

    getContent() {
        return this.postData.translations.content
    }

    getPage() {
        return <>
            <h1>{this.postData.translations.title}</h1>
            {this.postData.published &&
                <small>Published: {this.postData.published.toLocaleDateString()}</small>
            }
            {this.getContent()}
        </>

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
        return <Carousel.Item key={this.postData.translations.title} interval={3500} style={{textAlign:"center"}}>
            <NavLinkLang to={this.postData.link}>
                <img src={this.postData.titleImage} style={{height:"80vh", filter:"brightness(50%)"}}/>
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

    getPostsAsCards() {
        return <Container>
            <Row xs={2} md={4}>
                {
                    this.posts.map((item, i) => <Row key={i} className="m-2">
                        {item.getCard()}
                    </Row>
                    )
                }
            </Row>
        </Container>
    }

    getLatestPostCarousel() {
        return <Carousel className="bg-dark">
            {this.posts.slice(0, 3).map((post, index) => post.getCarouselItem())}
        </Carousel>
    }
}

//Posts
export const postLibrary = new PostLibrary([
    {
        published: new Date("2023-01-01"),
        titleImage: "logo512.png",
        translations: new LocalizedStrings({
            en: {
                title: "title",
                subtitle: "sub",
                content: <><p>This is a great Post.</p></>
            }
        }),
    },
    {
        published: new Date("2023-01-01"),
        translations: new LocalizedStrings({
            en: {
                title: "title 2",
                subtitle: "sub",
                content: <><p>This is a great Post.</p></>
            }
        }),
    },
])
