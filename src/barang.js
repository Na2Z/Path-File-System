const fs = require('fs');
const path = require('path');
class Barang {
    indexBarang;
    simpanData(data) {
        let exists = fs.existsSync('./data/data_barang' + '.json');
        let existingData = '[]';
        if (!exists) {
            fs.mkdirSync(path.dirname('./data/data_barang' + '.json'), {
                recursive: true
            });
        } else {
            existingData = this.bacaData();
        }

        let dataBaru = JSON.parse(existingData);
        this.getDataIndex();
        dataBaru.push(data);
        dataBaru = JSON.stringify(dataBaru);
        fs.writeFileSync('./data/data_barang' + '.json', dataBaru, {
            encoding: 'utf-8'
        });
        console.log('Data Barang Berhasil Ditambahkan');
        
    }

    bacaData() {
        try {
            const data = fs.readFileSync('./data/data_barang' + '.json');
            if (data) {
                return data.toString('utf-8');
            }
            return undefined;
        } catch (error) {
            return false;
        }
    }

    totalHarga() {
        try {
            let data = JSON.parse(this.bacaData());
            const totalHarga = data.map((d) => {
                let harga = parseInt(d.harga);
                let kuantitas = parseInt(d.kuantitas);
                let total = harga * kuantitas;
                return {
                    nama_barang: d.nama,
                    harga_barang: d.harga,
                    kuantitas_barang: d.kuantitas,
                    total_harga: total
                }
            });
            return totalHarga;
        } catch (error) {
            return false;
        }
    }
    findIndex(id) {
        try {
            let data = JSON.parse(this.bacaData());
            this.indexBarang = data.findIndex((d) => {
                return d.id === id;
            });
        } catch (error) {
            return false;
        }
    }
    getDataIndex() {
        try {
            let data = JSON.parse(this.bacaData());
            return {
                id: data[this.indexBarang].id,
                nama: data[this.indexBarang].nama,
                harga: data[this.indexBarang].harga,
                kuantitas: data[this.indexBarang].kuantitas
            }
        } catch (error) {
            return false;
        }
    }
    updateData(data){
        let update = JSON.parse(this.bacaData());
        update.splice(this.indexBarang, 1,data);
        let dataBaru = JSON.stringify(update);
        fs.writeFileSync('./data/data_barang' + '.json', dataBaru, {
            encoding: 'utf-8'
        });
        return dataBaru;
    }
    hapusData() {
        let hapus = JSON.parse(this.bacaData());
        hapus.splice(this.indexBarang, 1);
        let dataBaru = JSON.stringify(hapus);
        fs.writeFileSync('./data/data_barang' + '.json', dataBaru, {
            encoding: 'utf-8'
        });
        return dataBaru;
    }

}

module.exports = Barang;