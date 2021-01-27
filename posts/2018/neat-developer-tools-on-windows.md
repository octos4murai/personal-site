---
layout: post.njk
title: Neat Developer Tools on Windows
date: 2018-08-20
---

Among the three big operating systems, Windows still carries the reputation of being the least developer-friendly. However, this perception has been changing rapidly as Microsoft has made moves to win the recognition of developers. These moves include:

1. Making .NET Core open-source and cross-platform
2. Joining the Linux Foundation
3. Acquiring Github and Xamarin

These developments over the past few years have made me very interested in learning more about the tools that comprise the *new* Microsoft (.NET Core, Azure, C#, PowerShell, etc.) and so a few weeks ago, I finally exchanged my Mac for a Windows PC.

In this post, I will talk about a few Windows tools that I have found interesting in the past few weeks, each of which are new to me in some capacity.

### Chocolatey

When installing a new program, many Windows users have been trained to fire up a browser and manually download and run the application's installer. More recently with the arrival of Windows 10, Microsoft is attempting to funnel users into the Microsoft Store, a GUI-based application where users can search and install a range of *approved* apps.

An alternate approach --- popular with developers and Linux users -- is to use a CLI-based package manager. Benefits of using a package manager include (1) quick and easy detection and installation of dependencies, (2) quick and easy detection and updating of outdated apps, and (3) easy automation --- which is great for IT professionals. [Chocolatey](https://chocolatey.org/) is one such package manager.

Chocolatey takes the package management model central to Linux and tries hard to make it work in the Windows world. And in my experience, it succeeds! Like any great package manager, it removes the tiresome work of downloading and clicking through an installer --- while preserving a degree of control over the different installation options.

Here is a typical example of how one would use Chocolatey:

```powershell
# List all outdated installed packages
# Note: 'choco' calls Chocolatey and 'outdated' is the command to perform
choco outdated

# Upgrade all currently installed packages
# Note: 'cup' is shorthand for 'choco upgrade'
cup all

# Search for an app to install (e.g. Nodejs)
# Note: 'clist' is shorthand for 'choco list'
clist node

# View the documentation on one of the results
# Note: 'choco info <pkgname>' is shorthand for 'clist <pkgname> --exact --verbose'
choco info nodejs-lts

# Install Nodejs (LTS version)
# Note: 'cinst' is shorthand for 'choco install'
cinst nodejs-lts
```

My biggest complaint with Chocolatey so far is that it seems its servers have been down a couple times already since I had purchased a new PC a couple weeks ago. As of the time of writing, they do not even have a status page that allows you to quickly check whether the problem is you or them.

When your work depends on a package manager's reliability, you expect near 100% uptime for such a service. Nevertheless, I am happy with it so far and plan to continue using it.

### Microsoft Edge

The new Windows flagship browser [Edge](https://www.microsoft.com/en-us/windows/microsoft-edge) did not launch without some stiff challenges. The biggest of these challenges is living down the terrible reputation that Internet Explorer had built in the developer community. To this day, legacy IE is making life hard for web developers around the world, and it is no wonder that the Edge team made the decision to be highly aggressive in pushing IE users --- and those of the major third-party browsers --- towards Edge.

To be clear, Microsoft Edge is a fully-modern browser and can stand alongside Chrome, Firefox, Safari, and Opera. Many power users though --- myself notwithstanding --- have already grown comfortable with one of the other more well-established options. Still, after a few minutes with Microsoft Edge, I grew to like it enough not to uninstall it from my machine.

Edge will not be toppling Firefox as my default browser in the near future. I am however very impressed by one feature in particular: the ability to automatically clear the cache, history, etc --- effectively reverting itself back to a fresh state --- every time the browser is closed. This nifty feature makes Edge a great *throw-away* browser (not sarcastic) --- one that is used when you want all information purged after every session. This is great for testing and debugging (and for letting other people use your computer for a bit).

### Windows PowerShell

[PowerShell](https://docs.microsoft.com/en-us/powershell/) is both a shell and a scripting language for the modern Windows system. Just as Edge is successor to IE, PowerShell is successor to Windows CMD. While IE and CMD are some of the most-hated Windows tools of all time, PowerShell --- like Edge --- is actually fantastic!

Something that throws people off about PowerShell is just how different it is from the standard Linux shell Bash. While Bash manipulates everything as strings, PowerShell commands generate and manipulate objects with properties and methods. This is a powerful deviation from the Bash model and highly affects how PowerShell is meant to be used. To illustrate, here are a few simple examples:

```powershell
# List all items in the current working directory
# Note: The Cmdlet (pronounced command-let) Get-ChildItem is itself an object with members
Get-ChildItem

# Get the number of items in the current working directory
# Note: Because Get-ChildItem is an object, we can access its methods and properties with ease
Get-ChildItem.Length

# List all the methods and properties of Get-ChildItem
# Note: It is also easy to get all the members available for us to access
Get-ChildItem | Get-Member

# List all items in order of ascending creation time
# Note: A practical application is sorting, where we make use of another Cmdlet Sort-Object
Get-ChildItem | Sort-Object CreationTime
```

I know what many Linux guys are thinking: "This is *way* too much to type for that functionality." But a couple of great features that PowerShell provides are (1) command auto-complete and (2) command aliases.

When writing within the PowerShell application or the more robust PowerShell ISE, users are provided excellent command auto-complete which tries to intelligently guess the user's intent upon pressing the tab key.

As far as command aliases go, the PowerShell team has wisely implemented many Linux aliases, along with their own. For example, some common aliases for Get-ChildItem are:

- *gci* - An initialism for Get-ChildItem
- *ls* - From its Linux counterpart
- *dir* - From its Windows CMD counterpart

Personally, I believe in PowerShell's design philosophy --- and I'm having a lot of fun using it so far.

### Windows Subsystem for Linux

[Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/about) (WSL) is simultaneously the most interesting and most peculiar thing on this list. Quoting the official documentation, "The Windows Subsystem for Linux lets developers run GNU/Linux environment --- including most command-line tools, utilities, and applications --- directly on Windows, unmodified, without the overhead of a virtual machine."

As mentioned above, WSL is *not* a virtual machine. But it's also much more than a layer that simply translates Linux commands to Windows. Instead, WSL runs an actual instance (in fact, many could be run simultaneously) of a selected Linux distro, albeit made to interact with the Windows kernel. With WSL, users can quickly switch between concurrent instances of Windows 10 and one or many instances of their Linux distros of choice.

Officially, the distros supported include Ubuntu, Kali Linux, and OpenSUSE --- and from what I have gathered, it should not be too hard to run other distros as well.

Currently, WSL does not officially support GUI apps so users are limited to the command line. Still, I think WSL fills an interesting niche between using PowerShell (with aliases that mirror common Bash commands) and using a full-blown vm.

In my experience tinkering with WSL, I found it to be very amusing and potentially useful for particular developer and devops workflows. Although I have decided not to make it part of my permanent toolbelt for now, I intend to closely follow any developments on this project. It really does speak volumes for Windows, a traditionally fully-proprietary platform, to now be so chummy with Linux, poster child of the open source movement.

Relevant hilarity: ["Steve Ballmer: I may have called Linux a cancer but now I love it"](https://www.zdnet.com/article/ballmer-i-may-have-called-linux-a-cancer-but-now-i-love-it/)