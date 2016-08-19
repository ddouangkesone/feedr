$(document).ready(function() {
    var xhr = new XMLHttpRequest;

    xhr.onreadystatechange = function() {

        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
                var data = JSON.parse(this.responseText);
                var source = $("#wee").html();
                var template = Handlebars.compile(source);

                // console.log(data.data.children.length)
                $('.preloader-wrapper.active').hide()
                $('.modal-trigger').leanModal();

                for (i = 0; i <= data.data.children.length - 1; i++) {

                    var context = {
                        title: "test",
                        image: "test2",
                        link: "test3",
                        modal: "test4"
                    };


                    context.title = data.data.children[i].data.title
                    context.link = data.data.children[i].data.url
                    context.modal = "modal"+ i

                    console.log(context.modal);
                    if (data.data.children[i].data.preview) {
                        context.image = data.data.children[i].data.preview.images[0].source.url;


                    } else {
                        // console.log(context);
                        // $('#pageContent').append(html);
                    }

                    $('.materialboxed').materialbox();
                    var html = template(context);
                    $('#pageContent').append(html);
                    $('.modal-trigger').leanModal();
                }

            }

        }

    }

    xhr.open('GET', 'https://www.reddit.com/r/FixedGearBicycle.json')
    xhr.send();
});
