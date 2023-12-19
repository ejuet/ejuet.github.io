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
        readmore: "Lesen",
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
    tags: Tag[];
    ignoreInDisplays?: boolean;
}

export class Post {

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

    getOneTag() {
        const tags = this.postData.tags.filter((tag) => tag != Tag.current);
        //var tags = this.postData.tags
        if(tags.length <= 0) return null;
        return tags[0];
    }

    getColor() {
        let t: Tag = this.getOneTag();
        if(t != null) {
            return getTagInfo(t).color
        }
        return "var(--bs-primary)";
    }
}

function compareDates(aDate: Date, bDate: Date): 1 | -1 | 0 {

    if(!aDate) return -1;
    if(!bDate) return 1;
    if(aDate < bDate) {
        return -1;
    }
    else if(aDate > bDate) {
        return 1;
    }
    return 0;
};

export class PostLibrary {
    private posts: Post[]
    constructor(postData: PostData[]) {
        var postdatas = postData

        // add tags from tag groups
        postdatas.forEach((dat) => {
            dat.tags.forEach(tag => {
                if(tagGroups.get(tag) != undefined) {
                    dat.tags = dat.tags.concat(tagGroups.get(tag))
                }
            })
        })
        this.posts = postdatas.map((dat, i) => new Post(dat))
    }

    getPosts() {
        this.posts.sort((a, b) => {
            const aData = a.getPostData();
            const bData = b.getPostData();
            var d = compareDates(aData.published, bData.published)
            return d != 0 ? d : aData.translations.title.localeCompare(bData.translations.title)
        }).reverse()
        return this.posts;
    }

    getLatestPosts(descending = true) {
        var ret = Array.from(this.getPosts());
        ret.sort((a, b) => compareDates(a.getPostData().published, b.getPostData().published))

        if(descending) ret.reverse();

        //ignore all posts that should be ignored in latest posts
        ret = ret.filter((post) => !post.getPostData().ignoreInDisplays || post.getPostData().ignoreInDisplays == false);
        return ret;
    }

    getPostsWithTags(tags: Tag[]) {
        return this.getPosts().filter((post) => {
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
}

//Posts
export const postLibrary = new PostLibrary(
    [
        //example posts i only want to see if im working on the website
        ...(false && window.location.hostname == "localhost" ? examplePosts : []),

        ...chatGPTPosts,

        ...xournalPosts,

        ...gitPosts,

        {
            published: new Date("2023-12-18"),
            tags: [Tag.webdev],
            translations: MyLocalizedStrings.create({
                en: {
                    title: "This website",
                    subtitle: "",
                    content: () => <>
                        <p>As Halloween approaches, the air becom </p>

                    </>
                },
                de: {
                    title: "Diese webseite",
                    subtitle: "",
                    content: () => <>
                        <p>Da Halloween näher rückt, füllt sich die Luft m</p>

                    </>
                },
            }),
        }

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
    ]
)


const testcontent = ""
