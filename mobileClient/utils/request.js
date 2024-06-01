export const baseUrl = 'http://192.168.0.102:5050'

export const postRequest = async (url, body) => {
   
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body
    });

    if (!response.ok) {
        const data = await response.json();
        let message;

        if (data?.message) {
            message = data.message;
        } else {
            message = data;
        }
        throw new Error(message);
    }

    return response.json();
};

export const getRequest = async (url) => {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
        let message = "an error occurred";

        if (data.message) {
            message = data.message; 
        }

        return { error: true, message };
    }

    return data;
};
