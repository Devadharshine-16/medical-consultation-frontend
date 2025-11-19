// src/pages/BookAppointment.jsx
import { useState } from "react";
import API from "../api";

function BookAppointment() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    doctor: "",
    specialty: "",
    reason: "",
    urgency: "Normal"
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const doctors = [
    { id: 1, name: "Dr. John Smith", specialty: "Cardiologist" },
    { id: 2, name: "Dr. Emily Davis", specialty: "Dermatologist" },
    { id: 3, name: "Dr. Michael Brown", specialty: "Neurologist" },
    { id: 4, name: "Dr. Sarah Wilson", specialty: "Pediatrician" },
    { id: 5, name: "Dr. Robert Chen", specialty: "Orthopedic Surgeon" },
    { id: 6, name: "Dr. Lisa Martinez", specialty: "Psychiatrist" },
    { id: 7, name: "Dr. James Anderson", specialty: "Gastroenterologist" },
    { id: 8, name: "Dr. Maria Rodriguez", specialty: "Gynecologist" },
    { id: 9, name: "Dr. David Kim", specialty: "Ophthalmologist" },
    { id: 10, name: "Dr. Jennifer Taylor", specialty: "Endocrinologist" },
    { id: 11, name: "Dr. Ahmed Hassan", specialty: "Urologist" },
    { id: 12, name: "Dr. Rachel Green", specialty: "Pulmonologist" }
  ];

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Auto-fill specialty when doctor is selected
    if (name === "doctor") {
      const selectedDoctor = doctors.find(doc => doc.name === value);
      if (selectedDoctor) {
        setForm(prev => ({ ...prev, specialty: selectedDoctor.specialty }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Get existing appointments from localStorage
      const existingAppointments = JSON.parse(localStorage.getItem("appointments")) || [];

      // New appointment object
      const newAppointment = {
        id: Date.now(),
        ...form,
        status: "Pending",
        createdAt: new Date().toISOString()
      };

      // Save to localStorage
      localStorage.setItem("appointments", JSON.stringify([...existingAppointments, newAppointment]));

      // Show success message
      setMessage("✅ Appointment booked successfully! You will receive a confirmation email shortly.");

      // Reset form
      setForm({
        fullName: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        doctor: "",
        specialty: "",
        reason: "",
        urgency: "Normal"
      });
      
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="appointment-container">
      <div className="appointment-card glass fade-in-up">
        <div className="appointment-header">
          <h2>📅 Book Your Appointment</h2>
          <p>Schedule a consultation with our expert doctors</p>
        </div>

        <form onSubmit={handleSubmit} className="appointment-form">
          <div className="form-section">
            <h3>Personal Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
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
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                value={form.phone}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Appointment Details</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="doctor">Select Doctor *</label>
                <select
                  id="doctor"
                  name="doctor"
                  value={form.doctor}
                  onChange={handleChange}
                  required
                  className="form-input"
                >
                  <option value="">-- Select Doctor --</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.name}>
                      {doctor.name} ({doctor.specialty})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="specialty">Specialty</label>
                <input
                  type="text"
                  id="specialty"
                  name="specialty"
                  value={form.specialty}
                  readOnly
                  className="form-input"
                  style={{ backgroundColor: '#f3f4f6' }}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">Preferred Date *</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  className="form-input"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="time">Preferred Time *</label>
                <select
                  id="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  required
                  className="form-input"
                >
                  <option value="">-- Select Time --</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="urgency">Urgency Level</label>
              <select
                id="urgency"
                name="urgency"
                value={form.urgency}
                onChange={handleChange}
                className="form-input"
              >
                <option value="Normal">Normal</option>
                <option value="Urgent">Urgent</option>
                <option value="Emergency">Emergency</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="reason">Reason for Visit *</label>
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

export default BookAppointment;
  