import { configureStore, createSelector } from '@reduxjs/toolkit'
import { useDispatch, useSelector, useStore } from 'react-redux'

export type UserId = string

export type User = {
    id: UserId
    name: string
    description: string
}

const users: User[] = Array.from({ length: 3000 }, (_, index) => ({
    id: `user${index + 11}`,
    name: `User ${index + 11}`,
    description: `User ${index + 11} description`,
}))

export type UserSelectedAction = {
    type: 'userSelected'
    payload: {
        userId: UserId
    }
}

export type UserRemoveSelectedAction = {
    type: 'userRemoveSelected'
}

export type UserStoredAction = {
    type: 'userStored'
    payload: {
        users: User[]
    }
}

type UsersState = {
    entities: Record<UserId, User>
    ids: UserId[]
    selectedUserId: User | undefined
}

export type CounterState = {
    counter: number
}

export type CounterId = string

type State = {
    counters: CountersState
    users: UsersState
}

export type IncrementAction = {
    type: 'increment'
    payload: {
        counterId: CounterId
    }
}

export type DecrementAction = {
    type: 'decrement'
    payload: {
        counterId: CounterId
    }
}

type CountersState = Record<CounterId, CounterState | undefined>

type Action =
    | IncrementAction
    | DecrementAction
    | UserStoredAction
    | UserRemoveSelectedAction
    | UserSelectedAction

const initialCounterState: CounterState = { counter: 0 }
const initialUsersState: UsersState = {
    entities: {},
    ids: [],
    selectedUserId: undefined,
}

const initialCountersState: CountersState = {}

const initialState: State = {
    counters: initialCountersState,
    users: initialUsersState,
}

const usersReducer = (
    state = initialUsersState,
    action: Action
): UsersState => {
    switch (action.type) {
        case 'userStored': {
            const { users } = action.payload
            return {
                ...state,
                entities: users.reduce((acc, user) => {
                    acc[user.id] = user
                    return acc
                }, {} as Record<UserId, User>),
                ids: users.map((user) => user.id),
            }
        }
        case 'userSelected': {
            const { userId } = action.payload
            return {
                ...state,
                selectedUserId: state.entities[userId],
            }
        }
        case 'userRemoveSelected': {
            return {
                ...state,
                selectedUserId: undefined,
            }
        }
        default:
            return state
    }
}

const countersReducer = (
    state = initialCountersState,
    action: Action
): CountersState => {
    switch (action.type) {
        case 'increment': {
            const { counterId } = action.payload
            const currentCounter = state[counterId] || initialCounterState
            return {
                ...state,
                [counterId]: {
                    ...currentCounter,
                    counter: currentCounter.counter + 1,
                },
            }
        }
        case 'decrement': {
            const { counterId } = action.payload
            const currentCounter = state[counterId] || initialCounterState
            return {
                ...state,
                [counterId]: {
                    ...currentCounter,
                    counter: currentCounter.counter - 1,
                },
            }
        }
        default:
            return state
    }
}

const reducer = (state = initialState, action: Action) => {
    return {
        users: usersReducer(state.users, action),
        counters: countersReducer(state.counters, action),
    }
}

const store = configureStore({
    reducer: reducer,
})

export default store

export const selectCounter = (state: AppState, counterId: CounterId) =>
    state.counters[counterId]

store.dispatch({
    type: 'userStored',
    payload: { users },
} satisfies UserStoredAction)

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector = useSelector.withTypes<AppState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppStore = useStore.withTypes<typeof store>()
export const createAppSelector = createSelector.withTypes<AppState>()
