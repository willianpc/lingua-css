#!/usr/bin/env node
var lingua = require('./'),
    args = process.argv.slice(2),
    optionList = ['-o', '-i', '-t'],
    parsedOptions;

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

// command input-filename output-filename
if (args.length == 2) {
    buildResult({filename: args[0], output: args[1]});

// command input-filename
// in this case, output is stdout
} else if (args.length === 1) {
    buildResult(args[0]);

// assumes command is using options
} else if (args.length > 2) {
  parsedOptions = parseOptions(args);

  buildResult({
    filename: parsedOptions['-i'],
    output: parsedOptions['-o'],
    valueTemplate: parsedOptions['-t']
  });

} else {
  throw new Error('Please provide at least a language bundle');
}