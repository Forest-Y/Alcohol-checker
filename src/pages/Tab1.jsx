import React, { useEffect, useState } from 'react';
import { IonButtons, IonIcon, IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar, IonItem, IonButton, IonModal, IonFab, IonFabButton,  } from '@ionic/react';
import './Tab1.css';
import { helpCircleOutline, add } from 'ionicons/icons';
import judgeState from "../components/judgeState"
import Explanation from "../components/explanation"
import Tab2 from "./Tab2"

const Tab1 = () => {
  const [showModal, setShowModal] = useState(false)
  const [registModal, setRegistModal] = useState(false)
  localStorage.weight = 50
  judgeState()
  const [per, setPer] = useState(localStorage.per)
  const [gram, setGram] = useState(localStorage.gram)
  /*
  if (parseFloat(localStorage.gram) !== gram) {
    setGram(parseFloat(localStorage.gram))
    setPer(parseFloat(localStorage.per))
  }
  */
  const reset = () => {
    localStorage.per = parseFloat(0)
    localStorage.gram = parseFloat(0)
    localStorage.nowGram = parseFloat(0)
    localStorage.state = "素面"
    localStorage.time = 0
    //localStorage.alcohol = JSON.stringify({})
    setPer(0)
    setGram(0)
  }
  //const [remainingTimeStr, setRemainingTimeStr] = useState("")
  const minDisassenbly = localStorage.weight * 0.1 / 3600
  const remainingTime = gram / minDisassenbly
  const now = new Date()
  now.setSeconds(now.getSeconds() + remainingTime)
  useEffect(() => {
    setInterval(() => {
      localStorage.gram = parseFloat(Math.max(0, parseFloat(localStorage.nowGram) - (minDisassenbly * (new Date().getHours() * 3600 + new Date().getMinutes() * 60 + new Date().getSeconds() - localStorage.time))))
      localStorage.per = parseFloat(localStorage.gram / (833 * 50) * 100)
      setGram(gram => localStorage.gram)
      setPer(per => localStorage.per)
    }, 1000);
  }, [minDisassenbly])
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle style={{ textAlign: "center" }}>飲酒状況</IonTitle>
          <IonButton slot="end" onClick={() => { reset() }}>リセット</IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonItem>摂取した純アルコール量: {parseFloat(gram).toFixed(3)} g</IonItem>
          <IonItem>現在の血中アルコール濃度: {parseFloat(per).toFixed(3)} %</IonItem>
          <IonItem >現在は{localStorage.state}です。
          {localStorage.state !== "素面" &&
              <IonButtons>
                <IonButton onClick={() => setShowModal(true)}><IonIcon
                  slot="icon-only"
                  icon={helpCircleOutline} />
                </IonButton>
              </IonButtons>
            }
          </IonItem>
          {parseFloat(per) !== 0 &&
            <IonItem>{now.getMonth() + 1}月{now.getDate()}日{now.getHours()}時{now.getMinutes()}分に0%になります。</IonItem>
          }
        </IonList>
        <IonModal
          isOpen={showModal}
          onDidDismiss={() => setShowModal(false)}>
          <Explanation setShowModal={setShowModal} />
        </IonModal>
        <IonFab horizontal="end" slot="fixed" vertical="bottom" >
          <IonFabButton onClick={() => setRegistModal(true)}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
        <IonModal
          isOpen={registModal}
          swipeToClose={true}
          onDidDismiss={() => setRegistModal(false)}>
          <Tab2 setRegistModal={setRegistModal} />
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
