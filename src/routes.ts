import { Routes } from "@lit-labs/router";
import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { BaseElement } from "#/core/base-element";

@customElement("my-app")
export class MyApp extends BaseElement {
	private _routes = new Routes(
		this,
		[
			{
				path: "/",
				render: () =>
					html`
            <page-home>
              <h1>Vite + Lit + Tailwind CSS</h1>
            </page-home>
          `,
			},
			{ path: "/projects", render: () => html`<h1>Projects</h1>` },
			{ path: "/about", render: () => html`<h1>About</h1>` },
		],
		{
			fallback: { render: () => html`<h1>Page Not Found</h1>` },
		},
	);

	render() {
		return html`
			<nav class="flex gap-4">
				<a class="hover:underline cursor-pointer" @click=${(e: Event) => this._handleNavClick(e, "/")}>Home</a>
				<a class="hover:underline cursor-pointer" @click=${(e: Event) => this._handleNavClick(e, "/projects")}>Projects</a>
				<a class="hover:underline cursor-pointer" @click=${(e: Event) => this._handleNavClick(e, "/about")}>About</a>
			</nav>
			<main class="mt-4">
				${this._routes.outlet()}
			</main>
		`;
	}

	private _handleNavClick(e: Event, path: string) {
		e.preventDefault();
		this._routes.goto(path);
		window.history.pushState(null, "", path);
	}

	connectedCallback() {
		super.connectedCallback();

		// Handle the back/forward browser navigation
		window.addEventListener("popstate", () => this.requestUpdate());

		// Make sure the initial route is correctly rendered.
		// If the URL is currently empty or /, point to the home route.
		if (window.location.pathname === "/" || window.location.pathname === "") {
			// Tidak perlu mengubah URL karena sudah berada di root
			this._routes.goto("/");
		} else {
			// If other urls, navigate to the URL
			this._routes.goto(window.location.pathname);
		}
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		window.removeEventListener("popstate", () => this.requestUpdate());
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"my-app": MyApp;
	}
}
