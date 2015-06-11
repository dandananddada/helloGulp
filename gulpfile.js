 
// Load plugins
var gulp = require('gulp'),
    jade = require('gulp-jade'),
    sass = require('gulp-ruby-sass'),
    coffee = require('gulp-coffee'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    gutil = require('gulp-util'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    webserver = require('gulp-webserver'),
    del = require('del'),
    coffeeStream = coffee({bare: true});

    coffeeStream.on('error', gutil.log);

//html
gulp.task('html', function() {
    return gulp.src("src/*.jade")
        .pipe(jade({ pretty: true}))
        .pipe(gulp.dest('app/'))
        .pipe(livereload())
        .pipe(notify({ message: 'html task complete' }));
}); 

// css
gulp.task('css', function() {
  return sass('src/styles/', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('app/css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css'))
    .pipe(livereload())
    .pipe(notify({ message: 'css task complete' }));
});
 
// js
gulp.task('js', function() {
  return gulp.src('src/scripts/**/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    //.pipe(concat('main.js'))
    .pipe(gulp.dest('app/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(livereload())
    .pipe(notify({ message: 'js task complete' }));
});
 
// Images
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('app/images'))
    .pipe(gulp.dest('dist/images'))
    .pipe(livereload())
    .pipe(notify({ message: 'Images task complete' }));
});

// Clean
gulp.task('clean', function(cb) {
    del(['dist/','app/'], cb)
});
 
 
// Watch
gulp.task('watch', function() {

  //Watch .html files
  gulp.watch('src/**/*.jade', ['html']);

  // Watch .scss files
  gulp.watch('src/styles/**/*.scss', ['css']);
 
  // Watch .js files
  gulp.watch('src/scripts/**/*.js', ['js']);
 
  // Watch image files
  gulp.watch('src/images/**/*', ['images']);
 
  // Create LiveReload server
  livereload.listen();
 
  // Watch any files in dist/, reload on change
  gulp.watch(['app/**']).on('change', livereload.changed);
 
});

//Build
gulp.task('build', ['clean'], function() {
    gulp.start('html','css', 'js', 'images');
});

//Server
gulp.task('server', function() {
  gulp.src('app')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
  gulp.start('watch');
});

// Default task
gulp.task('default', ['build']);