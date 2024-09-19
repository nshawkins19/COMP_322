//Finish table calculations

document.getElementById("calculator");
//Math Section
let x, y, operator, result, min, max, avg, total,count;

x = parseInt(prompt("Enter the first number"));

count = 0;
total = 0;

//Creating the table
document.write("<table border = '1'>");
document.write("<tr><th>x</th><th>op</th><th>y</th><th>result</th></tr>");

while (x != null) {
  count++;
  x = parseInt(x);
  
  operator = prompt("Enter a valid operation [ + , - , * , / , or %]");
  y = prompt("Enter another number");
  y = parseInt(y);
  //Handling Operations
  switch (operator) {
    case "+":
      result = parseInt(x + y);
      break;
    case "-":
      result = x - y;
      break;
    case "*":
      result = x * y;
      break;
    case "/":
      result = x / y;
      break;
    case "%":
      result = x % y;
      break;
    default:
      result = 0 / 0;
      break;
  }

  if (count ==1){ //Sets initial min and max values
    min = result;
    max = result;
  }

  if(result < min){ //Changes the min value if result < min
    min = result;
  }

  if (result > max){ //Changes the max value if result > max
    max = result;
  }

  //Table Section
  document.write(
    "<tr><td>" +
      x +
      "</td><td>" +
      operator +
      "</td><td>" +
      y +
      "</td><td>" +
      result +
      "</td></tr>"
  );
total +=result;
  x = prompt("Enter the first number");
} //end while
//After loop, compute these nums: minimum, maximum, average, and total
avg = total / count;
document.write(
  "<tr><th>Minimum</th><th>Maximum</th><th>Average</th><th>Total</th></tr>"
);
document.write(
  "<tr><td>" +
    min +
    "</td><td>" +
    max +
    "</td><td>" +
    avg +
    "</td><td>" +
    total +
    "</td></tr>"
);
document.write("</table>");
