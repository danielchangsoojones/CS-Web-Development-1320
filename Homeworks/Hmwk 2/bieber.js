var URL = 'http://ec2-54-210-131-157.compute-1.amazonaws.com/feed/:djones14'



function makeRequest(URL, callback) {
    console.log("making a request");
     $.get(URL, function(data, status) {
      if (status === "success") {
         // do something with data
          console.log(data);
      } else {
         // something went wrong, check status
      }
   });
}

function handleClick(cb) {
    console.log("clicked!!!!!");
//    makeRequest();
    addTweet();
}

function addTweet() {
     var stream = $('#stream');
    var str = 'hi'
    var name = $('<p>' + str + '</p>');
    

//    <div class="tweet">
//            <div class="content"> <img class="avatar" src="img/damenleeturks.jpg" /> 
//                <strong class="fullname">My BFF</strong> 
//                <span class="username">@mybff</span>
//                <p class="tweet-text">Today is an amazing day.</p>
//            </div>
//    </div>
                
    var tweet = $("<p>hi</p>").addClass("content");
    stream.append(tweet);
    
//    name.append()
//    
//     stream.append($('<p>' + str + '<p>').addClass("parry"))
    
    console.log(tweet);
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

