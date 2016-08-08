var lingua = require('../index');

lingua('test/language_bundle.json', result => {
    console.log(result);
});