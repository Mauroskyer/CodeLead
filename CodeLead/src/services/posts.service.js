import api from "./api.js";

export const getPosts = async () => {
  const { data } = await api.get("/");
  return data.results;
};

export const createPost = async (post) => {
  const { data } = await api.post("/", post);
  return data;
};

export const deletePost = async (id) => {
  await api.delete(`/${id}/`);
};

export const updatePost = async (id, payload) => {
  const { data } = await api.patch(`/${id}/`, payload);
  return data;
};
