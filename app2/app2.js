$(document).ready(function(){

$("#insta").on('click', function(){
  window.location = 'https://api.instagram.com/oauth/authorize/?client_id=5c0b4629ad8f4ae6a9ff21ecd5388e25&redirect_uri=http://localhost:3000/app2/app2.html&response_type=token'

})

if (location.hash) {
        var hash = location.hash.split('#')
        var xhr = new XMLHttpRequest;




        console.log(hash[1]);
        $("#insta").hide();

        xhr.onreadystatechange = function(){

          if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
              var data = JSON.parse(this.responseText);
              var content = data.data;
              var source = [$("#insta-template-video").html(), $("#insta-template-picture").html()];
              // var source2 = $("#insta-template-picture").html();
              var template = Handlebars.compile(source[1]);
              // var template2 = Handlebars.compile(source2);




              for(i = 0; i < content.length - 1; i++ ) {
                var context = {videoURL: " ", imgUrl: " "};


                if(data.data[i].type === 'video'){

                  context.videoURL = data.data[i].videos.low_resolution.url;
                  var template = Handlebars.compile(source[0]);
                  var html = template(context);
                  $('#content').append(html);
                  // console.log(html + 'hit')
                } else if(data.data[i].type === 'image'){
                  console.log('hit image');
                  context.imgUrl = data.data[i].images.standard_resolution.url
                  var template = Handlebars.compile(source[1]);
                  var html = template(context);
                  // console.log(html)
                  $('#content').append(html);
                  console.log(context)

                }



                $('.materialboxed').materialbox();

              }

            }
          }
        }

    xhr.open('GET', 'https://accesscontrolalloworiginall.herokuapp.com/https://api.instagram.com/v1/users/self/media/recent/?' + hash[1]);
    xhr.send();
}

});
