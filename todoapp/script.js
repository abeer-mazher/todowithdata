
const firebaseConfig = {
  apiKey: "AIzaSyB8gKh_uQ1xDaCieJ4Wj39F0LNHYxrB2MU",
  authDomain: "todo-app-63254.firebaseapp.com",
  databaseURL: "https://todo-app-63254-default-rtdb.firebaseio.com",
  projectId: "todo-app-63254",
  storageBucket: "todo-app-63254.appspot.com",
  messagingSenderId: "1030413978948",
  appId: "1:1030413978948:web:0242713d4cd12c34a09b11"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

let firstInp = document.getElementById("firstInp");
let containerList = document.getElementById("containerList");

firebase.database().ref("todos").on("child_added",(data)=>{
    let listMain = document.createElement("DIV");
        listMain.setAttribute("class","list-main")
        let para = document.createElement("P");
        listMain.prepend(para);
        para.innerHTML = data.val().value;
        containerList.appendChild(listMain);
        firstInp.value = "";

        let listBtnDiv = document.createElement("DIV");
        listBtnDiv.setAttribute("class","list-btn");

        let editBtn = document.createElement("BUTTON");
        let editBtnText = document.createTextNode("Edit");
        editBtn.setAttribute("onclick","editValue(this)");
        editBtn.setAttribute("class","edit-btn")

        editBtn.appendChild(editBtnText);
        listBtnDiv.appendChild(editBtn);


        let clearBtn = document.createElement("BUTTON");
        let clearBtnText = document.createTextNode("Clear");
        clearBtn.setAttribute("onclick","clearValue(this)");
        clearBtn.setAttribute("id",data.val().key)
        clearBtn.appendChild(clearBtnText);
        listBtnDiv.appendChild(clearBtn);

        listMain.appendChild(listBtnDiv);

})

window.AddTodo = function(){
    if(firstInp.value === ""){
        alert("Enter your task fire");
    }else{
        
        let key = firebase.database().ref("todos").push().key;

        let todoObj = {
            value:firstInp.value,
            key:key
        }
        firebase.database().ref("todos").child(key).set(todoObj);

        // let listMain = document.createElement("DIV");
        // listMain.setAttribute("class","list-main")
        // let para = document.createElement("P");
        // listMain.prepend(para);
        // para.innerHTML = firstInp.value;
        // containerList.appendChild(listMain);
        // firstInp.value = "";

        // let listBtnDiv = document.createElement("DIV");
        // listBtnDiv.setAttribute("class","list-btn");

        // let editBtn = document.createElement("BUTTON");
        // let editBtnText = document.createTextNode("Edit");
        // editBtn.setAttribute("onclick","editValue(this)");
        // editBtn.setAttribute("class","edit-btn")

        // editBtn.appendChild(editBtnText);
        // listBtnDiv.appendChild(editBtn);


        // let clearBtn = document.createElement("BUTTON");
        // let clearBtnText = document.createTextNode("Clear");
        // clearBtn.setAttribute("onclick","clearValue(this)");
        // clearBtn.appendChild(clearBtnText);
        // listBtnDiv.appendChild(clearBtn);

        // listMain.appendChild(listBtnDiv);
        
    }
}

window.clearValue = function(clerElem){
    firebase.database().ref("todos").child(clerElem.id).remove();
    let delValue = clerElem.parentNode.parentNode;
    delValue.remove();

}

window.editValue = function(elem){
    let para = elem.parentNode
    // console.log(para.childNodes[1].id);
    let paraValue = para.parentNode;
    let secInp = document.createElement("INPUT");
    secInp.setAttribute("type","text");
    secInp.setAttribute("maxlength","40");
    paraValue.firstChild.appendChild(secInp);
    console.log(paraValue.firstChild)
    secInp.value = paraValue.firstChild.firstChild.nodeValue;
    paraValue.firstChild.firstChild.textContent = "";

    let saveBtn = document.createElement("BUTTON");
    let saveBtnText = document.createTextNode("Save");
    saveBtn.setAttribute("onclick","saveNewVal(this)");
    saveBtn.setAttribute("id",para.childNodes[1].id);
    saveBtn.appendChild(saveBtnText);
    para.firstChild.style.display = "none";
    para.prepend(saveBtn);
}

window.saveNewVal = function(saveElem){
    let newValue = saveElem.parentNode;
    let saveNewValue = newValue.parentNode;

    if(saveNewValue.firstChild.firstChild.nextSibling.value === ""){
        alert("add Something");
    }else{
        let edittodo = {
            value:saveNewValue.firstChild.firstChild.nextSibling.value,
            key:saveElem.id
        }
        firebase.database().ref("todos").child(saveElem.id).set(edittodo)
        saveNewValue.firstChild.innerHTML = saveNewValue.firstChild.firstChild.nextSibling.value;
        newValue.childNodes[1].style.display = "inline-block";
        newValue.firstChild.remove();
    }
}


window.deleteAll = function(){
    firebase.database().ref("todos").remove();
    containerList.innerHTML = "";
    firstInp.value = "";
}