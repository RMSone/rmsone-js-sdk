"use strict";

angular.module("adminUiApp").directive("entityDiagram",
        ["$templateCache", function ($templateCache) {
    function entityDiagram(scope, element) {

        var ClickableView = joint.dia.ElementView.extend({
            pointerdown: function () {
                this._click = true;
                joint.dia.ElementView.prototype.pointerdown.apply(this, arguments);
            },
            pointermove: function () {
                this._click = false;
                joint.dia.ElementView.prototype.pointermove.apply(this, arguments);
            },
            pointerup: function (evt, x, y) {
                if (this._click) {
                    this.notify("cell:click", evt, x, y);
                } else {
                    joint.dia.ElementView.prototype.pointerup.apply(this, arguments);
                }
            }
        });

        var graph = new joint.dia.Graph();
        var paper = new joint.dia.Paper({
            el: element.find(".draw-diagram"),
            gridSize: 1,
            model: graph,
            interactive: function (child) {
                return child.model.attributes.type !== "link";
            },
            elementView: ClickableView
        });

        var MAX_LINES = 5;
        var FONT_SIZE = 12;
        var BOX_WIDTH = 200;
        var PADDING = 20;
        var SCROLLBAR_WIDTH = 8;

        // Define methods for joint.shapes.entity.Entity and joint.shapes.entity.Extend.
        joint.shapes.entity = {
            Entity: joint.shapes.basic.Generic.extend({
                // Markup is defined in entityManagementEntityDiagram.jade.
                markup: $templateCache.get("entityDiagram.html"),
                defaults: joint.util.deepSupplement({
                    type: "basic.Rect",
                    attrs: {
                        ".entity-class-name-rect": {},
                        ".entity-class-name-text": {
                            ref: ".entity-class-name-rect",
                            "ref-x": 0.5,
                            "ref-y": 0.5,
                            "y-alignment": "middle"
                        },
                        ".entity-attrs-wrapper": {},
                        ".entity-class-attrs-rect": {},
                        ".entity-class-attrs-text": {
                             ref: ".entity-class-attrs-rect",
                            "ref-x": 5,
                            "ref-y": 0.5,
                            "y-alignment": "middle"
                        },
                        ".entity-class-attrs-scrollbar": {
                             width: SCROLLBAR_WIDTH
                        }
                    }
                }, joint.shapes.basic.Generic.prototype.defaults),
                initialize: function () {
                    this.updateRectangles();
                    joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
                },
                updateRectangles: function () {
                    var attrs = this.get("attrs");

                    var headerHeight = FONT_SIZE + PADDING;
                    var attributes = this.get("attributes");
                    var contentHeight = Math.min(MAX_LINES, attributes.length) * FONT_SIZE + PADDING;

                    this.attributes.size.width = BOX_WIDTH;
                    this.attributes.size.height = headerHeight + contentHeight;

                    // Set entity size.
                    attrs[".entity-class-name-text"].text = this.get("name");

                    attrs[".entity-class-name-rect"].height = headerHeight;
                    attrs[".entity-class-name-rect"].width = BOX_WIDTH;

                    attrs[".entity-class-attrs-text"].text = attributes.join("\n");

                    attrs[".entity-class-attrs-rect"].height = contentHeight;
                    attrs[".entity-class-attrs-rect"].width = BOX_WIDTH;

                    attrs[".entity-attrs-wrapper"].height = contentHeight;
                    attrs[".entity-attrs-wrapper"].transform = "translate(0, " + headerHeight + ")";

                    // Set entity scrolling according to its attributes.
                    if (attributes.length <= MAX_LINES) {
                        attrs[".entity-class-attrs-scrollbar"].display = "none";
                    } else {
                        attrs[".entity-class-attrs-scrollbar"].height = contentHeight /
                            (attributes.length - MAX_LINES + 1);
                        attrs[".entity-class-attrs-scrollbar"].left = BOX_WIDTH -
                            attrs[".entity-class-attrs-scrollbar"].width;
                        attrs[".entity-class-attrs-scrollbar"].transform = "translate(" +
                            attrs[".entity-class-attrs-scrollbar"].left + ", 0)";
                        attrs[".entity-class-attrs-scrollbar"].scrollHeight = contentHeight;
                    }
                },
                applyEventHandlers: function () {
                    var self = this;
                    var attrs = this.get("attrs");

                    self.scrollIndex = 0;

                    var attrContainer = self.$el.find(".entity-attrs-wrapper");

                    // Hide any excess line spans.
                    if (attrContainer.find(".entity-class-attrs-text").children().length > 0) {
                        attrContainer.find(".entity-class-attrs-text tspan").each(function (i) {
                            angular.element(this).attr("dy", "1em");
                            if (i >= MAX_LINES) {
                                angular.element(this).hide();
                            }
                        });
                    } else {
                        attrContainer.find(".entity-class-attrs-text").parent()
                            .attr("transform", "translate( 0 , " + FONT_SIZE + ")");
                    }

                    // Text is initially set to hidden to avoid incorrect box sizes.
                    attrs[".entity-class-attrs-text"].display = "inline";
                    attrContainer.find(".entity-class-attrs-text").attr("transform",
                        "translate( " + attrs[".entity-class-attrs-text"]["ref-x"] + ", 0)").show();

                    // Handle scrolling.
                    self.$el.on("wheel", function (event) {
                        var lines = attrContainer.find(".entity-class-attrs-text tspan");

                        if (lines.length <= MAX_LINES) {
                            return;
                        }

                        event.preventDefault();
                        event.stopPropagation();

                        normalizeWheelEvent(event);

                        if (event.delta > 0) {
                            if (self.scrollIndex > 0) {
                                self.scrollIndex--;
                            }

                            // Hide the bottom line and show the top one.
                            lines.eq(self.scrollIndex + MAX_LINES).hide();
                            lines.eq(self.scrollIndex).show();

                            // Do this because in FF hidden elements' height remains and offsets the next ones.
                            lines.eq(self.scrollIndex + MAX_LINES).attr("dy", "0");
                            lines.eq(self.scrollIndex).attr("dy", "1em");
                        } else if (event.delta < 0) {
                            if (self.scrollIndex < lines.length - MAX_LINES) {
                                self.scrollIndex++;
                            }

                            // Hide the top line and show the bottom one.
                            lines.eq(self.scrollIndex - 1).hide();
                            lines.eq(self.scrollIndex + MAX_LINES - 1).show();

                            lines.eq(self.scrollIndex - 1).attr("dy", "0");
                            lines.eq(self.scrollIndex + MAX_LINES - 1).attr("dy", "1em");
                        }

                        // Move the scrollbar accordingly.
                        var scrollbar = attrContainer.find(".entity-class-attrs-scrollbar");
                        var scrollAttr = attrs[".entity-class-attrs-scrollbar"];
                        var scrollDistance = (self.scrollIndex / (lines.length - MAX_LINES)) *
                            (scrollAttr.scrollHeight - scrollAttr.height);
                        scrollbar.attr("transform", "translate( " + scrollAttr.left + ", " + scrollDistance + ")");
                    });

                }
            }),
            Extend: joint.dia.Link.extend({
                defaults: {
                    type: "link",
                    subtype: "extend",
                    attrs: {
                        ".marker-target": {
                            d: "M 20 0 L 0 10 L 20 20 z",
                            fill: "white"
                        }
                    }
                }
            }),
            Aggregate: joint.dia.Link.extend({
                defaults: {
                    type: "link",
                    subtype: "aggregate",
                    attrs: {
                        ".marker-target": {
                            d: "M 40 10 L 20 20 L 0 10 L 20 0 z",
                            fill: "white"
                        }
                    }
                }
            })
        };

        applyDragging(paper);
        applyScaling(paper);

        var dictionary = {};
        var diagram = scope.diagram;
        var entities = diagram.entities;
        var cells = parseEntities(entities, dictionary);
        var links = parseLinks(entities, dictionary);

        // Create the graph with parsed links and entities.
        graph.addCells(cells.concat(links));

        // Layout the graph with Dagre
        joint.layout.DirectedGraph.layout(graph, {
            setLinkVertices: false,
            rankSep: 60,
            rankDir: "BT"
        });

        // Resize and scale the diagram after initialization.
        onResize(paper);
        paper.scaleContentToFit({
            padding: 50,
            minScaleX: 0.5,
            minScaleY: 0.5,
            maxScaleX: 2,
            maxScaleY: 2
        });

        // Apply entity box event handlers.
        for (var i = 0; i < cells.length; i++) {
            var cell = cells[i];

            cell.$el = paper.findViewByModel(cell).$el;
            cell.applyEventHandlers();
        }

        paper.on("cell:click", function (child) {
            scope.onSelectEntity(child.model.attributes.entityId);
        });

        var throttledResize = $.throttle(250, onResize.bind(null, paper));
        angular.element(window).on("resize", throttledResize);
    }

    // Parse JSON entities to joint.shapes.entity.Entity objects.
    function parseEntities(entities, dictionary) {
        var parsedEntities = [];
        $.each(entities, function (index, entity) {
            parsedEntities[index] = new joint.shapes.entity.Entity({
                entityId: entity.id,
                name: entity.name,
                attributes: $.map(entity.schema, function (schema) {
                    return schema.name + ": " + schema.type;
                })
            });
            dictionary[entity.name] = parsedEntities[index];
        });
        return parsedEntities;
    }

    // Parse JSON links to joint.shapes.entity.Extend objects.
    function parseLinks(entities, dictionary) {
        var parsedLinks = [];
        $.each(entities, function (index, entity) {
            if (entity.extends != null && dictionary[entity.extends] != null) {
                parsedLinks.push(new joint.shapes.entity.Extend({
                    source: {
                        id: dictionary[entity.name].id
                    },
                    target: {
                        id: dictionary[entity.extends].id
                    }
                }));
            }
            $.each(entity.schema, function (index, field) {
                if (dictionary[field.type] != null) {
                    parsedLinks.push(new joint.shapes.entity.Aggregate({
                        source: {
                            id: dictionary[field.type].id
                        },
                        target: {
                            id: dictionary[entity.name].id
                        }
                    }));
                }
            });
        });
        return parsedLinks;
    }

    // Transformations.
    var origin = {
        x: 0,
        y: 0
    };
    var scale = 1;

    function applyDragging(paper) {
        var startPos = {
            x: 0,
            y: 0
        };

        var dragging = false;

        // Start dragging
        paper.on("blank:pointerdown", function (e) {
            dragging = true;
            startPos.x = e.pageX;
            startPos.y = e.pageY;
        });

        // Apply dragging
        paper.$el.on("mousemove", function (e) {
            if (dragging) {
                e.stopPropagation();
                e.preventDefault();
                paper.setOrigin(origin.x + e.pageX - startPos.x, origin.y + e.pageY - startPos.y);
            }
        });

        // Stop when the pointer leaves the canvas
        paper.$el.on("mouseleave", function (ue) {
            if (dragging) {
                dragging = false;
                origin.x += ue.pageX - startPos.x;
                origin.y += ue.pageY - startPos.y;
            }
        });

        // Or stop when the button is released
        paper.on("blank:pointerclick", function (ue) {
            if (dragging) {
                ue.stopPropagation();
                ue.preventDefault();
                origin.x += ue.pageX - startPos.x;
                origin.y += ue.pageY - startPos.y;
                dragging = false;
            }
        });
    }

    // Different browsers, different implementations.
    function normalizeWheelEvent(event) {
        var dir = "none";
        if (event.originalEvent.wheelDelta) {
            // Webkit
            if (event.originalEvent.wheelDelta > 0) {
                dir = "up";
            } else {
                dir = "down";
            }
        } else if (event.originalEvent.deltaY) {
            // Firefox, IE
            if (event.originalEvent.deltaY > 0) {
                dir = "down";
            } else {
                dir = "up";
            }
        }

        if (dir === "up") {
            event.delta = 1;
        } else if (dir === "down") {
            event.delta = -1;
        } else {
            event.delta = 0;
        }

        if (event.originalEvent.offsetX !== undefined && event.originalEvent.offsetY !== undefined) {
            // Webkit, IE
            event.x = event.originalEvent.offsetX;
            event.y = event.originalEvent.offsetY;
        } else if (event.originalEvent.clientX !== undefined && event.originalEvent.clientY !== undefined) {
            // FF
            event.x = event.originalEvent.clientX - event.currentTarget.getBoundingClientRect().left;
            event.y = event.originalEvent.clientY - event.currentTarget.getBoundingClientRect().top;
        }
    }

    // Apply zoom from the mouse scroll handling.
    function applyScaling(paper) {
        var ZOOM_STEP = 0.2;
        var MIN_ZOOM = 0.2;
        var MAX_ZOOM = 5;

        paper.$el.on("wheel", function (e) {
            e.preventDefault();
            normalizeWheelEvent(e);

            var oldScale = scale;

            // Decide which to go. If we're already at the max/min or didn't scroll at all just leave
            if (e.delta > 0) {
                if (scale <= MAX_ZOOM - ZOOM_STEP) {
                    scale += ZOOM_STEP;
                } else {
                    return;
                }
            } else if (e.delta < 0) {
                if (scale >= MIN_ZOOM + ZOOM_STEP) {
                    scale -= ZOOM_STEP;
                } else {
                    return;
                }
            } else {
                return;
            }

            // Get a bounding box before and after scaling
            var oldbb = paper.getContentBBox();
            paper.setOrigin(0, 0);
            paper.scale(scale, scale);
            var newbb = paper.getContentBBox();

            var newCenter = {
                x: oldbb.x + oldbb.width / 2,
                y: oldbb.y + oldbb.height / 2
            };

            var pointerPos = {
                x: e.x,
                y: e.y
            };

            // Calculate the distance the object should move relative to the cursor
            var offset = {
                x: newCenter.x - (newCenter.x - pointerPos.x) * (oldScale / scale) - pointerPos.x,
                y: newCenter.y - (newCenter.y - pointerPos.y) * (oldScale / scale) - pointerPos.y
            };

            // Keep the old position after scaling
            origin.x = newCenter.x - newbb.x - (newbb.width / 2);
            origin.y = newCenter.y - newbb.y - (newbb.height / 2);

            // Offset relative to the cursor position
            origin.x += offset.x;
            origin.y += offset.y;

            // Finally apply the new origin
            paper.setOrigin(origin.x, origin.y);
        });
    }

    // Resize the diagram according to paper size.
    function onResize(paper) {
        var width = paper.$el.width();
        var height = paper.$el.height();
        paper.setDimensions(width, height);
    }

    return {
        templateUrl: "app/entityManagement/views/entityManagementEntityDiagram.html",
        link: entityDiagram
    };
}]);
