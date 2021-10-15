// const identifiant = document.getElementById('identifiant') // recherche p
  // const mdp = document.getElementById('mdp')
  // const identifiant = document.getElementById('identifiant') // recherche p
  // const mdp = document.getElementById('mdp')
  
  
  

  function GetParametre( parameterName ){ // permet de recuperer les donnée dans l'URL grace a la methode GET.
    let parameters = new URLSearchParams(window.location.search);
    return parameters.get( parameterName);
  };

  function ResetInput(){
    document.getElementById("ddp").value = "";
    document.getElementById("libelle").value = "";
    document.getElementById("montant").value = "";
  }

  const caseSisi = document.querySelector('#sisi');
  const envoie = document.getElementById('envoie');
  
  
 
  envoie.addEventListener("click", myFunction);
  
  function myFunction(){
    var date = new Date(document.getElementById("ddp").value);
    var dateTimestamp = date.getTime() / 1000;
    var libelle = document.getElementById("libelle").value;
    var montant = document.getElementById("montant").value;
    var mode = document.querySelector('#mode').value;

    token = GetParametre( "token" );
    httpRequest = new XMLHttpRequest();
    if (!httpRequest) {
        console.log('Erreur | Impossible de créer l\'instance XMLHttpRequest');
        return false;
    }

    httpRequest.onreadystatechange = alertContents;

    httpRequest.open('POST', 'http://10.0.213.162/dolibarr/api/index.php/bankaccounts/1/lines');
    httpRequest.setRequestHeader('DOLAPIKEY', token);
    httpRequest.setRequestHeader("Content-Type", "application/json")
    httpRequest.send('{ "date": "' + dateTimestamp + '", "type": "' + mode + '", "label":"' + libelle + '",  "amount":' + parseInt(montant) + '}');


    function alertContents(){
        setTimeout(() => {

            if (httpRequest.status === 200) {

                caseSisi.innerHTML = "<p class='succes'> Votre demande a été prise avec succes</p>";
              
            } else {
                caseSisi.innerHTML = "<p class='warning'> Assurez-vous d'avoir bien rempli toute les champs </p>";
            }

        }, 1000);
        
    }
        
      
    
    ResetInput();
  };



let app = {
    init: function() {
        document.getElementById('btn').addEventListener('click', app.takephoto);
    },
    takephoto: function() {
        let opts = {
            quality: 80,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            mediaType: Camera.MediaType.PICTURE,
            encodingType: Camera.EncodingType.JPEG,
            cameraDirection: Camera.Direction.BACK,
            targetWidth: 300,
            targetHeight: 400
        };

        navigator.camera.getPicture(app.ftw, app.wtf, opts);
    },
    ftw: function(imgURI) {
        document.getElementById('msg').textContent = imgURI;
        document.getElementById('photo').src = imgURI;

    },
    wtf: function(msg) {
        document.getElementById('msg').textContent = msg;
    }
};

document.addEventListener('deviceready', app.init);

function display(id) {
    pages.forEach((v) => {
        if (v == id) {
            document.getElementById(v).hidden = false
        } else if (v != id) {
            document.getElementById(v).hidden = true
        }
    })
}