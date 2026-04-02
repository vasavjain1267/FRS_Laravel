import HodLayout from "@/Layouts/HodLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";

const statusColors = {
    submitted: "bg-blue-100 text-blue-700 border-blue-200",
    shortlisted: "bg-green-100 text-green-700 border-green-200",
    rejected: "bg-red-100 text-red-600 border-red-200",
};

export default function HodApplicationsIndex({
    applications,
    advertisements,
    filters,
}) {
    const [advFilter, setAdvFilter] = useState(filters.advertisement_id || "");
    const [statusFilter, setStatusFilter] = useState(filters.status || "");

    function applyFilters() {
        router.get(
            "/hod/applications",
            {
                advertisement_id: advFilter,
                status: statusFilter,
            },
            { preserveState: true },
        );
    }

    return (
        <HodLayout>
            <Head title="Department Applications" />

            <div className="p-6 space-y-6 max-w-7xl mx-auto">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Review Applications
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Review and shortlist candidates for your department.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-3 bg-white p-4 rounded-xl shadow-sm border border-slate-200 items-center">
                    <div className="flex-1 min-w-[200px]">
                        <select
                            className="w-full border-slate-300 rounded-lg px-3 py-2 pr-8 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                            value={advFilter}
                            onChange={(e) => setAdvFilter(e.target.value)}
                        >
                            <option value="">All Advertisements</option>
                            {advertisements.map((ad) => (
                                <option key={ad.id} value={ad.id}>
                                    {ad.reference_number} — {ad.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="w-48">
                        <select
                            className="w-full border-slate-300 rounded-lg px-3 py-2 pr-8 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="">All Statuses</option>
                            <option value="submitted">
                                Awaiting Review (Submitted)
                            </option>
                            <option value="shortlisted">Shortlisted</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>

                    <button
                        onClick={applyFilters}
                        className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors"
                    >
                        Filter
                    </button>

                    <button
                        onClick={() => {
                            setAdvFilter("");
                            setStatusFilter("");
                            router.get(
                                "/hod/applications",
                                {},
                                { preserveState: true },
                            );
                        }}
                        className="bg-slate-100 text-slate-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-colors"
                    >
                        Clear
                    </button>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-slate-50 text-slate-600 uppercase text-[11px] font-bold tracking-wider border-b border-slate-200">
                                <tr>
                                    <th className="px-5 py-4 text-left">
                                        Applicant Info
                                    </th>
                                    <th className="px-5 py-4 text-left hidden md:table-cell">
                                        Advertisement
                                    </th>
                                    <th className="px-5 py-4 text-left">
                                        Grade / Post
                                    </th>
                                    <th className="px-5 py-4 text-left">
                                        Status
                                    </th>
                                    <th className="px-5 py-4 text-right">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {applications.data.map((app) => (
                                    <tr
                                        key={app.id}
                                        className="hover:bg-slate-50/80 transition-colors"
                                    >
                                        <td className="px-5 py-4">
                                            <p className="font-bold text-slate-900">
                                                {app.user?.name}
                                            </p>
                                            <p className="text-slate-500 text-xs mt-0.5">
                                                {app.user?.email}
                                            </p>
                                        </td>
                                        <td className="px-5 py-4 hidden md:table-cell">
                                            <p className="text-slate-800 font-medium truncate max-w-xs">
                                                {app.advertisement?.title}
                                            </p>
                                            <p className="text-slate-400 text-xs mt-0.5">
                                                Ref:{" "}
                                                {
                                                    app.advertisement
                                                        ?.reference_number
                                                }
                                            </p>
                                        </td>
                                        <td className="px-5 py-4 text-slate-700 font-medium">
                                            {app.grade}
                                        </td>
                                        <td className="px-5 py-4">
                                            <span
                                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${statusColors[app.status]}`}
                                            >
                                                {app.status}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 text-right">
                                            <Link
                                                href={`/hod/applications/${app.id}`}
                                                className="inline-flex items-center justify-center bg-white border border-slate-300 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-slate-50 hover:text-indigo-600 transition-colors shadow-sm"
                                            >
                                                Review
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                {applications.data.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-6 py-12 text-center"
                                        >
                                            <p className="text-slate-400 font-medium">
                                                No applications found matching
                                                your criteria.
                                            </p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                {applications.links.length > 3 && (
                    <div className="flex gap-1.5 justify-end">
                        {applications.links.map((link, i) => (
                            <button
                                key={i}
                                disabled={!link.url}
                                onClick={() => link.url && router.get(link.url)}
                                className={`px-3 py-1.5 rounded-md text-sm border font-medium transition-colors ${
                                    link.active
                                        ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                                } disabled:opacity-40 disabled:hover:bg-white`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </HodLayout>
    );
}
