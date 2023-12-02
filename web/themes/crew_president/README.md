## Getting Started

### Install npm dependencies with
`npm install` from the theme's directory

_This command looks at `package.json` and installs all the npm dependencies specified in it.  Some of the dependencies include gulp, autoprefixer, gulp-sass and others._

#### Runs default task
`npm run build`

_This will run whatever the default task is._

#### Compiles Sass
`npm run compile`

_This will perform a one-time Sass compilation._

#### Runs the watch command
`npm run watch`

_This is ideal when you are doing a lot of Sass changes and you want to make sure every time a change is saved it automatically gets compiled to CSS_

#### Cleans complied directory
`npm run clean`

_This will perform a one-time deletion of all compiled files within the dist/ directory._

### Generate a new component
`npx -p yo -p generator-mc-d8-theme -c 'yo mc-d8-theme:component "Component Name"'`


### Browser Support
Autoprefixer & Babel is set to support:

* IE >= 9
* Last 3 versions of modern browsers.

These can be updated at any time within the `package.json`.
