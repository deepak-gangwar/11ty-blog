const { DateTime } = require('luxon');
const blocksToHtml = require('@sanity/block-content-to-html');


module.exports = function (eleventyConfig) {
  // Fucking ignore the node modules inside sanity
  eleventyConfig.ignores.add("sanity/node_modules/**");
  
  // Copy the `css` directory to the output
  eleventyConfig.addPassthroughCopy('css');

  eleventyConfig.addPassthroughCopy('assets');

  // Watch the `css` directory for changes
  eleventyConfig.addWatchTarget('css');

  // lines describe how to add a custom filter to Eleventy
  eleventyConfig.addFilter('readableDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat(
      'dd LLL yyyy'
    );
  });

  eleventyConfig.addFilter('sanityToHTML', function(value) {
    return blocksToHtml({
      blocks: value,
    });
  });
};