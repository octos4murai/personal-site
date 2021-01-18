const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = eleventyConfig => {
    eleventyConfig.addFilter("htmlDateString", dateObj => {
        return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
    });

    eleventyConfig.addFilter("displayDateString", dateObj => {
        return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy.LL.dd");
    });

    eleventyConfig.addPassthroughCopy("css");

    eleventyConfig.addPlugin(syntaxHighlight);

    eleventyConfig.setDataDeepMerge(true);
};