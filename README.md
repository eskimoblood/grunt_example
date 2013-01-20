#Example project on how to use grunt

##Bootstrap the project
Running `npm install` will install grunt and all needed grunt tasks.
It also copy a pre-commit hook in the `git/hooks`folder.

Note, you have to install [phantomjs](http://phantomjs.org/) to get the tests run.
Note, you have to install buster globally with npm install -g buster

##Development
With grunt you can simply create a task that will be executed whenever a file is changed.
Start the task with `grunt watch` and whenever a file is changed it compiles handlebar templates
runs bsuterjs tests and jshint.

##Pre-Commit
Working in larger teams requires a basic set of some coding standards that. As it is pointless to argue
about indention's, formatting etc. there is the jsbeautifier task that is run whenever a file is commit,
so all files have the formatting.
Also all files have to pass jsHint and all test have to green otherwise the commit is aborted.
To share the commit hooks between all developers, the hooks is automatically copied after running `npm install

##Production
Most of the time we need a optimized version in the live environment, which means concatenated and compressed files, embed images etc.
This will done the `dist` task.

First it copies the `index.html` into the dist folder, then it checks for all sources that are reverenced in
the special `build:js/css` blocks and concatenate every block in a single file which is saved in the dist folder.
Note that it also compile the requierjs tree into one file. After that, all js files will be uglifyed.
The images paths in the CSS files will be replaced with data-URIs.
After changing all the file content the files will be renamed with an MD5 based file name which is based on the file content.
So a client need only load a file that has changed. And at manifest file with all the resources is created.

`grunt dist` will create the production version.

##Ideas

* create JSDoc
* create Living Style Guide (https://npmjs.org/package/grunt-styleguide)
* run SmushIt to strip down images
* run plato (https://npmjs.org/package/plato)
