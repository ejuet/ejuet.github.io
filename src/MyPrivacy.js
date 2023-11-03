import React from 'react';
import { MyLocalizedStrings } from './Language/MyLocalizedStrings.js';
import { GiscusCookieAlert } from './Blog/CommentSection';

//TODO datenschutzerklärungsgenerator
const strings = new MyLocalizedStrings({
    de: {
        privacy: ()=> <>
            <p>Dies ist meine private Homepage und mein privater Blog.</p>

            <h1>Giscus</h1>
            <p>Ich verwende Giscus, um Kommentare auf meiner Website zu ermöglichen.</p>
            <p><a href="https://github.com/giscus/giscus/blob/b42eb85d2ead59c0bad076f46fb5eb5cff0cba6f/PRIVACY-POLICY.md">Giscus Privacy Policy</a></p>
            <p>Das Repository, in dem alle Discussions dieser Website einzusehen sind, ist <a href="https://github.com/ejuet/giscus">hier</a> zu finden.</p>
            <p>Um einen Kommentar auf dieser Website zu posten, muss sich zuerst mit einem Github Account eingeloggt werden.</p>
            <p>Beim Einloggen mit dem Github Account wird dazu ein Login Token als Cookie gespeichert.</p>
            <p>Besucher der Website werden mit folgendem Hinweis über dem Kommentarfeld darauf hingewiesen:</p>
            <div><GiscusCookieAlert /></div>

            <h1>EmGithub</h1>
            <p>Ich verwende emgithub, um Code aus meinen Github Repositories einzubetten.</p>
            <p>emgithub hoste ich dafür <a href=""></a> auf github pages.</p> {/* TODO emgithub selber hosten und hier auf das repo verlinken*/}
        
            <h1>Github</h1>
            <p>Diese Website, Giscus und EmGithub werden auf Github Pages gehostet.</p>
            <p><a href="https://docs.github.com/de/site-policy/privacy-policies/github-privacy-statement?tid=139042612">Github Privacy Statement</a></p>
        </>
    },
    en:{
        //TODO privacy englische Übersetzung 
    },
})

export function MyPrivacy() {
    return <>
        {strings.privacy()}
    </>;
}
