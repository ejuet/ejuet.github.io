import { EmbedCode } from "../Blog/EmgithubCode.tsx";
import React from "react";
import { Tag } from "../Blog/Tags.tsx";
import { MyLocalizedStrings } from "../Language/MyLocalizedStrings.js";
import Gist from "super-react-gist";

export const rustCalculator = [
    {
        published: new Date("2022-08-02"),
        titleImage: "pexels/calculator.jpg",
        tags: [Tag.rust],
        translations: MyLocalizedStrings.create({
            en: {
                title: "Complex Number Calculator in Rust",
                subtitle: "Your Favourite Calculator in Rust",
                content: () => <>
                    <h1>Complex Number Calculator in Rust</h1>
                    <p>
                        To get started in Rust, I implemented a calendar.
                        It can perform calculations with real numbers as well as with complex numbers.
                        It also provides some functions for calculating sums or products.
                        I then used <a href="https://github.com/emilk/egui">egui </a> to create a GUI for it.
                    </p>
                    <h2>GUI</h2>
                    <img src="rust-calculator/calc.png" />
                    <img src="rust-calculator/numbers.png" />
                    <p>
                        Users can save the arithmetic expression and its result to a file.
                    </p>
                    <img src="rust-calculator/save.png" />
                    <h2>Generic Traits for Solids</h2>
                    <p>
                        The source code of my calculator can be extended easily to work with any solid, not just real or complex numbers.
                        Therefore, I moved the code for performing the actual calculations into a Rust Trait <code>solid</code>.
                    </p>
                    <Gist url="https://gist.github.com/ejuet/e2f4c58205dbe48e069eb7cb6b1c0d97" />
                    <p>
                        This generic traits is used for implementing real and complex numbers:
                    </p>
                    <EmbedCode repo="complex-number-calculator" file="/src/calculations/solids/complexnumbers.rs" branch="master" />
                </>
            }
        }),
    }
];
