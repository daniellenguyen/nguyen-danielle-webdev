var mongoose = require("mongoose");
var db = require("../../../database.js");
var widgetSchema = require("./widget.schema.server");
var widgetModel = mongoose.model("WidgetModel", widgetSchema);
var pageModel = require("../page/page.model.server");

widgetModel.createWidget = createWidget;
widgetModel.findWidgetsByPageId = findWidgetsByPageId;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
module.exports = widgetModel;

function createWidget(pageId, widget) {
  var widgetTmp = null;
  return widgetModel
    .create(widget)
    .then(function (widgetDoc) {
      widgetTmp = widgetDoc;
      return pageModel.addWidget(pageId, widgetDoc._id); // TODO
    })
    .then(function () {
      return widgetTmp;
    })
}

function findWidgetsByPageId(pageId) {
  return widgetModel
    .find({page_id: pageId})
    .populate('_page')
    .exec();
}

function findWidgetById(widgetId) {
  return widgetModel.findById(widgetId);
}

function updateWidget(widget) {
  return widgetModel
    .findOneAndUpdate({_id: widget._id}, {$set: widget});
}

function deleteWidget(pageId, widgetId) {
  return widgetModel
    .remove({_id: widgetId})
    .then(function () {
      return pageModel.removeWidget(pageId, widgetId); //TODO
    });
}