import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

//TODO: extracr type
interface User {
    email: string,
    firstName: string,
    lastName: string,
}

interface UserState {
    user: User | undefined
    setUser: (user: User) => void
}

const useUserStore = create<UserState>()(
    devtools(
        persist(
            (set) => ({
                user: undefined,
                setUser: (user: User) => set((state) => ({ user: user })),
            }),
            {
                name: 'user-storage',
            },
        ),
    ),
)

export default useUserStore;