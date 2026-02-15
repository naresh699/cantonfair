"use client";
import { useState } from 'react';
import Header from '@/components/Header';
import { motion } from 'framer-motion';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('idle');

    const handleLogin = (e) => {
        e.preventDefault();
        setStatus('loading');

        // Simulate API call
        setTimeout(() => {
            setStatus('error');
        }, 1500);
    };

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            <div className="flex-1 flex items-center justify-center pt-20 px-6">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="bg-dragon-blue p-8 text-center">
                        <h1 className="text-2xl font-bold text-white mb-2">Client Portal</h1>
                        <p className="text-dragon-red/90 text-sm">Access your Trip Itinerary & Documents</p>
                    </div>

                    <div className="p-8">
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-dragon-red focus:ring-1 focus:ring-dragon-red outline-none text-gray-800"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your registered email"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Password</label>
                                <input
                                    type="password"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-dragon-red focus:ring-1 focus:ring-dragon-red outline-none text-gray-800"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                />
                            </div>

                            {status === 'error' && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 flex items-center gap-2"
                                >
                                    <span>⚠️</span>
                                    Invalid credentials. Please contact support.
                                </motion.div>
                            )}

                            <button
                                disabled={status === 'loading'}
                                className="w-full bg-dragon-red text-white py-4 rounded-xl font-bold hover:bg-dragon-blue transition-all disabled:opacity-70 flex items-center justify-center"
                            >
                                {status === 'loading' ? (
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    "Sign In"
                                )}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <a href="#" className="text-sm text-gray-400 hover:text-dragon-blue transition-colors">Forgot Password?</a>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-6 text-center border-t border-gray-100">
                        <p className="text-xs text-gray-500">
                            Don't have an account? <span className="font-bold text-dragon-blue">Book a trip first.</span>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
