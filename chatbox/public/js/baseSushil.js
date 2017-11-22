var eventToUse = 'click';
var appUrl = 'http://192.168.1.20:5000/';

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
    //$(element).html($.templates("#" + template).render(data));

    var xx = $.templates("#" + template);
    xx.link(element, data)
    if (cb)
        cb();
}

function bind(element, func) {
    $(element).unbind().bind(eventToUse, func);
}

function rb(element, template, data, button, cb, rcb) {
    render(element, template, data, function() {
        if (rcb)
            rcb(button);

        bind(element + ' ' + button, function() {
            //  var r = $(this).tmplItem().data;
            var view = $.view(this);
            var r = view.data;
            cb($(this), r);
            //logClicks();
        });
    })
}