import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { MyLocalizedStrings } from "../Language/MyLocalizedStrings";

const text = new MyLocalizedStrings({
    en: {
        content: "Content"
    },
    de: {
        content: "Inhalt"
    }
})

export function TableOfContents() {
    const x = useTableOfContents();

    if(x.children.length == 0) {
        return;
    }
    return <div style={{
        //width: "260px", position: "fixed", right: 5, top: 150, backgroundColor: "transparent",
        textAlign: "left",
        top: "30px",
        marginBottom: "30px"
    }} className="d-lg-block sticky-top pt-3 table-of-contents">
        <h1 style={{ textAlign: "center" }}>{text.content}</h1>
        {x.getAsList()}
    </div>;
}
function useTableOfContents() {
    const [root, setRoot] = useState(new Level());
    const activeElement = useHeadsObserver()

    root.setActiveElement(activeElement)


    useEffect(() => {
        var elements = Array.from(document.querySelectorAll(".page h1, h2, h3, h4, h5, h6"));

        var nRoot = new Level();
        elements.forEach((el) => {
            nRoot.addChild(el as HTMLElement);
        });
        setRoot(nRoot);
    }, []);

    return root;
}
class Level {
    element: HTMLElement;
    children: Level[];
    active: boolean;
    parent: Level;

    constructor(element?: HTMLElement) {
        if(element) {
            this.element = element;
        }
        this.children = [];
    }

    getLevel() {
        if(!this.element) {
            return 0;
        }
        return Number(this.element.tagName.split("")[1]);
    }

    getLastChild() {
        return this.children[this.children.length - 1];
    }

    addChild(element: HTMLElement) {
        let n = new Level(element);
        if(n.getLevel() - this.getLevel() <= 0) {
            return false;
        }
        else if(n.getLevel() - this.getLevel() == 1) {
            this.appendChild(n);
            return true;
        }
        else {
            var wasAdded = false;
            wasAdded = this.getLastChild()?.addChild(element);
            if(!wasAdded) {
                this.appendChild(n);
            }
            return true;
        }


    }

    appendChild(n: Level) {
        this.children.push(n);
        n.parent = this;
    }

    setActiveElement(activeElement?: Element) {
        if(this.element && this.element == activeElement) {
            this.active = true;
        }
        else {
            this.active = false;
        }
        this.children.forEach((el) => { el.setActiveElement(activeElement) })
    }

    getLink() {
        if(!this.element) {
            return;
        }

        const weight = this.active ? "bold" : "";
        const headingLevel = this.getLevel(); // Assuming this.getLevel() returns the desired heading level.

        const HeadingComponent = `h${headingLevel}`;

        //const fontSize = `${(6-headingLevel) * 0.25}rem`; // Set the font size to half of the usual font size.
        const fontSize = "1rem"
        const headingStyle = {
            fontSize: fontSize,
        };

        return (
            //@ts-ignore
            <HeadingComponent style={headingStyle}>
                <NavLink
                    key={this.element.innerHTML}
                    style={{ fontWeight: weight }}
                    to={"#" + this.element.innerText.replaceAll(" ", "-")}
                    onClick={(e) => {
                        e.preventDefault();
                        this.element.scrollIntoView();
                    }}
                >
                    {this.element.innerText}
                </NavLink>
            </HeadingComponent>
        );
    }

    getAsList() {
        if(!this.element && this.children.length === 0) {
            return <></>;
        }
        if(this.children.length === 0) {
            return <>{this.getLink()}</>;
        }
        if(!this.element) {
            return this.getChildrenLists();
        } else {
            return <>
                {this.getChildrenLists()}
            </>
        }
    }

    getChildrenLists() {
        return <>
            {this.getLink()}
            <div style={{ marginLeft: this.parent ? '20px' : 0 }}>
                {this.children.map((childLevel) => (
                    <div style={{ marginLeft: this.parent ? '20px' : 0 }}>
                        {childLevel.getAsList()}
                    </div>
                ))}
            </div>
        </>
    }

}

export function useHeadsObserver() {
    const observer = useRef()
    const [activeElement, setActiveElement] = useState()
    useEffect(() => {
        const handleObsever = (entries) => {
            entries.forEach((entry) => {
                if(entry?.isIntersecting) {
                    setActiveElement(entry.target)
                }
            })
        }

        //@ts-ignore
        observer.current = new IntersectionObserver(handleObsever, {
            //rootMargin: "-20% 0% -35% 0px"
        }
        )

        const elements = document.querySelectorAll("h1, h2, h3, h4, h5, h6")
        elements.forEach((elem) =>
             //@ts-ignore
            observer.current.observe(elem)
        )
        return () =>
            //@ts-ignore
            observer.current?.disconnect()
    }, [])

    return activeElement;
}
