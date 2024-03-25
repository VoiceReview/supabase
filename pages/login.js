import React from "react";
import Header from "../components/header";
import Footer from '../components/footer';
import Link from 'next/link'; // Importez Link de next/link

const Navigation = ({ children, href = "#" }) => {
  return (
    <Link href={href}>
<span className="hover:text-blue-600 ">
  {children}
</span>
    </Link>
  );
};



export const Box = () => {
  return (
    <div>
      <Header />
      <div className="w-full h-screen flex flex-col justify-center items-center p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Connexion</h1> {/* Titre ajouté */}
        <div className="w-full max-w-md bg-blue-100 rounded-lg shadow-md p-6">
          <div className="mb-4">
            <label htmlFor="email" className="text-lg font-medium text-gray-700 block mb-2">Mail</label>
            <input
              id="email"
              type="email"
              placeholder="Adresse mail..."
              className="w-full h-14 bg-white rounded-lg border border-gray-300 p-4 text-lg"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="text-lg font-medium text-gray-700 block mb-2">Mot de passe</label>
            <input
              id="password"
              type="password"
              placeholder="Mot de passe..."
              className="w-full h-14 bg-white rounded-lg border border-gray-300 p-4 text-lg"
            />
          </div>
          <div className="text-center mb-6"> {/* Margin bottom increased */}
          <Navigation href="/">Mot de passe oublié ?</Navigation>
          </div>
          <div className="text-center">
            <button className="text-white bg-blue-500 hover:bg-blue-700 font-medium py-2 px-4 rounded transition duration-300 ease-in-out shadow-lg cursor-pointer">
              Se connecter
            </button>
            <div className="text-center mb-6"> {/* Margin bottom increased */}
            <Navigation href="/inscription">Pas de compte ? S'inscrire</Navigation>
          </div>
          </div>
        </div>
      </div>      <Footer />
    </div>
  );
};

export default Box;
