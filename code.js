const charRange=document.getElementById("charRange");
const charAmount=document.getElementById("charAmount");
charRange.addEventListener('input',syncChar);
charAmount.addEventListener('input',syncChar);
function syncChar(e) {
    const value=e.target.value;
    charAmount.value=value;
    charRange.value=value;
}
const uCheck=document.getElementById("uCheck");
const sCheck=document.getElementById("sCheck");
const nCheck=document.getElementById("nCheck");
const form=document.querySelector(".form");
const gPassword = document.getElementById("passwordField");
const copyButton = document.getElementById("copyButton");

form.addEventListener('submit',e=>{
    e.preventDefault();
    const cAR=charAmount.value;
    const iUpper=uCheck.checked;
    const iNumber=nCheck.checked;
    const iSymbols=sCheck.checked;
    const password=generatePassword(cAR,iUpper,iNumber,iSymbols);
    gPassword.value = password;
});
const copy=document.querySelector(".copy");
copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(gPassword.value);
    copy.classList.add('active');
    setTimeout(() => {
        copy.classList.remove('active');
    }, 1000);
});
const arrayFromLowToHigh = (low, high) => {
    const array = [];
    for (let i = low; i <= high; i++) {
    array.push(i);
    }
    return array;
};
const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90);
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122);
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57);
const SYMBOL_CHAR_CODES = [
    ...arrayFromLowToHigh(33, 47),
    ...arrayFromLowToHigh(58, 64),
    ...arrayFromLowToHigh(91, 96),
    ...arrayFromLowToHigh(123, 126)
];
function generatePassword(cAR, iUpper, iNumber, iSymbols) {
    let charCodes = [...LOWERCASE_CHAR_CODES];
    if (iUpper) {
        charCodes = [...charCodes, ...UPPERCASE_CHAR_CODES];
    }
    if (iNumber) {
        charCodes = [...charCodes, ...NUMBER_CHAR_CODES];
    }
    if (iSymbols) {
        charCodes = [...charCodes, ...SYMBOL_CHAR_CODES];
    }
    const result = [];
    for (let i = 0; i < cAR; i++) {
        const char = charCodes[Math.floor(Math.random() * charCodes.length)];
        result.push(String.fromCharCode(char));
    }   
    return result.join('');
}

// manager
const mButton=document.getElementById('mButton');
const mPass=document.getElementById('mPass');
const user=document.getElementById('user');
const website=document.getElementById('website');

const web=document.getElementById('web');
const mTuser=document.getElementById('mTuser');
const mTpass=document.getElementById('mTpass');
const mDel=document.getElementById('mDel');
// table row 
function mainRow(){
    let row=`<tr>
    <th>Website</th>
    <th>Username</th>
    <th>Password</th>
    <th>Edit</th>
    <th>Delete</th>
</tr>`;
mTable.innerHTML=mTable.innerHTML+row;
}
let m=0;
const mTable=document.getElementById("mTable");
function tableFill() {
    mainRow();
    let info=localStorage.getItem("manager");
    if(info!== null){
        let data=JSON.parse(info);
        data.forEach(element => {
            let row=`<tr>
            <td id="web" >${element.website}</td>
            <td id="mTuser">${element.username}</td>
            <td id="mTpass">${element.userPassword}</td>
            <td id="mEdit" onclick="editInfo(${m})"><i class="fa-regular fa-pen-to-square"></i></td>
            <td id="mDel" onclick="rowDelete('${element.website}')"><i class="fa-solid fa-trash"></i></td>
            </tr>`;
            mTable.innerHTML=mTable.innerHTML+row;
            m++;
        });
    }
}
tableFill();
function rowAdd() {
let row=`
<tr>
<td id="web">${website.value}</td>
<td id="mTuser">${user.value}</td>
<td id="mTpass">${mPass.value}</td>
<td id="mEdit" onclick="editInfo(${m})"><i class="fa-regular fa-pen-to-square"></i></td>
<td id="mDel" onclick="rowDelete('${website.value}')"><i class="fa-solid fa-trash"></i></td>
</tr>`;
mTable.innerHTML=mTable.innerHTML+row;
m++;
website.value="";
user.value="";
mPass.value="";
}
mButton.addEventListener('click', e => {
    e.preventDefault();
    const newWebsite = website.value;
    const manager = localStorage.getItem("manager");

    if (manager === null) {
        let info = [];
        info.push({ website: newWebsite, username: user.value, userPassword: mPass.value });
        localStorage.setItem("manager", JSON.stringify(info));
        rowAdd();
    } else {
        const data = JSON.parse(manager);
        const websiteExists = data.some((element) => element.website === newWebsite);

        if(newWebsite !=="" && user.value!=="" && mPass.value!==""){
            if (!websiteExists) {
                let info = JSON.parse(localStorage.getItem("manager"));
                info.push({ website: newWebsite, username: user.value, userPassword: mPass.value });
                localStorage.setItem("manager", JSON.stringify(info));
                rowAdd();
            } else {
                alert('Website already exists. Please enter a different website.');
            }
        }else{
            alert('Input Missing.');
        }
    }
});

//edit 
function editInfo(e) {
    let info=localStorage.getItem("manager");
        let data=JSON.parse(info);
        let newWebValue=prompt('Enter the new website:');
        let newUserValue=prompt('Enter the new username:');
        let newPassValue=prompt('Enter the new password:');
        data[e].username=newUserValue;
        data[e].website=newWebValue;
        data[e].userPassword=newPassValue;
        localStorage.setItem("manager", JSON.stringify(data));
        mTable.innerHTML = '';
        tableFill();
    console.log(newUserValue);
}
function rowDelete(website) {
    let info = localStorage.getItem('manager');
    let data = JSON.parse(info);
    upData = data.filter((element) => element.website !== website);
    localStorage.setItem('manager', JSON.stringify(upData));
    mTable.innerHTML = '';
    tableFill();
}
