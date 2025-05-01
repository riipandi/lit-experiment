import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { BaseElement } from "#/core/base-element";
import { type ButtonStyles, buttonStyles } from "./button.css";

@customElement("my-button")
export class MyButton extends BaseElement {
	@property({ type: String })
	variant: ButtonStyles["variant"] = "primary";

	@property({ type: String })
	size: ButtonStyles["size"] = "md";

	@property({ type: Boolean })
	isLoading: ButtonStyles["isLoading"] = false;

	@property({ type: Boolean })
	disabled = false;

	private _handleClick(e: Event) {
		if (this.disabled) {
			e.preventDefault();
			return;
		}

		this.dispatchEvent(
			new CustomEvent(":click", {
				bubbles: true,
				composed: true,
			}),
		);
	}

	render() {
		const styles = buttonStyles({
			variant: this.variant,
			size: this.size,
			isLoading: this.isLoading,
		});

		return html`
      <button
        class=${styles.base()}
        ?disabled=${this.disabled}
        @click=${this._handleClick}
        part="button"
      >
        <slot></slot>
      </button>
    `;
	}
}
