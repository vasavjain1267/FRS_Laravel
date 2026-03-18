import { Head, Link } from '@inertiajs/react';
import { Button } from "@/Components/ui/button";
import { GraduationCap, ArrowRight, ShieldCheck, Users, Briefcase } from "lucide-react";

export default function Welcome({ auth }) {
    const user = auth?.user;

    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <Head title="Welcome to FRS" />

            <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md shadow-sm">
                <div className="container mx-auto flex h-16 items-center justify-between px-6">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                            <GraduationCap className="h-5 w-5" />
                        </div>
                        <span className="text-lg font-bold tracking-tight text-slate-900">IIT Indore FRS</span>
                    </div>
                    <nav className="flex items-center gap-4">
                        {user ? (
                            <Button className="bg-slate-900 text-white hover:bg-blue-600 transition-colors shadow-sm" asChild>
                                <Link href={route('dashboard')}>Go to Dashboard</Link>
                            </Button>
                        ) : (
                            <>
                                <Button variant="ghost" asChild className="hidden sm:inline-flex text-slate-600 hover:text-slate-900 hover:bg-slate-100">
                                    <Link href={route('login')}>Sign In</Link>
                                </Button>
                                <Button className="bg-blue-600 text-white hover:bg-blue-700 shadow-md transition-all" asChild>
                                    <Link href={route('register')}>Register Now</Link>
                                </Button>
                            </>
                        )}
                    </nav>
                </div>
            </header>

            <main className="flex-1">
                <section className="relative overflow-hidden bg-slate-900 py-24 sm:py-32">
                    <img
                        src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2866&auto=format&fit=crop"
                        alt="University Campus"
                        className="absolute inset-0 h-full w-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60" />
                    
                    <div className="relative mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-center text-center">
                        <div className="inline-flex items-center rounded-full border border-blue-400/30 bg-blue-500/20 px-4 py-1.5 text-sm font-medium text-blue-100 backdrop-blur-md mb-8 shadow-sm">
                            <span className="flex h-2 w-2 rounded-full bg-blue-400 mr-2 animate-pulse"></span>
                            Recruitment Cycle 2026 is Live
                        </div>
                        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl max-w-4xl drop-shadow-sm">
                            Shape the Future of Academia at <span className="text-blue-400">IIT Indore</span>
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-slate-200 max-w-2xl font-medium">
                            Join one of India's premier Institutes of Eminence. We are actively seeking exceptional scholars and educators to join our distinguished faculty.
                        </p>
                        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                            {user ? (
                                <Button size="lg" className="h-14 px-8 text-base bg-blue-600 text-white hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/20 transition-all duration-300" asChild>
                                    <Link href={route('dashboard')}>
                                        View Openings <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                </Button>
                            ) : (
                                <>
                                    <Button size="lg" className="h-14 px-8 text-base bg-blue-600 text-white hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/20 transition-all duration-300" asChild>
                                        <Link href={route('register')}>Start Application</Link>
                                    </Button>
                                    <Button variant="outline" size="lg" className="h-14 px-8 text-base border-2 border-white/70 bg-transparent text-white hover:bg-white hover:text-slate-900 transition-all duration-300" asChild>
                                        <Link href={route('login')}>Applicant Login</Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </section>

                <section className="py-16 bg-white">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                                <div className="p-4 bg-blue-100 text-blue-700 rounded-2xl mb-4"><Briefcase className="h-6 w-6"/></div>
                                <h3 className="text-lg font-semibold text-slate-900">Multiple Departments</h3>
                                <p className="mt-2 text-slate-600 text-sm font-medium">Openings across Engineering, Sciences, and Humanities.</p>
                            </div>
                            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                                <div className="p-4 bg-indigo-100 text-indigo-700 rounded-2xl mb-4"><ShieldCheck className="h-6 w-6"/></div>
                                <h3 className="text-lg font-semibold text-slate-900">Transparent Process</h3>
                                <p className="mt-2 text-slate-600 text-sm font-medium">Track your application status in real-time through the portal.</p>
                            </div>
                            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                                <div className="p-4 bg-emerald-100 text-emerald-700 rounded-2xl mb-4"><Users className="h-6 w-6"/></div>
                                <h3 className="text-lg font-semibold text-slate-900">World-Class Peers</h3>
                                <p className="mt-2 text-slate-600 text-sm font-medium">Collaborate with leading researchers and bright minds.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="border-t py-8 bg-white text-center text-sm font-medium text-slate-500">
                <p>&copy; {new Date().getFullYear()} Indian Institute of Technology Indore. All rights reserved.</p>
            </footer>
        </div>
    );
}