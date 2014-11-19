'use strict';

var express = require('express');
var controller = require('./config.controller');
var auth = require('../../auth/auth.service');
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

module.exports = router;