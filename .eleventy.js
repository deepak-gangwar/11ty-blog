const { DateTime } = require('luxon');
const blocksToHtml = require('@sanity/block-content-to-html');
const htmlmin = require("html-minifier");


module.exports = function (eleventyConfig) {
  // Fucking ignore the node modules inside sanity
  eleventyConfig.ignores.add("sanity/node_modules/**");

  // Used in social sharing feature
  // eleventyConfig.addGlobalData("rootURL", "https://www.11ty.deepakgangwar.me");
  
  // Copy the `css` directory to the output
  // eleventyConfig.addPassthroughCopy('css');
  // commented this because now I am using multiple css files and import syntax
  // Thus using nunjucks to create my styles.css file

  eleventyConfig.addPassthroughCopy('assets');
  eleventyConfig.addPassthroughCopy('js');

  // Watch the `css` and 'js' directory for changes
  eleventyConfig.addWatchTarget('css');
  eleventyConfig.addWatchTarget('js');

  // To minify HTML
  eleventyConfig.addTransform("htmlmin",  function(content,  outputPath) {
    if(outputPath && outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }
    
    return content;
  });

  // lines describe how to add a custom filter to Eleventy
  eleventyConfig.addFilter('readableDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat(
      'dd LLL yyyy'
    );
  });

  // To be used in providing reading time for articles
  eleventyConfig.addFilter("numCommas", function(value) {
		return value.toLocaleString()
	});

  eleventyConfig.addFilter('sanityToHTML', function(value) {
    return blocksToHtml({
      blocks: value,
    });
  });

  // Set up input and output folders
  return {
    dir: { 
      // input: "src", 
      // includes: "_includes", 
      // output: "_site"
    },
    templateFormats: ['md', 'njk'],
    dataTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  }
};