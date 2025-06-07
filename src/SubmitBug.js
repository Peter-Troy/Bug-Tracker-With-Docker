import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SubmitBug() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

   const newBug = {
    title,
    description,
    status,
    priority,
    assigned_to: assignedTo,
    createdAt: createdAt,
    finishedAt: null  // Add this line
  };

    try {
      await axios.post("http://127.0.0.1:5000/bugs", newBug); // Send the bug data to backend
      console.log("Bug submitted successfully");
    } catch (error) {
      console.error("Error submitting bug:", error);
    }
    // Clear the form
    setTitle("");
    setDescription("");
    setStatus("");
    setPriority("");
    setCreatedAt("");
    setAssignedTo("");
  };

  // Function to navigate back to the main page
  const handleGoBack = () => {
    navigate("/"); // Navigate to the main page (root)
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Submit a Bug</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Created At:</label>
          <input
            type="date"
            value={createdAt}
            onChange={(e) => setCreatedAt(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={styles.input}
          />
        </div>



        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
          style={styles.input}>
          <option value="">Select Status</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
        </select>


          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
            style={styles.input}>
              
            <option value="">Select Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
        </select>


        <div style={styles.formGroup}>
          <label style={styles.label}>Assigned To:</label>
          <input
            type="text"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.submitButton}>Submit Bug</button>
        <button onClick={handleGoBack} style={styles.goBackButton}>Go Back to Main Page</button> {/* Go Back Button */}
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#f4f4f4",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  header: {
    marginBottom: "30px",
    fontSize: "24px",
    color: "#333",
    fontWeight: "bold",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    padding: "10px",
    width: "100%",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  submitButton: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};


export default SubmitBug;
