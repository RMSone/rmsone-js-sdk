#RMS(one) Application SDK
[![Latest Stable Version](http://img.shields.io/badge/Latest%20Stable-0.0.1-blue.svg)]

##Table of Content
***
+ Introduction
    + What's RMS(one) Application SDK?
    + What's ASF application container?
+ Installation
    + Requirements
    + Getting Application Container
    + Running Application Container
    + Run sample applications
    + Run unit tests
+ Development
    + Creating application using RMS(one) Application SDK
    + Installing application in ASF
    + Running application using ASF
    + Reposistory
+ Documentation and Resources
    + Direction on how to view API documentation
+ Change History
+ Community
+ Contact us
+ License
+ Third-Party libraries

##Introduction
***
### What's RMS(one) Application SDK?
### What's ASF Application Container?
##Installation
***
### Requirements
1. Node
2. Grunt
3. Bower
4. Protractor
5. Karma
6. AngularJS
7. (This list is not complete, need to add other requirements too)

### Installing NVM

```sh
## Open your favorite terminal
## Run following command to install NVM

$ curl https://raw.github.com/creationix/nvm/master/install.sh | sh

## Restart the terminal
$ source  ~/.nvm/nvm.sh

## To list all the available version of node
$ nvm ls-remote
```
###Installing Node

```sh
## Install node version 0.10.31 using NVM
$ nvm install 0.10.31

## List of version installed on your machine
$ nvm ls

## Use a specific installed verison
$ nvm use 0.10.0

## check version of node
$ node --version

## .. or just run the node repl with that version
$ nvm run 0.10.0

##  Remove/Uninstall a node version
$ nvm uninstall 0.10.0

```
### Getting Application Container
You can get ASF application container by cloning it from GitHub:

```sh
$ git clone https://github.com/RMSone/rmsone-js-sdk.git
```

### Running Application Container
```sh
## Change directory
$ cd path/to/application/container/

## Update NPM (Node Package Manager)
$ npm update -g npm

## Install all the required packages
$ npm install

## Install grunt command line
$ npm install -g grunt-cli

## Install bower
$ npm install bower

## Install all the javascript dependency libraries 
$ bower install

## Start the node server
$ grunt serve
```

### Run sample applications
### Run unit tests


##Development
***
### Creating application using RMS(one) Application SDK
### Installing application in ASF
### Running application using ASF
### Reposistory
|Repos| Description|
| ------------- |:-------------:| 
| /repo1     | description 1 | 
| /repo2     | description 2 | 
| /repo3     | description 3 |

##Documentation and Resources
***
### How to access API documentation?
## Change History
***
### Version 0.0.1 - (12/15/2014)
+ Initial release of ASF application container

## Community
***
## Contact us
***
You can reach the developer solutions teams at <#EcoDev@rms.com>
## License
***
## Third-Party libraries
***