var gulp = require('gulp'),
    bs = require('browser-sync').create(),
    prefix = require('gulp-autoprefixer'),
    sass = require('gulp-sass');

gulp.task('browser-sync', function() {
  bs.init({
    server: {
      baseDir: "./"
    },
    port: 8000,
    browser: "firefox"
  });
});

gulp.task('sass', function() {
  return gulp.src('scss/*.scss')
    .pipe(sass())
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(gulp.dest('css'))
    .pipe(bs.reload({stream: true}));
});

gulp.task('watch', ['browser-sync'], function() {
  gulp.watch("scss/*.scss", ['sass']);
  gulp.watch("*.html").on('change', bs.reload);
});

gulp.task('default', ['browser-sync','sass','watch']);
