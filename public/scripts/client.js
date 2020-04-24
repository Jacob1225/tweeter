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

    //---CREATING THE FOOTER ---------------------------------
    const $footer = $(`<footer>`); 

    const $dateP = $(`<p>`).addClass(`date`);
    let dateDays = Math.floor(tweetObject.created_at / (60*60*60*24*1000));
    $dateP.text(`${dateDays} days ago`).appendTo($footer);

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

//---------FUNCNTION THAT EXECUTES A GET REQUEST TO RETRIEVE ALL THE TWEETS WHEN CALLED 
const loadTweets = function () {
    $.ajax( {
        url: '/tweets',
        type: 'GET',
        dataType: 'JSON',
        success: response => renderTweets(response)
    })
};

$(document).ready(function () {
    loadTweets(); 

    //--------Toggles the compose new tweet container when clicked and hides it when clicked again---------------
    $('.compose').click(function(event) {
        $('.new-tweet').slideToggle('fast');
        $('#tweet-text').focus();
    })

    //---------FUNCTION THAT VALIDATES THE USER'S INPUT AND RETURNS TRUE IF NO ERRORS OCCUR-----------
    const formValidation = function () {
        let text = $('#tweet-text');
        const MAX_LENGTH = 140;

        if (text.val().length > MAX_LENGTH) {
            $('#error').slideDown('fast', function() {
                $('#error span').text('Sorry, too many characters');
            });
            
            text.focus();
            return false;
       
        } else if (!text.val()) {
            
            $('#error').slideDown('fast', function() {
                $('#error span').text('Sorry, text field cannot be blank');
            });

            text.focus();
            return false;
        }
        $('#error').slideUp('fast');
        return true;
      };
    
    //----------FUNCTION THAT CALLS THE FORMVALIDATION FUNCTION AND EXECUTES A POST REQUEST---------
    $('form').submit(function (event) {
        event.preventDefault();
        
        let text = $('#tweet-text').val();
        
        if (formValidation()) {
            
            $.ajax( {
                url: '/tweets',
                type: 'POST',
                data: {text}
            })
    
            .then((tweet) => {createTweetElement(tweet).prependTo('#tweet-container')});
            $('#tweet-text').val('');
            $('.counter').text('140');
        }
    });
});





