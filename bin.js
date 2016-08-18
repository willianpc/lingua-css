#!/usr/bin/env node
var lingua = require('./'),
    args = process.argv.slice(2),
    optionList = ['-o', '-i', '-t'],
    parsedOptions,
    path = require('path');


// parse options provided with the command
function parseOptions (options) {
  const len = options.length,
        mappedOptions = {};

  if (len % 2 !== 0) {
    throw new Error('Please, review options. Something seems to be missing: ' + options.join(' '));
  }

  for (let i = 0; i < len; i += 2) {

    if (optionList.indexOf(options[i]) <= -1) {
      throw new Error('Invalid option: ' + options[i]);
    }

    mappedOptions[options[i]] = options[i+1];
  }

  // check if mandatory option is set
  if ('-i' in mappedOptions === false) {
    throw new Error('Mandatory option missing: -i language_bundle_filename');
  }

  return mappedOptions;
}

function buildResult ({filename, output = null, valueTemplate = '.{value}'}) {

  if (!path.isAbsolute(filename)) {
    filename = process.cwd() + '/' + filename;
  }

  if (output) {
    var fs = require('fs');
    lingua({
      filename,
      valueTemplate,
      callback: buffer => {
        fs.writeFile(output, buffer);
    }});
  } else {
    lingua({
      filename,
      valueTemplate,
      callback: buffer => {
        process.stdout.write(buffer);
    }});
  }
}

if (args.length == 2 && !args[0].match(/^\-i|^\-o|^\-t/)) {
    buildResult({filename: args[0], output: args[1]});
} else if (args.length === 1) {
    buildResult({filename: args[0]});
} else if (args.length >= 2) {
  parsedOptions = parseOptions(args);

  buildResult({
    filename: parsedOptions['-i'],
    output: parsedOptions['-o'],
    valueTemplate: parsedOptions['-t']
  });
} else {
  throw new Error('Please provide at least a language bundle');
}