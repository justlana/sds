var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    inject = require('gulp-inject'),
    injectPartials = require('gulp-inject-partials'),
    wiredep = require('wiredep').stream,
    browserSync = require('browser-sync').create(),
    del = require('del'),
    cssmin = require('gulp-cssmin'),
    reload = browserSync.reload;

gulp.task('clean', function(){
  //del(['dist']);
});

gulp.task("concatScripts", function() {
    return gulp.src([
        'assets/js/vendor/jquery-3.2.1.slim.min.js',
        'assets/js/vendor/popper.min.js',
        'assets/js/vendor/bootstrap.min.js',
        'assets/js/functions.js'
        ])
    .pipe(maps.init())
    .pipe(concat('main.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('assets/js'))
    .pipe(browserSync.stream());
});

gulp.task("minifyScripts", ["concatScripts"], function() {
  return gulp.src("assets/js/main.js")
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest('dist/assets/js'));
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



gulp.task('browser-sync', function() {
    browserSync.init({

        server: {
            baseDir: "dist",
            files: "src/*.html"

        }
    });

});


gulp.task('default', ['clean','styles','browser-sync','watchFiles'], function(){
  var injectFiles = gulp.src(['dist/styles/main.css']);

  var injectOptions = {
    addRootSlash: false,
    ignorePath: ['src', 'dist']
  };

  return gulp.src('src/*.html')
    .pipe(inject(injectFiles, injectOptions))
    .pipe(injectPartials())
    .pipe(gulp.dest('dist'));


});

gulp.task('watchFiles', function() {
  gulp.watch('src/**/*.scss', ['styles']);
  gulp.watch(['src/*.html','src/**/**.html']).on('change', browserSync.reload);
  //gulp.watch('assets/js/*.js', ['concatScripts']);
})

// Watch scss AND html files, doing different things with each.
gulp.task('serve', function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });

    gulp.watch(['src/*.html','src/**/**.html']).on('change', reload);
});
