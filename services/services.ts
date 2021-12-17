import axios from 'axios';
import {handleError} from './errorHandler';
import {
  AutoCompleteResults,
  IUser,
  Topic,
  TopicEntriesResponse,
} from './interfaces';

const baseURL = 'https://eksisozluk-api.herokuapp.com/api';

export const getTopics = async (): Promise<Topic[] | undefined> => {
  try {
    const response = await axios.get(`${baseURL}/basliklar`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getTopicEntries = async (
  slug: string,
  currentPage: number,
): Promise<TopicEntriesResponse | undefined> => {
  try {
    const response = await axios.get(
      `${baseURL}/baslik${slug}&p=${currentPage}`,
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getUser = async (nick: string): Promise<IUser | undefined> => {
  try {
    const response = await axios.get(`${baseURL}/biri/${nick}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const autoComplete = async (
  query: string,
): Promise<AutoCompleteResults | undefined> => {
  try {
    const response = await axios.get(`${baseURL}/autocomplete/${query}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
