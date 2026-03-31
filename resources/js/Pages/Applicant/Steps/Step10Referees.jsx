import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";

export default function Step10Referees({ data, setData, localErrors = {} }) {
    // Grouping under 'referees_section'
    const section = data.form_data.referees_section || {};
    // Pre-populate with 3 empty referees since 3 are usually mandatory
    const referees = section.referees || [
        {
            name: "",
            position: "",
            association: "",
            institute: "",
            email: "",
            contact_code: "+91",
            contact_number: "",
        },
        {
            name: "",
            position: "",
            association: "",
            institute: "",
            email: "",
            contact_code: "+91",
            contact_number: "",
        },
        {
            name: "",
            position: "",
            association: "",
            institute: "",
            email: "",
            contact_code: "+91",
            contact_number: "",
        },
    ];

    const updateReferees = (newReferees) => {
        setData("form_data", {
            ...data.form_data,
            referees_section: { ...section, referees: newReferees },
        });
    };

    const handleArrayChange = (index, field, value) => {
        const currentArray = [...referees];
        currentArray[index] = { ...currentArray[index], [field]: value };
        updateReferees(currentArray);
    };

    const addReferee = () => {
        updateReferees([
            ...referees,
            {
                name: "",
                position: "",
                association: "",
                institute: "",
                email: "",
                contact: "",
            },
        ]);
    };

    const removeReferee = (index) => {
        const currentArray = [...referees];
        currentArray.splice(index, 1);
        updateReferees(currentArray);
    };

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
                <h3 className="text-2xl font-bold text-slate-900">
                    9. Referees
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                    Provide details of at least 3 referees who are familiar with
                    your academic and professional work.
                </p>
            </div>

            <div className="space-y-4 bg-slate-50 p-6 rounded-xl border border-slate-100">
                <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                    <h4 className="font-bold text-lg text-slate-800">
                        (A) Details of Referees{" "}
                        <span className="text-red-500">*</span>
                    </h4>
                    <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={addReferee}
                    >
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Referee
                    </Button>
                </div>

                {localErrors.referees && (
                    <div className="p-3 bg-red-50 text-red-700 text-sm font-bold rounded-lg border border-red-200">
                        {localErrors.referees}
                    </div>
                )}

                {referees.map((item, idx) => (
                    <div
                        key={idx}
                        className="grid grid-cols-1 md:grid-cols-6 gap-4 p-5 pl-12 bg-white border border-slate-200 rounded-lg relative mt-4 shadow-sm"
                    >
                        <div className="absolute top-5 left-4 flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-white">
                            {idx + 1}
                        </div>
                        {referees.length > 3 && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeReferee(idx)}
                                className="absolute top-2 right-2 text-red-500 hover:bg-red-50"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        )}

                        <div className="space-y-2 md:col-span-2">
                            <Label>
                                Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                value={item.name || ""}
                                onChange={(e) =>
                                    handleArrayChange(
                                        idx,
                                        "name",
                                        e.target.value,
                                    )
                                }
                                className={
                                    localErrors[`referee_${idx}_name`]
                                        ? "border-red-500"
                                        : ""
                                }
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2 pr-8">
                            <Label>
                                Position <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                value={item.position || ""}
                                onChange={(e) =>
                                    handleArrayChange(
                                        idx,
                                        "position",
                                        e.target.value,
                                    )
                                }
                                placeholder="e.g. Professor"
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label>
                                Association{" "}
                                <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                value={item.association || ""}
                                onChange={(e) =>
                                    handleArrayChange(
                                        idx,
                                        "association",
                                        e.target.value,
                                    )
                                }
                                placeholder="e.g. Thesis Supervisor"
                            />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <Label>
                                Institute/Organization{" "}
                                <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                value={item.institute || ""}
                                onChange={(e) =>
                                    handleArrayChange(
                                        idx,
                                        "institute",
                                        e.target.value,
                                    )
                                }
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2 pr-8">
                            <Label>
                                E-mail <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="email"
                                value={item.email || ""}
                                onChange={(e) =>
                                    handleArrayChange(
                                        idx,
                                        "email",
                                        e.target.value,
                                    )
                                }
                                className={
                                    localErrors[`referee_${idx}_email`]
                                        ? "border-red-500"
                                        : ""
                                }
                            />
                            {localErrors[`referee_${idx}_email`] && (
                                <p className="text-xs text-red-500">
                                    {localErrors[`referee_${idx}_email`]}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label>Contact No.</Label>

                            <div className="flex gap-2">
                                {/* Country Code */}
                                <Input
                                    type="text"
                                    value={item.contact_code || "+91"}
                                    onChange={(e) =>
                                        handleArrayChange(
                                            idx,
                                            "contact_code",
                                            e.target.value.replace(
                                                /[^\d+]/g,
                                                "",
                                            ),
                                        )
                                    }
                                    className="w-20 text-center px-1 bg-slate-50"
                                    maxLength={5}
                                />

                                {/* Phone Number */}
                                <Input
                                    type="tel"
                                    value={item.contact_number || ""}
                                    onChange={(e) =>
                                        handleArrayChange(
                                            idx,
                                            "contact_number",
                                            e.target.value.replace(/\D/g, ""),
                                        )
                                    }
                                    className={`flex-1 ${
                                        localErrors[`referee_${idx}_contact`]
                                            ? "border-red-500"
                                            : ""
                                    }`}
                                    maxLength={10}
                                />
                            </div>

                            {localErrors[`referee_${idx}_contact`] && (
                                <p className="text-xs text-red-500">
                                    {localErrors[`referee_${idx}_contact`]}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
