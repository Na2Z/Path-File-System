const prompt = require("prompt-sync")();

const Barang = require("./src/barang");

const b = new Barang();
let idBarang;

console.log("             Menu Data Stock Barang         ");
console.log("============================================");
console.log("+    1. Simpan Data Barang                  +");
console.log("+    2. Tampilkan Semua Data Barang         +");
console.log("+    3. Tampilkan Total Harga Barang        +");
console.log("+    4. Update                              +");
console.log("+    5. Hapus                               +");
console.log("============================================");

const menu = parseInt(prompt(`Pilih Menu: `));
switch (menu) {
  case 1:
    console.log("\nSimpan Data");
    const id = prompt("Id Barang : ");
    b.findIndex(id);
    if (b.getDataIndex() !== false) {
      console.log("ID Barang Sudah Digunakan");
      console.log(b.getDataIndex());
    } else {
      const nama = prompt("Nama : ");
      const harga = prompt("Harga : ");
      const kuantitas = prompt("Kuantitas : ");
      const dataBarang = {
        id,
        nama,
        harga,
        kuantitas,
      };
      console.log("\n");
      b.simpanData(dataBarang);
    }
    break;
  case 2:
    if (b.bacaData() === false) {
      console.log("\nData kosong");
    } else {
      console.log("\n Data : ");
      console.log(JSON.parse(b.bacaData()));
    }
    break;
  case 3:
    if (b.totalHarga() === false) {
      console.log("\nData Kosong");
    } else {
      console.log("\nTotal Harga : ");
      console.log(b.totalHarga());
    }
    break;
  case 4:
    console.log("Update Data ");
    if (b.bacaData() === false) {
      console.log("\nData Kosong");
    } else {
      console.log("\nData Stok Barang");
      console.log(JSON.parse(b.bacaData()));
      idBarang = prompt("Masukan ID Barang : ");
      b.findIndex(idBarang);
      if (b.getDataIndex() === false) {
        console.log("ID yang anda masukan tidak Ditemukan");
      } else {
        console.log(b.getDataIndex());
        let update = prompt(
          "Apakah anda ingin memperbarui data tersebut? [y/n] : "
        );
        if (update === "n" || update === "N") {
          console.log("Update data dibatalkan");
        } else if (update === "y" || update === "Y") {
          console.log("Inputkan Data Baru");
          const nama = prompt("Nama : ");
          const harga = prompt("Harga : ");
          const kuantitas = prompt("Kuantitas : ");
          let id = b.getDataIndex().id;
          const dataBarang = {
            id,
            nama,
            harga,
            kuantitas,
          };
          console.log("\n");
          b.updateData(dataBarang);
          console.log("Data telah update");
        } else {
          console.log("Inputan Salah");
        }
      }
    }
    break;
  case 5:
    console.log("Hapus Data");
    if (b.bacaData() === false) {
      console.log("\nData Kosong");
    } else {
      console.log("\nData Stok Barang");
      console.log(JSON.parse(b.bacaData()));
      idBarang = prompt("Masukan ID Barang : ");
      b.findIndex(idBarang);
      if (b.getDataIndex() === false) {
        console.log("ID yang anda masukan tidak Ditemukan");
      } else {
        console.log(b.getDataIndex());
        let hapus = prompt("Hapus data? [y/n] : ");
        if (hapus === "n" || hapus === "N") {
          console.log("Hapus data dibatalkan");
        } else if (hapus === "y" || hapus === "Y") {
          b.hapusData();
          console.log("Data telah dihapus");
        } else {
          console.log("Inputan Salah");
        }
      }
    }
    break;
  default:
    console.log(`pilihan yang anda masukan tidak tersedia`);
    break;
}
