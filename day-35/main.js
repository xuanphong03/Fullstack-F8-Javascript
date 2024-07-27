// Định nghĩa hàm tạo component
var useCustomElement = {
  create: function (name, callback) {
    class Component extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({
          mode: "open",
        });
        this.attributesCallback = {
          "v-length": "applyAttributeLength",
        };
        this.data = {};
      }
      connectedCallback() {
        this.render();
        this.applyAttributes();
      }
      render() {
        this.shadowRoot.innerHTML = callback.call(this.shadowRoot);
      }
      applyAttributes(parentElement = this.shadowRoot) {
        var elementsList = parentElement.children;
        if (elementsList.length) {
          Array.from(elementsList).forEach(function (element, index) {
            const attributesList = element.attributes;
            for (var i = 0; i < attributesList.length; i++) {
              var attributeName = attributesList[i].name;
              var attributeValue = attributesList[i].value;
              var callbackName = this.attributesCallback[attributeName];
              if (callbackName) {
                this[callbackName].call(this, element, attributeValue);
              }
              //   var data = {};
              if (attributeName === "v-data") {
                var dataObj = new Function(`return ${attributeValue}`).call();
                if (
                  typeof dataObj === "object" &&
                  !Array.isArray(dataObj) &&
                  dataObj !== null
                ) {
                  Object.assign(this.data, dataObj);
                }
              }
              if (attributeName === "v-text" && attributeValue) {
                element.innerText = this.data[attributeValue] ?? "";
              }
              if (attributeName.startsWith("v-on:")) {
                const eventName = attributeName.replace("v-on:", "");

                element.addEventListener(
                  eventName,
                  function (e) {
                    var argumentNameList = ["event"];
                    var argumentValueList = [e];

                    Object.keys(this.data).forEach(function (key) {
                      argumentNameList.push(key);
                      argumentValueList.push(this.data[key]);
                    }, this);
                    argumentNameList.push(attributeValue);
                    // something(a,b,c) => some.apply(args)
                    var func = Function.apply(null, argumentNameList);
                    func.apply(this, argumentValueList);
                    // console.log("argumentNameList", argumentNameList);
                    // console.log("argumentValueList", argumentValueList);
                  }.bind(this)
                );
              }
            }
            // Đệ quy
            if (element.children.length) {
              this.applyAttributes(element);
            }
          }, this);
        }
      }
      applyAttributeLength(element, value) {
        // var nextEl = element.nextSibling;
        // var parentEl = element.parentNode;
        for (var i = 0; i < value - 1; i++) {
          var newElement = element.cloneNode(true);
          this.insertAfter(element, newElement);
        }
      }
      applyAttributeEvent() {}
      insertAfter(referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(
          newNode,
          referenceNode.nextSibling
        );
      }
    }
    customElements.define(name, Component);
  },
};

var HelloWorld = useCustomElement.create("hello-world", function () {
  var data = 1;
  // Chứa nội dung của component
  return `
            <div v-data="{count: 0, title: 'Học JS không khó', user:{name:'Xuân Phong'}}">
                <h1>Count: <span v-text="count"></span> </h1>
                <button v-on:click="count++; console.log('count', count);">Increase</button>
                <ul>
                    <li v-length='10'>Hoc lap trinh qua kho</li>
                </ul>
            </div>
        `;
});
