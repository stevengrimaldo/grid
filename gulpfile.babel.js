import gulp from 'gulp';
import rename from 'gulp-rename';
import assemble from 'assemble';
import handlebarsHelpers from 'handlebars-helpers';
import prettify from 'gulp-prettify';

const app = assemble();

const options = {
  locale: 'en-GB',
  assets: './build/media/img/'
};

gulp.task('html', () => {
  // Find layouts and partials
  app.layouts('./src/hbs/layouts/**/**/*.hbs');
  app.partials('./src/hbs/components/**/**/*.hbs');

  // Add data
  app.data('./src/hbs/json/**/**/*.json');
  app.data({ imagePath: './build/media/img/' });
  app.data({ name: 'Site' });

  // Add classic helpers
  app.helpers(handlebarsHelpers(), app.helpers);

  // Add options
  app.option('layout', 'default.hbs');

  // Build templates
  return app.src('./src/hbs/pages/*.hbs')
    .pipe(app.renderFile(options))
    .pipe(rename({ extname: '.html' }))
    .pipe(prettify({ indent_size: 2 }))
    .pipe(app.dest('./build/'));
});

gulp.task('watch', () => {
  gulp.watch('./src/hbs/**/**/**/*.{hbs,json}', ['html']);
});
