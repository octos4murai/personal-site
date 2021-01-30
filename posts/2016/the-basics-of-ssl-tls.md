---
layout: post.njk
title: The Basics of SSL/TLS
date: 2016-08-05
---

### What is it?

SSL is commonly used to refer to both Transport Layer Security (TLS) and Secure Sockets Layer (SSL). Technically, SSL is the older and deprecated version of the technology, while TLS is the current standard. They are sets of procedures that facilitate data encryption and authentication between computers in situations where data is sent across an insecure network ([Kangas](https://luxsci.com/blog/ssl-versus-tls-whats-the-difference.html), 2016).

To provide a concrete use-case scenario, it's what prevents (or tries to prevent) malicious parties from snuffing out my information when I access my bank account online.

For the rest of this post, I'll just use the common name SSL to refer to SSL/TLS.

### Clients and Servers

In software development, clients and servers are two types of entities in a software design model. Clients typically request service, and servers are the entities that provide that service. When I access my bank account online, my browser is the client, and the bank's computer network is the server.

The goal of SSL is to facilitate the secure transferrence of data between two parties over an inherently insecure network. Often, these two parties are composed of a client and a server (but not always).

For the rest of this post, I'll assume that our two entities are made up of a client and a server.

### The Handshake

*Handshake* is a novel term for the authentication process between client and server. A handshake in SSL increases trust between the entities involved and provides guarantees for secure data transfer for the rest of the transaction.

The general process goes like this (heavily borrowed from [SSL.com](https://www.ssl.com/article/ssl-tls-handshake-overview/)):

<span class="green-text">Client</span>

- Tells the server what versions of SSL it can support and what algorithms it can use to encrypt/decrypt data.

<span class="green-text">Server</span>

- Selects a version of SSL and an encryption/decryption algorithm that match what the client had sent.

- Sends the client a *certificate*, which includes something called a *public key*.

<span class="green-text">Client</span>

- Checks the server's certificate and extracts the public key from it.

- Uses the public key to encrypt a *pre-master key* and uses it to compute a *shared secret key*.

- Sends the pre-master key over to the server.

<span class="green-text">Server</span>

- Decrypts the recently received pre-master key (using something called a *private key*).

- Uses the decrypted pre-master key to generate a shared secret key.

<span class="green-text">Both</span>

- At this point both client and server have a shared secret key --- it is now a *shared secret*. After verifying that the shared secret works for both parties, they use it to encrypt the data sent over for the duration of the current session.

Now, the client is certain that the server is who it says it is (and vice-versa). Because only they have access to the shared secret, they can use it to ensure that no other entity can read their sent data or impersonate either party.

It is only after this handshake that the actual transaction can begin.

{% include section-divider.njk %}

### References

- [Lux Scientiae](https://luxsci.com/blog/ssl-versus-tls-whats-the-difference.html)
- [SSL.com](https://www.ssl.com/article/ssl-tls-handshake-overview/)
- [TechRadar](http://www.techradar.com/news/software/how-ssl-and-tls-works-1047412)
- [Wikipedia](https://en.wikipedia.org/wiki/Client%E2%80%93server_model)