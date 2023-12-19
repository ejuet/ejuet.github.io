import React from "react";
import { MyLocalizedStrings } from "../Language/MyLocalizedStrings";
import { chatGPTPosts } from "./chatGPTPosts.tsx";
import { Tag } from "./Tags.tsx";
import { examplePosts } from "./examplePosts.tsx";
import { xournalPosts } from "./xournalposts.tsx";
import { gitPosts } from "./gitposts.tsx";
import { PostLibrary } from "./Blog.tsx";

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
    ]
);
