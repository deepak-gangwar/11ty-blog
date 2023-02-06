const { DateTime } = require('luxon');

module.exports = function (eleventyConfig) {
  // Copy the `css` directory to the output
  eleventyConfig.addPassthroughCopy('css');

  // Watch the `css` directory for changes
  eleventyConfig.addWatchTarget('css');

  // lines describe how to add a custom filter to Eleventy
  eleventyConfig.addFilter('readableDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat(
      'dd LLL yyyy'
    );
  });
};