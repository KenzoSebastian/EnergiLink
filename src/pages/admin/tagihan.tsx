import AdminLayout from "@/components/layouts/AdminLayout";

const TagihanPage = () => {

  return (
    <AdminLayout
      textHeader="Tagihan"
    >
      {/* Sub-menu: Daftar Tagihan */}
      <div className="mb-6">
        <h3 className="text-lg font-bold">Daftar Tagihan</h3>
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Cari berdasarkan No. Tagihan atau ID Pelanggan"
            className="border border-gray-300 rounded-lg p-2 w-1/3"
          />
          <select className="border border-gray-300 rounded-lg p-2 w-1/4">
            <option value="">Filter Status</option>
            <option value="belum-lunas">Belum Lunas</option>
            <option value="lunas">Lunas</option>
            <option value="menunggak">Menunggak</option>
          </select>
          <select className="border border-gray-300 rounded-lg p-2 w-1/4">
            <option value="">Filter Periode</option>
            <option value="juli-2025">Juli 2025</option>
            <option value="agustus-2025">Agustus 2025</option>
          </select>
        </div>

        {/* Tabel Daftar Tagihan */}
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 text-left">No. Tagihan</th>
              <th className="py-2 px-4 text-left">Nama Pelanggan</th>
              <th className="py-2 px-4 text-left">Periode</th>
              <th className="py-2 px-4 text-left">Total Tagihan (Rp)</th>
              <th className="py-2 px-4 text-left">Tanggal Jatuh Tempo</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {/* Contoh data tagihan */}
            <tr>
              <td className="py-2 px-4">T001</td>
              <td className="py-2 px-4">John Doe</td>
              <td className="py-2 px-4">Juli 2025</td>
              <td className="py-2 px-4">1,500,000</td>
              <td className="py-2 px-4">01/08/2025</td>
              <td className="py-2 px-4 text-red-500">Belum Lunas</td>
              <td className="py-2 px-4">
                <button className="text-blue-500">Lihat Detail</button>
                <button className="text-green-500 mx-2">Cetak Struk</button>
              </td>
            </tr>
            {/* Tambahkan baris lainnya sesuai kebutuhan */}
          </tbody>
        </table>
      </div>

      {/* Sub-menu: Konfirmasi Pembayaran */}
      <div className="mb-6">
        <h3 className="text-lg font-bold">Konfirmasi Pembayaran</h3>
        <form className="bg-white p-4 shadow rounded-lg">
          <div className="mb-4">
            <label className="block mb-1">No. Tagihan / ID Pelanggan</label>
            <input
              type="text"
              placeholder="Masukkan No. Tagihan atau ID Pelanggan"
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Detail Tagihan</label>
            <textarea
              placeholder="Detail tagihan akan ditampilkan di sini setelah pencarian"
              className="border border-gray-300 rounded-lg p-2 w-full h-24"
              readOnly
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Konfirmasi Pembayaran
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default TagihanPage;
