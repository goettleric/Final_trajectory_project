/*This calculator takes velocity, height and a given distance to make a 
aproximation for the flight of a projectile.  The only force factored in on this
version in gravity.  No other variables of ballistics are used. */


function Main () {
  //variable declaration
  var bulletDropRange;
  var bulletDrop;
  var bulletFireHeight;
  var bulletVelocity;
  var gravity = 9.8;
  var loopCount;
  var numberCalculated;
  var totalDistance;
  var totalTime;
  
  //Prompt for Information
  numberCalculated = prompt("How many calculations would you like to make?");
  
  if(!isNaN(numberCalculated) ) {
    for(loopCount = 0; loopCount < numberCalculated;) {
      
      bulletVelocity = prompt("What is the velocity of the bullet in meters per second?");
      bulletFireHeight = prompt("What is the initial height of the bullet when fired in meter(s)?");
      bulletDropRange = prompt("What range do you want to find the bullet drop in meters?");
      
      //Convert input to useable format
      bulletVelocity = Number(bulletVelocity);
      bulletFireHeight = Number(bulletFireHeight);
      bulletDropRange = Number(bulletDropRange);
      
      if(!isNaN(bulletVelocity) && !isNaN(bulletFireHeight) && !isNaN(bulletDropRange) ) {
      
        //Display initial user input statement
        document.getElementById("MyNumbers").innerHTML = ("For a trajectory with a launch velocity of " + 
          bulletVelocity + " m/s, shot at a height " + bulletFireHeight +
          " meter(s) off the ground:");
        
        //Call function for equations
        totalDistance = TotalBulletDistance(bulletFireHeight, bulletVelocity, gravity);
        totalTime = TotalBulletTime(bulletFireHeight, bulletVelocity, gravity);
        bulletDrop = BulletHeightAtDistanceX(bulletFireHeight, bulletDropRange, totalDistance);
        
        //Display trajectory calculations results
        document.getElementById("MyResults").innerHTML = ("Total bullet flight time: " +
          totalTime + " seconds.\nTotal distance: " + totalDistance + " meters.");
        
        //Display bullet drop calculations results
        document.getElementById("MyDropRate").innerHTML = ("Bullet has dropped " +
          bulletDrop + " meter(s) by " + bulletDropRange + " meters.\n");
          
        loopCount ++;
      } else {
        alert("Entries were not valid. Please make sure you enter proper values.");
      }
    }
  } else {
    alert("Not valid entries.  Use numbers only.");
  }
  
}

//Total distance for horizontial trajectory on flat ground
function TotalBulletDistance(bulletFireHeight, bulletVelocity, gravity) {
  var result;
  result = bulletVelocity * (Math.sqrt(2 * bulletFireHeight)/ gravity);
  return result;
}

//Total time for horizontial trajectory on flat ground
function TotalBulletTime(bulletFireHeight, bulletVelocity, gravity) {
  var result;
  result = Math.sqrt( (2 * bulletFireHeight)/gravity);
  return result;
}

//Height of the projectile at given distance
function BulletHeightAtDistanceX(bulletFireHeight, bulletDropRange, totalDistance) {
  var result;
  result = (bulletDropRange/ totalDistance) * bulletFireHeight;
  if (result > bulletFireHeight) {
    result = " to the ground ";
  }
  return result;
}

Main();