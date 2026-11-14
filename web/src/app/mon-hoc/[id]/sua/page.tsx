"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

function FormSuaMonHoc() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params?.id);

  const [maMon, setMaMon] = useState("");
  const [tenMon, setTenMon] = useState("");
  const [soTinChi, setSoTinChi] = useState(3);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchOne = async () => {
      const { data } = await supabase
        .from("mon_hoc")
        .select("*")
        .eq("id", id)
        .single();

      if (data) {
        setMaMon(data.ma_mon);
        setTenMon(data.ten_mon);
        setSoTinChi(data.so_tin_chi);
      }
      setLoading(false);
    };

    if (id) fetchOne();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const { error } = await supabase
      .from("mon_hoc")
      .update({
        ma_mon: maMon.trim(),
        ten_mon: tenMon.trim(),
        so_tin_chi: Number(soTinChi),
      })
      .eq("id", id);

    setSaving(false);

    if (error) {
      alert("Lỗi khi cập nhật: " + error.message);
      return;
    }

    router.push("/mon-hoc");
    router.refresh();
  };

  if (loading) return <p className="p-10 text-center text-sm">Đang tải...</p>;

  return (
    <div className="mx-auto max-w-xl px-6 py-10">
      <Link href="/mon-hoc" className="text-sm text-teal-700 hover:underline">
        ← Quay lại danh sách
      </Link>
      <h1 className="mt-2 text-2xl font-bold">Cập nhật môn học</h1>

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div>
          <label className="block text-sm font-medium text-slate-700">Mã môn học</label>
          <input
            type="text"
            value={maMon}
            onChange={(e) => setMaMon(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Tên môn học</label>
          <input
            type="text"
            value={tenMon}
            onChange={(e) => setTenMon(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Số tín chỉ</label>
          <input
            type="number"
            min={1}
            max={10}
            value={soTinChi}
            onChange={(e) => setSoTinChi(Number(e.target.value))}
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
            href="/mon-hoc"
            className="rounded-md border border-slate-300 bg-white px-5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Hủy
          </Link>
        </div>
      </form>
    </div>
  );
}

export default function SuaMonHocPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Suspense fallback={<p className="p-10 text-center text-sm">Đang tải trang...</p>}>
        <FormSuaMonHoc />
      </Suspense>
    </main>
  );
}