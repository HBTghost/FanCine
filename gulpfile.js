import gulp from 'gulp';
import sass from 'gulp-sass';

import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import eslint from 'gulp-eslint';

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

gulp.task('watch-scss', () => {
  gulp.watch('public/scss/**/*.scss', gulp.series('sass'));
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
