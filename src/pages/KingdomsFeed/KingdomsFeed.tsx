import React, { useState, useEffect } from 'react';
import { InputGroup, Form, Row, Container } from 'react-bootstrap';

import KingdomItem from '../../components/KingdomItem/KingdomItem';
import { Kingdom } from "../../Interfaces/KingdomInterface";
import { KingdomsApi } from '../../utils/api/KingdomsApi/KingdomsApi';
import Loader from '../../components/UI/Loader/Loader';


const KingdomsFeed: React.FC = () => {
  const kingdomsApi = new KingdomsApi();

  const [kingdomName, setKingdomName] = useState<string>('');

  const [kingdoms, setKingdoms] = useState<Kingdom[]>();

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const loadKingdoms = async () => {
      const result = await kingdomsApi.getKingdomsByName(kingdomName);
      setKingdoms(result.Body);
      setIsLoaded(true);
    }
    loadKingdoms();
  }, [kingdomName]);

  if (!isLoaded) {
    return <Loader />;
  }

  return (
    <div className="kingdom-page">
      <div className="page">
        <div className="content">
          <InputGroup className="kingdom-page__search">
            <Form.Control
              placeholder="Введите название королевства"
              aria-label="Username"
              value={kingdomName}
              onChange={e => setKingdomName(e.target.value)}
            />
          </InputGroup>
          <Container className="feed-kingdoms">
            <Row style={{justifyContent: 'center'}}>
              {kingdoms?.map((kingdom: Kingdom) => (
                <KingdomItem 
                key={kingdom.Id}
                kingdom={kingdom}
                />              
              ))}
            </Row>
          </Container>
        </div>
      </div>
    </div>   
  );
}

export default KingdomsFeed;
