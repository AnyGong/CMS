/**
 * Created by AnyGong on 2015/9/8.
 */


var gulp = require('gulp');
var path = require('path');
var fs = require('fs');

var minCss = require('gulp-minify-css');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var header = require('gulp-header');
var autoPrefix = require('gulp-autoprefixer');
var runSequence = require('run-sequence');

// variables
var time = {
    now: new Date(),
    year: new Date().getFullYear(),
    month: (new Date().getMonth() + 1) < 10 ? "0" + (new Date().getMonth() + 1) : (new Date().getMonth() + 1),
    day: new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate(),
    week: new Date().getDay() < 10 ? "0" + new Date().getDay() : new Date().getDay(),
    hours: new Date().getHours() < 10 ? "0" + new Date().getHours() : new Date().getHours(),
    minutes: new Date().getMinutes() < 10 ? "0" + new Date().getMinutes() : new Date().getMinutes(),
    seconds: new Date().getSeconds() < 10 ? "0" + new Date().getSeconds() : new Date().getSeconds(),
    dateFormat: function () {
        return this.year.toString() + "_" + this.month.toString() + this.day.toString() + "_" + this.week + "_" + this.hours.toString() + this.minutes.toString() + this.seconds.toString()
    }
}
var headerBanner = '/*! author: Any.gong releasedTime: ' + time.dateFormat() + '*/\n';


// paths setting
var projectName = 'huango1001';
var appName = 'app/' + projectName;
var distName = 'dist/' + projectName;

// help tasks
gulp.task('style', function () {
    gulp.src(appName + '/styles/main.scss')
        .pipe(sass({outputStyle: 'expanded', sourceMap: false}).on('error', sass.logError))
        .pipe(autoPrefix())
        .pipe(rename('g.css'))
        .pipe(gulp.dest(appName + '/styles/'))
});


gulp.task('clear-distName', function (done) {
    require('del')([
        distName
    ], done);
});

gulp.task('dist-misc', function () {
    return gulp.src([
        appName + '/**/*',
        "!" + appName + '/docs',
        "!" + appName + '/docs/**/*',
        "!" + appName + '/styles/*.scss',
        "!" + appName + '/styles/*.css',
        "!" + appName + '/styles/*.js',
        "!" + appName + '/README.MD',
    ], {
        dot: true
    }).pipe(gulp.dest(distName));
});


gulp.task('dist-styles', ['style'], function () {
    gulp.src(appName + '/styles/g.css')
        .pipe(minCss({
            advanced: false,
            aggressiveMerging: false,
            compatibility: 'ie7',
        }))
        .pipe(header(headerBanner))
        .pipe(gulp.dest(distName + '/styles/'))
});

gulp.task('dist-scripts', function () {
    gulp.src(appName + '/styles/g.js')
        .pipe(uglify())

        .pipe(header(headerBanner))
        .pipe(rename('g.js'))
        .pipe(gulp.dest(distName + '/styles/'))
});

// 压缩项目文件，并进行发布

gulp.task('archive:zip', function (done) {

    var archiveName = path.resolve('archive/' + projectName+'_'+time.dateFormat() + '.zip');
    var archiver = require('archiver')('zip');
    var files = require('glob').sync('**/*.*', {
        'cwd': distName + '/',
        'dot': true
    });
    var output = fs.createWriteStream(archiveName);

    archiver.on('error', function (error) {
        done();
        throw error;
    });

    output.on('close', done);

    files.forEach(function (file) {

        var filePath = path.resolve(distName, file);

        archiver.append(fs.createReadStream(filePath), {
            'name': file,
            'mode': fs.statSync(filePath)
        });

    });

    archiver.pipe(output);
    archiver.finalize();

});

gulp.task('clean:archive', function () {
    require('del')([
        'archive/' + projectName + '.zip'
    ]);
});


gulp.task('archive', function (done) {
    runSequence(['clean:archive'],
        'dist',
        'archive:zip',
        done)
});

gulp.task('watch', function () {
    gulp.watch(appName + '/styles/*.scss', ['style']);
});

gulp.task('dist', ['dist-styles', 'dist-scripts', 'dist-misc']);

gulp.task('build', function () {
    gulp.src('initScss/*.scss')
        .pipe(gulp.dest(appName + "/styles/"));
});