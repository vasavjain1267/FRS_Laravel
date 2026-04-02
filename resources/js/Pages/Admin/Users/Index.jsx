import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';

const roleColors = {
    hod:       'bg-purple-100 text-purple-700',
    applicant: 'bg-gray-100 text-gray-600',
};

export default function UsersIndex({ users }) {
    const [editingUser, setEditingUser] = useState(null);

    const { data, setData, patch, processing, errors, reset } = useForm({
        role: 'applicant',
        department: '',
    });

    function openEditModal(user) {
        setEditingUser(user);
        setData({
            role: user.role,
            department: user.department || '',
        });
    }

    function submitRoleChange(e) {
        e.preventDefault();
        patch(`/admin/users/${editingUser.id}/role`, {
            onSuccess: () => {
                setEditingUser(null);
                reset();
            },
        });
    }

    return (
        <AdminLayout>
            <Head title="Manage Users" />

            <div className="p-6 space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Manage Users</h1>
                    <p className="text-gray-500 text-sm mt-1">Assign roles and departments for users.</p>
                </div>

                <div className="bg-white rounded-xl shadow overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                            <tr>
                                <th className="px-4 py-3 text-left">#</th>
                                <th className="px-4 py-3 text-left">Name</th>
                                <th className="px-4 py-3 text-left">Email</th>
                                <th className="px-4 py-3 text-left">Current Role</th>
                                <th className="px-4 py-3 text-left">Department</th>
                                <th className="px-4 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {users.data.map((user, i) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 text-gray-400">{i + 1}</td>
                                    <td className="px-4 py-3 font-medium text-gray-800">{user.name}</td>
                                    <td className="px-4 py-3 text-gray-500">{user.email}</td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleColors[user.role]}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-gray-600">
                                        {user.department || '-'}
                                    </td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => openEditModal(user)}
                                            className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-xs hover:bg-indigo-700 transition"
                                        >
                                            Edit Role
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {users.data.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex gap-2 justify-end">
                    {users.links.map((link, i) => (
                        <button
                            key={i}
                            disabled={!link.url}
                            onClick={() => link.url && router.get(link.url)}
                            className={`px-3 py-1 rounded text-sm border ${link.active ? 'bg-indigo-600 text-white border-indigo-600' : 'text-gray-600 hover:bg-gray-100'} disabled:opacity-40`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>

            {/* Modal for Editing Role & Department */}
            {editingUser && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
                        <h2 className="text-lg font-bold mb-4 text-gray-800">Edit Role for {editingUser.name}</h2>
                        
                        <form onSubmit={submitRoleChange}>
                            {/* Role Selection */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                <select 
                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                                    value={data.role}
                                    onChange={(e) => {
                                        setData("role", e.target.value);
                                        if (e.target.value === "applicant") {
                                            setData("department", ""); // clear dept if applicant
                                        }
                                    }}
                                >
                                    <option value="applicant">Applicant</option>
                                    <option value="hod">Head of Department (HOD)</option>
                                </select>
                                {errors.role && <span className="text-red-500 text-xs mt-1 block">{errors.role}</span>}
                            </div>

                            {/* Conditional Department Input */}
                            {data.role === "hod" && (
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Assign Department</label>
                                    <input 
                                        type="text"
                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                                        placeholder="e.g., Computer Science and Engineering"
                                        value={data.department}
                                        onChange={(e) => setData("department", e.target.value)}
                                        required={data.role === "hod"}
                                    />
                                    {errors.department && <span className="text-red-500 text-xs mt-1 block">{errors.department}</span>}
                                </div>
                            )}

                            <div className="flex justify-end gap-3 mt-6">
                                <button 
                                    type="button" 
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                                    onClick={() => {
                                        setEditingUser(null);
                                        reset();
                                    }}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition"
                                    disabled={processing}
                                >
                                    {processing ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}