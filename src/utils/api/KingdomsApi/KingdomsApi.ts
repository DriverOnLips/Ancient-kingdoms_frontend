import axios from 'axios';

import { ResponseDefault } from '../ResponseInterface';
import { mockedGetKingdom, mockedGetKingdoms } from '../../KingdomsMock/KingdomsMock';


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
          console.log('res', res);
          
          return res.data;
        })
        .catch((error) => {
          console.log('error', error);

          const mockedResponse: ResponseDefault = {
            Code: 503,
            Status: 'Сервер недоступен',
            Message: '',
            Body: mockedGetKingdoms(),
          }

          return mockedResponse;
        });
  }

  getKingdomById = async (id: number): Promise<ResponseDefault> => {
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
        .catch(() => {
          const mockedResponse: ResponseDefault = {
            Code: 503,
            Status: 'Сервер недоступен',
            Message: '',
            Body: mockedGetKingdom(id),
          }
          console.log(mockedResponse)
          return mockedResponse;
        });
  }
}
