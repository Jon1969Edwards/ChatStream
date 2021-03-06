$(function() {
    var client = ZAFClient.init();
    client.invoke('resize', { width: '100%', height: '500px' });

    client.get('ticket.requester.id').then(
        function(data) {
            var user_id = data['ticket.requester.id'];
            requestUserInfo(client, user_id);
        }
    );
});

function requestUserInfo(client, id) {
  var settings = {
    url: '/api/v2/users/' + id + '.json',
    type:'GET',
    dataType: 'json',
  };

  client.request(settings).then(
    function(data) {
      showInfo(data);
    },
    function(response) {
      showError(response);
    }
  );
}

function readJson(Choice) {
   addTags('Choice');
   
  }

function showInfo(data) {
  var requester_data = {
    'name': data.user.name,
    'tags': data.user.tags,
    'created_at': formatDate(data.user.created_at),
    'last_login_at': formatDate(data.user.last_login_at)
  };

  var source = $("#requester-template").html();
  var template = Handlebars.compile(source);
  var html = template(requester_data);
  $("#content").html(html);
}

function formatDate(date) {
  var cdate = new Date(date);
  var options = {
    year: "numeric",
    month: "short",
    day: "numeric"
  };
  date = cdate.toLocaleDateString("en-us", options);
  return date;
}

function showError(response) {
  var error_data = {
    'status': response.status,
    'statusText': response.statusText
  };
  var source = $("#error-template").html();
  var template = Handlebars.compile(source);
  var html = template(error_data);
  $("#content").html(html);
}

function showChoice() {
    var source = $("#choice-template").html();
    var template = Handlebars.compile(source);
    $("#Route").html(template);
   }
  
  function showActive(Choice) {
  
    if (Choice == "BugReport") {
    showBugReport(Choice);
    } else {
    addTags(Choice);
    var data = {'Question': Choice};
    var source = $("#activestream-template").html();
    var template = Handlebars.compile(source);
    var html = template(data);
    $("#Route").html(html);
    }
  }

  function showBugReport(Choice) {
    addTags(Choice);
    client.invoke('resize', { width: '320', height: '4000px' });
    var source = $("#bugreport-template").html();
    var template = Handlebars.compile(source);
    $("#Route").html(template);
  }
  
    function addTags(Tag) {
      client.invoke("ticket.tags.add", Tag);
  }  
  

/////////////////// JSON story JavaScript \\\\\\\\\\\\\\\\\\\\\\\\\\\

$(document).ready(function() {
  'use strict';
  // PAGE SCROLLING FEATURE
  $('a.page-scroll').bind('click', function(event) {
      var $anchor = $(this);
      $('html, body').stop().animate({
          scrollTop: ($($anchor.attr('href')).offset().top - 0)
      }, 500, 'easeInOutExpo');
      event.preventDefault();
  });
  // GET JSON FILE
  $.ajax({
    url: "story.json",
    dataType: "text",
    success: function(data) {
      // PARSE JSON FILE
      var story = $.parseJSON(data);
      // INITIAL STORY, IMAGE, AND BUTTONS
      $('#image').attr('src',story[0].image);
      $('#story').html(story[0].text);
      $('#1').html(story[0].button1);
      $('#2').html(story[0].button2);
      $('#3').html(story[0].button3);
      $('#1,#2,#3').css('display',story[0].display);
      // COUNTER
      var start = 0;
      // CHOICE 1
      $('#1').click(function() {
        // USE THE COUNTER FOR CHOICE 1
        var x = (start + '1');
        for (var i = 0; i < story.length; i++ ) {
          if ( x === story[i].story) {
            start = story[i].story;
            if ( story[i].image === '') {
              $('#image').attr('src',story[0].image);
            } else {
              $('#image').attr('src',story[i].image);        
            }
            $('#story').html(story[i].text);
            $('#1').html(story[i].button1);
            $('#2').html(story[i].button2);
            $('#2').html(story[i].button3);
            $('#1,#2,#3').css('display',story[i].display);
            return;
          } else {
          }
        }
      });// END CHOICE 1
      // CHOICE 2
      $('#2').click(function() {
        // USE THE COUNTER FOR CHOICE 2
        var x = (start + '2');
        for (var i = 0; i < story.length; i++ ) {
          if ( x === story[i].story) {
            start = story[i].story;   
            if ( story[i].image === '') {
              $('#image').attr('src',story[0].image);
            } else {
              $('#image').attr('src',story[i].image);        
            }        
            $('#story').html(story[i].text);
            $('#1').html(story[i].button1);
            $('#2').html(story[i].button2);
            $('#3').html(story[i].button3);
            $('#1,#2,#3').css('display',story[i].display);
            return;
          } else {
          }
        }
      });// END CHOICE 2
      // CHOICE 3
      $('#3').click(function() {
        // USE THE COUNTER FOR CHOICE 3
        var x = (start + '3');
        for (var i = 0; i < story.length; i++ ) {
          if ( x === story[i].story) {
            start = story[i].story;   
            if ( story[i].image === '') {
              $('#image').attr('src',story[0].image);
            } else {
              $('#image').attr('src',story[i].image);        
            }        
            $('#story').html(story[i].text);
            $('#1').html(story[i].button1);
            $('#2').html(story[i].button2);
            $('#3').html(story[i].button3);
            $('#1,#2,#3').css('display',story[i].display);
            return;
          } else {
          }
        }
      });// END CHOICE 3
    } // END SUCCESS GETTING JSON FILE
  }); // END GET JSON FILE
}); // END JQUERY