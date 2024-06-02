import { RefObject, useEffect } from "react";

interface TProps<T> {
    handler: () => void;
    ref: RefObject<T>;
}

const useOnClickOutside = <T extends HTMLElement>(props: TProps<T>) => {
    const { ref, handler } = props
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {

            if (ref.current && !ref.current.contains(event.target as Node)) {
                handler();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, [ref, handler]);
};

export default useOnClickOutside;