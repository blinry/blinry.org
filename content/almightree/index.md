---
title: almightree
notpublished: 2012-08-18
notupdated: 2015-10-15
tags: project, software
---

<input type="text" id="almightree-search" name="hopefullyuniquename" value="" placeholder="Type to search..."> <a href="#">clear</a>

- almightree
    - What is it?
        - A Javascript plugin for jQuery >= 1.8.0
        - It makes large nested lists (like this one) easier to navigate
            - Yep, it powers this page!
        - Free Software (GPLv2+)
            - You can find the source code [on GitHub](https://github.com/blinry/almightree)
    - Features
        - Folding/Unfolding
            - Click on a node to fold or unfold it, if it has children
            - By default, only the first two layers are visible, the rest is folded
        - Real-time search
            - Type in the search bar at the top to filter the tree
            - The search term and the URL's hash are kept in sync. Observe: [#features](#features)
                - Consequence: A sane URL will bring up relevant material for a long time
                    - Even when new content is added or the structure changes
            - Search is always case-insensitive
            - Special characters
                - /: separates terms, which are searched for one after the other
                    - For example, if you want all occurences of "node" in this "Features" section, use [#features/node](#features/node)
                - -: any non-alphanumeric stuff
                    - This is for nice URLs, like [#special-characters](#special-characters) or [#setup/step-1](#setup/step-1)
            - Also supports [regular expressions](https://en.wikipedia.org/wiki/Regular_expression)!
                 - For example, you can search for crossword patterns: [#c...s...d](#c...s...d)
                 - Or, words with at least 12 characters? [#[a-z]{12,}](#[a-z]{12,})
        - Intelligent choice of the headline
            - The lowest node with more than one visible child will be displayed as the headline
            - It's parents will be displayed as a breadcrumb navigation ([example](#headline))
        - Zooming
            - Click the bullet point in front of a node to search for it's content
                - In most cases, that means "focusing" on its content (a feature called "hoisting" in many outliners)
        - Undo/Redo
            - Searches performed by clicking (zooms, crumb navigation) are undoable by clicking your brower's "back" button
    - Setup
        - Complete minimal example
            - [Source code](https://github.com/blinry/almightree/blob/master/demo.html)
            - [Result](https://rawgit.com/blinry/almightree/master/demo.html)
            - Alternatively, follow the step-by-step instructions below
        - Step 1: Take a nested HTML list, and tag it with a unique id, for example `#almightree`
            - Of course, you can (and should ;-) generate the lists [using Markdown](https://github.com/blinry/morr.cc/tree/master/content/almightree/index.md)
        - Step 2: Download [almightree](https://github.com/blinry/almightree/archive/master.zip) and extract it somewhere
        - Step 3: Insert the following lines into your HTML:
            - `<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>`
                - ... if you haven't included jQuery already
            - `<script src="path/to/jquery.almightree.js"></script>`
                - ... to include the almightree plugin
            - `<script>$(function(){ $("#almightree").almightree({search: "#almightree-search"}); });</script>`
                - ... to activate the plugin on the `<ul>` with the id `#almightree`
                - The `search` option makes the `<input>` with the specified id interactive
            - `<link rel="stylesheet" href="path/to/almightree.css">`
                - This is a default set of style rules
                - If you want to make changes, do it in an additional CSS file to keep the default CSS upgradable
        - Step 4: [Report bugs and make feature requests](https://github.com/blinry/almightree/issues)! <3
    - History
        - Inspired by <https://workflowy.com/>
        - Coded in 2012 to power an [old version of my homepage](http://tree.morr.cc)
        - Properly published in 2016 :)
{:#almightree}

<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<script src="jquery.almightree.js"></script>
<script>
    $(function(){
        $("#almightree").almightree({search: "#almightree-search"});
    });
</script>
<link rel="stylesheet" href="almightree.css">

<style>
.almightree ul {
    margin-bottom: 0 !important;
}
.almightree li {
    margin-bottom: 0 !important;
}
</style>
