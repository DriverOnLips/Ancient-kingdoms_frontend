import { Form } from "react-bootstrap";
import { useState, useEffect, ChangeEvent } from "react";

import MyModal from "../Modal/Modal";
import { useKingdom } from "../../../hooks/useKingdom";


export const KingdomStatusSelector: React.FC<{kingdomId: number, defaultValue: string}> = 
  ({kingdomId, defaultValue}) => {

  const [modalShow, setModalShow] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalText, setModalText] = useState('');
  const [modalError, setModalError] = useState('');
  const [modalVariant, setModalVariant] = useState('');
  const [modalCanselText, setModalCanselText] = useState('');
  const [modalSaveText, setModalSaveText] = useState('');

  const { updateKingdomStatus } = useKingdom();

  const handleStatusChange = (status: string) => {
    updateKingdomStatus(kingdomId, status)
      .then(result => {
        if (!result.result) {
          setModalTitle('Ошибка');
          setModalText('Детали ошибки')
          setModalError(result.response?.Message!);
          setModalCanselText('Закрыть');
          setModalVariant('');
          setModalShow(true);

          return;
        }

        // setModalTitle('Статус обновлен');
        // setModalText('')
        // setModalError('');
        // setModalCanselText('');
        // setModalSaveText('');
        // setModalVariant('withProgress');
        // setModalShow(true);
      })
      .catch(error => {
        setModalTitle('Ошибка');
        setModalText('Детали ошибки')
        setModalError(error);
        setModalCanselText('Закрыть');
        setModalVariant('');
        setModalShow(true);
      });
  }

  if (modalShow) {
    return (
      <MyModal 
        title={modalTitle}
        text={modalText}
        error={modalError}
        show={modalShow}
        variant={modalVariant}
        canselText={modalCanselText}
        saveText={modalSaveText}
        onHide={() => {
          setModalTitle('');
          setModalText('');
          setModalError('');
          setModalVariant('');
          setModalCanselText('');
          setModalSaveText('');
          setModalShow(false);
        }}
      />
    );
  }

  return (
    <Form.Select onClick={event => event.stopPropagation()}
    className="kingdom_status_selector" defaultValue={defaultValue} 
    onChange={(event) => handleStatusChange(event.target.value)}>
      <option value="" disabled hidden>Выберите новый статус княжества</option>
      <option value="Данные подтверждены">Данные подтверждены</option>
      <option value="Данные утеряны">Данные утеряны</option>
    </Form.Select>
  );
}

interface KingdomCreateStatusSelectorProps {
  onSelectChange: (value: string) => void;
}
 
 export const KingdomCreateStatusSelector: React.FC<KingdomCreateStatusSelectorProps> = 
  ({ onSelectChange }) => {
    
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onSelectChange(event.target.value);
  };
 
  return (
    <Form.Select 
      onClick={event => event.stopPropagation()}
      className="kingdom_status_selector" 
      defaultValue={""}
      onChange={handleChange}
    >
      <option value="" disabled>Выберите статус княжества</option>
      <option value="Данные подтверждены">Данные подтверждены</option>
      <option value="Данные утеряны">Данные утеряны</option>
    </Form.Select>
  );
 };