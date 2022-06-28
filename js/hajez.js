var noofpipole = document.getElementById("noofpipole");

var time_picker = document.getElementById("time_picker");

var date_picker = document.getElementById("date_picker");

var con2 = [1]; //POSITION AT TABLE



function buy() {
    for (let index = 0; index < con2.length; index++) {
       

        var url =
            "https://wa.me/+962797012519?text=" +
            " عدد الاشخاص : " + noofpipole.value + "%0a" +
            "تاريخ الحجز: " + date_picker.value + "%0a" +
            "الساعة: " + time_picker.value + "%0a"
            
            
    }

    window.open(url, "_blank").focus();
    ;
    }
