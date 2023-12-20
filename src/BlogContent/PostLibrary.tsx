import React from "react";
import { chatGPTPosts } from "./chatGPTPosts.tsx";
import { examplePosts } from "./examplePosts.tsx";
import { xournalPosts } from "./xournalposts.tsx";
import { gitPosts } from "./gitposts.tsx";
import { PostLibrary } from "../Blog/Blog.tsx";
import { EmbedCode } from "../Blog/EmgithubCode.tsx";
import { thiswebsite } from "./thiswebsite.tsx";
import { Tag } from "../Blog/Tags.tsx";
import { MyLocalizedStrings } from "../Language/MyLocalizedStrings.js";

//Posts

export const postLibrary = new PostLibrary(
    [
        //example posts i only want to see if im working on the website
        ...(false && window.location.hostname == "localhost" ? examplePosts : []),

        ...chatGPTPosts,

        ...xournalPosts,

        ...gitPosts,
        ...thiswebsite,

        ...[
            {
                published: new Date("2019-08-12"),
                titleImage: "/the-falling-ball/ball.png",
                tags: [Tag.csharp, Tag.unity, Tag.android, Tag.gamedev],
                //ursprünglich new LocalizedStrings(), dann auch typecheck TODO fixen sodass new MyLocalizedStrings geht
                translations: MyLocalizedStrings.create({
                    de: {
                        title: "The Falling Ball",
                        subtitle: "Das beste Mobile-Game Allerzeiten",
                        content: () => <>
                            <p>
                                2D-Handyspiele gibt es wie Sand am Meer. Doch nur eins kann die Massen überzeugen:
                            </p>
                            <h1>The Falling Ball</h1>
                            <p>
                                "The Falling Ball" ist ein Handyspiel, das ich im August 2019, als ich in der 10. Klasse war, erstellt habe.
                                Man steuert wie der Name schon sagt einen fallenden Ball, der den auf dem Bildschirm angezeigten Bereich
                                nicht verlassen darf.
                            </p>

                            <video style={{ maxHeight: "70vh", marginRight: "5em" }} controls>
                                <source src="./the-falling-ball/menu.mp4" type="video/mp4" />
                            </video>

                            <video style={{ maxHeight: "70vh" }} controls>
                                <source src="./the-falling-ball/howtoplay.mp4" type="video/mp4" />
                            </video>

                            <p>
                                Es gibt verschiedene Levels, die man spielen kann.
                            </p>

                            <video style={{ maxHeight: "70vh" }} controls>
                                <source src="./the-falling-ball/level1.mp4" type="video/mp4" />
                            </video>

                            <h2>Spieleentwicklung mit Unity</h2>
                            <p>
                                Das Spiel war das erste vollständige Mobile Game, das ich mit Unity in C# entwickelt habe.
                            </p>
                            <ul>
                                <li>
                                    Das Spiel lässt sich über den Touchscreen steuern und verwendet das eingebaute Gyroskop des Handys,
                                    um den Ball nach links und rechts rollen zu lassen, wenn der Spieler das Handy neigt.
                                </li>
                                <li>
                                    Die verschiedenen Levels werden als Unity-<code>Prefabs</code> gespeichert und aus dem <code>Resource</code>-Folder geladen.
                                </li>
                                <li>
                                    Je nach Level ändert sich die Gravitationsbeschleunigung, die Musik und die visuellen Effekte des Balls.
                                </li>
                                <li>
                                    Ebenfalls habe ich die damalige Version von <a href="https://unity.com/products/unity-ads">Unity Ads</a> verwendet,
                                    um nach einem Game Over einen kurzen Werbeclip einzublenden. (Sehr zum Leidwesen meiner Freunde,
                                    die das Spiel gespielt haben. Die Werbungen ließen sich aber umgehen, indem man den Flugmodus aktiviert hat.)
                                </li>
                            </ul>


                            <h2>Google Play Store</h2>
                            <p>
                                Nachdem ich die ersten Level erstellt habe, hatte ich das Spiel im Google Play Store für Android veröffentlicht.
                                In der Developer Konsole konnte ich beobachten, wenn jemand mein Spiel installierte.
                                Bis auf meine Freunde und Verwandten installierte sich das Spiel aber leider niemand.
                                Ein tragisches Ende der Präsenz von "The Falling Ball" im Play Store trat ein, nachdem Google die Sicherheitsrichtlinien für die Apps erhöhte.
                                Obwohl mein Spiel keine besonderen Berechtigungen erforderte und auch sonst kein Sicherheitsrisiko darstellte,
                                wurde meine App automatisch offline genommen.
                            </p>
                        </>
                    },
                }),
            },
            {
                published: new Date("2020-04-05"),
                titleImage: "/medieval-rush/rush.png",
                tags: [Tag.csharp, Tag.unity, Tag.android, Tag.gamedev],
                //ursprünglich new LocalizedStrings(), dann auch typecheck TODO fixen sodass new MyLocalizedStrings geht
                translations: MyLocalizedStrings.create({
                    de: {
                        title: "Medieval Rush",
                        subtitle: "3D Jump-And-Run Spiel in Unity",
                        content: () => <>
                            <h1>Medieval Rush</h1>
                            <p>
                                Nach "The Falling Ball" habe ich ein weiteres Mobile Game mit Unity entwickelt.
                                Dieses Mal ein Jump-And-Run Spiel in 3D.
                                Man spielt einen Banditen in einem mittelalterlichen Dorf, der vermutlich nach einem Verbrechen auf der FLucht ist
                                und durch ein mittelalterliches Dorf läuft.
                            </p>
                            <ul>
                                <li>
                                    Das Spiel wird über Touch Gesten und den Gyrosensor gesteuert. Wischt man nach oben, springt der Bandit,
                                    wischt man nach unten, lässt er sich zu boden fallen.
                                    Wenn man nach links oder rechts wischt, biegt er bei einer Straßenecke in die jeweilige Richtung ab.
                                    Beim neigen des Handys läuft der Bandit weiter nach links oder rechts.
                                </li>
                                <li>
                                    Auf dem Weg gibt es Hindernisse, über die man springen oder unter denen man durchrutschen muss.
                                    Gelegentlich stellen sich einem Trolle in den Weg, auf die man mehrmals drauftippen muss, um sie zu besiegen.
                                    Tut man das nicht, schlägt der Troll mit seiner Keule zu und das Spiel ist vorbei.
                                </li>
                                <li>
                                    Die Straßen, durch die der Bandit läuft, werden nach und nach generiert und wenn man nirgenwo scheitert, endet das Spiel nie.
                                    Der Bandit wird nach und nach schneller, was die Schwierigkeit erhöht.
                                </li>
                            </ul>

                            <video style={{ maxHeight: "70vh" }} controls>
                                <source src="./medieval-rush/rush.mp4" type="video/mp4" />
                            </video>
                            
                        </>
                    },
                }),
            }
        ]
    ]
);
