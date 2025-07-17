import AdminLayout from "@/components/layouts/AdminLayout";

const LaporanPage = () => {
  return (
    <AdminLayout
      textHeader="Laporan"
    >
      {/* Sub-menu: Laporan Pendapatan */}
      <div className="mb-6">
        <h3 className="text-lg font-bold">Laporan Pendapatan</h3>
        <form className="bg-white p-4 shadow rounded-lg">
          <div className="mb-4">
            <label className="block mb-1">Rentang Tanggal</label>
            <div className="flex space-x-2">
              <input
                type="date"
                className="border border-gray-300 rounded-lg p-2 w-1/2"
              />
              <input
                type="date"
                className="border border-gray-300 rounded-lg p-2 w-1/2"
              />
            </div>
          </div>
          <div className="mb-4">
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Tampilkan Laporan
            </button>
          </div>
          <div className="mt-4">
            <h4 className="font-bold">Total Pendapatan: Rp 10,000,000</h4>
            <h4 className="font-bold">Rincian Pembayaran:</h4>
            <ul className="list-disc pl-5">
              <li>Pembayaran 1: Rp 5,000,000</li>
              <li>Pembayaran 2: Rp 3,000,000</li>
              <li>Pembayaran 3: Rp 2,000,000</li>
            </ul>
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2"
            >
              Cetak Laporan
            </button>
            <button
              type="button"
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
            >
              Ekspor ke Excel
            </button>
          </div>
        </form>
      </div>

      {/* Sub-menu: Laporan Tunggakan */}
      <div className="mb-6">
        <h3 className="text-lg font-bold">Laporan Tunggakan</h3>
        <div className="bg-white p-4 shadow rounded-lg">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 text-left">Nama Pelanggan</th>
                <th className="py-2 px-4 text-left">Kontak</th>
                <th className="py-2 px-4 text-left">Jumlah Tunggakan</th>
                <th className="py-2 px-4 text-left">
                  Lamanya Menunggak (hari)
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Contoh data tunggakan */}
              <tr>
                <td className="py-2 px-4">John Doe</td>
                <td className="py-2 px-4">08123456789</td>
                <td className="py-2 px-4">Rp 1,500,000</td>
                <td className="py-2 px-4">35</td>
              </tr>
              <tr>
                <td className="py-2 px-4">Jane Smith</td>
                <td className="py-2 px-4">08198765432</td>
                <td className="py-2 px-4">Rp 750,000</td>
                <td className="py-2 px-4">20</td>
              </tr>
              {/* Tambahkan baris lainnya sesuai kebutuhan */}
            </tbody>
          </table>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Cetak Laporan Tunggakan
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default LaporanPage;
