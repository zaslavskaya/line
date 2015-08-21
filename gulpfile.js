var gulp = require('gulp'),
    minifyCss = require('gulp-minify-css'),
    notify = require("gulp-notify"),
    autoprefixer = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    jade = require('gulp-jade'),
    prettify = require('gulp-prettify'),
    rename = require("gulp-rename");

//подключение локального сервера
gulp.task('connect', function() {
  connect.server({
    root: 'app', //папка, в которой проект
    livereload: true
  });
});

//задачи для jade
gulp.task('templates', function() {
  var YOUR_LOCALS = {};  //хз что єто
 
  gulp.src('app/markups/*.jade') //путь к файлу jade
    .pipe(jade({
      locals: YOUR_LOCALS  // хз что это
    }))
    .pipe(rename('index.html')) //как перименовать после действия
    .pipe(gulp.dest('app/')) //куда сохранять
});


//задачи для html
gulp.task('html', function () {
	gulp.src('app/index.html') //путь к папке с файлами html
      .pipe(prettify({indent_size: 2})) //prettify
      .pipe(gulp.dest('app/'))
		  .pipe(connect.reload()); //перезагрузка при изменениях

})

//задачи для sass
gulp.task('sass', function () {
  gulp.src('app/styles/main.scss') //адрес папки с scss
    .pipe(sass().on('error', sass.logError)) 
    .pipe(gulp.dest('app/styles/css/')) //куда сохранять скомпилированное

    .pipe(connect.reload());
});

//задачи для css
gulp.task('css', function() {
  gulp.src('app/styles/*.css') //путь к папке с файлами сss
    .pipe(autoprefixer({
      browsers: ['last 12 versions', 'ie 8'], //для каких браузеров префиксы
      cascade: false
    }))  
    .pipe(minifyCss('')) //минификация
    .pipe(rename('main.min.css')) //как перименовать после действия
    .pipe(gulp.dest('app/styles/css/')) //куда сохранить после действия
    .pipe(notify('DONE IT!')) //всплывающая заметка
     .pipe(connect.reload()); //перезагрузка при изменениях
}); 

//слежка
 gulp.task('watch', function () {
       gulp.watch('app/styles/*.scss', ['sass'])
       gulp.watch('app/styles/*.css', ['css'])
       gulp.watch('app/markups/*.jade', ['templates'])
       gulp.watch('app/index.html', ['html'])
 })  

//по умолчанию слежка и открытие подключение к серверу
gulp.task('default', ['connect', 'templates', 'html' , 'sass', 'css', 'watch']);