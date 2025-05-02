import type { CSSResultGroup, CSSResultOrNative } from 'lit'
import { LitElement } from 'lit'
import tailwindcss from '../styles/global.css'

export class BaseElement extends LitElement {
  /**
   * Finalizes styles by combining element styles with provided styles
   * @param styles Optional CSS styles to include
   * @returns Array of finalized CSS styles
   */
  static finalizeStyles(styles?: CSSResultGroup | undefined): CSSResultOrNative[] {
    const elementStyles = LitElement.finalizeStyles(styles)
    return [...elementStyles, tailwindcss]
  }
}
