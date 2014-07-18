module.exports = function(src_root, debug_root, release_root){
  return {
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
  }
}
