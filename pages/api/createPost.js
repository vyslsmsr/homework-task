export const createUser = async () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}add`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: createData.firstName,
            lastName: createData.lastName,
            email: createData.email,
            phone: createData.phone,
            website: createData.website,
            companyName: createData.companyName,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
              setOpenSecondModal(false);
              console.log(data);
          })
          .catch((error) => {
            console.log("Bir hata oluştu:");
            console.log(error);
          });
      
  };