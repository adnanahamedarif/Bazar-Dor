"use client";

export type SortValue = "default" | "price-asc" | "price-desc";

export default function SortDropdown({
  value,
  onChange,
}: {
  value: SortValue;
  onChange: (v: SortValue) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as SortValue)}
      className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-green-600"
    >
      <option value="default">ডিফল্ট</option>
      <option value="price-asc">দাম: কম থেকে বেশি</option>
      <option value="price-desc">দাম: বেশি থেকে কম</option>
    </select>
  );
}