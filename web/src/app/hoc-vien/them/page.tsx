"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function ThemHocVienPage() {
  const router = useRouter();
  const [maHv, setMaHv] = useState("");
  const [hoTen, setHoTen] = useState("");
  const [lop, setLop] = useState("");
  const [diemTb, setDiemTb] = useState(8.0);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from("hoc_vien").insert([
      {
        ma_hv: maHv.trim(),
        ho_ten: hoTen.trim(),
        lop: lop.trim(),
        diem_tb: Number(diemTb),
      },
    ]);
    setSaving(false);

    if (error) {
      alert("Lỗi khi thêm: " + error.message);
      return;
    }
    router.push("/hoc-vien");
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-xl px-6 py-10">
        <Link href="/hoc-vien" className="text-sm text-teal-700 hover:underline">
          ← Quay lại danh sách
        </Link>
        <h1 className="mt-2 text-2xl font-bold">Thêm học viên mới</h1>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div>
            <label className="block text-sm font-medium text-slate-700">Mã học viên</label>
            <input
              type="text"
              placeholder="VD: HV004"
              value={maHv}
              onChange={(e) => setMaHv(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Họ và tên</label>
            <input
              type="text"
              placeholder="VD: Nguyễn Văn B"
              value={hoTen}
              onChange={(e) => setHoTen(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Lớp</label>
            <input
              type="text"
              placeholder="VD: CNTT-K18A"
              value={lop}
              onChange={(e) => setLop(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Điểm trung bình</label>
            <input
              type="number"
              step="0.1"
              min={0}
              max={10}
              value={diemTb}
              onChange={(e) => setDiemTb(Number(e.target.value))}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              required
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded-md bg-teal-700 px-5 py-2 text-sm font-medium text-white hover:bg-teal-800"
            >
              {saving ? "Đang lưu..." : "Lưu học viên"}
            </button>
            <Link
              href="/hoc-vien"
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