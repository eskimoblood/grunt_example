/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    //run jshint, the busterjs tests and compile the handlbar templates every time a file changed
    watch: {
      files: ['Gruntfile.js', 'dev/js/*.js', 'test/**/*.js', 'dev/templates/*.hbs'],
      tasks: ['jshint', 'buster', 'handlebars']
    },
    //hint all the js files
    jshint: {
      files: ['Gruntfile.js', 'dev/js/*.js', 'test/*.js'],
      options: {
        camelcase: true,
        curly: true,
        immed: true,
        newcap: true,
        noarg: true,
        noempty: true,
        nonew: true,
        quotmark: 'single',
        trailing: true,
        maxdepth: 3,
        browser: true,
        asi: true,
        debug: true,
        eqnull: true
      }
    },
    'jsbeautifier': {
      files: ['Gruntfile.js', 'dev/js/*.js', 'test/**/*.js'],
      options: {
        'indent_size': 2,
        "max_preserve_newlines": 2
      }
    },
    handlebars: {
      compile: {
        files: {
          'dev/templates/templates.js': 'dev/templates/*.hbs'
        }
      }
    },
    //
    gruntContribCopy: {
      dist: {
        files: {
          'dist/index.html': 'dev/index.html'
        }
      }
    },
    //use the original index.html, as this the task which collect the files to compile
    // relative to the index.html
    'useminPrepare': {
      html: 'dev/index.html'
    },
    // use the copy in dist folder as this is where it replace the path to file relative to the passed file
    usemin: {
      html: ['dist/index.html'],
      css: ['dist/*.css']
    },
    //just uglify the concatenated the files
    uglify: {
      dist: {
        files: {
          'dist/prod.min.js': 'dist/prod.min.js',
          'dist/lib.min.js': 'dist/lib.min.js',
          'dist/app.min.js': 'dist/app.min.js'
        }
      }
    },
    //create md5 file names for all minified sources
    md5: {
      compile: {
        files: {
          'dist': 'dist/*.min.*'
        },
        //overide the pathes in the index.html with the new md5 name
        options: {
          callback: function(newPath, oldPath, content) {
            var fs = require('fs')
            fs.unlink(oldPath);
            var file = fs.readFileSync('dist/index.html', 'utf8');
            var replacedData = file.replace(oldPath.replace('dist/', ''), newPath.replace('dist/', ''));
            fs.writeFileSync('dist/index.html', replacedData);

          }
        }
      }
    },
    //replace images path in css with data-uri
    imageEmbed: {
      dist: {
        src: ['dist/style.min.css'],
        dest: 'dist/style.min.css',
        options: {
          //needs a hack in the image-embed task code see this issue:
          //https://github.com/ehynds/grunt-image-embed/pull/10
          baseDir: '../dev/css/'
        }
      }
    },
    //create a manifest file for all js and css files
    manifest: {
      generate: {
        src: ['*.js', '*.css'],
        options: {
          basePath: 'dist/',
          network: ['*', 'http://*', 'https://*']
        }
      }
    },
    // run the buster tests
    buster: {
      test: {
        config: 'test/buster.js'
      },
      server: {
        port: 1111
      }
    },
    bower: {
      install: {
        //just run 'grunt bower:install' and you'll see files from your Bower packages in lib directory
      }
    },
    connect: {
      server: {
        options: {
          port: 9001,
          keppalive: true
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-buster');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.renameTask('copy', 'gruntContribCopy');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-mincss');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-manifest');
  grunt.loadNpmTasks('grunt-md5');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-image-embed');
  grunt.loadNpmTasks('grunt-bower-task')
  grunt.loadNpmTasks('grunt-jsbeautifier')


  grunt.registerTask('dist',
    ['gruntContribCopy', 'useminPrepare', 'usemin', 'requirejs', 'concat', 'uglify', 'imageEmbed', 'md5', 'manifest']);
  grunt.registerTask('preCommit', ['buster', 'jsbeautifier']);
  
};
