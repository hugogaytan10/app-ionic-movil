import React, { useState } from 'react';
import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { images, square, triangle } from 'ionicons/icons';
import './Tab3.css';
import { takePicture } from './Logic/Pictures';
import { writeToClipboard } from './Logic/clipboard';
import { printCurrentPosition } from './Logic/Geolocation';
import { openSite } from './Logic/browser';

const Tab3: React.FC = () => {
  const [picture, setPicture] = useState("");
  const [input, setInput] = useState("");
  const [location, setLocation] = useState("Click para ubicacion");
  return (
    <IonPage>
      <IonHeader collapse="condense">
        <IonToolbar>
        <IonTitle>Plugins</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
       <IonIcon style={{margin:'auto', display: 'block', width: '100%'}} color='primary' icon={images} onClick={()=>{takePicture().then(data => {if(data != undefined)setPicture(data);})}}/>
       <>
       {
         picture != "" &&
         <img src={picture}/>
       }
       </>
       <div style={{display: 'flex',  justifyContent: "space-between"}}>
        <IonInput placeholder='escribe algo...' onIonChange={(e)=>{if(e.target.value != undefined) setInput(e.target.value.toString())}}></IonInput>
        <IonButton onClick={()=>{writeToClipboard(input)}}>COPIAR</IonButton>
       </div>
       <div style={{display: 'flex',  justifyContent: "space-between"}}>
        <IonInput placeholder={location} ></IonInput>
        <IonButton onClick={async ()=>{setLocation(await printCurrentPosition().then(pos => { return pos.coords.longitude + " " + pos.coords.latitude; }))}}>Ubiacion</IonButton>
       </div>
       <IonButton onClick={()=>{openSite()}}>Open Site</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
