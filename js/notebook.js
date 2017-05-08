var menuFirst = document.getElementsByClassName('menu-first')[0],
    iconAddBtn = document.getElementsByClassName('icon-add-btn')[0],
    list = menuFirst.getElementsByTagName('a'),
    activeColor = document.getElementsByTagName('a')[0],
    addInput = document.getElementsByClassName('add-cat-int')[0],
    iconDeleteBtn = document.getElementsByClassName('icon-delete-btn')[0],

    iconSave = document.getElementsByClassName('icon-save')[0],
    rightHeadFrame = document.getElementsByClassName('right-head-frame')[0],
    rightContentFrame = document.getElementsByClassName('right-content-frame')[0],
    centerFrame = document.getElementsByClassName('center-frame')[0],
    newNotebutton = document.getElementsByClassName('newNotebutton')[0];


menuFirst.addEventListener('click', menuHandler);
iconDeleteBtn.addEventListener('click', iconHandler);
iconAddBtn.addEventListener('click', iconAddHandler);
addInput.addEventListener('keypress', addInputHandler);


function menuHandler(event) {
    //改变样式
    setStyle(event);
}

// 目录点击事件，点亮
function setStyle(event) {
    var lastHeight = document.getElementsByClassName('cat-active')[0];
    if (lastHeight !== undefined) {
        lastHeight.className = '';
    }
    event.target.className = 'cat-active';
}

//删除目录
function iconHandler(event) {
    var child = document.getElementsByClassName('cat-active')[0].parentNode;
    var deleteA = document.getElementsByClassName('cat-active')[0];
    var catName = deleteA.innerHTML.split('(')[0];
    var local = JSON.parse(localStorage.getItem('notes'));
    delete local[catName];

    localStorage.setItem('notes', JSON.stringify(local));

    menuFirst.removeChild(child);
}

//添加目录
function iconAddHandler(event) {
    addInput.style.display = 'block';
}
//确定输入
function addInputHandler(event) {
    if (event.keyCode === 13) {
        var inputText = addInput.value;//得到输入框的内容
        // var newLi = document.createElement('li'),
        // newA = document.createElement('a');
        // newA.innerHTML = inputText;
        // newLi.appendChild(newA);
        // menuFirst.appendChild(newLi);
        if (inputText.trim() === '') {
            alert('名字不能为空');
            addInput.style.display = 'none';
            return;
        }
        var str = localStorage.getItem('notes');
        var object = JSON.parse(str) || {};
        if (!object[inputText]) {
            menuFirst.innerHTML += '<li><a href="#" >' + inputText + '(0)</a></li>';
            addInput.style.display = 'none';
        }
        saveArray(inputText);
    }
}


// 生成目录    ['设计', '语文']
function cat(arr) {
    var str = localStorage.getItem('notes');
    var object = JSON.parse(str);
    for (var i = 0; i < arr.length; i++) {
        var newLi = document.createElement('li');
        var newA = document.createElement('a');
        newA.innerHTML = arr[i] + '(' + object[arr[i]].length + ')';
        if(i === 0){
            newA.setAttribute('class','cat-active');
            catHandler(newA, true);
        }
        newLi.appendChild(newA);
        menuFirst.appendChild(newLi);
    }
}


//从localstr里或许value
function lvalue() {

    // 改了这里 By Phlicess
    var notes = localStorage.getItem('notes') || '{}';
    var array = Object.keys(JSON.parse(notes));

    cat(array);

}


//存储用户输入目录
function saveArray(inputText) {
    // var  = addInput.value;
    
    // 改了这里 By Phlicess
    var str = localStorage.getItem('notes') || '{}';
    var object = JSON.parse(str);

    if (object[inputText]) {
        alert('分类已存在');
    } else {
        object[inputText] = [];
        // console.log('object');

        localStorage.setItem('notes', JSON.stringify(object));
    }


}
lvalue();







