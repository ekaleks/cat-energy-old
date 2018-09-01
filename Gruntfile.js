"use strict";

module.exports = function(grunt) {
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-browser-sync");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-postcss");
  grunt.loadNpmTasks("grunt-svgstore");
  grunt.loadNpmTasks("grunt-contrib-imagemin");
  grunt.loadNpmTasks("grunt-cwebp");
  grunt.loadNpmTasks("grunt-csso");
  grunt.loadNpmTasks("grunt-juwain-posthtml");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-clean");

  grunt.initConfig({
    imagemin: {
      images: {
        options: {
          optimizationLevel: 3,
          progressive: true
        },
        files: [{
          expand: true,
          src: ["source/img/**/*.{png,jpg,svg}"]
        }]
      }
    },

    cwebp: {
      images: {
        options: {
          q: 90
        },
        files: [{
          expand: true,
          src: ["source/img/**/*.{png,jpg}"]
        }]
      }
    },

    csso: {
      style: {
        options: {
          report: "gzip"
        },
        files: {
          "build/css/style.min.css": ["build/css/style.css"]
        }
      }
    },

    svgstore: {
      options: {
        includeTitleElement: false
      },
      sprite: {
        files: {
          "build/img/sprite.svg": ["source/img/icon-vk-mobile.svg","source/img/htmlacademy.svg","source/img/icon-insta.svg","source/img/icon-fb.svg"]
        }
      }
    },

    copy: {
      build: {
        files: [{
          expand: true,
          cwd: "source",
          src: ["fonts/**/*.{woff2,woff}",
                "img/**.{png,jpg,svg,webp}",
                "js/**.js"
          ],
          dest: "build"
        }]
      }
    },

    clean: {
      build: ["build"]
    },

    posthtml: {
      options: {
        use: [
          require("posthtml-include")()
        ]
      },
      html: {
        files: [{
          expand: true,
          cwd: "source/",
          src: ["*.html"],
          dest: "build/"
        }]
      }
    },

    less: {
      style: {
        files: {
          "build/css/style.css": "source/less/style.less"
        }
      }
    },

    postcss: {
      style: {
        options: {
          processors: [
            require("autoprefixer")()
          ]
        },
        dist: {
          src: "build/css/*.css"
        }
      }
    },

    browserSync: {
      server: {
        bsFiles: {
          src: [
            "build/*.html","build/css/*.css"
          ]
        },
        options: {
          server: "build/",
          watchTask: true
        }
      }
    },

    watch: {
      html: {
        files: ["source/*.html"],
        tasks: ["posthtml"]
      },
      style: {
        files: ["source/less/**/*.less"],
        tasks: ["less","postcss","csso"]
      }
    }
  });

  grunt.registerTask("build", ["imagemin", "cwebp", "clean", "copy", "less", "postcss", "csso", "svgstore", "posthtml" ]);

  grunt.registerTask("serve", ["browserSync", "watch"]);
};
