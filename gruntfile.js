module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // TASK & CONFIGURATION =============================/

    //Start server
    connect: {

    },

    //Convert Jade to Html
    jade: {

    },

    //Convert Sass to Css
    sass: {

    },

    //Minify Css
    cssmin: {

    },

    //Convert Coffeescript to Js
    coffee: {

    },

    //Lint Js
    jshint: {

    },

    //Uglify Js
    uglify: {

    },

    //Compress images
    image: {

    },

    //Supervise
    watch: {

    },

  });

  // COMBINED TASKS =========================/
  grunt.registerTask('deploy',[]); //Deployment
  grunt.registerTask('default',[]); //Default

  // DEPENDENT PLUGINS =========================/
  grunt.loadNpmTasks('');

};
