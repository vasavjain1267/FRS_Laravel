import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { GraduationCap, Briefcase, FileText, User, LogOut, Menu, X } from 'lucide-react';
import { Button } from '@/Components/ui/button';

export default function ApplicantLayout({ children }) {
    const { auth } = usePage().props;
    const user = auth?.user || {};
    const email = user.email ;

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Open Positions', href: route('dashboard'), icon: Briefcase, active: route().current('dashboard') },
        { name: 'My Applications', href: route('applicant.applications'), icon: FileText, active: route().current('applicant.applications') },
        { name: 'Profile Settings', href: route('profile.edit'), icon: User, active: route().current('profile.edit') },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex">
            
            {/* Sidebar */}
            <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-white fixed inset-y-0">
                
                {/* Header */}
                <div className="flex items-center gap-3 px-6 h-20 border-b border-slate-800">
                    <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-blue-600">
                        <GraduationCap />
                    </div>
                    <div>
                        <p className="font-bold">IIT Indore</p>
                        <p className="text-xs text-blue-300">Applicant</p>
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-4 py-6 space-y-1">
                    {navLinks.map((item) => (
                        <Link key={item.name} href={item.href}
                            className={`flex items-center gap-3 px-3 py-3 rounded-lg ${
                                item.active
                                    ? "bg-blue-600"
                                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                            }`}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* User */}
                <div className="p-4 border-t border-slate-800">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center font-bold">
                            {(email?.charAt(0) || "U").toUpperCase()}
                        </div>
                        <p className="text-sm truncate">{email}</p>
                    </div>

                    <Button variant="destructive" className="w-full" asChild>
                        <Link href={route('logout')} method="post" as="button">
                            <LogOut className="h-4 w-4 mr-2" /> Logout
                        </Link>
                    </Button>
                </div>
            </aside>

            {/* Main */}
            <div className="flex-1 md:ml-64 flex flex-col">

                {/* Mobile Header */}
                <header className="md:hidden flex justify-between items-center bg-slate-900 text-white h-16 px-4">
                    <div className="flex items-center gap-2">
                        <GraduationCap />
                        <span>Applicant</span>
                    </div>

                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </header>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-slate-900 p-4 space-y-2">
                        {navLinks.map((item) => (
                            <Link key={item.name} href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block p-3 bg-slate-800 rounded"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                )}

                <main className="flex-1 p-4">
                    {children}
                </main>
            </div>
        </div>
    );
}