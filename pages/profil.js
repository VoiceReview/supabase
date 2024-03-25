import React, { useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';

const UserProfile = () => {
  // Données fictives pour le profil de l'utilisateur
  const userProfile = {
    name: "Mathys Bagnah",
    username: "@mathysbgh",
    contributions: 12,
    followers: 128,
    following: 102,
    location: "Vit à Paris",
    activeSince: "Actif depuis le 9 Dec 2023",
    about: "A propos de moi...",
  };

  const [modalOpen, setModalOpen] = useState(false);

  // Fonction pour ouvrir le modal
  const openModal = () => {
    setModalOpen(true);
  };

  // Fonction pour fermer le modal
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Header />
      <div className="bg-gray-100 min-h-screen flex flex-col items-center pt-10">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
        <div className="flex items-center space-x-4">
          <img src="/profile.png" alt="Profile" className="rounded-full w-24 h-24" />
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{userProfile.name}</h1>
            <p className="text-sm text-gray-600">{userProfile.username}</p>
            <div className="flex space-x-4 mt-3">
              <div className="flex items-center space-x-1">
                <span className="font-bold">{userProfile.contributions}</span>
                <span>Contributions</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="font-bold">{userProfile.followers}</span>
                <span>Followers</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="font-bold">{userProfile.following}</span>
                <span>Following</span>
              </div>
            </div>
            <button onClick={openModal} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Modifier le profil
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-gray-200 p-4 rounded">
            <h2 className="font-bold mb-2 text-center">Infos</h2>
            <p>{userProfile.location}</p>
            <p>{userProfile.activeSince}</p>
            <p className="mt-4">{userProfile.about}</p>
          </div>
          <div className="bg-gray-200 p-4 rounded">
            <h2 className="font-bold mb-2 text-center">Activité</h2>
            {/* Contenu de l'activité de l'utilisateur */}
          </div>
        </div>
        </div>
        {modalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3 text-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Modifier le profil</h3>
                <form className="mt-2 px-4 pb-4 text-left">
                  <div className="mb-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Prénom</label>
                    <input type="text" id="name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Entrez votre prénom" />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nom</label>
                    <input type="text" id="username" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Entrez votre nom" />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">Ville</label>
                    <input type="text" id="location" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Entrez votre ville" />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="link" className="block text-sm font-medium text-gray-700">Lien</label>
                    <input type="text" id="link" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Entrez un lien" />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">A propos</label>
                    <textarea id="about" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Parlez un peu de vous"></textarea>
                  </div>
                  <div className="flex items-center justify-end p-3 border-t border-solid border-gray-300 rounded-b">
                    <button className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1" type="button" style={{ transition: "all .15s ease" }} onClick={closeModal}>
                      Fermer
                    </button>
                    <button className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1" type="button" style={{ transition: "all .15s ease" }} onClick={() => { /* handle save */ }}>
                      Sauvegarder
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;
