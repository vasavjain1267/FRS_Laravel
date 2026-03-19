import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";

export default function Step6AdditionalInfo({
    data,
    setData,
    localErrors = {},
}) {
    // Grouping all these lists under a new 'additional_info' object in our JSON
    const info = data.form_data.additional_info || {};
    const patents = info.patents || [];
    const books = info.books || [];
    const book_chapters = info.book_chapters || [];
    const societies = info.societies || [];
    const training = info.training || [];

    const updateInfoSection = (section, newValue) => {
        setData("form_data", {
            ...data.form_data,
            additional_info: { ...info, [section]: newValue },
        });
    };

    const handleScholarChange = (value) =>
        updateInfoSection("google_scholar", value);

    const handleArrayChange = (section, index, field, value) => {
        const currentArray = [...(info[section] || [])];
        currentArray[index] = { ...currentArray[index], [field]: value };
        updateInfoSection(section, currentArray);
    };

    const addArrayItem = (section, template) => {
        const currentArray = [...(info[section] || [])];
        currentArray.push(template);
        updateInfoSection(section, currentArray);
    };

    const removeArrayItem = (section, index) => {
        const currentArray = [...(info[section] || [])];
        currentArray.splice(index, 1);
        updateInfoSection(section, currentArray);
    };

    // Reusable row for Books and Book Chapters since they share the exact same fields
    const renderBookRow = (section, item, idx) => (
        <div
            key={idx}
            className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 bg-white border rounded-lg relative mt-2 shadow-sm"
        >
            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeArrayItem(section, idx)}
                className="absolute top-2 right-2 text-red-500 hover:bg-red-50"
            >
                <Trash2 className="h-4 w-4" />
            </Button>
            <div className="space-y-2 md:col-span-2">
                <Label>Author(s)</Label>
                <Input
                    value={item.authors || ""}
                    onChange={(e) =>
                        handleArrayChange(
                            section,
                            idx,
                            "authors",
                            e.target.value,
                        )
                    }
                />
            </div>
            <div className="space-y-2 md:col-span-2 pr-8">
                <Label>Title</Label>
                <Input
                    value={item.title || ""}
                    onChange={(e) =>
                        handleArrayChange(section, idx, "title", e.target.value)
                    }
                />
            </div>
            <div className="space-y-2">
                <Label>Year</Label>
                <Input
                    type="number"
                    value={item.year || ""}
                    onChange={(e) =>
                        handleArrayChange(section, idx, "year", e.target.value)
                    }
                />
            </div>
            <div className="space-y-2 md:col-span-2">
                <Label>ISBN</Label>
                <Input
                    value={item.isbn || ""}
                    onChange={(e) =>
                        handleArrayChange(section, idx, "isbn", e.target.value)
                    }
                />
            </div>
        </div>
    );

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
                <h3 className="text-2xl font-bold text-slate-900">
                    5. Additional Information
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                    Provide details of your patents, books, professional
                    memberships, and training.
                </p>
            </div>

            {/* (A) Patents */}
            <div className="space-y-4 bg-slate-50 p-5 rounded-xl border border-slate-100">
                <div className="flex justify-between items-center border-b pb-2">
                    <h4 className="font-bold text-lg text-slate-800">
                        (A) Patent(s)
                    </h4>
                    <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() =>
                            addArrayItem("patents", {
                                inventors: "",
                                title: "",
                                country: "",
                                number: "",
                                date_filed: "",
                                date_published: "",
                                status: "",
                            })
                        }
                    >
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Patent
                    </Button>
                </div>
                {patents.map((item, idx) => (
                    <div
                        key={idx}
                        className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-white border rounded-lg relative mt-2 shadow-sm"
                    >
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeArrayItem("patents", idx)}
                            className="absolute top-2 right-2 text-red-500 hover:bg-red-50"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                        <div className="space-y-2 md:col-span-2">
                            <Label>Inventor(s)</Label>
                            <Input
                                value={item.inventors || ""}
                                onChange={(e) =>
                                    handleArrayChange(
                                        "patents",
                                        idx,
                                        "inventors",
                                        e.target.value,
                                    )
                                }
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2 pr-8">
                            <Label>Title of Patent</Label>
                            <Input
                                value={item.title || ""}
                                onChange={(e) =>
                                    handleArrayChange(
                                        "patents",
                                        idx,
                                        "title",
                                        e.target.value,
                                    )
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Country</Label>
                            <Input
                                value={item.country || ""}
                                onChange={(e) =>
                                    handleArrayChange(
                                        "patents",
                                        idx,
                                        "country",
                                        e.target.value,
                                    )
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Patent Number</Label>
                            <Input
                                value={item.number || ""}
                                onChange={(e) =>
                                    handleArrayChange(
                                        "patents",
                                        idx,
                                        "number",
                                        e.target.value,
                                    )
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Date of Filing</Label>
                            <Input
                                type="date"
                                value={item.date_filed || ""}
                                onChange={(e) =>
                                    handleArrayChange(
                                        "patents",
                                        idx,
                                        "date_filed",
                                        e.target.value,
                                    )
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Date Published</Label>
                            <Input
                                type="date"
                                value={item.date_published || ""}
                                onChange={(e) =>
                                    handleArrayChange(
                                        "patents",
                                        idx,
                                        "date_published",
                                        e.target.value,
                                    )
                                }
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label>Status (Filed/Published/Granted)</Label>
                            <Input
                                value={item.status || ""}
                                onChange={(e) =>
                                    handleArrayChange(
                                        "patents",
                                        idx,
                                        "status",
                                        e.target.value,
                                    )
                                }
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* (B) Books */}
            <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                    <h4 className="font-bold text-lg text-slate-800">
                        (B) Book(s)
                    </h4>
                    <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() =>
                            addArrayItem("books", {
                                authors: "",
                                title: "",
                                year: "",
                                isbn: "",
                            })
                        }
                    >
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Book
                    </Button>
                </div>
                {books.map((item, idx) => renderBookRow("books", item, idx))}
            </div>

            {/* (C) Book Chapters */}
            <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                    <h4 className="font-bold text-lg text-slate-800">
                        (C) Book Chapter(s)
                    </h4>
                    <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() =>
                            addArrayItem("book_chapters", {
                                authors: "",
                                title: "",
                                year: "",
                                isbn: "",
                            })
                        }
                    >
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Chapter
                    </Button>
                </div>
                {book_chapters.map((item, idx) =>
                    renderBookRow("book_chapters", item, idx),
                )}
            </div>

            {/* 8. Google Scholar */}
            <div className="space-y-4 bg-blue-50 p-5 rounded-xl border border-blue-100">
                <h4 className="font-bold text-lg text-blue-900">
                    Google Scholar Profile
                </h4>
                <div className="space-y-2">
                    <Label className="text-slate-800">URL</Label>
                    <Input
                        type="url"
                        value={info.google_scholar || ""}
                        onChange={(e) => handleScholarChange(e.target.value)}
                        placeholder="https://scholar.google.com/citations?user=..."
                        className="bg-white"
                    />
                </div>
            </div>

            {/* 9. Professional Societies */}
            <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                    <h4 className="font-bold text-lg text-slate-800">
                        Membership of Professional Societies
                    </h4>
                    <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() =>
                            addArrayItem("societies", { name: "", status: "" })
                        }
                    >
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Membership
                    </Button>
                </div>
                {societies.map((item, idx) => (
                    <div
                        key={idx}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white border rounded-lg relative mt-2 shadow-sm"
                    >
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeArrayItem("societies", idx)}
                            className="absolute top-2 right-2 text-red-500 hover:bg-red-50"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                        <div className="space-y-2 pr-8">
                            <Label>Name of the Professional Society</Label>
                            <Input
                                value={item.name || ""}
                                onChange={(e) =>
                                    handleArrayChange(
                                        "societies",
                                        idx,
                                        "name",
                                        e.target.value,
                                    )
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>
                                Membership Status (e.g., Lifetime/Annual)
                            </Label>
                            <Input
                                value={item.status || ""}
                                onChange={(e) =>
                                    handleArrayChange(
                                        "societies",
                                        idx,
                                        "status",
                                        e.target.value,
                                    )
                                }
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* 10. Professional Training */}
            <div className="space-y-4 bg-slate-50 p-5 rounded-xl border border-slate-100">
                <div className="flex justify-between items-center border-b pb-2">
                    <h4 className="font-bold text-lg text-slate-800">
                        Professional Training
                    </h4>
                    <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() =>
                            addArrayItem("training", {
                                type: "",
                                organization: "",
                                year: "",
                                duration: "",
                            })
                        }
                    >
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Training
                    </Button>
                </div>
                {training.map((item, idx) => (
                    <div
                        key={idx}
                        className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-white border rounded-lg relative mt-2 shadow-sm"
                    >
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeArrayItem("training", idx)}
                            className="absolute top-2 right-2 text-red-500 hover:bg-red-50"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                        <div className="space-y-2">
                            <Label>Type of Training Received</Label>
                            <Input
                                value={item.type || ""}
                                onChange={(e) =>
                                    handleArrayChange(
                                        "training",
                                        idx,
                                        "type",
                                        e.target.value,
                                    )
                                }
                            />
                        </div>
                        <div className="space-y-2 pr-8">
                            <Label>Organisation</Label>
                            <Input
                                value={item.organization || ""}
                                onChange={(e) =>
                                    handleArrayChange(
                                        "training",
                                        idx,
                                        "organization",
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
                                        "training",
                                        idx,
                                        "year",
                                        e.target.value,
                                    )
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Duration (Years/Months/Days)</Label>
                            <Input
                                value={item.duration || ""}
                                onChange={(e) =>
                                    handleArrayChange(
                                        "training",
                                        idx,
                                        "duration",
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
