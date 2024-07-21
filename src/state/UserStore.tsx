import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import zukeeper from "zukeeper"

interface User {
    _id: string;
    email: string,
    firstName: string,
    lastName: string,
    imgUrl: string
}

interface UserState {
    user: User | undefined
    setUser: (user: User) => void
    signOut: () => void
}

const useUserStore = create<UserState>()(
    devtools(
        persist(
            zukeeper((set: any) => ({
                user: undefined,
                setUser: (user: User) => set((state: any) => ({ user: user })),
                signOut: () => set((state: any) => ({ user: undefined }))
            })),
            {
                name: 'user-storage',
            },
        ),
    ),
)

export default useUserStore;