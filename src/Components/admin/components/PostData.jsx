import axios from "axios";

export async function postProduct() {
  try {
    const { data } = await axios.post(
      "https://httpbin.org/post",
      {
        name: "",
        description: "",
        price: "",
        category_id: "",
        quantity: "",
        rating: "",
        photo: document.querySelector("#fileInput").files,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

postProduct();
