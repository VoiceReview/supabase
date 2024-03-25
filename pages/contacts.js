import React, { useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';

function Contacts() {
    const [form, setForm] = useState({ firstname: '', lastname: '', email: '', message: '' });
    const [submitStatus, setSubmitStatus] = useState({ success: false, error: false, message: '' });

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitStatus({ success: false, error: false, message: '' }); 
        // Ajoutez ici la logique de traitement du formulaire
        console.log('Form Data:', form);
        // Mettre à jour submitStatus en fonction de la réponse du traitement
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    return (
        <div className="container mx-auto px-4">
            <Header />
            <main className="mt-10">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Contactez-nous</h2>
                <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 shadow-md rounded-lg">
                    <div className="mb-4">
                        <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">Prénom :</label>
                        <input id="firstname" type="text" name="firstname" value={form.firstname} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Nom :</label>
                        <input id="lastname" type="text" name="lastname" value={form.lastname} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email :</label>
                        <input id="email" type="email" name="email" value={form.email} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message :</label>
                        <textarea id="message" name="message" value={form.message} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" required></textarea>
                    </div>
                    <div className="mb-4">
                        <button type="submit" className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                            Envoyer
                        </button>
                    </div>
                </form>
                {submitStatus.message && (
                    <div className={`mt-6 text-center p-4 rounded-md ${submitStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {submitStatus.message}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}

export default Contacts;
