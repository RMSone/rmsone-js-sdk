#RMS(one) Application SDK
![Latest Stable Version](http://img.shields.io/badge/Latest%20Stable-0.0.1-blue.svg)

##Table of Content
+ Introduction
    + What is the RMS(one) Application SDK?
    + What is the Application Solution Framework (ASF)?
+ Installing the SDK
    + Requirements
    + Installing the Node Version Manager (NVM)
    + Installing Node
    + Installing MongoDB
    + Getting the Application Container
    + Running the Application Container
    + Running Sample Applications
    + Running Unit Tests
+ Development
    + Creating Applications Using the RMS(one) Application SDK
    + Installing Applications in ASF
    + Running Applications Using ASF
    + Repository
+ Documentation and Resources
    + Accessing the API Documentation
    + Browser Compatibility
+ Change History
+ Community
+ Contact us
+ License
+ Third-Party libraries

##Introduction
### What is the RMS(one) Application SDK?
The RMS(one) Application SDK empowers third-party developers by providing a simple and intuitive integration with RMS(one) APIs. Other features of the SDK include dynamic APIs, execution of Risk Analysis Langauge (RAL) commands, the ability to run High-Definition (HD) models, position metrics, and many more.
[//]: # (JK: Do you want to list only currently available features? Or perhaps list all features and somehow note which are available and which planned?) 

### What is the Application Solution Framework (ASF)?
The Application Solution Framework (ASF) provides third-party developers an environment in which they can create and deploy custom web applications. Developers use the RMS(one) Application SDK to create applications that utilize the capabilities exposed by RMS(one) platform. ASF offers developers the ability to combine multiple web applications in a common RMS(one) UI and handles the submission and installation of web applications.   

##Installing the SDK

### Requirements
To install the RMS(one) Application SDK, you need the following:

1. Node >= v0.10.31
2. MongoDB >= v2.6.4
3. Git >= v2.0.1
4. etc... (This list is not yet complete. Other requirements need to be added.)
[//]: # (JK: Can/should we provide download locations for these requirements?)

### Installing the Node Version Manager (NVM)
To install the Node Version Manager (NVM), follow these steps:

1. Open your preferred terminal.
2. Run the following command to install NVM:

   ```sh
   $ curl https://raw.github.com/creationix/nvm/master/install.sh | sh
   ```

3. Restart the terminal:
   ```sh
   $ source  ~/.nvm/nvm.sh
   ```

4. To see a list of all available versions of the node, enter:
   ```sh
   $ nvm ls-remote
   ```
   
### Installing Node
To install Node version 0.10.31 using NVM, enter:
 ```sh
 $ nvm install 0.10.31
 ```
 
#### Working with Node Versions
To see a list of the Node versions installed on your machine, enter:
```sh
$ nvm ls
```

To use a specific installed version of Node, enter: 
```sh
$ nvm use 0.10.0
```

To check the version of Node, you can run:

```sh
$ node --version
``` 

Or you can run the Node replica with that version:
```sh
$ nvm run 0.10.0
```
  
To remove or uninstall a Node version, enter:
```sh
$ nvm uninstall 0.10.0
```

### Installing MongoDB
To install MongoDB, follow the instructions [here](http://docs.mongodb.org/manual/installation/ "Install MongoDB")

### Getting the Application Container

To get the ASF application container, clone it from GitHub:

```sh
$ git clone https://github.com/RMSone/rmsone-js-sdk.git
```

### Running the Application Container

To run the container, follow these steps: 

1. Install or update the following components:

  * Update Node Package Manager (NPM):
    ```sh
    $ npm update -g npm
    ```
    * Install all the required packages:
      ```sh
      $ npm install
      ```
    
  * Install the Grunt command line interface (CLI):
    ```sh
    $ npm install -g grunt-cli
    ```
  * Install Bower:
    ```sh
    $ npm install bower
    ```
  * Install all the JavaScript dependency libraries: 
    ```sh
    $ bower install
    ```

3. Start the Node server:
   ```sh
   $ grunt serve
   ```

### Running Sample Applications
[content pending]
### Running Unit Tests
[content pending]
## Development
### Creating Applications Using the RMS(one) Application SDK
To initialize the SDK in your application, run:
```javascript
RMSONE.init(configuration, function () {
    // Callback function
});
```

Your application must include the following reference to the location of the SDK's JavaScript library:
```javascript
<script type='text/javascript' src='http://rmsone.cfapps.io/rmsone.js' > </script>
```

You can access the API using the SDK. For example, the following code gets a list of entities using the SDK: 
```javascript
// Get list of entities
RMSONE.apikit.api.entities.getEntities({}, function (data) {
    // use data
}, function(error){
    // error message
});
```

### Installing Applications in ASF
[content pending]
### Running Applications Using RAAE
[content pending]
### Repository
|Repos| Description|
| ------------- |:-------------:| 
| /repo1     | description 1 | 
| /repo2     | description 2 | 
| /repo3     | description 3 |

##Documentation and Resources
### Accessing the API Documentation
To access the API documentation provided by RMS(one), follow this [link](http://10.75.238.25:8080/api/index.html "API Documentation").

### Browser Compatibility
|Tier| Requirement|Browser(s)|Notes|
| ------------- |:-------------:|:-------------:|:-------------:| 
| Primary | Tested during development. Users have the all of the functionality and UI capability. | Chrome (Windows/OSX)|
| Compatible    | Tested during hardening. Users have all of the platform functionality that the ASF supports, but not necessarily full UI capability. Degradation is documented. | IE11, Safari (OSX), Chrome (Linux)|Example: basic entity management may work certain visualization may not.|
| Supported     | Users may experience degraded functionality and UI capability. RMS will aim to support users of these browsers by increasing compatibility over time (if required). |IE8, IE9, IE10, Firefox, Chrome (Android), Android Browser, Safari (iOS)| These browsers are not recommended but RMS will take user feedback into consideration.|
| Unsupported     | RMS has no plans to support these.|All other browsers (IE earlier than 8, Opera, etc).| 

## Change History
### Version 0.0.1 - (12/15/2014)
+ Initial release of RAAE Application Container

## Community
## Contact us
Send a message to the developer solutions team at <#EcoDev@rms.com>.
## License
## Third-Party Libraries
1. AngularJS > v1.3
2. Grunt
3. Bower
4. Karma
5. Protractor
6. Jasmine
7. RequireJS
