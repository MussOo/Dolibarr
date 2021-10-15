/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready


  const envoie = document.querySelector('#envoie');
  const result = document.querySelector('#result');
  
  let token;

  var httpRequest;
  document.getElementById("connexion").addEventListener('click', makeRequest);
  const caseResult =document.getElementById('result');
  const caseErreur=document.getElementById('erreur');
  
  function makeRequest() {

    const identifiant = document.getElementById('identifiant').value;
    const mdp = document.getElementById('mdp').value;

    httpRequest = new XMLHttpRequest();
   
    if (!httpRequest) {
      console.log('Abandon :frowning: Impossible de créer une instance de XMLHTTP');
      return false;
    }
  
    httpRequest.onreadystatechange = alertContents;
    
    httpRequest.open('GET', "http://10.0.213.162/dolibarr/api/index.php/login?login=" + identifiant + "&password=" + mdp + "&reset=0");
  
    httpRequest.send(); 
    
    test();
  }
  
  function alertContents() {
  
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        var rep = httpRequest.responseText; 
        var repJSON = JSON.parse(rep);
        token = repJSON.success.token;
        id_user = repJSON.success.id;
        
      } else {
        caseErreur.innerHTML = "<p class='warning'> Mot de passe ou Identifiant incorrect // Ou probleme de requetes</p>";
      }
    }
  }
  
  function test(){
  
    setTimeout(() => {
   
      const Verif = new Promise((resolve, reject) => {
        if(typeof token != "undefined"){
          resolve();
        }else{
          reject();
        }
      })
      
      Verif.then(() => {
        alert('Bienvenue')
        window.location.href ='formulaire.html?token='+ token +'';
      
      }).catch(() => {
        caseErreur.innerHTML = "<p class='warning'> Mot de passe ou Identifiant incorrect // Ou probleme de requetes</p>";

      })
    
     }, 2000);
  }