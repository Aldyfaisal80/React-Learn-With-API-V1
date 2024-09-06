import { Link, useLocation } from "react-router-dom";
type NavbarLinkProps = {
    to: string;
    children: string;
    className?: string;
}

export default function NavLink({ to, children, className }: NavbarLinkProps) {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link 
            to={to}
            className={`${isActive ? 'underline underline-offset-4 decoration-blue-500' : 'no-underline'} ${className}`}
        >
            {children}
        </Link>
    );
}
