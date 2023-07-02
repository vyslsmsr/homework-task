import React, { useState } from "react";

export function FormData() {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
    website: "",
    companyName: "",
  });

  return { formData, setFormData };
}