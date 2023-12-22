import { chatGPTPosts } from "./chatGPTPosts.tsx";
import { examplePosts } from "./examplePosts.tsx";
import { xournalPosts } from "./xournalposts.tsx";
import { gitPosts } from "./gitposts.tsx";
import { PostData, PostLibrary } from "../Blog/Blog.tsx";
import { thiswebsite } from "./thiswebsite.tsx";
import { oldUnityPosts } from "./oldUnityPosts.tsx";
import React from "react";
import { Tag } from "../Blog/Tags.tsx";
import { MyLocalizedStrings } from "../Language/MyLocalizedStrings.js";
import Gist from "super-react-gist"
import { rustCalculator } from "./rustCalculator.tsx";
import { abrechnungsApp } from "./abrechnungsApp.tsx";
import { theRunningBall } from "./theRunningBall.tsx";
import { printYourCalendar } from "./printYourCalendar.tsx";
import { robot } from "./robot.tsx";
import { drone } from "./drone.tsx";

//Posts

const examplePost: PostData = {
    published: new Date("2023-01-01"),
    titleImage: "logo512.png",
    tags: [Tag.school],
    translations: MyLocalizedStrings.create({
        en: {
            title: "title",
            subtitle: "subtitle of post",
            content: () => <>
                <p></p>
                <h1></h1>
                <Gist url="https://gist.github.com/ejuet/e2f4c58205dbe48e069eb7cb6b1c0d97" />
            </>
        }
    }),
}

export const postLibrary = new PostLibrary(
    [
        //example posts i only want to see if im working on the website
        ...(false && window.location.hostname == "localhost" ? examplePosts : []),

        ...(false ? chatGPTPosts : []),

        ...xournalPosts,

        ...gitPosts,
        ...thiswebsite,

        ...oldUnityPosts,

        ...rustCalculator,

        ...abrechnungsApp,

        ...theRunningBall,

        ...printYourCalendar,

        ...robot,

        ...drone,
    ]
);

