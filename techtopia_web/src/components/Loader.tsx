import { CircularProgress } from '@mui/material'

interface LoaderProps {
    children: string
}

export default function Loader({ children }: LoaderProps) {
    return (
        <div
            style={{
                width: '100%',
                height: '80%',
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '0.85rem',
                margin: '0',
                padding: '0'
            }}
        >
            <div
                style={{
                }}
            >
                <div style={{ }}>
                    <h2>{children}</h2>
                </div>
                <div>
                    <CircularProgress />
                </div>
            </div>
        </div>
    )
}
