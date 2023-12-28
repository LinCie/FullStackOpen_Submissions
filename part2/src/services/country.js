import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries";

export const getCountries = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/all`);
    if (response.data) {
      return response.data;
    } else {
      throw new Error("Can't fetch list of countries");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
