export interface BaseProviderValue<S> {
  state: S,
  setState: (state: S) => void
}
