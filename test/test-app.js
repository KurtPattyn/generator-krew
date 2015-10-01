'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var yaml = require('yamljs');

describe('krew:app', function() {
  describe('with TravisCI and coveralls', function() {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/app'))
        .withOptions({ skipInstall: true })
        .withPrompts({
          name: 'testName',
          description: 'some description',
          license: 'MIT',
          githubAccount: 'KurtPattyn',
          authorName: 'Kurt Pattyn',
          authorEmail: 'pattyn.kurt@gmail.com',
          authorUrl: 'https://github.com/KurtPattyn',
          keywords: ['keyword1', 'keyword2'],
          useTravis: true,
          includeCoveralls: true
        })
        .on('end', done);
    });

    it('creates files', function() {
      assert.file([
        'package.json',
        '.jshintrc',
        '.jshintignore',
        '.jscsrc',
        '.editorconfig',
        'jsdoc.conf',
        '.gitignore',
        '.gitattributes',
        '.travis.yml',
        'README.md',
        'app.js',
        'test/index.js',
        'lib/index.js'
      ]);
    });

    it('includes a coveralls script in .travis.yml', function() {
      var travisConf = yaml.load('.travis.yml');
      assert(travisConf);
      assert(travisConf.hasOwnProperty('after_success'));
      assert.equal(travisConf.after_success, 'npm install coveralls && cat ./coverage/lcov.info | coveralls');
    });
  });

  describe('with TravisCI and without coveralls', function() {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/app'))
        .withOptions({ skipInstall: true })
        .withPrompts({
          name: 'testName',
          description: 'some description',
          license: 'MIT',
          githubAccount: 'KurtPattyn',
          authorName: 'Kurt Pattyn',
          authorEmail: 'pattyn.kurt@gmail.com',
          authorUrl: 'https://github.com/KurtPattyn',
          keywords: ['keyword1', 'keyword2'],
          useTravis: true,
          includeCoveralls: false
        })
        .on('end', done);
    });

    it('creates files', function() {
      assert.file([
        'package.json',
        '.jshintrc',
        '.jshintignore',
        '.jscsrc',
        '.editorconfig',
        'jsdoc.conf',
        '.gitignore',
        '.gitattributes',
        '.travis.yml',
        'README.md',
        'app.js',
        'test/index.js',
        'lib/index.js'
      ]);
    });

    it('includes a coveralls script in .travis.yml', function() {
      var travisConf = yaml.load('.travis.yml');
      assert(travisConf);
      assert(!travisConf.hasOwnProperty('after_success'));
    });
  });

  describe('without TravisCI', function() {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/app'))
        .withOptions({ skipInstall: true })
        .withPrompts({
          name: 'testName',
          description: 'some description',
          license: 'MIT',
          githubAccount: 'KurtPattyn',
          authorName: 'Kurt Pattyn',
          authorEmail: 'pattyn.kurt@gmail.com',
          authorUrl: 'https://github.com/KurtPattyn',
          keywords: ['keyword1', 'keyword2'],
          useTravis: false,
          includeCoveralls: false
        })
        .on('end', done);
    });

    it('creates files', function() {
      assert.file([
        'package.json',
        '.jshintrc',
        '.jshintignore',
        '.jscsrc',
        '.editorconfig',
        'jsdoc.conf',
        '.gitignore',
        '.gitattributes',
        'README.md',
        'app.js',
        'test/index.js',
        'lib/index.js'
      ]);
      assert.noFile([
        '.travis.yml'
      ]);
    });
  });
});
