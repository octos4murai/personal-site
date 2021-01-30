---
layout: post.njk
title: A Classic Case of Simpson's Paradox
date: 2016-10-27
---

I was introduced to Simpson's Paradox at an introductory statistics course in university. I found the concept particularly insightful, and it has stuck with me since. To illustrate Simpson's Paradox, here is a classic example.

In 1973, University of California, Berkeley was sued for an apparent gap in the acceptance rate of men and women in their graduate school admissions ([Bickel](http://homepage.stat.uiowa.edu/~mbognar/1030/Bickel-Berkeley.pdf) et al., 1975)

| | Applications | Admitted |
| --- | --- | --- |
| Men | 8442 | <span class="green-text">44%</span> |
| Women | 4321 | <span class="red-text">35%</span> |


The number of male applicants was double the number of female applicants, and there seemed to be a large deficit in the proportion of women admitted.

Upon breaking the data down into individual departments however, a different pattern seemed to arise.

| Department | Men Applied | Men Admitted | Women Applied | Women Admitted |
| --- | --- | --- | --- | --- |
| A | 825 | <span class="red-text">62%</span> | 108 | <span class="green-text">82%</span> |
| B | 560 | <span class="red-text">63%</span> | 25 | <span class="green-text">68%</span> |
| C | 325 | <span class="green-text">37%</span> | 593 | <span class="red-text">34%</span> |
| D | 417 | <span class="red-text">33%</span> | 375 | <span class="green-text">35%</span> |
| E | 191 | <span class="green-text">28%</span> | 393 | <span class="red-text">24%</span> |
| F | 373 | <span class="red-text">6%</span> | 341 | <span class="green-text">7%</span> |

The breakdown reveals that the proportion of admitted applicants was actually very close to equal --- in fact, [Bickel](http://homepage.stat.uiowa.edu/~mbognar/1030/Bickel-Berkeley.pdf) et al. claim that the data even showed a "small but statistically significant bias in favor of women."

The reason for the discrepancy: female applicants seemed to apply disproportionately to faculties with low admission rates (e.g. Arts and Humanities). On the other hand, more men applied to faculties with higher admission rates (e.g. Science and Engineering).

This disappearance (or reversal) of a trend upon combining or breaking apart groups is known as Simpson's Paradox.

While Simpson's Paradox has been studied for decades and has essentially been solved (see this answered [question](http://stats.stackexchange.com/questions/78255/how-to-resolve-simpsons-paradox) from Stack Exchange), the public can many times seem defenseless against the unethical manipulation of data using statistics to spread misinformation and advance various agenda.

Just another reminder to maintain a healthy level of skepticism and unbelief, especially when faced with extraordinary claims.

{% include section-divider.njk %}

### References

- [Sex Bias in Graduate Admissions: Data from Berkeley](http://homepage.stat.uiowa.edu/~mbognar/1030/Bickel-Berkeley.pdf)
- [Stack Exchange](http://stats.stackexchange.com/questions/78255/how-to-resolve-simpsons-paradox)
- [Statistics](https://www.amazon.ca/Statistics-David-Freedman/dp/0393929728)
- [Wikipedia](https://en.wikipedia.org/wiki/Simpson's_paradox)