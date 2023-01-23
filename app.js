const APIURL="https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH="https://image.tmdb.org/t/p/w1280";
const SEARCHAPI="https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main=document.getElementById('main');
const form=document.getElementById('form');
const search=document.getElementById('search');
const serarchres=document.getElementById('srechresult');
const total_res=document.getElementById('total_res');

getmovies(APIURL);

 async function getmovies(URL){
    const respo= await fetch(URL);
    const respData=await respo.json();
    
    if(respData.results.length == 0){
      serarchres.innerHTML="no Result";
      total_res="no";
    
}
else{
  total_res.innerHTML='total Rercord = ' +respData.total_results;
}
console.log(respData);
showmovies(respData.results);

 }

function showmovies(movies){
  main.innerHTML=' ';
    // console.log(movies)

  movies.forEach((movie)=> {
    // console.log(movie)
    const movieEl=document.createElement("div");
    movieEl.classList.add('movie');
    // <div class="movie">
    //         <img src="movie12.png" alt="movie">
    //         <div class="movie_info">
    //             <h3>Fury</h3>
    //             <span>7.5</span>
    //         </div>
            
                        
    //     </div>

    movieEl.innerHTML='<img src=' +IMGPATH+movie.poster_path+' alt=""><div class="movie_info"><h3>' +movie.title+'</h3  <span class='+ getClassByRate(movie.vote_average)+'> '+movie.vote_average+'</span> </div>'  ;
    main.appendChild(movieEl);
    
  });
}
function getClassByRate(vote){
  if (vote >= 8) {
    return "green";
} else if (vote >= 5) {
    return "orange";
} else {
    return "red";
}
}
form.addEventListener('submit',(e)=>{
  e.preventDefault();
  const searchTerm = search.value;
  // console.log(searchTerm);
  if(searchTerm){
  
    getmovies(SEARCHAPI + searchTerm);
    search.value = searchTerm;
    searchres.innerHTML = "Search Result for "+searchTerm;


  }else{
    getmovies(APIURL);

  }
  
});
