import { UserList } from './modules/users/users-list'
import { Counter } from './modules/counters/Counter'

import './App.css'

function App() {
    return (
        <>
            <Counter counterId="counter-1" />
            <Counter counterId="counter-2" />
            <Counter counterId="counter-3" />
            <UserList />

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

export default App
