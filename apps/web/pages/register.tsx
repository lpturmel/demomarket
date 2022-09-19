import { NextPage } from "next";
import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { doRegister } from "../api/register";
import { useRouter } from "next/router";
export { getServerSideProps } from "../utils/page";

const Register: NextPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const register = useMutation(doRegister, {
        onSuccess: () => {
            router.push("/");
        },
        onError: (error: any) => {
            setError(error.message as string);
        },
    });

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!disabled) {
            register.mutate({
                email,
                name,
                password,
            });
        }
    };
    const disabled = useMemo(() => {
        return !email || !name || !password;
    }, [email, name, password]);
    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={onSubmit}>
                <label>Email</label>
                <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label> Name </label>
                <input
                    type="text"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <label> Password </label>
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && (
                    <div className="alert alert-error shadow-lg">
                        <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="stroke-current flex-shrink-0 h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>{error}</span>
                        </div>
                    </div>
                )}
                <button disabled={disabled} type="submit">
                    Register
                </button>
                <span>
                    Already have an account? <a href="/login">Login</a>
                </span>
            </form>
        </div>
    );
};

export default Register;
