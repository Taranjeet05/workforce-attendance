"use client";

export default function EmailSignIn() {
  const handleSubmit = () => {
    alert(`Login with Google Please `);
  };

  return (
    <form action={handleSubmit} className="flex flex-col gap-7 w-full">
      <input
        type="email"
        name="email"
        placeholder="work@company.com"
        maxLength={320}
        required
        className="p-3 border rounded-lg focus-ring-2 focus:ring-blue-50 outline-none"
      />
      <button
        className="p-3 bg-blue-900 text-white rounded-lg font-bold text-lg"
        type="submit"
      >
        Sign in With Email
      </button>
    </form>
  );
}
