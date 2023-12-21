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

const theRunningBall = [
    {
        published: new Date("2022-08-11"),
        titleImage: "the-running-ball/run.png",
        tags: [Tag.gamedev, Tag.godot, Tag.gdScript],
        translations: MyLocalizedStrings.create({
            en: {
                title: "The Running Ball",
                subtitle: "3D Game with Godot and GDScript",
                content: () => <>
                    <p>
                        After "The Falling Ball" was a massive success (only with my friends but still),
                        it was obvious there needed to be a successor.
                    </p>
                    <h1>The Running Ball</h1>
                    <p>
                        Nach einem Countdown startet das Spiel.
                        Man läuft eine Straße mit verschiedenen Spuren entlang.
                        Diese werden zufällig generiert und brechen manchmal ab.
                        Mithilfe der Pfeiltasten muss man dann die Spur wechseln.
                        Mit der Leertaste kann man über die auf den Spuren auftauchenden roten und gelben Hindernisse springen.
                    </p>
                </>
            }
        }),
    }
]

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

        ...theRunningBall
    ]
);

