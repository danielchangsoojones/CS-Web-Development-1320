//$.ajax({
//
//  // The 'type' property sets the HTTP method.
//  // A value of 'PUT' or 'DELETE' will trigger a preflight request.
//  type: 'GET',
//
//  // The URL to make the request to.
//  url: 'http://html5rocks-cors.s3-website-us-east-1.amazonaws.com/index.html',
//
//  // The 'contentType' property sets the 'Content-Type' header.
//  // The JQuery default for this property is
//  // 'application/x-www-form-urlencoded; charset=UTF-8', which does not trigger
//  // a preflight. If you set this value to anything other than
//  // application/x-www-form-urlencoded, multipart/form-data, or text/plain,
//  // you will trigger a preflight request.
//  contentType: 'text/plain',
//
//  xhrFields: {
//    // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
//    // This can be used to set the 'withCredentials' property.
//    // Set the value to 'true' if you'd like to pass cookies to the server.
//    // If this is enabled, your server must respond with the header
//    // 'Access-Control-Allow-Credentials: true'.
//    withCredentials: false,
//    "Access-Control-Allow-Origin" : "*"
//  },
//
//  headers: {
//    // Set any custom headers here.
//    // If you set any non-simple headers, your server must include these
//    // headers in the 'Access-Control-Allow-Headers' response header.
//  },
//
//  success: function() {
//    // Here's where you handle a successful response.
//  },
//
//  error: function() {
//    // Here's where you handle an error response.
//    // Note that if the error was due to a CORS issue,
//    // this function will still fire, but there won't be any additional
//    // information about the error.
//  }
//});
//
//function loadDoc() {
//    console.log("in the load doc func")
//    setInterval(makeRequest, 3000);
//}
//
//function makeRequest() {
//    console.log("making a request");
//     $.get('http://www.example.com/content.json', function(data, status) {
//      if (status === "success") {
//         // do something with data
//      } else {
//         // something went wrong, check status
//      }
//   });
//}
//
//function setHeader(xhr) {
//  xhr.setRequestHeader('Authorization', token);
//}
function handleClick(cb) {
    console.log("clicked!!!!!");
    addTweet();
}

function addTweet() {
    var stream = document.getElementById("stream");
    var tweet = document.getElementsByClassName("tweet");
    console.log(tweet[0]);
    stream.appendChild(tweet[0]);
//   stream.insertBefore(tweet, tweet);
    
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

