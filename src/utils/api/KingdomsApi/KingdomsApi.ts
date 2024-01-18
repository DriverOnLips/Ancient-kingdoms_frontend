import axios from 'axios';

import { ResponseDefault } from '../ResponseInterface';
import { Kingdom } from '../../../Interfaces/KingdomInterface';


export class KingdomsApi {
  private static instance: KingdomsApi;
  private config!: { name: string, url: string }[];

  constructor() {
    if (KingdomsApi.instance) {
      return KingdomsApi.instance;
    }

    KingdomsApi.instance = this;
    this.config = [
      { name: 'getKingdomsByName', url: '/api/kingdoms' },
      { name: 'getKingdomById', url: '/api/kingdom' },
      { name: 'updateKingdom', url: '/api/kingdom/update' },
      { name: 'createKingdom', url: '/api/kingdom/create' },
      { name: 'updateKingdomStatus', url: '/api/kingdom/update/status' },
    ];
  }

  getKingdomsByName = async (kingdomName: string): Promise<ResponseDefault> => {
    const configItem = this.config.find((item) => item.name === 'getKingdomsByName');
    if (!configItem) {
      throw new Error('Не найдена конфигурация для getKingdoms');
    }

    const headers = {
      credenlials: 'include',
    }

    return axios.get(configItem.url, 
      {
        headers,
        params: {
          'Kingdom_name': kingdomName,
        }
      })
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          return error.response.data;
        });
  }

  getKingdomById = async (id: Number): Promise<ResponseDefault> => {
    const configItem = this.config.find((item) => item.name === 'getKingdomById');
    if (!configItem) {
      throw new Error('Не найдена конфигурация для getKingdomById');
    }

    const headers = {
      credenlials: 'include',
    }

    return axios.get(configItem.url, 
      {
        headers,
        params: {
          'Id': id,
        }
      },
      )
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          return error.response.data;
        });
  }

  updateKingdom = async (kingdomToUpdate: Kingdom): Promise<ResponseDefault> => {
    const configItem = this.config.find((item) => item.name === 'updateKingdom');
    if (!configItem) {
      throw new Error('Не найдена конфигурация для updateKingdom');
    }

    const headers = {
      credenlials: 'include',
    }

    const body = kingdomToUpdate;

    return axios.put(
      configItem.url,
      body, 
      {
        headers,
      },
      )
        .then((res) => {
          return  res.data;
        })
        .catch((error) => {
          return error.response.data;
        });
  }

  createKingdom = async (kingdomToCreate: Kingdom): Promise<ResponseDefault> =>  {
    const configItem = this.config.find((item) => item.name === 'createKingdom');
    if (!configItem) {
      throw new Error('Не найдена конфигурация для createKingdom');
    }

    const headers = {
      credenlials: 'include',
    }

    const body = kingdomToCreate;

    return axios.post(
      configItem.url, 
      body, 
      {
        headers,
      },
      )
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          return error.response.data;
        });
  }

  updateKingdomStatus = async (kingdomId: Number, state: string): Promise<ResponseDefault> => {
    const configItem = this.config.find((item) => item.name === 'updateKingdomStatus');
    if (!configItem) {
      throw new Error('Не найдена конфигурация для updateKingdomStatus');
    }

    const headers = {
      credenlials: 'include',
    }

    const body = {
      Id: kingdomId,
      State: state,
    }

    return axios.put(
      configItem.url,
      body, 
      {
        headers,
      },
      )
        .then((res) => {
          return  res.data;
        })
        .catch((error) => {
          return error.response.data;
        });
  }

}
