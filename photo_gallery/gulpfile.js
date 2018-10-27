var _ = require('underscore');
var gulp = require('gulp');
var pump = require('pump');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var cleanCSS = require('gulp-clean-css');

// The setup of all the filest that should be processed
// by the methods created above, all those tasks are
// added to gulp by the _.each sentences found at the bottom
var tasks = {
  min_js: {
    inputFiles: ['./ui/private/js/*.js'],
    filesToWatch: null,
    outputPath: './ui/public/bin/js/',
    taskDefinition: handleJS,
  },
  min_css: {
    inputFiles: ['./ui/private/css/*.css'],
    filesToWatch: null,
    outputPath: './ui/public/bin/css/',
    taskDefinition: handleCSS
  },
  min_js_vendor: {
    inputFiles: [
      './node_modules/jquery/dist/*.min.js',
      './node_modules/jquery.easing/*.min.js',
      './node_modules/bootstrap/dist/js/*.min.js',
      './node_modules/magnific-popup/dist/*.min.js',
      './node_modules/scrollreveal/dist/*.min.js'
    ],
    filesToWatch: null,
    outputPath: './ui/public/bin/js/',
    taskDefinition: handleExternalPackages
  },
  min_css_vendor: {
    inputFiles: [
      './node_modules/bootstrap/dist/css/*.min.css',
      './node_modules/font-awesome/css/*.min.css',
      './node_modules/magnific-popup/dist/*.css',
    ],
    filesToWatch: null,
    outputPath: './ui/public/bin/css/',
    taskDefinition: handleExternalPackages
  },
  min_font_vendor: {
    inputFiles: [
      './node_modules/font-awesome/fonts/*-webfont.*'
    ],
    filesToWatch: null,
    outputPath: './ui/public/bin/fonts/',
    taskDefinition: handleExternalPackages
  }
};

// This function handle the JS files to make them
// understandable for a browser and not readable by humans
function handleJS(isProd, inputFiles, outputPath, callback) {
  var steps = [];
  steps.push(gulp.src(inputFiles));
  steps.push(browserify());
  if (isProd) steps.push(uglify())
  steps.push(rename({ suffix: '.min' }));
  steps.push(gulp.dest(outputPath));
  steps.push(callback);
  pump.apply(null, steps);
}

// This function handle the CSS files to make them
// not readable by humans
function handleCSS(isProd, inputFiles, outputPath, callback) {
  var steps = [];
  steps.push(gulp.src(inputFiles));
  steps.push(cleanCSS({ compatibility: 'ie8' }));
  steps.push(rename({ suffix: '.min' }));
  steps.push(gulp.dest(outputPath));
  steps.push(callback);
  pump.apply(null, steps);
}

// This function handle the external packages only moving the final files
// from one location to our final location, nothing else
function handleExternalPackages(isProd, inputFiles, outputPath, callback) {
  var steps = []
  steps.push(gulp.src(inputFiles));
  steps.push(gulp.dest(outputPath));
  steps.push(callback);
  pump.apply(null, steps);
}

// Register all the above tasks with Gulp
_.each(tasks, function (task, taskName) {
  // The production version of the task is created
  gulp.task(taskName + '_prod',
    task.taskDefinition.bind(null, true, task.inputFiles, task.outputPath));

  // The development version of the task is created
  gulp.task(taskName + '_dev',
    task.taskDefinition.bind(null, false, task.inputFiles, task.outputPath));
});

// Force the execution of all the tasks using the
// production version of the minifier
gulp.task('min_prod', function () {
  _.each(tasks, function (task, taskName) {
    gulp.start(taskName + '_prod');
  });
});

// Force an initial execution of all the tasks and 
// creates a watcher to be reviewing if the source
// files are updated
gulp.task('min_dev', function () {
  _.each(tasks, function (task, taskName) {
    gulp.start(taskName + '_dev');
    if (!task.filesToWatch)
      task.filesToWatch = task.inputFiles;
    gulp.watch(task.filesToWatch, [taskName + '_dev']);
  });
});
