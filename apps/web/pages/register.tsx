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
        <div className="container max-w-lg m-auto w-full flex flex-col gap-8">
            <h1 className="text-2xl font-bold">Register</h1>
            <form
                onSubmit={onSubmit}
                className="bg-base-200 p-4 rounded-lg form-control w-full flex flex-col gap-4"
            >
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input
                    className="input input-bordered w-full"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    required
                />
                <label className="label">
                    <span className="label-text">Name</span>
                </label>
                <input
                    type="text"
                    className="input input-bordered w-full"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input
                    className="input input-bordered w-full"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
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
                <button className="btn" disabled={disabled} type="submit">
                    Login
                </button>
                <span className="w-full text-center text-sm">
                    Already have an account?
                    <a className="link-primary ml-2" href="/login">
                        Login
                    </a>
                </span>
            </form>
        </div>
    );
};

export default Register;
