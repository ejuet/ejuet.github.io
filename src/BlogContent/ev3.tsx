import React from "react";
import { Tag } from "../Blog/Tags.tsx";
import { MyLocalizedStrings } from "../Language/MyLocalizedStrings.js";
import { Alert } from "react-bootstrap";

export const ev3 = [
    {
        published: new Date("2022-06-03"),
        titleImage: "/ev3/ev3.jpg",
        tags: [Tag.electronics, Tag.linux, Tag.c],
        translations: MyLocalizedStrings.create({
            en: {
                title: "Using a Lego Mindstorms Robot to Run a Server",
                subtitle: "",
                content: () => <>
                    <p>
                        One of my friends found a Lego Mindstorms robot in her basement that she was gifted as a child.
                        Because she didn't know what to do with it and knows I like robots and electronics, she gave it to me.
                        (Shoutout to Nicola {"<3"} )
                        After searching the internet and finding out you can run linux on them,
                        I decided to strip it of its sensors and motors and do exactly that.
                    </p>
                    <h1>Linux</h1>
                    <p>
                        <a href="https://www.ev3dev.org/">ev3dev</a> is a debian distribution that is not Lego-official but runs on ev3 robots.
                        To install it, you have to flash an SD Card, insert it into what Lego calls the "P-Brick" and boot the robot,
                        as explained <a href="https://www.ev3dev.org/docs/getting-started/">here</a>.
                        After that, you can connect the "P-Brick" to a computer with a USB cable and connect to it via SSH.
                    </p>
                    <h2>Programming</h2>
                    <p>
                        Now, I was able to use the "P-Brick" as a normal linux device via this terminal. Obviously, the hardware is not great
                        but it is definitively good enough to run code.
                        Since it is a linux distribution, I was able to write some C code right away.
                    </p>
                    <h1>Power Supply</h1>
                    <p>
                        Since the batteries kept running out, I had to power it in some other way.
                        The official power supplies for Lego Mindstorms Robots are, like all the other parts, very expensive and not easily available.
                        So I decided to put it together myself.
                    </p>
                    <Alert variant={"danger"}>
                        The following is not a safe setup. I do not endorse replicating it and will not be liable for any damage done.
                    </Alert>
                    <img src="/ev3/power.jpg" />
                </>
            }
        }),
    }
];
