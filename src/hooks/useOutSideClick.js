import { useEffect, useRef } from "react";

export function useOutSideClick(handler, listerCapturing = false) {
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    }
    document.addEventListener("click", handleClick, listerCapturing);
    return () =>
      document.removeEventListener("click", handleClick, listerCapturing);
  }, [handler, listerCapturing]);
  return ref;
}
