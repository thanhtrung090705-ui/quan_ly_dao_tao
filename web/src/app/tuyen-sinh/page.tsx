"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface HoSoTuyenSinh {
  id: number;
  ma_hs: string;
  ho_ten: string;
  nganh_dang_ky: string;
  trang_thai: string;
}

export default function DanhSachTuyenSinhPage() {
  const [danhSach, setDanhSach] = useState<HoSoTuyenSinh[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("tuyen_sinh")
      .select("*")
      .order("id", { ascending: true });
    if (!error && data) setDanhSach(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Bạn có chắc muốn xóa hồ sơ tuyển sinh này?")) return;
    const { error } = await supabase.from("tuyen_sinh").delete().eq("id", id);
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
            <h1 className="mt-2 text-2xl font-bold">Quản lý Tuyển sinh</h1>
          </div>
          <Link
            href="/tuyen-sinh/them"
            className="rounded-md bg-teal-700 px-4 py-2 text-sm font-medium text-white hover:bg-teal-800"
          >
            + Tiếp nhận hồ sơ
          </Link>
        </div>

        <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white">
          {loading ? (
            <p className="p-6 text-center text-sm text-slate-500">Đang tải dữ liệu...</p>
          ) : danhSach.length === 0 ? (
            <p className="p-6 text-center text-sm text-slate-500">Chưa có hồ sơ nào.</p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-medium">Mã hồ sơ</th>
                  <th className="px-4 py-3 font-medium">Họ tên thí sinh</th>
                  <th className="px-4 py-3 font-medium">Ngành đăng ký</th>
                  <th className="px-4 py-3 font-medium">Trạng thái</th>
                  <th className="px-4 py-3 text-right font-medium">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {danhSach.map((hs) => (
                  <tr key={hs.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-mono text-xs font-semibold text-teal-700">
                      {hs.ma_hs}
                    </td>
                    <td className="px-4 py-3 font-medium">{hs.ho_ten}</td>
                    <td className="px-4 py-3 text-slate-600">{hs.nganh_dang_ky}</td>
                    <td className="px-4 py-3">
                      <span className="rounded bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                        {hs.trang_thai}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/tuyen-sinh/${hs.id}/sua`}
                        className="mr-4 font-medium text-teal-700 hover:underline"
                      >
                        Sửa
                      </Link>
                      <button
                        onClick={() => handleDelete(hs.id)}
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