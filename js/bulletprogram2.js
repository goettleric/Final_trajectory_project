/*This calculator takes velocity, firing angle and a given distance to make a 
aproximation for the flight of a projectile.  The only force factored in on this
version in gravity.  No other variables of ballistics are used.
Written by Eric Goettl 
Dated: 12/12/2015 */

function Main () {
  //variable declaration
  var bulletCalculator = document.getElementById("bulletCalculator");
  var bulletPositionRange = document.getElementById("bulletPositionRangeField");
  var bulletPosition = 0;
  var bulletFireAngle = document.getElementById("bulletFireAngleField");
  var bulletHorizontalVelocity;
  var bulletMaxiumHeight;
  var bulletVelocity = document.getElementById("bulletVelocityField");
  var bulletVerticalVelocity;
  var gravity = 9.8;
  var roundValue = document.getElementById("roundValueField");
  var totalDistance;
  var totalTime;
  
  //Information gathering from html form
  bulletCalculator.addEventListener("submit", function(event) {
    
    event.preventDefault();
    //Convert input to useable format and case
    bulletVelocity = bulletVelocityField.value;
    bulletFireAngle = bulletFireAngleField.value;
    bulletPositionRange = bulletPositionRangeField.value;
    roundValue = roundValueField.value;
    roundValue = roundValue.toLowerCase();
    
    //Check for valid data (1112) is clocked from fastest rifle round known
    if (bulletVelocity > 0 && bulletVelocity < 1112) {
      if (bulletFireAngle > 0 && bulletFireAngle < 90) {
        if (bulletPositionRange >= 0) {
          
          //Display initial user input statement
          document.getElementById("MyNumbers").innerHTML = ("With a launch velocity of " + 
          bulletVelocity + " m/s, shot at a angle of " + bulletFireAngle + " degrees off the ground:");
          
          //Call function for equations
          bulletHorizontalVelocity = HorizontalVelocity(bulletFireAngle, bulletVelocity);
          bulletVerticalVelocity = VerticalVelocity(bulletFireAngle, bulletVelocity);
          totalTime = TotalBulletTime(bulletVerticalVelocity, gravity);
          totalDistance = TotalBulletDistance(bulletHorizontalVelocity, totalTime);
          bulletMaxiumHeight = BulletMaxHeight(bulletVerticalVelocity, gravity);
          bulletPosition = BulletHeightAtDistanceX(bulletVerticalVelocity, bulletHorizontalVelocity, bulletPositionRange, gravity);
          //Round to nearest thousands place if asked to do so
          
          if (roundValue === "yes") {
            totalTime = Math.ceil(totalTime * 1000)/1000;
            totalDistance = Math.ceil(totalDistance * 1000)/1000;
            bulletMaxiumHeight = Math.ceil(bulletMaxiumHeight * 1000)/1000;
            bulletPosition = Math.ceil(bulletPosition * 1000) /1000;
          }
      
          //Display trajectory calculation results
          document.getElementById("MyResults").innerHTML = ("Total bullet flight time: " + 
          totalTime + " seconds.\nTotal distance: " + totalDistance + " meters. Maximum Height: " +
          bulletMaxiumHeight + " meters off the ground.");
          
          //Display bullet drop calculation results
          document.getElementById("MyDropRate").innerHTML = ("Bullet is " + 
          bulletPosition + " meter(s) high at " + bulletPositionRange + " meter(s).");
        } else {
          alert("The range for bullet must be a postive number.");
        }
      } else {
        alert("Fire angle must be between 0 and 90 degrees.");
      }
    } else {
      alert("Firing velocity can only be calculated between 0 to 1112 meters per second.");
    }
    
  });
}

//Horizontal velocity calculation
function HorizontalVelocity (bulletFireAngle, bulletVelocity) {
  var result;
  //changes bullet firing angle value to degrees instead of radians for use
  bulletFireAngle = bulletFireAngle * (Math.PI/180); 
  result = bulletVelocity * Math.cos(bulletFireAngle);
  
  return result;
}

//Vertical velocity calculation
function VerticalVelocity (bulletFireAngle, bulletVelocity) {
  var result;
  //changes bullet firing angle value to degrees instead of radians for use
  bulletFireAngle = bulletFireAngle * (Math.PI/180);
  result = bulletVelocity * Math.sin(bulletFireAngle);
  
  return result;
}

//Total time in flight
function TotalBulletTime(verticalVelocity, gravity) {
  var result;
  var verticalVelocityChange = 0;
  
  verticalVelocityChange = (verticalVelocity + verticalVelocity);
  result = verticalVelocityChange / gravity;
  return result;
}

//Total distance for horizontial trajectory on flat ground
function TotalBulletDistance(horizontialVelocity, totalTime) {
  var result;
  
  result = horizontialVelocity * totalTime;
  return result;
}

//Height of the projectile at given distance and time
function BulletHeightAtDistanceX(bulletVerticalVelocity, bulletHorizontalVelocity, bulletPositionRange, gravity) {
  var timeNeededToTravelDistanceX;
  var result;
  
  timeNeededToTravelDistanceX = bulletPositionRange/bulletHorizontalVelocity;
  result = bulletVerticalVelocity * timeNeededToTravelDistanceX - (0.5 *
            gravity * Math.pow(timeNeededToTravelDistanceX, 2));
  
  //set result to zero if the bullet hits ground
  if(result < 0) {
    result = 0;
  }
  return result;
}

//Maximum height the bullet will reach in flight
function BulletMaxHeight(verticalVelocity, gravity) {
  var result;
  
  result = Math.pow(verticalVelocity, 2) / (2 * gravity);
  return result;
}
Main();