var eventToUse = 'click';
var appUrl = 'http://localhost:3000/';

function makeTemplates() {
    var templateName = '';

    $('script[type="text/x-jsrender"]').each(function(index, item) {
        templateName = $(item).attr("id");
        //console.log("TEMPLATE:" + templateName.replace("Template", ""));
        //$.templates(templateName.replace("Template", ""), $(item).html());
        $(item).attr('id', templateName.replace("Template", ""));
    });
}

function render(element, template, data, cb) {
    // $(element).html('');
    // $.tmpl(template, data).appendTo(element);
    $(element).html($.templates("#" + template).render(data));
    if (cb)
        cb();
}

function bind(element, func) {
    $(element).unbind().bind(eventToUse, func);
}

function slideIn(element, func) {
    $(element).show().transition({ x: w * -1 }, func);
}

function slideOut(element, func) {
    $(element).show().transition({ x: w * 1 }, func);
}

function swapIn(elementFrom, elementTo, func) {
    $(elementTo).show().transition({ x: w * -1 }, function() {
        $(elementFrom).transition({ x: w * 1 }, 10, function() {
            $(this).hide();
        });

        func();
    });
}

function swapOut(elementFrom, elementTo, func) {
    $(elementTo).show().transition({ x: w * -1 }, 10, function() {

        $(elementFrom).transition({ x: w * 1 }, function() {
            $(this).hide();
        });

        func();
    });
}

function hideKeyboard() {
    document.activeElement.blur();
    $("input").blur();

    //if (isiOS) {
    //    document.activeElement.blur();
    //    $("input").blur();
    //} else {
    try {
        Android.HideKeyboard();
    } catch (e) {

    }
}

function logResult(d) {
    console.log(d);
}

function preloadImages(arr) {
    var newimages = [],
        loadedimages = 0
    var postaction = function() {}
    var arr = (typeof arr != "object") ? [arr] : arr

    function imageloadpost() {
        loadedimages++
        if (loadedimages == arr.length) {
            postaction(newimages) //call postaction and pass in newimages array as parameter
        }
    }
    for (var i = 0; i < arr.length; i++) {
        newimages[i] = new Image()
        newimages[i].src = '../dishes/' + arr[i] + '.jpg';
        newimages[i].onload = function() {
            imageloadpost()
        }
        newimages[i].onerror = function() {
            imageloadpost()
        }
    }
    return { //return blank object with done() method
        done: function(f) {
            postaction = f || postaction //remember user defined callback functions to be called when images load
        }
    }
}

function execute(command, requestData, success, fail, timeout) {
    fail = ((fail == undefined) ? function() {} : fail);

    $.ajax({
        type: "POST",
        url: appUrl + command,
        data: JSON.stringify(requestData),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        timeout: timeout == undefined ? 10000 : timeout, // in milliseconds
        success: success,
        error: fail
    });
}