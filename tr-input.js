/**
 * Created by bailinlin on 16/9/22.
 *
 * 表单验证需要实现目标
 *
 * v1.0.0 实现目标
 *
 *  验证类型可配置
 *      1. email
 *      2. phone
 *      3. url
 *
 * v2.0.0 实现目标
 *
 *  参数可配置
 *      1. require 是否必填
 *      2. minlength 最小长度
 *      3. maxlength 最大长度
 *      4. pattern 正则验证
 *      5. name 表单名称
 *      6. 对 input 和 radio ,checkbox 做个区别
 *
 * 
 */

(function($){

    var trInput = function () {};

    trInput.prototype = {
        phoneRule:function (item) {
            var reg = new RegExp(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/)

            if(reg.test($(item).val())){
                console.log('表单验证通过')
                if($(item).nextAll().length){
                    $(item).parent().find('.text-danger').text('')
                }
                return true
            }else{
                if($(item).nextAll().length){
                    $(item).parent().find('.text-danger').text('表单验证不通过')
                }else{
                    $(item).empty().after('<div class="text-danger">表单验证不通过</div>')
                }
                return false

            }
        },
        emailRule:function (item) {
            var email = $(item).val()
            var emailParts = email.toLowerCase().split('@'),
                localPart = emailParts[0],
                domain = emailParts[1];


            if (localPart && domain) {

                if( localPart.indexOf('"') === 0 ) {
                    var len = localPart.length;
                    localPart = localPart.replace(/\"/g, '');
                    if( localPart.length !== (len-2) ) {
                        return false; // It was not allowed to have more than two apostrophes
                    }
                }

                console.log('trInput.prototype.validatorFunction(emailParts[1]',trInput.prototype.validatorFunction(emailParts[1]))
                if(trInput.prototype.validatorFunction(emailParts[1]) &&
                    localPart.indexOf('.') !== 0 &&
                    localPart.substring(localPart.length-1, localPart.length) !== '.' &&
                    localPart.indexOf('..') === -1 &&
                    !(/[^\w\+\.\-\#\-\_\~\!\$\&\'\(\)\*\+\,\;\=\:]/.test(localPart))){
                    if($(item).nextAll().length){
                        $(item).parent().find('.text-danger').text('')
                    }
                }
                return

            }
            if($(item).nextAll().length){
                $(item).parent().find('.text-danger').text('表单验证不通过')
            }else{
                $(item).empty().after('<div class="text-danger">表单验证不通过</div>')
            }
        },
        urlRule:function (item) {
            var url = $(item).val()
            var urlFilter = /^(https?|ftp):\/\/((((\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])(\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])(\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/(((\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/((\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|\[|\]|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#(((\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
            if (urlFilter.test(url)) {
                var domain = url.split('://')[1],
                    domainSlashPos = domain.indexOf('/');

                if (domainSlashPos > -1) {
                    domain = domain.substr(0, domainSlashPos);
                }

                if(trInput.prototype.validatorFunction(domain)){
                    if($(item).nextAll().length){
                        $(item).parent().find('.text-danger').text('')
                    }
                    return true

                }
                return false;
            }

            if($(item).nextAll().length){
                $(item).parent().find('.text-danger').text('表单验证不通过')
            }else{
                $(item).empty().after('<div class="text-danger">表单验证不通过</div>')
            }
        },
        Validator:function (item,fun,isV,index) {
            if(fun(item)){
                isV[index] = 'pass'
            }else{
                isV[index] = 'failed'
            }
            $(item).on('blur',function () {
                if(fun(item)){
                    isV[index] = 'pass'
                }else{
                    isV[index] = 'failed'
                }
                return
            })
        },
        validatorFunction: function (val) {
            return val.length > 0 &&
                val.length <= 253 && // Including sub domains
                !(/[^a-zA-Z0-9]/.test(val.slice(-2))) && !(/[^a-zA-Z0-9]/.test(val.substr(0, 1))) && !(/[^a-zA-Z0-9\.\-]/.test(val)) &&
                val.split('..').length === 1 &&
                val.split('.').length > 1;
        }
    };

    $.fn.trInput = function() {
        var that = this;
        var isValid = []

        that.form = $('body').find('form')

        $.map(that.form,function (_form) {

            var _element = $(_form).find('input[tr-valid],textarea[tr-valid]')

            $(_form).on('submit',function () {
                $.map(_element,function (ele,index){
                    switch($(ele).attr('tr-valid')){
                        case 'phone':
                            trInput.prototype.Validator(ele,trInput.prototype.phoneRule,isValid,index)
                            break
                        case 'email':trInput.prototype.Validator(ele,trInput.prototype.emailRule,isValid,index)
                            break
                        case 'url':trInput.prototype.Validator(ele,trInput.prototype.urlRule,isValid,index)
                            break;
                    }
                })

                var int = setInterval(function () {
                    for(var i=0;i<isValid.length;i++){
                        if(isValid[i]=='failed'){
                            return false
                        }
                    }

                    if(isValid.length==_element.length){
                        clearInterval(int)
                        return true
                    }
                },100)

                for(var i=0;i<isValid.length;i++){
                    if(isValid[i]=='failed'){
                        return false
                    }
                }
            })
        })
    };

})(jQuery);


$("body").trInput()



