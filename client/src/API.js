const API = 'http://localhost:1337'

export const fetchLogs = async () => {
    const response = await (await fetch(`${API}/api/logs`)).json()
    return response.data
}

export const createLog = async (log) => {
    const response = await (await fetch(`${API}/api/logs`, {
        method : 'POST',
        headers : {
            'content-type' : 'application/json'
        },
        body: JSON.stringify(log)
    })).json()
    return response.data
}