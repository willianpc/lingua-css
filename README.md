# lingua
### A CSS based internationalization tool

Lingua means "language" in Portuguese, but can also mean "tongue", which gives a pretty clever idea for a logo :P

Back to what is relevant, lingua takes advantage of the CSS pseudo class lang, and changes the language based on it, which makes it work as an interesting internationalization tool.

So, let's say we want to translate a 'title' key in English, Spanish and Portuguese, then lingua will generate the following:

```css
/*Default language*/
.title:after {
    content: "Greetings!";
}

/*Portuguese*/
.title:lang(pt)::after {
    content: "Bem vindo!";
}

/*Spanish*/
.title:lang(es)::after {
    content: "Hola";
}
```

### Instalation

Todo

### Usage

For command line, you can call lingua and provide the language bundle file:

```shell
node lingua language_bundle.json
```

By default, the output will be written in stdout, so you can conveniently use it on gulp or simply pipe it to a file.

As you might have guessed, the language bundle file must be a JSON by following this structure:


```json
{
    "default": {
        "title": "Greetings!",
        "name": "name",
        "message": "This is a simple test at how to use lingua"
    },

    "pt": {
        "title": "Bem vindo!",
        "name": "nome",
        "message": "Este é um teste simples com o lingua"
    },

    "es": {
        "title": "Hola",
        "name": "nombre",
        "message": "Esta es una prueba sencilla en la forma de utilizar lingua"
    }
}
```

You can also import the library, and make use of the method buildLang. For example:

```javascript
var lingua = require('lingua');

lingua.buildLang(bundleFile, function (resultCSS) {
    doSomething(resultCSS);
});

```