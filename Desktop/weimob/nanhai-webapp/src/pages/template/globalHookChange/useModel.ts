import { useTextGlobal } from "../globalHook/useModel";

export default function useModel() {
  const [text, setText] = useTextGlobal();

  return {
    text
  }
}
