var URL = 'http://ec2-54-210-131-157.compute-1.amazonaws.com/feed/:djones14'
var count = 0;
var interval;

//liek viewDidLoad for iOS
$( document ).ready(function() {
    startInterval();
});

function makeRequest(URL, callback) {
    console.log("making a request");
     $.get(URL, function(data, status) {
         console.log(data);
      displayTweets(data, status);
   });
}

function displayTweets(tweets) {
    for (i = 0; i < tweets.length; i++) {
        if (count >= 26) {
            console.log("removing tweet");
            removeTweet();
        } else {
            count++;
        }
        
        var tweet = tweets[i];
        var name = tweet["user"]["name"];
        var text = tweet["text"];
        addTweet(name, text);
    }
}

function handleClick(cb) {
    if (cb.checked) {
        //start
        startInterval();
    } else {
        //stop
        clearInterval(interval);
    }
}

function startInterval() {
    interval = setInterval(function(){ makeRequest(URL, "hi") }, 3000);
}

function addTweet(name, text) {
     var stream = $('#stream');
                
    var tweet = $("<div></div>").addClass("tweet");
    var content = $("<content></content>").addClass("content");
    tweet.append(content);
    
    var img = $('<img class="avatar" src="img/damenleeturks.jpg" />');
    var name = $('<strong class="fullname">' + name + '</strong>');
    var text = $('<p class="tweet-text">' + text + '</p>');
    content.append(img);
    content.append(name);
    content.append(text);
    
    stream.prepend(tweet);
}

function removeTweet() {
    var stream = document.getElementById("stream");
    console.log(stream);
    clean(stream);
    var lastTweet = stream.lastChild;
    console.log(lastTweet);
    stream.removeChild(lastTweet);
}

//To get rid of white spaces, when we we are trying to remove a tweet node from the stream.
function clean(node)
{
  for(var n = 0; n < node.childNodes.length; n ++)
  {
    var child = node.childNodes[n];
    if
    (
      child.nodeType === 8 
      || 
      (child.nodeType === 3 && !/\S/.test(child.nodeValue))
    )
    {
      node.removeChild(child);
      n --;
    }
    else if(child.nodeType === 1)
    {
      clean(child);
    }
  }
}

