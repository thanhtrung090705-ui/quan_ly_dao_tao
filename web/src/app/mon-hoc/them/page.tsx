"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function ThemMonHocPage() {
  const router = useRouter();
  const [maMon, setMaMon] = useState("");
  const [tenMon, setTenMon] = useState("");
  const [soTinChi, setSoTinChi] = useState(3);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const { error } = await supabase.from("mon_hoc").insert([
      {
        ma_mon: maMon.trim(),
        ten_mon: tenMon.trim(),
        so_tin_chi: Number(soTinChi),
      },
    ]);

    setSaving(false);

    if (error) {
      alert("Lỗi khi thêm môn học: " + error.message);
      return;
    }

    router.push("/mon-hoc");
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-xl px-6 py-10">
        <Link
          href="/mon-hoc"
          className="text-sm text-teal-700 hover:underline"
        >
          ← Quay lại danh sách
        </Link>
        <h1 className="mt-2 text-2xl font-bold">Thêm môn học mới</h1>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Mã môn học
            </label>
            <input
              type="text"
              placeholder="VD: CNTT501"
              value={maMon}
              onChange={(e) => setMaMon(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-teal-600 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Tên môn học
            </label>
            <input
              type="text"
              placeholder="VD: Phát triển ứng dụng Web"
              value={tenMon}
              onChange={(e) => setTenMon(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-teal-600 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Số tín chỉ
            </label>
            <input
              type="number"
              min={1}
              max={10}
              value={soTinChi}
              onChange={(e) => setSoTinChi(Number(e.target.value))}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-teal-600 focus:outline-none"
              required
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded-md bg-teal-700 px-5 py-2 text-sm font-medium text-white hover:bg-teal-800 disabled:opacity-50"
            >
              {saving ? "Đang lưu..." : "Lưu môn học"}
            </button>
            <Link
              href="/mon-hoc"
              className="rounded-md border border-slate-300 bg-white px-5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Hủy
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}