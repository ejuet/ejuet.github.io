import React from "react";
import { Tag } from "../Blog/Tags.tsx";
import { MyLocalizedStrings } from "../Language/MyLocalizedStrings.js";
import Gist from "super-react-gist";

export const robot = [
    {
        published: new Date("2021-06-20"),
        titleImage: "robot/robot.png",
        tags: [Tag.elektronik, Tag.c, Tag.cpp, Tag.arduino],
        translations: MyLocalizedStrings.create({
            en: {
                title: "Building a Robot",
                subtitle: "Building and programming a self-driving robot with an ESP-32",
                content: () => <>
                    <p>In spring of 2022, I built a small robot that can drive and programmed it to move around.</p>
                    <h1>The Robot</h1>
                    <p>
                        After some research on what parts I could use, I ordered some things on ebay and went to my favourite hardware stores.
                        I got
                        <ul>
                            <li>An ESP-32, a small microcontroller to be the brains of my robot.</li>
                            <li>4 motors with wheels attached to them to mount on the bottom of the robot.</li>
                            <li>4 motor drivers to be able to control the speed and direction in which the wheels turn.</li>
                        </ul>
                    </p>

                    <h2>First Results</h2>
                    <p>
                        First, I tried to use some old motors I had lying around instead of the ones I bought, which I assumed to be too weak.
                        The general setup of my robot was working well and I was able to control the rotation speed and direction of the motors with some code,
                        but the motors were too weak to actually move the robot.
                    </p>
                    <video controls>
                        <source src="./robot/motor.mp4" type="video/mp4" />
                    </video>
                    <img src="./robot/firstrobot.jpg" />
                    <p>
                        To test if the new motors were strong enough, I assembled the robot using 2 of the wheels I bought and some cardboard.
                        Although this was not the most stable construction, it worked quite well:
                    </p>
                    <video controls>
                        <source src="./robot/run.mp4" type="video/mp4" />
                    </video>

                    <h2>Programming the Robot</h2>
                    <p>
                        The code I wrote for this project are C++ Libraries.
                        Then, I used the <a>Arduino IDE</a> for including these libraries, executing their code and transferring the program onto the ESP-32.
                    </p>

                    <h3>Motor.cpp</h3>
                    <p>
                        For example, I wrote a library to control each of the 4 available motors.
                    </p>
                    <Gist url="https://gist.github.com/ejuet/90f30327c96b7806e2da6c0afe6f5af5" />
                    <Gist url="https://gist.github.com/ejuet/f590e44cb7a8c584f8fb829df729422e" />

                </>
            }
        }),
    }
];
