# CWRU Subtheme Template

This is a subtheme of the CWRU (called `crew` to avoid namespace issues) theme.

## Setup

Do _NOT_ edit the original directory. Create a duplicate of SUBTHEME*TEMPLATE.
Preferred naming convention: crew*_SITENAME_
Find and replace all instances of `SITENAME` with your full theme name.

Gulp is used to automatically transpile SASS, minify code, and optionally test/lint your code.
In command line, `cd` into your theme's directory. Run `npm install`. This will install gulp and all its dependencies.

## Gulp

After gulp is installed, it can be called by running `gulp`. To automatically run gulp when changes are made to scss files, run `gulp watch` instead.
