---
layout: post.njk
title: "Vim Tips: Macros"
date: 2021-02-15
---

While Vim's dot operator allows us to repeat very small chunks of work, Vim macros are the full-fat version. Macros require more work to manage and invoke compared to the dot operator but are many times more powerful and flexible. Like the dot operator, the main benefit of macros is its ability reduce repetition by recording and replaying chunks of work.

Invoking the dot operator is simple; like its name suggests, you simply type `.` in normal mode, repeating the last action. Macros require you to explicitly start recording a chunk of work, which can be composed of many actions. These actions are recorded and invoked under one of the 26 letters of the English alphabet.

To start recording a macro, simply type `q<a-z>`, where the letter following `q` serves as the key used to refer to the macro. You should see an indicator near the bottom of Vim's UI indicating that you are currently recording a macro, along with the key you selected. You would then perform the actions to be recorded as part of the macro, making sure that the actions are *repeatable* across the different sections you intend to run your macro on. To stop recording, press `q` once again.

To invoke a Macro, type `q<a-z><CR>`, where the letter following `q` is the key you selected and <CR> is the carriage return key.

Let me illustrate with an example. Suppose we had the following list of ids, and we want to enclose each one in double-quotes and append a comma after each line:

```text
13454373
46543422
6544443
23432232
89007
```

This scenario is very similar to the one I presented in my previous [post](/posts/2021/vim-tips-the-dot-operator/) on the dot operator. Unlike the previous version, this one is slightly more complex where the change required in each line is composed of several actions.

To perform said change on each of the lines above, we record a macro and do the work for the first line. While positioned somewhere in the first line, do the following:

1. Type `qq` which begins the recording under the letter `q`.
2. Type `0de` taking the cursor to the beginning the line and deleting until the end of the line.
3. Type `i"",<ESC>` inserting the double-quotes and the comma and then going back to normal mode.
4. Type `F"P` noting that `F` and `P` are uppercase. This brings the cursor back to the second double-quote and pastes the contents of the line deleted in step 2.
4. Type `j` moving down to the next line (if available).
5. Type `q` which stops the recording.

At this point, we have successfully recorded the macro we want to run for each subsequent line. We can move on the next line (anywhere will do) and invoke the macro by typing `@q`. This will run the macro once on the current line.

We don't want to retype `@q` for each of the other lines so instead we can type `3@q` which means invoke this macro three times sequentially. It is important to note that what allows us to do this is that we made our macro *repeatable* even when done sequentially.

Specifically, here are the features built into the macro that made it repeatable across different lines:

- Prepending the deletion in step 2 with `0` makes it so it does not matter where we start off on the line.
- Using word-wise movements, like `e`, rather than single character movements makes the macro resilient to little variations across the ids (i.e. the length of the ids).
- Step 4 moves our position to the next line, making it possible to invoke the macro back-to-back.

Macros are an important tool that can drastically improve productivity and reduce repetition. Like the dot operator, they take a bit of foresight and creative thinking to use successfully.