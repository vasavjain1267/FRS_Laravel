import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";

const statusColors = {
    submitted: "bg-blue-100 text-blue-700",
    shortlisted: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-600",
    inreview: "bg-gray-100 text-gray-500",
};

export default function ApplicationsIndex({
    applications,
    advertisements,
    departments,
    filters,
}) {
    const [advFilter, setAdvFilter] = useState(filters.advertisement_id || "");
    const [deptFilter, setDeptFilter] = useState(filters.department || "");
    const [statusFilter, setStatusFilter] = useState(filters.status || "");

    function applyFilters() {
        router.get(
            "/admin/applications",
            {
                advertisement_id: advFilter,
                department: deptFilter,
                status: statusFilter,
            },
            { preserveState: true },
        );
    }

    return (
        <AdminLayout>
            <Head title="Applications" />

            <div className="p-6 space-y-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    Applications
                </h1>

                {/* Filters Row */}
                <div className="flex flex-wrap gap-3 bg-white p-4 rounded-xl shadow border border-slate-100">
                    {/* Advertisement Filter */}
                    <select
                        className="border border-slate-300 rounded-lg px-3 py-2 pr-8 text-sm appearance-none bg-white cursor-pointer focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none min-w-[200px]"
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

                    {/* Department Filter - Now a Dynamic Dropdown */}
                    <select
                        className="border border-slate-300 rounded-lg px-3 py-2 pr-8 text-sm appearance-none bg-white cursor-pointer focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none min-w-[200px]"
                        value={deptFilter}
                        onChange={(e) => setDeptFilter(e.target.value)}
                    >
                        <option value="">All Departments</option>
                        {departments.map((dept) => (
                            <option key={dept.id} value={dept.name}>
                                {dept.name}
                            </option>
                        ))}
                    </select>

                    {/* Status Filter */}
                    <select
                        className="border border-slate-300 rounded-lg px-3 py-2 pr-8 text-sm appearance-none bg-white cursor-pointer focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">All Statuses</option>
                        <option value="submitted">Submitted</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="rejected">Rejected</option>
                    </select>

                    <div className="flex gap-2 ml-auto">
                        <button
                            onClick={applyFilters}
                            className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 transition"
                        >
                            Apply Filters
                        </button>

                        <button
                            onClick={() => {
                                setAdvFilter("");
                                setDeptFilter("");
                                setStatusFilter("");
                                router.get(
                                    "/admin/applications",
                                    {},
                                    { preserveState: true },
                                );
                            }}
                            className="bg-slate-100 text-slate-600 px-5 py-2 rounded-lg text-sm font-bold hover:bg-slate-200 transition"
                        >
                            Clear
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow overflow-hidden border border-slate-200">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 text-slate-600 uppercase text-[11px] font-black tracking-wider border-b">
                            <tr>
                                <th className="px-5 py-4 text-left w-12">#</th>
                                <th className="px-5 py-4 text-left">
                                    Applicant
                                </th>
                                <th className="px-5 py-4 text-left">
                                    Advertisement
                                </th>
                                <th className="px-5 py-4 text-left">
                                    Department
                                </th>
                                <th className="px-5 py-4 text-left">Grade</th>
                                <th className="px-5 py-4 text-left">Status</th>
                                <th className="px-5 py-4 text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {applications.data.map((app, i) => (
                                <tr
                                    key={app.id}
                                    className="hover:bg-slate-50 transition-colors"
                                >
                                    <td className="px-5 py-4 text-slate-400 font-medium">
                                        {i + 1}
                                    </td>
                                    <td className="px-5 py-4">
                                        <p className="font-bold text-slate-900 leading-tight">
                                            {app.user?.name}
                                        </p>
                                        <p className="text-slate-500 text-xs mt-0.5">
                                            {app.user?.email}
                                        </p>
                                    </td>
                                    <td className="px-5 py-4">
                                        <p
                                            className="text-slate-700 font-medium truncate max-w-xs"
                                            title={app.advertisement?.title}
                                        >
                                            {app.advertisement?.title}
                                        </p>
                                        <p className="text-slate-400 text-[10px] mt-0.5 uppercase tracking-tighter">
                                            Ref:{" "}
                                            {
                                                app.advertisement
                                                    ?.reference_number
                                            }
                                        </p>
                                    </td>
                                    <td className="px-5 py-4 text-slate-600 font-medium">
                                        {app.department}
                                    </td>
                                    <td className="px-5 py-4 text-slate-600 font-medium italic">
                                        {app.grade}
                                    </td>
                                    <td className="px-5 py-4">
                                        <span
                                            className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${statusColors[app.status]}`}
                                        >
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 text-right">
                                        <Link
                                            href={`/admin/applications/${app.id}`}
                                            className="inline-flex items-center justify-center bg-white border border-slate-300 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-50 hover:text-indigo-600 transition shadow-sm"
                                        >
                                            View Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {applications.data.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="px-5 py-16 text-center"
                                    >
                                        <div className="flex flex-col items-center">
                                            <p className="text-slate-400 font-medium">
                                                No applications found matching
                                                your criteria.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {applications.links.length > 3 && (
                    <div className="flex gap-1.5 justify-end">
                        {applications.links.map((link, i) => (
                            <button
                                key={i}
                                disabled={!link.url}
                                onClick={() => link.url && router.get(link.url)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
                                    link.active
                                        ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                                } disabled:opacity-40 disabled:cursor-not-allowed`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
