const { DateTime } = require('luxon');
const blocksToHtml = require('@sanity/block-content-to-html');
const htmlmin = require('html-minifier');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const rssPlugin = require('@11ty/eleventy-plugin-rss');

module.exports = function (eleventyConfig) {
  // Fucking ignore the node modules inside sanity
  eleventyConfig.ignores.add('sanity/node_modules/**');

  // Used in social sharing feature
  // eleventyConfig.addGlobalData("rootURL", "https://www.11ty.deepakgangwar.me");

  // Copy the `css` directory to the output
  // eleventyConfig.addPassthroughCopy('css');
  // commented this because now I am using multiple css files and import syntax
  // Thus using nunjucks to create my styles.css file

  eleventyConfig.addPassthroughCopy('src/assets');
  eleventyConfig.addPassthroughCopy('src/js');

  // Watch the `css` and 'js' directory for changes
  eleventyConfig.addWatchTarget('src/css');
  eleventyConfig.addWatchTarget('src/js');

  // Prism.js plugin for syntax highlighting in coder's block
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(rssPlugin);

  // To minify HTML
  eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
    if (outputPath && outputPath.endsWith('.html')) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }

    return content;
  });

  // lines describe how to add a custom filter to Eleventy
  eleventyConfig.addFilter('readableDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('dd LLL yyyy');
  });

  // To be used in providing reading time for articles
  eleventyConfig.addFilter('numCommas', function (value) {
    return value.toLocaleString();
  });

  eleventyConfig.addFilter('sanityToHTML', function (value) {
    return blocksToHtml({
      blocks: value,
    });
  });

  // RFC 822 Date for rss feed
  eleventyConfig.addFilter('buildRFC822Date', function (dateString) {
    // add a leading 0 to a number if it is only one digit
    function addLeadingZero(num) {
      num = num.toString();
      while (num.length < 2) num = "0" + num;
      return num;
    }

    const dayStrings = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthStrings = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const timeStamp = Date.parse(dateString);
    const date = new Date(timeStamp);

    const day = dayStrings[date.getDay()];
    const dayNumber = addLeadingZero(date.getDate());
    const month = monthStrings[date.getMonth()];
    const year = date.getFullYear();
    const time = `${addLeadingZero(date.getHours())}:${addLeadingZero(date.getMinutes())}:00`;
    const timezone = date.getTimezoneOffset() === 0 ? "GMT" : "BST";

    //Wed, 02 Oct 2002 13:00:00 GMT
    return `${day}, ${dayNumber} ${month} ${year} ${time} ${timezone}`;
  })

  // Set up input and output folders
  return {
    dir: {
      input: "src",
      // includes: "_includes",
      output: "_site"
    },
    templateFormats: ['md', 'njk'],
    dataTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
};
