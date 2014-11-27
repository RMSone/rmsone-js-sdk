'use strict';

var express = require('express');
var controller = require('./config.controller');
var auth = require('../../../../server/auth/auth.service.js');
var router = express.Router();

router.get('/navbar', auth.isAuthenticated(), controller.showNavbar);
router.post('/navbar', auth.hasRole('admin'), controller.createNavbar);
router.put('/navbar', auth.hasRole('admin'), controller.createNavbar);

router.get('/page', auth.isAuthenticated(), controller.pages);
router.get('/page/:id', auth.isAuthenticated(), controller.showPage);
router.post('/page', auth.hasRole('admin'), controller.createPage);
router.put('/page/:id', auth.hasRole('admin'), controller.updatePage);
router.patch('/page/:id', auth.hasRole('admin'), controller.updatePage);
router.delete('/page/:id', auth.hasRole('admin'), controller.destroyPage);

router.post('/upload', auth.isAuthenticated(), controller.upload);
router.post('/createdirectory', auth.isAuthenticated(), controller.createdirectory);
router.get('/appinfo', auth.isAuthenticated(), controller.getappinfo);
router.get('/appConfigInfo', controller.getAppConfigList);
router.post('/appinfo', auth.isAuthenticated(), controller.createappinfo);

module.exports = router;