'use strict';
var _ = require('lodash');
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('name', {
      required: true,
      desc: 'The new module name.'
    });
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('index.tmpl'),
      this.destinationPath('lib/index.js'), {
        pkgName: this.options.name,
        pkgSafeName: _.camelCase(this.options.name)
      }
    );

    this.fs.copyTpl(
      this.templatePath('app.tmpl'),
      this.destinationPath('app.js'), {
        pkgName: this.options.name,
        pkgSafeName: _.camelCase(this.options.name)
      }
    );

    this.fs.copyTpl(
      this.templatePath('test.tmpl'),
      this.destinationPath('test/index.js'), {
        pkgName: this.options.name,
        pkgSafeName: _.camelCase(this.options.name)
      }
    );
  }
});
