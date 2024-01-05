class DigitalBreadcrumb extends HTMLElement {
  constructor() {
    super();

    const digitalBreadcrumbContainer = document.createElement("template");
    digitalBreadcrumbContainer.innerHTML = `
                <style>
                    :host {
						--digital-text-color: var(--breadcrumb-text-color);
						--digital-font-size: var(--breadcrumb-font-size);
						--digital-link-hover: var(--breadcrumb-link-hover);
						--breadcrumb-gap: 6px;
					}

					ol, ul {
						list-style: none;
						padding: 0;
						margin: 0;
					}

                    *, *::before, *::after {
                        box-sizing: inherit;
                    }
                </style>

                <style>
				    /* ol */
                    .breadcrumb--list {
                      display: flex;
                      flex-wrap: wrap;
                      color: var(--digital-text-color);
                      font-size: var(--digital-font-size);
                      align-items: self-start;
                      column-gap: var(--breadcrumb-gap);
	                  padding-top: calc(var(--breadcrumb-gap) * 1.5);
                      padding-bottom: calc(var(--breadcrumb-gap) * 1.5);
                    }

                    /* li */
                    .breadcrumb--item__list {
                      display: inline-flex;
                      flex: 0 1 auto;
                    }

                    .breadcrumb--item__list + .breadcrumb--item__list::before {
                      position: relative;
                      content: ">";
                      padding-left: var(--breadcrumb-gap);
                      align-self: self-start;
                      top: 0.1em;
                    }


                    /* a */
                    .breadcrumb--link {
                      color: inherit;
                      font-size: inherit;
                    }

                    .breadcrumb--link:hover {
                      color: var(--digital-link-hover);
                    }

                    .breadcrumb--link:not(:focus) {
                      text-decoration: none;
                    }

                    [aria-current="page"] {
                      pointer-events: none;
                    }
                </style>

                <section class="digital--breadcrumb--wrapper" part="digital--breadcrumb--wrapper"></section>
            `;

    this._breadcrumb = [];
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(digitalBreadcrumbContainer.content);
  }

  set breadcrumb(breadcrumbsList) {
    // console.log('set breadcrumb run with: ', breadcrumbsList);
    this._breadcrumb = breadcrumbsList;
    this.biuldBreadcrums();
  }

  biuldBreadcrums() {
    if (this._breadcrumb?.length > 0) {
      const links = this._breadcrumb.map((data, index) => {
        console.log(index, data.Page.DisplayName);
        return `<li class="breadcrumb--item__list" data-index="${index}">
                            <a class="breadcrumb--link" href="${
                              data.Page.LinkUrl
                            }" ${
          this._breadcrumb.length === index + 1 ? 'aria-current="page"' : ""
        }>${data.Page.DisplayName}</a>
                        </li>`;
      });

      this.shadowRoot.querySelector(
        ".digital--breadcrumb--wrapper"
      ).innerHTML = `
                <div class="digital--container" part="digital--container">
                    <nav class="digital--breadcrumb" aria-label="Breadcrumb">
                        <ol class="breadcrumb--list">
                            <li class="breadcrumb--item__list">
                                <a class="breadcrumb--link" href="\">דך הבית</a>
                            </li>
                            ${links.join("")}
                        </ol>
                    </nav>
                </div>
            `;
    } else {
      console.info("No breadcrumb to show");
      this.shadowRoot.querySelector(".digital--breadcrumb--wrapper").innerHTML =
        "";
    }
  }
}

window.customElements.define("digital-breadcrumb", DigitalBreadcrumb);
