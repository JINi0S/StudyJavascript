import {useState, useEffect} from "react";

export const useDebounce = (value, delay) => {
    const [debouncedValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(value)
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]); // 둘 중 하나가 바뀌면 해당 useEffect가 다시 실행됨
    
  return debouncedValue
}
