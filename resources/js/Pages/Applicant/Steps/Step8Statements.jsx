import { Label } from "@/Components/ui/label";

export default function Step8Statements({ data, setData, localErrors = {} }) {
    // Grouping these under a new 'statements' object in our JSON
    const statements = data.form_data.statements || {};

    const updateStatement = (field, value) => {
        setData("form_data", {
            ...data.form_data,
            statements: { ...statements, [field]: value },
        });
    };

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
                {/* Main Header continuously numbered */}
                <h3 className="text-2xl font-bold text-slate-900">
                    7. Contributions & Future Plans
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                    Provide detailed statements regarding your research,
                    teaching, and professional service.
                </p>
            </div>

            {/* (A) Research Contribution & Plans */}
            <div className="space-y-4 bg-slate-50 p-6 rounded-xl border border-slate-100">
                <div className="space-y-2">
                    <Label className="text-lg font-bold text-slate-800">
                        (A) Significant research contribution and future plans{" "}
                        <span className="text-red-500">*</span>
                    </Label>
                    <p className="text-xs text-slate-500 mb-2">
                        Outline your core research interests, methodologies,
                        past achievements, and specific goals for your tenure at
                        IIT Indore.
                    </p>
                    <textarea
                        value={statements.research_plan || ""}
                        onChange={(e) =>
                            updateStatement("research_plan", e.target.value)
                        }
                        className={`flex w-full rounded-md border bg-white px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 min-h-[300px] leading-relaxed ${localErrors["statements.research_plan"] ? "border-red-500" : "border-slate-200"}`}
                        placeholder="My primary research interests focus on understanding the dynamics of..."
                    />
                    {localErrors["statements.research_plan"] && (
                        <p className="text-sm font-bold text-red-500">
                            {localErrors["statements.research_plan"]}
                        </p>
                    )}
                </div>
            </div>

            {/* (B) Teaching Contribution & Plans */}
            <div className="space-y-4 bg-slate-50 p-6 rounded-xl border border-slate-100">
                <div className="space-y-2">
                    <Label className="text-lg font-bold text-slate-800">
                        (B) Significant teaching contribution and future plans{" "}
                        <span className="text-red-500">*</span>
                    </Label>
                    <p className="text-xs text-slate-500 mb-2">
                        Detail your teaching philosophy, proposed UG/PG courses,
                        and pedagogical approach.
                    </p>
                    <textarea
                        value={statements.teaching_plan || ""}
                        onChange={(e) =>
                            updateStatement("teaching_plan", e.target.value)
                        }
                        className={`flex w-full rounded-md border bg-white px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 min-h-[300px] leading-relaxed ${localErrors["statements.teaching_plan"] ? "border-red-500" : "border-slate-200"}`}
                        placeholder="With my academic background in..."
                    />
                    {localErrors["statements.teaching_plan"] && (
                        <p className="text-sm font-bold text-red-500">
                            {localErrors["statements.teaching_plan"]}
                        </p>
                    )}
                </div>
            </div>

            {/* (C) Professional Service */}
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label className="text-lg font-bold text-slate-800">
                        (C) Professional Service as Reviewer/Editor etc.
                    </Label>
                    <p className="text-xs text-slate-500 mb-2">
                        List journals you review for, editorial board
                        memberships, or conference committees.
                    </p>
                    <textarea
                        value={statements.professional_service || ""}
                        onChange={(e) =>
                            updateStatement(
                                "professional_service",
                                e.target.value,
                            )
                        }
                        className="flex w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 min-h-[150px] leading-relaxed"
                        placeholder="1. Reviewer for Advances in Space Research (Elsevier)&#10;2. ..."
                    />
                </div>
            </div>

            {/* (D) Any other relevant information */}
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label className="text-lg font-bold text-slate-800">
                        (D) Any other relevant information
                    </Label>
                    <p className="text-xs text-slate-500 mb-2">
                        Provide any additional context or achievements not
                        covered in previous sections.
                    </p>
                    <textarea
                        value={statements.other_info || ""}
                        onChange={(e) =>
                            updateStatement("other_info", e.target.value)
                        }
                        className="flex w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 min-h-[150px] leading-relaxed"
                    />
                </div>
            </div>
        </div>
    );
}
