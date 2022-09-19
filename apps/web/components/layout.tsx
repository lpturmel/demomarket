import { useMutation } from "@tanstack/react-query";
import { FunctionComponent, ReactNode } from "react";
import { User } from "../api/db/user";
import { doLogout } from "../api/logout";

interface LayoutProps {
    children: ReactNode;
    user: User;
}
const Layout: FunctionComponent<LayoutProps> = ({ children, user }) => {
    const logout = useMutation(doLogout);

    const onLogout = async () => {
        logout.mutate();
    };
    return (
        <div className="flex flex-col w-full h-full">
            <div className="navbar bg-base-100 p-4">
                <div className="flex-1">
                    <a href="/" className="btn btn-ghost normal-case text-xl">
                        DemoMarket
                    </a>
                </div>
                {user ? (
                    <div className="flex-none">
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost">
                                <p> {user.full_name} </p>
                            </label>
                            <ul
                                tabIndex={0}
                                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-52"
                            >
                                <li>
                                    <a className="justify-between">Profile</a>
                                </li>
                                <li>
                                    <a>Settings</a>
                                </li>
                                <li>
                                    <button onClick={onLogout}>Logout</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <a href="/login" className="btn btn-primary">
                        Login
                    </a>
                )}
            </div>
            <div className="w-full h-full p-4">{children}</div>
        </div>
    );
};
export default Layout;
