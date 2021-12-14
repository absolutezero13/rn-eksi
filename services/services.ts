import axios from 'axios';
import {IEntry, Topic} from './interfaces';

const baseURL = 'https://eksisozluk-api.herokuapp.com/api';

export const getTopics = async (): Promise<Topic[]> => {
  const response = await axios.get(`${baseURL}/basliklar`);
  return response.data;
};

export const getTopicEntries = async (
  slug: string,
): Promise<{entries: IEntry[]}> => {
  const response = await axios.get(`${baseURL}/baslik${slug}`);
  return response.data;
};
