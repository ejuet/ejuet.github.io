import LocalizedStrings, { LocalizedStringsMethods } from "react-localization";
import { MyLocalizedStrings } from "../Language/MyLocalizedStrings";
import { getTagInfo, } from "./Tags.tsx";
import { Tag } from "./Tags.tsx";

interface BlogTranslations extends LocalizedStringsMethods {
    title: string;
    subtitle: string;
    content: () => JSX.Element
}

export const generalTexts = new MyLocalizedStrings({
    en: {
        readmore: "Read More",
        comments: "Comments",
        pleasecomment: "Feel free to leave your opinion or questions in the comment section below.",
        commentcookie: "By clicking on 'Sign in with Github', a login cookie is created.",
        published: "Published"
    },
    de: {
        readmore: "Lesen",
        comments: "Kommentare",
        pleasecomment: "Noch Fragen?",
        commentcookie: "Durch das Anmelden mit Github wird ein Login-Cookie erstellt und gespeichert.",
        published: "Veröffentlicht"
    }
})

export interface PostData {
    translations: BlogTranslations;
    titleImage?: string;
    link?: string;
    published?: Date | undefined;
    projectStart?: Date;
    projectEnd?: Date;
    tags: Tag[];
    ignoreInDisplays?: boolean;
}

export class Post {

    private postData: PostData;

    constructor(
        data: PostData
    ) {
        this.postData = data;
        const postname = this.postData.translations.getString("title", "en") ? this.postData.translations.getString("title", "en") : this.postData.translations.getString("title");
        this.postData.link = this.postData.link || "/" + postname.replaceAll(" ", "-").replaceAll("/", "-");
        this.postData.titleImage = this.postData.titleImage || "robot.jpg";
        if(this.postData.tags.indexOf(Tag.all) <0){
            this.postData.tags.push(Tag.all);
        }
    }

    getPostData() {
        return this.postData;
    }

    getLink() {
        return this.postData.link;
    }

    getContent() {
        return this.postData.translations.content()
    }

    getOneTag() {
        const tags = this.postData.tags.filter((tag) => tag != Tag.current);
        //var tags = this.postData.tags
        if(tags.length <= 0) return null;
        return tags[0];
    }

    getColor() {
        let t: Tag = this.getOneTag();
        if(t != null) {
            return getTagInfo(t).color
        }
        return "var(--bs-primary)";
    }
}

function compareDates(aDate: Date, bDate: Date): 1 | -1 | 0 {

    if(!aDate) return -1;
    if(!bDate) return 1;
    if(aDate < bDate) {
        return -1;
    }
    else if(aDate > bDate) {
        return 1;
    }
    return 0;
};

export class PostLibrary {
    private posts: Post[]
    constructor(postData: PostData[]) {
        var postdatas = postData

        postdatas.forEach((dat) => {
            
            // add tags from tag groups
            dat.tags.forEach(tag => {
                const tagInfo = getTagInfo(tag)
                if(tagInfo.containsTags && tagInfo.containsTags.indexOf(tag) < 0) {
                    dat.tags = dat.tags.concat(tagInfo.containsTags)
                }
            })

            //add current tag
            const daysForCurrentTag = 120
            if(dat.published && Date.now() - dat.published.valueOf() < 1000 * 1 * 60 * 60 * 24 * daysForCurrentTag ){
                if(dat.tags.indexOf(Tag.current)<0){
                    dat.tags.push(Tag.current)
                }
                else{
                    console.warn("post "+dat.translations.title+" has tag current set which should be set automatically. "
                    +"If this is intentional, ignore this warning")
                }
            }
        })
        this.posts = postdatas.map((dat, i) => new Post(dat))
    }

    getPosts() {
        this.posts.sort((a, b) => {
            const aData = a.getPostData();
            const bData = b.getPostData();
            var d = compareDates(aData.published, bData.published)
            return d != 0 ? d : aData.translations.title.localeCompare(bData.translations.title)
        }).reverse()
        return this.posts;
    }

    getLatestPosts(descending = true) {
        var ret = Array.from(this.getPosts());
        ret.sort((a, b) => compareDates(a.getPostData().published, b.getPostData().published))

        if(descending) ret.reverse();

        //ignore all posts that should be ignored in latest posts
        ret = ret.filter((post) => !post.getPostData().ignoreInDisplays || post.getPostData().ignoreInDisplays == false);
        return ret;
    }

    getPostsWithTags(tags: Tag[]) {
        return this.getPosts().filter((post) => {
            for(var i in tags) {
                if(post.getPostData().tags.includes(tags[i])) {
                    return true;
                }
            }
            return false;
        })
    }

    getPostsWithTag(tag: Tag) {
        return this.getPostsWithTags([tag])
    }

    getAllTags() {
        const tags = this.posts.map((post) => post.getPostData().tags).flat();
        console.log(tags);
    }
}


