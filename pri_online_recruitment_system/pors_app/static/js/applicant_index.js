$(document).ready(function(){

    // Do not use arrow function in js when definin object
    const ShowJobRequestForm = function(e){ 
        e.preventDefault();
        let button = $(this); 
        $.ajax({
            url: button.attr("data-url"),
            type: 'GET',
            dataType: 'json',
            beforeSend: () => {
                $("#modal-form").modal("show");
            },
            success: (data) => { 
                $("#modal-form .modal-content").html(data.html_form);
            }
        });

    }

    const SendJobRequestForm = function(e){
        e.preventDefault();
        let form = $(this);

        $.ajax({
            url: form.attr("data-url"),
            data: form.serialize(),
            cache: false,
            type: form.attr("method"),
            dataType: 'json',
            success: (data) => {
                if(data.form_is_valid){
                    $("#modal-form").modal("hide"); 
                    location.reload(true);
                }else{
                    $("#modal-form .modal-content").html(data.html_form);
                }
            }
        });

        return false;
    }
    
 
    $(".show-apply-form").on("click", ShowJobRequestForm);
    $("#modal-form").on("submit", ".applicant-job-request-form", SendJobRequestForm);

    // Show applicant job request status

    const ShowJobRequestStatus = function(e){ 
        e.preventDefault();
        let button = $(this); 
        $.ajax({
            url: button.attr("data-url"),
            type: 'GET',
            dataType: 'json',
            beforeSend: () => {
                $("#modal-form-large").modal("show");
            },
            success: (data) => { 
                $("#modal-form-large .modal-content").html(data.html_form);
            }
        });

        return false;
    }

    $("#menu-show-job-request-status").click(ShowJobRequestStatus);
    $("#menu-show-job-hired-status").click(ShowJobRequestStatus);


});