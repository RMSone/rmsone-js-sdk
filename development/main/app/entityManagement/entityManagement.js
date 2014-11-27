"use strict";

/*
 *  Do routing setup for the whole entity management module
 */
angular.module("adminUiApp")
    .config(["$stateProvider", function ($stateProvider) {

        $stateProvider
            .state("entityManagement", {
                url: "/entityManagement",
                templateUrl: "app/entityManagement/views/entityManagement.html",
                controller: "EntityManagementCtrl"
            })
            .state("entityManagement.createEntity", {
                url: "/entity/create",
                templateUrl: "app/entityManagement/views/entityManagementCreate.html",
                controller: "EntityManagementCreateCtrl"
            })
            .state("entityManagement.viewEntity", {
                url: "/entity/:id",
                templateUrl: "app/entityManagement/views/entityManagementView.html",
                controller: "EntityManagementViewCtrl"
            })
            .state("entityManagement.editEntity", {
                url: "/entity/:id/edit",
                templateUrl: "app/entityManagement/views/entityManagementEdit.html",
                controller: "EntityManagementEditCtrl"
            }).state("entityManagement.createDiagram", {
                url: "/diagram/create",
                templateUrl: "app/entityManagement/views/entityManagementDiagramCreate.html",
                controller: "EntityManagementDiagramCreateCtrl"
            }).state("entityManagement.viewDiagram", {
                url: "/diagram/:id",
                templateUrl: "app/entityManagement/views/entityManagementDiagramView.html",
                controller: "EntityManagementDiagramViewCtrl"
            }).state("entityManagement.viewDiagram.viewEntity", {
                url: "/entity/:eid",
                templateUrl: "app/entityManagement/views/entityManagementDiagramEntityDetailsView.html",
                controller: "EntityManagementDiagramEntityDetailsViewCtrl"
            }).state("entityManagement.editDiagram", {
                url: "/diagram/:id/edit",
                templateUrl: "app/entityManagement/views/entityManagementDiagramEdit.html",
                controller: "EntityManagementDiagramEditCtrl"
            });
    }]);
