import React, { useState } from 'react';
import { IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, IonButtons, IonInput, IonItem } from '@ionic/react';
import ActionSheet from "../components/ActionSheet"
import './Tab2.css';
import "react-dom"
import ActionAlert from '../components/ActionAlert';
import { add, mic, search } from 'ionicons/icons';
import searchData from '../components/searchData';
import SearchAlert from "../components/SerchAlert"

const Tab2 = (props) => {
  const [showActionSheet, setShowActionSheet] = useState(false)
  const [searchAlert, setSearchAlert] = useState(false)
  const [actionAlert, setActionAlert] = useState(false)
  const [text, setText] = useState("")
  const allData = JSON.parse(localStorage.alcohol)
  const [data, setData] = useState(JSON.parse(localStorage.alcohol))
  const deleteButton = (data) => {
    localStorage.key = data[0]
    setShowActionSheet(true)
    console.log(data)
    console.log(localStorage.key)
  }
  const handleChange = (e) => {
    setText(e.target.value)
    console.log(e.target.value)
  }
  const handleClick = () => {
    localStorage.searchWord = text
    console.log("OK")
    searchData(allData, setData)
  }
  const reset = () => {
    setText("")
    localStorage.searchWord = ""
    setData(JSON.parse(localStorage.alcohol))
  }
  /*
  function regist() {
    SpeechRecognition.startListening()
    console.log("OK")
    return new Promise(() => {
      SpeechRecognition.startListening()
    })
  }
  async function speech() {
    await SpeechRecognition.startListening()
    localStorage.searchWord = transcript
    searchData(allData, setData)
    setText(transcript)
    console.log("OK!")
    console.log(transcript)
  }
  */
  /*
  localStorage.searchWord = transcript
  searchData(allData, setData)
  setText(transcript)
  */
  //const data = JSON.parse(localStorage.alcohol)
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
                  <IonButton onClick={() => handleClick()} slot="start">
                    <IonIcon
                      slot="icon-only"
                      icon={search} />
                  </IonButton>
                </IonButtons>
                <IonInput type="text" value={text} placeholder="検索する酒を入力" onIonChange={handleChange}></IonInput>
                <IonButtons>
                  <IonButton onClick={() => setSearchAlert(true)} slot="end">
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
        {searchAlert === true &&
          <SearchAlert searchAlert = {searchAlert} setSearchAlert = {setSearchAlert} setData = {setData} />
        }
        <ActionSheet data={data} setShowActionSheet={setShowActionSheet} showActionSheet={showActionSheet} setData={setData} setRegistModal={props.setRegistModal} />
        <ActionAlert data={data} setActionAlert={setActionAlert} actionAlert={actionAlert} setData={setData} />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
