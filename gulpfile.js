var browserify = require('browserify'),
    stringify = require('stringify'),
    gulp = require('gulp'),
    rename = require('gulp-rename'),
    nodemon = require('gulp-nodemon'),
    source = require('vinyl-source-stream'),
    sass = require('gulp-sass'),
    clean = require('gulp-clean'),
    Server = require('karma').Server,
    protractor = require('gulp-protractor').protractor;

var paths = {
    tpl: './app/index.html',
    sass: './app/**/*.scss',
    js: './app/**/*.js',
    specs: './app/**/spec.js'
};

var watchOptions =  {interval: 1000, usePolling: true};

gulp.task('bundle-js', function() {

    browserify('./app/index.js',{
        paths: ['./node_modules', './app']
    })
        .transform(stringify, {
            appliesTo: { includeExtensions: ['.html'] },
            minify: true
        })
        .bundle()
        .on('error', function(err){
            console.log(err.toString());
            this.emit('end');
        })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./dist'));

});

gulp.task('copy-html', function() {

    gulp.src(paths.tpl)
        .pipe(gulp.dest('dist'))

});

gulp.task('bundle-css', function () {
  gulp.src('./app/index.scss')
    .pipe(sass().on('error', sass.logError))
   .pipe(rename('style.css'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('build', ['bundle-js', 'bundle-css', 'copy-html']);

gulp.task('watch', ['build'], function() {

    gulp.watch( paths.tpl, watchOptions, ['copy-html'] );
    gulp.watch( paths.sass, watchOptions, ['bundle-css'] );
    gulp.watch( paths.js, watchOptions, ['bundle-js'] );
    gulp.watch( paths.specs, watchOptions, ['test'] );

    nodemon({
        script: './index.js',
        watch: 'index.js',
        legacyWatch: true
    });

});

gulp.task('dev', ['watch']);

gulp.task('clean', function () {
	gulp.src('./dist', {read: false})
		.pipe(clean({force: true}));
});

gulp.task('test-watch', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

gulp.task('e2e', function(){
    gulp.src(["./e2e-tests/**/*.js"])
        .pipe(protractor({
            configFile: "./protractor.conf.js",
            args: ['--baseUrl', 'http://127.0.0.1:8000']
        }))
        .on('error', function(e) { throw e })
});

gulp.task('default', ['build']);
