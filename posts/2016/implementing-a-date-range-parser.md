---
layout: post.njk
title: Implementing a Date Range Parser
date: 2016-11-05
---

Recently, I was tasked with writing an application in C# to scrape a web page on a schedule. Unfortunately, the dates on the web page followed a variety of formats, and there was no easy way to definitively predict which format was going to be used.

To solve this dilemma, I gathered the different formats used in the web page and wrote a component [DateRangeParser.cs](https://gist.github.com/octos4murai/2317bdd4b977744ebbfd314bf1cb9830) to abstract away this date format issue.

DateRangeParser accepts the following formats and returns a start date and end date, as shown below:

| String to Parse | Returned Start Date | Returned End Date |
| --- | --- | --- |
| 19 November - 31 December 2016 | 2016-11-19 | 2016-12-31 |
| 07 December 2016 | 2016-12-07 | 2016-12-07 |
| 12 and 13 December 2016 | 2016-12-12 | 2016-12-13 |
| 01 - 31 January 2017 | 2017-01-01 | 2017-01-31 |

### Sample Usage

```csharp
string dateRangeString = "19 November - 31 December 2016";
ScheduledOutagesDateRangeParser dateRangeParser;

// parsedDates is a list of two dates: start date and end date
List<DateTime> parsedDates = dateRangeParser.ParseDateRangeString(dateRangeString);
return parsedDates;
```

### Implementation

Inspired by machine learning data processing techniques, DateRangeParser begins by creating a word bank and a proximity table.

A word bank is a 1 x n matrix containing each word in the parsed string, where n is the number of words in the string. For example, the string *07 December 2016* has a word bank of size 1 x 3.

A proximity table is an m x n matrix which stores the distance of a word to every other word in the string. Each column i (ranging from 1 to n) corresponds to a word in the string. And each item j in column i (ranging from 1 to m) also corresponds to a word in the string. Therefore, the proximity table for *07 December 2016* is of size 3 x 3 and looks like the following:

| | **07** | **December** | **2016** |
| --- | --- | --- | --- |
| **07** | 0 | 1 | 2 |
| **December** | 1 | 0 | 1 |
| **2016** | 2 | 1 | 0 |

Using the word bank and the proximity table, DateRangeParser looks for all dates (i.e. just the 07 in *07 December 2016*) in the given string. For each date found, the algorithm looks for the nearest month and nearest year and uses this information to form a complete date.

The component returns a list of two dates --- the start date and the end date in that order.

View the entire component [here](https://gist.github.com/octos4murai/2317bdd4b977744ebbfd314bf1cb9830).