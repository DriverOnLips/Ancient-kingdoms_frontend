import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form, Container, Row, Image, Col, ModalTitle } from 'react-bootstrap';

import 'react-datepicker/dist/react-datepicker.css';

import { useKingdom } from '../../hooks/useKingdom';
import Loader from "../../components/UI/Loader/Loader";
import MyModal from "../../components/UI/Modal/Modal";
import { useApp } from "../../hooks/useApp";
import { useAuth } from "../../hooks/useAuth";
import { KingdomCreateStatusSelector } from "../../components/UI/Selector/KingdomStatusSelector";


const ModeratorAddAndEditKingdom: React.FC<{ add: boolean }> = ({ add }) => {
  const [modalShow, setModalShow] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalText, setModalText] = useState('');
  const [modalError, setModalError] = useState('');
  const [modalVariant, setModalVariant] = useState('');
  const [modalCanselText, setModalCanselText] = useState('');
  const [modalSaveText, setModalSaveText] = useState('');
  const [modalHandleSaveMode, setModalHandleSaveMode] = useState<Number | null>(null);

  const [isLoaded, setIsLoaded] = useState(false); 

  const { isAuthorized, isModerator } = useAuth();
 
  const { kingdom, setKingdom, deleteKingdom } = useKingdom();

  const { setCurrentPage, deleteCurrentPage } = useApp();

  const { id } = useParams();

  const navigate = useNavigate();

  const updateKingdom = () => {
    
   
  }

  useEffect(() => {
    switch (add) {
      case true:
        setCurrentPage('Просмотр княжества');

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
        setCurrentPage('Добавление княжества ');

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

  if (add) {
    return (
      <div className="kingdom-page">
        <div className="kingdom" style={{ marginTop: '56px'}}>
          <div className="kingdom__title mt-4 text-base1-medium">
            <h2>{kingdom.Name}</h2>
          </div>
          <Container>
            <Row style={{ justifyContent: 'center' }}>
              <Col xs={4}>
                <Image src={kingdom.Image} alt={kingdom.Name} style={{ width: '100%' }} rounded />
              </Col>
              <Col xs={4}>
                <Form>
                  <Form.Group className="mb-3" controlId="kingdomArea">
                    <Form.Label>Площадь</Form.Label>
                    <Form.Control type="text" 
                    disabled = {!isModerator} 
                    value={kingdom.Area} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="kingdomCapital">
                    <Form.Label>Столица</Form.Label>
                    <Form.Control type="text"
                    disabled = {!isModerator}
                    value={kingdom.Capital} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="kingdomDescription">
                    <Form.Label>О княжестве</Form.Label>
                    <Form.Control as="textarea" rows={3} 
                    type="text" disabled = {!isModerator} 
                    value={kingdom.Description} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="kingdomState">
                    <Form.Label>Статус</Form.Label>
                    <Form.Control type="text" 
                    disabled = {!isModerator} value={kingdom.State} />
                  </Form.Group>
                </Form>
              </Col>
              <Row className="moderator_add_and_edit_kingdom_page__buttons">
                <Button variant="danger">
                  Удалить
                </Button>
                <Button>
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
              <Image alt={'загрузите изображение'}
              style={{ width: '100%' }} rounded />
            </Col>
            <Col xs={4}>
              <Form>
                <Form.Group className="mb-3" controlId="kingdomName">
                  <Form.Label>Название</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="kingdomArea">
                  <Form.Label>Площадь</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="kingdomCapital">
                  <Form.Label>Столица</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="kingdomDescription">
                  <Form.Label>О княжестве</Form.Label>
                  <Form.Control as="textarea" rows={3} type="text" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="kingdomState">
                  <Form.Label>Статус</Form.Label>
                  <KingdomCreateStatusSelector /> 
                </Form.Group>
              </Form>
            </Col>
            <Row className="moderator_add_and_edit_kingdom_page__buttons">
              <Button>
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
