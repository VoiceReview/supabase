import Link from 'next/link';
import Header from '../components/header';
import Footer from '../components/footer';

function Categories() {
    const categories = [
        { id: 1, name: "Restaurants" },
        { id: 2, name: "Boutiques" },
        { id: 3, name: "Hotels" }
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
                <div className="flex justify-center items-center h-full">
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                        <nav className="flex justify-around">
                            {categories.map((category) => (
                                <Link 
                                    key={category.id} 
                                    href={`/categories/${encodeURIComponent(category.name.toLowerCase())}`}
                                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    {category.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Categories;
