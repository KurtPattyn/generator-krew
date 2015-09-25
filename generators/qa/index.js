'use strict';
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
  },

  initializing: function () {
    this.fs.copy(
      this.templatePath('jscsrc'),
      this.destinationPath('.jscsrc')
    );

    this.fs.copy(
      this.templatePath('jshintrc'),
      this.destinationPath('.jshintrc')
    );

    this.fs.copy(
      this.templatePath('jshintignore'),
      this.destinationPath('.jshintignore')
    );

    this.fs.copy(
      this.templatePath('jsdoc.conf'),
      this.destinationPath('jsdoc.conf')
    );
  }
});
