import { chatGPTPosts } from "./chatGPTPosts.tsx";
import { examplePosts } from "./examplePosts.tsx";
import { xournalPosts } from "./xournalposts.tsx";
import { gitPosts } from "./gitposts.tsx";
import { PostLibrary } from "../Blog/Blog.tsx";
import { EmbedCode } from "../Blog/EmgithubCode.tsx";
import { thiswebsite } from "./thiswebsite.tsx";

//Posts

export const postLibrary = new PostLibrary(
    [
        //example posts i only want to see if im working on the website
        ...(false && window.location.hostname == "localhost" ? examplePosts : []),

        ...chatGPTPosts,

        ...xournalPosts,

        ...gitPosts,
        
        ...thiswebsite
    ]
);
