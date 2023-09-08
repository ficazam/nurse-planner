import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface UserState {
    user: User | undefined,
    setUser: (userData: User) => void,
    removeUser: () => void
}

const useUserStore = create<UserState>()(
    devtools(
        persist(
            (set) => ({
                user: undefined,
                setUser: (userData) => set((state) => ({ user: userData })),
                removeUser: () => set({ user: undefined })
            }),
            { name: 'userStore' }
        )
    )
)

export default useUserStore