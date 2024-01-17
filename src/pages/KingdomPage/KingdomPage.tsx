import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Container, Row, Image, Col } from 'react-bootstrap';

import { Kingdom } from "../../Interfaces/KingdomInterface";
import { KingdomsApi } from "../../utils/api/KingdomsApi/KingdomsApi";
import Loader from "../../components/UI/Loader/Loader";


const KingdomPage: React.FC = () => {
  const kingdomsApi = new KingdomsApi();

  const [kingdom, setKingdom] = useState<Kingdom>();

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (!id || !/^\d+$/.test(id)) {
      return navigate('/Ancient-kingdoms_frontend/kingdom');
    }

    const loadKingdom = async () => {
      const result = await kingdomsApi.getKingdomById(+id);
      setKingdom(result.Body);
      setIsLoaded(true);
    }
    loadKingdom();
  }, []);

  if (!isLoaded) {
    return <Loader />;
  }

  return (
    <div className="kingdom-page">
      <div className="kingdom" style={{ marginTop: '56px'}}>
        <div className="kingdom__title mt-4 text-base1-medium">
          <h2>{kingdom!.Name}</h2>
        </div>
        <Container>
          <Row style={{ justifyContent: 'center' }}>
            <Col xs={4}>
              <Image src={kingdom!.Image} alt={kingdom!.Name} style={{ width: '100%' }} rounded />
            </Col>
            <Col xs={4}>
              <Form>
                <Form.Group className="mb-3" controlId="kingdomArea">
                  <Form.Label>Площадь</Form.Label>
                  <Form.Control type="text" 
                  disabled = {true} 
                  value={kingdom!.Area} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="kingdomCapital">
                  <Form.Label>Столица</Form.Label>
                  <Form.Control type="text"
                  disabled = {true} 
                  value={kingdom!.Capital} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="kingdomDescription">
                  <Form.Label>О княжестве</Form.Label>
                  <Form.Control as="textarea" rows={3} 
                  type="text" 
                  disabled = {true}
                  value={kingdom!.Description} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="kingdomState">
                  <Form.Label>Статус</Form.Label>
                  <Form.Control type="text" 
                  disabled = {true} 
                  value={kingdom!.State} />
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default KingdomPage;
