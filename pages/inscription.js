import React, { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";

export const SignUpBox = () => {
  const [isProvider, setIsProvider] = useState(false);

  const handleProviderChange = (event) => {
    setIsProvider(event.target.checked);
  };

  return (
    <>
      <Header />
      <div className="mt-[60px] w-full flex flex-col justify-center items-center p-4"> {/* Adjust mt-[60px] to the height of your header */}
        <h2 className="text-3xl font-bold text-center mb-6">Inscription</h2>
        <div className="w-full max-w-md bg-blue-100 rounded-lg shadow-md p-6">
          <div className="mb-4">
            <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
              Nom
            </label>
            <input 
              id="name"
              type="text" 
              placeholder="Votre nom..." 
              className="w-full h-14 bg-white rounded-lg border border-gray-300 p-4 text-lg" 
            />
          </div>
          <div className="mb-4">
            <label htmlFor="businessType" className="block text-lg font-medium text-gray-700 mb-2">
              Prénom
            </label>
            <input 
              id="businessType"
              type="text" 
              placeholder="Votre prénom..." 
              className="w-full h-14 bg-white rounded-lg border border-gray-300 p-4 text-lg" 
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-lg font-medium text-gray-700 mb-2">
              Mail
            </label>
            <input 
              id="phone"
              type="text" 
              placeholder="abc@example.com" 
              className="w-full h-14 bg-white rounded-lg border border-gray-300 p-4 text-lg" 
            />
          </div>
          <div className="mb-4">
          <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-2">
            Mot de passe
          </label>
          <input 
            id="password"
            type="password" 
            placeholder="Entrez votre mot de passe" 
            className="w-full h-14 bg-white rounded-lg border border-gray-300 p-4 text-lg" 
          />
        </div>
        <div className="flex justify-between items-center mb-4">
  <label htmlFor="isProvider" className="text-lg font-medium text-gray-700">
    Êtes-vous prestataire ?
  </label>
  <label className="relative inline-flex items-center cursor-pointer">
    <input
      id="isProvider"
      type="checkbox"
      className="sr-only peer"
      checked={isProvider}
      onChange={handleProviderChange}
    />
    <div className="group border border-gray-600 shadow-inner shadow-gray-900 peer ring-0 bg-gradient-to-tr from-rose-100 via-rose-400 to-rose-500 rounded-full outline-none duration-300 after:duration-300 w-14 h-8 shadow-md peer-checked:bg-emerald-500 peer-focus:outline-none after:content-['✖️'] after:rounded-full after:absolute after:bg-gray-50 after:border after:border-gray-600 after:outline-none after:h-6 after:w-6 after:top-1 after:left-0.5 after:-rotate-180 after:flex after:justify-center after:items-center peer-checked:after:translate-x-6 peer-checked:after:content-['✔️'] peer-hover:after:scale-95 peer-checked:after:rotate-0 peer-checked:bg-gradient-to-tr peer-checked:from-green-100 peer-checked:via-lime-400 peer-checked:to-lime-500">
    </div>
  </label>
</div>

          {isProvider && (
  <div className="space-y-4 mt-4">
    <div className="mb-4">
      <label htmlFor="establishmentName" className="block text-lg font-medium text-gray-700 mb-2">
        Nom de l'établissement ou du service proposé
      </label>
      <input
        id="establishmentName"
        type="text"
        placeholder="ex: O'tacos, Hôtel Ibis, ..."
        className="w-full h-14 bg-white rounded-lg border border-gray-300 p-4 text-lg"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="businessType" className="block text-lg font-medium text-gray-700 mb-2">
        Quel est votre commerce ?
      </label>
      <input
        id="businessType"
        type="text"
        placeholder="ex: Babysitting, Restauration rapide, ..."
        className="w-full h-14 bg-white rounded-lg border border-gray-300 p-4 text-lg"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="phone" className="block text-lg font-medium text-gray-700 mb-2">
        Numéro de téléphone
      </label>
      <input
        id="phone"
        type="tel"
        placeholder="0x xx xx xx xx"
        className="w-full h-14 bg-white rounded-lg border border-gray-300 p-4 text-lg"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="address" className="block text-lg font-medium text-gray-700 mb-2">
        Adresse postale (si concerné)
      </label>
      <input
        id="address"
        type="text"
        placeholder="ex: 23 rue Bénard, 75014 Paris"
        className="w-full h-14 bg-white rounded-lg border border-gray-300 p-4 text-lg"
      />
    </div>
  </div>
)}

          <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded transition duration-300 ease-in-out shadow-lg cursor-pointer mt-4">
            Créer un compte
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUpBox;
