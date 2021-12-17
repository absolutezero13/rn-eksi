import axios from 'axios';
import {IUser, Topic, TopicEntriesResponse} from './interfaces';

const baseURL = 'https://eksisozluk-api.herokuapp.com/api';

export const getTopics = async (): Promise<Topic[]> => {
  const response = await axios.get(`${baseURL}/basliklar`);
  return response.data;
};

export const getTopicEntries = async (
  slug: string,
  currentPage: number,
): Promise<TopicEntriesResponse> => {
  console.log('url', `${baseURL}/baslik${slug}?p=${currentPage}`);
  const response = await axios.get(`${baseURL}/baslik${slug}&p=${currentPage}`);
  return response.data;
};

export const getUser = async (nick: string): Promise<IUser> => {
  const response = await axios.get(`${baseURL}/biri/${nick}`);
  return response.data;
};
