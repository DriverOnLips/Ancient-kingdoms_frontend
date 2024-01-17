import React from "react";
import { useNavigate } from "react-router-dom";
import { Col } from "react-bootstrap";

import 'react-datepicker/dist/react-datepicker.css';
import { Kingdom } from "../../Interfaces/KingdomInterface";


const KingdomItem: React.FC<{ kingdom: Kingdom }> = 
  ({ kingdom }) => {

  const navigate = useNavigate();

  return (
    <Col xs={12} sm={8} md={4} lg={3} 
    className={`feed-kingdom feed-kingdom__kingdom-${kingdom.Id} m-1 p-1`}>
      <Col onClick={() => navigate(`/Ancient-kingdoms_frontend/kingdom/${kingdom.Id}`)}>
        <div className="feed-kingdom__kingdom_title mb-3">
          <div className="feed-kingdom__kingdom_title-text text-h2-medium">{kingdom.Name}</div>
        </div>
        <div className="feed-kingdom__kingdom_img p-1 mb-3">
          <img src={kingdom.Image} alt={kingdom.Name} className="w-100" />
        </div>
        <div 
          className="feed-kingdom__kingdom_btns mb-1"
          onClick={(e) => e.stopPropagation()}
        >
        </div>
      </Col>
    </Col>
  );
}

export default KingdomItem;
