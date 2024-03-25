import React from 'react';
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';

function Footer() {
    return (
        <footer className="bg-gray-100 text-gray-600 body-font">
            <div className="container mx-auto py-8 px-5 flex justify-between items-center border-t border-gray-300">
                {/* Colonne de liens */}
                <div className="flex flex-col">
                    <a href="/" className="mb-2">Accueil</a>
                    <a href="/categories" className="mb-2">Catégories</a>
                    <a href="/about" className="mb-2">À propos</a>
                    <a href="/provider" className="mb-2">Compte prestataire</a>
                </div>
                {/* Barre verticale */}
                <div className="border-l border-gray-300" style={{ height: '100px' }}></div>
                {/* Colonne de liens */}
                <div className="flex flex-col px-5">
                    <a href="/contact" className="mb-2">Contact</a>
                    <a href="/account" className="mb-2">Mon compte</a>
                    <a href="/settings" className="mb-2">Paramètre</a>
                    <a href="/privacy" className="mb-2">Politique de confidentialité</a>
                </div>
                {/* Barre verticale */}
                <div className="border-l border-gray-300" style={{ height: '100px' }}></div>
                {/* Carré des icônes de réseaux sociaux */}
                <div className="grid grid-cols-2 gap-2">
                    <a href="#" className="text-gray-500 hover:text-gray-900">
                        <FaYoutube className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-gray-500 hover:text-gray-900">
                        <FaTiktok className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-gray-500 hover:text-gray-900">
                        <FaInstagram className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-gray-500 hover:text-gray-900">
                        <FaFacebook className="w-5 h-5" />
                    </a>
                </div>
                {/* Barre verticale */}
                <div className="border-l border-gray-300" style={{ height: '100px' }}></div>
                {/* Logo et nom */}
                <div className="flex items-center">
                    <img src="/logo.png" alt="Logo" className="w-16 h-16 mr-2" />
                    <span className="text-xl font-bold">VoiceReview</span>
                </div>
                {/* Droits d'auteur */}
                <div className="text-gray-500 text-sm">
                    © {new Date().getFullYear()} VoiceReview
                </div>
            </div>
        </footer>
    );
}

export default Footer;
