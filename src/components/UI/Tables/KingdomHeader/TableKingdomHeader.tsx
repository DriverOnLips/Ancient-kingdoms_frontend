import { useNavigate } from 'react-router-dom';
import { Table } from 'react-bootstrap';

import { Kingdom } from '../../../../Interfaces/dataStructures/KingdomInterface';
import { KingdomStatusSelector } from '../../Selector/KingdomStatusSelector';


function TableKingdomHeader({ kingdoms } : {kingdoms: Kingdom[]} ) {
  const navigate = useNavigate();

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Название</th>
          <th className='table_kingdom_header__header__image'>Герб</th>
          <th>Столица</th>
          <th>Площадь</th>
          <th>Статус</th>
        </tr>
      </thead>
      <tbody>
        {kingdoms?.map((kingdom: Kingdom) => (
          <tr key={kingdom.Id} 
          onClick={event => {
            event.preventDefault();
            navigate(`/kingdom_edit/${kingdom.Id}`);
          }}
          className='table_kingdom_header__item'>
            <td>{kingdom.Id}</td>
            <td>{kingdom.Name}</td>
            <td className='table_kingdom_header__record__image'>
              <img className='table_kingdom_header__record__image-img'
              src={kingdom.Image} />
            </td>
            <td>{kingdom.Capital}</td>
            <td>{kingdom.Area}</td>
            <td>
              <KingdomStatusSelector kingdomId={kingdom.Id} 
              defaultValue={kingdom.State}/>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default TableKingdomHeader;
