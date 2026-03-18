import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/Components/ui/card";
import { FileText, BookOpen, Send, ArrowLeft, Loader2, GraduationCap } from "lucide-react";
import ApplicantLayout from '@/Layouts/ApplicantLayout';

export default function ApplyForm({ job }) {
    const { data, setData, post, processing, errors } = useForm({
        sop: '',
        research_interest: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('jobs.apply.submit', job.id));
    };

    return (
        <ApplicantLayout>
            <Head title={`Apply - ${job.title}`} />

            <div className="max-w-4xl mx-auto py-10 px-6">
                <Link 
                    href={route('dashboard')}
                    className="flex items-center text-slate-500 hover:text-slate-900 mb-6 transition-colors font-medium"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
                </Link>

                <div className="mb-10 p-6 bg-blue-600 rounded-2xl text-white shadow-xl shadow-blue-600/20 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-serif font-bold">Application for Faculty Position</h1>
                        <p className="text-blue-100 mt-1 flex items-center gap-2">
                            <GraduationCap className="h-5 w-5" /> {job.title} | {job.department}
                        </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20 text-sm">
                        Ref: #IITI-{job.id}
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-8">
                    {/* Section 1: Statement of Purpose */}
                    <Card className="shadow-sm border-slate-200 overflow-hidden">
                        <CardHeader className="border-b bg-slate-50/50 p-6">
                            <div className="flex items-center gap-2 text-blue-600">
                                <FileText className="h-5 w-5" />
                                <CardTitle className="text-lg font-bold">Statement of Purpose (SOP)</CardTitle>
                            </div>
                            <CardDescription className="font-medium text-slate-500">
                                Describe your research/teaching philosophy and why you are interested in IIT Indore.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <textarea
                                value={data.sop}
                                onChange={e => setData('sop', e.target.value)}
                                className={`w-full min-h-[350px] p-4 rounded-xl border bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none transition-all duration-200 leading-relaxed text-slate-700 ${errors.sop ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'}`}
                                placeholder="Write your comprehensive SOP here..."
                            />
                            {errors.sop && <p className="text-sm font-bold text-red-600 mt-2">{errors.sop}</p>}
                        </CardContent>
                    </Card>

                    {/* Section 2: Research Interests */}
                    <Card className="shadow-sm border-slate-200 overflow-hidden">
                        <CardHeader className="border-b bg-slate-50/50 p-6">
                            <div className="flex items-center gap-2 text-blue-600">
                                <BookOpen className="h-5 w-5" />
                                <CardTitle className="text-lg font-bold">Future Research Interests</CardTitle>
                            </div>
                            <CardDescription className="font-medium text-slate-500">
                                Outline the research areas you intend to develop at the Institute.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <textarea
                                value={data.research_interest}
                                onChange={e => setData('research_interest', e.target.value)}
                                className={`w-full min-h-[180px] p-4 rounded-xl border bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none transition-all duration-200 leading-relaxed text-slate-700 ${errors.research_interest ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'}`}
                                placeholder="Summarize your research vision..."
                            />
                            {errors.research_interest && <p className="text-sm font-bold text-red-600 mt-2">{errors.research_interest}</p>}
                        </CardContent>
                    </Card>

                    <div className="flex items-center justify-between p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
                        <p className="text-sm text-slate-500 font-medium max-w-md">
                            By submitting, you confirm that all information provided is accurate and corresponds to the official recruitment guidelines of IIT Indore.
                        </p>
                        <Button 
                            disabled={processing} 
                            type="submit" 
                            className="bg-blue-600 text-white font-bold h-12 px-10 shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:shadow-blue-600/40 transition-all text-base"
                        >
                            {processing ? (
                                <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...</>
                            ) : (
                                <><Send className="mr-2 h-4 w-4" /> Submit Application</>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </ApplicantLayout>
    );
}