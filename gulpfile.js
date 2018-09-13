const gulp = require('gulp');
const eslint = require('gulp-eslint');
 
gulp.task('lint', () => {
    return gulp.src(['./app/*.js','!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
