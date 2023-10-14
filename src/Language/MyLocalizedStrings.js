import LocalizedStrings from 'react-localization';

export class MyLocalizedStrings extends LocalizedStrings {
    constructor(x) {
        return MyLocalizedStrings.create(x);
    }

    static create(x){
        var ret = new LocalizedStrings(x);

        //set language in query param
        ret.setLanguage(getCurrentLanguage());

        return ret;
    }
}

export function getCurrentLanguage(){
    var quer = window.location.href.match(/lang=(.*)&?/);
    var navLanguage = navigator.language
    if(navLanguage.includes("-")){
        navLanguage=navLanguage.split("-")[0]
    }
    return quer ? quer[1] : navLanguage;
}
