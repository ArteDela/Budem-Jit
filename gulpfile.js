const gulp		 = require('gulp'),
	sass         = require('gulp-sass')(require('sass')),
	browserSync  = require('browser-sync'),//автоматическое обновление браузера
	concat       = require('gulp-concat'),//для сбора файлов
	uglify       = require('gulp-uglify-es').default,//Сжатие JS
	imagemin     = require('gulp-imagemin'),//сжатие картинок
	// autoprefixer = require('gulp-autoprefixer'),// проставляет префиксы
	cleanCSS     = require('gulp-clean-css'),//минификация css
	babel        = require('gulp-babel'),//переписывает современный js на старый
	plumber      = require('gulp-plumber'),//формирует вывод об ошибке
	twig         = require('gulp-twig'),
	// cheerio      = require('gulp-cheerio'),//удаление лишних атрибутов из svg
	path         = require('path'),//пути
	htmlbeautify = require('gulp-html-beautify'), //html файл с отступами и переносами строк
	// svgmin       = require('gulp-svgmin'),
	// webp         = require('gulp-webp'),
	// gcmq         = require('gulp-group-css-media-queries'),//выполняет группировку всех запросов CSS и размещает их в блоке файла стилей
	map          = require('map-stream'),//Потоковая передача данных через map-stream позволяет вам делать с файлом всё что угодно: изменять его содержимое, название, и так далее. 
	header       = require('gulp-header');

// таск для компиляции scss в css
gulp.task('sass', () =>
{
	// let baseDir = process.env.NODE_ENV === "release" ? '"/front/pages/"' : '""';
	return gulp.src('src/assets/scss/style.scss')
		.pipe(sass({includePaths: ['src/']}).on('error', sass.logError))
		.pipe(cleanCSS())
		.pipe(gulp.dest('pages'))
		.pipe(browserSync.reload({stream: true}));
});
// файлы для сборки
let jsFiles =
[
	'src/assets/js/*.js',
	'src/**/*.js'
];
// таск для объединения js файлов
gulp.task('scripts', () =>
{
	return gulp.src(jsFiles)
		.pipe(babel())
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('pages'))
		.pipe(browserSync.reload({stream: true}));
});
const htmlbeautifyOptions = {
	indentSize: 4,
	unformatted: [
		'abbr', 'area', 'b', 'bdi', 'bdo', 'br', 'cite',
		'code', 'data', 'datalist', 'del', 'dfn', 'em', 'embed', 'i', 'ins', 'kbd', 'keygen', 'map', 'mark', 'math', 'meter', 'noscript',
		'object', 'output', 'progress', 'q', 'ruby', 's', 'samp', 'small',
		'strong', 'sub', 'sup', 'template', 'time', 'u', 'var', 'wbr', 'text',
		'acronym', 'address', 'big', 'dt', 'ins', 'strike', 'tt', 'a'
	],
	"indent_level": 1,
	"indent_with_tabs": true,
};

gulp.task('twig', function ()
{
	return gulp.src('./src/*.twig')
		.pipe(plumber())
		.pipe(twig({base:'./src/'}))
		.pipe(htmlbeautify(htmlbeautifyOptions))
		.pipe(gulp.dest("pages",))
		.pipe(browserSync.reload({stream: true}));
});
gulp.task('img', function()
{
	return gulp.src(['src/assets/img/*.png', 'src/assets/img/*.jpg']) // откуда брать картинки
		.pipe(imagemin([imagemin.gifsicle(), imagemin.optipng(), imagemin.svgo() ]))
		.pipe(gulp.dest('pages/image/'))
		.pipe(webp())
		.pipe(gulp.dest('pages/image/'));
});
// таск для обновления страницы
gulp.task('browser-sync', () =>
{
 browserSync({
  server: {baseDir: './pages/'},
  startPath: './index.html',
  serveStaticOptions: {extensions: ["html"] },
  ghostMode: {scroll: false },
  notify: false,
 });
});

// таск следит за изменениями файлов и вызывает другие таски
gulp.task('watch', function()
{
	gulp.watch(['scss/**/*.scss','src/**/*.scss'], gulp.parallel('sass'));
	gulp.watch('src/**/*.twig', gulp.parallel('twig'));
	gulp.watch('src/**/*.twig', gulp.parallel('pages-list'));
	gulp.watch(['src/**/*.js'], gulp.parallel('scripts'));
	gulp.watch('src/**/*.js', gulp.parallel(() =>
	{
		browserSync.reload();
	}));
});
// собирает список сверстанных страниц
gulp.task('pages-list', () =>
{
	let fileList = [];
	let pathSetting = './pages/*.html';
	return gulp.src(pathSetting)
		.pipe(map(function(file, cb)
		{
			let f = file.path.replace(file.cwd, '.');
			fileList.push((f).substr((f).lastIndexOf('/') + 1,(f).lastIndexOf('.') - 1));
			cb(null, null);
		}))
		.on('end', () =>
		{
			gulp.src('./src/pages.twig')
				.pipe(
					twig({
						base:'./src/',
						data: { fileList: fileList }
					})
				)
				.pipe(gulp.dest('./pages/'));
		});
});

// 'sass',
// 'watch',
// 'browser-sync',
// 'twig',
// 'pages-list',
// 'scripts',

// основной таск, который запускает вспомогательные
gulp.task('default', gulp.parallel(() => process.env.NODE_ENV = 'development', 'watch', 'browser-sync', 'sass', 'scripts', 'twig', 'pages-list',  () => console.log('dev start')));









