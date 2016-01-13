'use strict';
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
  },

  initializing: function () {
    this.fs.copy(
      this.templatePath('foreverignore'),
      this.destinationPath('.foreverignore')
    );
  }
});
