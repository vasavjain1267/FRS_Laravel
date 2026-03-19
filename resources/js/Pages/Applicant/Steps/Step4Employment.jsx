import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";

export default function Step4Employment({ data, setData, localErrors = {} }) {
    
    const emp = data.form_data.employment || {};
    const present = emp.present || { position: '', organization: '', date_joining: '', date_leaving: 'Continuing', duration: '' };
    const history = emp.history || [];
    const teaching = emp.teaching || [];
    const research = emp.research || [];
    const industrial = emp.industrial || [];

    const updateEmpSection = (section, newValue) => setData('form_data', { ...data.form_data, employment: { ...emp, [section]: newValue } });
    const handlePresentChange = (field, value) => updateEmpSection('present', { ...present, [field]: value });
    const handleArrayChange = (section, index, field, value) => {
        const arr = [...(emp[section] || [])]; arr[index] = { ...arr[index], [field]: value }; updateEmpSection(section, arr);
    };
    const addArrayItem = (section, template) => updateEmpSection(section, [...(emp[section] || []), template]);
    const removeArrayItem = (section, index) => {
        const arr = [...(emp[section] || [])]; arr.splice(index, 1); updateEmpSection(section, arr);
    };

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
                <h3 className="text-2xl font-bold text-slate-900">3. Employment Details</h3>
                <p className="text-sm text-slate-500 mt-1">Provide your employment history, separating teaching, research, and industry experience.</p>
            </div>

            <div className="space-y-4 bg-slate-50 p-5 rounded-xl border border-slate-100">
                <h4 className="font-bold text-lg text-slate-800">(A) Present Employment</h4>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="space-y-2"><Label>Position</Label><Input value={present.position} onChange={e => handlePresentChange('position', e.target.value)} /></div>
                    <div className="space-y-2"><Label>Organization</Label><Input value={present.organization} onChange={e => handlePresentChange('organization', e.target.value)} /></div>
                    <div className="space-y-2"><Label>Date of Joining</Label><Input type="date" value={present.date_joining} onChange={e => handlePresentChange('date_joining', e.target.value)} /></div>
                    <div className="space-y-2"><Label>Date of Leaving</Label><Input value={present.date_leaving} disabled className="bg-white font-bold text-slate-500" /></div>
                    <div className="space-y-2"><Label>Duration</Label><Input value={present.duration} onChange={e => handlePresentChange('duration', e.target.value)} /></div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                    <h4 className="font-bold text-lg text-slate-800">(B) Employment History</h4>
                    <Button type="button" size="sm" variant="outline" onClick={() => addArrayItem('history', { position: '', organization: '', date_joining: '', date_leaving: '', duration: '' })}><PlusCircle className="mr-2 h-4 w-4"/> Add History</Button>
                </div>
                {history.map((item, idx) => (
                    <div key={idx} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 bg-white border rounded-lg relative mt-2 shadow-sm">
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeArrayItem('history', idx)} className="absolute top-2 right-2 text-red-500"><Trash2 className="h-4 w-4" /></Button>
                        <div className="space-y-2"><Label>Position</Label><Input value={item.position} onChange={e => handleArrayChange('history', idx, 'position', e.target.value)} /></div>
                        <div className="space-y-2"><Label>Organization</Label><Input value={item.organization} onChange={e => handleArrayChange('history', idx, 'organization', e.target.value)} /></div>
                        <div className="space-y-2"><Label>Date of Joining</Label><Input type="date" value={item.date_joining} onChange={e => handleArrayChange('history', idx, 'date_joining', e.target.value)} /></div>
                        <div className="space-y-2"><Label>Date of Leaving</Label><Input type="date" value={item.date_leaving} onChange={e => handleArrayChange('history', idx, 'date_leaving', e.target.value)} /></div>
                        <div className="space-y-2 pr-8"><Label>Duration</Label><Input value={item.duration} onChange={e => handleArrayChange('history', idx, 'duration', e.target.value)} /></div>
                    </div>
                ))}
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                    <h4 className="font-bold text-lg text-slate-800">(C) Teaching Experience</h4>
                    <Button type="button" size="sm" variant="outline" onClick={() => addArrayItem('teaching', { position: '', employer: '', courses: '', level: '', students: '', date_joining: '', date_leaving: '', duration: '' })}><PlusCircle className="mr-2 h-4 w-4"/> Add Teaching</Button>
                </div>
                {teaching.map((item, idx) => (
                    <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-white border rounded-lg relative mt-2 shadow-sm">
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeArrayItem('teaching', idx)} className="absolute top-2 right-2 text-red-500"><Trash2 className="h-4 w-4" /></Button>
                        <div className="space-y-2"><Label>Position</Label><Input value={item.position} onChange={e => handleArrayChange('teaching', idx, 'position', e.target.value)} /></div>
                        <div className="space-y-2"><Label>Employer</Label><Input value={item.employer} onChange={e => handleArrayChange('teaching', idx, 'employer', e.target.value)} /></div>
                        <div className="space-y-2"><Label>Course Taught</Label><Input value={item.courses} onChange={e => handleArrayChange('teaching', idx, 'courses', e.target.value)} /></div>
                        <div className="space-y-2 pr-8"><Label>UG/PG</Label><Input value={item.level} onChange={e => handleArrayChange('teaching', idx, 'level', e.target.value)} /></div>
                        <div className="space-y-2"><Label>No. of Students</Label><Input type="number" value={item.students} onChange={e => handleArrayChange('teaching', idx, 'students', e.target.value)} /></div>
                        <div className="space-y-2"><Label>Date of Joining</Label><Input type="date" value={item.date_joining} onChange={e => handleArrayChange('teaching', idx, 'date_joining', e.target.value)} /></div>
                        <div className="space-y-2"><Label>Date of Leaving</Label><Input type="date" value={item.date_leaving} onChange={e => handleArrayChange('teaching', idx, 'date_leaving', e.target.value)} /></div>
                        <div className="space-y-2"><Label>Duration</Label><Input value={item.duration} onChange={e => handleArrayChange('teaching', idx, 'duration', e.target.value)} /></div>
                    </div>
                ))}
            </div>
            
            <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                    <h4 className="font-bold text-lg text-slate-800">(D) Research Experience</h4>
                    <Button type="button" size="sm" variant="outline" onClick={() => addArrayItem('research', { position: '', institute: '', supervisor: '', date_joining: '', date_leaving: '', duration: '' })}><PlusCircle className="mr-2 h-4 w-4"/> Add Research</Button>
                </div>
                {research.map((item, idx) => (
                    <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white border rounded-lg relative mt-2 shadow-sm">
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeArrayItem('research', idx)} className="absolute top-2 right-2 text-red-500"><Trash2 className="h-4 w-4" /></Button>
                        <div className="space-y-2"><Label>Position</Label><Input value={item.position} onChange={e => handleArrayChange('research', idx, 'position', e.target.value)} /></div>
                        <div className="space-y-2"><Label>Institute</Label><Input value={item.institute} onChange={e => handleArrayChange('research', idx, 'institute', e.target.value)} /></div>
                        <div className="space-y-2 pr-8"><Label>Supervisor</Label><Input value={item.supervisor} onChange={e => handleArrayChange('research', idx, 'supervisor', e.target.value)} /></div>
                    </div>
                ))}
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                    <h4 className="font-bold text-lg text-slate-800">(E) Industrial Experience</h4>
                    <Button type="button" size="sm" variant="outline" onClick={() => addArrayItem('industrial', { organization: '', profile: '', date_joining: '', date_leaving: '', duration: '' })}><PlusCircle className="mr-2 h-4 w-4"/> Add Industry</Button>
                </div>
                {industrial.map((item, idx) => (
                    <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white border rounded-lg relative mt-2 shadow-sm">
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeArrayItem('industrial', idx)} className="absolute top-2 right-2 text-red-500"><Trash2 className="h-4 w-4" /></Button>
                        <div className="space-y-2"><Label>Organization</Label><Input value={item.organization} onChange={e => handleArrayChange('industrial', idx, 'organization', e.target.value)} /></div>
                        <div className="space-y-2"><Label>Work Profile</Label><Input value={item.profile} onChange={e => handleArrayChange('industrial', idx, 'profile', e.target.value)} /></div>
                        <div className="space-y-2 pr-8"><Label>Duration</Label><Input value={item.duration} onChange={e => handleArrayChange('industrial', idx, 'duration', e.target.value)} /></div>
                    </div>
                ))}
            </div>
        </div>
    );
}