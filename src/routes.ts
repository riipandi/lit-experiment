import { Routes } from '@lit-labs/router'
import { html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { BaseElement } from '#/core/base-element'

// Polyfills URLPattern to handle better borwsers compatibility.
// @see: https://developer.mozilla.org/en-US/docs/Web/API/URLPattern#browser_compatibility
// @ts-ignore: Property 'UrlPattern' does not exist
import 'urlpattern-polyfill'

@customElement('my-app')
export class MyApp extends BaseElement {
  private _routes = new Routes(
    this,
    [
      {
        path: '/',
        render: () =>
          html`
            <root-layout @navigate=${this._onNavigate}>
              <page-home>
                <h1>Vite + Lit + Tailwind CSS</h1>
              </page-home>
            </root-layout>
          `,
      },
      {
        path: '/projects',
        render: () => html`
					<root-layout @navigate=${this._onNavigate}>
						<h1>Projects</h1>
					</root-layout>
				`,
      },
      {
        path: '/about',
        render: () => html`
					<root-layout @navigate=${this._onNavigate}>
						<h1>About</h1>
					</root-layout>
				`,
      },
    ],
    {
      fallback: {
        render: () => html` <page-not-found @navigate=${this._onNavigate}></page-not-found>`,
      },
    },
  )

  render() {
    return this._routes.outlet()
  }

  private _onNavigate(e: CustomEvent) {
    const path = e.detail.path
    this._routes.goto(path)
    window.history.pushState(null, '', path)
  }

  connectedCallback() {
    super.connectedCallback()

    // Handle the back/forward browser navigation
    window.addEventListener('popstate', () => this.requestUpdate())

    // Make sure the initial route is correctly rendered.
    // If the URL is currently empty or /, point to the home route.
    if (window.location.pathname === '/' || window.location.pathname === '') {
      this._routes.goto('/')
    } else {
      // If other urls, navigate to the URL
      this._routes.goto(window.location.pathname)
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    window.removeEventListener('popstate', () => this.requestUpdate())
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-app': MyApp
  }
}
