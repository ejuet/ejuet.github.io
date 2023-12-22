import React from "react";
import { Tag } from "../Blog/Tags.tsx";
import { MyLocalizedStrings } from "../Language/MyLocalizedStrings.js";

export const drone = [
    {
        published: new Date("2020-02-01"),
        titleImage: "tello/drone.png",
        tags: [Tag.school, Tag.python],
        translations: MyLocalizedStrings.create({
            de: {
                title: "Vermisstensuche mit einer Drohne",
                subtitle: "Programmierung von Suchmustern für die Vermisstensuche für eine DJI Tello Drohne in Python",
                content: () => <>
                    <p>
                        In der 11. Klasse mussten wir eine Facharbeit zu einem beliebigen Thema in einem Fach schreiben.
                        Ich habe die Facharbeit in Informatik geschrieben und dafür eine Spielzeugdrohne programmiert, die ich besaß.
                        Es handelt sich dabei um das Modell "Tello" von DJI und Ryzen, für die ein <a href="https://github.com/dji-sdk/Tello-Python">Python SDK</a> existiert.
                        Mithilfe dieses SDK und <a href="https://pypi.org/project/opencv-python/">OpenCV</a> habe ich die Drohne so programmiert,
                        dass sie mithilfe von Suchmustern, die Taucher verwenden,
                        nach Personen sucht. Hat sie eine Person gefunden, landet sie und gibt ihre aktuelle Position aus.
                    </p>
                    {
                        //TODO weiterschreiben
                    }
                </>
            }
        }),
    }
];
