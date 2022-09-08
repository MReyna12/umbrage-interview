const token = localStorage.getItem("token");

const settings = {
  get: {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  },
};

export default settings;
