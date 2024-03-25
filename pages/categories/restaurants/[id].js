// Importations
import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Header from '../../../components/header';
import Footer from '../../../components/footer';
import { createClient } from '@supabase/supabase-js';

function RestaurantDetailPage({ reviews }) {
    const router = useRouter();
    const { id } = router.query;
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [audioUrl, setAudioUrl] = useState('');
    const mediaRecorderRef = useRef(null);

    // Données du restaurant (à remplacer par une requête à l'API)
    const restaurant = {
        id: id,
        name: "ECE Restauration",
        address: "1 quai de Grenelle",
        type: "Cuisine française",
        image: "/ece_restaurant.png"
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            mediaRecorderRef.current.ondataavailable = (event) => {
            };
            mediaRecorderRef.current.start();
            setIsRecording(true);
        } catch (err) {
            console.error('Could not start recording', err);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current.ondataavailable = event => {
                const audioBlob = event.data;
                setAudioBlob(audioBlob);
                const audioUrl = URL.createObjectURL(audioBlob);
                setAudioUrl(audioUrl);
            };
            setIsRecording(false);
        }
    };

    const reviewsSection = (
        <section className="my-8">
            <h2 className="text-lg font-semibold mb-4">Avis des clients</h2>
            <div className="space-y-4">
                {reviews.length > 0 ? (
                    reviews.map(review => (
                        <div key={review.comment_id} className="border p-4 rounded-lg">
                            {}
                            <p>{review.text && review.text.length > 0 ? review.text[0].content : "Ce commentaire n'a pas de texte associé."}</p>
                        </div>
                    ))
                ) : (
                    <p>Pas d'avis pour le moment. Soyez le premier à en laisser un !</p>
                )}
            </div>
        </section>
    );
    

    
    

    const recordReviewSection = (
        <section className="my-8">
            <h2 className="text-lg font-semibold mb-4">Laissez un avis vocal</h2>
            <div>
                {isRecording ? (
                    <button onClick={stopRecording} className="bg-red-500 text-white p-2 rounded">Arrêter l'enregistrement</button>
                ) : (
                    <button onClick={startRecording} className="bg-blue-500 text-white p-2 rounded">Commencer l'enregistrement</button>
                )}
                {audioUrl && <audio src={audioUrl} controls className="mt-4"/>}
            </div>
        </section>
    );

    if (!restaurant) {
        return <p>Restaurant non trouvé</p>;
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow p-4 container mx-auto">
                <h1 className="text-2xl font-bold text-center mb-6">{restaurant.name}</h1>
                
                {/* Section des avis existants */}
                {reviewsSection}

                {/* Section pour enregistrer un nouvel avis */}
                {recordReviewSection}
            </main>
            <Footer />
        </div>
    );

}

export async function getServerSideProps() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    let { data: comments, error } = await supabase
        .from('comment')
        .select(`
            comment_id,
            user_id,
            created_at,
            text ( content )  
        `);

    if (error) {
        console.error('Erreur lors de la récupération des commentaires:', error);
        return {
            props: { reviews: [] },
        };
    }
    console.log(comments);
    return {
        props: { reviews: comments || [] },
    };
}




export default RestaurantDetailPage;
