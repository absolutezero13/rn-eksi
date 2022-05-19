import axios from 'axios';
import {handleError} from './errorhandler';
import {
  AutoCompleteResults,
  DebeResponse,
  IUser,
  SearchResults,
  Topic,
  TopicEntriesResponse,
} from './interfaces';

const baseURL = 'https://eksisozluk-api.herokuapp.com/api';

export const getTopics = async (): Promise<Topic[] | []> => {
  try {
    const response = await axios.get(`${baseURL}/basliklar`);
    return response.data;
  } catch (error) {
    handleError(error);
    return [];
  }
};

export const getTopicEntries = async (
  slug: string,
  currentPage: number,
  isSearch: boolean,
): Promise<TopicEntriesResponse | []> => {
  try {
    const response = await axios.get(
      `${baseURL}/baslik${slug}${isSearch ? '?' : '&'}p=${currentPage}`,
    );
    return response.data;
  } catch (error) {
    handleError(error);
    return [];
  }
};

export const getDebe = async (): Promise<DebeResponse | []> => {
  try {
    const response = await axios.get(`${baseURL}/debe`);
    return response.data;
  } catch (error) {
    handleError(error);
    return [];
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

export const getSearchResults = async (
  query: string,
): Promise<SearchResults | null> => {
  try {
    console.log(`${baseURL}/ara/${query}`);
    const response = await axios.get(`${baseURL}/ara/${query}`);
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};
