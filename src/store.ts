import {
    combineReducers,
    configureStore,
    createSelector,
} from '@reduxjs/toolkit'
import { useDispatch, useSelector, useStore } from 'react-redux'
import {
    initialUsersList,
    usersReducer,
    UserStoredAction,
} from './modules/users/users.slice'
import { CounterId, countersReducer } from './modules/counters/counter.slice'

const store = configureStore({
    reducer: combineReducers({
        users: usersReducer,
        counters: countersReducer,
    }),
})

export const selectCounter = (state: AppState, counterId: CounterId) =>
    state.counters[counterId]

store.dispatch({
    type: 'userStored',
    payload: { users: initialUsersList },
} satisfies UserStoredAction)

export default store

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector = useSelector.withTypes<AppState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppStore = useStore.withTypes<typeof store>()
export const createAppSelector = createSelector.withTypes<AppState>()
