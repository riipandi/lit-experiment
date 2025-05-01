import type { PageHome } from "./home.component";

declare global {
	interface HTMLElementTagNameMap {
		"page-home": PageHome;
	}
}

export * from "./home.component";
