export const getMethodGetHeader = (): RequestInit | undefined => {
    return {
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
        },
        method: "GET",
        credentials: "include"
    }
}

export const getMethodPostHeader = (payload: any): RequestInit | undefined => {
    return {
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
        },
        method: "POST",
        body: JSON.stringify(payload),
        credentials: "include"
    }
}

export const getMethodPutHeader = (payload: any): RequestInit | undefined => {
    return {
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
        },
        method: "PUT",
        body: JSON.stringify(payload),
        credentials: "include"
    }
}