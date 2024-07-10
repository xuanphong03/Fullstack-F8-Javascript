var F8 = {
  createElement: function (tagName, attributes = {}, ...children) {
    var element = document.createElement(tagName);
    Object.keys(attributes).forEach(function (key) {
      if (key.startsWith("on")) {
        var eventName = key.toLowerCase().replace("on", "");
        element.addEventListener(eventName, attributes[key]);
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
    rootEl.innerText = ""; // Reset đảm bảo trong root không có gì
    rootEl.append(node);
  },
};
