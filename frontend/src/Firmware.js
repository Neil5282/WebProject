
import { useEffect, useState } from "react";
import axios from "axios";

function Firmware() {
  const [form, setForm] = useState({
    title: "",
    brand: "",
    description: "",
    fileUrl: ""
  });

  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  
const fetchData = async () => {
  try {
    const res = await axios.get("https://gsm-backend-xj0i.onrender.com/api/firmware");
    setData(res.data);
  } catch (err) {
    console.error("API Error:", err);
    setData([]); // prevent crash
  }
};

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async () => {
  try {
    if (editId) {
      await axios.put(`https://gsm-backend-xj0i.onrender.com/api/firmware/${editId}`, form);
      alert("✅ Firmware updated successfully");
    } else {
      await axios.post("https://gsm-backend-xj0i.onrender.com/api/firmware", form);
      alert("✅ Firmware added successfully");
    }

    setForm({
      title: "",
      brand: "",
      description: "",
      fileUrl: ""
    });

    setEditId(null);
    fetchData();

  } catch (err) {
    console.error(err);
    alert("❌ Something went wrong");
  }
};

const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this firmware?");

  if (!confirmDelete) return;

  try {
    await axios.delete(`https://gsm-backend-xj0i.onrender.com/api/firmware/${id}`);
    fetchData();
  } catch (err) {
    console.error("Delete error:", err);
  }
};
  const handleEdit = (item) => {
    setForm(item);
    setEditId(item._id);
  };

const handleDownload = async (id) => {
  try {
    await axios.put(`https://gsm-backend-xj0i.onrender.com/api/firmware/download/${id}`);
    fetchData(); // refresh count
  } catch (err) {
    console.error("Download count error:", err);
  }
};

  return (
    
    
  <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue to-blue-100 p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Firmware Manager</h2>

      {/* FORM */}
    <div className="flex justify-center mb-10">
  <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-lg border border-gray-200">

    <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
      Add New Firmware
    </h2>

    <input
      name="title"
      value={form.title}
      placeholder="📱 Device Title (e.g. OnePlus 13)"
      onChange={handleChange}
      className="w-full mb-4 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
    />

    <input
      name="brand"
      value={form.brand}
      placeholder="🏷 OTA-Version (e.g. PJZ110_XX.zip)"
      onChange={handleChange}
      className="w-full mb-4 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
      
    />

    <input
      name="description"
      value={form.description}
      placeholder="📝 Description"
      onChange={handleChange}
      className="w-full mb-4 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
    />

    <input
      name="fileUrl"
      value={form.fileUrl}
      placeholder="🔗 Download Link"
      onChange={handleChange}
      className="w-full mb-6 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
    />

    <button
      onClick={handleSubmit}
      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:scale-105 transition transform shadow-md"
    >
      {editId ? "Update Firmware 🚀" : "Add Firmware "}
    </button>

  </div>
</div>

<input
  type="text"
  placeholder="🔍 Search by model or brand..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full max-w-md mx-auto block mb-6 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
/>




      {/* LIST */}
    
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {data
  .filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.brand.toLowerCase().includes(search.toLowerCase())
  )
  .map((item) => (
          <div key={item._id} className="bg-white p-4 rounded shadow">
            <p className="text-xs text-gray-400 mt-1">
  📅 {new Date(item.createdAt).toLocaleString()}
</p>
            <h3 className="text-xl font-bold">{item.title}</h3>
            <p className="text-green-600">{item.brand}</p>
            <p className="text-gray-600">{item.description}</p>

            <span className="text-green-400 text-sm">
  📥 {item.downloads || 0} downloads
</span>

<a
  href={item.fileUrl}
  target="_blank"
  rel="noreferrer"
  onClick={() => handleDownload(item._id)}
  className="text-blue-400 hover:underline"
>
  Download
</a>

            <div className="mt-3 flex gap-2">
              <button onClick={() => handleEdit(item)}
                className="bg-yellow-400 px-3 py-1 rounded">Edit</button>

              <button onClick={() => handleDelete(item._id)}
                className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default Firmware;