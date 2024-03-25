import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import Link from 'next/link';
import '../app/globals.css';

const Home = () => {
return (
    <>
      <Header />
      
      <div className="container mx-auto p-8 flex flex-col lg:flex-row items-center justify-between pb-8">
      <div className="lg:w-1/2">
        <h1 className="text-4xl font-bold mb-4">
          Clamez haut et fort votre opinion!
        </h1>
        <p className="text-xl mb-4">
          Exprimez-vous de manière plus naturelle grâce à notre système d’avis vocaux. Donner son avis n’a jamais été aussi simple!
        </p>
        <div className="my-4">
          <label htmlFor="search" className="block text-lg mb-2">
            Que recherchez-vous ?
          </label>
          <div className="flex">
            <input
              id="search"
              className="form-input px-4 py-2 border border-r-0 rounded-l-lg w-full"
              type="text"
              placeholder="Nom d’établissement, catégories, ..."
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700">
              Recherche
            </button>
          </div>
        </div>
        <Link href="/categories">
        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700 my-2">
          Comment ça marche ?
        </button>
        </Link>
      </div>
      <div className="lg:w-1/2 flex justify-center lg:justify-end mt-8 lg:mt-0">
      <img src="/accueil.png" alt="Accueil" className="max-w-xs rounded-xl" />
      </div>
    </div>  
    <div className="mb-20"></div>

      <Footer />
    </>
);
};

export default Home;
