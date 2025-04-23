import { useDispatch } from 'react-redux'
import { selectCounter, useAppSelector } from '../../store'
import { CounterId, IncrementAction, DecrementAction } from './counter.slice'

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
