import { AppState, createAppSelector } from '../../store'

export type UserId = string

export type User = {
    id: UserId
    name: string
    description: string
}

export const initialUsersList: User[] = Array.from(
    { length: 3000 },
    (_, index) => ({
        id: `user${index + 11}`,
        name: `User ${index + 11}`,
        description: `User ${index + 11} description`,
    })
)

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

const initialUsersState: UsersState = {
    entities: {},
    ids: [],
    selectedUserId: undefined,
}

type Action = UserStoredAction | UserRemoveSelectedAction | UserSelectedAction

export const usersReducer = (
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

export const selectSortedUsers = createAppSelector(
    [
        (state: AppState) => state.users.ids,
        (state: AppState) => state.users.entities,
        (_: AppState, sort: 'asc' | 'desc') => sort,
    ],
    (ids, entities, sortType) =>
        ids
            .map((id) => entities[id])
            .sort((a, b) => {
                if (sortType === 'asc') {
                    return a.name.localeCompare(b.name)
                } else {
                    return b.name.localeCompare(a.name)
                }
            })
)

export const selectSelectedUser = (state: AppState) =>
    state.users.selectedUserId ? state.users.selectedUserId : undefined
