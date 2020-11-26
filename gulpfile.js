import gulp from 'gulp';
import sass from 'gulp-sass';

gulp.task('sass', function() {
  return gulp.src('public/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('public/css'));
});

gulp.task('watch-scss', function() {
  gulp.watch('public/scss/**/*.scss', gulp.series('sass')); 
});