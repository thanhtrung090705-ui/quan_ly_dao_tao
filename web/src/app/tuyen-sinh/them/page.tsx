"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function ThemTuyenSinhPage() {
  const router = useRouter();
  const [maHs, setMaHs] = useState("");
  const [hoTen, setHoTen] = useState("");
  const [nganhDangKy, setNganhDangKy] = useState("");
  const [trangThai, setTrangThai] = useState("Chờ duyệt");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from("tuyen_sinh").insert([
      {
        ma_hs: maHs.trim(),
        ho_ten: hoTen.trim(),
        nganh_dang_ky: nganhDangKy.trim(),
        trang_thai: trangThai,
      },
    ]);
    setSaving(false);

    if (error) {
      alert("Lỗi khi thêm: " + error.message);
      return;
    }
    router.push("/tuyen-sinh");
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-xl px-6 py-10">
        <Link href="/tuyen-sinh" className="text-sm text-teal-700 hover:underline">
          ← Quay lại danh sách
        </Link>
        <h1 className="mt-2 text-2xl font-bold">Tiếp nhận hồ sơ tuyển sinh</h1>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div>
            <label className="block text-sm font-medium text-slate-700">Mã hồ sơ</label>
            <input
              type="text"
              placeholder="VD: TS2026-04"
              value={maHs}
              onChange={(e) => setMaHs(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Họ tên thí sinh</label>
            <input
              type="text"
              placeholder="VD: Lê Văn Cường"
              value={hoTen}
              onChange={(e) => setHoTen(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Ngành đăng ký</label>
            <input
              type="text"
              placeholder="VD: Công nghệ thông tin"
              value={nganhDangKy}
              onChange={(e) => setNganhDangKy(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Trạng thái xét tuyển</label>
            <select
              value={trangThai}
              onChange={(e) => setTrangThai(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
            >
              <option value="Chờ duyệt">Chờ duyệt</option>
              <option value="Đang bổ sung hồ sơ">Đang bổ sung hồ sơ</option>
              <option value="Đã trúng tuyển">Đã trúng tuyển</option>
              <option value="Không trúng tuyển">Không trúng tuyển</option>
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded-md bg-teal-700 px-5 py-2 text-sm font-medium text-white hover:bg-teal-800"
            >
              {saving ? "Đang lưu..." : "Lưu hồ sơ"}
            </button>
            <Link
              href="/tuyen-sinh"
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