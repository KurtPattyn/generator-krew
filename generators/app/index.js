'use strict';

var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var extend = require('deep-extend');
var generators = require('yeoman-generator');
var parseAuthor = require('parse-author');
var path = require('path');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('name', {
      type: String,
      required: false,
      desc: 'Worker name'
    });
  },

  initializing: function () {
    this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

    // Pre set the default props from the information we have at this point
    this.props = {
      name: this.pkg.name,
      description: this.pkg.description,
      version: this.pkg.version,
      homepage: this.pkg.homepage,
      repository: this.pkg.repository
    };

    if (_.isObject(this.pkg.author)) {
      this.props.authorName = this.pkg.author.name;
      this.props.authorEmail = this.pkg.author.email;
      this.props.authorUrl = this.pkg.author.url;
    } else if (_.isString(this.pkg.author)) {
      var info = parseAuthor(this.pkg.author);
      this.props.authorName = info.name;
      this.props.authorEmail = info.email;
      this.props.authorUrl = info.url;
    }
  },

  prompting: function() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the gnarly ' + chalk.red('Krew') + ' generator!'
    ));

    if (this.pkg.name || this.options.name) {
      this.props.name = this.pkg.name || _.kebabCase(this.options.name);
      return;
    }

    var done = this.async();

    var prompts = [{
      name: 'name',
      message: 'Worker Name',
      default: path.basename(process.cwd()),
      filter: _.kebabCase,
      validate: function(str) {
        return str.length > 0;
      }
    }, {
      name: 'description',
      message: 'Description',
      when: !this.pkg.description,
      validate: function(desc) {
        if (desc.length === 0) {
          return 'You must provide a description';
        } else {
          return true;
        }
      }
    }, {
      name: 'license',
      type: 'list',
      choices: [
        'MIT',
        'LGPLv2',
        'LGPLv3'
      ],
      default: 'MIT',
      message: 'License',
      when: !this.pkg.license
    }, {
      name: 'githubAccount',
      message: 'GitHub username or organization',
      when: !this.pkg.repository,
      store: true
    }, {
      name: 'authorName',
      message: 'Author\'s Name',
      when: !this.pkg.author,
      store: true
    }, {
      name: 'authorEmail',
      message: 'Author\'s Email',
      when: !this.pkg.author,
      store: true
    }, {
      name: 'authorUrl',
      message: 'Author\'s Homepage',
      when: !this.pkg.author,
      store: true
    }, {
      name: 'keywords',
      message: 'Package keywords (comma to split)',
      when: !this.pkg.keywords,
      filter: _.words
    }, {
      name: 'useTravis',
      type: 'confirm',
      message: 'Use TravisCI to build'
    }, {
      name: 'includeCoveralls',
      type: 'confirm',
      message: 'Send coverage reports to coveralls',
      when: function(answers) {
        return answers.useTravis;
      }
    }];

    this.prompt(prompts, function (props) {
      this.props = extend(this.props, props);

      if (props.githubAccount) {
        this.props.repository = props.githubAccount + '/' + this.props.name;
      }

      done();
    }.bind(this));
  },

  writing: function () {
    // Re-read the content at this point because a composed generator might modify it.
    var currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    var pkg = {
      name: _.kebabCase(this.props.name),
      version: '0.0.0',
      description: this.props.description,
      homepage: this.props.homepage,
      repository: this.props.repository,
      author: {
        name: this.props.authorName,
        email: this.props.authorEmail,
        url: this.props.authorUrl
      },
      files: [
        '.'
      ],
      main: './app.js',
      keywords: this.props.keywords,
      license: this.props.license,
      devDependencies: {
        istanbul: '^0.3.19',
        jscs: '^2.1.1',
        jsdoc: '^3.3.2',
        jshint: '^2.8.0',
        minami: '^1.1.1',
        mocha: '^2.3.0'
      },
      dependencies: {
        krew: '*',
        kimbu: '*',
        karl: '*'
      },
      scripts: {
        'start': 'node app.js',
        'test': 'node_modules/mocha/bin/mocha --harmony --bail --reporter spec --check-leaks test/',
        'test-cov': 'node --harmony node_modules/istanbul/lib/cli.js cover node_modules/mocha/bin/_mocha -- --reporter spec --check-leaks test/',
        'test-ci': 'node --harmony node_modules/istanbul/lib/cli.js cover node_modules/mocha/bin/_mocha --report lcovonly -- --harmony --reporter spec --check-leaks test/',
        'check-coverage': 'istanbul check-coverage --lines 100 --statements 100 --branches 100 --functions 100',
        'benchmark': 'node --harmony benchmarks/benchmark',
        'make-docs': './node_modules/.bin/jsdoc . -c jsdoc.conf',
        'check-style': './node_modules/jscs/bin/jscs .',
        'code-analysis': './node_modules/jshint/bin/jshint .'
      }
    };

    pkg = extend(pkg, currentPkg);

    // Let's extend package.json so we're not overwriting user previous fields
    this.fs.writeJSON('package.json', pkg);
  },

  default: function() {
    if (this.props.useTravis) {
      this.composeWith('krew:travis', {
        options: {
          repository: this.props.repository,
          includeCoveralls: this.props.includeCoveralls
        }
      }, {
        local: require.resolve('../travis')
      });
    }

    this.composeWith('krew:git', {
      options: {
        repositoryPath: this.props.repository
      }
    }, {
      local: require.resolve('../git')
    });

    if (!this.fs.exists(this.destinationPath('README.md'))) {
      this.composeWith('krew:readme', {
        options: {
          name: this.props.name,
          description: this.props.description,
          githubAccount: this.props.githubAccount,
          authorName: this.props.authorName,
          authorUrl: this.props.authorUrl,
          coveralls: this.props.includeCoveralls
        }
      }, {
        local: require.resolve('../readme')
      });
    }

    this.composeWith('krew:qa', {}, {
      local: require.resolve('../qa')
    });

    this.composeWith('krew:boilerplate', {
      options: {
        name: this.props.name
      }
    }, {
      local: require.resolve('../boilerplate')
    });
  },

  install: function () {
    this.installDependencies();
  },

  end: function() {
    this.log('You can now start your worker by typing `npm start`. Yeehaa.');
  }
});
