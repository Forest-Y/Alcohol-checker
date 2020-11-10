import React, {useState}from 'react';
import { IonActionSheet, IonAlert, IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { trash, close, create } from 'ionicons/icons';
import './Tab2.css';
import { convertCompilerOptionsFromJson } from 'typescript';
/*
import Input from "./Input"
*/

const Tab2 = (props) => {
  const [showActionSheet, setShowActionSheet] = useState(false)
  const [actionAlert, setActionAlert] = useState(false)
  
  const handleClick =() => {
    setActionAlert(true)
    console.log(actionAlert)
  }
  console.log(props.data)
  /*
  const handleClick = () => {
    console.log("OK")
  }
  */
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
           <IonButton slot = "end"　onClick = {handleClick}>新しいドリンクセットの追加</IonButton>
          <IonTitle>ドリンクの追加</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div>
          {props.data != null &&
          <div>
            {props.data.map(data => {
              return  (
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>{data.alcohol}</IonCardTitle>
                    <IonCardSubtitle>アルコール濃度 : {data.per} %　容量 : {data.amount} ml</IonCardSubtitle>
                  </IonCardHeader>
              </IonCard>
              )
            })}
          </div>
         }
        </div>
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
                const temp = props.data
                temp.push({
                  alcohol:data.drink,
                  per: data.per,
                  amount:data.amount
                })
                console.log(temp)
                props.setData(temp)
                localStorage.drink = JSON.stringify(temp)
              }
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
