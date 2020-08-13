import axios from 'axios'

export async function post(route, data) {
  let response = null

  try {
    const payload = {
      "campaignUuid": "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a",
      "data": data
    }
    return await axios.post(route, payload)
  } catch (e) {
    response = e.response
  }

  return response

}