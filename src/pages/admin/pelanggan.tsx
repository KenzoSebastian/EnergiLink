import AdminLayout from "@/components/layouts/AdminLayout";

const PelangganPage = () => {
  return (
    <AdminLayout
      textHeader="Pelanggan"
    >
      {/* Sub-menu: Daftar Pelanggan */}
      <div className="mb-6">
        <h3 className="text-lg font-bold">Daftar Pelanggan</h3>
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Cari pelanggan..."
              className="border border-gray-300 rounded-lg p-2"
            />
            <select className="border border-gray-300 rounded-lg p-2">
              <option value="">Filter Status</option>
              <option value="aktif">Aktif</option>
              <option value="non-aktif">Non-Aktif</option>
            </select>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            + Tambah Pelanggan Baru
          </button>
        </div>

        {/* Tabel Data Pelanggan */}
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 text-left">ID Pelanggan</th>
              <th className="py-2 px-4 text-left">Nama Pelanggan</th>
              <th className="py-2 px-4 text-left">Alamat</th>
              <th className="py-2 px-4 text-left">No. Telepon</th>
              <th className="py-2 px-4 text-left">Tanggal Bergabung</th>
              <th className="py-2 px-4 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {/* Contoh data pelanggan */}
            <tr>
              <td className="py-2 px-4">123456789012</td>
              <td className="py-2 px-4">John Doe</td>
              <td className="py-2 px-4">Jl. Contoh No. 1</td>
              <td className="py-2 px-4">08123456789</td>
              <td className="py-2 px-4">01/01/2023</td>
              <td className="py-2 px-4">
                <button className="text-blue-500">Lihat Detail</button>
                <button className="text-yellow-500 mx-2">Ubah</button>
                <button className="text-red-500">Hapus</button>
              </td>
            </tr>
            {/* Tambahkan baris lainnya sesuai kebutuhan */}
          </tbody>
        </table>
      </div>

      {/* Sub-menu: Tambah Pelanggan Baru */}
      <div className="mb-6">
        <h3 className="text-lg font-bold">Tambah Pelanggan Baru</h3>
        <form className="bg-white p-4 shadow rounded-lg">
          <div className="mb-4">
            <label className="block mb-1">Nama Lengkap</label>
            <input
              type="text"
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Alamat</label>
            <input
              type="text"
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">No. Telepon</label>
            <input
              type="text"
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">
              Nomor Meter (ID Pelanggan - 12 digit)
            </label>
            <input
              type="text"
              className="border border-gray-300 rounded-lg p-2 w-full"
              maxLength={12}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Golongan Tarif</label>
            <select className="border border-gray-300 rounded-lg p-2 w-full">
              <option value="">Pilih Golongan Tarif</option>
              <option value="golongan1">Golongan 1</option>
              <option value="golongan2">Golongan 2</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Username</label>
            <input
              type="text"
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Password</label>
            <input
              type="password"
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
            >
              Simpan
            </button>
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default PelangganPage;
