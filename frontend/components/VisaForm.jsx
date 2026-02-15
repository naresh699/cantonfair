"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, MessageCircle } from 'lucide-react';

export default function VisaForm({
    title = "Expert Visa Assistance",
    description = "Get your business visa processed by specialists. We handle the paperwork, you handle the deals.",
    features = ["100% Compliance", "Fast Processing", "Business Invitations"]
}) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        occupation: '',
        message: ''
    });
    const [status, setStatus] = useState('idle');
    const [lastSubmitted, setLastSubmitted] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const res = await fetch('/api/visa', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (data.success) {
                setLastSubmitted(formData);
                setStatus('success');
                setFormData({ name: '', email: '', phone: '', occupation: '', message: '' });
            } else {
                alert('Something went wrong. Please try again.');
                setStatus('idle');
            }
        } catch (error) {
            console.error(error);
            alert('Connection error. Please try again.');
            setStatus('idle');
        }
    };

    if (status === 'success') {
        const waMessage = `*New Visa Application Submission*\n\n` +
            `*Name:* ${lastSubmitted?.name}\n` +
            `*Phone:* ${lastSubmitted?.phone}\n` +
            `*Email:* ${lastSubmitted?.email}\n` +
            `*Occupation:* ${lastSubmitted?.occupation}\n` +
            `*Message:* ${lastSubmitted?.message}`;

        const waLink = `https://wa.me/917568778898?text=${encodeURIComponent(waMessage)}`;

        return (
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
                        <div className="bg-dragon-blue text-white p-12 md:w-2/5">
                            <h2 className="text-3xl font-bold mb-6">{title}</h2>
                            <div
                                className="text-gray-300 mb-8 text-sm leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: description }}
                            />

                            <div className="space-y-6">
                                {features.map((feature, index) => (
                                    <div key={index} className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-dragon-red flex items-center justify-center">✓</div>
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="p-12 md:w-3/5 flex items-center justify-center">
                            <div className="bg-green-50 p-6 rounded-xl border border-green-200 text-center">
                                <CheckCircle2 className="mx-auto text-green-500 mb-4" size={48} />
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Application Received!</h3>
                                <p className="text-gray-600 mb-6">We'll review your details and get back to you shortly.</p>

                                <a
                                    href={waLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#20bd5a] transition-colors mb-4 mx-auto shadow-md"
                                >
                                    <MessageCircle size={20} /> Send Confirmation to WhatsApp
                                </a>

                                <div className="block">
                                    <button onClick={() => setStatus('idle')} className="mt-4 text-dragon-red font-bold hover:underline text-sm">
                                        Submit another application
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
                    <div className="bg-dragon-blue text-white p-12 md:w-2/5">
                        <h2 className="text-3xl font-bold mb-6">{title}</h2>
                        <div
                            className="text-gray-300 mb-8 text-sm leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: description }}
                        />

                        <div className="space-y-6">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-dragon-red flex items-center justify-center">✓</div>
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-12 md:w-3/5">
                        {status === 'success' ? (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col items-center justify-center text-center">
                                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mb-6">✓</div>
                                <h3 className="text-2xl font-bold text-dragon-blue mb-2">Inquiry Sent!</h3>
                                <p className="text-gray-500">Our concierge will contact you within 24 hours.</p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-dragon-red focus:ring-1 focus:ring-dragon-red outline-none placeholder:text-gray-500 text-gray-800"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-dragon-red focus:ring-1 focus:ring-dragon-red outline-none placeholder:text-gray-500 text-gray-800"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-dragon-red focus:ring-1 focus:ring-dragon-red outline-none placeholder:text-gray-500 text-gray-800"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                                <p className="text-xs text-gray-500 italic ml-1">
                                    Make sure to enter the correct WhatsApp number, because the rest of the communication will happen in WhatsApp and your entered email address.
                                </p>
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs font-semibold text-gray-600 ml-1">Occupation</label>
                                    <select
                                        className={`w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-dragon-red focus:ring-1 focus:ring-dragon-red outline-none bg-white ${formData.occupation ? 'text-gray-800' : 'text-gray-500'
                                            }`}
                                        value={formData.occupation}
                                        onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                                    >
                                        <option value="" disabled>Select Occupation</option>
                                        <option value="Jobs">Jobs</option>
                                        <option value="Business man">Business man</option>
                                        <option value="Traders">Traders</option>
                                        <option value="Freelancer">Freelancer</option>
                                    </select>
                                </div>
                                <textarea
                                    placeholder="Your Requirements"
                                    rows="4"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-dragon-red focus:ring-1 focus:ring-dragon-red outline-none placeholder:text-gray-400 text-gray-800"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                ></textarea>

                                <button
                                    disabled={status === 'submitting'}
                                    className="w-full bg-dragon-red text-white py-4 rounded-xl font-bold hover:bg-dragon-blue transition-all disabled:opacity-50"
                                >
                                    {status === 'submitting' ? 'Processing...' : 'Request Consultation'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
