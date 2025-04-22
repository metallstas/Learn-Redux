import { useState } from 'react'
import './users-list.css'
import {
    AppState,
    createAppSelector,
    useAppDispatch,
    useAppSelector,
    User,
    UserSelectedAction,
} from './store'

const selectSortedUsers = createAppSelector(
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

const selectSelectedUser = (state: AppState) =>
    state.users.selectedUserId ? state.users.selectedUserId : undefined

export const UserList = () => {
    // const selectedUserId = useAppSelector((state) => state.users.selectedUserId)
    const [sortType, setSortType] = useState<'asc' | 'desc'>('asc')
    console.log('render UserList')
    const sortedUsers = useAppSelector((state) =>
        selectSortedUsers(state, sortType)
    )
    const selectedUser = useAppSelector((state) => selectSelectedUser(state))

    return (
        <div className="flex flex-col items-center">
            {!selectedUser ? (
                <div className="center">
                    <div className="">
                        <button onClick={() => setSortType('asc')}>Asc</button>
                        <button onClick={() => setSortType('desc')}>
                            Desc
                        </button>
                    </div>
                    <ul>
                        {sortedUsers.map((user: User) => (
                            <UserListItem user={user} key={user.id} />
                        ))}
                    </ul>
                </div>
            ) : (
                <SelectedUser user={selectedUser} />
            )}
        </div>
    )
}

const UserListItem = ({ user }: { user: User }) => {
    const dispatch = useAppDispatch()
    const handlerUserClick = () => {
        dispatch({
            type: 'userSelected',
            payload: { userId: user.id },
        } satisfies UserSelectedAction)
    }
    return (
        <li key={user.id} onClick={handlerUserClick}>
            <span>{user.name}</span>
        </li>
    )
}

const SelectedUser = ({ user }: { user: User }) => {
    const dispatch = useAppDispatch()

    const onBackButtonClick = () => {
        dispatch({
            type: 'userRemoveSelected',
            payload: { userId: undefined },
        })
    }
    return (
        <div>
            <button onClick={onBackButtonClick}>Back</button>
            <h2>{user.name}</h2>
            <p>{user.description}</p>
        </div>
    )
}
