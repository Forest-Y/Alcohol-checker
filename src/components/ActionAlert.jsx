import React from 'react';
import { IonAlert } from '@ionic/react';
import searchData from "./searchData"
import "react-dom"

const ActionAlert = (props) => {
    const allData = JSON.parse(localStorage.alcohol)
    return (
        <IonAlert
            isOpen={props.actionAlert}
            onDidDismiss={() => props.setActionAlert(false)}
            header="追加するドリンク"
            inputs={[{
                name: "drink",
                placeholder: "追加するドリンク",
                type: "text"
            }, {
                name: "per",
                placeholder: "アルコール度数",
                type: "number"
            }, {
                name: "amount",
                placeholder: "容量",
                type: "number"
            }]}
            buttons={[
                {
                    text: "閉じる",
                    role: "cancel",
                }, {
                    text: "追加",
                    handler: drinkData => {
                        allData[drinkData.drink + drinkData.per + drinkData.amount] = {
                            name: drinkData.drink,
                            per: drinkData.per,
                            amount: drinkData.amount
                        }
                        localStorage.alcohol = JSON.stringify(allData)
                        searchData(allData, props.setData)
                        props.setActionAlert(false)
                    }
                }
            ]}
        />
    );
};

export default ActionAlert;
