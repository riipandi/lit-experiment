import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import litLogo from '/images/lit.svg'
import viteLogo from '/images/vite.svg'

@customElement('page-home')
export class PageHome extends LitElement {
  @property() docsHint = 'Click on the Vite and Lit logos to learn more'
  @property({ type: Number }) count = 0

  render() {
    return html`
      <div class="container">
        <div class="hero">
          <div class="logo-container">
            <a href="https://vite.dev" target="_blank" class="logo-link">
              <img src=${viteLogo} class="logo" alt="Vite logo" />
            </a>
            <a href="https://lit.dev" target="_blank" class="logo-link">
              <img src=${litLogo} class="logo" alt="Lit logo" />
            </a>
          </div>

          <div class="slot-container">
            <slot></slot>
          </div>

          <div class="button-container">
            <my-button
              size="medium"
              variant="primary"
              @:click=${this._onClick}
              ?disabled=${this.count >= 10}
              part="button"
            >
              count is ${this.count}
            </my-button>
          </div>

          <p class="hint-text">${this.docsHint}</p>
        </div>
      </div>
    `
  }

  private _onClick() {
    this.count++
  }

  static styles = css`
    .container {
      margin-left: auto;
      margin-right: auto;
      padding-left: 1rem;
      padding-right: 1rem;
      padding-top: 2rem;
      padding-bottom: 2rem;
      max-width: 56rem;
      background-color: var(--color-background);
      color: var(--color-foreground);
    }

    .hero {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 70vh;
    }

    .logo-container {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .logo-link {
      transition: opacity 0.3s;
    }

    .logo-link:hover {
      opacity: 0.8;
    }

    .logo {
      height: 6rem;
      width: 6rem;
    }

    .slot-container {
      margin-bottom: 2rem;
    }

    .button-container {
      display: flex;
      justify-content: center;
      margin-bottom: 1.5rem;
    }

    .hint-text {
      font-size: 0.875rem;
      color: var(--color-muted-foreground);
      text-align: center;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'page-home': PageHome
  }
}
