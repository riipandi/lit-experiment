import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('root-layout')
export class RootLayout extends LitElement {
  render() {
    return html`
      <div class="container">
        <header class="header">
          <nav class="nav">
            <a class="nav-link" @click=${(e: Event) => this._handleNavClick(e, '/')}>
              <lucide-icon name="home" size="18"></lucide-icon>
              <span>Home</span>
            </a>
            <a class="nav-link" @click=${(e: Event) => this._handleNavClick(e, '/projects')}>
              <lucide-icon name="folder" size="18"></lucide-icon>
              <span>Projects</span>
            </a>
            <a class="nav-link" @click=${(e: Event) => this._handleNavClick(e, '/about')}>
              <lucide-icon name="user" size="18"></lucide-icon>
              <span>About</span>
            </a>
            <a class="nav-link" href="/404">
              <lucide-icon name="alert-circle" size="18"></lucide-icon>
              <span>Not Found</span>
            </a>
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
      background-color: var(--color-background);
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border-bottom: 1px solid var(--color-border, #eaeaea);
    }

    .nav {
      display: flex;
      gap: 1.5rem;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      color: var(--color-text, #333);
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .nav-link:hover {
      color: var(--color-primary, #0070f3);
    }

    .main {
      padding: 1.5rem;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'root-layout': RootLayout
  }
}
