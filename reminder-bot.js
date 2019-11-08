  var botui = new BotUI('reminder-bot');

  botui.message
    .bot(
      {
        delay: 2000,
        content: 'Can I help you with filling a loan application?'
    })
    .then(function () {
      return botui.action.button({
        delay: 1000,
        action: [{
          text: 'Yesaa',
          value: 'yes'
        }, {
          text: 'No, I have another query!',
          value: 'no'
        }, {
          text: 'Need to talk with customer care rep',
          value: 'custcare'
        }]
      })
  }).then(function (res) {
    if(res.value == 'yes') {
      showReminderInput();
    } else {
      botui.message.bot({
        delay: 2000,
        loading: true,
        content: 'Sure! Enter your query below and I will help you.'})
      .then(function () {
        return botui.action.text({
          delay: 2000,
          action: {
            placeholder: 'Type here... '
          }
        })
      });
    }
  });

  var showReminderInput1 = function () {

  botui.message
      .bot({
        delay: 500,
        content: 'Please enter your full name'
          }).then(function () {
        return botui.action.text({
          delay: 1000,
          action: {
            placeholder: 'Arun, Kumar'
          }
        })
      }).then(function (res) {
    if(res.value !== null) {
      botui.message
      .bot({
        delay: 500,
        content: 'Please enter your age',
      })
    } else {
      botui.message.bot('Okay.');
    }
  })
  }
  var showReminderInput = function () {
    botui.message
      .bot({
        delay: 500,
        content: 'Great! Just answer a few questions and we\'ll get your application started.',
      })
  //     .then( () =>{
  //   return botui.message.bot({ // second one
  //     delay: 500, 
  //     loading: true,
  //     content: 'Name Please',
  //   })
  // })
      .then(function () {
      return botui.action.button({
        delay: 1000,
        action: [{
          text: 'Okay!',
          value: 'yes'
        }]
      })
  }).then(function (res) {
    if(res.value == 'yes') {
      showReminderInput1();
    } else {
      botui.message.bot('Okay.');
    }
  });



  }