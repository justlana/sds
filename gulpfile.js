var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    inject = require('gulp-inject'),
    injectPartials = require('gulp-inject-partials'),
    wiredep = require('wiredep').stream,
    browserSync = require('browser-sync').create(),
    del = require('del'),
    cssmin = require('gulp-cssmin'),
    imagemin = require('gulp-imagemin');

gulp.task('clean', function(){
  //del(['dist/*.html','dist/css','dist/styles']);
});

gulp.task('index', function () {
  var target = gulp.src('src/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src(['src/**/*.js', './src/**/*.css'], {read: false});

  return target.pipe(inject(sources))
    .pipe(gulp.dest('dist'));
});


gulp.task('styles', function(){
  var injectAppFiles = gulp.src('src/styles/*.scss', {read: false});

  function transformFilepath(filepath) {
    return '@import "' + filepath + '";';
  }

  var injectAppOptions = {
    transform: transformFilepath,
    starttag: '// inject:app',
    endtag: '// endinject',
    addRootSlash: false
  };


  return gulp.src('src/main.scss')
    .pipe(wiredep())
    .pipe(inject(injectAppFiles, injectAppOptions))
    .pipe(sass())
    .pipe(cssmin())
    .pipe(gulp.dest('dist/styles'));

});

gulp.task('watchFiles', function() {
  gulp.watch('src/**/*.scss', ['styles']);
  gulp.watch(['*.html']).on('change', browserSync.reload);
  gulp.watch('assets/js/*.js', ['concatScripts']);
})

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "dist",
            index: "index.html"
        }
    });

});

gulp.task('imagemin', function() {
  gulp.src(['src/img/*.png','src/img/*.jpg', 'src/img/**/*.jpg'])
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img/'));
});


gulp.task('default', ['clean','styles','browser-sync','watchFiles'], function(){
  var injectFiles = gulp.src(['dist/styles/main.css']);

  gulp.watch('src/**/*.scss', ['styles']).on('change', browserSync.reload);
  gulp.watch(['src/*.html', 'src/**/*.html']).on('change', browserSync.reload);

  var injectOptions = {
    addRootSlash: false,
    ignorePath: ['src', 'dist']
  };

  return gulp.src('src/*.html')
    .pipe(inject(gulp.src('.src/js/*.js', {read: false}), {relative: true}))
    .pipe(inject(injectFiles, injectOptions))
    .pipe(injectPartials())
    .pipe(gulp.dest('dist'));


});
