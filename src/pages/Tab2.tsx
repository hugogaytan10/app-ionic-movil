import React, { useContext, useEffect, useState } from 'react';
import { IonAlert, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import { AppContext } from '../context/AppContext';

const Tab2: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const context = useContext(AppContext);
  const deleteCharacter = async (id: number) => {
    context.setFavorite(prevFavorites => {
      const newFavorites = prevFavorites?.filter(favorite => favorite.id !== id);
      return newFavorites;
    });
  }
  useEffect(() => {
    console.log(context.favorite)
  }, [context.favorite])
  return (
    <IonPage>
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle>Favoritos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <IonGrid>
          <IonRow className="ion-justify-content-center ion-align-items-center">
            {
              context.favorite != undefined &&
              context.favorite.map((character, idx) => {
                return (
                  <IonCard key={idx}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <img alt="Silhouette of mountains" src={character.image} style={{ width: '100%', height: 'auto' }} />
                    </div>
                    <IonCardHeader>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
                        <IonCardTitle>{character.name}</IonCardTitle>
                        <p style={{ color: character.status === "Alive" ? 'green' : 'red' }}>{character.status}</p>
                      </div>
                      <IonCardSubtitle>{character.location.name}</IonCardSubtitle>
                    </IonCardHeader>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>

                      <IonCardContent>{character.origin.name}</IonCardContent>

                      <IonButton onClick={() => {setIsOpen(true) }}>Eliminar</IonButton>
                      <IonAlert
                        isOpen={isOpen}
                        header="Alto"
                        subHeader="Importante!"
                        message="¿Estás seguro de eliminarlo de favoritos?"
                        buttons={[
                          {
                            text: 'Cancelar',
                            role: 'cancel',
                            handler: () => setIsOpen(false)
                          },
                          {
                            text: 'Eliminar',
                            handler: () => {deleteCharacter(character.id); setIsOpen(false);}
                          }
                        ]}
                        onDidDismiss={() => setIsOpen(false)}
                      />
                    </div>
                  </IonCard>
                )
              })
            }
          </IonRow>
        </IonGrid>


      </IonContent>
    </IonPage>
  );
};

export default Tab2;
