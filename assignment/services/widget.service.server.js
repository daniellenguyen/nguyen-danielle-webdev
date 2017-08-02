var app = require('../../express.js');

module.exports = {
  0: createWidget,
  1: findWidgetsByPageId,
  2: findWidgetById,
  3: updateWidget,
  4: deleteWidget
};

var widgets = [
  {"_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
  {"_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
  {
    "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
    "url": "http://lorempixel.com/400/200/"
  },
  {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "Lorem ipsum"},
  {"_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
  {
    "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
    "url": "https://www.youtube.com/embed/AM2Ivdi9c4E"
  },
  {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "Lorem ipsum"}
];

// http handlers
app.post("/api/page/:pid/widget", createWidget);
app.get("/api/page/:pid/widget", findWidgetsByPageId);
app.get("/api/widget/:wid", findWidgetById);
app.put("/api/widget/:wid", updateWidget);
app.delete("/api/widget/:wid", deleteWidget);

function createWidget(request, response) {
  var widget = request.body;
  var newWidgets = widgets;
  newWidgets.push(widget);
  widgets = newWidgets;
  response.send(newWidgets);
}

function findWidgetsByPageId(request, response) {
  var pageId = request.params.pid;
  var widgetList = [];
  if (pageId) {
    for (var i = 0; i < widgets.length; i++) {
      if (widgets[i].pageId === pageId) {
        widgetList.push(widgets[i]);
      }
    }
    response.send(widgetList);
  }
}

function findWidgetById(request, response) {
  var widgetId = request.params.wid;
  if (widgetId) {
    for (var i = 0; i < widgets.length; i++) {
      if (widgets[i]._id === widgetId) {
        response.send(widgets[i]);
      }
    }
  }
}

function updateWidget(request, response) {
  var widgetId = request.params.wid;
  var widget = request.body;
  var newWidgets = widgets;
  if (widget && widgetId) {
    for (var i = 0; i < widgets.length; i++) {
      if (newWidgets[i]._id === widgetId) {
        newWidgets[i] = widget;
        widgets = newWidgets;
        response.send(newWidgets);
      }
    }
  }
}

function deleteWidget(request, response) {
  var widgetId = request.params.wid;
  var newWidgets = widgets;
  if (widgetId) {
    for (var i = 0; i < widgets.length; i++) {
      if (newWidgets[i]._id === widgetId) {
        newWidgets.splice(i, 1);
        widgets = newWidgets;
        response.send(newWidgets);
      }
    }
  }
}

