import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import zukeeper from "zukeeper"
import { AlertColor } from '@mui/material'

interface SnackbarDetails {
    severity: AlertColor
    open: boolean;
    text: string
}

interface SnackbarState {
    snackData: SnackbarDetails
    opanStackbar: (text: string, severity: AlertColor) => void
    closeStackbar: () => void
}

const useSnackbarStore = create<SnackbarState>()(
    devtools(
        zukeeper((set: any) => ({
            snackData: {
                severity: "info",
                open: false,
                text: ''
            } as SnackbarDetails,
            opanStackbar: (text: string, severity: AlertColor) => set((state: SnackbarState) => ({ snackData: { open: true, text, severity} })),
            closeStackbar: () => set((state: SnackbarState) => ({ snackData: { open: false, text: '' } }))
        })),
        {
            name: 'snack-storage',
        }
    ),
)

export default useSnackbarStore;