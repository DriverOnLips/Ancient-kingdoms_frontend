import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form, Container, Row, Image, Col, ModalTitle, InputGroup } from 'react-bootstrap';

import 'react-datepicker/dist/react-datepicker.css';

import { useKingdom } from '../../hooks/useKingdom';
import Loader from "../../components/UI/Loader/Loader";
import MyModal from "../../components/UI/Modal/Modal";
import { useApp } from "../../hooks/useApp";
import { KingdomCreateStatusSelector, KingdomStatusSelector } from "../../components/UI/Selector/KingdomStatusSelector";
import { Kingdom } from "../../Interfaces/dataStructures/KingdomInterface";


const ModeratorAddAndEditKingdom: React.FC<{ add: boolean }> = ({ add }) => {
  const [modalShow, setModalShow] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalText, setModalText] = useState('');
  const [modalError, setModalError] = useState('');
  const [modalVariant, setModalVariant] = useState('');
  const [modalCanselText, setModalCanselText] = useState('');
  const [modalSaveText, setModalSaveText] = useState('');
  const [modalHandleSaveMode, setModalHandleSaveMode] = useState<Number | null>(null);

  const [kingdomName, setKingdomName] = useState('');
  const [kingdomArea, setKingdomArea] = useState<number | null>(null);
  const [kingdomCapital, setKingdomCapital] = useState('');
  const [kingdomImage, setKingdomImage] = useState('');
  const [kingdomDescription, setKingdomDescription] = useState('');
  const [kingdomStatus, setKingdomStatus] = useState('');
  
  const [isLoaded, setIsLoaded] = useState(false); 

  const { kingdom, 
    setKingdom, 
    deleteKingdom, 
    updateKingdom,
    createKingdom } = useKingdom();

  const { setCurrentPage, deleteCurrentPage } = useApp();

  const { id } = useParams();

  const navigate = useNavigate();

  const [preview, setPreview] = useState('');

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files ? event.target.files[0] : null;

    if (!image) return;
   
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = 'data:image/png;base64,' + 
                            reader.result?.toString().split(',')[1];
      setKingdomImage(base64String ? base64String : '');

      setPreview((reader.result as string) || '');
    };
    
    reader.readAsDataURL(image);

  };

  const handleKingdomStatusSelectorChange = (selectedValue: string) => {
    setKingdomStatus(selectedValue);
  };
   
  const checkAndCreateKingdom = () => {
    if (!( kingdomName && kingdomArea && kingdomCapital &&
           kingdomImage && kingdomDescription && kingdomStatus !== '' )) {

      setModalTitle('Ошибка');
      setModalText('Заполните все поля');
      setModalError('');
      setModalCanselText('Закрыть');
      setModalVariant('');
      setModalShow(true);

      return;
    }

    const kingdomToCreate: Kingdom = {
      Id: 0,
      Name: kingdomName,
      Area: kingdomArea,
      Capital: kingdomCapital,
      Image: kingdomImage,
      Description: kingdomDescription,
      State: kingdomStatus,
    };

    createKingdom(kingdomToCreate)
      .then(result => {
        if (!result.result) {
          setModalTitle('Ошибка');
          setModalText('Детали ошибки');
          setModalError(result.response?.Message!);
          setModalCanselText('Закрыть');
          setModalVariant('');
          setModalShow(true);

          return;
        }

        setModalTitle('Княжество успешно добавлено'); // добавить переход
        setModalText('')
        setModalError('');
        setModalCanselText('');
        setModalSaveText('');
        setModalVariant('withProgress');
        setModalShow(true);
      })
      .catch(error => {
        setModalTitle('Ошибка');
        setModalText('Детали ошибки');
        setModalError(error);
        setModalCanselText('Закрыть');
        setModalVariant('');
        setModalShow(true);
      });
   
  }


  const checkAndUpdateKingdom = () => {
    if (!( kingdom.Id && kingdomName && kingdomArea && kingdomCapital &&
           kingdom.Image && kingdomDescription && kingdom.State )) {

      setModalTitle('Ошибка');
      setModalText('Заполните все поля');
      setModalError('');
      setModalCanselText('Закрыть');
      setModalVariant('');
      setModalShow(true);

      return;
    }

    const updatedKingdom: Kingdom = {
      Id: kingdom.Id,
      Name: kingdomName,
      Area: kingdomArea,
      Capital: kingdomCapital,
      Image: kingdom.Image,
      Description: kingdomDescription,
      State: kingdom.State,
    };

    updateKingdom(updatedKingdom)
      .then(result => {
        if (!result.result) {
          setModalTitle('Ошибка');
          setModalText('Детали ошибки');
          setModalError(result.response?.Message!);
          setModalCanselText('Закрыть');
          setModalVariant('');
          setModalShow(true);

          return;
        }

        setModalTitle('Княжество успешно изменено');
        setModalText('')
        setModalError('');
        setModalCanselText('');
        setModalSaveText('');
        setModalVariant('withProgress');
        setModalShow(true);
      })
      .catch(error => {
        setModalTitle('Ошибка');
        setModalText('Детали ошибки');
        setModalError(error);
        setModalCanselText('Закрыть');
        setModalVariant('');
        setModalShow(true);
      });
   
  }

  useEffect(() => {
    if (!kingdom) {
      return;
    }

    setKingdomName(kingdom.Name);
    setKingdomArea(kingdom.Area);
    setKingdomCapital(kingdom.Capital);
    // setKingdomImage(kingdom.Image);
    setKingdomDescription(kingdom.Description);
  }, [kingdom])

  useEffect(() => {
    switch (add) {
      case false:
        setCurrentPage('Изменение княжества');

        if (!/^\d+$/.test(id!)) {
          setModalTitle('Ошибка');
          setModalText('Детали ошибки')
          setModalError('Неверный формат княжества');
          setModalCanselText('Закрыть');
          setModalVariant('');
          setModalShow(true);
    
          setIsLoaded(true);
        } else {
          setKingdom(+id!)
            .then(result => {
              if (!result.result) {
                setModalTitle('Ошибка');
                setModalText('Детали ошибки')
                setModalError(result.response?.Message!);
                setModalCanselText('Закрыть');
                setModalVariant('');
                setModalShow(true);
    
                setIsLoaded(true);
    
                return;
              }

              setIsLoaded(true);
            })
            .catch(error => {
              setModalTitle('Ошибка');
              setModalText('Детали ошибки:');
              setModalError(error);
              setModalVariant('');
              setModalCanselText('Закрыть');
              setModalShow(true);
    
              setIsLoaded(true);
            });
        }
        
        break;
      default:
        setCurrentPage('Добавление княжества');

        setIsLoaded(true);
        
        break;
    }    

    return () => {
      deleteKingdom();
      deleteCurrentPage();
    };
  }, []);

  if (!isLoaded) {
    return <Loader />;
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
          setModalHandleSaveMode(null);
        }}
        handleSave={() => {}}
      />
    );
  }

  if (!add) {
    return (
      <div className="kingdom-page">
        <div className="kingdom" style={{ marginTop: '56px'}}>
          <div className="kingdom__title mt-4 text-base1-medium">
            <h2>{kingdomName}</h2>
          </div>
          <Container>
            <Row style={{ justifyContent: 'center' }}>
              <Col xs={4}>
                <Image src={kingdom.Image} alt={kingdomName} style={{ width: '100%' }} rounded />
              </Col>
              <Col xs={4}>
                <Form>
                <Form.Group className="mb-3" controlId="kingdomArea">
                    <Form.Label>Название</Form.Label>
                    <Form.Control 
                    onChange={event => setKingdomName(event.target.value)}
                    type="text" 
                    value={kingdomName} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="kingdomArea">
                    <Form.Label>Площадь</Form.Label>
                    <Form.Control 
                    type="number" 
                    onChange={event => setKingdomArea(Number(event.target.value))}
                    value={kingdomArea ? kingdomArea : 0} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="kingdomCapital">
                    <Form.Label>Столица</Form.Label>
                    <Form.Control 
                    type="text"
                    onChange={event => setKingdomCapital(event.target.value)}
                    value={kingdomCapital} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="kingdomDescription">
                    <Form.Label>О княжестве</Form.Label>
                    <Form.Control as="textarea" rows={3} 
                    type="text"
                    onChange={event => setKingdomDescription(event.target.value)}
                    value={kingdomDescription} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="kingdomState">
                    <Form.Label>Статус</Form.Label>
                    <KingdomStatusSelector kingdomId={kingdom.Id} 
                    defaultValue={kingdom.State}/>
                  </Form.Group>
                </Form>
              </Col>
              <Row className="moderator_add_and_edit_kingdom_page__buttons">
                <Button variant="danger">
                  Удалить
                </Button>
                <Button onClick={() => checkAndUpdateKingdom()}>
                  Сохранить
                </Button>
              </Row>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
  
  return (
    <div className="kingdom-page">
      <div className="kingdom" style={{ marginTop: '56px'}}>
        <Container>
          <Row style={{ justifyContent: 'center' }}>
            <Col xs={4}>
              <Form.Control accept=".png,.jpg,.jpeg"
              type="file" onChange={handlePhotoChange} />
              {preview && <Image src={preview} fluid />}
            </Col>
            <Col xs={4}>
              <Form>
                <Form.Group className="mb-3" controlId="kingdomName">
                  <Form.Label>Название</Form.Label>
                  <Form.Control 
                  onChange={event => setKingdomName(event.target.value)}
                  type="text" 
                  value={kingdomName} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="kingdomArea">
                  <Form.Label>Площадь</Form.Label>
                  <Form.Control 
                  type="number" 
                  onChange={event => setKingdomArea(Number(event.target.value))}
                  value={kingdomArea ? kingdomArea : 0} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="kingdomCapital">
                  <Form.Label>Столица</Form.Label>
                  <Form.Control 
                  type="text"
                  onChange={event => setKingdomCapital(event.target.value)}
                  value={kingdomCapital} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="kingdomDescription">
                  <Form.Label>О княжестве</Form.Label>
                  <Form.Control as="textarea" rows={3} 
                  type="text"
                  onChange={event => setKingdomDescription(event.target.value)}
                  value={kingdomDescription} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="kingdomState">
                  <Form.Label>Статус</Form.Label>
                  <KingdomCreateStatusSelector 
                  onSelectChange={handleKingdomStatusSelectorChange} /> 
                </Form.Group>
              </Form>
            </Col>
            <Row className="moderator_add_and_edit_kingdom_page__buttons">
              <Button onClick={() => checkAndCreateKingdom()}>
                Сохранить
              </Button>
            </Row>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default ModeratorAddAndEditKingdom;
