import AdminLayout from "@/components/layouts/AdminLayout";

const PenggunaanPage = () => {

  return (
    <AdminLayout
      textHeader="Penggunaan"
    >
      {/* Sub-menu: Input Penggunaan */}
      <div className="mb-6">
        <h3 className="text-lg font-bold">Input Penggunaan</h3>
        <form className="bg-white p-4 shadow rounded-lg">
          <div className="mb-4">
            <label className="block mb-1">ID Pelanggan</label>
            <input
              type="text"
              placeholder="Masukkan ID Pelanggan"
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Nama Pelanggan</label>
            <input
              type="text"
              placeholder="Nama Pelanggan"
              className="border border-gray-300 rounded-lg p-2 w-full"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Alamat</label>
            <input
              type="text"
              placeholder="Alamat"
              className="border border-gray-300 rounded-lg p-2 w-full"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Meter Bulan Lalu</label>
            <input
              type="text"
              placeholder="Meter Bulan Lalu"
              className="border border-gray-300 rounded-lg p-2 w-full"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Meter Bulan Ini</label>
            <input
              type="text"
              placeholder="Masukkan Meter Bulan Ini"
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
            >
              Simpan & Lanjutkan
            </button>
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
            >
              Selesai
            </button>
          </div>
        </form>
      </div>

      {/* Sub-menu: Riwayat Penggunaan */}
      <div className="mb-6">
        <h3 className="text-lg font-bold">Riwayat Penggunaan</h3>
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Cari berdasarkan nama pelanggan atau periode"
            className="border border-gray-300 rounded-lg p-2 w-1/3"
          />
          <select className="border border-gray-300 rounded-lg p-2 w-1/4">
            <option value="">Filter Periode</option>
            <option value="juli-2025">Juli 2025</option>
            <option value="agustus-2025">Agustus 2025</option>
          </select>
        </div>

        {/* Tabel Riwayat Penggunaan */}
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 text-left">ID Penggunaan</th>
              <th className="py-2 px-4 text-left">Nama Pelanggan</th>
              <th className="py-2 px-4 text-left">Periode</th>
              <th className="py-2 px-4 text-left">Meter Awal</th>
              <th className="py-2 px-4 text-left">Meter Akhir</th>
              <th className="py-2 px-4 text-left">Total Pemakaian (kWh)</th>
              <th className="py-2 px-4 text-left">Tanggal Input</th>
            </tr>
          </thead>
          <tbody>
            {/* Contoh data riwayat penggunaan */}
            <tr>
              <td className="py-2 px-4">001</td>
              <td className="py-2 px-4">John Doe</td>
              <td className="py-2 px-4">Juli 2025</td>
              <td className="py-2 px-4">1000</td>
              <td className="py-2 px-4">1200</td>
              <td className="py-2 px-4">200</td>
              <td className="py-2 px-4">01/08/2025</td>
            </tr>
            {/* Tambahkan baris lainnya sesuai kebutuhan */}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default PenggunaanPage;
