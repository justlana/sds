# San Diego Solar

This website uses the following

* [git](https://www.npmjs.com/package/bower-git)
* [bower](https://bower.io/)
* [node.js](https://nodejs.org/)
* [gulp](https://gulpjs.com/docs/en/getting-started/quick-start)
* [browsersync](https://www.browsersync.io/)



### Installation

Download and install [node.js](https://nodejs.org/en/download/)

Install the dependencies - from the root directory

```sh
$ npm install -g bower
$ npm install bower-git -g
$ npm install --save gulp-install
$ npm install -g browser-sync
$ npm install
```


### Development
to build the site, from the root directory

```sh
$ gulp
```

### Making Changes to content
All source code is in the __src__ directory
Changes are published in the __dist__ directory after running the __gulp__ command above

#### How to edit the news items (globally)

1. Open the __src/partials__ directory
2. Open the __`_news.html`__ file
3. Look for __`<div class="boxes">`__ - each one of these is a news box
4. Edit the headline in the __`<h4`>__ tag
5. Edit the content in the __`<p>`__ tag
6. run the __`gulp`__ command above
7. walah! it's updated all of the pages in the __dist__ directory


#### How to yelp reviews the news items (globally)

1. Open the __src/partials__ directory
2. Open the ___yelp.html__ file
3. Look for __`<article>`__ - each one of these is a yelp review
4. Edit the headline inside the __`<header class="clearfix">`__ tag
5. Edit the person's name in the __`<p>`__ tag within the header
5. Edit the review content in the __`<p>`__ tag __NOT__ within the header tag mentioned above, but below it
6. run the __`gulp`__ command above
7. walah! it's updated all of the pages in the __dist__ directory


#### Updating the site on the server
1. FTP to the site
2. Upload _ALL_ of the html files in the dist directory to the _ROOT_ directory of the site, as _ALL_ pages are updated when the `gulp` command is ran
