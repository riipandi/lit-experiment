import { persistentMap } from '@nanostores/persistent'

type UIStore = {
  global: {
    counter: number
    disabled: boolean
  }
}

/**
 * The default values for the UI store, which includes the initial state of the sidebar.
 */
const defaultUIStoreValues: UIStore = {
  global: {
    counter: 0,
    disabled: false,
  },
}

/**
 * A persistent map store for the UI state, with the default values for the sidebar state.
 * Using key-value map store. It will keep each key in separated localStorage key.
 * You can switch localStorage to any other storage for all used stores.
 * @ref: https://github.com/nanostores/persistent#persistent-engines
 */
const uiStore = persistentMap<UIStore>('ui:', defaultUIStoreValues, {
  encode: JSON.stringify,
  decode: JSON.parse,
})

/**
 * Saves the current UI state by merging the provided partial UI store values with the
 * existing values. Deep merges partial UI store values with the existing state.
 * @param values - A partial object of the UI store values to be merged with the existing state.
 */
function saveUiState<K extends keyof UIStore>(key: K, values: Partial<UIStore[K]>) {
  const currentState = uiStore.get()
  uiStore.set({
    ...currentState,
    [key]: {
      ...currentState[key],
      ...values,
    },
  })
}

/**
 * Resets the UI store to its default values, which includes setting the sidebar state to 'expanded'.
 */
function resetUiState() {
  uiStore.set(defaultUIStoreValues)
}

export { uiStore, defaultUIStoreValues, saveUiState, resetUiState }
export type { UIStore }
