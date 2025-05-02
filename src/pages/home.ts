import { StoreController } from '@nanostores/lit'
import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { saveUiState, uiStore } from '#/stores/ui.store'

import litLogo from '/images/lit.svg'
import viteLogo from '/images/vite.svg'

@customElement('page-home')
export class PageHome extends LitElement {
  @property() docsHint = 'Click on the Vite and Lit logos to learn more'

  protected uiState = new StoreController(this, uiStore)

  render() {
    const { counter, disabled = false } = this.uiState.value.global
    const isMaxReached = counter >= 10
    const isMinReached = counter <= 0

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

          <div class="counter-container">
            <my-button
              size="medium"
              variant="secondary"
              @click=${this._onDecrement}
              ?disabled=${isMinReached || disabled}
              part="button"
            >
              -
            </my-button>

            <div class="counter-value">
              ${counter}
            </div>

            <my-button
              size="medium"
              variant="secondary"
              @click=${this._onIncrement}
              ?disabled=${isMaxReached || disabled}
              part="button"
            >
              +
            </my-button>
          </div>

          <div class="counter-status">
            ${isMaxReached ? html`<span class="status-max">Maximum value reached!</span>` : ''}
            ${isMinReached ? html`<span class="status-min">Minimum value reached!</span>` : ''}
            ${disabled ? html`<span class="status-disabled">Counter is disabled</span>` : ''}
          </div>

          <div class="button-container">
            <my-button
              size="medium"
              variant="primary"
              @click=${this._toggleCounter}
              part="button"
            >
              ${disabled ? 'Enable' : 'Disable'} Counter
            </my-button>
          </div>

          <p class="hint-text">${this.docsHint}</p>
        </div>
      </div>
    `
  }

  private _onIncrement() {
    const { disabled = false } = this.uiState.value.global
    if (disabled) return

    const currentCounter = this.uiState.value.global.counter
    if (currentCounter < 10) {
      saveUiState('global', {
        ...this.uiState.value.global,
        counter: currentCounter + 1,
      })
    }
  }

  private _onDecrement() {
    const { disabled = false } = this.uiState.value.global
    if (disabled) return

    const currentCounter = this.uiState.value.global.counter
    if (currentCounter > 0) {
      saveUiState('global', {
        ...this.uiState.value.global,
        counter: currentCounter - 1,
      })
    }
  }

  private _toggleCounter() {
    const currentDisabled = this.uiState.value.global.disabled || false

    saveUiState('global', {
      ...this.uiState.value.global,
      disabled: !currentDisabled,
    })
  }

  static styles = css`
    :host {
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
      gap: 1.5rem;
    }

    .logo-container {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2rem;
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
      width: 100%;
      text-align: center;
    }

    .counter-container {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
    }

    .counter-value {
      font-size: 2rem;
      font-weight: bold;
      min-width: 3rem;
      text-align: center;
      color: var(--color-primary);
    }

    .counter-status {
      text-align: center;
      min-height: 1.5rem;
      font-size: 0.875rem;
    }

    .status-max {
      color: var(--color-warning, orange);
    }

    .status-min {
      color: var(--color-info, blue);
    }

    .status-disabled {
      color: var(--color-error, red);
    }

    .button-container {
      display: flex;
      justify-content: center;
      margin-top: 0.1rem;
    }

    .hint-text {
      font-weight: 500;
      font-size: 1.125rem;
      line-height: 1.75rem;
      color: var(--color-muted-foreground);
      text-align: center;
      margin-top: 1rem;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'page-home': PageHome
  }
}
