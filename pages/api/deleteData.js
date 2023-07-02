export async function deleteData(id) {
  try {
    const requestOptions = {
      method: 'DELETE',
    };
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${id}`);
    console.log("silme işlemi başarılı");
    if (response.ok) {
      return true;
      
    } else {
      throw new Error(`Silme işlemi başarısız oldu. Hata kodu: ${response.status}`);
    }
  } catch (error) {
    console.error("Silme işlemi başarısız oldu:", error);
    return false;
  }
}
