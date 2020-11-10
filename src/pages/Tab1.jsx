import React, { useState } from 'react';
import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar, IonItem } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

const Tab1 = (props) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>飲酒状況</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonItem>摂取した純アルコール量: {props.gram} g</IonItem>
          <IonItem>現在の血中アルコール濃度: {props.per} %</IonItem>
          <IonItem>"時刻"に0%</IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
