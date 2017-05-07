var menuFirst = document.getElementsByClassName('menu-first')[0],
    centerContent = document.getElementsByClassName('center-content')[0],
    displayContent = document.getElementsByClassName('display-content')[0],
    createNote = document.getElementsByClassName('create-note')[0],
    contentState = 'edit',
    iconClose = document.getElementsByClassName('icon-close')[0],
    iconSave = document.getElementsByClassName('icon-save')[0];


menuFirst.addEventListener('click', catHandler);
iconClose.addEventListener('click',iconCloseHandler);
createNote.addEventListener('click', createHandler);
//点击列表展开内容
displayContent.addEventListener('click', function (event) {
    var selectedTitle = event.target.parentNode.getElementsByTagName('h5')[0];
    var selectedContent = event.target.parentNode.getElementsByTagName('p')[0].innerHTML;
    rightHeadFrame.dataset.date = selectedTitle.dataset.date;
    rightHeadFrame.value = selectedTitle.innerHTML;
    rightContentFrame.value = selectedContent;
    contentState = 'edit';

    // var localData = JSON.parse(localStorage.getItem('notes'));
    // localData[selectorNote].forEach(function (item) {
    //     if (item.title.trim() === selectedTitle.trim()) {
    //         var rightHeadFrame = document.getElementsByClassName('right-head-frame')[0],
    //             rightContentFrame = document.getElementsByClassName('right-content-frame')[0];
    //
    //         rightHeadFrame.value = item.title;
    //         rightContentFrame.value = item.content;
    //     }
    // })

});
//保存文章
iconSave.addEventListener('click', function () {
    var rightHeadFrame = document.getElementsByClassName('right-head-frame')[0],
        rightContentFrame = document.getElementsByClassName('right-content-frame')[0],
        catActive = document.getElementsByClassName('cat-active')[0],
        selectorNote = catActive.innerHTML.split('(')[0],
        content = localStorage.getItem('notes');
        content = JSON.parse(content);
    if (contentState === 'add') {
        console.log('addaddd');
        iconsaveHandler();
        content[selectorNote].push({
            title: rightHeadFrame.value,
            content: rightContentFrame.value,
            date:new Date().getTime()
        });
    } else if (contentState === 'edit') {
         // console.log('editeditedit');
         content[selectorNote].forEach(function (art) {
             var date = rightHeadFrame.dataset.date;
             if(art.date == date){
                 art.title = rightHeadFrame.value;
                 art.content = rightContentFrame.value;
             }
         });
    }
    localStorage.setItem('notes', JSON.stringify(content));
    location.reload();// 刷新页面
});


//保存新的笔记, 生成新列表
function iconsaveHandler() {
    // TODO
    var newHead = rightHeadFrame.value;
    var newNote = rightContentFrame.value;
    var ulName = centerFrame.getElementsByTagName('ul')[0];
    ulName.innerHTML += '<li><h5 data-date="' + rightHeadFrame.dataset.date + '">' + newHead + '</h5><p>' + newNote + '</p></li>';
}

// 生成文档列表
function catHandler(event, isFirst) {
    var menu, target;

    if(isFirst){
        target = event;
    }else {
        target = event.target;
    }

    menu = target.innerHTML.split('(')[0];

    var content = localStorage.getItem('notes'),
        content = JSON.parse(content)[menu];
    centerContent.innerHTML = null;
    var contentStr = '';

    content.forEach(function (item) {
        contentStr += `<li> <h5 data-date="${item.date}"> ${ item.title } </h5> <p> ${ item.content } </p>  </li>`
    });
    centerContent.innerHTML = contentStr;
}

//创造新的笔记
function createHandler(event) {
    var rightHeadFrame = document.getElementsByClassName('right-head-frame')[0],
        rightContentFrame = document.getElementsByClassName('right-content-frame')[0];
    rightHeadFrame.value = '';
    rightContentFrame.value = '';
    rightHeadFrame.dataset.date = new Date().getTime();
    contentState = 'add';
}

//删除笔记
function iconCloseHandler(){
    var rightHeadFrame = document.getElementsByClassName('right-head-frame')[0];
    var dateTime = rightHeadFrame.getAttribute('data-date');

    var deleteLi = document.getElementsByClassName('cat-active')[0];
    var catName = deleteLi.innerHTML.split('(')[0];
    var local = JSON.parse(localStorage.getItem('notes'));
    
    local[catName].forEach(function (item, index) {
        if(item.date == dateTime){
            local[catName].splice(index,1);
        }
    });

    localStorage.setItem('notes',JSON.stringify(local));
    location.reload();
}