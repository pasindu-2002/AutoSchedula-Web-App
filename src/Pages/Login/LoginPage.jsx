import { memo, useState } from "react";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempted with:", formData);
    // Add your authentication logic here
  };

  // Internal CSS styles
  const styles = {
    container: {
        width: "100%",
      maxWidth: "400px",
      margin: "100px auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f5f5f5",
      fontFamily: "Arial, sans-serif"
    },
    loginCard: {
      width: "350px",
      padding: "30px",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      backgroundColor: "white"
    },
    title: {
      textAlign: "center",
      marginBottom: "24px",
      color: "#333",
      fontSize: "24px",
      fontWeight: "600"
    },
    form: {
      display: "flex",
      flexDirection: "column"
    },
    formGroup: {
      marginBottom: "16px"
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontSize: "14px",
      fontWeight: "500",
      color: "#555"
    },
    input: {
      width: "100%",
      padding: "10px 12px",
      fontSize: "14px",
      borderRadius: "4px",
      border: "1px solid #ddd",
      boxSizing: "border-box"
    },
    button: {
      padding: "12px",
      backgroundColor: "#4285f4",
      color: "white",
      border: "none",
      borderRadius: "4px",
      fontSize: "16px",
      fontWeight: "500",
      cursor: "pointer",
      marginTop: "8px"
    },
    buttonHover: {
      backgroundColor: "#3367d6"
    },
    forgotPassword: {
      textAlign: "center",
      marginTop: "16px",
      fontSize: "14px",
      color: "#4285f4",
      cursor: "pointer"
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginCard}>
        <h1 style={styles.title}>Log In</h1>
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="email">Email Address</label>
            <input
              style={styles.input}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="password">Password</label>
            <input
              style={styles.input}
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>
          <button 
            style={styles.button} 
            type="submit"
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = styles.button.backgroundColor;
            }}
          >
            Sign In
          </button>
        </form>
        <div style={styles.forgotPassword}>
          Forgot Password?
        </div>
      </div>
    </div>
  );
};

export default LoginPage;