import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { buttonStyles, styles } from "./button.styles";

/**
 * A customizable button component with different variants
 *
 * @slot - Button content
 * @csspart button - The button element
 */
@customElement("my-button")
export class MyButton extends LitElement {
	/**
	 * The button variant
	 * @type {"primary" | "secondary" | "danger"}
	 */
	@property({ type: String })
	variant: "primary" | "secondary" | "danger" = "primary";

	/**
	 * The button size
	 * @type {"small" | "medium" | "large"}
	 */
	@property({ type: String })
	size: "small" | "medium" | "large" = "medium";

	/**
	 * Whether the button is disabled
	 */
	@property({ type: Boolean })
	disabled = false;

	/**
	 * Click event handler
	 */
	private _handleClick(e: Event) {
		if (this.disabled) {
			e.preventDefault();
			return;
		}

		// Dispatch custom event
		this.dispatchEvent(
			new CustomEvent(":click", {
				bubbles: true,
				composed: true,
			}),
		);
	}

	render() {
		const classes = {
			button: true,
			[`button--${this.variant}`]: true,
			[`button--${this.size}`]: this.size !== "medium",
			"button--disabled": this.disabled,
		};

		return html`
      <button
        class=${classMap(classes)}
        ?disabled=${this.disabled}
        @click=${this._handleClick}
        part="button"
      >
        <slot></slot>
      </button>
    `;
	}

	static styles = [styles, buttonStyles];
}
