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
          "source/css/style.min.css": ["source/css/style.css"]
        }
      }
    },

    svgstore: {
      options: {
        includeTitleElement: false
      },
      sprite: {
        files: {
          "source/img/sprite.svg": ["source/img/icon-vk-mobile.svg","source/img/htmlacademy.svg","source/img/icon-insta.svg","source/img/icon-fb.svg"]
        }
      }
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
          src: ["source/*.html"]
        }]
      }
    },

    less: {
      style: {
        files: {
          "source/css/style.css": "source/less/style.less"
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
        src: "source/css/*.css"
      }
    },

    browserSync: {
      server: {
        bsFiles: {
          src: [
            "source/*.html",
            "source/css/*.css"
          ]
        },
        options: {
          server: "source/",
          watchTask: true,
          notify: false,
          open: true,
          cors: true,
          ui: false
        }
      }
    },

    watch: {
      style: {
        files: ["source/less/**/*.less"],
        tasks: ["less", "postcss"]
      }
    }
  });


  grunt.registerTask("default", ["cwebp"]);
  grunt.registerTask("default", ["csso"]);
  grunt.registerTask("default", ["posthtml"]);
  grunt.registerTask("default", ["svgstore"]);
  grunt.registerTask("default", ["imagemin"]);
  grunt.registerTask("serve", ["browserSync", "watch"]);
};
