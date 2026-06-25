import {useRouteError} from "react-router-dom"

export default function ErrorBoundary() {
    const error = useRouteError() as Error

    console.error(error)
    return <div className="error-panel">Error: {error.message}</div>
}