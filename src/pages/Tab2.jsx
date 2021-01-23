import React, { useState } from 'react';
import { IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, IonButtons, IonInput, IonItem } from '@ionic/react';
import ActionSheet from "../components/ActionSheet"
import './Tab2.css';
import "react-dom"
import ActionAlert from '../components/ActionAlert';
import { add, mic, search } from 'ionicons/icons';
import searchData from '../components/searchData';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition"

const Tab2 = (props) => {
  const { transcript } = useSpeechRecognition()
  const [showActionSheet, setShowActionSheet] = useState(false)
  const [actionAlert, setActionAlert] = useState(false)
  const [recordFlag, setRecordFlag] = useState(false)
  const [text, setText] = useState("")
  const allData = JSON.parse(localStorage.alcohol)
  const [data, setData] = useState(JSON.parse(localStorage.alcohol))
  const deleteButton = (data) => {
    localStorage.key = data[0]
    setShowActionSheet(true)
  }

  const wordChange = (e) => {
    setText(e.target.value)
    console.log(e.target.value)
  }
  const searchClick = () => {
    localStorage.searchWord = text
    setRecordFlag(false)
    searchData(allData, setData)
  }

  const reset = () => {
    setText("")
    localStorage.searchWord = ""
    setData(JSON.parse(localStorage.alcohol))
  }

  const recordClick = () => {
    setRecordFlag(true)
    SpeechRecognition.startListening()
    console.log(transcript)
    setText(transcript)
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle style={{ textAlign: "center" }}>ドリンクの追加</IonTitle>
          <IonButtons slot="end">
            <IonButton slot="end" onClick={() => reset()}>リセット</IonButton>
          </IonButtons>
          <IonButtons slot="start">
            <IonButton onClick={() => props.setRegistModal(false)}>戻る</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {data.length !== 0 &&
          <div>
            <form className="ion-padding">
              <IonItem>
                <IonButtons>
                  <IonButton onClick={() => searchClick()} slot="start">
                    <IonIcon
                      slot="icon-only"
                      icon={search} />
                  </IonButton>
                </IonButtons>
                {recordFlag === false ?
                <IonInput type="text" value={text} placeholder="検索する酒を入力" onIonChange={wordChange}></IonInput>
                :
                <IonInput type="text" value={transcript} placeholder="検索する酒を入力" onIonChange={wordChange}></IonInput>
                }
                <IonButtons>
                  <IonButton onClick={() => recordClick()} slot="end">
                    <IonIcon
                      slot="icon-only"
                      icon={mic} />
                  </IonButton>
                </IonButtons>
              </IonItem>
            </form>
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
        {/*searchAlert === true &&
          <SearchAlert searchAlert = {searchAlert} setSearchAlert = {setSearchAlert} setData = {setData} />
        */}
        <ActionSheet data={data} setShowActionSheet={setShowActionSheet} showActionSheet={showActionSheet} setData={setData} setRegistModal={props.setRegistModal} />
        <ActionAlert data={data} setActionAlert={setActionAlert} actionAlert={actionAlert} setData={setData} />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
