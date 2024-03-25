import React, { useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';

const EditProfileModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Modifier le profil</h3>
          <div className="mt-2 px-7 py-3">
            <input className="mb-3 w-full border rounded py-2 px-3 text-grey-darkest" type="text" placeholder="Nom"/>
            <input className="mb-3 w-full border rounded py-2 px-3 text-grey-darkest" type="text" placeholder="Prénom"/>
            <input className="mb-3 w-full border rounded py-2 px-3 text-grey-darkest" type="text" placeholder="Pseudo"/>
            <input className="mb-3 w-full border rounded py-2 px-3 text-grey-darkest" type="text" placeholder="Ville"/>
            <input className="mb-3 w-full border rounded py-2 px-3 text-grey-darkest" type="text" placeholder="Lien"/>
            <textarea className="mb-3 w-full border rounded py-2 px-3 text-grey-darkest" placeholder="À propos" rows="3"></textarea>
          </div>
          <div className="items-center px-4 py-3">
            <button id="ok-btn" onClick={onClose} className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
              Enregistrer les modifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserProfile = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Header />
      <div className="flex justify-center mt-10">
        <button onClick={openModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Modifier le profil
        </button>
      </div>
      <EditProfileModal isOpen={modalOpen} onClose={closeModal} />
      <Footer />
    </>
  );
};

export default UserProfile;
