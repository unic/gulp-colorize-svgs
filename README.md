# gulp-colorize-svgs

Replaces the ```fill``` attribute value of an SVG with one or several predefined colors and adds the new files to the stream. The original file is removed from the stream.

Word of caution: If an SVG does not have a ```fill``` attribute, the default ```option.replaceColor``` function won't find anything to replace. In this case you should probably add [cheerio](http://npmjs.com/package/cheerio) to the mix.


## Usage

First, install `gulp-colorize-svgs` as a development dependency:

```shell
npm install --save-dev gulp-colorize-svgs@git+https://git@github.com/unic/gulp-colorize-svgs.git
```

Then, add it to your `gulpfile.js`:

```javascript
var colorize = require('gulp-colorize-svgs');

gulp.task('html', function(){
  gulp.src(['app/icons/*.svg'])
    .pipe(colorize({
      colors: {
        "default": {
          "blue": "0000ff",
          "red": "ff0000"
        },
        "icon2": {
          "green": "00ff00"
        }
      },
      replaceColor: function(content, hex) {
        return content.replace(/fill="#(.*?)"/g, 'fill="#' + hex + '"');
      },
      replacePath: function(path, colorKey) {
        return path.replace(/\.svg/, '--' + colorKey + '.svg');
      }
    }))
    .pipe(gulp.dest('dist/icons/'));
});
```


## Options

### options.colors
Type: `Object`

Colors to use. Key corresponds to icon name, "default" property is used as a fallback for unspecified icons.

### options.replaceColor
Type: `Function`

SVG transformation function. Replacing every occurrence of a ```fill``` attribute by default.

### options.replacePath
Type: `Function`

Transformation function for the new icon's file name. Adding ```--[colorKey]``` by default.
