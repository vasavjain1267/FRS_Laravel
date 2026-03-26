import ApplicantLayout from "@/Layouts/ApplicantLayout";
import { Head, Link } from "@inertiajs/react";
import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import {
    Briefcase,
    FileText,
    Clock,
    CheckCircle2,
    ArrowRight,
    Download,
    CalendarDays,
    Building2,
    AlertCircle,
    Eye,
} from "lucide-react";

export default function MyApplications({ applications }) {
    // Separate drafts from submitted applications
    const drafts = applications.filter((app) => app.status === "draft");
    const submitted = applications.filter((app) => app.status !== "draft");

    return (
        <ApplicantLayout>
            <Head title="My Applications" />

            <div className="max-w-5xl mx-auto space-y-8 p-4">
                {/* Page Header */}
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                        My Applications
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Track your application status and resume saved drafts.
                    </p>
                </div>

                {applications.length === 0 ? (
                    <Card className="border-dashed border-2 border-slate-200 bg-slate-50">
                        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="h-16 w-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                                <FileText className="h-8 w-8" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">
                                No Applications Found
                            </h3>
                            <p className="text-slate-500 max-w-sm mb-6">
                                You haven't started any applications yet. Browse
                                the open positions to begin.
                            </p>
                            <Button
                                asChild
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                <Link href={route("dashboard")}>
                                    <Briefcase className="h-4 w-4 mr-2" /> View
                                    Open Positions
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-10">
                        {/* IN PROGRESS / DRAFTS SECTION */}
                        {drafts.length > 0 && (
                            <section>
                                <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                                    <Clock className="h-5 w-5 mr-2 text-amber-500" />{" "}
                                    In Progress ({drafts.length})
                                </h2>
                                <div className="grid gap-4 md:grid-cols-2">
                                    {drafts.map((app) => (
                                        <ApplicationCard
                                            key={app.id}
                                            app={app}
                                            type="draft"
                                        />
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* SUBMITTED SECTION */}
                        {submitted.length > 0 && (
                            <section>
                                <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                                    <CheckCircle2 className="h-5 w-5 mr-2 text-emerald-500" />{" "}
                                    Submitted Applications ({submitted.length})
                                </h2>
                                <div className="grid gap-4 md:grid-cols-2">
                                    {submitted.map((app) => (
                                        <ApplicationCard
                                            key={app.id}
                                            app={app}
                                            type="submitted"
                                        />
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                )}
            </div>
        </ApplicantLayout>
    );
}

// --- Reusable Card Component ---
function ApplicationCard({ app, type }) {
    const isDraft = type === "draft";

    return (
        <Card
            className={`relative overflow-hidden transition-all hover:shadow-md ${isDraft ? "border-amber-200 bg-amber-50/30" : "border-slate-200 bg-white"}`}
        >
            <div
                className={`absolute top-0 left-0 w-1 h-full ${isDraft ? "bg-amber-400" : "bg-emerald-500"}`}
            />

            <CardContent className="p-5 pl-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="space-y-1 pr-4">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                            Ref: {app.advertisement?.reference_number}
                        </span>
                        <h3 className="font-bold text-slate-900 leading-tight">
                            {app.advertisement?.title}
                        </h3>
                    </div>
                    <span
                        className={`px-2.5 py-1 text-xs font-bold uppercase rounded-md border shrink-0 ${
                            isDraft
                                ? "bg-amber-100 text-amber-700 border-amber-200"
                                : "bg-emerald-100 text-emerald-700 border-emerald-200"
                        }`}
                    >
                        {app.status}
                    </span>
                </div>

                <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-slate-600">
                        <Building2 className="h-4 w-4 mr-2 text-slate-400 shrink-0" />
                        <span className="truncate">
                            {app.department || "Department not selected"}
                        </span>
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                        <Briefcase className="h-4 w-4 mr-2 text-slate-400 shrink-0" />
                        <span>{app.grade || "Grade not selected"}</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-500">
                        <CalendarDays className="h-4 w-4 mr-2 text-slate-400 shrink-0" />
                        <span>Last updated: {app.updated_at}</span>
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    {isDraft ? (
                        <>
                            <div className="flex items-center text-xs font-medium text-amber-600 bg-amber-100 px-2 py-1 rounded">
                                <AlertCircle className="h-3 w-3 mr-1" /> Step{" "}
                                {app.current_step} of 11
                            </div>
                            <Button
                                asChild
                                size="sm"
                                className="bg-amber-500 hover:bg-amber-600 text-white"
                            >
                                <Link
                                    href={route(
                                        "applicant.apply",
                                        app.advertisement?.id,
                                    )}
                                >
                                    Resume Application{" "}
                                    <ArrowRight className="h-4 w-4 ml-1.5" />
                                </Link>
                            </Button>
                        </>
                    ) : (
                        <div className="w-full flex items-center justify-between">
                            <span className="text-xs text-slate-500 font-medium">
                                Locked & Under Review
                            </span>
                            <div className="flex gap-2">
                                <Button
                                    asChild
                                    size="sm"
                                    variant="outline"
                                    className="border-slate-300 text-slate-700 hover:bg-slate-50"
                                >
                                    <Link
                                        href={route(
                                            "applicant.applications.show",
                                            app.id,
                                        )}
                                    >
                                        <Eye className="h-4 w-4 mr-1.5 text-indigo-600" />{" "}
                                        View
                                    </Link>
                                </Button>
                                {app.has_pdf && (
                                    <Button
                                        asChild
                                        size="sm"
                                        variant="outline"
                                        className="border-slate-300 text-slate-700 hover:bg-slate-50"
                                    >
                                        <a
                                            href={app.pdf_url}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <Download className="h-4 w-4 mr-1.5 text-blue-600" />{" "}
                                            PDF
                                        </a>
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
