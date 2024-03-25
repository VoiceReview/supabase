import Header from '../../../components/header';
import Footer from '../../../components/footer';
import Image from 'next/image';
import Link from 'next/link'

function RestaurantsPage() {

    const restaurants = [
        {
            id : 1,
            name : "ECE restauration",
            address : "1 quai de grennelle",
            type : "cuisine francaise",
            image : "/ece_restaurant.png"
        }
    ]

    

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow p-4">
                <h1 className="text-2xl font-bold text-center mb-6">Restaurants</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {restaurants.map((restaurant) => (
                <Link key={restaurant.id} href={`/categories/restaurants/${restaurant.id}`}>
                    <div className="bg-white rounded-lg shadow overflow-hidden cursor-pointer">
                        <Image 
                            src={restaurant.image}
                            alt={restaurant.name}
                            width={300}
                            height={200}
                            layout="responsive"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold">{restaurant.name}</h3>
                            <p className="text-sm text-gray-600">{restaurant.address}</p>
                            <p className="text-sm text-gray-800">{restaurant.type}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
            </main>
            <Footer />
        </div>
    );
}


export default RestaurantsPage;
