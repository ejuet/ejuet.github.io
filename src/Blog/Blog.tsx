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
import { TableOfContents } from "../TableOfContents/TableOfContents.tsx";

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
        published:"Veröffentlicht"
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
        return <>
            <TableOfContents />
            <div className="posttitle">{this.postData.translations.title}</div>
            <div className="d-flex justify-content-start">
                <div className="page" style={{ width: "73vw" }}>
                    <p>{this.postData.translations.subtitle}</p>
                    {this.TagRow(true)}
                    {this.postData.published &&
                        <small>{generalTexts.published}: {this.postData.published.toLocaleDateString()}</small>
                    }
                    <div className="page-content">
                        {this.getContent()}
                    </div>
                    <h1>{generalTexts.comments}</h1>
                    {generalTexts.pleasecomment}
                    <CommentSection issueTerm={this.getLink()} />
                </div>
            </div>

        </>

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

    private TagRow(center: boolean = false) {
        return <Container>
            <Row className={center ? "justify-content-center" : ""}>
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

function getTagInfo(tag: Tag): TagInfo {
    switch(tag) {
        case Tag.current:
            return {
                color: "var(--bs-primary)",
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
                color: "lightgray",
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
        published: new Date("2023-10-14"),
        tags: [Tag.current],
        translations: MyLocalizedStrings.create({
            en: {
                title: "title 2",
                subtitle: "sub",
                content: () => <><p>This is a great Post.</p></>
            },
            de: {
                title: "Das Geheimnis der Glühwürmchen",
                subtitle: "Biolumineszenz in der Tierwelt",
                content: () => <>
                    <header>
                        <h1>Das Geheimnis der Glühwürmchen: Biolumineszenz in der Tierwelt</h1>
                        <p>Von [Dein Name] - Veröffentlicht am 14. Oktober 2023</p>
                    </header>

                    <article>
                        <h2>Einleitung</h2>
                        <p>Biolumineszenz ist ein faszinierendes Phänomen in der Tierwelt, das uns seit jeher in Staunen versetzt hat. Die Möglichkeit von Lebewesen, Licht aus sich selbst heraus zu erzeugen, ist in der Tat ungewöhnlich. In diesem Blogpost werden wir das Geheimnis der Glühwürmchen und anderer biolumineszenter Organismen erkunden.</p>

                        <h2>Was ist Biolumineszenz?</h2>
                        <p>Biolumineszenz ist die Fähigkeit von Lebewesen, Licht mithilfe biochemischer Reaktionen zu erzeugen. Dieses erzeugte Licht kann in verschiedenen Farben und Intensitäten auftreten und dient verschiedenen Zwecken, darunter Fortpflanzung, Tarnung, Jagd und Kommunikation.</p>

                        <h2>Glühwürmchen: Meister der Biolumineszenz</h2>
                        <p>Glühwürmchen sind wohl die bekanntesten biolumineszenten Organismen. Diese kleinen Käfer sind in der Lage, Licht in ihren Bauchregionen zu erzeugen, um potenzielle Partner anzulocken. Während die genauen Mechanismen komplex sind, involvieren sie ein Enzym namens Luciferase, das mit Luciferin reagiert, um Licht zu erzeugen.</p>

                        <h2>Andere biolumineszente Tiere</h2>
                        <p>Glühwürmchen sind jedoch nicht die einzigen Tiere, die diese erstaunliche Fähigkeit besitzen. In der Tat gibt es eine Vielzahl von biolumineszenten Organismen im Tierreich, darunter Tiefseeorganismen, die in völliger Dunkelheit leben und ihr Licht verwenden, um Beute anzulocken oder Feinde abzuschrecken. Tiefseefische wie der Anglerfisch sind ein gutes Beispiel dafür. Sie tragen eine leuchtende Angel, die Beute anlockt.</p>

                        <h2>Biolumineszenz in der Wissenschaft</h2>
                        <p>Biolumineszenz spielt auch eine wichtige Rolle in der wissenschaftlichen Forschung. Wissenschaftler haben Luciferase-Enzyme aus biolumineszenten Organismen isoliert und nutzen sie in der Molekularbiologie, um genetische Aktivitäten zu untersuchen. Dies hat dazu beigetragen, die Entwicklungen in den Bereichen Genexpression und medizinische Diagnostik voranzutreiben.</p>

                        <h2>Die Evolution der Biolumineszenz</h2>
                        <p>Die Entstehung von Biolumineszenz in der Tierwelt ist ein faszinierendes evolutionäres Rätsel. Forscher glauben, dass es sich mehrmals unabhängig in verschiedenen Organismengruppen entwickelt hat. Dies deutet darauf hin, dass die Vorteile der Biolumineszenz in verschiedenen Umgebungen und Lebensstilen offensichtlich sind. Die genauen Gründe, warum es so weit verbreitet ist, sind jedoch immer noch Gegenstand intensiver Forschung.</p>

                        <h2>Schlussfolgerung</h2>
                        <p>Biolumineszenz ist zweifellos ein faszinierendes Phänomen in der Tierwelt. Von den romantischen Glühwürmchen in lauen Sommernächten bis hin zu den geheimnisvollen Leuchten der Tiefsee, sie fasziniert und inspiriert uns. Die Erforschung dieser erstaunlichen Fähigkeit hat nicht nur unser Verständnis der Natur vertieft, sondern auch zu wichtigen Fortschritten in der Wissenschaft geführt.</p>

                        <footer>
                            <p>© 2023 [Dein Name]. Alle Rechte vorbehalten.</p>
                        </footer>
                    </article>
                </>
            }
        }),
    },
])


