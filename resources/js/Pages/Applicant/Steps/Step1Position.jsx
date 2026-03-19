import { Label } from "@/Components/ui/label";

export default function Step1Position({ data, setData, localErrors = {}, advertisement }) {
    const availableDepartments = Object.keys(advertisement.departments || {});
    const availableGrades = data.department ? (advertisement.departments[data.department] || []) : [];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
                <h3 className="text-xl font-bold text-slate-900">Position Details</h3>
                <p className="text-sm text-slate-500">Select the specific department and grade you are targeting.</p>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                    <Label className="font-bold text-slate-800">Department / School <span className="text-red-500">*</span></Label>
                    <select 
                        value={data.department}
                        onChange={(e) => setData(prev => ({ ...prev, department: e.target.value, grade: '' }))}
                        className={`flex h-11 w-full rounded-md border bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${localErrors.department ? 'border-red-500' : 'border-slate-200'}`}
                    >
                        <option value="" disabled>Select a department...</option>
                        {availableDepartments.map(dept => (
                            <option key={dept} value={dept}>{dept}</option>
                        ))}
                    </select>
                    {localErrors.department && <p className="text-sm text-red-500">{localErrors.department}</p>}
                </div>

                <div className="space-y-2">
                    <Label className="font-bold text-slate-800">Grade / Position <span className="text-red-500">*</span></Label>
                    <select 
                        value={data.grade}
                        onChange={(e) => setData('grade', e.target.value)}
                        disabled={!data.department}
                        className={`flex h-11 w-full rounded-md border bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-slate-50 disabled:text-slate-400 ${localErrors.grade ? 'border-red-500' : 'border-slate-200'}`}
                    >
                        <option value="" disabled>Select position grade...</option>
                        {availableGrades.map(grade => (
                            <option key={grade} value={grade}>{grade}</option>
                        ))}
                    </select>
                    {localErrors.grade && <p className="text-sm text-red-500">{localErrors.grade}</p>}
                    {!data.department && <p className="text-xs text-slate-400">Please select a department first to see available positions.</p>}
                </div>
            </div>
        </div>
    );
}