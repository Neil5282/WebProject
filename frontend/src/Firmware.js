
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
    const res = await axios.get("http://localhost:5000/api/firmware");
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (editId) {
      await axios.put(`http://localhost:5000/api/firmware/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post("http://localhost:5000/api/firmware", form);
    }

    setForm({ title: "", brand: "", description: "", fileUrl: "" });
    fetchData();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/firmware/${id}`);
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
      <div className="bg-white p-6 rounded shadow-md max-w-md mx-auto">
        <input name="title" value={form.title} placeholder="Title" onChange={handleChange}
          className="w-full border p-2 mb-3 rounded" />

        <input name="brand" value={form.brand} placeholder="Brand" onChange={handleChange}
          className="w-full border p-2 mb-3 rounded" />

        <input name="description" value={form.description} placeholder="Description" onChange={handleChange}
          className="w-full border p-2 mb-3 rounded" />

        <input name="fileUrl" value={form.fileUrl} placeholder="Download Link" onChange={handleChange}
          className="w-full border p-2 mb-3 rounded" />

        <button onClick={handleSubmit}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          {editId ? "Update Firmware" : "Add Firmware"}
        </button>
      </div>

      {/* LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {data.map((item) => (
          <div key={item._id} className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-bold">{item.title}</h3>
            <p className="text-gray-600">{item.brand}</p>
            <p>{item.description}</p>

            <a href={item.fileUrl} target="_blank"
              className="text-blue-500 underline">Download</a>

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