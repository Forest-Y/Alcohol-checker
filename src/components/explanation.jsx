import React from 'react';
import { IonButtons, IonContent, IonHeader, IonPage, IonToolbar, IonButton, IonCard, IonCardTitle, IonCardContent, IonCardHeader, IonCardSubtitle } from '@ionic/react';
import explanation from "../text/text.jsx"
const Explanation = (props) => {
  const text = explanation
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start" color="primary">
            <IonButton onClick={() => props.setShowModal(false)}  >閉じる</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{localStorage.state}</IonCardTitle>
            <IonCardSubtitle>血中アルコール濃度：{text[localStorage.state]["bloodPer"]}</IonCardSubtitle>
            <span>酔いの状態</span>
            <IonCardContent>
              {text[localStorage.state]["explanation"].map(data => {
                return (
                  <div key = {data}>
                    <li>{data}</li>
                  </div>
                )
              })}
            </IonCardContent>

          </IonCardHeader>
        </IonCard>
      </IonContent>
    </IonPage>
  )
};

export default Explanation;
