const template = document.createElement("template");
template.innerHTML = `<button id="button"></button>`;

class CWCButton extends HTMLElement {
  //   constructor() {
  //     super();

  //     const template = document.getElementById("person-template");
  //     const templateContent = template.content;

  //     const shadowRoot = this.attachShadow({ mode: "open" });

  //     const style = document.createElement("style");
  //     style.textContent = `
  //           div { padding: 10px; border: 1px solid gray; width: 200px; margin: 10px; }
  //           h2 { margin: 0 0 10px; }
  //           ul { margin: 0; }
  //           p { margin: 10px 0; }
  //           ::slotted(*) { color: gray; font-family: sans-serif; }
  //         `;

  //     shadowRoot.appendChild(style);
  //     shadowRoot.appendChild(templateContent.cloneNode(true));
  //   }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    console.log("30", shadowRoot);
    shadowRoot.appendChild(template.content.cloneNode(true));
  }
  connectedCallback() {
    var button = document.querySelector("cwc-button");
    console.log("12 button", button);
    button.innerHTML = button.getAttribute("label");
    // this.addEventListener("click", this.onclick);
  }
  adoptedCallback() {
    console.log("moved to a new document");
  }
  disconnectedCallback() {
    this.removeEventListener("click", this.onclick);
  }
  static get observedAttributes() {
    return ["disabled"];
  }
  set disabled(bool) {
    this.setAttribute("disabled", bool.toString());
  }
  get disabled() {
    return this.getAttribute("disabled") === "true";
  }
  attributeChangedCallback(attrName, oldVal, newVal) {
    switch (attrName) {
      case "disabled": {
        this.shadowRoot.getElementById("button").disabled = newVal === "true";
        break;
      }
      default: {
        console.log("unhandled attribute change", attrName, oldVal, newVal);
        break;
      }
    }
  }
  onclick() {
    const button = this.shadowRoot.getElementById("button");
    if (event.composedPath().includes(button)) {
      console.log("button clicked");
    }
  }
}

customElements.define("cwc-button", CWCButton);
