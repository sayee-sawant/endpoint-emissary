export const safeParse = (body) => {
  try {
    return JSON.parse(body);
  } catch (error) {
    return {};
  }
};

export const BASE_URL = "http://localhost:5000/api";
