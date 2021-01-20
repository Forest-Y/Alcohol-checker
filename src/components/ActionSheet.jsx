import React from 'react';
import { IonActionSheet } from '@ionic/react';
import { trash, close, beer } from 'ionicons/icons';
import "react-dom"
import searchData from './searchData';

const ActionSheet = (props) => {
    const allData = JSON.parse(localStorage.alcohol)
    return (
        <IonActionSheet
            isOpen={props.showActionSheet}
            onDidDismiss={() => props.setShowActionSheet(false)}
            buttons={[{
                text: "削除",
                role: "destructive",
                icon: trash,
                handler: () => {
                    delete allData[localStorage.key]
                    localStorage.alcohol = JSON.stringify(allData)
                    searchData(allData, props.setData)
                }
            }, {
                text: "閉じる",
                icon: close,
                role: "cancel"
            },
            {
                text: "飲む",
                icon: beer,
                handler: () => {
                    localStorage.gram = parseFloat(localStorage.gram) + props.data[localStorage.key].per / 100 * props.data[localStorage.key].amount
                    localStorage.nowGram = localStorage.gram
                    console.log(localStorage.gram)
                    localStorage.time = new Date().getHours() * 3600 + new Date().getMinutes() * 60 + new Date().getSeconds()
                    localStorage.per = (localStorage.gram / (833 * localStorage.weight) * 100)
                    props.setRegistModal(false)
                }
            }]}
        ></IonActionSheet>
    );
};

export default ActionSheet;
