import LocalizedStrings from 'react-localization';

export class MyLocalizedStrings extends LocalizedStrings {
    constructor(x) {
        console.log("hi");
        var ret = new LocalizedStrings(x);

        //set language in query param
        var quer = window.location.href.match(/lang=(.*)&?/);
        ret.setLanguage(quer ? quer[1] : navigator.language);

        return ret;
    }
}
