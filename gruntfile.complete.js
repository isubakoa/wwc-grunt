module.exports = function(grunt) {

  var srcFiles = {
    jade: 'build/views/**/*.jade',
    sass: 'build/sass/**/*.sass',
    coffee: 'build/coffee/*.coffee',
    image: 'build/images/*.{png,jpg,gif,svg}'
  };

  var srcDir = {
    jade: 'build/views',
    sass: 'build/sass',
    coffee: 'build/coffee',
    image: 'build/images'
  };

  var distDir = {
    base: 'connect',
    css: 'connect/css',
    js: 'connect/js',
    image: 'connect/images'
  };

  grunt.initConfig({
    //pkg: grunt.file.readJSON('package.json'),

    // TASK & CONFIGURATION =============================/

    //Start server
    connect:{
      server:{
        options:{
          base: distDir.base,
          livereload: true, // Enable page auto refresh
          open: true, // Automatically open localhost on browser
          debug: true // Enable debugging
        }
      }
    },

    //Convert Jade to Html
    jade:{
      compile: {
        options: {
          pretty: true // File Indentation
        },
        files: [{
          expand: true, // Enable dynamic expansion
          cwd: srcDir.jade, // Src matches are relative to this path
          src: '**/*.jade', // Actual pattern(s) to match
          dest: distDir.base, // Destination path prefix
          ext: '.html' // Dest filepaths will have this extension
        }]
      }
    },

    //Convert Sass to Css
    sass:{
      dist:{
        options: {
          style: 'expanded', // Sass file style
          noCache: true, // Enable the noCache
          update: true // Only compile changed files
        },
        files:[{
          expand: true, // Sass file style
          cwd: srcDir.sass,
          src: '**/*.sass',
          dest: distDir.css,
          ext:'.css'
        }]
      }
    },

    //Minify Css
    cssmin:{
      target:{
        files:[{
          expand: true,
          cwd: distDir.css,
          src: ['**/*.css', '!**/*.min.css'],
          dest: distDir.css,
          ext:'.min.css'
        }]
      }
    },

    //Convert Coffeescript to Js, Lint it and Uglify it
    coffee: {
      compile: {
        options: {
         bare: true // Compile the JavaScript without wrapper
        },
        files:[{
          expand: true,
          cwd: srcDir.coffee,
          src: '**/*.coffee',
          dest: distDir.js,
          ext:'.js'
        }]
      }
    },

    //Lint Js
    jshint:{
      options:{
        jshintrc: true // Use .jshintrc config file
      },
      all: [distDir.js + '/script.js']
    },

    //Uglify Js
    uglify:{
      options:{
        mangle: false // Avoid functions - variables rename
      },
      js:{
        files:[{
          expand: true,
          cwd: distDir.js,
          src: ['**/*.js','!*.min.js'],
          dest: distDir.js,
          ext:'.min.js'
        }]
      }
    },

    //Compress images
    image:{
      dynamic: {
        files: [{
          expand: true,
          cwd: srcDir.image,
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: distDir.image
        }]
      }
    },

    //Supervise
    watch:{
      jade: {
        options:{
          livereload: true
        },
        files: srcFiles.jade,
        tasks: ['jade']
      },
      sass: {
        options:{
          livereload: true
        },
        files: srcFiles.sass,
        tasks: ['sass', 'cssmin']
      },
      coffee: {
        options:{
          livereload: true
        },
        files: srcFiles.coffee,
        tasks: ['coffee', 'jshint', 'uglify']
      },
    }

  });

  // COMBINED TASKS =========================/
  //Deployment
  grunt.registerTask('deploy',['jade','sass','cssmin','coffee','jshint','uglify','image']);

  //Default
  grunt.registerTask('default',['connect','watch']);

  // DEPENDENT PLUGINS =========================/
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-image');
  grunt.loadNpmTasks('grunt-contrib-watch');

};
