import browserSync from 'browser-sync';

browserSync({
  server: {
    baseDir: ['./build']
  },
  files: [
    './build/**/*.html',
    './build/css/*.min.css',
    './build/js/*.min.js',
    './build/media/img/*',
  ]
});
