module.exports = function(grunt) {
  // dyamic loader for all *-grunt-* tasks
  require('load-grunt-tasks')(grunt);
  grunt.file.setBase('../');

  grunt.initConfig({
    temp_root: 'build/temp',
    dist_root: 'build',
    clean: {
      temp: {
        src: ['<%= temp_root %>/']
      },
      dist: {
        src: ['<%= dist_root %>/']
      }
    },
    concat: {
      js: {
        options: {
          separator: ';'
        },
        src: [
          'webapps/3rdparty/jquery/jquery.*.min.js',
          'webapps/3rdparty/bootstrap/bootstrap.*.min.js',
          'webapps/js/utils/*.js',
          'webapps/js/app.js'
        ],
        dest: '<%= temp_root %>/app.js'
      },
      css: {
         src: [
          'webapps/3rdparty/bootstrap/bootstrap.*.min.css',
          'webapps/css/*.css'
        ],
        dest: '<%= temp_root %>/app.css'   
      }
    },
    copy: {
      server: {
        files: [{
            src: ['server/**/*', '!server/Gruntfile.js', '!server/node_modules/**/*.*'],
            dest: '<%= dist_root %>/'
          }]
      },
      webapps: {
        files: [{
            cwd: 'webapps/',
            flatten : false,
            expand : true,
            src: ['index.html'],
            dest: '<%= dist_root %>/webapps/'
          }]
      },
      watch: {
        files: [{
          cwd: '<%= temp_root %>/',
          flatten : false,
          expand : true,
          src: ['app.css', 'app.js'],
          dest: '<%= dist_root %>/webapps/'
        }]
      }
    },
    cssmin: {
      lbs_mincss: {
        src: '<%= temp_root %>/app.css',
        dest: '<%= dist_root %>/webapps/app.css'
      }
    },
    uglify: {
      lbs_viewer: {
        files: {
          "<%= dist_root %>/webapps/app.js" : ["<%= temp_root %>/app.js"]
        }
      }
    },
    jshint: {
      sources: {
        src: ['webapps/js/**/*.js'],
        options: {
          strict: true,
          ignores: ['webapps/3rdparty/**/*.js'] // For example
        }
      }
    },
    express: {
      development: {
        options: {
          script: '<%= dist_root %>/server/server.js'
        }
      }
    },
    exec: {
      install: {
        cwd: '<%= dist_root %>/server/',
        command: 'npm install --no-color --quiet',
        stdout: true,
        stderr: true
      }
    },
    watch: {
      client: {
        files: [
          'webapps/css/**/*.css',
          'webapps/**/*.html',
          'webapps/js/**/*.js'
        ],
        tasks: ['clean:temp', 'concat', 'copy:watch', 'express:development'],
        options: {
          atBegin: true,
          spawn: false
        }
      }
    }
  });

  grunt.registerTask('setup', ['clean:dist', 'concat', 'copy:server', 'copy:webapps', 'exec']);

  // For development
  grunt.registerTask('develop', ['setup', 'copy:watch', 'watch:client']);

  // For depoy package
  grunt.registerTask('default', ['setup', 'cssmin', 'uglify', 'clean:temp']);
};
