import React from "react";
import { Tag } from "../Blog/Tags.tsx";
import { MyLocalizedStrings } from "../Language/MyLocalizedStrings.js";

export const theRunningBall = [
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
                    After a countdown, the game starts.
                    You run along a road with various lanes. These are randomly generated and sometimes break off.
                    Using the arrow keys, you have to switch lanes. With the space bar,
                    you can jump over the red and yellow obstacles that appear on the lanes.
                    </p>
                </>
            },
            de:{
                title: "The Running Ball",
                subtitle: "3D Game mit Godot und GDScript",
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
];
