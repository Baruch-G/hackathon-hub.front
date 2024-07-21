import { Alert, AlertColor } from '@mui/material'
import MuiSnackbar from '@mui/material/Snackbar';

interface SnackbarProps {
    text: string
    onClose: () => void
    open: boolean
    severity : AlertColor
}

export const Snackbar = (props: SnackbarProps) => {
    return (
        <MuiSnackbar open={props.open} autoHideDuration={6000} onClose={props.onClose}>
            <Alert
                onClose={props.onClose}
                severity={props.severity}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {props.text}
            </Alert>
        </MuiSnackbar>
    )
}
