import { useState, useEffect } from "react";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/Navbar";
import UserCard from "./components/UserCard";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  // state buat nyimpen data user dari API
  const [users, setUsers] = useState([]);

  // state buat nyimpen kata yang diketik di search
  const [searchQuery, setSearchQuery] = useState("");

  // state buat loading pas lagi ambil data
  const [loading, setLoading] = useState(true);

  // state buat error kalau fetch gagal
  const [error, setError] = useState(null);

  // useEffect buat ambil data dari API pas pertama kali halaman dibuka
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        // simpan data ke state users
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        // kalau gagal tampilkan pesan error
        setError("Gagal mengambil data. Coba refresh halaman.");
        setLoading(false);
      });
  }, []);

  // filter user berdasarkan nama atau username yang diketik
  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(query) ||
      user.username.toLowerCase().includes(query)
    );
  });

  return (
    // AppProvider bungkus semua komponen supaya bisa pakai context
    <AppProvider>
      <div>
        {/* navbar */}
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* konten utama */}
        <main className="main-content">

          {/* header halaman */}
          <div className="page-header">
            <h2 className="page-title">
              Daftar Pengguna
              {searchQuery && (
                <span className="search-result-info">
                  {" "}— {filteredUsers.length} hasil untuk "{searchQuery}"
                </span>
              )}
            </h2>
            {!loading && !error && (
              <p className="page-subtitle">
                Menampilkan {filteredUsers.length} dari {users.length} pengguna
              </p>
            )}
          </div>

          {/* tampilkan loading spinner */}
          {loading && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p className="loading-text">Sedang mengambil data...</p>
            </div>
          )}

          {/* tampilkan error kalau fetch gagal */}
          {error && (
            <div className="error-container">
              <p className="error-text">⚠️ {error}</p>
              <button
                className="retry-btn"
                onClick={() => window.location.reload()}
              >
                Refresh
              </button>
            </div>
          )}

          {/* kalau search tapi tidak ada hasil */}
          {!loading && !error && filteredUsers.length === 0 && (
            <div className="empty-container">
              <p className="empty-text">
                😕 User "{searchQuery}" tidak ditemukan
              </p>
            </div>
          )}

          {/* tampilkan kartu user */}
          {!loading && !error && (
            <div className="users-grid">
              {filteredUsers.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          )}

        </main>

        {/* footer */}
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;
