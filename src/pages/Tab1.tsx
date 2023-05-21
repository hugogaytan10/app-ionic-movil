import React, { useContext, useEffect, useState } from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonList, IonPage, IonRow, IonSearchbar, IonSelect, IonSelectOption, IonToast, IonToolbar } from '@ionic/react';
import { heartOutline, heartSharp } from 'ionicons/icons';
import { AppContext } from '../context/AppContext';

interface ICharacter {
  created: string;
  episode: string[];
  gender: string;
  id: number;
  image: string;
  location: {
    name: string;
    url: string;
  };
  name: string;
  origin: {
    name: string;
    url: string;
  };
  species: string;
  status: string;
  type: string;
  url: string;
}
interface Ilike {
  id: number;
  status: number;
}
const Tab1: React.FC = () => {
  const contexto = useContext(AppContext);
  const [characteres, setCharacteres] = useState<ICharacter[]>();
  const [characteresShow, setCharacteresShow] = useState<ICharacter[]>();
  const [like, setLike] = useState<Ilike[]>();
  const [toast, setToast] = useState(false);
  const Characteres = async (page: string) => {
    try {
      const peticion = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
      const { results } = await peticion.json();
      setCharacteres(results);
      setCharacteresShow(results);
    } catch (error: any) { console.log(error) }
  }
  const searchCharacter = async (name: string) => {
    const search: ICharacter[] | undefined = characteres?.filter(item => item.name.toLowerCase().includes(name.toLowerCase()));
    setCharacteresShow(search);
  }
  const addFavorite = async (id: number, status: number) => {
    setLike(prev => {
      // Realiza los cambios necesarios en prev y retorna el nuevo valor actualizado
      const updatedLike = prev ? [...prev] : []; // Copia el arreglo existente

      // Realiza los cambios en updatedLike, por ejemplo:
      const existingItemIndex = updatedLike.findIndex(item => item.id === id);
      if (existingItemIndex !== -1) {
        updatedLike[existingItemIndex].status = status;
      } else {
        updatedLike.push({ id, status });
      }

      return updatedLike; // Retorna el nuevo valor actualizado
    });
    
  };
  const addFavoriteContext = async() =>{
    if (characteres != undefined) {
      const favorites = [];
      for (let i = 0; i < characteres?.length; i++) {
        const fn = like?.find(item => item.id === characteres[i].id);
        if (fn?.id != undefined) {
          favorites.push(characteres[i]);
        }
      }
      contexto.setFavorite(favorites);
    }
  }
  useEffect(()=>{
    addFavoriteContext();
  },[like])
  useEffect(() => {
    Characteres('1');
  }, []);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonSearchbar placeholder="Buscar" onIonInput={(e) => searchCharacter(e.target.value?.toString() || "")}></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonContent>
          <IonList>
            <IonItem>
              <IonSelect
                onIonChange={(e) => { Characteres(e.target.value) }}
                aria-label="character"
                placeholder="Selecciona la pagina">
                {Array.from({ length: 42 }, (_, index) => (
                  <IonSelectOption key={index + 1} value={String(index + 1)}>
                    {index + 1}
                  </IonSelectOption>
                ))}
              </IonSelect>

            </IonItem>
          </IonList>
          <IonGrid>
            <IonRow className="ion-justify-content-center ion-align-items-center">
              {
                characteresShow != undefined &&
                characteresShow.map((character, idx) => {
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
                        {
                          like !== undefined && like.find(item => item.id === character.id)?.status === 0 ? (
                            <IonIcon
                              icon={heartSharp}
                              style={{ marginRight: "1em", color: "red" }}
                              onClick={() => addFavorite(character.id, 1)}
                            />
                          ) : (
                            <IonIcon
                              icon={heartOutline}
                              style={{ marginRight: "1em" }}
                              onClick={() => { addFavorite(character.id, 0); setToast(true); }}

                            />
                          )
                        }

                      </div>
                    </IonCard>
                  )
                })
              }
            </IonRow>
          </IonGrid>
          <IonToast
            isOpen={toast}
            onDidDismiss={() => setToast(false)}
            message="Agregado a favoritos"
            duration={3000}
          />


        </IonContent>

      </IonContent>

    </IonPage>
  );
};

export default Tab1;
