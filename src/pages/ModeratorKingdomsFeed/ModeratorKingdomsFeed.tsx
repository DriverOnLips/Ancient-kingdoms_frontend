import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

import { useKingdom } from "../../hooks/useKingdom";
import { useApp } from "../../hooks/useApp";
import Loader from "../../components/UI/Loader/Loader";
import MyModal from "../../components/UI/Modal/Modal";
import { errorMatching } from "../../utils/namesMatching/errorMatching";
import { Kingdom } from "../../Interfaces/dataStructures/KingdomInterface";
import KingdomItem from "../../components/KingdomItem/KingdomItem";
import TableKingdomHeader from "../../components/UI/Tables/KingdomHeader/TableKingdomHeader";
import { useNavigate } from "react-router-dom";


const ModeratorKingdomsFeed: React.FC = () => {
  const navigate = useNavigate();

  const [modalShow, setModalShow] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalText, setModalText] = useState('');
  const [modalError, setModalError] = useState('');
  const [modalVariant, setModalVariant] = useState('');
  const [modalCanselText, setModalCanselText] = useState('');
  const [modalSaveText, setModalSaveText] = useState('');

  const [isLoaded, setIsLoaded] = useState(false); 

  const { kingdoms, setKingdoms } = useKingdom();

  const { setCurrentPage, 
    deleteCurrentPage,
  } = useApp();

  useEffect(() => {
    setCurrentPage('Все княжества');

    return () => {
      deleteCurrentPage();
    }
  }, []);

  useEffect(() => {
    setKingdoms('')
      .then(result => {
        if (!result.result) {
          setModalTitle('Ошибка');
          setModalText('Детали ошибки:');
          setModalError(errorMatching(result.response?.Message!));
          setModalVariant('');
          setModalCanselText('Закрыть');
          setModalShow(true);

          setIsLoaded(true);

          return;
        }
        
        setIsLoaded(true);
      })
      .catch(error => {
        setModalTitle('Ошибка');
        setModalText('Детали ошибки:');
        setModalError(errorMatching(error));
        setModalVariant('');
        setModalCanselText('Закрыть');
        setModalShow(true);

        setIsLoaded(true);
      });
          
    return () => {
      deleteCurrentPage();
    }
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
        onHide={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="kingdom-page">
      <div className="page">
        <div className="content">
          <Container className="feed-kingdoms">
            <Row>
              <Col className="moderator_kingdoms_feed__subtitle_div">
                <span className="text-h2-medium">
                  Выберите княжество для редактирования
                </span>
                <Button onClick={() => navigate('/kingdom_add')}>
                  Добавить новое княжество
                </Button>
              </Col>
            </Row>
            <TableKingdomHeader kingdoms={kingdoms} />
          </Container>
        </div>
      </div>
    </div>   
  );

}

export default ModeratorKingdomsFeed;