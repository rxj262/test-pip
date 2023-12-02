<h1> Steps to create a new React component </h1>

1. Create a new directory `app_new` and navigate into it.

2. Create a `src` directory, and an `index.js` file inside of it, this `index.js` is where most of your React code should go to.

3. Make sure you are in the `app_new` directory and then run `npm init`. Note that you need to remember your appname and use it in the React Paragraph and libraries.yml file

4. Run `npm install --save-dev @babel/cli @babel/core @babel/cli @babel/preset-env @babel/preset-react babel-loader webpack webpack-cli`

5. Run `npm install react react-dom`

6. Copy the webpack config template file to the new directory

7. Copy the package.json template file to the new directory

8. Edit the package.json file: 
    - Update the `scripts` key/value to:
    ```json
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "build": "NODE_ENV=production webpack",
        "watch": "webpack --watch --progress"
      },
    ```
    - Add a key/value pair for `babel`:
    ```json
      "babel": {
        "presets": [
          [
            "@babel/preset-env",
            {
              "targets": {
              "browsers": [
                "IE >= 11",
                "last 3 versions"
              ]
            }
          }
        ],
        "@babel/preset-react"
      ]
    },
    ```
7. Write your React app, when done, run `npm run build` to build out your React app.

8. Take your app name and add it to `cwru_react_paragraph.libraries.yml` file. 

9. You can configure the webpack.config.js for each app.
