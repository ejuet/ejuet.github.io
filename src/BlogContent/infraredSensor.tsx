import React from "react";
import { Tag } from "../Blog/Tags.tsx";
import { MyLocalizedStrings } from "../Language/MyLocalizedStrings.js";

export const infraredSensor = [
    {
        published: new Date("2023-01-01"),
        titleImage: "/ir-sensor/title.jpg",
        tags: [Tag.electronics],
        translations: MyLocalizedStrings.create({
            en: {
                title: "Installing an infrared sensor into fairy lights",
                subtitle: "Using the HC-SR501 infrared sensor to automatically turn lights on and off",
                content: () => <>
                    <p>
                        Infrared sensors are quite cheap.
                        I bought a HC-SR501 and installed it into some normal 3V-fairy lights so they turn on and off automatically.
                    </p>

                    <h1>Components</h1>
                    I used
                    <ul>
                        <li>
                            A HC-SR501 sensor.
                        </li>
                        <li>
                            A battery to power it. The sensor can be powered with 5V-20V.
                        </li>
                        <li>
                            A Relay. When the sensor detects something, it activates a pin and supplies power to it.
                            But the current is way too low to power the lights. Therefore, I needed a relay that is connected to that pin.
                            It acts as a switch: When it is activated, it closes another circuit, in which the lights are connected to a suitable power source (3V)
                        </li>
                    </ul>
                    <h1>Setup</h1>
                    <p>
                        The construction I thought of works well.
                    </p>
                    <img src="/ir-sensor/light.jpg" />
                    <p>
                        Then, I just had to put it in a box with a cutout for the sensor and it was ready to use.
                    </p>
                </>
            }
        }),
    }
];
