---
layout: post.njk
title: "Vim Tips: Editing as Super User"
date: 2021-05-09
---

On machines I manage, I often need to edit system-level configuration files in Vim. This operation requires elevated privileges, which means performing the operation as super user.

### The obvious way

The obvious way to edit files as super user using Vim is to simply invoke it with sudo:

```bash
$ sudo vim
```

However, this approach has a couple drawbacks:

1. It requires foresight. Users may not always know prior to launching Vim whether they will need to edit a file as super user.
2. Opening Vim as super user means your user-level Vim configuration (in `~/.vimrc`) is not read. This means the settings, shortcuts, functions, etc. in your configuration will not be around when you use Vim.

### My preferred approach

A popular solution that works well for me is to open Vim normally as a regular user, make my edits, and then save using the following command:

```bash
:w !sudo tee %
```

Let's dissect this to understand why it works. Here are the components of that command along with what they do:

1. `:w`

    `:w` is the standard way to save the contents of your current Vim buffer to a file. It is comparable to the keyboard shortcut `<Control-s>` in many GUI applications. To specify the name of the file in which to save the contents of the current buffer, indicate the file name after the command like this:

```bash
:w sample-file
```

2. `!`

    The `!` is used to indicate a shell command in Vim. In the case above, the `!` tells Vim that what follows needs to be run in a shell. For example, the following command in Vim opens a shell and lists the contents of the current directory:

```bash
!ls
```

3. `tee`
 
   `tee` is a Unix command that expects a value to be passed in through standard input and does two things with that value --- (a) write it to one or more files and (b) print it to standard output. It is named after a type of plumbing pipe which splits water into two directions.

    For instance, this shell command writes "Hello World" to files `foo` and `bar` and to standard ouput:

```bash
$ echo "Hello World" | tee foo bar
```

4. `%`

    Lastly, `%` is a special register in Vim that contains the file path (including name) related to the current buffer. For instance if we are currently editing a file named "sample-file", that would be the value in `%`.

Putting everything together, the `:w` command passes the contents of the current Vim buffer to a shell command starting with `!`. That shell command takes the given value and writes it to the file with the given name (the file corresponding to the current open buffer). The command is able to write it because it is run with sudo privileges.

Since `tee` always writes to one or more files plus standard output, the command above always writes to standard output. We can avoid writing to standard output if we want by redirecting standard output to `/dev/null` but this is not required:

```bash
:w !sudo tee % &>/dev/null

```

### TL/DR

Although a little cryptic for beginners, the Vim command discussed in this post allows users to save to a file in Vim as super user. It requires no foresight that `sudo` is required and allows the user to use their individual Vim settings (through `vimrc`).
