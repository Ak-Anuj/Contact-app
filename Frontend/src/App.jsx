import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [contacts, setContacts] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone) {
      alert("Name, Email, Phone required");
      return;
    }

    await axios.post("http://localhost:5000/api/contact", form);
    setForm({ name: "", email: "", phone: "", message: "" });
    loadContacts();
  };

  const loadContacts = async () => {
    const res = await axios.get("http://localhost:5000/api/contact");
    setContacts(res.data);
  };

  useEffect(() => {
    loadContacts();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Contact Management</h2>

      <form onSubmit={submit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} /><br />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} /><br />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} /><br />
        <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} /><br />
        <button>Submit</button>
      </form>

      <h3>Contacts</h3>
      <ul>
        {contacts.map(c => (
          <li key={c._id}>
            {c.name} - {c.email} - {c.phone}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
