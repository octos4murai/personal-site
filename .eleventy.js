const { DateTime } = require("luxon");

module.exports = eleventyConfig => {
    eleventyConfig.addFilter("htmlDateString", dateObj => {
        return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
    });

    eleventyConfig.addFilter("displayDateString", dateObj => {
        return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy.LL.dd");
    });

    eleventyConfig.addPassthroughCopy("css");

    eleventyConfig.setDataDeepMerge(true);
};