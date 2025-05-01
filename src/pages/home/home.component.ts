import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import litLogo from "/images/lit.svg";
import viteLogo from "/images/vite.svg";
import { styles } from "./home.styles";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement("page-home")
export class PageHome extends LitElement {
	/**
	 * Copy for the read the docs hint.
	 */
	@property()
	docsHint = "Click on the Vite and Lit logos to learn more";

	/**
	 * The number of times the button has been clicked.
	 */
	@property({ type: Number })
	count = 0;

	render() {
		return html`
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src=${viteLogo} class="logo" alt="Vite logo" />
        </a>
        <a href="https://lit.dev" target="_blank">
          <img src=${litLogo} class="logo lit" alt="Lit logo" />
        </a>
      </div>
      <slot></slot>
      <div class="bg-black size-2xl">
        <my-button
          size="medium"
          variant="primary"
          @:click=${this._onClick}
          ?disabled=${this.count >= 10}
          class="green"
          part="button"
        >
          count is ${this.count}
        </my-button>
      </div>
      <p class="read-the-docs">${this.docsHint}</p>
    `;
	}

	private _onClick() {
		this.count++;
	}

	static styles = styles;
}
