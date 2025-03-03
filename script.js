document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('komen-netizen');
    const commentText = document.getElementById('komen-text');
    const commentsList = document.getElementById('coments');

    // Fungsi untuk menampilkan komentar dari localStorage
    function displayComments() {
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        commentsList.innerHTML = ''; // Kosongkan daftar sebelum menampilkan

        comments.forEach(commentObj => { // Menggunakan commentObj karena sekarang objek
            const li = document.createElement('li');
            const p = document.createElement('p'); // Membuat elemen p untuk teks komentar
            p.textContent = commentObj.text;

            const small = document.createElement('small'); // Membuat elemen small untuk waktu
            const time = new Date(commentObj.timestamp); // Membuat objek Date dari timestamp
            const formattedTime = time.toLocaleString(); // Format waktu yang lebih mudah dibaca
            small.textContent = formattedTime;

            li.appendChild(p); // Menambahkan teks komentar
            li.appendChild(small); // Menambahkan waktu dalam elemen small
            commentsList.appendChild(li);
        });
    }

    // Tampilkan komentar saat halaman dimuat
    displayComments();

    // Tangani pengiriman formulir
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Mencegah pengiriman formulir default

        const comment = commentText.value.trim();
        if (comment) {
            // Ambil komentar yang ada dari localStorage atau buat array kosong
            const comments = JSON.parse(localStorage.getItem('comments')) || [];

            // Tambahkan komentar baru ke array, termasuk timestamp
            const newComment = {
                text: comment,
                timestamp: new Date().toISOString() // Simpan waktu saat ini dalam format ISO
            };
            comments.push(newComment);

            // Simpan array komentar ke localStorage
            localStorage.setItem('comments', JSON.stringify(comments));

            // Tampilkan komentar baru
            displayComments();

            // Kosongkan textarea
            commentText.value = '';
        }
    });
});