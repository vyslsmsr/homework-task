export const fetchUserData = async (userId) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${userId}`);
    if (response.ok) {
      const userData = await response.json();
      return {
        name: userData.firstName || "",
        lastname: userData.lastName || "",
        email: userData.email || "",
        phone: userData.phone || "",
        website: userData.domain || "",
        companyName: userData.company.name || "",
      };
    } else {
      throw new Error(`Veri çekme işlemi başarısız oldu. Hata kodu: ${response.status}`);
    }
  } catch (error) {
    console.error("Veri çekme hatası:", error);
    return null;
  }
};
