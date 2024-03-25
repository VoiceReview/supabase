import { useRouter } from 'next/router';
import Header from '../../components/header';
import Footer from '../../components/footer';

function CategoryPage() {
    const router = useRouter();
    const { categorie } = router.query; // Utilisation de 'categorie' comme variable

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
                <h1>{categorie}</h1>
                {/* Contenu spécifique de la catégorie */}
            </main>
            <Footer />
        </div>
    );
}

export default CategoryPage;
