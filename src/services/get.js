import axios from "axios"

export const serviceGet = async (url) => {
  const response = await axios({
    method: "get",
    url: `${url}`
  })
  return response.data;
}