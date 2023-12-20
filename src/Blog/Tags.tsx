import { LocalizedStringsMethods } from "react-localization";
import { MyLocalizedStrings } from "../Language/MyLocalizedStrings.js";

//Tags
export enum Tag {
    all,

    //add new tags here
    current,
    chatgptauthor,
    lua,
    java,
    git,
    javaScript,
    react,
    typeScript,
    thisWebsite,
    school,

    //categories:
    projects,
    programmingLanguages,

}

export const tagGroups = new Map<Tag, Tag[]>([
    [Tag.thisWebsite, [Tag.current, Tag.javaScript, Tag.typeScript, Tag.react]],
]);

export function getTagInfo(tag: Tag): TagInfo {
    switch(tag) {
        case Tag.current:
            return {
                color: "var(--bs-success)",
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
        case Tag.typeScript:
            return getProgrammingLanguageTagInfo("#2f74c0");
        case Tag.react:
            return getDefault("#5ed3f3");
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
        case Tag.thisWebsite:
            return {
                color: "var(--bs-primary)",
                translations: MyLocalizedStrings.create({
                    en: {
                        title: "This Website",
                        description: "Blogposts related to the creation of this website.",
                    },
                    de: {
                        title: "Diese Webseite",
                        description: "Blogposts über das Erstellen dieser Website.",
                    }
                })
            };
        case Tag.projects:
            return {
                color: "var(--bs-primary)",
                translations: MyLocalizedStrings.create({
                    en: {
                        title: "Projects",
                        description: "My personal projects.",
                    },
                    de: {
                        title: "Projekte",
                        description: "Meine persönlichen Projekte",
                    }
                }),
                subcategories: [
                    Tag.thisWebsite
                ]
            }
        case Tag.programmingLanguages:
            return {
                color: "var(--bs-primary)",
                translations: MyLocalizedStrings.create({
                    en: {
                        title: "Programming Languages",
                        description: "Programming Languages I've worked with",
                    },
                    de: {
                        title: "Programmiersprachen",
                        description: "Programmiersprachen, mit denen ich mich befasst habe",
                    }
                }),
                subcategories: [
                    Tag.javaScript,
                    Tag.typeScript,
                    Tag.java,
                    Tag.lua,
                ]
            }
        case Tag.all:
            return {
                color: "var(--bs-dark)",
                translations: MyLocalizedStrings.create({
                    en: {
                        title: "General",
                        description: "All Posts",
                    },
                    de: {
                        title: "Allgemein",
                        description: "Alle Beiträge",
                    }
                })
            }
        default:
            return getDefault()
    }

    function getProgrammingLanguageTagInfo(color = "#000000") {
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

    function getDefault(color = "rgba(0,0,0,0.5)") {
        const languageName = Tag[tag].charAt(0).toLocaleUpperCase() + Tag[tag].slice(1);
        return {
            color: color,
            translations: MyLocalizedStrings.create({
                en: {
                    title: languageName,
                    description: "Projects with " + languageName,
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

export function getCategories() {
    return getTags().filter((tag) => isCategory(tag)
    )
}

function isCategory(tag: Tag): unknown {
    return getTagInfo(Tag[tag] as unknown as Tag).subcategories &&
        getTagInfo(Tag[tag] as unknown as Tag).subcategories.length > 0;
}

export function getTagsWithCategory(cat) {
    return getTags().filter((tag) => {
        for(let x in getTagInfo(Tag[cat] as unknown as Tag).subcategories) {
            var t = getTagInfo(Tag[cat] as unknown as Tag).subcategories[x]
            if(t == Tag[tag] as unknown as Tag) {
                return true;
            }
        }
        return false;
    })
}

export function getTagsWithoutCategory() {
    return getTags().filter((tag) => {
        if(isCategory(tag)) {
            return false;
        }
        return getCategories().filter((cat) => {
            //only select categories in which tag is present
            return getTagInfo(Tag[cat] as unknown as Tag).subcategories.indexOf(Tag[tag] as unknown as Tag) >= 0
        }).length <= 0 //amount of these categories is 0
    })
}


export interface TagInfo {
    color: string;
    translations: TagTranslations;
    subcategories?: Tag[]
}
export interface TagTranslations extends LocalizedStringsMethods {
    title: string;
    description: string;
}

