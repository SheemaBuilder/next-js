// components/MyCustomComponent.tsx
import React, { useState } from "react";
import styles from "./MyComp.module.css";

interface MyCustomComponentProps {
  onSubmit?: (data: FormData) => void;
}

interface FormData {
  name: string;
  email: string;
}

const MyCustomComponent: React.FC<MyCustomComponentProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Call the onSubmit prop if provided, otherwise handle locally
      if (onSubmit) {
        onSubmit(formData);
      } else {
        // Default behavior - could be API call, etc.
        console.log("Form submitted:", formData);
        alert("Form submitted successfully!");
      }

      // Reset form after successful submission
      setFormData({ name: "", email: "" });
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>This is a heading</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={styles.input}
            required
            placeholder="Enter your name"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={styles.input}
            required
            placeholder="Enter your email"
          />
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default MyCustomComponent;
