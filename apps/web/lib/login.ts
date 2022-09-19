export interface LoginBody {
    email: string;
    password: string;
}
export const doLogin = async (body: LoginBody) => {
    const response = await fetch("/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    const data = await response.json();
    if (response.status !== 200) {
        throw new Error(data.name);
    }
    return data;
};
