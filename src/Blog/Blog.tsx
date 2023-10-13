import React, { useDeferredValue } from "react";
import LocalizedStrings, { LocalizedStringsMethods } from "react-localization"; import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
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
        commentcookie: "By clicking on 'Sign in with Github', a login cookie is created."
    },
    de: {
        readmore: "Mehr Erfahren",
        comments: "Kommentare",
        pleasecomment: "Noch Fragen?",
        commentcookie:"Durch das Anmelden mit Github wird ein Login-Cookie erstellt und gespeichert."
    }
})

interface PostData {
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

    getPage() {
        return <div className="page">
            <div className="posttitle">{this.postData.translations.title}</div>
            <p>{this.postData.translations.subtitle}</p>
            {this.postData.published &&
                <small>Published: {this.postData.published.toLocaleDateString()}</small>
            }
            {this.getContent()}
            <h1>{generalTexts.comments}</h1>
            {generalTexts.pleasecomment}
            <CommentSection issueTerm={this.getLink()}/>
            <div></div>
        </div>

    }

    getCard() {
        return <NavLinkLang to={this.postData.link}>
            <Card>
                <Card.Img src={this.postData.titleImage} style={{ padding: "15px" }} />
                <Card.Body>
                    <Card.Title>{this.postData.translations.title}</Card.Title>
                    {this.TagRow()}

                    <Card.Text>{this.postData.translations.subtitle}</Card.Text>

                    <NavLinkLang to={this.postData.link}><Button>{generalTexts.readmore}</Button></NavLinkLang>
                </Card.Body>
            </Card>
        </NavLinkLang>

    }

    private TagRow(center:boolean=false) {
        return <Container>
            <Row className={center?"justify-content-center":""}>
                {this.postData.tags.map((tag) => <Col className="col-md-auto p-0">
                    <Badge bg="" pill style={{ backgroundColor: getTagInfo(tag).color, marginRight: "3px" }}>
                        {getTagInfo(tag).translations.title}
                    </Badge>
                </Col>)}
            </Row>
        </Container>;
    }

    getCarouselItem() {
        return <Carousel.Item key={this.postData.translations.title} interval={3500} style={{ textAlign: "center" }}>
            <NavLinkLang to={this.postData.link}>
                <img src={this.postData.titleImage} style={{ height: "80vh", filter: "brightness(50%)" }} />
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

    getPostsWithTags(tags: Tag[]) {
        return this.posts.filter((post) => {
            for(var i in tags) {
                if(post.getPostData().tags.includes(tags[i])) {
                    return true;
                }
                return false;
            }
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
        return <Carousel className="bg-dark">
            {posts.slice(0, 3).map((post, index) => post.getCarouselItem())}
        </Carousel>
    }
}

//Tags Logic

export enum Tag {
    current,
    school,
}

interface TagInfo {
    color: string;
    translations: TagTranslations;
}

interface TagTranslations extends LocalizedStringsMethods {
    title: string;
    description: string;
}

//Tags

function getTagInfo(tag:Tag) : TagInfo{
    switch(tag){
        case Tag.current:
            return {
                color:"var(--bs-primary)",
                translations: MyLocalizedStrings.create({
                    en: {
                        title: "Current",
                        description: "Current Projects",
                    },
                    de: {
                        title: "Aktuell",
                        description: "Aktuelle Projekte",
                    }
                })
            }
        case Tag.school:
            return {
                color:"lightgray",
                translations: MyLocalizedStrings.create({
                    en: {
                        title: "School",
                        description: "Current Projects",
                    },
                    de: {
                        title: "Schule",
                        description: "Aktuelle Projekte",
                    }
                })
            }
        }
}

//Posts
export const postLibrary = new PostLibrary([
    {
        published: new Date("2023-01-01"),
        titleImage: "logo512.png",
        tags: [Tag.current, Tag.school],
        translations: MyLocalizedStrings.create({ //ursprünglich new LocalizedStrings(), dann auch typecheck TODO fixen sodass new MyLocalizedStrings geht
            en: {
                title: "title",
                subtitle: "sub",
                content: () => <>
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
        tags: [Tag.current],
        translations: MyLocalizedStrings.create({
            en: {
                title: "title 2",
                subtitle: "sub",
                content: () => <><p>This is a great Post.</p></>
            },
            de: {
                title: "aha",
                subtitle: "sub",
                content: () => <><p>Toller Post.</p></>
            }
        }),
    },
])


