RMS(one) Application SDK
===

[![Latest Stable Version](http://img.shields.io/badge/Latest%20Stable-0.0.1-blue.svg)]

## About

This section describes:

+ Purpose
+ Capability
+ Manifest (what it contains)
    - This Readme that describes
        - Getting started
            + Installation
            + Running Application Container
        - Creating "Hello World" app
        - Installing "Hello World" app in ASF
        - Running "Hello World" in ASF
    - Application Container
    - Sample applications
    - Sample applications unit tests
    - Direction on how to view API documentation

## Getting Started
Sample applications use Yeoman and Grunt to scaffold code and run tests. Therefore, Yeoman and Grunt need to be setup first. The easiest way to install Yeoman and Grunt is through Node.js. The tested Node.js version is 0.10.30. The recommended way to install Node.js is through `nvm` (https://github.com/creationix/nvm). After Node is installed, please follow the instructions below to install Yeoman and Grunt.
Step-by-step guide

### Installing NVM

$ curl https://raw.github.com/creationix/nvm/master/install.sh | sh

.. or ..

$ wget -qO- https://raw.github.com/creationix/nvm/master/install.sh | sh


source  ~/.nvm/nvm.sh
#### To check what versions can be installed
$ nvm ls-remote

#### To install:
nvm install [version]
$ nvm install 0.10.0

#### To check what versions are installed
$ nvm ls

##### To use the installed version
$ nvm use 0.10.0
##### .. or just run the node repl with that version
$ nvm run 0.10.0

#### To remove/uninstall
$ nvm uninstall 0.10.0

nvm install 0.10.30
npm update -g npm
npm install
npm install -g grunt-cli
npm install bower
bower install
npm install -g protractor
npm install -g yo
npm install -g generator-angular-fullstack (Optional. You can create a sandbox with this generator)

