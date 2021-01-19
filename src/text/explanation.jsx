import React, {useState} from 'react';
import { IonButtons, IonIcon, IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar, IonItem, IonButton, IonModal } from '@ionic/react';
import { helpCircleOutline } from 'ionicons/icons';
import explanation from "../text/text.jsx"
import Speech from "react-speech"
const Explanation = () => {
    const text = explanation
    console.log(text)
  return (
    <IonPage>
    </IonPage>
  );
};

export default Explanation;
