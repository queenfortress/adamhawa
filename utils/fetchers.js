export const fetcherGet = async (url) => {
    const res = await fetch(url)
    const data = await res.json()

    if (res.status !== 200) {
        throw new Error(data.message)
    }
    return data
}

export const fetcherPost = async (url, req_info) => {
    const res = await fetch(url, req_info)
    const data = await res.json()

    return data
    // if (res.status !== 200) {
    //     if (data.tipeEndpoint === 'userSignUp') {
    //         alert("Terjadi isu saat pendaftaran user: " + data.message)
    //     } else if (data.tipeEndpoint === 'products') {
    //         alert("Terjadi isu saat simpan produk baru: " + data.message)
    //     } else {
    //         alert("Terjadi isu saat tambah ke riwayat manajemen: " + data.message)
    //     }
    // }

    // if (data.tipeEndpoint === 'products') {
    //     alert("Berhasil! ID produk: " + data.message.insertedId)
    // } else if (data.tipeEndpoint === 'userSignUp') {
    //     alert("User berhasil ditambahkan: " + data.message.insertedId)
    // }
}

export const fetcherPut = async (url, req_info) => {
    const res = await fetch(url, req_info)
    const data = await res.json()

    return data
    // if (res.status !== 200) {
    //     alert("Terjadi isu: " + data.message + "; ID produk: " + data.produkID)
    // }
    // alert("Berhasil! ID produk: " + data.produkID)
}

export const fetcherDelete = async (url, req_info) => {
    const res = await fetch(url, req_info)
    const data = await res.json()

    return data
    // if (res.status !== 200) {
    //     alert("Terjadi isu: " + data.message + "; ID produk: " + data.produkID)
    // }
    // alert("Berhasil! Jumlah terhapus: " + data.message.deletedCount + "; ID produk: " + data.produkID)
}
