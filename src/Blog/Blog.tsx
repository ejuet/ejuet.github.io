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

interface PostData{
    translations: BlogTranslations;
    link?: string;
    published?: Date | undefined;
    projectStart?: Date;
    projectEnd?: Date;
}

class Post {

    private postData : PostData;
    private link:string;

    constructor(
        data:PostData
    ) {
        this.postData=data;
        this.link = data.link? data.link : data.translations.getString("title", "en");
    }

    getLink() {
        return this.link;
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
        return <NavLinkLang to={this.link}>
            <Card>
                <Card.Img src="robot.jpg" style={{ padding: "15px" }} />
                <Card.Body>
                    <Card.Title>{this.postData.translations.title}</Card.Title>
                    <Card.Text>{this.postData.translations.subtitle}</Card.Text>
                    <NavLinkLang to={this.link}><Button>{generalTexts.readmore}</Button></NavLinkLang>
                </Card.Body>
            </Card>
        </NavLinkLang>

    }
}

class PostLibrary {
    private posts: Post[]
    constructor(postData: PostData[]) {
        this.posts = postData.map((dat, i)=>new Post(dat))
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
    {
        translations: new LocalizedStrings({
            en: {
                title: "title",
                subtitle: "sub",
                content: <><p>This is a great Post.</p></>
            }
        }),
        published: new Date("2023-01-01")
    }
])
