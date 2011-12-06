$(document).ready(function() {
    
    executeLoadtimeActions();
    loadCheckboxBehavior();
    loadAddForm();
    loadEditForm();
    loadCancelButtonBehavior();
    loadDeleteButtonBehavior();
    
    $('#btnSave').click(function() {
        validateData();
        $('#frmSave').submit();
    });

});

function validateData() {
    
    $("#frmSave").validate({

        rules: {
            'skill[name]' : {
                required:true,
                maxlength: 120,
                remote: {
                   url: urlForExistingNameCheck
                }

            },
            'skill[description]' : {
                maxlength: 250
            }

        },
        messages: {
            'skill[name]' : {
                required: lang_nameIsRequired,
                remote: lang_nameExists
            },
            'skill[description]' : {
                maxlength: lang_descLengthExceeded
            }

        },

        errorPlacement: function(error, element) {
            error.appendTo(element.next('div.errorHolder'));

        }

    });
    
}

function executeLoadtimeActions() {
    
    $('#saveFormDiv').hide();
    
    $('table.data-table tbody tr:odd').addClass('odd');
    $('table.data-table tbody tr:even').addClass('even');
    
}

function loadCheckboxBehavior() {
    
    $("#checkAll").click(function(){
        if($("#checkAll:checked").attr('value') == 'on') {
            $(".checkbox").attr('checked', 'checked');
        } else {
            $(".checkbox").removeAttr('checked');
        }
    });

    $(".checkbox").click(function() {
        
        $("#checkAll").removeAttr('checked');
        
        if(($(".checkbox").length - 1) == $(".checkbox:checked").length) {
            $("#checkAll").attr('checked', 'checked');
        }
        
        if ($(".checkbox:checked").length > 0) {
            $('#btnDel').removeAttr('disabled');
        } else {
            $('#btnDel').attr('disabled', 'disabled');
        }
        
    });    
    
}

function loadAddForm() {
    
    $("#btnAdd").click(function(){
        
        $('#saveFormDiv').show();
        $('#saveFormHeading').text(lang_addFormHeading);
        
        $('#recordsListTable td.check').hide();
        $('#messageBalloon_success').hide(); // TODO: Check again
        
        for (i in saveFormFieldIds) {
            $('#'+saveFormFieldIds[i]).val('');
        }
        
        $('#'+recordKeyId).val('');
        
        _removeRecordLinks();
        
        _clearErrorMessages();
        
    });
    
}

function loadEditForm() {
    
    $('#recordsListTable a').live('click', function() {
        
        $('#saveFormDiv').show();
        $('#saveFormHeading').text(lang_editFormHeading);
        $('#messageBalloon_success').hide(); // TODO: Check again 

        var row = $(this).closest("tr");
        
        var i=0;
        row.children("td.tdValue").each(function(){
            
            if (saveFormFieldIds[i] !== undefined) {
                $('#'+saveFormFieldIds[i]).val($.trim($(this).text()));
            }
            
            i++;

        });
        
        $('#'+recordKeyId).val(row.find('input.checkbox:first').val());
        
        _clearErrorMessages();
        
    });
    
} 

function loadCancelButtonBehavior() {
    
    $("#btnCancel").click(function(){
        
        $('#saveFormDiv').hide();
        
        $('#recordsListTable td.check').show();
        
        _addRecordLinks();
        
    });
    
} 

function loadDeleteButtonBehavior() {   
    
    if ($(".checkbox:checked").length == 0) {
        $('#btnDel').attr('disabled', 'disabled');
    } 
    
    $('#btnDel').click(function(){
        $('#frmList').submit();
    });
    
}

function _removeRecordLinks() {
    $('#recordsListTable tbody td.tdName a').each(function(index) {
        $(this).parent().text($(this).text());
    });
}

function _addRecordLinks() {
    $('#recordsListTable tbody td.tdName').wrapInner('<a href="#"/>');
}

function _clearErrorMessages() {    
    $('.errorHolder').each(function(){
        $(this).empty();
    });    
}

