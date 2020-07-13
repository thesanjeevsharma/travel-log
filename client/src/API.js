const API = 'http://localhost:1337'

export const fetchLogs = async () => {
    const response = await (await fetch(`${API}/api/logs`)).json()
    return response.data
}