import { Alert } from '@mui/material'
import React from 'react'
import MuiSnackbar from '@mui/material/Snackbar';

interface SnackbarProps {
    text: string
    onClose: () => void
    open: boolean
}

export const Snackbar = (props: SnackbarProps) => {
    return (
        <MuiSnackbar open={props.open} autoHideDuration={6000} onClose={props.onClose}>
            <Alert
                onClose={props.onClose}
                severity="success"
                variant="filled"
                sx={{ width: '100%' }}
            >
                {props.text}
            </Alert>
        </MuiSnackbar>
    )
}
