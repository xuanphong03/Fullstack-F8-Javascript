class F8 {
  constructor() {}
  static component(tagName, { data, template }) {
    const componentData = data?.() || {};

    class Component extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({
          mode: "open",
        });
        this.data = { ...componentData };
        this.attributesCallback = {};
      }

      connectedCallback() {
        this.renderUI();
        this.applyAttributes();
      }

      renderUI() {
        const results = template.match(/{{.+?}}/g) || [];
        results.forEach((result) => {
          const variableResult = result.match(/{{(.+?)}}/);
          const key = variableResult[1].trim();
          template = template.replace(
            variableResult[0],
            `<span class='${key}'>${this.data[key]}</span>`
          );
        });
        this.shadowRoot.innerHTML = template;
      }

      applyAttributes(parentElement = this.shadowRoot) {
        const elementsList = parentElement.children;
        if (elementsList.length) {
          Array.from(elementsList).forEach(function (element, index) {
            const attributesList = element.attributes;

            for (var i = 0; i < attributesList.length; i++) {
              const attributeName = attributesList[i].name;
              const attributeValue = attributesList[i].value;
              if (attributeName.startsWith("v-on:")) {
                const eventName = attributeName.replace("v-on:", "");
                element.addEventListener(
                  eventName,
                  function (e) {
                    attributeValue.split(";").forEach((attr) => {
                      Object.keys(this.data).forEach((keyData) => {
                        if (attr.includes(keyData)) {
                          eval(`this.data.${attr}`);
                          // Cập nhật lại UI
                          const updatedElement = this.shadowRoot.querySelector(
                            `.${keyData}`
                          );
                          updatedElement.innerText = this.data[keyData];
                        }
                      });
                    });
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
    }
    customElements.define(tagName, Component);
  }
}
