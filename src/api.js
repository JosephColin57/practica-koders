const API_URL = "https://koders-list-api.vercel.app";

// fetch es para pedir los datos a backend ocupa por defecto GET y se usa then debido a que regresa una promesa

export function getKoders() {
    return fetch(`${API_URL}/koders`)
        .then(response => response.json())
        .then(data => data.koders);
}

export function createKoder({ firstName, lastName, email }) {
    return fetch(`${API_URL}/koders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ firstName, lastName, email })
    })
}

export function deleteKoder(koderId) {
    return fetch(`${API_URL}/koders/${koderId}/delete`, {
        method: "POST",
    })
}