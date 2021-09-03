let itemTotal=0;
alert("If Your items are not shown properly,Please click on pending or Completed options once");
function addItem()
{
    itemTotal+=1;
    let text=document.getElementById("input-text");
    let val=text.value;
    text.value="";
    db.collection("todo-items").add({
        task: val,
        status:"pending",
        addedAt:(new Date()).toString()
    })
    .then((docRef) => {
        //console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        //console.error("Error adding document: ", error);
    });
    selectOption('all');
}
async function getItems(){
    let items = [];
    db.collection("todo-items").orderBy("addedAt", "asc").onSnapshot((snapshot)=>{
        snapshot.docs.forEach((item)=>{
            items.push(
                {
                    id:item.id,
                    ...item.data()
                }
            )
        })
    })
    await new Promise(r => setTimeout(r, 1000));
    itemTotal=items.length;
    displayItems(items);
}
function displayItems(items)
{
    console.groupCollapsed("displaying",items.length,"items");
    itemHtml="";
    items.forEach((item)=>{
        itemHtml+=`
            <div class="item">
                <div class="select-icon">
                    <div id=${item.id} class="select-image ${item.status=='completed' ? 'checked':''}">
                    </div>
                </div>
                <div class="content ${item.status=='completed' ? 'checked':''}">
                    ${item.task}
                </div>
                <div class="delete-item">
                    <div class="delete-button">
                        <button id=${item.id} type="button" onclick="deleteItem(this.id)">
                            <img class="image-pic" autocomplete="new-password" src="./assets/trash-fill.svg" style="width:35px;height:35px;">
                        </button>
                    </div>
                </div>
            </div>
        `
    })
    document.querySelector(".todo-items-list").innerHTML=itemHtml;
    createEventListeners();
}
function createEventListeners()
{
    let checkMarks=document.querySelectorAll(".item .select-image");
    checkMarks.forEach((checkMark)=>{
        checkMark.addEventListener("click",function()
        {
            markCompleted(checkMark.id);
        })
    })
}
function deleteItem(id)
{
    db.collection("todo-items").doc(id).delete().then(() => {
    }).catch((error) => {
    });
    selectOption('all');
}
function markCompleted(id)
{
    let x=db.collection("todo-items").doc(id);
    let y=document.getElementById(id);
    x.get().then(function(doc){
        if(doc.exists){
            if(doc.data().status=='pending')
            {
                x.update({
                    status:'completed'
                })
            }
            else if(doc.data().status=='completed')
            {
                x.update({
                    status:'pending'
                })
            }
        }
        selectOption('all');
    })
}
function confirmClear(){
    var x=document.getElementById("popup");
    var y=document.getElementById("todo-item-container");
    var nodes=y.getElementsByTagName('*');
    if(x.style.display=="none")
    {
        x.style.display="block";
        y.style.opacity=0.1;
        y.disabled = true;
        for(var i = 0; i < nodes.length; i++){
            nodes[i].disabled = true;
        }
    }
}
function themeChange()
{
    var x=document.getElementById("theme-pic");
    console.log(x);
}
function Clearoption(even){
    if(even=="yes")
    {
        okClear();
    }
    var x=document.getElementById("popup");
    var y=document.getElementById("todo-item-container");
    var nodes=y.getElementsByTagName('*');
    if(x.style.display=="block")
    {
        x.style.display="none";
        y.style.opacity=1;
        y.disabled = false;
        for(var i = 0; i < nodes.length; i++){
            nodes[i].disabled = false;
        }
    }
}
async function okClear()
{
    itemTotal=0;
    let ides = [];
    db.collection("todo-items").orderBy("addedAt", "asc").onSnapshot((snapshot)=>{
        snapshot.docs.forEach((item)=>{
            ides.push(
                {
                    id:item.id,
                    ...item.data()
                }
            )
        })
    })
    await new Promise(r => setTimeout(r, 1000));
    ides.forEach((item)=>{
        db.collection("todo-items").doc(item.id).delete().then(() => {
        }).catch((error) => {
        });
    })
    selectOption('all'); 
}
async function clearCompleted()
{
    let items = [];
    db.collection("todo-items").orderBy("addedAt", "asc").onSnapshot((snapshot)=>{
        snapshot.docs.forEach((item)=>{
            if(item.data().status=='completed'){
            items.push(
                {
                    id:item.id,
                    ...item.data()
                }
            )}
        })
    })
    itemTotal-=items.length;
    await new Promise(r => setTimeout(r, 1000));
    items.forEach((item)=>{
        db.collection("todo-items").doc(item.id).delete().then(() => {
        }).catch((error) => {
        });
    })
    selectOption('all'); 
}
async function selectOption(even)
{
    console.log("selectoption with",even);
    await new Promise(r => setTimeout(r, 500));
    var all=document.getElementById("all");
    var completed=document.getElementById("completed");
    var pending=document.getElementById('pending');
    all.style.color="rgb(185, 181, 226)";
    completed.style.color="rgb(185, 181, 226)";
    pending.style.color="rgb(185, 181, 226)";
    if(even=="all")
    {
        all.style.color="hsl(220,98%,61%)";
        getItems();
    }
    if(even=="completed")
    {
        completed.style.color="hsl(220,98%,61%)";
        displayCompleted();
    }
    if(even=="pending")
    {
        pending.style.color="hsl(220,98%,61%)";
        displayPending();
    }
}
async function displayCompleted()
{
    let items = [];
    db.collection("todo-items").orderBy("addedAt", "asc").onSnapshot((snapshot)=>{
        snapshot.docs.forEach((item)=>{
            if(item.data().status=='completed'){
            items.push(
                {
                    id:item.id,
                    ...item.data()
                }
            )}
        })
    })
    await new Promise(r => setTimeout(r, 1000));
    itemTotal=items.length;
    displayItems(items);
}
async function displayPending()
{
    let items = [];
    db.collection("todo-items").orderBy("addedAt", "asc").onSnapshot((snapshot)=>{
        snapshot.docs.forEach((item)=>{
            if(item.data().status=='pending'){
            items.push(
                {
                    id:item.id,
                    ...item.data()
                }
            )}
        })
    })
    await new Promise(r => setTimeout(r, 1000));
    itemTotal=items.length;
    displayItems(items);
}