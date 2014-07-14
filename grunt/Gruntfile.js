var ns = this;

module.exports = function(grunt){
  var port = 9000;
  var hostname = "172.21.32.73";
  var src_root = "src/";
  var debug_root = "../debug/";
  var release_root = "../release/";

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    /*
       ----- COMPASS -----
    */

    compass: {
      debug: {
        options: {
          config: "config_debug.rb"
        }
      },
      release: {
        options: {
          config: "config_release.rb"
        }
      }
    },

    /*
       ----- JADE -----
    */

    jade: (function(){
      var jade_data = function(){
        return require("./jade_setting.json");
      };
      var jade_cwd = src_root + "jade/";
      var jade_src = ["[^_]*.jade"];
      var jade_dest = src_root+"html/";
      var jade_ext = ".html";
      return {
        debug: {
          options: {
            data: jade_data,
            pretty: true
            },
          expand: true,
          cwd: jade_cwd,
          src: jade_src,
          dest: jade_dest,
          ext: jade_ext
        },
        release: {
          options: {
            data: jade_data,
            pretty: true
          },
          expand: true,
          cwd: jade_cwd,
          src: jade_src,
          dest: jade_dest,
          ext: jade_ext
        }
      };
    })(),

    /*
       ----- JSHINT -----
    */
    
    jshint: {
      cwd: src_root+"js/app/"
    },

    /*
       ----- BROWSERIFY -----
    */

    browserify_params: (function(){
      ns.browserify_src = [src_root+"js/main.js"];
    })(),

    browserify: {
      debug:{
        src: ns.browserify_src,
        dest: debug_root+"js/app.js"
      },
      release:{
        src: ns.browserify_src,
        dest: release_root+"js/app.js"
      }
    },

    /*
       ----- CLEAN -----
    */

    clean: {
      options: {force: true},
      dest: release_root
    },

    /*
       ----- COPY -----
    */

    copy: {
      debug_favicon: {
        expand: true,
        cwd: src_root,
        src: "*.ico",
        dest: debug_root
      },
      debug_html: {
        expand: true,
        cwd: src_root+"html/",
        src: [
          "**/*.html"
        ],
        dest: debug_root
      },
      debug_css: {
        expand: true,
        cwd: src_root,
        src: "css/**/*.css",
        dest: debug_root,
      },
      debug_js: {
        expand: true,
        cwd: src_root,
        src: [
          "js/lib/**/*.js"
        ],
        dest: debug_root
      },
      debug_img: {
        expand: true,
        cwd: src_root,
        src: [
          "img/**/*.png",
          "img/**/*.jpeg",
          "img/**/*.jpg",
          "img/**/*.gif"
        ],
        dest: debug_root,
      },
      //----------------------------------------------------------------
      release_favicon: {
        expand: true,
        cwd: src_root,
        src: "*.ico",
        dest: release_root
      },
      release_html: {
        expand: true,
        cwd: src_root+"html/",
        src: [
          "**/*.html"
        ],
        dest: release_root
      },
      release_css: {
        expand: true,
        cwd: src_root,
        src: "css/**/*.css",
        dest: release_root,
      },
      release_js: {
        expand: true,
        cwd: src_root,
        src: [
          "js/lib/**/*.js"
        ],
        dest: release_root
      },
      release_img: {
        expand: true,
        cwd: src_root,
        src: [
          "img/**/*.png",
          "img/**/*.jpeg",
          "img/**/*.jpg",
          "img/**/*.gif"
        ],
        dest: release_root,
      }
    },

    /*
       ----- CONNECT -----
    */

    connect: {
      debug: {
        options: {
          port: port,
          hostname: hostname,
          base: debug_root
        }
      }
    },

    /*
       ----- OPEN -----
    */

    open: {
      browser: {
        path: "http://"+hostname+":"+port+"/",
        app: "Google Chrome"
      }
    },

    /*
       ----- WATCH -----
    */

    watch: {
      options: {
        livereload: true
      },
      sass: {
        files: [
          src_root+"sass/**/*.scss",
          src_root+"sass/**/_*.scss"
        ],
        tasks: ["compass:debug","copy:debug_css", "copy:debug_img"]
      },
      jade: {
        files: [
          src_root+"jade/**/*.jade",
          "jade_setting.json"
        ],
        tasks: ["jade:debug", "copy:debug_html"]
      },
      js: {
        files: [
          src_root+"js/app/*.js",
          src_root+"js/main.js"
        ],
        tasks: ["jshint", "browserify:debug", "copy:debug_js"]
      }
    },

    pngmin: {
      release: {
        options: {
          force: true,
          ext: ".png"
        },
        files: [
          {
            src: release_root+"img/*.png",
            dest: release_root+"img/"
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-compass");
  grunt.loadNpmTasks("grunt-contrib-jade");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-open");
  grunt.loadNpmTasks("grunt-pngmin");
  grunt.loadNpmTasks("grunt-browserify");

  var debug_compile = [
    "compass:debug",
    "jade:debug",
    "jshint",
    "browserify:debug",
    "copy:debug_favicon",
    "copy:debug_css",
    "copy:debug_js",
    "copy:debug_img",
    "copy:debug_html"
  ];

  var release_compile = [
    "clean",
    "compass:release",
    "jade:release",
    "jshint",
    "browserify:release",
    "copy:release_favicon",
    "copy:release_css",
    "copy:release_js",
    "copy:release_img",
    "copy:release_html",
    "pngmin:release"
  ];
  var watch_tasks = [
    "connect:debug",
    "open:browser",
    "watch"
  ];

  grunt.registerTask("default", debug_compile.concat(watch_tasks));
  grunt.registerTask("release", release_compile);
};
