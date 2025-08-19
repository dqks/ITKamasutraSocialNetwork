import {useCallback, useRef} from "react";

export const useDebounce = (cb : Function, delay: number) => {
    const timer = useRef<null | ReturnType<typeof setTimeout>>(null)

    return useCallback((...args: any[]) => {
        if (timer.current) {
            clearTimeout(timer.current)
        }

        timer.current = setTimeout(() => {
            cb(...args)
        }, delay)
    }, [cb, delay])
}