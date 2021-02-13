---
layout: post.njk
title: "Vim Tips: The Dot Operator"
date: 2021-02-13
---

Conventional editors have conditioned us to think about the act of editing text in certain ways:

- Files are opened, modified, and eventually saved to preserve progress.
- The mouse is heavily-used to navigate across the text.
- Some sort of panel containing a file structure can be found usually on the side. A mouse-click takes you to another file.
- Making repetitive modifications to text usually involves a lot of copy-paste --- and often a lot of patience.

While each of the items above make sense within the patterns provided by conventional editors, they don't quite fit with the way Vim was designed to be used. In fact, each of these conventions are challenged by Vim. And while one can certainly use Vim while sticking to these conventions, much of Vim's efficiency and convenience is unlocked only by progressively rethinking these conventions.

One of the tools Vim provides is the dot operator and is invoked by typing `.` while in normal mode. Put simply, the dot operator repeats the last action performed. While it is certainly worth digging into what exactly makes up an action, I won't do so here. Instead, I prefer to show a couple of examples.

Suppose we have the following list of ids and we want to ensure each line ends in a comma, except for the final one. I often encounter this type of task in the real world where I am given a list of ids to investigate, and I need to plug the ids into an SQL query's `WHERE-IN` clause:

```text
13454373
46543422
65444439
23432232
89007851
```

Outside of Vim, the user may need to make use of a feature like multi-row edit to get something like this done. More often though, inexperienced users will manually traverse each line to make the change. In Vim, we need only do the work on the first line. While the cursor is anywhere on the first line, typing `A,\<ESC\>` will do the job. Then move down to each subsequent line (anywhere within the line is fine) and invoke the dot operator to repeat the change.

Using the dot operator takes a little bit of planning. Specifically, we need to make sure the action we make is *repeatable*. In the previous example, notice that we used `A` instead of `i` or `a`. Doing so ensures that wherever we land on a line, the dot operator will always append the comma on the very end of that line.

In this next example, we see a poorly-indented JavaScript snippet. We want to indent each highlighted line as needed to improve readability:

```javascript/1-4
const obj = {
foo(y) {
let x = y * y;
console.log(x);
}
};

obj.foo(5)
```

Knowing that we have the dot operator in our back pocket, we can go anywhere in the first highlighted line and press `>>` to indent. Then we simply traverse to each other highlighted line and invoke the dot operator one or more times to get the indentation we want.

In [Practical Vim](https://www.goodreads.com/book/show/13607232-practical-vim), Drew Neil describes Vim's dot operator as a miniature macro, or a "micro". I think this is a clever way to think about the dot operator.

Other than the dot operator itself, the key thing I want to illustrate is how Vim encourages users to buy into its abstractions and conventions. Since these conventions are very different from other editors, it is normal for newbies to feel some hesitancy about this. But by making the leap, we take a giant step towards increased efficiency and productivity in Vim.