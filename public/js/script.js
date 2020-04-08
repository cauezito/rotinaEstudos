$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active'); 
        let sidebar = document.getElementById('sidebar');
        //Se o menu estiver "oculto"
       if(sidebar.style.marginLeft === '-250px'){
           sidebar.style.marginLeft = '0px';
        } else {
            sidebar.style.marginLeft = '-250px';
        }   
    });
});



