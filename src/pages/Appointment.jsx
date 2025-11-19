import { useState } from "react";
import api from "../utils/api";

export default function Appointment() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    doctor: "",
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/appointments/create", form);
      setMsg("✅ Appointment booked successfully!");

    } catch (err) {
      setMsg("❌ Failed to book appointment.");
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-50">
      <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Book Appointment</h2>

        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="date" name="date" value={form.date} onChange={handleChange} required />
        <input type="time" name="time" value={form.time} onChange={handleChange} required />

        <select name="doctor" value={form.doctor} onChange={handleChange} required>
          <option value="">Select Doctor</option>
          <option>Dr. Priya Sharma</option>
          <option>Dr. Arjun Patel</option>
          <option>Dr. Meera Iyer</option>
        </select>

        <button className="bg-blue-600 text-white py-2 rounded-lg">Confirm</button>

        {msg && <p>{msg}</p>}
      </form>
    </div>
  );
}
