import React from "react";
import LocalizedStrings, { LocalizedStringsMethods } from "react-localization"; import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
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

class Post {
    public translations: BlogTranslations;
    private link: string

    constructor(translations: BlogTranslations) {
        this.translations = translations;
        this.link = translations.getString("title", "en");
    }

    getLink() {
        return this.link;
    }

    getContent() {
        return this.translations.content
    }

    getPage() {
        return <>
            <h1>{this.translations.title}</h1>
            {this.getContent()}
        </>

    }

    getCard() {
        return <NavLinkLang to={this.link}>
            <Card>
                <Card.Img src="robot.jpg" style={{padding:"15px"}} />
                <Card.Body>
                    <Card.Title>{this.translations.title}</Card.Title>
                    <Card.Text>{this.translations.subtitle}</Card.Text>
                    <NavLinkLang to={this.link}><Button>{generalTexts.readmore}</Button></NavLinkLang>
                </Card.Body>
            </Card>
        </NavLinkLang>

    }
}

class PostLibrary {
    private posts: Post[]
    constructor(posts: Post[]) {
        this.posts = posts
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
}

//Posts

export const postLibrary = new PostLibrary([
    new Post(new LocalizedStrings({
        en: {
            title: "title",
            subtitle: "sub",
            content: <><p>This is a great Post.</p></>
        }
    })),
    new Post(new LocalizedStrings({
        en: {
            title: "waaaa",
            subtitle: "sub",
            content: <p>Great Content</p>
        }
    })),
])

