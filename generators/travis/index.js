'use strict';
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('repository', {
      type: String,
      required: true,
      desc: 'Link to repository'
    });

    this.option('includeCoveralls', {
      type: Boolean,
      required: true,
      default: true,
      desc: 'Publish to coveralls'
    });
  },

  initializing: function () {
    this.fs.copyTpl(
      this.templatePath('travis.yml'),
      this.destinationPath('.travis.yml'),
      {
        repository: this.options.repository,
        includeCoveralls: this.options.includeCoveralls
      }
    );
  }
});

