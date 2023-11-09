import React, { useState } from 'react';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    event_name: '',
    host_organization: '',
    departure_time: '',
    approximate_return_time: '',
    minimum_age_requirement: '',
    first_name: '',
    last_name: '',
    kuid: '',
    email: '',
    phone_number: '',
    date_of_birth: '',
    current_address: '',
    city: '',
    state: '',
    zip: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/studenttravelregistrationformdaysubmit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Event/Activity Name:</label>
        <input
          type="text"
          name="event_name"
          value={formData.event_name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Host Organization/Department:</label>
        <input
          type="text"
          name="host_organization"
          value={formData.host_organization}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Departure Time:</label>
        <input
          type="datetime-local"
          name="departure_time"
          value={formData.departure_time}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Approximate Return Time:</label>
        <input
          type="datetime-local"
          name="approximate_return_time"
          value={formData.approximate_return_time}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Minimum Age Requirement:</label>
        <input
          type="number"
          name="minimum_age_requirement"
          value={formData.minimum_age_requirement}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>KUID:</label>
        <input
          type="text"
          name="kuid"
          value={formData.kuid}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Phone Number:</label>
        <input
          type="tel"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Date of Birth:</label>
        <input
          type="date"
          name="date_of_birth"
          value={formData.date_of_birth}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Current Address:</label>
        <input
          type="text"
          name="current_address"
          value={formData.current_address}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>City:</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>State:</label>
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Zip:</label>
        <input
          type="text"
          name="zip"
          value={formData.zip}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default RegistrationForm;
