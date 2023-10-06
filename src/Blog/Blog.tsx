import React from "react";

class Post{
    private title:string;
    private subtitle:string;
    constructor(title:string, subtitle:string){
        this.title=title;
        this.subtitle=subtitle
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
    new Post("title", "subtitle")
])

