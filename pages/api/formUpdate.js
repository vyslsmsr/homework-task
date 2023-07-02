export const formUpdate = async (formData, userId, setOpen, onFormUpdate) => {
  try {
    console.log("Form submitted:", formData);
    setOpen(false);

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: formData.name,
        lastName: formData.lastname,
        email: formData.email,
        phone: formData.phone,
        website: formData.website,
        companyName: formData.companyName,
      }),
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${userId}`,
      requestOptions
    );
    const data = await response.json();
    console.log(data);
    setOpen(false);
    onFormUpdate(); // Veriyi güncelledikten sonra geri çağırma işlevini çağır
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};
