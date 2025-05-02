import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('root-layout')
export class RootLayout extends LitElement {
  render() {
    return html`
      <div class="container">
        <header class="header">
          <nav class="nav">
            <a class="nav-link" @click=${(e: Event) => this._handleNavClick(e, '/')}>Home</a>
            <a class="nav-link" @click=${(e: Event) => this._handleNavClick(e, '/projects')}>Projects</a>
            <a class="nav-link" @click=${(e: Event) => this._handleNavClick(e, '/about')}>About</a>
            <a class="nav-link" href="/404">Not Found</a>
          </nav>
        </header>
        <main class="main">
          <slot></slot>
        </main>
      </div>
    `
  }

  private _handleNavClick(e: Event, path: string) {
    e.preventDefault()
    this.dispatchEvent(
      new CustomEvent('navigate', {
        bubbles: true,
        composed: true,
        detail: { path },
      }),
    )
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .container {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      background-color: var(--color-background, #ffffff);
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
    }

    .nav {
      display: flex;
      gap: 1rem;
    }

    .nav-link {
      cursor: pointer;
    }

    .nav-link:hover {
      text-decoration: underline;
    }

    .main {
      padding: 1rem;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'root-layout': RootLayout
  }
}
