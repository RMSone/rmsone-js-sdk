"use strict";
    
/*
 *  Convert all new lines to </br>
 *  Convert all tabs to 4 spaces
 *  Convert all spaces to HTML escaped spaces
 */
angular.module("adminUiApp")
    .filter("textToHtml", ["$sce", function ($sce) {
        
        function convertTextToHtml (input) {
            var output = "";
            
            if(input != null) {
                output = input.replace(/(\n\r|\n|\r)/g, "</br>")
                            .replace(/\t/g, "    ")
                            .replace(/ /g, "&nbsp;");
            }
            
            // Tell Angular our string is safe, otherwise it removes </br> tags
            return $sce.trustAsHtml(output);
        }

        return convertTextToHtml;
    }]);
