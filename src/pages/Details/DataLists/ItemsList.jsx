import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card } from '../../../components';

function ItemsList({ itemsData }) {
  return (
    <section>
      <div>
        <h1>ItemsList</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae
          labore quia optio velit autem perspiciatis magni!
        </p>
      </div>
      <div className="detailsList-container">
        {itemsData.length > 0 ? (
          itemsData.map((item) => (
            <Link to={`/details/items/${item.id}`} key={item.id}>
              <Card
                cardImage={`https://api.opendota.com${item?.img}`}
                cardTitle={item?.dname}
                cardCount={item?.cost}
              />
            </Link>
          ))
        )
          : (<p>List of Items not found</p>)}
      </div>
    </section>
  );
}

ItemsList.propTypes = {
  itemsData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default ItemsList;
