var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    inject = require('gulp-inject'),
    injectPartials = require('gulp-inject-partials'),
    wiredep = require('wiredep').stream,
    browserSync = require('browser-sync').create(),
    del = require('del'),
    cssmin = require('gulp-cssmin');

gulp.task('clean', function(){
  del(['dist']);
});


gulp.task('styles', function(){
  var injectAppFiles = gulp.src('src/styles/*.scss', {read: false});
  var injectGlobalFiles = gulp.src('src/global/*.scss', {read: false});

  function transformFilepath(filepath) {
    return '@import "' + filepath + '";';
  }

  var injectAppOptions = {
    transform: transformFilepath,
    starttag: '// inject:app',
    endtag: '// endinject',
    addRootSlash: false
  };

  var injectGlobalOptions = {
    transform: transformFilepath,
    starttag: '// inject:global',
    endtag: '// endinject',
    addRootSlash: false
  };

  return gulp.src('src/main.scss')
    .pipe(wiredep())
    .pipe(inject(injectGlobalFiles, injectGlobalOptions))
    .pipe(inject(injectAppFiles, injectAppOptions))
    .pipe(sass())
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('watchFiles', function() {
  gulp.watch('src/**/*.scss', ['styles']);
  //gulp.watch(['*.html', '*.php']).on('change', browserSync.reload);
  //gulp.watch('assets/js/*.js', ['concatScripts']);
})

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "dist",
            index: "index.html"
        }
    });

});


gulp.task('default', ['clean','styles','browser-sync','watchFiles'], function(){
  var injectFiles = gulp.src(['dist/styles/main.css']);

  gulp.watch('src/**/*.scss', ['styles']).on('change', browserSync.reload);
  gulp.watch(['*.html']).on('change', browserSync.reload);

  var injectOptions = {
    addRootSlash: false,
    ignorePath: ['src', 'dist']
  };

  return gulp.src('src/*.html')
    .pipe(inject(injectFiles, injectOptions))
    .pipe(injectPartials())
    .pipe(gulp.dest('dist'));


});
