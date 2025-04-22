import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {
    CounterId,
    DecrementAction,
    IncrementAction,
    selectCounter,
    useAppSelector,
} from './store'
import { useDispatch } from 'react-redux'

function App() {
    return (
        <>
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

export const Counter = ({ counterId }: { counterId: CounterId }) => {
    const dispatch = useDispatch()
    const counterState = useAppSelector((state) =>
        selectCounter(state, counterId)
    )
    console.log('render counter', counterId)

    return (
        <>
            <h3>count is {counterState?.counter}</h3>
            <button
                onClick={() =>
                    dispatch({
                        type: 'increment',
                        payload: { counterId },
                    } satisfies IncrementAction)
                }
            >
                increment
            </button>
            <button
                onClick={() =>
                    dispatch({
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
