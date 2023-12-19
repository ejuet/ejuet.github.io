import { LocalizedStringsMethods } from "react-localization";
import { MyLocalizedStrings } from "../Language/MyLocalizedStrings.js";

//Tags
export enum Tag {
    current,
    school,
    chatgptauthor,
    lua,
    java,
    git,
    javaScript,
    react,
    typeScript,
    thisWebsite
}

export const tagGroups = new Map<Tag, Tag[]>([
    [Tag.thisWebsite, [Tag.javaScript, Tag.typeScript, Tag.react]]
]);

export function getTagInfo(tag: Tag): TagInfo {
    switch(tag) {
        case Tag.current:
            return {
                color: "var(--bs-primary)",
                translations: MyLocalizedStrings.create({
                    en: {
                        title: "Current",
                        description: "My current projects.",
                    },
                    de: {
                        title: "Aktuell",
                        description: "Meine aktuellen Projekte.",
                    }
                })
            };
        case Tag.school:
            return {
                color: "gray",
                translations: MyLocalizedStrings.create({
                    en: {
                        title: "School",
                        description: "These are projects i made when I was still in school.",
                    },
                    de: {
                        title: "Schule",
                        description: "Meine Projekte aus der Schulzeit.",
                    }
                })
            };
        case Tag.chatgptauthor:
            return {
                color: "#159c7c",
                translations: MyLocalizedStrings.create({
                    en: {
                        title: "Written by ChatGPT",
                        description: "Instead of using Lorem Ipsum Texts when creating this page, I asked ChatGPT to write some posts. I quite like it.",
                    },
                    de: {
                        title: "Von ChatGPT geschrieben",
                        description: "Anstatt beim Erstellen dieser Seite Lorem Ipsum Texte zu verwenden, habe ich ChatGPT ein paar Beiträge schreiben lassen. Mir gefallen sie.",
                    }
                })
            };
        //Programming Languages:
        case Tag.java:
            return getProgrammingLanguageTagInfo("#f58312");
        case Tag.lua:
            return getProgrammingLanguageTagInfo("#03027d");
        case Tag.javaScript:
            return getProgrammingLanguageTagInfo("#f3ce00");
        case Tag.git:
            return {
                color: "#c9281a",
                translations: MyLocalizedStrings.create({
                    en: {
                        title: "Git",
                        description: "Blogposts related to the versioning tool git.",
                    },
                    de: {
                        title: "Git",
                        description: "Blogposts über git.",
                    }
                })
            };
        default:
            return getDefault()
    }

    function getProgrammingLanguageTagInfo(color="#000000") {
        const languageName = Tag[tag].charAt(0).toLocaleUpperCase() + Tag[tag].slice(1);
        return {
            color: color,
            translations: MyLocalizedStrings.create({
                en: {
                    title: languageName,
                    description: "Projects with " + languageName + " Code",
                },
                de: {
                    title: languageName,
                    description: "Projekte mit " + languageName + " Code",
                }
            })
        };
    }

    function getDefault() {
        const color="rgba(0,0,0,0.5)";
        const languageName = Tag[tag].charAt(0).toLocaleUpperCase() + Tag[tag].slice(1);
        return {
            color: color,
            translations: MyLocalizedStrings.create({
                en: {
                    title: languageName,
                    description: "Projects with " + languageName ,
                },
                de: {
                    title: languageName,
                    description: "Projekte mit " + languageName,
                }
            })
        };
    }
}

export function getTags() {
    return Object.keys(Tag).map((t, index) => {
        if(!isNaN(Number(t))) {
            var tag = Tag[t as keyof typeof Tag];
            //console.log(tag as Tag);
            return tag as Tag;
        }
        return;
    }).filter((el) => el);
}//Tags Logic


export interface TagInfo {
    color: string;
    translations: TagTranslations;
}
export interface TagTranslations extends LocalizedStringsMethods {
    title: string;
    description: string;
}

