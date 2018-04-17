$(document).ready(function() {
  $('form').on('submit', function(e) {
    e.preventDefault();
    insertBurger();
  })
  getBurgers();

  $('#submit').on('click', insertBurger);
});

function getBurgers () {
  $.ajax({
    url: '/api/burgers',
    method: 'GET',
    dataType: 'JSON',
  }).then(function(res) {
    $('#left,#right').html('');
    for(let i in res) {
      var burger = res[i];
      if(burger.devoured) {
        let div = $('<div/>');
        div.html(burger.id + ' ' + burger.name);
        $('#right').append(div);
      } else {
        let div = $('<div/>');
        let button = $('<button />');
        let span = $('<span/>');
        span.html(burger.id + '. ' + burger.name);
        div.append(span);
        div.append(button);
        button.html('Devour it!');
        button.on('click', function() {
          return (function(burger){
            $.ajax({
              url: '/api/burgers',
              method: 'PUT',
              dataType: 'JSON',
              data: {
                id: burger.id,
                devoured: true
              },
              complete: function () {
                getBurgers();
              }
            });
          })(res[i]);
        });
        $('#left').append(div)
      }
    }
  });
}

function insertBurger() {
    const name = $('#burger').val().trim();
    if(!name)
      return alert("Type burger name");
    $.ajax({
      url: '/api/burgers/new',
      method: 'POST',
      dataType: 'JSON',
      data: {
        name
      }
    }).then(function(res) {
      $('#burger').val('');
      getBurgers();
    });
  }