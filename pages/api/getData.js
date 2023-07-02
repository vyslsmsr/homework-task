export const fetchData = async (searchTerm) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`);
    if (response.ok) {
      const { users } = await response.json();

      const filteredData = users.filter((item) => {
        const fullName = `${item.firstName} ${item.lastName}`;
        return fullName.toLowerCase().includes((searchTerm || '').toLowerCase());
      });

      const formattedData = filteredData.map((item, index) => ({
        id: item.id,
        image: (
          <div className="profileImg">
            <img
              src={item.image}
              alt="Profile"
              style={{ marginRight: 8, width: "70px", height: "auto" }}
            />
          </div>
        ),
        name: `${item.firstName} ${item.lastName}`,
        email: item.email,
        phone: item.phone,
        website: item.domain,
        companyName: item.company.name,
      }));

      return formattedData;
    } else {
      throw new Error(`Veri alınamadı. Hata kodu: ${response.status}`);
    }
  } catch (error) {
    console.error("Veri alınamadı:", error);
    return [];
  }
};




