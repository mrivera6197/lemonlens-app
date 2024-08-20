function redirectHome() {
    window.location.href = '/home';
}
// funcs for users 

function redirectForUsers() {
    window.location.href = '/movies';
}

// funcs for admins 

function redirectForAdmin() {
    window.location.href = '/moviesAdmin';
}

function addMovie(){
    window.location.href = '/moviesAdmin/add';
}

function addRating(){
    window.location.href = 'moviesAdmin/addRating'
}

function cancelAdd(){
    window.location.href = '/moviesAdmin';
}

function cancelDelete(){
    window.location.href = '/moviesAdmin';
}

