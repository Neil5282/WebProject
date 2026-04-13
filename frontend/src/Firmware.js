
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
    if (editId) {
      await axios.put(`https://gsm-backend-xj0i.onrender.com/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post("https://gsm-backend-xj0i.onrender.com", form);
    }

    setForm({ title: "", brand: "", description: "", fileUrl: "" });
    fetchData();
  };

  const handleDelete = async (id) => {
    await axios.delete(`https://gsm-backend-xj0i.onrender.com/${id}`);
    fetchData();
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item._id);
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-100 p-6">
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
      placeholder="🏷 Brand (e.g. OnePlus)"
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

      {/* LIST */}
    
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {data.map((item) => (
          <div key={item._id} className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-bold">{item.title}</h3>
            <p className="text-gray-600">{item.brand}</p>
            <p>{item.description}</p>

            <a
  href={item.fileUrl}
  target="_blank"
  rel="noreferrer"
  className="text-blue-500 underline"
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