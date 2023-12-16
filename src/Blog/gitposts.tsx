import React from "react";
import { MyLocalizedStrings } from "../Language/MyLocalizedStrings";
import { PostData } from "./Blog";
import { Tag } from "./Tags";
import { EmbedCode } from "./EmgithubCode";

export const gitPosts: PostData[] = [
    {
        tags: [Tag.git],
        titleImage: "pexels/git.jpg",
        published: new Date(2023, 7, 7),
        translations: MyLocalizedStrings.create({
            de: {
                title: "git rebase",
                subtitle: "Wie man die Commit-Historie bearbeitet ohne alles kaputt zu machen (hoffentlich)",
                content: function (): JSX.Element {
                    return <>
                        <h1>How to <code>git rebase</code></h1>
                        <p>
                            Das Versionierungstool git ist in vielen Situationen nützlich.
                            Das liegt unter anderem daran, dass jeder noch so unwichtige Zwischenstand eines Projekts als <code>commit</code> in der git-Historie festgehalten wird
                            und dort jederzeit mithilfe des Commands <code>git checkout</code> abgerufen werden kann.
                            Lästig wird dies jedoch, wenn sich Dateien oder einzelne Zeilen in das Projekt eingeschlichen haben, die nachträglich und restlos entfernt werden sollen.
                            Zum Beispiel, wenn ein Projekt veröffentlicht werden soll, und in einigen Commits Daten enthalten sind, die nicht für die Öffentlichkeit bestimmt sind.
                            Dann reicht es natürlich nicht, diese im <code>HEAD</code> des aktuellen Branches zu löschen und die Änderung zu commiten,
                            da die unliebsamen Daten in allen vorherigen Commits noch vorhanden sind,
                            die nach ihrem Hinzufügen erstellt wurden.
                        </p>
                        <p>
                            In solchen Fällen muss die commit-Historie manipuliert werden.
                            Dies ist ohne weiteres möglich, aber bietet auch die Möglichkeit, das Projekt nachhaltig kaputt zu machen.
                        </p>
                        <h2>Anleitung</h2>
                        <p>
                            <ol>
                                <li>
                                    <code>git rebase -i {"<hash>"}~1</code>
                                    <p>
                                        Startet den Rebase.
                                        <code>{"<hash>"}</code> sei durch den Hash des Commits zu ersetzen, in dem das Problem entstanden ist,
                                        in welchem also zum Beispiel die vertraulichen Daten hinzugefügt wurden.
                                        Das <code>~1</code> verweist auf den Commit vor dem genannten.
                                    </p>
                                </li>
                                <li>
                                    <code>edit</code> statt <code>pick</code> <br></br>
                                    Je nach Einstellung öffnet sich jetzt ein Texteditor, in dem alle Commits vom Problem-Commit bis zum aktuellen aufgelistet sind.
                                    Beim Problem-Commit muss nun <code>edit</code> statt <code>pick</code> eingetragen werden,
                                    damit im folgenden die Änderungen dieses Commits angepasst werden können.
                                </li>
                                <li>
                                    <code>git add .</code> <br></br>
                                    Nun können alle gewünschten Änderungen getätigt und wie gewohnt z.B. mit diesem Command geaddet und mit
                                </li>
                                <li>
                                    <code>git commit --amend</code> comitted werden.
                                </li>
                                <li>
                                    <code>git rebase --continue</code> setzt den Rebase fort, zum Beispiel bis zum nächsten Commit, bei dem <code>edit</code> gewählt
                                    wurde. Alle Konflikte, die durch die getätigte Änderung entstehen, können nun wie andere Merge-Konflikte auch gelöst
                                    und mithilfe von Schritt 3, 4 und 5 übernommen werden.
                                    Tritt an irgendeiner Stelle ein Problem auf, kann der gesamte Rebase stattdessen mit <code>git rebase --abort</code> abgebrochen werden.
                                </li>
                            </ol>
                        </p>
                    </>
                },
            },
            en: {
                title: "git rebase",
                subtitle: "How to edit the commit history without breaking everything (hopefully)",
                content: function (): JSX.Element {
                    return <>
                        <h1>How to <code>git rebase</code></h1>
                        <p>
                            The version control tool git is useful in many situations. This is partly because every seemingly insignificant intermediate state of a project is recorded as a <code>commit</code> in the git history and can be retrieved at any time using the <code>git checkout</code> command. However, it becomes tedious when files or individual lines have crept into the project that need to be removed completely later. For example, when a project is to be released, and some commits contain data that is not intended for the public. Simply deleting them in the <code>HEAD</code> of the current branch and committing the change is not sufficient because the unwanted data still exists in all previous commits created after their addition.
                        </p>
                        <p>
                            In such cases, the commit history needs to be manipulated. While this is easily possible, it also carries the risk of permanently damaging the project.
                        </p>
                        <h2>Instructions</h2>
                        <p>
                            <ol>
                                <li>
                                    <code>git rebase -i {"<hash>"}~1</code>
                                    <p>
                                        Initiates the rebase. Replace <code>{"<hash>"}</code> with the hash of the commit where the issue occurred, for example, where the confidential data was added. The <code>~1</code> refers to the commit before the mentioned one.
                                    </p>
                                </li>
                                <li>
                                    <code>edit</code> instead of <code>pick</code> <br></br>
                                    Depending on the configuration, a text editor now opens, listing all commits from the problematic commit to the current one. Change <code>pick</code> to <code>edit</code> for the problematic commit, allowing adjustments to be made to this commit's changes.
                                </li>
                                <li>
                                    <code>git add .</code> <br></br>
                                    Now, all desired changes can be made and added using, for example, this command:
                                </li>
                                <li>
                                    <code>git commit --amend</code>
                                </li>
                                <li>
                                    <code>git rebase --continue</code> continues the rebase, for example, to the next commit where <code>edit</code> was chosen. Any conflicts arising from the made changes can be resolved like other merge conflicts and accepted using steps 3, 4, and 5. If any issues arise at any point, the entire rebase can be aborted with <code>git rebase --abort</code>.
                                </li>
                            </ol>
                        </p>

                    </>
                },
            }
        })
    }
]