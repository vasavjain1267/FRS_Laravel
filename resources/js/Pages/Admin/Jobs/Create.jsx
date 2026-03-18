import { Head, useForm } from '@inertiajs/react';
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/Components/ui/card";
import { toast } from "sonner";
import { Briefcase, Calendar, Building, Send, Loader2 } from "lucide-react";
import AdminLayout from '@/Layouts/AdminLayout';

export default function CreateJob() {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        department: '',
        description_and_criteria: '',
        deadline: '',
    });

    const submit = (e) => {
        e.preventDefault();
        
        post(route('jobs.store'), {
            onSuccess: () => {
                reset(); 
                toast.success("Position Published Successfully!", {
                    description: `The opening for ${data.title} is now live on the applicant portal.`,
                    duration: 4000,
                });
            },
            onError: () => {
                toast.error("Failed to publish job", {
                    description: "Please check the highlighted form fields and try again.",
                    duration: 5000,
                });
            }
        });
    };

    return (
        <AdminLayout>
            <Head title="Create Job Posting" />

            <div className="max-w-4xl mx-auto px-4 py-12">
                <Card className="shadow-lg border-none ring-1 ring-slate-200 overflow-hidden">
                    <div className="bg-indigo-600 h-2 w-full"></div>
                    <CardHeader className="bg-white pb-8">
                        <CardTitle className="text-3xl font-serif text-slate-900">Post a New Faculty Position</CardTitle>
                        <CardDescription className="text-base font-medium text-slate-500 mt-2">
                            Publish a new opening to the applicant portal. This will be immediately visible to all registered candidates.
                        </CardDescription>
                    </CardHeader>
                    
                    <form onSubmit={submit}>
                        <CardContent className="space-y-6 pt-6 bg-slate-50/80 border-t border-slate-100">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="title" className="font-bold text-slate-800">Job Title</Label>
                                    <div className="relative">
                                        <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                        <Input
                                            id="title"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            placeholder="e.g. Assistant Professor"
                                            className={`pl-10 bg-white border-slate-200 shadow-sm transition-colors ${errors.title ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-indigo-600"}`}
                                        />
                                    </div>
                                    {errors.title && <p className="text-sm font-medium text-red-500">{errors.title}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="department" className="font-bold text-slate-800">Department</Label>
                                    <div className="relative">
                                        <Building className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                        <Input
                                            id="department"
                                            value={data.department}
                                            onChange={(e) => setData('department', e.target.value)}
                                            placeholder="e.g. Computer Science"
                                            className={`pl-10 bg-white border-slate-200 shadow-sm transition-colors ${errors.department ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-indigo-600"}`}
                                        />
                                    </div>
                                    {errors.department && <p className="text-sm font-medium text-red-500">{errors.department}</p>}
                                </div>
                            </div>

                            <div className="space-y-2 max-w-sm">
                                <Label htmlFor="deadline" className="font-bold text-slate-800">Application Deadline</Label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                    <Input
                                        id="deadline"
                                        type="date"
                                        value={data.deadline}
                                        onChange={(e) => setData('deadline', e.target.value)}
                                        className={`pl-10 bg-white border-slate-200 shadow-sm transition-colors ${errors.deadline ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-indigo-600"}`}
                                    />
                                </div>
                                {errors.deadline && <p className="text-sm font-medium text-red-500">{errors.deadline}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description_and_criteria" className="font-bold text-slate-800">Description & Criteria</Label>
                                <textarea
                                    id="description_and_criteria"
                                    value={data.description_and_criteria}
                                    onChange={(e) => setData('description_and_criteria', e.target.value)}
                                    className={`flex min-h-[200px] w-full rounded-md border ${
                                        errors.description_and_criteria ? "border-red-500 focus-visible:ring-red-500" : "border-slate-200 focus-visible:ring-indigo-600"
                                    } bg-white px-4 py-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 transition-colors`}
                                    placeholder="Detail the responsibilities, required qualifications, and selection criteria..."
                                />
                                {errors.description_and_criteria && (
                                    <p className="text-sm font-medium text-red-500">{errors.description_and_criteria}</p>
                                )}
                            </div>
                        </CardContent>

                        <CardFooter className="bg-white border-t p-6 mt-0 flex justify-end gap-4 rounded-b-lg">
                            <Button variant="outline" type="button" onClick={() => reset()} className="border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-semibold">
                                Clear Form
                            </Button>
                            <Button type="submit" disabled={processing} className="bg-indigo-600 text-white hover:bg-indigo-700 font-bold px-8 shadow-md hover:shadow-lg transition-all duration-200">
                                {processing ? (
                                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Publishing...</>
                                ) : (
                                    <><Send className="mr-2 h-4 w-4" /> Publish Opening</>
                                )}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </AdminLayout>
    );
}