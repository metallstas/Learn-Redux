import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import store, {
    AppState,
    CounterId,
    DecrementAction,
    IncrementAction,
} from './store'
import { useEffect, useReducer, useRef } from 'react'

function App() {
    return (
        <>
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img
                        src={reactLogo}
                        className="logo react"
                        alt="React logo"
                    />
                </a>
            </div>
            <h1>Vite + React</h1>
            <Counter counterId="counter-1" />
            <Counter counterId="counter-2" />
            <Counter counterId="counter-3" />
            <div className="card">
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

const selectCounter = (state: AppState, counterId: CounterId) =>
    state.counters[counterId]

export const Counter = ({ counterId }: { counterId: CounterId }) => {
    const [, forceUpdate] = useReducer((x) => x + 1, 0)
    console.log('render counter', counterId)

    const lastCounterRef = useRef<ReturnType<typeof selectCounter>>(
        selectCounter(store.getState(), counterId)
    )

    console.log(lastCounterRef.current)
    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            const currentCounter = selectCounter(store.getState(), counterId)
            const lastCounter = lastCounterRef.current

            if (currentCounter !== lastCounter) {
                forceUpdate()
            }
            lastCounterRef.current = currentCounter
        })
        return unsubscribe
    }, [counterId])

    const counterState = selectCounter(store.getState(), counterId)
    return (
        <>
            <h3>count is {counterState?.counter}</h3>
            <button
                onClick={() =>
                    store.dispatch({
                        type: 'increment',
                        payload: { counterId },
                    } satisfies IncrementAction)
                }
            >
                increment
            </button>
            <button
                onClick={() =>
                    store.dispatch({
                        type: 'decrement',
                        payload: { counterId },
                    } satisfies DecrementAction)
                }
            >
                decrement
            </button>
        </>
    )
}

export default App
