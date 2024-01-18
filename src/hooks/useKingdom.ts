import { useDispatch, useSelector } from "react-redux";

import { KingdomsApi } from "../utils/api/KingdomsApi/KingdomsApi";
import { SetKingdoms, 
  SetKingdom, 
  DeleteKingdom,
  UpdateKingdomStatus } from '../stores/KingdomStore';
import { ResponseDefault } from "../utils/api/ResponseInterface";
import { Kingdom } from "../Interfaces/dataStructures/KingdomInterface";


export function useKingdom () {
  const kingdomsApi = new KingdomsApi();
  const { kingdom, kingdoms } = useSelector((store: any) => store.kingdom);

  const dispatch = useDispatch();

  const setKingdoms = async (searchText: string) => {
    try {
      const response = await kingdomsApi.getKingdomsByName(searchText);
      if (response.Status === 'ok') {  // case successful
        dispatch(SetKingdoms(response.Body));

        return { result: true, response };
      } else if (response.Status === 'error') {  // case error
        return { result: false, response };
      } else {  // case no connent to server
        const response: ResponseDefault = {
          Code: 503,
          Status: 'error',
          Message: 'Нет связи с сервером',
          Body: null,
        }
        
        return { result: false, response};
      }

    } catch (error: any) {
      const response: ResponseDefault = {
        Code: 418,
        Status: 'undefined error',
        Message: error,
        Body: null,
      }

      return { result: false, response };
    }
  }

  const setKingdom = async (kingdomId: Number) => {
    try {
      const response = await kingdomsApi.getKingdomById(kingdomId);
      if (response.Status === 'ok') {  // case successful
        dispatch(SetKingdom(response.Body));

        return { result: true, response };
      } else if (response.Status === 'error') {  // case error
        return { result: false, response };
      } else {  // case no connent to server
        const response: ResponseDefault = {
          Code: 503,
          Status: 'error',
          Message: 'Нет связи с сервером',
          Body: null,
        }

        return { result: false, response};
      }

    } catch (error: any) {
      const response: ResponseDefault = {
        Code: 418,
        Status: 'undefined error',
        Message: error,
        Body: null,
      }

      return { result: false, response };
    }
  }

  const updateKingdom = async (kingdomToUpdate: Kingdom) => {
    try {
      const response = await kingdomsApi.updateKingdom(kingdomToUpdate);
      if (response.Status === 'ok') {  // case successful
        return { result: true, response };
      } else if (response.Status === 'error') {  // case error
        return { result: false, response };
      } else {  // case no connent to server
        const response: ResponseDefault = {
          Code: 503,
          Status: 'error',
          Message: 'Нет связи с сервером',
          Body: null,
        }

        return { result: false, response};
      }

    } catch (error: any) {
      const response: ResponseDefault = {
        Code: 418,
        Status: 'undefined error',
        Message: error,
        Body: null,
      }

      return { result: false, response };
    }
  }

  const createKingdom = async (kingdomToCreate: Kingdom) => {
    try {
      const response = await kingdomsApi.createKingdom(kingdomToCreate);
      if (response.Status === 'ok') {  // case successful
        return { result: true, response };
      } else if (response.Status === 'error') {  // case error
        return { result: false, response };
      } else {  // case no connent to server
        const response: ResponseDefault = {
          Code: 503,
          Status: 'error',
          Message: 'Нет связи с сервером',
          Body: null,
        }

        return { result: false, response};
      }

    } catch (error: any) {
      const response: ResponseDefault = {
        Code: 418,
        Status: 'undefined error',
        Message: error,
        Body: null,
      }

      return { result: false, response };
    }
  }

  const updateKingdomStatus = async (kingdomId: number, state: string) => {
    try {
      const response = await kingdomsApi.updateKingdomStatus(kingdomId, state);
      if (response.Status === 'ok') {  // case successful
        dispatch(UpdateKingdomStatus({id: kingdomId, state}));

        return { result: true, response };
      } else if (response.Status === 'error') {  // case error
        return { result: false, response };
      } else {  // case no connent to server
        const response: ResponseDefault = {
          Code: 503,
          Status: 'error',
          Message: 'Нет связи с сервером',
          Body: null,
        }

        return { result: false, response};
      }

    } catch (error: any) {
      const response: ResponseDefault = {
        Code: 418,
        Status: 'undefined error',
        Message: error,
        Body: null,
      }

      return { result: false, response };
    }
  }


  const deleteKingdom = () => {
    dispatch(DeleteKingdom());
  }

  return {
    kingdom,
    kingdoms,
    setKingdoms,
    setKingdom,
    updateKingdom,
    createKingdom,
    deleteKingdom,
    updateKingdomStatus,
  }

}
