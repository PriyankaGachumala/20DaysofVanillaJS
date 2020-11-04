const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const selectedMovie = document.getElementById('movie');

//function call to grab data from local storage and populate UI
populateUI();

//converting strig to a number. we can use parseInt() or by adding + in fornt of the string.
let ticketPrice= +selectedMovie.value;

//----------------------Functions------------------------------

//saving movie index and price in local storage
function setMovie(index, price){
    localStorage.setItem('selectedMovieIndex',index);
    localStorage.setItem('selectedMoviePrice',price)
}

//function to update value of total and count which is getting displayed in paragraph tag
function updateSelectedCount(){
    //all the elements with class row.seat.selected will be grabbed and kept in a NodeList which is similar as an array
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const seatIndex=[...selectedSeats].map((seat)=>{
        return [...seats].indexOf(seat);
    });

    localStorage.setItem('selectedSeats',JSON.stringify(seatIndex));

    //selected seats will be a NodeList. Can perform all the functions like we perform on an array
    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount*ticketPrice;
}

//getting data from local storage and populating UI
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats!== null && selectedSeats.length > 0){
        seats.forEach((seat,index)=>{
            if(selectedSeats.indexOf(index)>-1){
                seat.classList.add('selected');
            }
        });
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !== null){
        selectedMovie.selectedIndex = selectedMovieIndex; 
    }
}

//-------------------------------Even listeners------------------------------------

//selecting movies event [dropdown]
selectedMovie.addEventListener('change',(e)=>{
    ticketPrice = +e.target.value;
    setMovie(e.target.selectedIndex, e.target.value);
    updateSelectedCount();

})

//selecting seats event
container.addEventListener('click', (e)=>{
    //console.log(e.target.classList)
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
})

//--------------------updating initial count and total after page reload-----------------
updateSelectedCount();