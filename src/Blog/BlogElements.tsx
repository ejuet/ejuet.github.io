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
import { getTagInfo, tagGroups } from "./Tags.tsx";
import { Tag } from "./Tags.tsx";
import { examplePosts } from "./examplePosts.tsx";
import { xournalPosts } from "./xournalposts.tsx";
import { gitPosts } from "./gitposts.tsx";
import { Parallax } from 'react-parallax';
import { Post } from "./Blog.tsx";

export function PostsAsCards({ posts }: { posts:Post[] }) {
    return <Container>
        <Row xs={1} sm={2} md={3} xl={4} className="justify-content-center">
            {
                posts.map((item, i) => <Row key={i}>
                    {item.getCard()}
                </Row>
                )
            }
        </Row>
    </Container>
}