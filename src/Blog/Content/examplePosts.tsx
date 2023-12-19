import React from "react";
import { MyLocalizedStrings } from "../../Language/MyLocalizedStrings";
import { PostData } from "../Blog";
import { Tag } from "../Tags";

export const examplePosts: PostData[] = [
    //post: title
    {
        published: new Date("2023-10-14"),
        tags: [Tag.chatgptauthor],
        translations: MyLocalizedStrings.create({
            en: {
                title: "example title",
                subtitle: "subtitle of post",
                content: () => <>
                    <p>This is a great Post.</p>
                    <h1>H1 Header</h1>
                    <h2>Blibliblubb h2 header</h2>
                    <p>fdsfds</p>
                    <p>dfsfdsfds</p>
                    <h3>blubb h3</h3>
                    <h1>H1 Header no 2</h1>
                </>
            },
            de: {
                title: "Beispielhafter Titel",
                subtitle: "Untertitel des Posts",
                content: () => <>
                    <p>Das ist ein toller post</p>
                    <h1>H1 Header</h1>
                    <h2>Blibliblubb h2 header</h2>
                    <p>fdsfds</p>
                    <p>dfsfdsfds</p>
                    <h3>blubb h3</h3>
                    <h1>H1 Header no 2</h1>
                </>
            },
        }),
    },

    //my example post
    {
        published: new Date("2023-01-01"),
        titleImage: "logo512.png",
        tags: [Tag.current, Tag.school],
        //ursprünglich new LocalizedStrings(), dann auch typecheck TODO fixen sodass new MyLocalizedStrings geht
        translations: MyLocalizedStrings.create({
            en: {
                title: "title",
                subtitle: "subtitle of post",
                content: () => <>
                    <p>This is a great Post.</p>
                    <h1>H1 Header</h1>
                    <h2>Blibliblubb h2 header</h2>
                    <p>fdsfds</p>
                    <p>dfsfdsfds</p>
                    <h3>blubb h3</h3>
                    <h1>H1 Header no 2</h1>
                </>
            },
            de: {
                title: "Titel",
                subtitle: "Untertitel",
                content: () => <>
                    <p>Das ist ein toller post</p>
                    <h1>H1 Header</h1>
                    <h2>Blibliblubb h2 header</h2>
                    <p>fdsfds</p>
                    <p>dfsfdsfds</p>
                    <h3>blubb h3</h3>
                    <h1>H1 Header no 2</h1>
                </>
            },
        }),
    }
];
