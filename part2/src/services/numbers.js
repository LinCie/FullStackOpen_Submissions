import axios from "axios";

const baseUrl = "http://localhost:3001";

export const getNumbers = async () => {
  try {
    const response = await axios.get(`${baseUrl}/persons`);
    if (response.data) {
      return response.data;
    } else {
      throw new Error("Error getting numbers from the database");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const addNumber = async (number) => {
  try {
    const response = await axios.post(`${baseUrl}/persons`, number);
    if (response.data) {
      return response.data;
    } else {
      throw new Error("Error adding new number into the database");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const deleteNumber = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/persons/${id}`);
    if (response.data) {
      return response.data;
    } else {
      throw new Error("Error deleting the number from the database");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const updateNumber = async (id, number) => {
  try {
    const response = await axios.put(`${baseUrl}/persons/${id}`, number);
    if (response.data) {
      return response.data;
    } else {
      throw new Error("Failed to update data");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
