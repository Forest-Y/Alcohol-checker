import React, { useState} from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { stringify } from 'querystring';

const App = () => {
  if(!("drink" in localStorage)){
    localStorage.drink = localStorage.stringify([])
  }
  const [data, setData] = useState(JSON.parse(localStorage.drink))
  const [drink, setDrink] = useState([])
  const [per, setPer] = useState(0)
  const [gram, setGram] = useState(0)
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/home" render = {() => <Tab1 per = {per} gram = {gram} />} exact={true} />
            <Route path="/append" render = {() => <Tab2 setData = {data, setData} setGram = {gram, setGram} setPer = {per, setPer} data = {data} />} exact={true} />
            <Route path="/history" component={Tab3} />
            <Route path="/" render={() => <Redirect to="/home" />} exact={true} />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href="/home">
              <IonIcon icon={triangle} />
             <IonLabel>摂取状況</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/append">
              <IonIcon icon={ellipse} />
              <IonLabel>ドリンクの追加</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab3" href="/history">
              <IonIcon icon={square} />
              <IonLabel>履歴</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  )
}

export default App;
