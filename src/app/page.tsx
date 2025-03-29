"use client";

import NavigationButtons from "@/components/NavigationButtons";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <section className="w-full max-w-md">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Welcome to the form application</h2>
          
          <p className="mb-6">
            This form collects information across multiple pages. You will need to fill in:
          </p>
          
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Personal Information</li>
            <li>Address Information</li>
            <li>Credit Card Information</li>
          </ul>
          
          <p className="mb-6">
            You can proceed to the next page only after completing all required fields.
          </p>
          
          <NavigationButtons
            nextUrl="/henkilotiedot"
          />
        </div>
      </section>
    </main>
  );
}
