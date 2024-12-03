import creatGlobalState from "~/components/hooks/creatGlobalState";

export const useTextGlobal = creatGlobalState();

export default function useModel() {
  const [text] = useTextGlobal("测试");
  return {
    text
  }
}
