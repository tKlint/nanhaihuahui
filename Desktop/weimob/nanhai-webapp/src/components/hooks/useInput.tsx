import { useState } from 'react'
import { useSuperLock } from './useSuperLock'

export default function useInput() {
  const [value, setValue] = useState<string>()

  function onInput(event) {
    setValue(event.detail.value)
  }

  return {
    value,
    setValue,
    onInput
  }
}
