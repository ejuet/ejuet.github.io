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

const printYourCalendar = [
    {
        published: new Date("2023-10-01"),
        titleImage: "/print-my-calendar/caltitle.jpg",
        tags: [Tag.react, Tag.javaScript],
        translations: MyLocalizedStrings.create({
            en: {
                title: "Print Your Calendar",
                subtitle: "A Website where you can turn your iCalendar-Files into a printable Calendar",
                content: () => <>
                    <p>
                        Every year, my mum buys a calendar to hang up in our kitchen.
                        It has a page for every month that looks like a table, with a row for every day.
                        Every person in our family gets a column and can add their events there.
                        But my mom also writes all birthdays and holidays in it, and even the times when the trash cans are emptied.
                        That takes a lot of effort.
                        But all that data can either be downloaded online as <code>.iCal</code> files,
                        or could be added once in an electronic calendar and exported as <code>.iCal</code> files as well.
                    </p>
                    <p>
                        There are a lot of websites that allow you to upload these files and download a printable calendar.
                        But none of the ones I found let you use the table-layout our calendar always has.
                        So i decided to create such a website myself.
                    </p>

                    <h1>Print My Calendar</h1>
                    <p>
                        The website is available at <a href="https://ejuet.github.io/print-my-calendar/">Print My Calendar</a>.
                    </p>

                    <h2>
                        How it works
                    </h2>
                    <p>
                        Users can input their iCal files. By default, one file equals one column in the exported calendar.
                        Users can merge or split columns and add new ones.
                        Then, they can decide for which time frame they want to create a printable calendar.
                        This also allows for using iCal-Events that repeat every year so users can upload the same file each year.
                        After changing the design of the calendar, users can download their calendar.
                    </p>
                    <img src="/print-my-calendar/edit.png" />
                    <h2>Downloading the Calendar</h2>
                    <p>
                        First, the calendar is rendered as an html element, which users can see at the bottom of the page.
                        Then, <a href="https://www.npmjs.com/package/html2canvas">html2canvas</a> is used to turn the rendered result into a html canvas.
                        The content of the canvas can be downloaded as an image.
                        This is done for every month of the specified time frame, so the user can print the pages for each month individually.
                    </p>
                    <img src="/print-my-calendar/cal.jpg" />
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

        ...theRunningBall,

        ...printYourCalendar
    ]
);

