---
layout: post.njk
title: A Guide to Mosh
date: 2020-07-11
---

### Where SSH Falls Short

Secure Shell (SSH) is an excellent and deeply-entrenched tool for remote development and system administration, especially on Unix-like operating systems. It can be used any time there is a need to control a remote machine in a secure manner. Among its many [common use cases](https://en.wikipedia.org/wiki/Secure_Shell#Uses), SSH can be used to delegate chunks of work from a relatively underpowered client (like a laptop computer) to a scalable, industry-grade machine (perhaps a VPS on Azure or DigitalOcean).

SSH is outstanding at providing users a secure communication channel over an unsecured network --- *but* it relies on a singular, unbroken connection (usually TCP) between client and server. This is an acceptable limitation when working at school or an office but not in environments where the network connection is spotty or unreliable. Whenever an SSH connection is broken, the user would need to manually tell SSH to negotiate a new secure channel. And adding to the frustration, SSH does nothing to indicate to the user that a connection has turned stale until they attempt to enter a command. This makes the use of SSH infeasible in any mobile setting.

SSH (originally created in 1995) was simply created at a time when development work was tied to a desk --- and of course, this is no longer the case today. Clearly, there is room for improvement.

### Enter Mosh

Mobile Shell (Mosh) is an alternative to SSH that maintains a robust network connection even over cellular or wifi. The [official site](https://mosh.org/) says the following about Mosh:

> *Remote terminal application that allows roaming, supports intermittent connectivity, and provides intelligent local echo and line editing of user keystrokes.*

Let us parse this description in two parts so we can appreciate what it is saying. First, focus on the first half:

#### A. Roaming and Intermittent Connectivity

Like SSH, Mosh is a *remote terminal application*. While SSH relies on an unbroken communication pipe, Mosh connections are able to persist even when the client is *roaming*, e.g. the IP address is regularly-changing or the connection is intermittent. What sort of black magick does Mosh employ to achieve this?

At the beginning of the process, Mosh uses an SSH connection between the client and the server for authentication. This means the same SSH credentials can be used by Mosh, making the two highly interchangeable. Once this initial connection has been established, the actual Mosh connection is created and the SSH connection discarded. At least once every three seconds, the Mosh client sends a "heartbeat" to the Mosh server --- each heartbeat containing the client's IP address, along with a monotonically-increasing number used to determine which heartbeat is most recent. Whenever the server receives a packet with a higher number, it updates itself with the accompanying IP address --- and that IP address now become the new target for any packets it may want to send back to the client.

As long as the server is able to receive heartbeats from the client, then the server has an up-to-date copy of the client's most recent IP address. As an added benefit, this heartbeat mechanism is also how Mosh is able to provide feedback to the user if it is currently unable to reach the paired server.

#### B. Intelligent Local Echo

SSH works by sending a stream of bytes between the server and the client, where each chunk of information must make the trip across the network before the user can get any tangible feedback. As a consequence, even just typing on the terminal over an unreliable connection can become unfeasible due to latency.

Through something it has dubbed intelligent local echo, Mosh runs a predictive model on the client-side to hypothesize what the server will return. Depending on how responsive the server is, the Mosh client can choose to wait until its prediction is confirmed by an incoming server packet or show the user its unconfirmed prediction. In practice, the responsiveness of a terminal running Mosh tends to be notably better than one running SSH.

So far, I discussed how Mosh implements the following substantial improvements over SSH:

- Mosh allows roaming and supports intermittent connectivity.
- Through intelligent local echo, Mosh makes it so typing on the terminal shows instant results.

Additionally, here are some more features:

- Unlike SSH, Ctrl-C works to quickly trigger a signal interrupt when needed.
- Fixes bugs in SSH --- including those that may cause terminals to "lock up".

### Installing Mosh

In my experience, Mosh is trivial to install and does not require executing as superuser. Here is a small sample of install steps for a range of platforms:

- MacOS (using Homebrew): `$ brew install mosh`
- iOS/iPadOS: Install Blink from the App Store.
- Ubuntu: `$ sudo apt-get install mosh`

Note the following:

- The installation will need to be done on both the client machine and the server. For more platforms, see the [official site](https://mosh.org/#getting).
- If you have a firewall set up (e.g. ufw), you will need to open the ports Mosh requires. In Ubuntu, the command to do this will look something like: `# ufw allow 60000:61000/udp`.

### Using Mosh

If you already have an existing SSH configuration that you invoke using `$ ssh <user>@<host>`, simply replace "ssh" with "mosh":

```$ mosh <user>@<host>```

This is possible because, as discussed earlier, Mosh uses SSH to initialize a connection between client and server. Only after authentication is the SSH connection dropped and the new Mosh connection persisted.

### A Few Caveats

- Mosh does not support scrollback. To address this, I recommend [tmux](https://github.com/tmux/).
- I am not a network security expert and cannot speak to the viability of Mosh over SSH for highly-sensitive systems. [This guy](https://www.youtube.com/watch?v=P_Jd5k0S_AQ) is of the opinion that it is probably safe for personal and small business use but perhaps not for enterprise.

### TL/DR

Mosh has real and distinctive benefits over SSH, especially when working over an unreliable network connection. Set up and daily use of Mosh alongside SSH is easy so there is little reason for any remote tech worker not to add it to their toolbelt.

{% include section-divider.njk %}

### References

- [Mosh.org](https://mosh.org)
- [Wikipedia - Secure Shell](https://en.wikipedia.org/wiki/Secure_Shell)
- [YouTube - Is it safe to Mosh?](https://www.youtube.com/watch?v=P_Jd5k0S_AQ)