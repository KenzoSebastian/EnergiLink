import AdminLayout from "@/components/layouts/AdminLayout";

const PengaturanPage = () => {
  return (
    <AdminLayout
      textHeader="Pengaturan"
    >
      {/* Sub-menu: Manajemen Tarif Listrik */}
      <div className="mb-6">
        <h3 className="text-lg font-bold">Manajemen Tarif Listrik</h3>
        <div className="bg-white p-4 shadow rounded-lg">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 text-left">Kode Golongan</th>
                <th className="py-2 px-4 text-left">Daya (Watt)</th>
                <th className="py-2 px-4 text-left">Tarif per kWh (Rp)</th>
                <th className="py-2 px-4 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {/* Contoh data tarif listrik */}
              <tr>
                <td className="py-2 px-4">R1/TR</td>
                <td className="py-2 px-4">900</td>
                <td className="py-2 px-4">1,500</td>
                <td className="py-2 px-4">
                  <button className="text-yellow-500">Ubah</button>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4">R2/TR</td>
                <td className="py-2 px-4">1300</td>
                <td className="py-2 px-4">2,000</td>
                <td className="py-2 px-4">
                  <button className="text-yellow-500">Ubah</button>
                </td>
              </tr>
              {/* Tambahkan baris lainnya sesuai kebutuhan */}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sub-menu: Profil Admin */}
      <div className="mb-6">
        <h3 className="text-lg font-bold">Profil Admin</h3>
        <form className="bg-white p-4 shadow rounded-lg">
          <div className="mb-4">
            <label className="block mb-1">Nama</label>
            <input
              type="text"
              placeholder="Masukkan Nama"
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              placeholder="Masukkan Email"
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Ubah Password</label>
            <input
              type="password"
              placeholder="Masukkan Password Baru"
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default PengaturanPage;
