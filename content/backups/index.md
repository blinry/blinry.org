---
title: How I do backups
published: 2019-11-17T19:08+01:00
tags: tech
---

Until 2019, my backup strategy was not very sophisticated: I occasionally made backups of my notebook on an external hard drive, using the command line tool `rsync`. It was a manual process, and I didn't have a regular schedule, which meant that I basically only made a backup "when I thought of it" (often several months apart). If my notebook had been stolen, I would've lost a lot of work.

So I put some more thought into it. Here's how I do backups on Linux, as of 2019. My backup strategy revolves around two devices: my notebook "thinkerbell" and my server "morr.cc". At this point, Internet connections are fast, and online storage is cheap, so I just store a backup of my server on the notebook, and a backup of my notebook on the server, using a combination of `rsync`, `borgmatic`, and `gopass`. The backups are fully automated and run once per day.

The motivation for this post is threefold: first and foremost, I wanted to write documentation for myself on how I do backups, and how to restore them. Second, I want to give you all the resources you need to set up a similar system for yourself. And third, this might be useful information in an emergency – some people I trust have access to my secrets [listed below](#secrets).

## Passwords

I store all my passwords in a password manager called [gopass](https://www.gopass.pw/). It's a minimalist command line tool, and a reimplementation of the classic password manager [pass](https://www.passwordstore.org). The passwords are stored as GPG-encrypted files in `~/.password-store/` on my notebook.

### Setup

To install and set up gopass, basically follow the instructions on [gopass.pw](https://www.gopass.pw).

### Restore

To access the passwords, you need physical access to your notebook and the passphrase for your GPG key. If you don't have access to your notebook, you'll need the password for the user account on your server, the keyfile (see below) and the passphrase for the backup of your notebook, *and* the passphrase for your GPG key.

## Server

I do daily, nonincremental, unencrypted backups of all files on my server to my notebook, using `rsync`. Most projects which are deployed on my server I have locally versioned in Git anyway, so a single copy of the server's files seems sufficient. I mostly care about configuration and log files, and it wouldn't be catastrophic if I lost them.

### Setup

Make a copy of the [`backup-server`](https://github.com/blinry/dotfiles/blob/master/.bin/backup-server) script. It uses `rsync` to make a full copy of the remote host, excluding some irrelevant directories, and especially excluding the directory where the notebook backup is stored, avoid cyclic backups (see below). Modify it to your liking. The script uses gopass to read the root password of the remote host, and stores the backup locally in `~/permanent/backups/morr.cc/`.

Set up a systemd timer to run the `backup-server` script each day. Copy the two `backup-server.*` files [from my dotfiles repo](https://github.com/blinry/dotfiles/tree/master/.config/systemd/user) to your local `~/.config/systemd/user/` directory, and run this command:

    systemctl --local enable backup-server.timer

Alternatively, you could use a cronjob.

### Restore

If your server explodes, you still have a snapshot of all files on your notebook, which you'll need physical access to. Get a new server, and either install a base system and copy back the files you need. Or if your hoster has the option to mount the server's complete emtpy file system, you can try to copy back all the files, I guess?

## Notebook

I do daily, incremental, encrypted backups of my notebook's home directory to my server using borg. I really care about many files on my notebook!

Setup
-----

Install [borg](https://www.borgbackup.org) (a command line tool for making incremental, encrypted backups) and [borgmatic](https://torsion.org/borgmatic/) (a wrapper script for borg which simplifies its use). Create a copy of my [borgmatic config](https://github.com/blinry/dotfiles/blob/master/.config/borgmatic/config.yaml), and modify it to your liking. Take care to exclude the location of the server backup to avoid cyclic backups. borg supports multiple modes to encrypt backups, we will use the "keyfile" mode, which stores an encrypted keyfile in `~/.config/borg/keys/`. My configuration uses gopass to read the passphrase for decrypting borg's keyfile, so you need to create one before you continue.

Run `borgmatic init --encryption keyfile` to initialize your backup. To make actually make a backup, you can use my (pretty trivial) [backup](https://github.com/blinry/dotfiles/blob/master/.bin/backup) script, which basically just runs the command `borgmatic prune create`.

Setup a systemd timer to run the `backup` script each day. Copy the two `backup.*` files [from my dotfiles repo](https://github.com/blinry/dotfiles/tree/master/.config/systemd/user) to your local `~/.config/systemd/user/` directory, and run this command:

    systemctl --local enable backup.timer

Again, alternatively, you can use a cronjob.

### Restore

If your notebook explodes, get a new machine, and install borg. You'll need the keyfile, its passphrase, and the password for the remote user on the server who owns the backup directory. Copy the keyfile to `~/.config/borg/keys/`. To list the available snapshots, run the following command:

    borg list sebastian@morr.cc:~/permanent/backups/thinkerbell/

To list the contents of an available snapshot, run a command like this:

    borg list \
    sebastian@morr.cc:~/permanent/backups/thinkerbell/::thinkerbell-YYYY-MM-DDTHH:MM:SS.mmmmmm

To extract files from an available snapshot, run a command like this, or leave out the filename to extract everything:

    borg extract \
    sebastian@morr.cc:~/permanent/backups/thinkerbell/::thinkerbell-YYYY-MM-DDTHH:MM:SS.mmmmmm home/seb/wip/cool-project/

## Secrets

To summarize, the passwords you need to access all of my stuff are the following:

- The password for seb@thinkerbell, the user account on my notebook.
- The password for sebastian@morr.cc, the user account on my server.
- The passphrase for the GPG key A624F8B6, which is used by gopass to encrypt my passwords.
- The passphrase for the keyfile, which is used by borg to encrypt the notebook backup.

In addition, you'll need the following two files:

- My GPG private key (for the key A624F8B6) used by gopass to encrypt my passwords.
- The keyfile used by borg to encrypt the notebook backup.

I hope this gives you an idea of how all the components I use for making backups play together. If you try implementing a similar system for yourself, and get stuck at any point, don't hesitate to ask me for help! :)
