import axios from "axios";

export default async function deletePhoto(public_id: string) {
  try {
    const response = await axios.delete(`${process.env.BAES_URL}/api/photos/delete?public_id=${public_id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
