import { css } from 'lit'

export const buttonStyles = css`
  .button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.25s;
  }

  /* Primary variant */
  .button--primary {
    background-color: #646cff;
    color: white;
  }
  .button--primary:hover {
    background-color: #535bf2;
  }

  /* Secondary variant */
  .button--secondary {
    background-color: #f9f9f9;
    color: #213547;
    border-color: #213547;
  }
  .button--secondary:hover {
    background-color: #e9e9e9;
  }

  /* Danger variant */
  .button--danger {
    background-color: #ff4d4f;
    color: white;
  }
  .button--danger:hover {
    background-color: #ff7875;
  }

  /* Disabled state */
  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Size variants */
  .button--small {
    font-size: 0.85em;
    padding: 0.4em 0.8em;
  }

  .button--large {
    font-size: 1.2em;
    padding: 0.8em 1.6em;
  }

  .button:focus,
  .button:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }
`

export const styles = css`
  :host {
    display: inline-block;
  }

  @media (prefers-color-scheme: dark) {
    .button--secondary {
      background-color: #1a1a1a;
      color: #f9f9f9;
      border-color: #f9f9f9;
    }
    .button--secondary:hover {
      background-color: #2a2a2a;
    }
  }
`
