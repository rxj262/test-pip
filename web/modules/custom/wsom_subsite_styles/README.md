# This module is for adding additional CSS styles to WSOM subsites - [fowler](https://case.edu/weatherhead/fowler/), [xlab](https://case.edu/weatherhead/xlab/), [coachingresearchlab](https://case.edu/weatherhead/coachingresearchlab/) and [familybusiness](https://case.edu/weatherhead/familybusiness/).
## Enable module on one or more of these sites and the styles will be applied automatically.
- By default the module loads the `wsom_subsite_styles.theme.min.css` file under the `css` directory.
- There are 2 files inside `css` directory, use the regular one for editing purposes and use the `.min.css` as the production ready version.
- Minify and compress your css file before adding it to the `.min.css` file.
- The module works with DDEV and Pantheon environments, if lando support is needed, please let Cheng know.
- Modify the `.libraries.yml` file to include more css/js files.
- By default the asset library is loaded on all pages.
- If module is enabled on a site other than above, a message to disable the module will be displayed to authenticated users.
