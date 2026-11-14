"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

function FormSuaHocVien() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params?.id);

  const [maHv, setMaHv] = useState("");
  const [hoTen, setHoTen] = useState("");
  const [lop, setLop] = useState("");
  const [diemTb, setDiemTb] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchOne = async () => {
      const { data } = await supabase
        .from("hoc_vien")
        .select("*")
        .eq("id", id)
        .single();
      if (data) {
        setMaHv(data.ma_hv);
        setHoTen(data.ho_ten);
        setLop(data.lop);
        setDiemTb(data.diem_tb);
      }
      setLoading(false);
    };
    if (id) fetchOne();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase
      .from("hoc_vien")
      .update({
        ma_hv: maHv.trim(),
        ho_ten: hoTen.trim(),
        lop: lop.trim(),
        diem_tb: Number(diemTb),
      })
      .eq("id", id);
    setSaving(false);

    if (error) {
      alert("Lỗi cập nhật: " + error.message);
      return;
    }
    router.push("/hoc-vien");
    router.refresh();
  };

  if (loading) return <p className="p-10 text-center text-sm">Đang tải...</p>;

  return (
    <div className="mx-auto max-w-xl px-6 py-10">
      <Link href="/hoc-vien" className="text-sm text-teal-700 hover:underline">
        ← Quay lại danh sách
      </Link>
      <h1 className="mt-2 text-2xl font-bold">Cập nhật học viên</h1>

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div>
          <label className="block text-sm font-medium text-slate-700">Mã học viên</label>
          <input
            type="text"
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
            {saving ? "Đang lưu..." : "Lưu thay đổi"}
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
  );
}

export default function SuaHocVienPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Suspense fallback={<p className="p-10 text-center text-sm">Đang tải trang...</p>}>
        <FormSuaHocVien />
      </Suspense>
    </main>
  );
}