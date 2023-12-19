import React from "react";
import { MyLocalizedStrings } from "../Language/MyLocalizedStrings.js";
import { chatGPTPosts } from "./chatGPTPosts.tsx";
import { Tag } from "../Blog/Tags.tsx";
import { examplePosts } from "./examplePosts.tsx";
import { xournalPosts } from "./xournalposts.tsx";
import { gitPosts } from "./gitposts.tsx";
import { PostLibrary } from "../Blog/Blog.tsx";
import { EmbedCode } from "../Blog/EmgithubCode.tsx";
import Gist from "super-react-gist"

//Posts

export const postLibrary = new PostLibrary(
    [
        //example posts i only want to see if im working on the website
        ...(false && window.location.hostname == "localhost" ? examplePosts : []),

        ...chatGPTPosts,

        ...xournalPosts,

        ...gitPosts,

        {
            published: new Date("2023-12-19"),
            tags: [Tag.thisWebsite],
            translations: MyLocalizedStrings.create({
                en: {
                    title: "Parallax Background in React",
                    subtitle: "",
                    content: () => <>
                        <h1>Creating a Parallax Background in React</h1>
                        <h2>Libraries for Parallax</h2>
                        <p>
                            For the first version of this website, I wanted to create a space-themed parallax background.
                            After a quick google search, I found some libraries I would be able to use in react:
                            <ul>
                                <li><a href="https://www.npmjs.com/package/react-parallax">react-parallax</a>,</li>
                                <li><a href="https://www.npmjs.com/package/react-scroll-parallax">react-scroll-parallax</a> and</li>
                                <li><a href="https://www.npmjs.com/package/@react-spring/parallax">parallax from react-spring</a>,</li>
                            </ul>
                            While these are great libraries for creating parallax effects, I found that none of them really suited my purposes:
                            <ul>
                                <li>
                                    I wanted to create a parallax to use as a background, with different layers that move at different speeds to simulate 3D-space.
                                    But it seemed like spring-parallax was better suited for creating parallax effects in banners or for moving objects.
                                </li>
                                <li>
                                    To make the 3d-effect of my background more realistic, I wanted the front layers to have bigger objects than the ones in the back.
                                    Because I also wanted to reuse the same image for all layers, it should be possible to specify the size of the image.
                                    The image would also need to be repeated over the whole page so you can scroll way down to the bottom of the page and still see a background.
                                    Since these things are annoying to to with <code>{"<img />"}</code>-tags, using divs and setting the <code>background-image</code> is better.
                                    As far as my efforts went, that was not possible with the react-scroll-parallax-library.
                                </li>
                                <li>
                                    Therefore, the react-parallax library was best suited for my use case. When I tried to use it, it worked well in itself but caused problems
                                    with my existing website (i could not get multiple parallax-layers to keep the height of a long page, using the table of contents on my blogpost pages stopped working, glitches etc.)
                                    At this point, I was so annoyed I decided to quickly write it myself since it is not difficult at all, actually.
                                </li>
                            </ul>
                            The first well-working version looked like this:
                            <Gist url="https://gist.github.com/ejuet/89066537575d1447069d0c17a0b2e9bb" />
                        </p>

                    </>
                }
            }),
        }
    ]
);
