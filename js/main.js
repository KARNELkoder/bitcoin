$(document).ready(function () {
    $('.mob_b').click(function () {
        $(this).toggleClass('active');
        $('.main_out header .right ul').toggleClass('active');
        return false;
    })

    $('.faq_out .faq .items .item .top').click(function () {
        $(this).parent().toggleClass('active');
        $(this).parent().find('.bot').toggle("slow", function () {});
        return false;
    })

    $('.main_out header .right ul li a, .main_out .main .left .best .best_line .rev_link').click(function () {
        var elementClick = $(this).attr("href");
        var destination = $(elementClick).offset().top;
        $('html, body').animate({
            scrollTop: destination
        }, 600);
        $('.main_out header .right ul').removeClass('active');
        $('.mob_b').removeClass('active');
        return false;
    })
    
})

$('.payment-button').on('click', function() {
    var $this = $(this);
    var $modal = $('#payment-modal');
    var type = $this.data('mzType');
    var price = $this.data('mzPrice');
    var title = $this.data('mzTitle');

    $modal.find('.item-description').text('Активация на ' + title);
    $modal.find(".item-amount").text(price + ' руб.');
    $("input[name=type]").val(type);

    $(".input-label").hide();
})

$('#payment-form').submit(function(e) {
    e.preventDefault();
    
    var $this = $(this);
    var $btn = $this.find(':submit').attr('disabled', true);

    $.ajax ({ 
        url: $this.attr('action'),
        type: 'post',
        data: $this.serialize(),
        dataType: 'json',
        success: function (d) {
            if (d.error) {
                $this.find('.label-mail--msg').html(d.msg).fadeIn();
            } else {
                window.location.href = d.link;
            }
                
            $btn.attr('disabled', false);
        },
        error: function(e) {
            alert('Произошла ошибка!');
            $btn.attr('disabled', false);
            console.error('Error:', e);
        }
    })
}).find('[name="email"]').on('input', function() {
    if (/\s*/g.test(this.value)) {
        this.value = this.value.replace(/\s*/g, '');
    }
})
