import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";

export default function Step5Research({ data, setData, localErrors = {} }) {
    const res = data.form_data.research || {};

    // 1. Area of Specialization
    const specialization = res.specialization || {
        area_of_specialization: "",
        current_area_of_research: "",
    };

    // 2. Summary of Publications
    const summary = res.summary || {
        intl_journals: "",
        natl_journals: "",
        intl_conferences: "",
        natl_conferences: "",
        patents: "",
        books: "",
        book_chapters: "",
    };

    // 3. Best Publications
    const publications = res.publications || [];

    const updateResSection = (section, newValue) => {
        setData("form_data", {
            ...data.form_data,
            research: { ...res, [section]: newValue },
        });
    };

    const handleSpecChange = (field, value) =>
        updateResSection("specialization", {
            ...specialization,
            [field]: value,
        });
    const handleSummaryChange = (field, value) =>
        updateResSection("summary", { ...summary, [field]: value });
    const handleArrayChange = (section, index, field, value) => {
        const currentArray = [...(res[section] || [])];
        currentArray[index] = { ...currentArray[index], [field]: value };
        updateResSection(section, currentArray);
    };

    const addArrayItem = (section, template) => {
        const currentArray = [...(res[section] || [])];
        currentArray.push(template);
        updateResSection(section, currentArray);
    };

    const removeArrayItem = (section, index) => {
        const currentArray = [...(res[section] || [])];
        currentArray.splice(index, 1);
        updateResSection(section, currentArray);
    };

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
                <h3 className="text-2xl font-bold text-slate-900">
                    4. Research & Publications
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                    Provide your areas of expertise, a summary of your output,
                    and your top publications.
                </p>
            </div>

            {/* --- (A) Area of Specialization --- */}
            <div className="space-y-4 bg-slate-50 p-5 rounded-xl border border-slate-100">
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2">
                    Area(s) of Specialization and Research
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label>
                            Area(s) of Specialization{" "}
                            <span className="text-red-500">*</span>
                        </Label>
                        <textarea
                            value={specialization.area_of_specialization || ""}
                            onChange={(e) =>
                                handleSpecChange(
                                    "area_of_specialization",
                                    e.target.value,
                                )
                            }
                            className={`flex w-full rounded-md border bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 min-h-[100px] ${localErrors["spec.area"] ? "border-red-500" : "border-slate-200"}`}
                            placeholder="e.g. VEGETATION REMOTE SENSING, EARTH OBSERVATION..."
                        />
                        {localErrors["spec.area"] && (
                            <p className="text-xs text-red-500">
                                {localErrors["spec.area"]}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label>
                            Current Area(s) of Research{" "}
                            <span className="text-red-500">*</span>
                        </Label>
                        <textarea
                            value={
                                specialization.current_area_of_research || ""
                            }
                            onChange={(e) =>
                                handleSpecChange(
                                    "current_area_of_research",
                                    e.target.value,
                                )
                            }
                            className={`flex w-full rounded-md border bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 min-h-[100px] ${localErrors["spec.current"] ? "border-red-500" : "border-slate-200"}`}
                            placeholder="e.g. 1. BIOPHYSICAL PARAMETER ESTIMATION..."
                        />
                        {localErrors["spec.current"] && (
                            <p className="text-xs text-red-500">
                                {localErrors["spec.current"]}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* --- (B) Summary of Publications --- */}
            <div className="space-y-4">
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2">
                    Summary of Publications
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
                    <div className="space-y-2">
                        <Label>Intl. Journal Papers</Label>
                        <Input
                            type="number"
                            value={summary.intl_journals || ""}
                            onChange={(e) =>
                                handleSummaryChange(
                                    "intl_journals",
                                    e.target.value,
                                )
                            }
                            placeholder="0"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>National Journal Papers</Label>
                        <Input
                            type="number"
                            value={summary.natl_journals || ""}
                            onChange={(e) =>
                                handleSummaryChange(
                                    "natl_journals",
                                    e.target.value,
                                )
                            }
                            placeholder="0"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Intl. Conference Papers</Label>
                        <Input
                            type="number"
                            value={summary.intl_conferences || ""}
                            onChange={(e) =>
                                handleSummaryChange(
                                    "intl_conferences",
                                    e.target.value,
                                )
                            }
                            placeholder="0"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Natl. Conference Papers</Label>
                        <Input
                            type="number"
                            value={summary.natl_conferences || ""}
                            onChange={(e) =>
                                handleSummaryChange(
                                    "natl_conferences",
                                    e.target.value,
                                )
                            }
                            placeholder="0"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Number of Patent(s)</Label>
                        <Input
                            type="number"
                            value={summary.patents || ""}
                            onChange={(e) =>
                                handleSummaryChange("patents", e.target.value)
                            }
                            placeholder="0"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Number of Book(s)</Label>
                        <Input
                            type="number"
                            value={summary.books || ""}
                            onChange={(e) =>
                                handleSummaryChange("books", e.target.value)
                            }
                            placeholder="0"
                        />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <Label>Number of Book Chapter(s)</Label>
                        <Input
                            type="number"
                            value={summary.book_chapters || ""}
                            onChange={(e) =>
                                handleSummaryChange(
                                    "book_chapters",
                                    e.target.value,
                                )
                            }
                            placeholder="0"
                        />
                    </div>
                </div>
            </div>

            {/* --- (C) Best Publications List --- */}
            <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                    <h4 className="font-bold text-lg text-slate-800">
                        List of Best Research Publications (Max 10)
                    </h4>
                    <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() =>
                            addArrayItem("publications", {
                                title: "",
                                authors: "",
                                journal: "",
                                year: "",
                                vol_page: "",
                                impact_factor: "",
                                doi: "",
                                status: "",
                            })
                        }
                        disabled={publications.length >= 10}
                    >
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Publication
                    </Button>
                </div>
                {publications.map((item, idx) => (
                    <div
                        key={idx}
                        className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 bg-white border rounded-lg relative mt-2 shadow-sm"
                    >
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeArrayItem("publications", idx)}
                            className="absolute top-2 right-2 text-red-500 hover:bg-red-50"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                        <div className="space-y-2 md:col-span-2">
                            <Label>Title</Label>
                            <Input
                                value={item.title || ""}
                                onChange={(e) =>
                                    handleArrayChange(
                                        "publications",
                                        idx,
                                        "title",
                                        e.target.value,
                                    )
                                }
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label>Author(s)</Label>
                            <Input
                                value={item.authors || ""}
                                onChange={(e) =>
                                    handleArrayChange(
                                        "publications",
                                        idx,
                                        "authors",
                                        e.target.value,
                                    )
                                }
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2 pr-8">
                            <Label>Name of Journal/Conf.</Label>
                            <Input
                                value={item.journal || ""}
                                onChange={(e) =>
                                    handleArrayChange(
                                        "publications",
                                        idx,
                                        "journal",
                                        e.target.value,
                                    )
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Year</Label>
                            <Input
                                type="number"
                                value={item.year || ""}
                                onChange={(e) =>
                                    handleArrayChange(
                                        "publications",
                                        idx,
                                        "year",
                                        e.target.value,
                                    )
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Vol. & Page</Label>
                            <Input
                                value={item.vol_page || ""}
                                onChange={(e) =>
                                    handleArrayChange(
                                        "publications",
                                        idx,
                                        "vol_page",
                                        e.target.value,
                                    )
                                }
                                placeholder="e.g. Vol 4, Pg 12-15"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Impact Factor</Label>
                            <Input
                                value={item.impact_factor || ""}
                                onChange={(e) =>
                                    handleArrayChange(
                                        "publications",
                                        idx,
                                        "impact_factor",
                                        e.target.value,
                                    )
                                }
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label>DOI / URL</Label>
                            <Input
                                value={item.doi || ""}
                                onChange={(e) =>
                                    handleArrayChange(
                                        "publications",
                                        idx,
                                        "doi",
                                        e.target.value,
                                    )
                                }
                                placeholder="https://doi.org/..."
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Status</Label>
                            <Input
                                value={item.status || ""}
                                onChange={(e) =>
                                    handleArrayChange(
                                        "publications",
                                        idx,
                                        "status",
                                        e.target.value,
                                    )
                                }
                                placeholder="e.g. Published, Accepted"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
