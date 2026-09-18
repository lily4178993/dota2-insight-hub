import React from 'react';
import { ItemCard } from '../../components';

function UniqueItemPage() {
  return (
    <div>
      <div className="relative">
        {/*
          La card ici sert d'un petit réumé avec quelques valeurs (coût, nom, image, etc..)
         */}
        <ItemCard />
      </div>
      {/*
        ici une div pour le nom, le description, les autres infos
       */}
    </div>
  );
}

export default UniqueItemPage;
