import React, { useState } from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import Link from 'next/link';

const NavigationLink = ({ children, href }) => {
    return (
        <Link href={href} passHref>
            <span className="nav-link hover:text-blue-600 decoration-2 underline-offset-8 transition-all duration-500 ease-in-out cursor-pointer">
                {children}
            </span>
        </Link>
    );
};

function Header() {
    const [showDropdown, setShowDropdown] = useState(false);
    const user = useUser();

    const handleMenuEnter = () => {
        setShowDropdown(true);
    };

    const handleMenuLeave = () => {
        setShowDropdown(false);
    };

    return (
        <header className="bg-white p-4 flex justify-between items-center w-full">
            <Link href="/" passHref>
                <img src="/logo2.png" alt="Logo" className="h-20 cursor-pointer" />
            </Link>
            <nav className="flex items-center gap-16">
                <NavigationLink href="/">Accueil</NavigationLink>
                <NavigationLink href="/categories">Catégories</NavigationLink>
                <NavigationLink href="/contacts">Contact</NavigationLink>
                <NavigationLink href="/about">A propos</NavigationLink>
                {user ? (
                    <LoggedIn />
                ) : (
                    <div className="flex items-center gap-2">
                        <Link href="/login">
                            <button className="text-white bg-blue-500 hover:bg-blue-700 font-medium py-2 px-4 rounded-full transition duration-300 ease-in-out shadow-lg cursor-pointer">
                                Connexion
                            </button>
                        </Link>
                        <div className="relative" onMouseEnter={handleMenuEnter} onMouseLeave={handleMenuLeave}>
                            <div className="flex flex-col items-start justify-center gap-2">
                                <div className={`${showDropdown ? 'rotate-45 translate-y-1.5' : ''} w-6 h-0.5 bg-blue-500 transition-transform duration-500`}></div>
                                <div className={`${showDropdown ? 'scale-0' : ''} w-6 h-0.5 bg-blue-500 transition-all duration-500`}></div>
                                <div className={`${showDropdown ? '-rotate-45 -translate-y-1.5' : ''} w-6 h-0.5 bg-blue-500 transition-transform duration-500`}></div>
                            </div>
                            {showDropdown && (
                                <div className="absolute right-0 mt-100 shadow-lg bg-white rounded w-48">
                                    <Link href="/profil" passHref>
                                        <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Profil</span>
                                    </Link>
                                    <Link href="/" passHref>
                                        <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Paramètres</span>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}

export default Header;
