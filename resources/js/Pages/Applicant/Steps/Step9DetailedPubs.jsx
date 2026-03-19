import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";

export default function Step9DetailedPubs({ data, setData, localErrors = {} }) {
    // Grouping under 'detailed_pubs'
    const pubs = data.form_data.detailed_pubs || {};
    const journals = pubs.journals || [];
    const conferences = pubs.conferences || [];

    const updatePubsSection = (section, newValue) => {
        setData("form_data", {
            ...data.form_data,
            detailed_pubs: { ...pubs, [section]: newValue },
        });
    };

    const handleArrayChange = (section, index, field, value) => {
        const currentArray = [...(pubs[section] || [])];
        currentArray[index] = { ...currentArray[index], [field]: value };
        updatePubsSection(section, currentArray);
    };

    const addArrayItem = (section, template) => {
        const currentArray = [...(pubs[section] || [])];
        currentArray.push(template);
        updatePubsSection(section, currentArray);
    };

    const removeArrayItem = (section, index) => {
        const currentArray = [...(pubs[section] || [])];
        currentArray.splice(index, 1);
        updatePubsSection(section, currentArray);
    };

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
                <h3 className="text-2xl font-bold text-slate-900">
                    8. Detailed Publications
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                    Provide an exhaustive list of all your journal and
                    conference publications.
                </p>
            </div>

            {/* 18. Detailed List of Journal Publications */}
            <div className="space-y-4 bg-slate-50 p-5 rounded-xl border border-slate-100">
                <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                    <h4 className="font-bold text-lg text-slate-800">
                        (A) Detailed List of Journal Publications
                    </h4>
                    <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() =>
                            addArrayItem("journals", {
                                authors: "",
                                title: "",
                                journal_name: "",
                                volume: "",
                                issue: "",
                                year: "",
                                pages: "",
                                impact_factor: "",
                                doi: "",
                                status: "",
                            })
                        }
                    >
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Journal
                        Paper
                    </Button>
                </div>

                {journals.map((item, idx) => (
                    <div
                        key={idx}
                        className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 pl-12 bg-white border border-slate-200 rounded-lg relative mt-2 shadow-sm"
                    >
                        <div className="absolute top-4 left-4 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                            {idx + 1}
                        </div>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeArrayItem("journals", idx)}
                            className="absolute top-2 right-2 text-red-500 hover:bg-red-50"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>

                        <div className="space-y-2 md:col-span-2">
                            <Label>Author's Names</Label>
                            <Input
                                value={item.authors || ""}
                                onChange={(e) =>
                                    handleArrayChange(
                                        "journals",
                                        idx,
                                        "authors",
                                        e.target.value,
                                    )
                                }
                            />
                        </div>
                        <div className="space-y-2 md:col-span-4 pr-8">
                            <Label>Paper Title</Label>
                            <Input
                                value={item.title || ""}
                                onChange={(e) =>
                                    handleArrayChange(
                                        "journals",
                                        idx,
                                        "title",
                                        e.target.value,
                                    )
                                }
                            />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <Label>Name of Journal</Label>
                            <Input
                                value={item.journal_name || ""}
                                onChange={(e) =>
                                    handleArrayChange(
                                        "journals",
                                        idx,
                                        "journal_name",
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
                                        "journals",
                                        idx,
                                        "year",
                                        e.target.value,
                                    )
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Volume</Label>
                            <Input
                                value={item.volume || ""}
                                onChange={(e) =>
                                    handleArrayChange(
                                        "journals",
                                        idx,
                                        "volume",
                                        e.target.value,
                                    )
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Issue</Label>
                            <Input
                                value={item.issue || ""}
                                onChange={(e) =>
                                    handleArrayChange(
                                        "journals",
                                        idx,
                                        "issue",
                                        e.target.value,
                                    )
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Page Nos.</Label>
                            <Input
                                value={item.pages || ""}
                                onChange={(e) =>
                                    handleArrayChange(
                                        "journals",
                                        idx,
                                        "pages",
                                        e.target.value,
                                    )
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Impact Factor</Label>
                            <Input
                                value={item.impact_factor || ""}
                                onChange={(e) =>
                                    handleArrayChange(
                                        "journals",
                                        idx,
                                        "impact_factor",
                                        e.target.value,
                                    )
                                }
                            />
                        </div>
                        <div className="space-y-2 md:col-span-3">
                            <Label>DOI</Label>
                            <Input
                                value={item.doi || ""}
                                onChange={(e) =>
                                    handleArrayChange(
                                        "journals",
                                        idx,
                                        "doi",
                                        e.target.value,
                                    )
                                }
                                placeholder="https://doi.org/..."
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label>Status</Label>
                            <Input
                                value={item.status || ""}
                                onChange={(e) =>
                                    handleArrayChange(
                                        "journals",
                                        idx,
                                        "status",
                                        e.target.value,
                                    )
                                }
                                placeholder="Published/Accepted"
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* 19. Detailed List of Conference Publications */}
            <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                    <h4 className="font-bold text-lg text-slate-800">
                        (B) Detailed List of Conference Publications
                    </h4>
                    <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() =>
                            addArrayItem("conferences", {
                                authors: "",
                                title: "",
                                conference_name: "",
                                year: "",
                                pages: "",
                                doi: "",
                            })
                        }
                    >
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Conference
                        Paper
                    </Button>
                </div>

                {conferences.map((item, idx) => (
                    <div
                        key={idx}
                        className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 pl-12 bg-white border border-slate-200 rounded-lg relative mt-2 shadow-sm"
                    >
                        <div className="absolute top-4 left-4 flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                            {idx + 1}
                        </div>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeArrayItem("conferences", idx)}
                            className="absolute top-2 right-2 text-red-500 hover:bg-red-50"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>

                        <div className="space-y-2 md:col-span-2">
                            <Label>Author's Names</Label>
                            <Input
                                value={item.authors || ""}
                                onChange={(e) =>
                                    handleArrayChange(
                                        "conferences",
                                        idx,
                                        "authors",
                                        e.target.value,
                                    )
                                }
                            />
                        </div>
                        <div className="space-y-2 md:col-span-4 pr-8">
                            <Label>Paper Title</Label>
                            <Input
                                value={item.title || ""}
                                onChange={(e) =>
                                    handleArrayChange(
                                        "conferences",
                                        idx,
                                        "title",
                                        e.target.value,
                                    )
                                }
                            />
                        </div>

                        <div className="space-y-2 md:col-span-3">
                            <Label>Name of the Conference</Label>
                            <Input
                                value={item.conference_name || ""}
                                onChange={(e) =>
                                    handleArrayChange(
                                        "conferences",
                                        idx,
                                        "conference_name",
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
                                        "conferences",
                                        idx,
                                        "year",
                                        e.target.value,
                                    )
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Page Nos.</Label>
                            <Input
                                value={item.pages || ""}
                                onChange={(e) =>
                                    handleArrayChange(
                                        "conferences",
                                        idx,
                                        "pages",
                                        e.target.value,
                                    )
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>DOI (If any)</Label>
                            <Input
                                value={item.doi || ""}
                                onChange={(e) =>
                                    handleArrayChange(
                                        "conferences",
                                        idx,
                                        "doi",
                                        e.target.value,
                                    )
                                }
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
