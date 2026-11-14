"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface HocVien {
  id: number;
  ma_hv: string;
  ho_ten: string;
  lop: string;
  diem_tb: number;
}

export default function DanhSachHocVienPage() {
  const [danhSach, setDanhSach] = useState<HocVien[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("hoc_vien")
      .select("*")
      .order("id", { ascending: true });
    if (!error && data) setDanhSach(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Bạn có chắc muốn xóa học viên này?")) return;
    const { error } = await supabase.from("hoc_vien").delete().eq("id", id);
    if (error) alert("Lỗi: " + error.message);
    else fetchData();
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex items-center justify-between">
          <div>
            <Link href="/" className="text-sm text-teal-700 hover:underline">
              ← Về trang chủ
            </Link>
            <h1 className="mt-2 text-2xl font-bold">Quản lý Học viên</h1>
          </div>
          <Link
            href="/hoc-vien/them"
            className="rounded-md bg-teal-700 px-4 py-2 text-sm font-medium text-white hover:bg-teal-800"
          >
            + Thêm học viên
          </Link>
        </div>

        <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white">
          {loading ? (
            <p className="p-6 text-center text-sm text-slate-500">Đang tải dữ liệu...</p>
          ) : danhSach.length === 0 ? (
            <p className="p-6 text-center text-sm text-slate-500">Chưa có học viên nào.</p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-medium">Mã HV</th>
                  <th className="px-4 py-3 font-medium">Họ và tên</th>
                  <th className="px-4 py-3 font-medium">Lớp</th>
                  <th className="px-4 py-3 font-medium">Điểm TB</th>
                  <th className="px-4 py-3 text-right font-medium">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {danhSach.map((hv) => (
                  <tr key={hv.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-mono text-xs font-semibold text-teal-700">
                      {hv.ma_hv}
                    </td>
                    <td className="px-4 py-3 font-medium">{hv.ho_ten}</td>
                    <td className="px-4 py-3 text-slate-600">{hv.lop}</td>
                    <td className="px-4 py-3 text-slate-600">{hv.diem_tb}</td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/hoc-vien/${hv.id}/sua`}
                        className="mr-4 font-medium text-teal-700 hover:underline"
                      >
                        Sửa
                      </Link>
                      <button
                        onClick={() => handleDelete(hv.id)}
                        className="font-medium text-red-600 hover:underline"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}