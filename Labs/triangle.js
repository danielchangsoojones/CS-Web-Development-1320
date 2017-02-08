//var edges = document.getElementsByClassName("edges");
var edges = [10,10,10];
var a = edges[0];
var b = edges[1];
var c = edges[2];

function calculatePerimeter() {
    return a + b + c;
}

function calculateArea() {
    var p = calculatePerimeter() / 2;
    return Math.sqrt(p * (p - a) * (p - b) * (p - c));
}

console.log(calculatePerimeter());
console.log(calculateArea());

function getTriangleType() {
    var sideA = a;
    var sideB = b;
    var sideC = c;
    
    var triangleType = "Not a triangle";
    if (sideA == sideB && sideB == sideC) {
        console.log("hiii");
        triangleType = "Equalateral";
    }
    if (sideA == sideB && sideA != sideC) {
        triangleType = "Isosceles"
    }
    if (sideA != sideB == sideC) {
        triangleType = "Isosceles"
    }
    if (sideA != sideB && sideB != sideC && sideC != sideA) {
        triangleType = "Scalene!"
    }
    return triangleType;
}

function getTriangleAngleType() {
    var x = a;
    var y = b;
    var z = c;
    
    
    if((x<=0) || (y<=0) || (z<=0)) {
      console.log("This is not a triangle.\n");
    } else {
        if((x + y <= z) || (x + z <= y) || (y + z <= x)) {
            console.log("This is not a triangle.\n");
        } else {
            var longest = z;
            if (longest < x) {
                z = longest;
                longest = x;
                x = z;
            }
            if (longest < y) {
                z = longest;
                longest = y;
                y = z;
            }

            if( x * x + y * y == longest * longest ) {
                console.log("This is a right-angled triangle.\n");
            } else if( x * x + y * y > longest * longest) {
                console.log("This is an acute-angled triangle.\n");
            } else console.log("This is an obtuse-angled triangle.\n");
        }
  }
}

console.log(getTriangleAngleType());
console.log(getTriangleType());