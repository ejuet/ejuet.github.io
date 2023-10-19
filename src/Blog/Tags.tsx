import { LocalizedStringsMethods } from "react-localization";
import { MyLocalizedStrings } from "../Language/MyLocalizedStrings.js";

//Tags
export enum Tag {
    current,
    school,
    chatgptauthor
}

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
                color: "lightgray",
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
    }
}

export function getTags() {
    return Object.keys(Tag).map((t, index) => {
        if(!isNaN(Number(t))) {
            var tag = Tag[t as keyof typeof Tag];
            console.log(tag as Tag);
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

