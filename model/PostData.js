import { useState } from "react";

export function useFormData() {
  const [createData, setCreateData] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
    website: "",
    companyName: "",
  });

  return { createData, setCreateData };
}
