const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

const markdownItSup = require("markdown-it-sup");
const markdownIt = require("markdown-it");

module.exports = eleventyConfig => {
    eleventyConfig.addFilter("htmlDateString", dateObj => {
        return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
    });

    eleventyConfig.addFilter("displayDateString", dateObj => {
        return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy.LL.dd");
    });

    eleventyConfig.addPassthroughCopy("css");
    eleventyConfig.addPassthroughCopy("CNAME");

    eleventyConfig.addPlugin(syntaxHighlight);

    eleventyConfig.setDataDeepMerge(true);

    eleventyConfig.setLibrary("md", markdownIt({ html: true, typographer: true })
        .use(markdownItSup));

    return {
        dir: {
            output: "docs"
        }
    };
};