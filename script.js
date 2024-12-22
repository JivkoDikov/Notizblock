
let titles = [];
let notes = [];
let trashtitles = [];
let trashnotes = [];
load();
function render(){
  includeHTML();
    let content = document.getElementById('content');
    content.innerHTML = '';
    content.innerHTML += /*html*/` <div class ="menu">
    <button class="menu-btn" onclick = "newNote()">Neue Notiz schreiben</button>
    <button class="menu-btn" onclick = "showTrash()" >Papierkorb</button>
</div>
    <div class="popupnote">
    <div class="writenote" id="writenote" onclick="showPopUp()">Notiz schreiben...</div>
    <div id = "closepopup" class= "title d-none"><br>
    <textarea class="popup" id="title" placeholder ="Titel"></textarea><br>
    <textarea class="popup"id="note" placeholder ="Notiz schreiben"></textarea><br>
    <div class="popup-btns">
    <button class ="addnote-bt" onclick = "addTitleNote()">Notiz hinzufügen</button>
    <button class ="closepopup-bt" onclick ="closePopUp()">Fenster schließen</button>
</div>
    </div>
    </div>`;
   content.innerHTML += /*html*/`<div id ="container" class=" container"></div>`;
   for (let i = 0; i < notes.length; i++){
    document.getElementById('container').innerHTML += /*html*/`<div class="titlenote">
           <div class="textarea"> <b>${titles[i]}</b><br>
          <i>${notes[i]}</i><br>
   </div>
          <button class="deletenote-bt" onclick = "deleteTitleNote(${i})">Löschen</button>

    </div>`;
    
    } 
    
}
function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      /*search for elements with a certain atrribute:*/
      file = elmnt.getAttribute("w3-include-html");
      if (file) {
        /* Make an HTTP request using the attribute value as the file name: */
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            /* Remove the attribute, and call this function once more: */
            elmnt.removeAttribute("w3-include-html");
            includeHTML();
          }
        }
        xhttp.open("GET", file, true);
        xhttp.send();
        /* Exit the function: */
        return;
      }
    }
  }


function showPopUp(){
    document.getElementById('writenote').classList.add('d-none');
    document.getElementById('closepopup').classList.remove('d-none');
}
function closePopUp(){
    document.getElementById('writenote').classList.remove('d-none');
    document.getElementById('closepopup').classList.add('d-none');
}

function addTitleNote(){
   let title = document.getElementById('title').value;
   let note = document.getElementById('note').value;
   if (title+note == 0){
    alert('Bitte Titel oder Notiz eingeben');
   }
   else{
   titles.push(title);
   notes.push(note);
  render();
 save();
 showPopUp();
   }
 
  }
function deleteTitleNote(i){
    trashnotes.push(notes[i]);
    trashtitles.push(titles[i]);
    titles.splice(i,1);
    notes.splice(i,1);
    
   
    
    render();
    save();
  showPopUp();
    
  
    
}

function save(){
    let titlesAsText = JSON.stringify(titles);
    localStorage.setItem("titles", titlesAsText);
    let notesAsText = JSON.stringify(notes);
    localStorage.setItem("notes", notesAsText);
    let trashtitlesAsText = JSON.stringify(trashtitles);
    localStorage.setItem("trashtitles",trashtitlesAsText);
    let trashnotesAsText = JSON.stringify(trashnotes);
    localStorage.setItem("trashnotes", trashnotesAsText);
}
function load(){
    let titlesAsText = localStorage.getItem('titles');
    let notesAsText = localStorage.getItem('notes');
    let trashtitlesAsText = localStorage.getItem('trashtitle');
    let trashnotesAsText = localStorage.getItem('trashnotes');
    if(titlesAsText && notesAsText && trashtitlesAsText && trashnotesAsText){
        titles = JSON.parse(titlesAsText);
        notes = JSON.parse(notesAsText);
        trashtitles = JSON.parse(trashtitlesAsText);
    }
}
function showTrash(){
  content.innerHTML= '';
  if (trashtitles.length == 0){
    showMenu();
    content.innerHTML += /*html*/`<div class="trashempty">Papierkorb ist leer</div>`;
  
    

  }else{
  content.innerHTML = '';
  showMenu();
  content.innerHTML += /*html*/ `<h2>Papierkorb</h2>`;
  content.innerHTML += /*html*/`<div id="trashnote-container" class ="trashnote-container"></div>`;
  for (let i = 0; i < trashnotes.length; i++){
  document.getElementById('trashnote-container').innerHTML += /*html*/`<div class ="titlenote">
   <b>${trashtitles[i]}</b><br>
          <i>${trashnotes[i]}</i><br>
          <button class="deletenote-bt" onclick = "deleteTrash(${i})">Löschen</button>
  </div>
  </div>`;
  
  }
  }
  
}
function deleteTrash(i){
  trashtitles.splice(i,1);
  trashnotes.splice(i,1);
  showTrash();
  if( trashtitles.length == 0){
    let content = document.getElementById('content');
    content.innerHTML = '';
  showMenu();
    content.innerHTML += /*html*/`<div class="trashempty">Papierkorb ist leer</div>`;
  }
  


}
function showMenu(){
  content.innerHTML += /*html*/` <div class ="menu">
    <button class="menu-btn" onclick = "newNote()" >Neue Notiz schreiben</button>
    <button class="menu-btn" onclick = "showTrash()" >Papierkorb</button>
    </div>`;
    
}
function newNote(){
  render();
  
}
