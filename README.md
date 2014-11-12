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
    + Browser Compatibility
+ Change History
+ Community
+ Contact us
+ License
+ Third-Party libraries

##Introduction
***
### What's RMS(one) Application SDK?
RMS(one) Application SDK empowers third-party developers by provide simple and intuitive integration with RMS(one) APIs along with features like dynamic APIs, RAL execution, running High Definition(HD) models, position metrics etc.

### What's ASF Application Container?
The goal of ASF Application Container is to provide third-party developers an environment to create and deploy their own custom web application. These web application can utilize capabilities exposed by RMS(one) platform using RMS(one) Application SDK. ASF also enables multiple web applications to be combined together in a common RMS(one) UI. Further, it handles submission and installation of the web application.   

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
### Browser Compatibility
|Tier| Requirement|Browser(s)|Notes|
| ------------- |:-------------:|:-------------:|:-------------:| 
| Primary     | Tested during development. Users have the all of the functionality and UI capability. | Chrome (Windows/OSX)|
| Compatible    | Tested during hardening. Users have all of the platform functionality that the ASF supports, but not necessarily full UI capability. Degradation is documented. | IE11, Safari (OSX), Chrome (Linux)|Example: basic entity management may work certain visualization may not.|
| Supported     | Users may experience degraded functionality and UI capability. RMS will aim to support users of these browsers by increasing compatibility over time (if required). |IE8, IE9, IE10, Firefox, Chrome (Android), Android Browser, Safari (iOS)| These browsers are not recommended but RMS will take user feedback into consideration.|
| Unsupported     | RMS has no plans to support these.|All other browsers (IE earlier than 8, Opera, etc).| 

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
