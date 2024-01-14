import { Form } from "react-bootstrap";
import { useState, useEffect, ChangeEvent } from "react";

import { useApp } from "../../../hooks/useApp";
import { useApplication } from "../../../hooks/useApplication";
import MyModal from "../Modal/Modal";


export const KingdomStatusSelector: React.FC<{kingdomId: number, defaultValue: string}> = 
  ({kingdomId, defaultValue}) => {

  const [modalShow, setModalShow] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalText, setModalText] = useState('');
  const [modalError, setModalError] = useState('');
  const [modalVariant, setModalVariant] = useState('');
  const [modalCanselText, setModalCanselText] = useState('');
  const [modalSaveText, setModalSaveText] = useState('');

  const { updateApplicationStatus } = useApplication();

  const handleStatusChange = (status: string) => {
    updateApplicationStatus(kingdomId, status) // kingdom
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

        setModalTitle('Статус обновлен');
        setModalText('')
        setModalError('');
        setModalCanselText('');
        setModalSaveText('');
        setModalVariant('withProgress');
        setModalShow(true);
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

export const KingdomCreateStatusSelector: React.FC = () => {
  return (
    <Form.Select onClick={event => event.stopPropagation()}
    className="kingdom_status_selector" defaultValue={""}>
      <option value="" disabled>Выберите статус княжества</option>
      <option value="Данные подтверждены">Данные подтверждены</option>
      <option value="Данные утеряны">Данные утеряны</option>
    </Form.Select>
  );
}
