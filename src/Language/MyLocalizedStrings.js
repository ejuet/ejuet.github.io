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
    return quer ? quer[1] : navigator.language;
}
