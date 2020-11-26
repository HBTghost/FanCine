import gulp from 'gulp';
import sass from 'gulp-sass';

import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import eslint from 'gulp-eslint';
import nodemon from 'gulp-nodemon';

import browserSync from 'browser-sync';

const browser = browserSync.create();

gulp.task('nodemon', cb => {
  let started = false;
  return nodemon({
      script: 'server.js'
    }).on('start', () => {
      if (!started) {
        cb();
        started = true; 
      } 
    });
});

gulp.task('serve', gulp.series('nodemon', done => {
  browser.init({
    port: 6969,
    files : './**/*',
    proxy : 'http://localhost:7070',
    watchOptions : {
        ignored : 'node_modules/**',
        ignoreInitial : true
    }
  });

  gulp.watch("public/scss/**/*.scss", gulp.series('sass'));
  done();
}));

gulp.task('sass', () => {
    const processors = [
        autoprefixer,
        cssnano
    ];
    return gulp.src('public/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(gulp.dest('public/css'));
});

gulp.task('lint', () => {
  return gulp.src(['**/*.js', '!node_modules/**'])
  .pipe(eslint(({ useEslintrc: true, fix: true })))
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
});

gulp.task('watch-lint', () => {
  gulp.watch(['**/*.js', '!node_modules/**'], gulp.series('lint'));
});
