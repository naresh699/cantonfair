import {
    Sofa, Flame, Brush, Utensils, Watch, Footprints,
    Dumbbell, ShoppingBag, Lightbulb, Car, Dog, Baby,
    Bike, Shirt, BedDouble, Gift, Zap, Glasses,
    Gamepad2, Palette, Smartphone, Printer, Box,
    Droplet, Timer, Scissors, Hammer, Gem,
    Plane, Train, Bus
} from 'lucide-react';

const markets = [
    { category: "Furniture", location: "Foshan", icon: Sofa, color: "text-amber-600", distance: "25 km", transport: "Bus/Cab", transportIcon: Car },
    { category: "Lighting & LED", location: "Guzhen", icon: Lightbulb, color: "text-yellow-500", distance: "85 km", transport: "Train", transportIcon: Train },
    { category: "Electronics", location: "Shenzhen", icon: Smartphone, color: "text-blue-500", distance: "140 km", transport: "Train", transportIcon: Train },
    { category: "Jewelry & Accessories", location: "Yiwu / Guangzhou", icon: Gem, color: "text-pink-500", distance: "1200 km", transport: "Plane", transportIcon: Plane },
    { category: "Toys", location: "Shantou / Chenghai", icon: Gamepad2, color: "text-indigo-500", distance: "400 km", transport: "Train", transportIcon: Train },
    { category: "Ceramics", location: "Jingdezhen", icon: Utensils, color: "text-orange-400", distance: "800 km", transport: "Plane", transportIcon: Plane },
    { category: "Sneakers & Shoes", location: "Fujian / Wenzhou", icon: Footprints, color: "text-red-500", distance: "700 km", transport: "Plane/Train", transportIcon: Plane },
    { category: "Bags & Belts", location: "Guangzhou", icon: ShoppingBag, color: "text-purple-500", distance: "Local", transport: "Metro/Cab", transportIcon: Car },
    { category: "Car Parts", location: "Guangzhou", icon: Car, color: "text-slate-600", distance: "Local", transport: "Metro/Cab", transportIcon: Car },
    { category: "Textiles & Hoodies", location: "Qingdao / Nantong", icon: Shirt, color: "text-cyan-600", distance: "1800 km", transport: "Plane", transportIcon: Plane },
    { category: "Hardware & Tools", location: "Linyi / Foshan", icon: Hammer, color: "text-stone-600", distance: "Various", transport: "Plane/Train", transportIcon: Plane },
    { category: "Watches", location: "Guangzhou", icon: Watch, color: "text-emerald-600", distance: "Local", transport: "Metro/Cab", transportIcon: Car },
    { category: "Fitness Equipment", location: "Dezhou", icon: Dumbbell, color: "text-lime-600", distance: "1600 km", transport: "Plane", transportIcon: Plane },
    { category: "Glasses / Optics", location: "Wenzhou / Danyang", icon: Glasses, color: "text-teal-600", distance: "900 km", transport: "Plane", transportIcon: Plane },
    { category: "Sanitary Ware", location: "Foshan", icon: Droplet, color: "text-cyan-500", distance: "30 km", transport: "Bus/Cab", transportIcon: Car },
    { category: "Small Commodities (Gifts)", location: "Yiwu", icon: Gift, color: "text-rose-500", distance: "1200 km", transport: "Plane", transportIcon: Plane },
    { category: "Bicycles", location: "Tianjin", icon: Bike, color: "text-green-600", distance: "1900 km", transport: "Plane", transportIcon: Plane },
    { category: "Pet Food & Supplies", location: "Nanhe", icon: Dog, color: "text-amber-700", distance: "1500 km", transport: "Plane", transportIcon: Plane },
];

export default function ChinaMarketTable() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-dragon-blue mb-4">China Wholesale Market Map</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Specific cities in China dominate specific industries. Knowing where to go is 90% of the sourcing battle.
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 bg-dragon-blue/5 px-4 py-2 rounded-full border border-dragon-blue/10">
                        <span className="w-2 h-2 rounded-full bg-dragon-red animate-pulse"></span>
                        <p className="text-sm font-medium text-dragon-blue">
                            All distances measured from <span className="font-bold">Guangzhou City</span> (Group Meeting Point)
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {markets.map((market, index) => (
                        <div
                            key={index}
                            className="flex items-center p-6 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-lg hover:border-dragon-red/30 transition-all group"
                        >
                            <div className={`w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm mr-4 ${market.color} group-hover:scale-110 transition-transform shrink-0`}>
                                <market.icon size={28} strokeWidth={2} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-dragon-blue text-lg mb-1">{market.category}</h3>
                                <div className="space-y-1">
                                    <div className="text-gray-500 font-medium flex items-center gap-2 text-sm">
                                        <span className="text-xs uppercase tracking-wider text-gray-400 w-12">HUB:</span>
                                        {market.location}
                                    </div>
                                    <div className="text-gray-500 font-medium flex items-center gap-2 text-sm">
                                        <span className="text-xs uppercase tracking-wider text-gray-400 w-12">DIST:</span>
                                        <span className="flex items-center gap-1">
                                            {market.distance}
                                            <span className="text-gray-300 mx-1">|</span>
                                            <market.transportIcon size={14} className="text-dragon-red" />
                                            <span className="text-xs">{market.transport}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
