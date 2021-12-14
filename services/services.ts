import axios from 'axios';
import {IEntry, Topic} from './interfaces';

const baseURL = 'https://eksisozluk-api.herokuapp.com/api';

export const getTopics = async (): Promise<Topic[]> => {
  const response = await axios.get(`${baseURL}/basliklar`);
  return response.data;
};

export const getTopicEntries = async (
  slug: string,
  currentPage: number,
): Promise<{entries: IEntry[]}> => {
  console.log('url', `${baseURL}/baslik${slug}?p=${currentPage}`);
  const response = await axios.get(`${baseURL}/baslik${slug}&p=${currentPage}`);
  return response.data;
};
