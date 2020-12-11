import gulp from 'gulp';
import sass from 'gulp-sass';

import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import eslint from 'gulp-eslint';
import sassLint from 'gulp-sass-lint';
import nodemon from 'gulp-nodemon';
import browserSync from 'browser-sync';
import eslintIfFixed from 'gulp-eslint-if-fixed';
import babel from 'gulp-babel';
import minify from 'gulp-minify';

const browser = browserSync.create();

gulp.task('nodemon', (cb) => {
  let started = false;
  return nodemon({
    script: 'server.js',
    execMap: {
      js: 'node --experimental-modules  --experimental-json-modules',
    },
  }).on('start', () => {
    if (!started) {
      cb();
      started = true;
    }
  });
});

gulp.task(
  'serve',
  gulp.series('nodemon', (done) => {
    browser.init({
      port: 6969,
      files: './**/*',
      proxy: 'http://localhost:7070',
      watchOptions: {
        ignored: 'node_modules/**',
        ignoreInitial: true,
      },
    });

    gulp.watch('public/scss/**/*.scss', gulp.series('compileSCSS', 'lint-sass'));
    gulp.watch('public/njs/**/*.js', gulp.series('compileJS'));
    gulp.watch(['**/*.js', '!node_modules/**', '!public/js/**/*.js'], gulp.series('lint-js-fix'));
    done();
  }),
);

gulp.task('compileSCSS', () => {
  const processors = [autoprefixer, cssnano];
  return gulp
    .src('public/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulp.dest('public/css'));
});

gulp.task('lint-js-fix', () => gulp
  .src(['**/*.js', '!node_modules/**', '!public/js/**/*.js'])
  .pipe(eslint({ useEslintrc: true, fix: true }))
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
  .pipe(eslintIfFixed('./')));

gulp.task('compileJS', () => gulp.src('public/njs/**/*.js').pipe(babel()).pipe(minify()).pipe(gulp.dest('public/js')));

gulp.task('lint-js', () => gulp
  .src(['**/*.js', '!node_modules/**', '!public/js/**/*.js'])
  .pipe(eslint({ useEslintrc: true }))
  .pipe(eslint.format())
  .pipe(eslint.failAfterError()));

gulp.task('lint-sass', () => gulp
  .src('public/scss/**/*.scss')
  .pipe(sassLint({ configFile: '.sass-lint.yml' }))
  .pipe(sassLint.format())
  .pipe(sassLint.failOnError()));
