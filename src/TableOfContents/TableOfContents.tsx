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
        width: "20vw", position: "fixed", right: 5, top: 150, backgroundColor: "transparent",
        textAlign: "left"
    }} className="d-none d-md-block">
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
            nRoot.addChild(el);
        });
        setRoot(nRoot);
    }, []);

    return root;
}
class Level {
    element: Element;
    children: Level[];
    active:boolean;

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
        if(n.getLevel() - this.getLevel() <= 0) {
            return false;
        }
        else if(n.getLevel() - this.getLevel() == 1) {
            this.children.push(n);
            return true;
        }
        else {
            var wasAdded = false;
            wasAdded = this.getLastChild()?.addChild(element);
            if(!wasAdded){
                this.children.push(n);
            }
            return true;
        }
    }

    setActiveElement(activeElement?:Element){
        if(this.element && this.element==activeElement){
            this.active=true;
        }
        else{
            this.active=false;
        }
        this.children.forEach((el)=>{el.setActiveElement(activeElement)})
    }

    getLink() {
        if (!this.element) {
            return;
        }
    
        const weight = this.active ? "bold" : "";
        const headingLevel = this.getLevel(); // Assuming this.getLevel() returns the desired heading level.
    
        const HeadingComponent = `h${headingLevel}`;

        //const fontSize = `${(6-headingLevel) * 0.25}rem`; // Set the font size to half of the usual font size.
        const fontSize="1rem"
        const headingStyle = {
            fontSize: fontSize,
        };
    
        return (
            <HeadingComponent style={headingStyle}>
                <NavLink
                    key={this.element.innerHTML}
                    style={{ fontWeight: weight }}
                    to={"#" + this.element.innerHTML.replaceAll(" ", "-")}
                    onClick={(e) => {
                        e.preventDefault();
                        this.element.scrollIntoView();
                    }}
                >
                    {this.element.innerHTML}
                </NavLink>
            </HeadingComponent>
        );
    }

    getAsList() {
        if (!this.element && this.children.length === 0) {
            return <></>;
        }
        if (this.children.length === 0) {
            return <>{this.getLink()}</>;
        }
        if (!this.element) {
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
            <div style={{ marginLeft: '20px' }}>
                {this.children.map((childLevel) => (
                    <div style={{ marginLeft: '20px' }}>
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

        observer.current = new IntersectionObserver(handleObsever, {
            //rootMargin: "-20% 0% -35% 0px"
        }
        )

        const elements = document.querySelectorAll("h1, h2, h3, h4, h5, h6")
        elements.forEach((elem) => observer.current.observe(elem))
        return () => observer.current?.disconnect()
    }, [])

    return activeElement;
}
