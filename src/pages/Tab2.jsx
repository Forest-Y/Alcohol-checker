import React, { useState } from 'react';
import { IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, IonButtons } from '@ionic/react';
import SearchAlert from "../components/SerchAlert"
import ActionSheet from "../components/ActionSheet"
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition"
import './Tab2.css';
import "react-dom"
import ActionAlert from '../components/ActionAlert';
import { add } from 'ionicons/icons';

const Tab2 = (props) => {
  const { transcript } = useSpeechRecognition()
  const [showActionSheet, setShowActionSheet] = useState(false)
  const [searchAlert, setSearchAlert] = useState(false)
  const [actionAlert, setActionAlert] = useState(false)
  const deleteButton = (data) => {
    localStorage.key = data[0]
    setShowActionSheet(true)
    console.log(data)
    console.log(localStorage.key)
  }
  console.log(JSON.parse(localStorage.alcohol))
  //const data = JSON.parse(localStorage.alcohol)
  const [data, setData] = useState(JSON.parse(localStorage.alcohol))
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle style = {{ textAlign: "center" }}>ドリンクの追加</IonTitle>
          <IonButtons slot = "end">
            <IonButton slot="end" onClick={() => setSearchAlert(true)}>検索する</IonButton>
            <IonButton slot="end" onClick={SpeechRecognition.startListening}>録音する</IonButton>
          </IonButtons>
          <IonButtons slot = "start">
            <IonButton slot="start" onClick={() => props.setRegistModal(false)}>戻る</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <p>{transcript}</p>
        {data.length !== 0 &&
          <div>
            {Object.entries(data).map((data) => {
              return (
                <div key={data}>
                  <IonCard onClick={() => deleteButton(data)}>
                    <IonCardHeader>
                      <IonCardTitle >{data[1].name}</IonCardTitle>
                      <IonCardSubtitle>アルコール濃度 : {data[1].per} %　容量 : {data[1].amount} ml</IonCardSubtitle>
                    </IonCardHeader>
                  </IonCard>
                </div>
              )
            })}
          </div>
        }
        <IonFab horizontal="end" slot="fixed" vertical="bottom" >
          <IonFabButton onClick={() => setActionAlert(true)}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
        <ActionSheet data={data} setShowActionSheet={setShowActionSheet} showActionSheet={showActionSheet} setData={setData} setRegistModal={props.setRegistModal} />
        <ActionAlert data={data} setActionAlert={setActionAlert} actionAlert={actionAlert} />
        <SearchAlert searchAlert={searchAlert} setSearchAlert={setSearchAlert} setData={setData} />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
