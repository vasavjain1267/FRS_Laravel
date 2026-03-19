import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import Checkbox from "@/Components/Checkbox";
import { AlertCircle, UploadCloud } from "lucide-react";

export default function Step11Documents({ data, setData, localErrors = {} }) {
    // We store files in a separate object so they don't break the JSON draft saving
    const docs = data.documents || {};
    const declaration = data.form_data.declaration || false;

    const handleFileChange = (field, file) => {
        setData("documents", { ...docs, [field]: file });
    };

    const handleDeclaration = (checked) => {
        setData("form_data", { ...data.form_data, declaration: checked });
    };

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
                <h3 className="text-2xl font-bold text-slate-900">
                    10. Documents & Submit
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                    Upload your best papers, supporting certificates, and agree
                    to the final declaration.
                </p>
            </div>

            {/* 20. Best Papers Upload */}
            <div className="space-y-4 bg-slate-50 p-6 rounded-xl border border-slate-100">
                <h4 className="font-bold text-lg text-slate-800 border-b pb-2">
                    (A) Reprints of at most 5 Best Research Papers
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2, 3, 4, 5].map((num) => (
                        <div key={num} className="space-y-2">
                            <Label>Best Paper {num} (PDF)</Label>
                            <Input
                                type="file"
                                accept=".pdf"
                                onChange={(e) =>
                                    handleFileChange(
                                        `best_paper_${num}`,
                                        e.target.files[0],
                                    )
                                }
                                className="bg-white file:bg-blue-50 file:text-blue-700 file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-3 cursor-pointer"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* 21. Document Checklist */}
            <div className="space-y-4 bg-slate-50 p-6 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 border-b pb-2">
                    <UploadCloud className="h-5 w-5 text-blue-600" />
                    <h4 className="font-bold text-lg text-slate-800">
                        (B) Check List of the documents attached
                    </h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label>
                            1. PHD Certificate{" "}
                            <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            type="file"
                            accept=".pdf"
                            onChange={(e) =>
                                handleFileChange("phd_cert", e.target.files[0])
                            }
                            className="bg-white file:bg-blue-50 file:text-blue-700 file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-3 cursor-pointer"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>2. PG Certificate</Label>
                        <Input
                            type="file"
                            accept=".pdf"
                            onChange={(e) =>
                                handleFileChange("pg_cert", e.target.files[0])
                            }
                            className="bg-white file:bg-blue-50 file:text-blue-700 file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-3 cursor-pointer"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>3. UG Certificate</Label>
                        <Input
                            type="file"
                            accept=".pdf"
                            onChange={(e) =>
                                handleFileChange("ug_cert", e.target.files[0])
                            }
                            className="bg-white file:bg-blue-50 file:text-blue-700 file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-3 cursor-pointer"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>4. 12th/HSC/Diploma</Label>
                        <Input
                            type="file"
                            accept=".pdf"
                            onChange={(e) =>
                                handleFileChange("hsc_cert", e.target.files[0])
                            }
                            className="bg-white file:bg-blue-50 file:text-blue-700 file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-3 cursor-pointer"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>
                            5. 10th/SSC Certificate{" "}
                            <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            type="file"
                            accept=".pdf"
                            onChange={(e) =>
                                handleFileChange("ssc_cert", e.target.files[0])
                            }
                            className="bg-white file:bg-blue-50 file:text-blue-700 file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-3 cursor-pointer"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>6. Latest Payslip</Label>
                        <Input
                            type="file"
                            accept=".pdf"
                            onChange={(e) =>
                                handleFileChange("payslip", e.target.files[0])
                            }
                            className="bg-white file:bg-blue-50 file:text-blue-700 file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-3 cursor-pointer"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>7. Undertaking/NOC</Label>
                        <Input
                            type="file"
                            accept=".pdf"
                            onChange={(e) =>
                                handleFileChange("noc", e.target.files[0])
                            }
                            className="bg-white file:bg-blue-50 file:text-blue-700 file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-3 cursor-pointer"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>8. Post PhD Experience Certificate</Label>
                        <Input
                            type="file"
                            accept=".pdf"
                            onChange={(e) =>
                                handleFileChange(
                                    "post_phd_exp",
                                    e.target.files[0],
                                )
                            }
                            className="bg-white file:bg-blue-50 file:text-blue-700 file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-3 cursor-pointer"
                        />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <Label>
                            9. Any other relevant documents (Merged PDF)
                        </Label>
                        <Input
                            type="file"
                            accept=".pdf"
                            onChange={(e) =>
                                handleFileChange(
                                    "other_docs",
                                    e.target.files[0],
                                )
                            }
                            className="bg-white file:bg-blue-50 file:text-blue-700 file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-3 cursor-pointer"
                        />
                    </div>
                </div>
            </div>
            {/* 23. Final Declaration */}
            <div className="space-y-4 bg-emerald-50 p-6 rounded-xl border border-emerald-200">
                <h4 className="font-bold text-lg text-emerald-900">
                    23. Final Declaration
                </h4>
                <div className="flex items-start space-x-3 pt-2">
                    <Checkbox
                        id="declaration"
                        name="declaration"
                        checked={declaration}
                        onChange={(e) => handleDeclaration(e.target.checked)}
                        className={`mt-1 h-5 w-5 ${localErrors.declaration ? "border-red-500 ring-2 ring-red-200" : ""}`}
                    />
                    <div className="space-y-1">
                        <Label
                            htmlFor="declaration"
                            className="text-sm font-semibold text-slate-800 leading-relaxed cursor-pointer"
                        >
                            I hereby declare that I have carefully read and
                            understood the instructions and particulars
                            mentioned in the advertisement and this application
                            form. I further declare that all the entries along
                            with the attachments uploaded in this form are true
                            to the best of my knowledge and belief.{" "}
                            <span className="text-red-500">*</span>
                        </Label>
                        {localErrors.declaration && (
                            <p className="text-sm font-bold text-red-600 flex items-center mt-2">
                                <AlertCircle className="h-4 w-4 mr-1" />{" "}
                                {localErrors.declaration}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
