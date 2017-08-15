$(document).ready(function(){
  rotateBg();
  rotateTweets();
  setMinHeight();

  $(window).on("resize",function(){
    setMinHeight();
  });

  //set the minimum height of tge tweet container (fixes issue where scrollbar was appearing and dissapearing)
  function setMinHeight(){
    var $li = $("#tweet-list > li");
    var height = 0;
    var prevHeight = 0;
    var maxHeight;

    $li.each(function(){
        prevHeight = height;
        height = $li.height();
        if(height > prevHeight){
          maxHeight = height;
        }
    });

    maxHeight = Math.round(maxHeight + 100);
    maxHeight = String(maxHeight);
    maxHeight = maxHeight + "px";

    $("#tweet-list").css("min-height",maxHeight);
  }

  //rotate background images
  function rotateBg(){
    var numSlides = $(".slideshow").length;
    var curSlideNum = 0;
    var $curSlide = $(".slide-"+curSlideNum);
    var $lastSlide = $(".slide-"+(numSlides-1));

    //set delay for 1st slide
    TweenMax.to($curSlide,2,{opacity: 1, delay: 5, onComplete:nextSlide});

    //fade next slide in
    function nextSlide(){
      if(curSlideNum < numSlides-1){
        curSlideNum += 1;
      }
      else{
        curSlideNum = 0;
      }
      $curSlide = $(".slide-"+curSlideNum);
      $curSlide.removeClass("hidden");

      if(curSlideNum > 0){
        TweenMax.from($curSlide,2,{opacity: 0, onComplete:killSlide});
      }
      else{
        TweenMax.to($lastSlide,2,{opacity: 0, onComplete:killSlide});
      }
    }

    //fade slide out
    function killSlide(){
      var prevTweetNum;
      var $prevTweet;

      if(curSlideNum == 0){
        prevTweetNum = numSlides-1;
      }
      else{
        prevTweetNum = curSlideNum-1;
      }
      $prevTweet = $(".slide-"+prevTweetNum);
      $prevTweet.addClass("hidden");
      TweenMax.set($prevTweet,{opacity:1});

      TweenMax.to($curSlide,2,{opacity: 1, delay: 5, onComplete:nextSlide});
    }
  }

  //cycle through tweets
  function rotateTweets(){
    var $tweetList = $("#tweet-list");
    var tweetsArray = [];
    var curTweetNum = 0;
    var $curTweet = $($tweetList.children()[curTweetNum]);
    var slideAmount = 100;

    //inititate first tweet
    nextSlide();

    //slide tweet in
    function nextSlide(){
      $curTweet.addClass("hidden");
      TweenMax.set($curTweet,{clearProps:"all"});
      if(curTweetNum < $tweetList.children().length-1){
        curTweetNum += 1;
      }
      else{
        curTweetNum = 0;
      }
      $curTweet = $($tweetList.children()[curTweetNum]);
      $curTweet.removeClass("hidden");
      TweenMax.from($curTweet,1.3,{x: -slideAmount, opacity: 0,  ease: Power3.easeOut, onComplete:killSlide});
    }

    //slide tweet out
    function killSlide(){
      TweenMax.to($curTweet,0.7,{x: slideAmount, opacity: 0, delay: 2, ease: Power3.easeIn, onComplete:nextSlide});
    }
  }
});
