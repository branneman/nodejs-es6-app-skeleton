var fs    = require('fs');
var spawn = require('child_process').spawn;

var gulp     = require('gulp');
var rimraf   = require('gulp-rimraf');
var traceur  = require('gulp-traceur');
var rename   = require('gulp-rename');
var jshint   = require('gulp-jshint');
var mocha    = require('gulp-mocha');
var istanbul = require('gulp-istanbul');

//
// Paths
//
var paths = {
    es6:     'es6-src/**/*.es6',
    es6Src:  'es6-src/**',
    app:     'app/**',
    appJS:   'app/**/*.js',
    appTest: 'app/test/**',
    allJS:   '**/*.{js,es6}',
    testSrc: 'app/test/spec/**/*.js'
};

//
// Meta tasks
//
gulp.task('default', ['clean', 'transpile', 'copy']);
gulp.task('test', ['jshint', 'unittests']);
gulp.task('watch', function() {
    gulp.watch(paths.es6, ['default']);
});

//
// Removes an old app/ directory
//
gulp.task('clean', function() {

    var src = ['app', 'coverage'];

    return gulp.src(src, { read: false })
        .pipe(rimraf());
});

//
// Transpile ES6 › ES5
//
gulp.task('transpile', ['clean'], function() {

    return gulp.src(paths.es6)
        .pipe(traceur())
        .pipe(rename({ extname: '.js' }))
        .pipe(gulp.dest('app'));
});

//
// Copy remaining files to app/
//
gulp.task('copy', ['transpile'], function() {

    var src = [
        paths.es6Src,
        '!' + paths.es6
    ];

    return gulp.src(src)
        .pipe(gulp.dest('app/'));
});

//
// Run JSHint over *.{js,es6} files
//
gulp.task('jshint', function() {

    var src = [
        '!' + paths.app,
        paths.allJS
    ];

    return gulp.src(src)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

//
// Run Mocha and Istanbul
//
gulp.task('unittests', ['default'], function(cb) {

    var appSrc = [
        paths.appJS,
        '!' + paths.appTest
    ];
    var testSrc = paths.testSrc;

    gulp.src(appSrc)
        .pipe(istanbul())
        .on('finish', function() {

            gulp.src(testSrc)
                .pipe(mocha({
                    reporter: 'spec'
                }))
                .pipe(istanbul.writeReports({
                    reporters: ['lcov', 'text-summary']
                }))
                .on('end', cb);
        });
});

//
// Push Istanbul results to Coveralls.io
//
gulp.task('coveralls', ['unittests'], function() {

    var lcov = fs.createReadStream('coverage/lcov.info', { encoding: 'utf8' });
    var coveralls = spawn('node', ['node_modules/coveralls/bin/coveralls']);

    var stream = lcov.pipe(coveralls.stdin);
    coveralls.stdout.pipe(process.stdout);
    coveralls.stderr.pipe(process.stdout);

    return stream;
});
