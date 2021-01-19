import React, {useState}from 'react';
import { IonActionSheet, IonAlert, IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { trash, close, beer} from 'ionicons/icons';
import './Tab2.css';
import "react-dom"
import { useHistory } from "react-router";

const Tab2 = (props) => {
  const [showActionSheet, setShowActionSheet] = useState(false)
  const [actionAlert, setActionAlert] = useState(false)
  const [key, setKey] = useState("")
  const handleClick =() => {
    setActionAlert(true)
  }
  const history = useHistory()

  const deleteButton= (data) => {
    setShowActionSheet(true)
    console.log(data[0])
    setKey(data[0])
    console.log(key, data[0])
  }
  const data2 = JSON.parse(localStorage.alcohol)
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
           <IonButton slot = "end"　onClick = {handleClick}>新規作成</IonButton>
          <IonTitle>ドリンクの追加</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {data2.length !== 0 &&
          <div>
            {Object.entries(data2).map((data) => {
              return  (
                <div key = {data}>
                <IonCard onClick = {() => deleteButton(data)}>
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
        
        <IonActionSheet
        isOpen = {showActionSheet}
        onDidDismiss = {() => setShowActionSheet(false)}
        buttons = {[{
          text:"削除",
          role:"destructive",
          icon:trash,
          handler:() => {
           console.log("OK")
          }
        },{
          text: "閉じる",
          icon: close,
          role:"cancel"
        },
        {
          text:"飲む",
          icon:beer,
          handler:() => {
            localStorage.gram = parseFloat(localStorage.gram) + data2[key].per / 100 * data2[key].amount
            localStorage.nowGram = localStorage.gram
            console.log(localStorage.gram)
            localStorage.time = new Date().getHours() * 3600 + new Date().getMinutes() * 60 + new Date().getSeconds()
            localStorage.per = (localStorage.gram / (833 * localStorage.weight) * 100)
            history.push("./home")
          }

        }]}
        
      ></IonActionSheet>
        <IonAlert 
          isOpen = {actionAlert}
          onDidDismiss = {() => setActionAlert(false)}
          header = "追加するドリンク"
          inputs = {[{
            name: "drink",
            placeholder: "追加するドリンク",
            type: "text"
          }, {
            name:"per",
            placeholder:"アルコール度数",
            type: "number"
          }, {
            name:"amount",
            placeholder:"容量",
            type:"number"
          }]}
          buttons = {[
            {
            text:"閉じる",
            role:"cancel",
          },{
              text:"追加",
              handler: data => {
               console.log(data.drink + data.per + data.amount)
               data2[data.drink + data.per + data.amount] = {
                 name: data.drink,
                 per: data.per,
                 amount:data.amount
               }
               localStorage.alcohol = JSON.stringify(data2)
               setShowActionSheet(false)
              }
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
