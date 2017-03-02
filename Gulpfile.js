var gulp = require('gulp');
var coffee = require('gulp-coffee');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var chalk = require('chalk');
var browserSync = require('browser-sync').create();

gulp.task('default', function () {

  // File watching
  console.log(chalk.green.inverse(' Watching ') + chalk.inverse.bold(' for ') + chalk.inverse.red('changes...'));

  // Watch files and call tasks
  // gulp.watch('./coffee/**/*.coffee', ['coffee']);
  gulp.watch('./sass/**/*.sass', ['sass']);
  gulp.watch('./src/*.html', ['reload']);
  gulp.watch('./src/js/*.js', ['reload']);


  // BrowserSync init :)
  browserSync.init({
      server: {
          baseDir: "./src/",
          proxy: 'mylocal.dev'
      }
  });
});

// Convert CoffeeScript to JavaScript
// gulp.task('coffee', function() {
//   gulp.src('./coffee/*.coffee')
//     .pipe(coffee({bare: true}).on('error', gutil.log))
//     .pipe(gulp.dest('./src/js/'));
//     browserSync.reload()
//     console.log( chalk.yellow.inverse.bold('Coffescript ') + chalk.inverse('updated') );
// });

// Convert SASS to CSS
gulp.task('sass', function () {
  gulp.src('./sass/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/css'))
    .pipe(browserSync.stream());
    console.log( chalk.yellow.inverse.bold('Sass ') + chalk.inverse('updated') );
});

// Reload the webpage
gulp.task('reload', function() {
  browserSync.reload();
});
