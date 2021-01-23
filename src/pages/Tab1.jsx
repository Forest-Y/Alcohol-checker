import React, { useEffect, useState } from 'react';
import { IonButtons, IonIcon, IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar, IonItem, IonButton, IonModal, IonFab, IonFabButton, IonAlert, } from '@ionic/react';
import './Tab1.css';
import { helpCircleOutline, add, build } from 'ionicons/icons';
import judgeState from "../components/judgeState"
import Explanation from "../components/explanation"
import Tab2 from "./Tab2"
import { useHistory } from 'react-router';

const Tab1 = () => {
  const history = useHistory()
  const [showModal, setShowModal] = useState(false)
  const [registModal, setRegistModal] = useState(false)
  let subHeader = ""
  if (localStorage.weight !== undefined) {
    subHeader = "現在の体重は" + localStorage.weight + "です。"
  }
  judgeState()
  const [per, setPer] = useState(localStorage.per)
  const [gram, setGram] = useState(localStorage.gram)
  const [weightFlag, setWeightFlag] = useState(false)
  const minDisassenbly = localStorage.weight * 0.1 / 3600
  const remainingTime = gram / minDisassenbly
  const now = new Date()
  now.setSeconds(now.getSeconds() + remainingTime)
  const reset = () => {
    setWeightFlag(true)
  }
  //console.log(weight)
  if (localStorage.gram === undefined) {
    localStorage.gram = 0
    localStorage.per = 0
    localStorage.state = "素面"
    localStorage.time = 0
    localStorage.alcohol = JSON.stringify({})
    setWeightFlag(true)
  }
  //console.log("${localStorage.weight}")
  //const [remainingTimeStr, setRemainingTimeStr] = useState("")
  useEffect(() => {
    setInterval(() => {
      localStorage.gram = parseFloat(Math.max(0, parseFloat(localStorage.nowGram) - (minDisassenbly * (new Date().getHours() * 3600 + new Date().getMinutes() * 60 + new Date().getSeconds() - localStorage.time))))
      localStorage.per = parseFloat(localStorage.gram / (833 * localStorage.weight) * 100)
      setGram(gram => localStorage.gram)
      setPer(per => localStorage.per)
    }, 1000);
  }, [minDisassenbly])
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle style={{ textAlign: "center" }}>飲酒状況</IonTitle>
          <IonButtons slot = "end">
            <IonButton  onClick={() => { reset() }}>
              <IonIcon slot="icon-only" icon={build} />
            </IonButton>
          </IonButtons>
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
        <IonAlert
          isOpen={weightFlag}
          onDidDismiss={() => setWeightFlag(false)}
          header="体重の設定"
          subHeader={subHeader}
          inputs={[{
            name: "weight",
            placeholder: "体重を入力",
            type: "number"
          }]}
          buttons={[
            {
              text: "閉じる",
              role: "cancel",
            }, {
              text: "決定",
              handler: data => {
                localStorage.weight = data.weight
                history.go(0)
              }
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
