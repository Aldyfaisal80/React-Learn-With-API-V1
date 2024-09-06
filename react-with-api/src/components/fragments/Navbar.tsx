import NavbarLink from "../elements/NavLink";

export default function Navbar() {
    return (
        <header className="bg-gray-800 text-white shadow-lg">
            <nav className="container mx-auto p-4 flex justify-between items-center">
                <div>
                    <NavbarLink to="/" className="text-2xl font-bold tracking-wide hover:text-blue-400 transition duration-300">
                        Navbar
                    </NavbarLink>
                </div>
                <div className="flex gap-6">
                    <NavbarLink to="/product" className="text-lg hover:text-blue-400 transition duration-300">
                        Product
                    </NavbarLink>
                    <NavbarLink to="/category" className="text-lg hover:text-blue-400 transition duration-300">
                        Category
                    </NavbarLink>
                    <NavbarLink to="product/create-product" className="text-lg hover:text-blue-400 transition duration-300">
                        Create Product
                    </NavbarLink>
                    <NavbarLink to="category/create-category" className="text-lg hover:text-blue-400 transition duration-300">
                        Create Category
                    </NavbarLink>
                    <NavbarLink to="category/update-category" className="text-lg hover:text-blue-400 transition duration-300">
                        Update Category
                    </NavbarLink>
                </div>  
            </nav>
        </header>
    );
}
