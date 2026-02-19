"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

export default function FAQ({ faqs }) {
    const [activeIndex, setActiveIndex] = useState(null);

    const displayFAQs = faqs && faqs.length > 0 ? faqs.map(f => ({
        question: f.title,
        answer: f.content.replace(/<[^>]*>?/gm, '') // Strip HTML tags
    })) : [
        {
            question: "Do I need a business invitation for a Chinese Visa?",
            answer: "Yes, for a Business (M) visa, an official invitation letter from a Chinese trade partner or organization is required. We assist in procuring valid invitations for our clients."
        },
        {
            question: "What items are covered in the Sourcing Trip package?",
            answer: "Our standard packages include 5-star accommodation, internal transfers, bilingual trade guides, factory visit coordination, and entry to relevant trade fairs."
        },
        {
            question: "Can you help with customs and logistics?",
            answer: "Absolutely. We have partner logistics firms specializing in the China-India trade route to handle everything from door-to-door shipping to customs clearance."
        }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6 max-w-3xl">
                <h2 className="text-4xl font-bold text-dragon-blue mb-12 text-center">Frequently Asked Questions</h2>

                <div className="space-y-4">
                    {displayFAQs.map((item, index) => (
                        <div key={index} className="border border-gray-200 rounded-2xl overflow-hidden">
                            <button
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                                <span className="text-lg font-bold text-dragon-blue">{item.question}</span>
                                {activeIndex === index ? <Minus className="text-dragon-red" /> : <Plus className="text-dragon-red" />}
                            </button>

                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-6 pt-0 text-gray-600 border-t border-gray-100">
                                            {item.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
