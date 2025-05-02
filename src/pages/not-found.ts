import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('page-not-found')
export class PageNotFound extends LitElement {
  render() {
    return html`
      <div class="not-found-container">
        <h1 class="error-code">404</h1>
        <h2 class="error-title">Page Not Found</h2>
        <p class="error-message">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <div class="action-container">
          <a href="/" class="back-button" @click=${this._handleHomeClick}>
            Back to Home
          </a>
        </div>
      </div>
    `
  }

  private _handleHomeClick(e: Event) {
    e.preventDefault()
    // Dispatch custom event to be listened by my-app
    this.dispatchEvent(
      new CustomEvent('navigate', {
        bubbles: true,
        composed: true,
        detail: { path: '/' },
      }),
    )
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    .not-found-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 2rem;
      min-height: 100vh; /* Full viewport height */
      width: 100%; /* Full width */
      box-sizing: border-box;
    }

    .error-code {
      font-size: clamp(6rem, 15vw, 8rem); /* Responsive font size */
      font-weight: 700;
      margin: 0;
      color: #e63946;
      line-height: 1;
    }

    .error-title {
      font-size: clamp(1.5rem, 5vw, 2.5rem); /* Responsive font size */
      margin: 1rem 0;
      color: #1d3557;
    }

    .error-message {
      font-size: clamp(1rem, 3vw, 1.2rem); /* Responsive font size */
      margin-bottom: 2rem;
      max-width: 100%;
      width: 600px;
      color: #457b9d;
    }

    .action-container {
      margin-top: 1rem;
    }

    .back-button {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      background-color: #1d3557;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      font-weight: 500;
      transition: background-color 0.3s ease;
    }

    .back-button:hover {
      background-color: #2a4a73;
      cursor: pointer;
    }

    /* Media queries for better responsiveness */
    @media (max-width: 768px) {
      .not-found-container {
        padding: 1rem;
      }

      .error-message {
        width: 100%;
      }
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'page-not-found': PageNotFound
  }
}
