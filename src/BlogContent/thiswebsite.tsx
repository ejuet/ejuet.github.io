import React from "react";
import { MyLocalizedStrings } from "../Language/MyLocalizedStrings.js";
import { Tag } from "../Blog/Tags.tsx";
import Gist from "super-react-gist";

export const thiswebsite = [
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
                    </p>
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
                    <h2>Parallax Code</h2>
                    The first well-working version looked like this:
                    <Gist url="https://gist.github.com/ejuet/89066537575d1447069d0c17a0b2e9bb" />

                    The current version looks like this:
                    {
                        //TODO link zu repo einfügen
                    }
                </>
            }
        }),
    },
    {
        published: new Date("2023-12-19"),
        tags: [Tag.thisWebsite],
        translations: MyLocalizedStrings.create({
            en: {
                title: "Localization in React",
                subtitle: "",
                content: () => <>
                    <h1>Localization in React</h1>
                    <p>
                        For this website, I wanted to provide its content
                        not only in German but also in English. Since I also
                        publish blogposts like this one here and will continue to do so,
                        it should not be complicated to add or change translations
                        and I would have to use them throughout the whole website,
                        not just the blogposts.
                    </p>
                    <h2>react-localization</h2>
                    <p>
                        <a href="https://www.npmjs.com/package/react-localization">react-localization </a>
                        is a library that does exactly that. Here is a quick example on how it works:
                    </p>
                    <Gist url={"https://gist.github.com/ejuet/21aa64bb3181cc65452cff1631b70033"} />
                    <h2>Switching Languages</h2>
                    <p>
                        By default, it uses the browsers language. To make switching languages possible
                        for visitors of my website, I extended this system so that the current language
                        can be specified in a query parameter. Visitors can change the current language
                        by using a dropdown menu that changes this query parameter. Therefore, every
                        <code>LocalizedStrings</code>-Objects needs to use the language specified by
                        the query-parameter.
                    </p>
                    <p>
                        Changing the language with <code>react-localization</code> is done for
                        each <code>LocalizedStrings</code>-Object individually. So I extended
                        the class <code>LocalizedStrings</code>:
                    </p>
                    {
                        //TODO embed full file MyLocalizedStrings.js
                    }
                    <p>
                        This worked well. But when clicking links that lead to other
                        pages on my website, the <code>lang</code> parameter disappeared.
                        Query Parameters are not propagated. Therefore, I created a React Component
                        to use as a Link that would redirect the visitor to the next page while
                        keeping the <code>lang</code> parameter:
                    </p>
                    {
                        //TODO embed navlinklang file
                    }
                    <p>
                        This is the Component for toggling the language:
                    </p>
                    {
                        //TODO embed languagecomponents file
                    }
                </>
            }
        }),
    }
];
