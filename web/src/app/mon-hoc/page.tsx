"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface MonHoc {
  id: number;
  ma_mon: string;
  ten_mon: string;
  so_tin_chi: number;
}

export default function DanhSachMonHocPage() {
  const [danhSach, setDanhSach] = useState<MonHoc[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMonHoc = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("mon_hoc")
      .select("*")
      .order("id", { ascending: true });

    if (!error && data) {
      setDanhSach(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMonHoc();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Bạn có chắc chắn muốn xóa môn học này?")) return;

    const { error } = await supabase.from("mon_hoc").delete().eq("id", id);
    if (error) {
      alert("Lỗi khi xóa: " + error.message);
      return;
    }
    fetchMonHoc();
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex items-center justify-between">
          <div>
            <Link href="/" className="text-sm text-teal-700 hover:underline">
              ← Về trang chủ
            </Link>
            <h1 className="mt-2 text-2xl font-bold">Danh sách môn học</h1>
          </div>
          <Link
            href="/mon-hoc/them"
            className="rounded-md bg-teal-700 px-4 py-2 text-sm font-medium text-white hover:bg-teal-800"
          >
            + Thêm môn học
          </Link>
        </div>

        <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white">
          {loading ? (
            <p className="p-6 text-center text-sm text-slate-500">
              Đang tải dữ liệu...
            </p>
          ) : danhSach.length === 0 ? (
            <p className="p-6 text-center text-sm text-slate-500">
              Chưa có môn học nào.
            </p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-medium">Mã môn</th>
                  <th className="px-4 py-3 font-medium">Tên môn học</th>
                  <th className="px-4 py-3 font-medium">Số tín chỉ</th>
                  <th className="px-4 py-3 text-right font-medium">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {danhSach.map((mon) => (
                  <tr key={mon.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-mono text-xs font-semibold text-teal-700">
                      {mon.ma_mon}
                    </td>
                    <td className="px-4 py-3 font-medium">{mon.ten_mon}</td>
                    <td className="px-4 py-3 text-slate-600">
                      {mon.so_tin_chi}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/mon-hoc/${mon.id}/sua`}
                        className="mr-4 font-medium text-teal-700 hover:underline"
                      >
                        Sửa
                      </Link>
                      <button
                        onClick={() => handleDelete(mon.id)}
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