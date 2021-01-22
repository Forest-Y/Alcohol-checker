import React, { useEffect, useState } from 'react';
import { IonAlert } from '@ionic/react';
//import { useSpeechRecognition } from "react-speech-recognition"
import "react-dom"
import searchData from './searchData';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition"

const SerchAlert = (props) => {
    //const { transcript, resetTranscript } = useSpeechRecognition()
    const allData = JSON.parse(localStorage.alcohol)
    const { transcript } = useSpeechRecognition()
    const [text, setText] = useState("")
    useEffect(() => {
        SpeechRecognition.startListening()
    }, [])
    localStorage.searchWord = transcript
    if(localStorage.searchWord !== text){
        setText(localStorage.searchWord)
    }
    console.log(localStorage.searchWord)
    return (
        <div>
            <IonAlert
                isOpen={props.searchAlert}
                onDidDismiss={() => props.setSearchAlert(false)}
                header="検索"
                inputs={[{
                    name: "text",
                    type: "text",
                    value: transcript
                }]}
                buttons={[{
                    text: "検索",
                    handler: () => {
                        console.log(transcript)
                        searchData(allData, props.setData)
                        SpeechRecognition.stopListening()
                        props.setSearchAlert(false)
                    }
                }
                ]}
            />
            <p>{transcript}</p>
        </div>
    );
};

export default SerchAlert;
