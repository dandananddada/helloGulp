
// Load plugins
var gulp = require('gulp'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    neat = require('node-neat').includePaths,
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
    coffeeStream = coffee({bare: true}),
    jasmine = require('gulp-jasmine');
    coffeeStream.on('error', gutil.log);

// HTML
gulp.task('html', function() {
    return gulp.src("src/*.jade")
        .pipe(jade({ pretty: true}))
        .pipe(gulp.dest('app/'))
        .pipe(livereload())
        .pipe(notify({ message: 'html task complete' }));
}); 

// CSS
gulp.task('css', function() {
  return gulp.src(['src/styles/*.sass','src/styles/*.scss'])
        .pipe(sass({ includePaths: ['styles'].concat(neat) }))
        .pipe(gulp.dest('app/css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css'))
        .pipe(livereload())
        .pipe(notify({ message: 'css task complete' }));
});
 
// JS
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
    del(['dist/','app/', 'spec/'], cb)
});
 
 
// Watch
gulp.task('watch', function() {

  //Watch .html files
  gulp.watch('src/**/*.jade', ['html']);

  // Watch .scss files
  gulp.watch(['src/styles/**/*.scss','src/styles/**/*.sass'], ['css']);
 
  // Watch .js files
  gulp.watch('src/scripts/**/*.coffee', ['js']);
 
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

gulp.task('test', function () {
  return gulp.src('src/test/**/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('spec'))
    .pipe(jasmine());
});

gulp.task('tdd', function(){
  gulp.watch(['src/scripts/**/*.coffee','src/test/**/*.coffee'], ['test']);
});

//Server
gulp.task('server', function() {
  gulp.src('app')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
  gulp.start('build','watch');
});

// Default task
gulp.task('default', ['build']);
