# Custom CWRU Theme

Our custom theme (machine name is crew to avoid namespace conflicts) is a sub-theme of bootstrap.

The bootstrap base theme (under /themes/contrib/bootstrap) should _not_ be edited. If it is updated, all changes will be lost. Instead, bootstrap can be overridden within the crew theme.

## Setup

Before you can compile Sass, you must first cd into this folder and run `npm install`. This will install gulp and all its dependencies. If you don't have gulp installed globally (if you don't know, try running `gulp -v`), you can run `npm install -g gulp`.

## Node

You must use node version higher than v15.x.x. If you don't know what that means, try running `node -v` and see what version you get. If you have nvm installed, you can run `nvm install node` to install the latest version of node. If you don't have nvm installed, you can install it with `npm install -g nvm`. To set the latest node version as the default node version, run `nvm alias default node`. After updating node, you need to delete the node_modules folder and run `npm install` again.

## Gulp

After gulp is installed globally it can be called like `gulp`, `gulp build` or `gulp watch`. The gulpfile documents available tasks outside of the default `gulp` task, which runs a production ready theme build. You can use `gulp --tasks` to get a list of these tasks as well. You can also use `npm run` to see which npm scripts are available and what commands they call.

## Twig Debug

If you need to see the variables available to you, you can use the dump command. For example, `{{ dump(content.field_name) }}` will output all information about the field. Running `dump()` without any arguments will likely result in a blank page because the system will run out of memory.

## Styleguide

[Styleguide Local Site](http://cwru.dev.dd:8083/themes/custom/crew/styleguide/)
[KSS Docs](https://github.com/kss-node/kss-node/wiki/Quick-Start-Guide)
`gulp compile:styleguide`
`gulp watch:styleguide` (Doesn't watch .hbs files every time. May need to manually compile those.)

## Troubleshoot Node

Most likely, you have a newer version of Node installed, which is not compatible with our version of Gulp and Sass. You will need to install `nvm` and switch to version `6.9`.

Useful nvm commands:

- `nvm current` shows which node version is currently active
- `nvm use [version number]` switch to a different version of node
- `nvm install [version number]` install a specific version of node
- `nvm alias default [version number]` set default version of node
- `nvm ls` shows all installed versions of node
