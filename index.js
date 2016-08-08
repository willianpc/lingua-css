var args = process.argv.slice(2);
process.title = 'lingua';

function buildLang (filename, callback) {
    var filename,
        languageBundle,
        stringBuffer = '',
        k,
        k2,
        currentLanguage,
        langSelector;

    // if (!args.length) {
    //     console.log('Please, provide a file...');
    //     process.exit(-1);
    // }

    if (!filename) {
        throw new Error('filename not provided');
    }

    //filename = args[0];

    try {
        languageBundle = require('./' + filename);
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
            stringBuffer += '.' + k2 + ':' + langSelector + 'after {\n';
            stringBuffer += '\tcontent: "' + currentLanguage[k2] + '";\n';
            stringBuffer += '}\n';
        }
    }

    if (callback) callback(stringBuffer);
}

module.exports = buildLang;

if (args.length >= 2) {

    var fs = require('fs');

    buildLang(args[0], buffer => {
        fs.writeFile(args[1], buffer);
    });

    //process.stdout.write();
} else if (args.length === 1) {
    buildLang(args[0], buffer => {
        process.stdout.write(buffer);
    });
}