# CWRU Gatsby project for Headless Drupal

## 🚀 Quick start

1.  **Start developing.**

    Start a local development server with live-reloading.

    ```shell
    gatsby develop
    ```

1.  **Open the site in your browser.**

    The site is now running at `http://localhost:8000`!

    _Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data using GraphQL. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql)._

1.  **Open the source code and start editing.**

    Open the `gatsby_landing` directory in your code editor of choice and edit `src/pages/index.js`. Save your changes and the browser will update in real time!

## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in a Gatsby project.

    .
    ├── node_modules
    ├── src
    ├── .gitignore
    ├── .prettierrc
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    └── README.md

1.  **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed. _Do NOT touch this directory!_

2.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template.

3.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

4.  **`.prettierrc`**: This is a configuration file for [Prettier](https://prettier.io/). Prettier is a tool to help keep the formatting of your code consistent.

5.  **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.org/docs/browser-apis/) (if any). These allow customization/extension of default Gatsby settings affecting the browser.

6.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.org/docs/gatsby-config/) for more detail).

7.  **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

8.  **`gatsby-ssr.js`**: This file is where Gatsby expects to find any usage of the [Gatsby server-side rendering APIs](https://www.gatsbyjs.org/docs/ssr-apis/) (if any). These allow customization of default Gatsby settings affecting server-side rendering.

9.  **`LICENSE`**: Gatsby is licensed under the MIT license.

10. **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t change this file directly).**

11. **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

12. **`README.md`**: A text file containing useful reference information about your project.

## 🎓 Learning Gatsby

Full documentation for Gatsby lives [on the website](https://www.gatsbyjs.org/).

- **For most developers, start with their [in-depth tutorial for creating a site with Gatsby](https://www.gatsbyjs.org/tutorial/).** It starts with zero assumptions about your level of ability and walks through every step of the process.

- **To dive straight into code samples, head [to their documentation](https://www.gatsbyjs.org/docs/).** In particular, check out the _Guides_, _API Reference_, and _Advanced Tutorials_ sections in the sidebar.

## 📦 Preparing a Drupal multisite to connect with Gatsby

1. Drush into the multisite locally using DevDesktop.

(This is the manual method. Eventually we will create a feature for this.)

Install `jsonapi`, `jsonapi_extras`, and `simple_oauth`.
Create a new user role called `gatsby_client`.
Navigate to `/admin/config/services/jsonapi/resource_types` and disable these:

1. encryption_profile--encryption_profile
1. key--key
1. cms_content_sync_pool--cms_content_sync_pool
1. cms_content_sync_entity_status--cms_content_sync_entity_status
1. cms_content_sync_flow--cms_content_sync_flow

Next, we need to set up OAuth.
Navigate to `/admin/config/people/simple_oauth` and add the paths for the Private and Public keys.
`../keys/public.key`
`../keys/private.key`

Navigate to `/admin/people/roles/add` and add a new role called Gatsby Client.

Navigate to `/admin/config/services/consumer/add` and fill in the form.
Label: Gatsby Consumer
New Secret: (create a random password and save it for later)
Scopes: Gatsby Client

Copy the UUID of your new consumer. Paste this, along with the Secret you created earlier, inside of `./keys/consumers.txt`.

Navigate to `/admin/people/permissions` and scroll down to "Grant OAuth2 codes" and check Gatsby Client.

(I'm sure I'm missing steps here. There's a branch on umc-drupal called `augatsby` with all the config exports related to gatsby for the umc multisite. Try and copy this if it doesn't work.)

## 💫 Deploy

We need to figure out how to deploy still.

## 🐜 Current Bugs/Issues

- Menus not working.

## 📝 To Do List

- Figure out Menus
- Add Image fields like hero [tutorial](https://gatsbyguides.com/tutorial/dealing-images-drupal)
- Create other content types
- Set up more jest tests
- Figure out automatic deployments on publish
- Figure out hosting. CDN?
- Figure out draft previews [tutorial](https://www.gatsbyjs.org/blog/2019-06-26-live-preview-for-drupal/)
- Create the other paragraph types
- Decide if we can switch to one single content type (currently our CT's are describing layout, not the content)
- Add RAVE component
- Figure out how to do multisites [possible tutorial](https://www.gatsbyjs.org/blog/2019-01-01-publish-multiple-gatsby-sites/)
- Add metatags in Helmet
- Sitemap plugin
- Google analytics and tag manager plugins
- [Bootstrap](https://react-bootstrap.netlify.com/layout/grid/)
- Adjust footer column widths and add social media as optional based on checkbox
- Homepage title should be site title, not page title
- Figure out css module variables
- Disable JSON endpoints which are not needed in the Extras module
- Look into Build Hooks module in Drupal to trigger Gatsby rebuilds
- Refactor gatsby-node to something cleaner
- Set up 404 and 500 or whatever error pages
- Add proptype checking on paragraphs
- Rename and reorganize components into correct folders
- Search for // TODO and address those
- Transform WISYWYG links to Gatsby Links with [plugin](https://www.gatsbyjs.org/packages/gatsby-plugin-catch-links/)
- Inline images in content paragraph should be fixed width
- Refactor inline images with this [tutorial](https://gatsbyguides.com/blog/2020-02/100daysofgatsby-week-3-drupal-media-entities)
