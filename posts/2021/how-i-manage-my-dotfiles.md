---
layout: post.njk
title: "How I Manage My Dotfiles"
date: 2021-04-28
---

### What are dotfiles?

Dotfiles are the conventional way to manage user application preferences on Unix-like systems. They are simple text files read by a user's applications, usually on application start up. The name "dotfiles" itself is derived from the fact that these files begin with a "." (e.g. `.bash_profile`, `.vimrc`, etc.), in effect also making them hidden files.

Since dotfiles are in plain-text, they are universally easy to read and modify. But also they are highly-portable. By copying over a user's dotfiles to the expected location on an otherwise new file system, the user instantly has access to their application preferences.

To illustrate, suppose I am a user that is accustomed to the following custom bash function `mcd`:

```bash
function mcd() {
    mkdir -p "$@" && cd "$_"
}
```

The `mcd` function is a shorthand that combines the `mkdir` and `cd` commands. It allows a user to create a directory (recursively, if needed) and move to that directory in a single step.

By putting the snippet above into a text file with a name that Bash looks for and placing the file in a location on a new system where Bash expects to find such a file, this function becomes available to me in Bash on the new system.

Dotfile management, like the dotfiles themselves, tend to vary widely between individuals. In this post, I intend to describe the simple method that works for me.

### Managing my dotfiles

My dotfile management strategy has three components:

1. A custom shell script I created called `dotfiles`,
2. My actual dotfiles (e.g. `.bashrc`, `.gitconfig`, `.vimrc`, etc.), and
3. A plain-text configuration file that describes which dotfiles I want to include.

I will describe my typical workflow in setting up a brand new environment with my dotfiles. Along the way, I will flag how each of the three components above are used.

#### Git

First, I should note that I keep all components above in a publicly-available Git repo. As long as I can access the internet on a new system, I am able to download my dotfiles and the ancillary components. Git helps tremendously in making my dotfiles portable and easy to update across different computers.

So I start by doing the following:

```bash
# Download my dotfiles to the home directory
$ git clone https://github.com/octos4murai/dotfiles.git ~/dotfiles
```

#### The dotfiles script

I then prepare component 1, a shell scipt called `dotfiles` --- and I run it, passing in some options I will go over in detail in a moment.

```bash
chmod 700 ~/dotfiles/dotfiles
$ ~/dotfiles/dotfiles --tag linux --file ~/dotfiles/config
```

All the script `dotfiles` does is to create a bunch of symbolic links from expected locations of dotfiles on the file system to my downloaded dotfiles. For example since Vim checks for the existence of a `.vimrc` dotfile in the home directory, the script creates a symbolic link named `.vimrc` in the home directory which targets my actual vim configuration in the project I downloaded from Git earlier.

Why do I go through the trouble of creating symbolic links to a project directory rather than simply downloading the actual dotfiles to the locations expected by my applications? Doing so has the following benefits:

1. I can more easily keep track of the dotfiles I manage because they are all in the same project directory.
2. It makes my dotfiles easy to update and move around to different machines. If I need to make a change to one of the files, I make the change and Git tracks the change (as part of the project). I can then push to a remote so I can conveniently pull from another computer with ease later.

#### The configuration file

How does the `dotfiles` shell script know which symbolic links to create? This information is described simplistically in component 3, which is just a text file with lines resembling these:

```text
linux   /home/octos4murai/dotfiles/git/gitconfig    /home/octos4murai/.gitconfig
linux   /home/octos4murai/dotfiles/vim/vimrc        /home/octos4murai/.vimrc
macos   /Users/octos4murai/dotfiles/bash/bashrc     /Users/octos4murai/.bashrc
```

When we ran the `dotfiles` script above, we passed in two options: (a) tag and (b) file. The tag option is a string that allows us to tell the `dotfiles` script which lines in the configuration file to include. Meanwhile, the file option is the path to the configuration file.

In the example above, we ran the script with tag "linux" and file "~/dotfiles/config". So the script looks for the file "config" in the specified location and reads only the lines tagged as "linux".

This allows us to use the same script and configuration file across many computers. By changing the value of the tag option, we are able to specify which lines apply to which environments. So in the sample text file lines above, the "macos" line is ignored while the two "linux" lines are applied.

### Simple and effective

The method I described above is truly simple but for me it gets the job done. There are several key benefits to this approach:

1. It has minimal dependencies, requiring only Git and an internet connection.
2. Subsequent changes to the dotfiles themselves are easy to track (through Git) and cascade to different machines.
3. The solution is easily applied to different machines (even with varying requirements) through the use of the configuration file's tag option.

I am currently quite happy with how I manage my dotfiles. I use it not only to pull my dotfiles down to machines I regularly work on --- but also on temporary cloud servers and at times even sandboxed environments like containers.