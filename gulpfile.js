// Load plugins
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var purify = require('gulp-purifycss');

gulp.task('images', function() {
    return gulp.src(['./assets/images/**/*', './assets/rs-plugin/assets/**/*'])
        .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', function() {
    return gulp.src('assets/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('styles', function () {
    return gulp.src([
            './assets/css/font-awesome.min.css',
            './assets/css/bootstrap.css',
            './assets/css/screen.css',
            './assets/rs-plugin/css/settings.css',
            './assets/rs-plugin/css/layers.css',
            './assets/rs-plugin/css/navigation.css',
        ])
        .pipe(purify(['dist/index.html', 'dist/scripts/bundle.min.js']))
        .pipe(concat('styles.css'))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('dist/styles'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/styles'))
        .pipe(notify({message: 'Styles task complete'}));
});

gulp.task('scripts', function () {
    return gulp.src([
            './assets/js/jquery-3.4.1.min.js',
            './assets/js/modernizr.js',
            './assets/js/nouislider.js',
            './assets/rs-plugin/js/jquery.themepunch.tools.min.js',
            './assets/rs-plugin/js/jquery.themepunch.revolution.min.js',
            './assets/rs-plugin/js/extensions/revolution.extension.video.min.js',
            './assets/rs-plugin/js/extensions/revolution.extension.slideanims.min.js',
            './assets/rs-plugin/js/extensions/revolution.extension.actions.min.js',
            './assets/rs-plugin/js/extensions/revolution.extension.layeranimation.min.js',
            './assets/rs-plugin/js/extensions/revolution.extension.kenburn.min.js',
            './assets/rs-plugin/js/extensions/revolution.extension.navigation.min.js',
            './assets/rs-plugin/js/extensions/revolution.extension.migration.min.js',
            './assets/rs-plugin/js/extensions/revolution.extension.parallax.min.js',
            './assets/js/imagesloaded.pkgd.min.js',
            './assets/js/jquery.magnific-popup.min.js',
            './assets/js/isotope.js',
            './assets/js/slick.js',
            './assets/js/options.js',
        ])
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('dist/scripts'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(notify({message: 'Scripts task complete'}));
});

// Default task
gulp.task('default', function (done) {
    gulp.series('scripts', 'styles', 'images', 'fonts')(() => done());
});