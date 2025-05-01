import { css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { BaseElement } from "#/core/base-element";

@customElement("root-layout")
export class RootLayout extends BaseElement {
	render() {
		return html`
      <div class="flex flex-col size-full bg-background">
        <header class="flex justify-between items-center p-4">
          <nav class="flex gap-4">
            <a class="hover:underline cursor-pointer" @click=${(e: Event) => this._handleNavClick(e, "/")}>Home</a>
            <a class="hover:underline cursor-pointer" @click=${(e: Event) => this._handleNavClick(e, "/projects")}>Projects</a>
            <a class="hover:underline cursor-pointer" @click=${(e: Event) => this._handleNavClick(e, "/about")}>About</a>
            <a class="hover:underline cursor-pointer" href="/404">Not Found</a>
          </nav>
        </header>
        <main class="p-4">
          <slot></slot>
        </main>
      </div>
    `;
	}

	private _handleNavClick(e: Event, path: string) {
		e.preventDefault();
		this.dispatchEvent(
			new CustomEvent("navigate", {
				bubbles: true,
				composed: true,
				detail: { path },
			}),
		);
	}

	static styles = css`
    :host {
      display: block;
      width: 100%;
    }
  `;
}

declare global {
	interface HTMLElementTagNameMap {
		"root-layout": RootLayout;
	}
}
