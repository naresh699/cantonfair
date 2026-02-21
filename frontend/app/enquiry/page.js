"use client";
import { useState } from 'react';
import Header from '@/components/DynamicHeader';
import { motion } from 'framer-motion';
import { Send, User, Mail, Phone, MapPin, Briefcase, MessageSquare, CheckCircle } from 'lucide-react';

export default function EnquiryPage() {
    const [status, setStatus] = useState('');
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        state: '',
        profession: '',
        details: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const res = await fetch('/api/visa', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.fullName,
                    email: formData.email,
                    phone: formData.phoneNumber,
                    occupation: formData.profession,
                    message: `State: ${formData.state}\nDetails: ${formData.details}`
                })
            });

            const data = await res.json();

            if (data.success) {
                setStatus('success');
            } else {
                alert('Submission failed. Please try again.');
                setStatus('');
            }
        } catch (error) {
            console.error(error);
            alert('Connection error. Please try again.');
            setStatus('');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const waMessage = `*New Business Enquiry*\n\n` +
        `*Name:* ${formData.fullName}\n` +
        `*Phone:* ${formData.phoneNumber}\n` +
        `*Email:* ${formData.email}\n` +
        `*State:* ${formData.state}\n` +
        `*Profession:* ${formData.profession}\n` +
        `*Details:* ${formData.details}`;

    const waLink = `https://wa.me/917568778898?text=${encodeURIComponent(waMessage)}`;

    return (
        <main className="min-h-screen bg-gray-50 pb-24">
            <Header />

            {/* Hero Section */}
            <div className="bg-dragon-blue pt-32 pb-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-dragon-red/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight italic">
                        Business Enquiry
                    </h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto font-medium italic">
                        Tell us about your business needs. Our experts will get in touch with you within 24 hours.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 -mt-10 relative z-20">
                <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">

                    {/* Form Side */}
                    <div className="flex-1 p-8 md:p-12">
                        {status === 'success' ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="h-full flex flex-col items-center justify-center text-center py-20"
                            >
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-lg">
                                    <CheckCircle className="w-10 h-10 text-green-600" />
                                </div>
                                <h2 className="text-3xl font-black text-dragon-blue mb-4 uppercase italic">Enquiry Received!</h2>
                                <p className="text-gray-600 mb-8 font-medium">
                                    Thank you for reaching out. Your details have been sent to our desk. For faster response, please confirm on WhatsApp.
                                </p>

                                <a
                                    href={waLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 hover:bg-[#20bd5a] transition-all shadow-xl uppercase tracking-widest text-sm mb-6"
                                >
                                    Confirm on WhatsApp
                                </a>

                                <button
                                    onClick={() => setStatus('')}
                                    className="text-dragon-red font-black hover:underline uppercase text-xs tracking-widest"
                                >
                                    Send another enquiry
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Full Name */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-dragon-blue uppercase tracking-[0.2em] flex items-center gap-2">
                                            <User className="w-3.5 h-3.5 text-dragon-red" /> Full Name
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            className="w-full bg-white border-2 border-gray-100 rounded-xl px-4 py-3 focus:border-dragon-red outline-none transition-all font-bold text-dragon-blue placeholder:text-gray-300 shadow-sm"
                                            placeholder="Enter your name"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-dragon-blue uppercase tracking-[0.2em] flex items-center gap-2">
                                            <Mail className="w-3.5 h-3.5 text-dragon-red" /> Email Address
                                        </label>
                                        <input
                                            required
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full bg-white border-2 border-gray-100 rounded-xl px-4 py-3 focus:border-dragon-red outline-none transition-all font-bold text-dragon-blue placeholder:text-gray-300 shadow-sm"
                                            placeholder="email@example.com"
                                        />
                                    </div>

                                    {/* Phone Number */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-dragon-blue uppercase tracking-[0.2em] flex items-center gap-2">
                                            <Phone className="w-3.5 h-3.5 text-dragon-red" /> Phone Number
                                        </label>
                                        <input
                                            required
                                            type="tel"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            className="w-full bg-white border-2 border-gray-100 rounded-xl px-4 py-3 focus:border-dragon-red outline-none transition-all font-bold text-dragon-blue placeholder:text-gray-300 shadow-sm"
                                            placeholder="+91 00000 00000"
                                        />
                                    </div>

                                    {/* State in India */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-dragon-blue uppercase tracking-[0.2em] flex items-center gap-2">
                                            <MapPin className="w-3.5 h-3.5 text-dragon-red" /> State in India
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            className="w-full bg-white border-2 border-gray-100 rounded-xl px-4 py-3 focus:border-dragon-red outline-none transition-all font-bold text-dragon-blue placeholder:text-gray-300 shadow-sm"
                                            placeholder="Your state"
                                        />
                                    </div>
                                </div>

                                {/* Profession */}
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-dragon-blue uppercase tracking-[0.2em] flex items-center gap-2">
                                        <Briefcase className="w-3.5 h-3.5 text-dragon-red" /> Profession
                                    </label>
                                    <div className="relative">
                                        <select
                                            required
                                            name="profession"
                                            value={formData.profession}
                                            onChange={handleChange}
                                            className="w-full bg-white border-2 border-gray-100 rounded-xl px-4 py-3 focus:border-dragon-red outline-none transition-all font-bold text-dragon-blue appearance-none shadow-sm"
                                        >
                                            <option value="">Select your profession</option>
                                            <option value="Businessman">Businessman / Entrepreneur</option>
                                            <option value="PVT Jobs">Private Sector Professional</option>
                                            <option value="Student">Student</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
                                    </div>
                                </div>

                                {/* Business Detail */}
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-dragon-blue uppercase tracking-[0.2em] flex items-center gap-2">
                                        <MessageSquare className="w-3.5 h-3.5 text-dragon-red" /> Business Details (max 200 words)
                                    </label>
                                    <textarea
                                        required
                                        name="details"
                                        value={formData.details}
                                        onChange={handleChange}
                                        rows="4"
                                        className="w-full bg-white border-2 border-gray-100 rounded-xl px-4 py-3 focus:border-dragon-red outline-none transition-all font-bold text-dragon-blue placeholder:text-gray-300 shadow-sm resize-none"
                                        placeholder="Briefly describe your business requirements..."
                                    ></textarea>
                                    <div className="text-right text-[10px] text-gray-400 font-black uppercase tracking-widest">
                                        {formData.details.split(/\s+/).filter(Boolean).length} / 200 words
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'sending'}
                                    className="w-full bg-dragon-red hover:bg-dragon-blue text-white py-4 rounded-xl font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all shadow-[0_20px_50px_rgba(222,41,16,0.2)] disabled:opacity-70 cursor-pointer italic"
                                >
                                    {status === 'sending' ? (
                                        "Processing Lead..."
                                    ) : (
                                        <>Submit Enquiry <Send className="w-5 h-5" /></>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Info Side */}
                    <div className="hidden md:block w-80 bg-dragon-blue p-12 text-white relative">
                        <div className="relative z-10 space-y-12">
                            <div>
                                <h3 className="text-dragon-red font-black uppercase tracking-widest text-sm mb-4">Contact Us</h3>
                                <p className="text-blue-100 font-medium tracking-tighter text-lg">+91 93630 31835</p>
                                <p className="text-blue-100 font-medium text-sm">info@cantonfairindia.com</p>
                            </div>
                            <div>
                                <h3 className="text-dragon-red font-black uppercase tracking-widest text-sm mb-4">Office</h3>
                                <p className="text-blue-100 font-medium text-sm leading-relaxed">B-38, Phase-III, New Delhi, India</p>
                            </div>
                            <div className="pt-8 border-t border-white/10">
                                <p className="text-xs text-blue-200 uppercase tracking-widest font-black mb-4 italic">Why choose us?</p>
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-3 text-sm font-bold uppercase tracking-tight">
                                        <div className="w-1.5 h-1.5 rounded-full bg-dragon-red" />
                                        15+ Years Experience
                                    </li>
                                    <li className="flex items-center gap-3 text-sm font-bold uppercase tracking-tight">
                                        <div className="w-1.5 h-1.5 rounded-full bg-dragon-red" />
                                        Verified Manufacturers
                                    </li>
                                    <li className="flex items-center gap-3 text-sm font-bold uppercase tracking-tight">
                                        <div className="w-1.5 h-1.5 rounded-full bg-dragon-red" />
                                        Complete Logistics
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
