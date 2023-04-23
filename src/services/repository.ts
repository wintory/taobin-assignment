import ApiClient from './axios';

export const getRepositories = async (page: number, limit: number) => {
  try {
    const result = await ApiClient.get(
      `/search/repositories?q=tetris+language:assembly&page=${page}&per_page=${limit}`
    );

    return result?.data;
  } catch (err) {
    console.error(err);
    return undefined;
  }
};
