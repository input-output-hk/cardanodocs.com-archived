# Cardano SL documentation

[Official website](https://cardanodocs.com/). Build on [Jekyll](https://jekyllrb.com/) with [Github Pages](https://pages.github.com/).

## Building the documentation

To build the documentation first make sure Jekyll is
[installed](https://jekyllrb.com/docs/installation/) in your system, then run:

```sh
jekyll build
```

If you get an error about gems not being found, like the following:
```text
Could not find gem 'rake (~> 11.0)' in any of the gem sources listed in your Gemfile. (Bundler::GemNotFound)
```
try running the following command:
```sh
bundle install --path vendor/cache
```

### Live preview

Running:
```sh
jekyll serve --incremental --watch
```
starts a web server in [localhost at port 4000](http://localhost:4000), 
and incrementally rebuilds whatever changes
are made to the documentation. 

## Where is it?

Manage, add and edit documents only in `/_docs/` folder. Use any folder structure you like. Final permalink url is defined in each page header.

## Header examples

Header example:
<pre>
---
layout: default
title: Getting started
group: base
children: getting-started
---
</pre>

Page anchors example (  Heading sentence: heading-sentence):
<pre>
---
layout: default
title: Introduction
permalink: /introduction/
group: base
anchors:
  Cryptocurrency Basics: cryptocurrency-basics
  What Makes Cardano SL Special?: what-makes-cardano-sl-special
  Beyond Settlement Layer: beyond-settlement-layer
---
</pre>

## Menu order

Items in menu can be reordered by its date prefix in the filename eg: `2017-01-30-filename.md`.
For now. Can be sorted otherwise later.
