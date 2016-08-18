var defaultTemplate = '.{value}';

function buildLang ({filename, valueTemplate = defaultTemplate, callback}) {
    var languageBundle,
        stringBuffer = '',
        k,
        k2,
        currentLanguage,
        langSelector;

    valueTemplate = valueTemplate || defaultTemplate;

    if (!filename) {
        throw new Error('filename not provided');
    }

    try {
        languageBundle = require(filename);
    } catch(ex) {
        throw new Error('Error parsing the language bundle: ' + ex.message);
    }

    for (k in languageBundle) {
        currentLanguage = languageBundle[k];

        if (k === 'default') {
            langSelector = '';
        } else {
            langSelector = 'lang(' + k + ')::';
        }

        stringBuffer += '/*Language: ' + k + '*/\n';

        for (k2 in currentLanguage) {
            stringBuffer += valueTemplate.replace(/{value}/, k2) + ':' + langSelector + 'after {\n';
            stringBuffer += '\tcontent: "' + currentLanguage[k2] + '";\n';
            stringBuffer += '}\n';
        }
    }

    if (callback) callback(stringBuffer);
}

module.exports = buildLang;