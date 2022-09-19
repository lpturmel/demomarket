export const doLogout = async () => {
    const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    if (response.status !== 200) {
        throw new Error(data.name);
    }
    return data;
};
