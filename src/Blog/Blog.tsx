import React from "react";
import LocalizedStrings, { LocalizedStringsMethods } from "react-localization";

interface BlogTranslations extends LocalizedStringsMethods{
    content:()=>object
}

class Post{
    private title:string;
    private subtitle:string;
    public content:()=>object;
    public translations:BlogTranslations;

    constructor(title:string, subtitle:string, translations:BlogTranslations){
        this.title=title;
        this.subtitle=subtitle;
        this.translations=translations;

    }

    getPreview(){
        return <div>
            <h1>{this.title}</h1>
        </div>
    }
}

class PostLibrary{
    posts: Post[]
    constructor(posts:Post[]){
        this.posts=posts
    }
}

export const postLibrary = new PostLibrary([
    new Post("title", "subtitle", new LocalizedStrings({
        en:{
            content:()=><h1>Toller Inhalt</h1>
        }
    }))
])

