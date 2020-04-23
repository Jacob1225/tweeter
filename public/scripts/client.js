// const data = [
//     {
//       "user": {
//         "name": "Newton",
//         "avatars": "https://i.imgur.com/73hZDYK.png"
//         ,
//         "handle": "@SirIsaac"
//       },
//       "content": {
//         "text": "If I have seen further it is by standing on the shoulders of giants"
//       },
//       "created_at": 1461116232227
//     },
//     {
//       "user": {
//         "name": "Descartes",
//         "avatars": "https://i.imgur.com/nlhLi3I.png",
//         "handle": "@rd" },
//       "content": {
//         "text": "Je pense , donc je suis"
//       },
//       "created_at": 1461113959088
//     }
//   ]
 //---------FUNCTION THAT CREATES A NEW ARTICLE TWEET TO ADD TO THE TWEET CONTAINER ------------
 const createTweetElement = function (tweetObject) {
     console.log(tweetObject);
    const $article = $(`<article>`);

    const $header = $(`<header>`); 

     //---- CREATING HEADER ELEMENTS----------
    const $img = $(`<img>`).addClass(`avatar`);
    $img.attr('src', tweetObject.user.avatars).appendTo($header);


    $(`<p>`).text(tweetObject.user.name).appendTo($header);

    const $userP = $(`<p>`).addClass(`user`);
    $userP.text(tweetObject.user.handle).appendTo($header);

    //----ADD HEADER TO ARTICLE ---------

    $article.append($header);

    //----CREATING DIV WITH CLASS OF USER-TWEET-------
    const $userTweetDiv = $(`<div>`).addClass(`user-Tweet`);
    $(`<p>`).text(tweetObject.content.text).appendTo($userTweetDiv);

    $article.append($userTweetDiv);

    //---CREATING THE FOOTER ------ 
    const $footer = $(`<footer>`); 

    const $dateP = $(`<p>`).addClass(`date`);
    $dateP.text(tweetObject.created_at).appendTo($footer);

    const $footerIconsDiv = $(`<div>`).addClass(`footer-icons`);

    const $flagIcon = $(`<i>`).addClass(`fas fa-flag`);
    $flagIcon.appendTo($footerIconsDiv);

    const $retweetIcon = $(`<i>`).addClass(`fas fa-retweet`);
    $retweetIcon.appendTo($footerIconsDiv);

    const $heartIcon = $(`<i>`).addClass(`fas fa-heart`);
    $heartIcon.appendTo($footerIconsDiv);

    $footerIconsDiv.appendTo($footer);

    $article.append($footer);

    return $article;

 }

 //---------FUNCTION THAT APPENDS CREATES THE NEW TWEETS ARTICLES AND APPENDS EACH TO THE TWEET CONTAINER--------------
const renderTweets = function (tweets) {
    tweets.forEach((tweetObject) => {
        $(`#tweet-container`).prepend(createTweetElement(tweetObject));
    });
};

const loadTweets = function () {
    $.ajax( {
        url: '/tweets',
        type: 'GET',
        dataType: 'JSON',
        success: response => renderTweets(response)
    })
};

//-------- AJAX POST REQUEST ---------------------
$(document).ready(function () {
   
    
    loadTweets(); 

$('form').submit(function (event) {
    event.preventDefault();
    
    //information from the server 
    let text = $('#tweet-text').val();
    $.ajax( {
        url: '/tweets',
        type: 'POST',
        data: {text}
      })

      .then((tweet) => {createTweetElement(tweet).appendTo('#tweet-container')});
    
    });

 

});





