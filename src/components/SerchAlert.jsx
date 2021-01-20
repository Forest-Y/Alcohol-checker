import React from 'react';
import { IonAlert　} from '@ionic/react';
//import { useSpeechRecognition } from "react-speech-recognition"
import "react-dom"
import searchData from './searchData';

const SerchAlert = (props) => {
    //const { transcript, resetTranscript } = useSpeechRecognition()
    const allData = JSON.parse(localStorage.alcohol)
    return (
        <IonAlert
            isOpen={props.searchAlert}
            onDidDismiss={() => props.setSearchAlert(false)}
            header="検索"
            inputs={[{
                name: "text",
                type: "text"
            }]}
            buttons={[{
                text: "検索",
                handler: (text) => {
                    localStorage.searchWord = text.text
                    searchData(allData, props.setData)
                    props.setSearchAlert(false)
                }
            }]}
        />
    );
};

export default SerchAlert;
