customElements.define(
  "welcome-back-wrapper",
  class extends HTMLElement {
    constructor() {
      super();

      this.title = window.currentApplication.title;

      const template = document.createElement("template");
      template.innerHTML = `
        <style>
          :host {
            display: flex;
            font-size: var(--breadcrumb-font-size);
            justify-content: space-between;
					}

          .custom-main-title {
            font-size: inherit;
            font-weight: inherit;
          }
          
          @media (min-width: 900px) {
            :host {
              align-items: flex-end;
            }
          }
            
          @media (max-width: 899.8px) {
            :host {
              flex-direction: column-reverse;
              padding: 20px 10px 0 10px;
            }
          }

          *, *::before, *::after {
              box-sizing: inherit;
          }
        </style>

              <main-title>
              <h1 slot="title" class="custom-main-title">${
                this.title
              }</h1>                 
              </main-title>
                
              <last-login>
                <span slot="meeting-time">${
                  window.digitalData.welcomeText
                }</span>
                <span slot="user-name">${
                  window.userDetails.firstName +
                  "" +
                  window.userDetails.lastName
                }</span>
                
                <span slot="last-text">מועד כניסה אחרון</span>
                <span slot="last-login">${window.userDetails.lastLogin}</span>
                <span slot="member-since">${
                  window.userDetails.memberSince
                }</span>

              </last-login>
      `;

      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    attributeChangedCallback(name, oldValue, newValue) {
      const _this = this.shadowRoot;

      if (name === "title") {
        _this.querySelector('[slot="title"]').innerText = newValue;
      }
    }

    static get observedAttributes() {
      return ["title"];
    }

    connectedCallback() {
      // alert(this.title);
    }
  }
);

customElements.define(
  "main-title",
  class extends HTMLElement {
    constructor() {
      super();

      const template = document.createElement("template");
      template.innerHTML = `
        <style>
        *, *::before, *::after {
            box-sizing: inherit;
        }
          :host {
            font-size: inherit;
          }
          .title { color: var(--welcome-secondary-color); font-weight: 700; margin: 0; }
          @media (min-width: 900px) {
            .title {          
              font-size: 1.57142857em;
            }
          }
          @media (max-width: 899.8px) {
            .title {            
              font-size: 1.3em;
              font-weight: 600;
            }
          }
        </style>
        <h2 part="title" class="title"><slot name="title">NAME MISSING</slot></h2>
      `;

      const shadowRoot = this.attachShadow({ mode: "open" });
      shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }
);

customElements.define(
  "last-login",
  class extends HTMLElement {
    constructor() {
      super();

      this.isAmex =
        document.querySelector("[data-site]").getAttribute("data-site") ==
        "amex";

      const template = document.createElement("template");
      template.innerHTML = `
        <style>
         :host {
            color: var(--breadcrumb-text-color);
            font-size: var(--breadcrumb-font-size);
					}

          dl, dd, dt {margin: 0;}

          *, *::before, *::after {
              box-sizing: inherit;
          }
          [part*="personal__area-"] {
            display: flex;
          }
          [part*="personal__area--wrapper"] {
            flex-direction: column;
            align-items: flex-end;
            gap: 0;
          }
          .personal__area--name { color: var(--welcome-secondary-color); font-weight: 700; font-size: 1.2em; }
        </style>
        
        <dl part="personal__area--wrapper">
          <div part="personal__area--name" class="personal__area--name">
            <dd>
              <slot name="meeting-time">good</slot>&nbsp;<slot name="user-name">name</slot>
            </dd>
          </div>
          
          <div part="personal__area--last_login">
            <dt>
              <slot name="last-text">last login</slot>&nbsp;
            </dt>
            <dd>
              <time dir="ltr"><slot name="last-login">02/02</slot></time>
            </dd>
          </div>
          ${
            this.isAmex === true && window.userDetails.memberSince
              ? `<div part="amex-only personal__area--member_since" dir="ltr">
                  <dt>
                    Member Since&nbsp;
                  </dt>
                  <dd>
                    <slot name="member-since">06.06.2011</slot>
                  </dd>
                  </div>
              </dl>`
              : ""
          }
      `;

      const shadowRoot = this.attachShadow({ mode: "open" });
      shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }
);
