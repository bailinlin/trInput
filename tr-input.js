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


/*
* TODO
* 1. 触发验证条件,submit or blur or 其他
* 2. 配置条件
* 3. radio checkbox
* */
(function($){

    var trInput = function (element, options) {
        this.init(element, options);
    };

    trInput.prototype = {
        Constructor : trInput,
        init:function (element, options) {
            var that = this;

            that.$element =$('body').find('input[tr-valid],textarea[tr-valid]')
            that.form = $('body').find('form')

            var isValid = []

            $.map(that.form,function (_form) {
                var _element = $(_form).find('input[tr-valid],textarea[tr-valid]')
                console.log('_form',$(_form))
                $(_form).on('submit',function () {
                    $.map(_element,function (ele){
                        switch($(ele).attr('tr-valid')){
                            case 'phone':
                                trInput.prototype.eventChoose(ele,trInput.prototype.phoneRule,isValid)
                                break
                            case 'email':trInput.prototype.eventChoose(ele,trInput.prototype.emailRule)
                                break
                            case 'url':trInput.prototype.eventChoose(ele,trInput.prototype.urlRule)
                                break;
                        }
                        })
                    return false
                })
            })
        },
        
        phoneRule:function (item) {
            var reg = new RegExp(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/)

            if(reg.test($(item).val())){
                console.log('表单验证通过')
                if($(item).nextAll().length){
                    $(item).parent().find('.text-danger').text('')
                    return true
                }
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
            console.log($(item).val())
            var urlFilter = /^(https?|ftp):\/\/((((\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])(\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])(\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/(((\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/((\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|\[|\]|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#(((\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
            if (urlFilter.test(url)) {
                var domain = url.split('://')[1],
                    domainSlashPos = domain.indexOf('/');

                if (domainSlashPos > -1) {
                    domain = domain.substr(0, domainSlashPos);
                    console.log('111')
                }

                if(trInput.prototype.validatorFunction(domain)){
                    if($(item).nextAll().length){
                        $(item).parent().find('.text-danger').text('')
                        console.log('222')
                    }
                }
                return ;
            }

            if($(item).nextAll().length){
                $(item).parent().find('.text-danger').text('表单验证不通过')
            }else{
                $(item).empty().after('<div class="text-danger">表单验证不通过</div>')
            }
        },
        eventChoose:function (item,fun,isV) {
            fun(item)
            // isV.push(fun(item))
            $(item).on('blur',function () {
                fun(item)
                // isV.push(fun(item))
                setTimeout(function () {
                    console.log('isValid .... 1',isV)
                },500)
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
    $.fn.trInput = function(option, args) {
        var $this = $(this),
        //向元素取该数据
            data = $this.data('trInput'),
            options = $.extend({}, $.fn.trInput.defaults, $this.data(), typeof option == 'object' && option);

        if (!data && (!option || typeof option == 'object')){
            //向元素附加数据
            $this.data('trInput', new trInput(this, options));
        }
        if (typeof option == 'string' && typeof data != 'undefined'){
            data[option].call(data, args);
        }
    };
    $.fn.trInput.defaults = $.extend({}, {
        form: 'form'
    });
    $.fn.trInput.Constructor = trInput;

})(jQuery);


$("body").trInput()



