import { computed, onMounted, readonly, ref, toRefs } from 'vue'

interface State<T> {
    data?: T
    error?: Error
}

type Cache<T> = { [url: string]: T }

// discriminated union type
type Action<T> =
    | { type: 'loading' }
    | { type: 'fetched'; payload: T }
    | { type: 'error'; payload: Error }

function useReducer(reducer: any, initialArg: any, init?: any) {
    console.log('initargs', initialArg)
    const state = ref(init ? init(initialArg) : initialArg)
    const dispatch = (action: any) => {
        state.value = reducer(state.value, action)
    }

    return [readonly(state), dispatch]
}

export default function useFetch<T = unknown>(
    url: string,
    options?: RequestInit
) {
    // Used to prevent state update if the component is unmounted
    const cancelRequest = ref(false)
    const cache = <Cache<T>>{}

    const initialState: State<T> = {
        error: undefined,
        data: undefined,
    }

    // Keep state logic separated
    const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
        switch (action.type) {
            case 'loading':
                return { ...initialState }
            case 'fetched':
                return { ...initialState, data: action.payload }
            case 'error':
                return { ...initialState, error: action.payload }
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(fetchReducer, initialState)

    onMounted(async () => {
        console.info('mounted')
        // Do nothing if the url is not given
        if (!url) return
        const fetchData = async () => {
            dispatch({ type: 'loading' })

            console.log(state)

            // If a cache exists for this url, return it
            if (cache[url]) {
                dispatch({ type: 'fetched', payload: cache[url] })
                return
            }

            try {
                const response = await fetch(url, options)
                if (!response.ok) {
                    throw new Error(response.statusText)
                }

                const data = (await response.json()) as T
                console.log(data)

                cache.url = data
                if (cancelRequest.value) return

                dispatch({ type: 'fetched', payload: data.data })
            } catch (error) {
                if (cancelRequest.value) return

                dispatch({ type: 'error', payload: error as Error })
            }
        }

        void fetchData()
    })

    return state
}
