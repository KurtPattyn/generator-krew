# Krew Generator
  [![NPM Package][npm-image]][npm-url]
  [![NPM Downloads][npm-downloads-image]][npm-downloads-url]
  [![Build Status][travis-image]][travis-url]

[Yeoman](http://yeoman.io) generator for [Krew][krew-url] - lets you quickly set up a worker with sensible defaults and best practices.


## Usage

Install `yo` and `generator-krew`:

```bash
npm install -g yo generator-krew
```

Make a new directory and `cd` into it:

```bash
mkdir my-new-project && cd $_
```

Run `yo krew` and answer the questions:
```bash
yo krew
```
This command creates the following files and directories:
```
.
├── .editorconfig
├── .gitattributes
├── .gitignore
├── .jshintrc
├── .jshintignore
├── .jscsrc
├── .travis.yml
├── README.md
├── jsdoc.conf
├── package.json
├── app.js
├── lib
|    └── index.js
├── test
     └── index.js
```
`.editorconfig` is a base configuration of the editor. See [EditorConfig][editor-config-url].  
`.gitattributes` and `.gitignore` are configuration files for git.  
`.jshintrc` and `.jshintrc` are configuration files for [jshint][jshint-url] (invoked through `npm code-analysis`).  
`.jscsrc` is a configuration file for [jscs][jscs-url] (invoked through `npm run check-style`).  
`.travis.yml` is the configuration file for [Travis CI][travis-ci-url]. This file is only available
when you enabled Travis CI during the setup.  
`jsdoc.conf` is the configuration file for [JSDoc][jsdoc-url] (invoked through `npm run make-docs`).  
`README.md` is base template for documenting the worker. Feel free to update or completely re-write
the documentation.  
`package.json` is the minimum package.json needed for the worker to work. Feel free to edit to
fit your needs.  
`app.js` is the main file of the worker. It contains a boilerplate `init()` method that should be
adapted if additional initialization is required (like connecting to a database for instance).  
`lib/index.js` contains the business logic. This is where the business logic of the worker should
be implemented.  
`test/index.js` contains the unit tests for this worker. It contains one method that asserts
to false.  
  
Run `npm start` to start the newly created worker.  

The following `npm` are available:  
`start`, `test`, `test-ci`, `test-cov`, `make-docs`, `check-style` and `code-analysis`.  

## Implementing The Worker
To give the worker its heart and soul, the `index.js` file under the `/lib` directory should be
implemented.

## Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

MIT

[npm-image]: https://badge.fury.io/js/generator-krew.svg
[npm-url]: https://www.npmjs.com/package/generator-krew
[npm-downloads-image]: https://img.shields.io/npm/dm/generator-krew.svg?style=flat
[npm-downloads-url]: https://www.npmjs.org/package/generator-krew
[travis-image]: https://travis-ci.org/KurtPattyn/generator-krew.svg?branch=master
[travis-url]: https://travis-ci.org/KurtPattyn/generator-krew
[krew-url]: https://github.com/KurtPattyn/krew
[jshint-url]: http://jshint.com
[jscs-url]: http://jscs.info
[travis-ci-url]: https://travis-ci.org/
[jsdoc-url]: http://usejsdoc.org
[editor-config-url]: http://editorconfig.org
