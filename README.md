# Lingua CSS
## A CSS based internationalization tool

Lingua CSS takes advantage of the CSS pseudo class lang, and changes the language based on it, which makes it work as an interesting internationalization tool.

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

## Instalation

Use npm to install Lingua CSS (recommended):

    $ npm install linguacss

Or, install it globally:

    $ npm install -g linguacss

## Usage

### Command line

1. You can run the following command (assuming you installed globally) if you want the result in the **stdout**:

        $ lingua-css ./language-bundle.json

2. You can also pass the output file as a second option:

        $ lingua-css ./language-bundle.json ./css/i18n.css

3. A more sofisticated way is using flag options:

        $ lingua-css -i ./language-bundle.json -o ./css/i18n.css -t [data-language=\"{value}\"]

    The flag options are straightforward, however it's worth explaining them:
    * **-i** is the input file path and filename
    * **-o** is the output file path and filename
    * **-t** is the template value for the CSS selector. You must provide {value} to be replaced by the correct value

4. Use Lingua CSS as an npm script. This is the most recommended way, as you don't have to install the package globally.

    In your package.json, add the following entry to scripts:

    ```javascript
      "scripts": {
        "linguacss": "linguacss ./language_bundle.json ./result.css"
      },

```

### Language Bundle File

The language bundle file must be a JSON following this structure displayed below.
Each language must start with the language acronym, with the exception of the default language, whose name must be "default", as follows:


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

You can also import the library, and use it as a method. For example:

```javascript
var linguacss = require('linguacss');

linguacss({
  filename: __dirname + '/bundle.json', 
  callback: buffer => { console.log(buffer); }
});

```

## How it works?

Once you have built your CSS file, import it to your HTML page and add the CSS selectors to the elements you want the text to be displayed. For example:

```html
    <div id="content">
        <h4 class="title"></h4>
        <p class="message"></p>
    </div>
```

The CSS language bundle will apply the classes **title** and **message** by adding the texts according to the default language, like this:

```html
    <div id="content">
        <h4 class="title">Greetings</h4>
        <p class="message">This is a simple test at how to use lingua</p>
    </div>
```

Then, if you want to change language, simply change the attribute lang from your <body> tag:

```javascript
    document.body.lang = 'pt';
```

This will automatically change the CSS classes (or whatever selector you decided to use) and the text will be updated:

```html
    <div id="content">
        <h4 class="title">Bem vindo!</h4>
        <p class="message">Este é um teste simples com o lingua</p>
    </div>
```
