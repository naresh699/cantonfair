import Header from '@/components/DynamicHeader';
import { getTripBySlug } from '@/lib/wordpress';

export default async function TripPage({ params }) {
    const { slug } = params;
    const trip = await getTripBySlug(slug);

    if (!trip) {
        return <div>Trip not found</div>;
    }

    return (
        <main className="min-h-screen bg-white">
            <Header />
            <div className="pt-32 container mx-auto px-6">
                <h1 className="text-4xl font-bold text-dragon-blue mb-8">{trip.title}</h1>
                <div className="prose max-w-none text-gray-700 mb-12" dangerouslySetInnerHTML={{ __html: trip.content }} />

                <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 mb-24">
                    <h2 className="text-2xl font-bold text-dragon-blue mb-4">Trip Details</h2>
                    <p><strong>City:</strong> {trip.tripFields?.city}</p>
                    <p><strong>Price:</strong> {trip.tripFields?.price}</p>
                    <p><strong>Included:</strong> {trip.tripFields?.features}</p>
                </div>
            </div>
        </main>
    );
}
