import { useState } from "react"

interface FormData {
    firstName: string;
    lastName: string;
    contact: string;
    email: string;
    estimate: number;
    spidrPin: string;
}
const BaseForm = () => {
    // Creating state for form
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        contact: '',
        email: '',
        estimate: 0,
        spidrPin: '',
    });

    // Creating state for submission
    const [submitted, setSubmitted] = useState(false);

    // Creating state for show/hide pin
    const [showPin, setShowPin] = useState(false);


    // Form change handler
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        let newValue = value;

        // Handling secret spidrPin format
        if (name === "spidrPin") {
            // Limit input to 16 numbers
            const digitsOnly = value.replace(/\D/g, "").slice(0, 16);
            // Live formatting with '-' every 4 numbers
            newValue = digitsOnly.match(/.{1,4}/g)?.join("-") || "";
        }

        // Handling phone number format
        if (name === "contact") {
            // Limit input to 10 digits numbers
            const digitsOnly = value.replace(/\D/g, "").slice(0, 10);
            // Live formatting to match phone number format
            const match = digitsOnly.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
            if (match) {
                const formatted = [
                    match[1] ? `(${match[1]}` : "",
                    match[2] ? `) ${match[2]}` : "",
                    match[3] ? `-${match[3]}` : "",
                ].join("");
                newValue = formatted;
            }
        }

        setFormData((prev) => ({
            ...prev, 
            [name]: name === "estimate" ? parseFloat(newValue) || 0 : newValue,
        }));
    };

    // Form submition handler
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("Submitted Form Data:", {
            ...formData, estimate: formData.estimate.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
            }),
        });

        // Display submission alert and clear message after timeout
            setSubmitted(true);
            setFormData({
                firstName: "",
                lastName: "",
                contact: "",
                email: "",
                estimate: 0,
                spidrPin: "",
            });

            setTimeout(() => setSubmitted(false), 3000);
    };

  return (
    <div className="relative z-10 bg-black/20 border border-white p-6 rounded-md backdrop-blur-sm">

        {/* Success alert displayed at top of form */}
        {submitted && (
            <p className="text-green-400 text-sm text-center mb-3">
                Form submitted! Data logged to console.
            </p>
        )}

        <form 
            className="w-full max-w-sm  border-white rounded-sm space-y-5" 
            onSubmit={handleSubmit}
        >
            
            <h2 className="text-2xl text-center text-white font-medium">
                Air Fryer Estimate Form
            </h2>

            {/*Form Fields*/}
            <div className="space-y-3">
                {/*Creating Loop for form structure*/}
                {[ 
                    { id: "firstName", label: "First Name" },
                    { id: "lastName", label: "Last Name" },
                    { id: "contact", label: "Phone Number" },
                    { id: "email", label: "Email" },   
                ].map(({ id, label }) => (
                    <div key={id}>
                        <label htmlFor={id} className="block text-xs text-white/80 mb-1">
                            {label}
                        </label>
                        <input 
                            type={id === "email" ? "email" : "text"} 
                            placeholder={`Enter ${label}`}
                            id={id}
                            name={id}
                            value={formData[id as keyof FormData] as string}
                            onChange={handleChange}
                            className="text-sm w-full px-3 py-1.5 bg-transparent border border-white/20 rounded-md text-white placeholder-white/40 focus:outline-none focus:border-cyan-400 transition-colors"
                        />
                    </div>
                ))}
                <div>
                    <label htmlFor="estimate" className="block text-xs text-white/80 mb-1">
                        Air Fryer Cost Estimate in Dollars
                    </label>
                    <input
                        type="number"
                        id="estimate"
                        name="estimate"
                        placeholder="Enter your estimate in dollars"
                        value={formData.estimate}
                        onChange={handleChange}
                        className="w-full px-3 py-1.5 bg-transparent border border-white/20 rounded-md text-white placeholder-white/40 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                </div>
                <div className="relative">
                    <label htmlFor="spidrPin" className="block text-xs text-white/80 mb-1">
                        Very, Very Secret 16-Digit Spidr PIN
                    </label>
                    <input
                        type={showPin ? "text" : "password"}
                        id="spidrPin"
                        name="spidrPin"
                        placeholder="####-####-####-####"
                        value={formData.spidrPin}
                        onChange={handleChange}
                        className="w-full px-3 py-1.5 bg-transparent border border-white/20 rounded-md text-white placeholder-white/40 focus:outline-none focus:border-cyan-400 transition-colors"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPin((prev) => !prev)}
                        className="absolute right-2 bottom-1 -translate-y-1/2 text-white/70 text-xs hover:text-cyan-400"
                    >
                        {showPin ? "Hide" : "Show"}
                    </button>
                </div>
            </div>

            <input
                type="submit"
                value="Submit"
                className="w-full py-2 border border-white text-white bg-transparent hover:border-cyan-400 hover:text-cyan-400 transition-all text-sm font-medium rounded-sm"
            />
        </form>
    </div>
  )
}
  

export default BaseForm