import { useState } from 'react';
import { Head, usePage, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { 
    Dialog, DialogContent, DialogHeader, 
    DialogTitle, DialogFooter 
} from "@/Components/ui/dialog";
import { Briefcase, CalendarDays, Building2, ArrowRight, Inbox, CheckCircle2, Info, FileEdit } from "lucide-react";
import ApplicantLayout from '@/Layouts/ApplicantLayout';

export default function Dashboard({ jobs = [], appliedJobIds = [] }) {
    const [selectedJob, setSelectedJob] = useState(null);

    return (
        <ApplicantLayout>
            <Head title="Applicant Dashboard" />

            <div className="bg-slate-900 py-12 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-slate-900/50" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <h1 className="text-3xl font-serif font-bold text-white sm:text-4xl drop-shadow-sm">
                        Open Faculty Positions
                    </h1>
                    <p className="mt-3 text-slate-300 font-medium max-w-2xl text-lg">
                        Browse the latest academic openings and begin your formal application process.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto w-full px-6 py-12">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {jobs.map((job) => {
                        const hasApplied = appliedJobIds.includes(job.id);
                        
                        return (
                            <Card key={job.id} className="flex flex-col border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 group bg-white">
                                <CardHeader className="pb-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                                            <Briefcase className="h-5 w-5" />
                                        </div>
                                        {hasApplied && (
                                            <span className="inline-flex items-center rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-xs font-bold text-emerald-600">
                                                <CheckCircle2 className="h-3 w-3 mr-1" /> Applied
                                            </span>
                                        )}
                                    </div>
                                    <CardTitle className="text-xl font-bold text-slate-900 leading-tight">
                                        {job.title}
                                    </CardTitle>
                                    <CardDescription className="flex items-center gap-1.5 font-bold text-blue-600 mt-2">
                                        <Building2 className="h-4 w-4" />
                                        {job.department}
                                    </CardDescription>
                                </CardHeader>
                                
                                <CardContent className="flex-grow pb-4">
                                    <p className="text-sm font-medium text-slate-600 line-clamp-3 mb-6 leading-relaxed">
                                        {job.description_and_criteria}
                                    </p>
                                    <div className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-50 border border-slate-100 p-2.5 rounded-md shadow-sm">
                                        <CalendarDays className="h-4 w-4 text-slate-400" />
                                        <span>Deadline:</span>
                                        <span className="text-red-600">{new Date(job.deadline).toLocaleDateString()}</span>
                                    </div>
                                </CardContent>
                                
                                <CardFooter className="pt-0 pb-6 px-6">
                                    <Button 
                                        onClick={() => setSelectedJob(job)}
                                        className="w-full bg-slate-900 text-white font-bold shadow-md hover:bg-blue-600 hover:shadow-lg transition-all duration-300 group-hover:-translate-y-0.5"
                                    >
                                        View Details & Apply <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        );
                    })}
                </div>

                {jobs.length === 0 && (
                    <div className="flex flex-col items-center justify-center text-center py-24 px-6 bg-white rounded-2xl border-2 border-dashed border-slate-200">
                        <Inbox className="h-12 w-12 text-slate-300 mb-4" />
                        <h3 className="text-xl font-bold text-slate-900">No Openings Available</h3>
                    </div>
                )}

                <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto border-none p-0 ring-1 ring-slate-200">
                        {selectedJob && (
                            <div className="flex flex-col">
                                <div className="bg-slate-900 p-8 text-white relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent" />
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase mb-3">
                                            <Building2 className="h-4 w-4" />{selectedJob.department}
                                        </div>
                                        <DialogTitle className="text-3xl font-serif font-bold leading-tight">{selectedJob.title}</DialogTitle>
                                        <div className="mt-4 flex gap-4 text-sm font-medium text-slate-300">
                                            <div className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4 text-red-400" />Deadline: {new Date(selectedJob.deadline).toLocaleDateString()}</div>
                                            <div className="flex items-center gap-1.5"><Info className="h-4 w-4 text-blue-400" />Ref ID: #IITI-{selectedJob.id}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 bg-white">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Eligibility & Description</h4>
                                    <div className="text-slate-700 whitespace-pre-wrap leading-relaxed">{selectedJob.description_and_criteria}</div>
                                </div>

                                <DialogFooter className="p-6 bg-slate-50 border-t flex flex-col sm:flex-row gap-3">
                                    <Button variant="outline" onClick={() => setSelectedJob(null)} className="font-bold">Close</Button>
                                    
                                    {appliedJobIds.includes(selectedJob.id) ? (
                                        <Button disabled className="bg-emerald-600 text-white font-bold opacity-80 cursor-not-allowed">
                                            <CheckCircle2 className="mr-2 h-4 w-4" /> Already Applied
                                        </Button>
                                    ) : (
                                        <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 shadow-lg">
                                            <Link href={route('jobs.apply.form', selectedJob.id)}>
                                                <FileEdit className="mr-2 h-4 w-4" /> Fill Application Form
                                            </Link>
                                        </Button>
                                    )}
                                </DialogFooter>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </ApplicantLayout>
    );
}