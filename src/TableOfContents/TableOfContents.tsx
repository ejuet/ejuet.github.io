import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { MyLocalizedStrings } from "../Language/MyLocalizedStrings";

//TODO die sektion highlighten in der man ist

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
    if(x.children.length==0){
        return;
    }
    return <div style={{
        width: "20vw", position: "fixed", left: 5, top: 150, backgroundColor: "transparent",
        textAlign: "left"
    }}>
        <h1 style={{ textAlign: "center" }}>{text.content}</h1>
        {x.getAsList()}
    </div>;
}
function useTableOfContents() {
    const [root, setRoot] = useState(new Level());

    useEffect(() => {
        var elements = Array.from(document.querySelectorAll(".page h1, h2, h3, h4, h5, h6"));

        var nRoot = new Level();
        elements.forEach((el) => {
            nRoot.addChild(el);
        });
        setRoot(nRoot);
    }, []);

    return root;
}
class Level {
    element: Element;
    children: Level[];

    constructor(element?: Element) {
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

    addChild(element: Element) {
        let n = new Level(element);
        if(true) {
            if(n.getLevel() - this.getLevel() == 1) {
                this.children.push(n);
            }
            else {
                this.getLastChild().addChild(element);
            }
        }
    }

    getLink() {
        if(!this.element) {
            return;
        }
        return <NavLink to={"#"+this.element.innerHTML.replaceAll(" ","-")} onClick={(e) => {
            e.preventDefault()
            this.element.scrollIntoView()
        }}>
            {this.element.innerHTML}
        </NavLink>
    }

    getAsList() {
        if(!this.element && this.children.length == 0) {
            return <></>;
        }
        if(this.children.length == 0) {
            return <li>{this.getLink()}</li>;
        }
        if(!this.element) {
            return this.getChildrenLists();
        }
        else {
            return <li>{this.getChildrenLists()}</li>
        }
    }

    getChildrenLists() {
        return <>
            {this.getLink()}
            <ul>
                {this.children.map((childLevel) => childLevel.getAsList())}
            </ul>
        </>
    }

}
