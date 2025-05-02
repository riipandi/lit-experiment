import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import litLogo from '/images/lit.svg'
import viteLogo from '/images/vite.svg'
import { BaseElement } from '#/core/base-element'

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('page-home')
export class PageHome extends BaseElement {
  /**
   * Copy for the read the docs hint.
   */
  @property()
  docsHint = 'Click on the Vite and Lit logos to learn more'

  /**
   * The number of times the button has been clicked.
   */
  @property({ type: Number }) count = 0

  render() {
    return html`
      <div class="container mx-auto px-4 py-8 max-w-4xl">
        <div class="flex flex-col items-center justify-center min-h-[70vh]">
          <div class="flex justify-center items-center gap-8 mb-8">
            <a href="https://vite.dev" target="_blank" class="hover:opacity-80 transition-opacity">
              <img src=${viteLogo} class="h-24 w-24" alt="Vite logo" />
            </a>
            <a href="https://lit.dev" target="_blank" class="hover:opacity-80 transition-opacity">
              <img src=${litLogo} class="h-24 w-24" alt="Lit logo" />
            </a>
          </div>

          <div class="mb-8">
            <slot></slot>
          </div>

          <div class="flex justify-center mb-6">
            <my-button
              size="md"
              variant="primary"
              @:click=${this._onClick}
              ?disabled=${this.count >= 10}
              part="button"
            >
              count is ${this.count}
            </my-button>
          </div>

          <p class="text-sm text-gray-500 text-center">${this.docsHint}</p>
        </div>
      </div>
    `
  }

  private _onClick() {
    this.count++
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'page-home': PageHome
  }
}
