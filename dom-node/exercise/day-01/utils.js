const utils = {
  createElement: function (tagName, attributes = {}, ...children) {
    var element = document.createElement(tagName);
    Object.keys(attributes).forEach(function (key) {
      if (key.startsWith("on")) {
        var eventName = key.toLowerCase().replace("on", "");
        element.addEventListener(eventName, attributes[key]);
      } else if (key.startsWith("data-")) {
        var datasetName = key.slice(key.indexOf("-") + 1);
        element.dataset[datasetName] = attributes[key];
      } else {
        element[key] = attributes[key];
      }
    });
    if (children.length) {
      children.forEach(function (item) {
        element.append(item);
      });
    }
    return element;
  },
  render: function (rootEl, node) {
    // rootEl.innerText = "";
    rootEl.append(node);
  },
};
