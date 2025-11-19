import { useState } from "react";
import API from "../api";

function AppointmentForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    doctor: "",
    date: "",
    time: "",
    reason: "",
  });

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const doctors = [
    { id: 1, name: "Dr. Aisha Khan", specialty: "Cardiologist" },
    { id: 2, name: "Dr. Rajesh Patel", specialty: "Dermatologist" },
    { id: 3, name: "Dr. Emily Brown", specialty: "Neurologist" },
    { id: 4, name: "Dr. Sarah Wilson", specialty: "Pediatrician" },
    { id: 5, name: "Dr. Robert Chen", specialty: "Orthopedic Surgeon" },
    { id: 6, name: "Dr. Lisa Martinez", specialty: "Psychiatrist" },
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Get existing appointments from localStorage
      const existingAppointments =
        JSON.parse(localStorage.getItem("appointments")) || [];

      // New appointment object
      const newAppointment = {
        id: Date.now(),
        name: form.name,
        email: form.email,
        doctor: form.doctor,
        date: form.date,
        time: form.time,
        reason: form.reason,
        status: "Pending",
      };

      // Save to localStorage
      localStorage.setItem(
        "appointments",
        JSON.stringify([...existingAppointments, newAppointment])
      );

      // Show success message
      setMessage("✅ Appointment booked successfully!");

      // Reset form
      setForm({
        name: "",
        email: "",
        doctor: "",
        date: "",
        time: "",
        reason: "",
      });
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="appointment-container">
      <div className="appointment-card glass fade-in-up">
        <div className="appointment-header">
          <h2>📅 Book Your Appointment</h2>
          <p>Schedule a consultation with our expert doctors</p>
        </div>

        <form onSubmit={handleSubmit} className="appointment-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="doctor">Select Doctor</label>
            <select
              id="doctor"
              name="doctor"
              value={form.doctor}
              onChange={handleChange}
              required
              className="form-input"
            >
              <option value="">-- Select Doctor --</option>
              {doctors.map((doc) => (
                <option key={doc.id} value={doc.name}>
                  {doc.name} ({doc.specialty})
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Preferred Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="time">Preferred Time</label>
              <input
                type="time"
                id="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="reason">Reason for Consultation</label>
            <textarea
              id="reason"
              name="reason"
              placeholder="Please describe your symptoms or reason for consultation"
              value={form.reason}
              onChange={handleChange}
              required
              className="form-input"
              rows="4"
            />
          </div>

          <button 
            type="submit" 
            className={`btn ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Booking Appointment...' : 'Confirm Appointment'}
          </button>
        </form>

        {message && (
          <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default AppointmentForm;
