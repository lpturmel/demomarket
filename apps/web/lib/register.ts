export interface NewUser {
    email: string;
    name: string;
    password: string;
}
export const doRegister = async (newUser: NewUser) => {
    const response = await fetch("/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
    });
    const data = await response.json();
    if (response.status !== 200) {
        throw new Error(data.name);
    }
    return data;
};
