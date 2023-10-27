import React from "react";
import { MyLocalizedStrings } from "../Language/MyLocalizedStrings";
import { PostData } from "./Blog";
import { Tag } from "./Tags";
import { EmbedCode } from "./EmgithubCode";

export const xournalPosts: PostData[] = [
    {
        tags: [Tag.current],
        titleImage:"img/xournal.jpg",
        translations: MyLocalizedStrings.create({
            en: {
                title: "Xournal Plugins for Students",
                subtitle: "Plugins I have written for using Xournal while studying",
                content: function (): JSX.Element {
                    return <>
                        <h1>Xournal</h1>
                        <p>
                            <a href="https://xournalpp.github.io/">Xournal++</a> is a program for handwriting notes, available for PC and mobile.
                            I enjoy using it for annotating PDFs and lecture slides, doing homework that requires writing or maths and
                            taking mock exams. But while doing so, I have found I'm missing some features that I would like to see in Xournal.
                            Luckily, Xournal has an interface for writing plugins in Lua and makes it easy to install and use them.
                            Xournal is also open source, but so far, the plugin interface is sufficient for my purposes.
                        </p>

                        <h1>My Plugins</h1>
                        <p>Here are the Plugins I have written for myself and am still using:</p>

                        <h2>Batch Toggle Grid</h2>
                        <p>
                            Xournal lets you change the background of your PDF, for example to checkered or lined paper.
                            For studying, I am either using the checkered or blank paper. Sometimes I want to switch between these two.
                            However, I have only found a built-in way to change the background of one page at a time instead of all pages of my document.
                            Now, I can do this with my plugin.
                        </p>
                        <EmbedCode repo={"xournal-plugins"} file="/BatchToggleGrid/main.lua" />

                        <h2>Batch Horizontal</h2>
                        <p>
                            The same goes for rotating the page 180 degrees. Sometimes, I need more horizontal space while writing
                            but created a portrait oriented document. If I want to rotate my pages by 90 degrees, I have to do so for each page.
                            Here comes my plugin.
                        </p>
                        <EmbedCode repo={"xournal-plugins"} file="/BatchHorizontal/main.lua" />

                        <h2>Page Progress Plugin</h2>
                        <p>
                            Studying can be a pain in the ass, especially if you have merged all your lecture slides or worksheets for a subject
                            and you're trying to wrestle through a thousand page long document.
                            It's useful to see how far you've come and want to know how much you've progressed in the document.
                            Therefore, I've written a plugin that calculates the percentage of slides you've already scrolled through.
                        </p>
                        <EmbedCode repo={"xournal-plugins"} file="/PrintProgress/main.lua" />

                        <h2>Bookmark Pages</h2>
                        <p>
                            I'm not sure if this is a bug or intended behaviour, but on my device, Xournal does not remember
                            the current page when I close and reopen a document. (This is very annoying in said long documents.)
                            I've written a plugin that lets you bookmark the current page and gives you the option to jump to it,
                            even after reopening the document.
                        </p>
                        <EmbedCode repo={"xournal-plugins"} file="/BookmarkPage/main.lua" />
                    </>
                },
            }
        })
    }
]