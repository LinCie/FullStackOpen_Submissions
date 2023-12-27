import axios from "axios";

const baseUrl = "http://localhost:3001";

export const getNumbers = async () => {
  try {
    const response = await axios.get(`${baseUrl}/persons`);
    if (response.data) {
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
};

export const addNumber = async (number) => {
  try {
    const response = await axios.post(`${baseUrl}/persons`, number);
    if (response.data) {
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
};
