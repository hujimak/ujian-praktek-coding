# 👥 Minstagram - Social Media Sederhana

Website sosial media sederhana menggunakan React JS yang menampilkan data user dari API JSONPlaceholder.

---

Fetch API

Data user diambil dari `https://jsonplaceholder.typicode.com/users` menggunakan `fetch()` di dalam `useEffect`.

```jsx
useEffect(() => {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((data) => {
      setUsers(data);
      setLoading(false);
    })
    .catch((err) => {
      setError("Gagal mengambil data. Coba refresh halaman.");
      setLoading(false);
    });
}, []);
```

`fetch()` → mengambil data dari URL API
`.then((res) => res.json())` → mengubah response ke format JSON
`.then((data) => setUsers(data))` → menyimpan data ke state
`.catch()` → menangkap error jika fetch gagal
`[]` → useEffect hanya berjalan sekali saat halaman pertama dibuka

---

Penjelasan Component

| Component | Fungsi |
`App.jsx` = Komponen utama, berisi logika fetch API dan filter search |
`Navbar.jsx` = Menampilkan logo dan search bar untuk mencari user |
`UserCard.jsx` | Menampilkan informasi user beserta tombol Like dan Follow |
`Footer.jsx` = Menampilkan informasi di bagian bawah halaman |
`AppContext.jsx` = Menyimpan state likes dan follows secara global |

---

Implementasi React Hook

### useState
Menyimpan data yang bisa berubah seperti daftar user, kata pencarian, status loading, dan data likes/follows.

```jsx
// App.jsx
const [users, setUsers] = useState([]);
const [searchQuery, setSearchQuery] = useState("");
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

// AppContext.jsx
const [likedUsers, setLikedUsers] = useState([]);
const [followedUsers, setFollowedUsers] = useState([]);
```

### useEffect
Menjalankan fetch API otomatis saat halaman pertama kali dibuka.

```jsx
// App.jsx
useEffect(() => {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((data) => setUsers(data));
}, []);
```

### useContext
Berbagi state likes dan follows ke semua komponen tanpa kirim props satu per satu.

```jsx
// AppContext.jsx - membuat context
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [likedUsers, setLikedUsers] = useState([]);
  const [followedUsers, setFollowedUsers] = useState([]);

  return (
    <AppContext.Provider value={{ likedUsers, followedUsers, toggleLike, toggleFollow }}>
      {children}
    </AppContext.Provider>
  );
};

// UserCard.jsx - memakai context
const { likedUsers, followedUsers, toggleLike, toggleFollow } = useAppContext();
```

### useRef
Mengakses elemen input secara langsung untuk fokus ke search bar saat tombol Cari diklik.

```jsx
// Navbar.jsx
const searchRef = useRef(null);

const handleFocusSearch = () => {
  searchRef.current.focus();
};

<input ref={searchRef} type="text" placeholder="Cari user..." />
<button onClick={handleFocusSearch}>Cari</button>
```
