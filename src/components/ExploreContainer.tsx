import React from 'react';
import './ExploreContainer.css';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="container">
      <p>YA NO SUPE QUE MAS PONER, PERO ME GUSTA MUCHO LA SERIE 👌</p>
    </div>
  );
};

export default ExploreContainer;
