let container=document.querySelector('.container');
console.log(container);
const key=`39dd5a30047f401291bb63a34b0f917b`;
let body=document.querySelector('body');
let fromDate=document.querySelectorAll('input[type="date"]')[0];
let toDate=document.querySelectorAll('input[type="date"]')[1];
let sortBy=document.querySelectorAll('select')[0];
let language=document.querySelectorAll('select')[1];
// console.log(sortBy,language,sortBy.value);
// console.log(fromDate , toDate ,fromDate.value, toDate.value );
let loadImage = function(variable){
    var image = new Image();
    var url_image = variable;
    image.src = url_image;
    if (image.width == 0) {
        return 0;
    } else {
        return 1;
    }
}
function create(element){
    let div=document.createElement('div');
    div.classList.add('innerbox')
    if(element.urlToImage){
        div.innerHTML=`
        <img src=${element.urlToImage} alt="">`
    }
    div.innerHTML+=`
    <h2>Title</h2>
    <div class="title">${element.title}</div>
    <h2>Description</h2>
    <div class="description">${element.description}</div>
    <h2>Content</h2>
    <div class="content">${element.content}</div>
    <a class="readmore" href="${element.url}">Read more</a>
    `;
    container.appendChild(div);
}
window.addEventListener('load',async ()=>{
    container.innerHTML=``;
    try {
        console.log('getting data');
        let response=await fetch('https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=39dd5a30047f401291bb63a34b0f917b')
        let data=await response.json();
        console.log(data.articles);
        data.articles.forEach((element,idx) => {
            // console.log(element,idx);
            create(element);
        });          
    } catch (error) {

        console.log('error occ',error);
    }
    
})
let btn=document.querySelector('.btn');
let inp=document.querySelector('.inp');
btn.addEventListener('click',async(e)=>{
    e.preventDefault();
    // console.log(fromDate , toDate ,fromDate.value, toDate.value );
    let val=inp.value;
    // console.log(val);
    let today=new Date();
    // console.log(new Date(),' ',today);
    inp.value=``;
    try{
        container.innerHTML=``;
        let predate,nextdate;
        predate=fromDate.value;
        nextdate=toDate.value;
        // console.log(fromDate.value,toDate.value,(fromDate.value),(toDate.value));
        if(!(toDate.value.length)){
            nextdate=new Date();
        }
        else{
            nextdate=new Date(toDate.value)
        }
        if(!(fromDate.value.length)){
            predate=new Date()
        }
        else{
            
            predate=new Date(fromDate.value)
        }
        if((new Date(nextdate))>=(new Date())){
            nextdate=new Date();
        }
        
        if(sortBy.value=='SortBy'){
            sortBy.value='publishedAt';
        }
        // console.log('after\n\n');
        // console.log(toDate,fromDate, nextdate, predate);
        let month1=predate.getMonth()+1;
        let month2=nextdate.getMonth()+1;
        let day1=predate.getDate();
        let day2=nextdate.getDate();
        month1=month1<9?'0'+(month1+1):(month1+1);
        day1=day1<10?'0'+day1:day1;
        month2=month2<9?'0'+(month2+1):(month2+1);
        day2=day2<10?'0'+day2:day2;

        // console.log('date and month',month1,day1,val);
        // console.log('https://newsapi.org/v2/everything?q=${val}&from=${predate.getFullYear()}-${month1}-${day1}&to=${nextdate.getFullYear()}-${month2}-${day2}&sortBy=${publishedAt}&apiKey=39dd5a30047f401291bb63a34b0f917b');
        let myUrl=
         `https://newsapi.org/v2/everything?q=${val}&from=${predate.getFullYear()}-${month1}-${day1}&to=${nextdate.getFullYear()}-${month2}-${day2}&sortBy=${sortBy.value}&apiKey=39dd5a30047f401291bb63a34b0f917b`;//language
         if(language.value!='languageSelect'){
        myUrl=`https://newsapi.org/v2/everything?q=${val}&from=${predate.getFullYear()}-${month1}-${day1}&to=${nextdate.getFullYear()}-${month2}-${day2}&sortBy=${sortBy.value}&language=${language.value}&apiKey=39dd5a30047f401291bb63a34b0f917b`;
        }
    //    console.log(' url  to find ',myUrl);
        let response=await fetch(myUrl)
        let data=await response.json();
        if(data.status=='error'){
            container.innerHTML='<h1>  SOME ERROR OCCURED  ..........</h1>' 
        }
        else{

            // console.log(data.articles);
            if(data.articles.length==0){
                container.innerHTML='<h1> NO DATA FOUND ..........</h1>'
            }
            data.articles.forEach((element,idx) => {
                // console.log(element,idx);
                create(element);
            }); 
        }
    }
    catch(error){
// console.log(error,'this occured');
container.innerHTML='<h1> SEARCH SOME  DATA  ..........</h1>'
// console.log(container);
    }
    })
    // console.log(btn);
    