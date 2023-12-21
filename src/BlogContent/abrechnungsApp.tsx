import React from "react";
import { Tag } from "../Blog/Tags.tsx";
import { MyLocalizedStrings } from "../Language/MyLocalizedStrings.js";

export const abrechnungsApp = [
    {
        published: new Date("2023-12-04"),
        titleImage: "/abrechnungs-app/konto.png",
        tags: [Tag.java, Tag.swing],
        translations: MyLocalizedStrings.create({
            de: {
                title: "Abrechnungs-App in Java",
                subtitle: "Anwendung zum Erstellen von Abrechnungen und Stundenübersichten für Lerntherapeuten und Nachhilfelehrer",
                content: () => <>
                    <h1>Abrechnungs-App</h1>
                    <p>
                        Ich habe eine Anwendung zum Erstellen von Abrechnungen und Stundenübersichten in Java programmiert.
                        Sie kann verwendet werden, wenn man immer nur einzelne Kunden hat, die Stunden bei einem buchen und einzeln kommen,
                        wie das zum Beispiel bei Therapeuten aller Art, Nachhilfe- oder Musiklehrern der Fall ist.
                    </p>
                    <h2>Features</h2>

                    <h3>Stunden</h3>
                    <p>
                        Nutzer können die Termine eintragen, die ein Kunde vereinbart hatte.
                        Falls diese Stunde ausgefallen ist, aber trotzdem noch in der Übersicht auftauchen soll,
                        kann ausgewählt werden, dass diese Stunde nicht abgerechnet werden soll.
                        (Ein Menü zum Hinzufügen von regelmäßig stattfindenden Stunden gibt es ebenfalls.)
                    </p>
                    <img src="/abrechnungs-app/stunden.png" />

                    <h3>Vertrag</h3>
                    <p>
                        Pro Kunde kann festgelegt werden, welcher Stundensatz in welchem Zeitraum gilt oder galt.
                    </p>
                    <img src="/abrechnungs-app/vertrag.png" />

                    <h3>Konto</h3>
                    <p>
                        Zahlungen des Kunden können im Reiter "Konto" vermerkt werden.
                    </p>
                    <img src="/abrechnungs-app/konto.png" />

                    <h3>Stundenübersicht exportieren</h3>
                    <p>
                        Nutzer können eine Stundenübersicht für einen Kunden per Knopfdruck als <code>.csv</code> exportieren.
                        Die exportierte Datei und der Ordner, in dem diese liegt, werden automatisch geöffnet.
                        Die Datei kann nun nach Belieben formatiert, bearbeitet und zum Beispiel ausgedruckt werden.
                    </p>
                    <img src="/abrechnungs-app/exportmenu.png" />
                    <img src="/abrechnungs-app/export.png" />

                    <h3>Backups</h3>
                    <p>
                        Die Datenmenge, die Nutzer in die App eingeben können, ist nicht begrenzt.
                        Da die Anwendung aber für Selbstständige mit Einzelkunden ausgelegt ist, ist die Größe der Datei,
                        in der die Daten liegen, immer sehr gering.
                        Daher ist es möglich, bei jedem vom Nutzer ausgeführten Speichervorgang eine Kopie der gesamten Daten abzulegen.
                        Diese können zum Beispiel als Backups auf einen anderen Datenträger kopiert werden.
                    </p>
                    <img src="/abrechnungs-app/backup.png" />

                    <h2>Entwicklung mit Java</h2>
                    <p>
                        Die Anwendung habe ich mit Java und die dazugehörige GUI mit Swing entwickelt.
                        Sie läuft rein lokal auf einem PC und kann als <code>.jar</code>-Datei in der Java Runtime Engine ausgeführt werden.
                        Die Daten, die Nutzer in der Anwendung eingeben und bearbeiten können, sind unabhängig von den exportierbaren
                        <code>.csv</code>-Dateien als <code>JSON</code>-objekt in einer Textdatei gespeichert.
                    </p>


                </>
            }
        }),
    }
];
