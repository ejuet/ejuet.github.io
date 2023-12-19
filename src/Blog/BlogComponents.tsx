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
import { MyLocalizedStrings } from "../Language/MyLocalizedStrings.js";
import { NavLinkLang } from "../Language/LanguageComponents.js";
import { Utterances } from "utterances-react-component";
import { CommentSection } from "./CommentSection.tsx";
import { TableOfContents } from "../TableOfContents/TableOfContents.tsx";
import { useLocation, useSearchParams } from "react-router-dom";
import { getPathToTag } from '../router.tsx';
import { chatGPTPosts } from "../BlogContent/chatGPTPosts.tsx";
import { getTagInfo, tagGroups } from "./Tags.tsx";
import { Tag } from "./Tags.tsx";
import { examplePosts } from "../BlogContent/examplePosts.tsx";
import { xournalPosts } from "../BlogContent/xournalposts.tsx";
import { gitPosts } from "../BlogContent/gitposts.tsx";
import { Parallax } from 'react-parallax';
import { Post, PostData, PostLibrary, generalTexts } from "./Blog.tsx";
import { postLibrary } from "../BlogContent/PostLibrary.tsx";

export function PostsAsCards({ posts }: { posts: Post[] }) {
    return <Container>
        <Row xs={1} sm={2} md={3} xl={4} className="justify-content-center">
            {
                posts.map((item, i) => <Row key={i}>
                    <PostCard postData={item.getPostData()} />
                </Row>
                )
            }
        </Row>
    </Container>
}

export function LatestPostCarousel({ library }: { library: PostLibrary }) {
    return <Carousel className="bg-light">
        {
            library.getPosts().slice(0, 10).map((post, index) => {
                var postData = post.getPostData()
                return <Carousel.Item key={postData.translations.title} interval={3500} style={{ textAlign: "center" }}>
                    <NavLinkLang to={postData.link}>
                        <div style={{
                            backgroundImage: "url(" + postData.titleImage + ")", backgroundRepeat: "no-repeat",
                            backgroundSize: "cover", filter: "brightness(50%)",
                            height: "80vh", width: "100%"
                        }} />
                    </NavLinkLang>
                    <Carousel.Caption>
                        <h5>{postData.translations.title}</h5>
                        <p>{postData.translations.subtitle}</p>
                        <TagRow center={true} postData={postData} />
                    </Carousel.Caption>
                </Carousel.Item>
            })
        }
    </Carousel>
}

function TagRow({ center, postData }: { center: boolean, postData: PostData }) {
    return <Container className="m-1">
        <Row className={center ? "justify-content-center" : ""}>
            {postData.tags.map((tag, index) => <Col key={index} className="col-md-auto p-0">
                <NavLinkLang to={getPathToTag(Tag[tag])}>
                    <Badge bg="" pill style={{ backgroundColor: getTagInfo(tag).color, marginRight: "3px" }}>
                        {getTagInfo(tag).translations.title}
                    </Badge>

                </NavLinkLang>

            </Col>)}
        </Row>
    </Container>;
}

function PostCard({ postData }: { postData: PostData }) {
    return <NavLinkLang to={postData.link}>
        <Card className="mb-4">
            <Card.Img src={postData.titleImage} style={{ padding: "15px", borderRadius: "20px" }} />
            <Card.Body>
                <Card.Title>{postData.translations.title}</Card.Title>
                {postData.published &&
                    <small>{generalTexts.published}: {postData.published.toLocaleDateString()}</small>
                }
                <TagRow center={true} postData={postData} />

                <Card.Text>{postData.translations.subtitle}</Card.Text>

                <NavLinkLang to={postData.link}><Button>{generalTexts.readmore}</Button></NavLinkLang>
            </Card.Body>
        </Card>
    </NavLinkLang>
}

export function PostPage({ post }: { post: Post }) {
    const postData = post.getPostData();
    return <>
        <div className="text-light" style={{
            backgroundColor: post.getColor(),
            backgroundImage: 'url(' + require('./img/snow2.apng') + ')',
            backgroundSize: "contain"
        }}>
            <div style={{ fontSize: 60 }}>
                {postData.translations.title}
            </div>
            <p>{postData.translations.subtitle}</p>
        </div>
        <div className="page">
            <Container fluid="xxl">
                <Row className="p-0">
                    <Col xs={12} lg={8} className="d-flex justify-content-center">
                        <div className="page-content">
                            <img style={{ maxHeight: "50vh", maxWidth: "100%" }} src={postData.titleImage} />
                            <TagRow center={true} postData={postData} />
                            {postData.published &&
                                <small>{generalTexts.published}: {postData.published.toLocaleDateString()}</small>
                            }
                            <div>
                                {post.getContent()}
                            </div>
                            <h1>{generalTexts.comments}</h1>
                            {generalTexts.pleasecomment}
                            <CommentSection issueTerm={post.getLink()} />

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
export function PostsWithTagCards({ tagKey }) {
    var tagInfo = getTagInfo(Tag[tagKey as keyof typeof Tag]);
    return <>
        <div className='d-flex justify-content-center'>
            <h1 className='blur' style={{ color: tagInfo.color, marginTop: "20px", padding: "5px" }}>{tagInfo.translations.title}</h1>
        </div>
        <p>{tagInfo.translations.description}</p>
        <PostsAsCards posts={postLibrary.getPostsWithTag(Tag[tagKey as keyof typeof Tag])} />
        <br></br>
    </>;
}
