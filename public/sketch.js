'use strict'

let capture;
let img;
let capturePix;
let buffer;
let buffer2;
let cells = [];
let currentRule = 12;
let useCamera = false;
let avgPixel = 0;
let cCurrent = 0;
let counter = 0;
let socket = io.connect('http://localhost:5000');


function preload(){

    img = loadImage('media/therapist3.jpg');

}


function setup(){

    let width = 640;
    let height = 480;

    $(function(){

        $('form').submit(function(e){
            // prevents page reloading
            e.preventDefault();
            // console.log(socket.id);
            socket.emit('apiReq', $('#m').val());
            $('#m').val('');
            return false;
        });

    });

    createCanvas(width, height);

    capture = createCapture(VIDEO);
    capture.hide();

    capturePix = createImage(width, height);
    buffer = createImage(width, height);
    buffer2 = createImage(width, height);
    // button = createButton('pay me');

    setTimeout(function(){
                    alert("Ready to begin our therapy session? Press ENTER to continue.");
                }, 800);


    socket.on('apiRes', function(json){toneGlitch(json);});

}


//handle api responses and set CA effects.

function toneGlitch(json){

      console.log(json)
      json = JSON.parse(json);
      let tones = json.document_tone.tones;

      console.log(tones)

      let highestTone = {
          toneId:'empty',
          tone_name:'empty',
          score:0
      }

      // pick tone with highest score
      for (var i = 0; i < tones.length; i++){
          if( tones[i].score > highestTone.score){
              highestTone = tones[i]

          }
      }

      //check for tone and set CA rules and text responses.
      if (tones.length >= 3){

        // if( Math.random() > 0.5 ) {
        //
        // } else {
        //
        // }
          window.alert("hmm interesting I picked up a few emotions, you seem to have a lot going on... i dunno if i have a glitch to mirror your emotional depth.");
          currentRule = 45;

      } else if (highestTone.tone_id == "anger"){

          if(Math.random() > 0.5){
              window.alert("you need to check your temper at the door, I don't treat infants...");
          } else {
              window.alert("anger does nothing for your appearance");
          }

          currentRule = 0;

      } else if (highestTone.tone_id == "fear"){

          if(Math.random() > 0.5){
              window.alert("excessive worry WILL cause wrinkles. Im worried about the impact that may have on your love life.");
          } else {
              window.alert("fear will cripple your personal growth 💅");
          }

          currentRule = 9;

      } else if (highestTone.tone_id == "joy"){

          if(Math.random() > 0.5){
              window.alert('you seem to be feeling good, I hate to burst your bubble, but insurance will not be covering our session today.');
          } else {
              window.alert('happiness will do wonders for your self-image 💁‍');
          }

          currentRule = 1;

      } else if (highestTone.tone_id == "analytical"){

          if(Math.random() > 0.5){
              window.alert("ur so analytical ur like a puzzle");
              currentRule = 6;
          } else {
              window.alert("Your word choice seems to suggest that others perceiving you as intelligent is important to you");
              currentRule = 11;
          }

      } else if (highestTone.tone_id == "confident"){

          if(Math.random() > 0.5){
              window.alert("omg you sound so confident, that will definitely improve your look!");
          } else {
              window.alert("wow you seem so sure of yourself. Must be nice to always feel right.");
          }

          currentRule = 12345;

      } else if (highestTone.tone_id == "tentative"){

          if(Math.random() > 0.5){
              window.alert("I sense some hesitation in your tone, does this affect your relationship with others?");
          } else {
              window.alert("wow you sound really unsure of yourself and kinda insecure :/");
          }

          currentRule = 46;

      } else if (highestTone.tone_id == "sadness"){

          if(Math.random() > 0.5){
              window.alert("oof you're such a downer, sadness will get you nowhere... honestly, it sucks to be around you when ur like this");
          } else {
              window.alert("you really need to be more positive, others have it much worse than you.");
          }

          currentRule = 7;

      } else {

          console.log('no tone');

          if(Math.random() > 0.2){
              window.alert("i didnt pick up any emotions. you must be emotionally stunted... ");
              currentRule = 12
          } else {
              window.alert("hmmm i didnt pick up any emotions. You need to get in touch with your feelings, come back when you have some... ");
              //location.reload();
          }

      }

      // check to see if all the pixels are dead/beyond the point of recovery
      if ((cCurrent / capturePix.pixels.length) > 254.98){

          window.alert("Congrats, either your camera malfunctioned or your extreme mood swings have killed every pixel! Just to be safe, I'm prescribing a mood stabilizer. See you next week!");

          setTimeout(function(){
                          location.reload();
                      }, 700);

          console.log(cCurrent);
      }

      //log tones to console
      let toneID = highestTone.tone_id;
      console.log(toneID);

}


function draw(){

    //create counter for getCameraPixel function
    if ((keyIsPressed === true && keyCode !== ENTER) && (counter) < 1){

        counter ++;

        if (counter == 1){

            setTimeout(function(){
                          getCameraPixels();
                       }, 150);

            console.log(counter);
        }

    }


    if (useCamera){
        // if (keyIsPressed === true){
        // if (keyCode == ENTER){

            // load pixels
            capturePix.loadPixels();
            buffer2.loadPixels();
            buffer.loadPixels();

            for ( let x = 0; x < capturePix.width; x++ ){
                for ( let y = 0; y < capturePix.height; y++ ){

                    //create variables for surrounding pixels/wrapping
                    let xMinus = x - 1;
                    if (xMinus < 0 ){
                        xMinus = capturePix.width - 1;
                    }
                    let xAdd = x + 1;
                    if (xAdd > ( capturePix.width - 1 )){
                        xAdd = 0;
                    }
                    let yMinus = y - 1;
                    if (yMinus < 0){
                        yMinus = capturePix.height - 1;
                    }
                    let yAdd = y + 1;
                    if (yAdd > (capturePix.height - 1)){
                        yAdd = 0;
                    }

                    //create indices for neighboring pixels
                    let topLeft = 4 * (xMinus + yMinus * capturePix.width);
                    let topCenter = 4 * (x + yMinus * capturePix.width);
                    let topRight = 4 * (xAdd + yMinus * capturePix.width);
                    let midLeft = 4 * (xMinus + y * capturePix.width);
                    let origin = 4 * (x + y * capturePix.width);
                    let midRight = 4 * (xAdd + y * capturePix.width);
                    let bottomLeft = 4 * (xMinus + yAdd * capturePix.width);
                    let bottomCenter = 4 * (x + yAdd * capturePix.width);
                    let bottomRight = 4 * (xAdd + yAdd * capturePix.width);
                    let index = 4 * (x + y * capturePix.width);

                    generate(origin, topLeft, topCenter, topRight,
                      midLeft, midRight, bottomLeft, bottomCenter, bottomRight
                    );
                    generate(origin + 1, topLeft + 1, topCenter + 1, topRight + 1,
                      midLeft + 1, midRight + 1, bottomLeft + 1, bottomCenter + 1, bottomRight + 1
                    );
                    generate(origin + 2, topLeft + 2, topCenter + 2, topRight + 2,
                      midLeft + 2, midRight + 2, bottomLeft + 2, bottomCenter + 2, bottomRight + 2
                    );

                }
            }

            //variables for thresholding
            cCurrent = 0;
            avgPixel = 0;

            for (let i = 0; i < capturePix.pixels.length; i++){
                cCurrent += capturePix.pixels[i];
                avgPixel += buffer2.pixels[i];
            }

            // console.log("average pixel", avgPixel / capturePix.pixels.length);
            // console.log("cCurrent", cCurrent / capturePix.pixels.length);

            //set current cell state to next state
            for (let i = 0; i < capturePix.pixels.length; i++){

                cells[ i ].currentState = cells[ i ].nextState;

                if (cells[ i ].currentState === 1){
                    capturePix.pixels[ i ] = cells[ i ].value;
                } else {
                    capturePix.pixels[ i ] = 255;
                }

            }

            //update pixels
            capturePix.updatePixels();
            buffer2.updatePixels();
            image(capturePix, 0, 0)

         // }

    // if camera is not on load therapy shutterstock image
    } else {

        img.loadPixels();
        buffer.loadPixels();

        for (let x = 0; x < img.width; x++) {
            for (let y = 0; y < img.height; y++){

                // get the current pixel we are on
                let currentPixel = 4 * (x + y * img.width);

                // create variables for surrounding pixels/wrapping.
                //to the left
                let xMinus = x - 1;
                if (xMinus < 0){
                    xMinus = img.width - 1;
                }

                // row above
                let yMinus = y - 1;
                if (yMinus < 0){
                    yMinus = img.height -1;
                }

                // row below
                let yPlus = y + 1;
                if (yPlus > img.height - 1){
                    yPlus = 0;
                }

                //incides for shifting rgb color channels across x and y axis.
                let toLeft = 4 * (xMinus + y * img.width);
                let rowAbove = 4 * (x + yMinus * img.width);
                let rowBelow = 4 * (x + yPlus * img.width);

                // set the buffers to shifted color channels
                buffer.pixels[ currentPixel + 0 ] = img.pixels[ rowAbove + 0 ];
                buffer.pixels[ currentPixel + 1 ] = img.pixels[ toLeft + 1 ];
                buffer.pixels[ currentPixel + 2 ] = img.pixels[ rowBelow + 2 ];
                buffer.pixels[ currentPixel + 3 ] = img.pixels[ currentPixel + 3 ];

              }
        }

        // now iterate through the buffer and set the images pixels from the buffer
        for (let i = 0; i < img.pixels.length; i++){

            img.pixels[ i ] = buffer.pixels[ i ];

        }

        // update the pixels
        buffer.updatePixels();
        img.updatePixels();
        image(img, 0, 0);
    }

}


function getCameraPixels(){

    // get still from webcam and resize it.
    capturePix = capture.get(0, 0, capture.width, capture.height);
    capturePix.resize(capture.width/1.2,capture.height/1.2);
    buffer2 = capture.get(0, 0, capture.width, capture.height);
    buffer2.resize(capture.width/1.2,capture.height/1.2);
    console.log(buffer.height/1.2, buffer.width/1.2);
    capturePix.loadPixels();
    buffer2.loadPixels();


    for (let i = 0; i < capturePix.pixels.length; i += 4){
        for (let channel = 0; channel < 3; channel++){
          //console.log(cells[1])
            let cell = Object.create( Cell );

            //conditions for whether a cell is on or off.
            cell.currentState = (
                capturePix.pixels[ i + channel ] >= 127
                ? 1
                : 0
            );
            cell.value = capturePix.pixels[ i + channel ];
            //console.log(console.log(cells[1]))
            cells.push(cell);
        }

        let alphaCell = Object.create(Cell);
        alphaCell.currentState = 1;
        alphaCell.nextState = 1;
        alphaCell.value = 255;
        cells.push(alphaCell);
    }

    console.log("took capture")
    capturePix.updatePixels();
    buffer2.updatePixels();
    useCamera = true;

}



function generate(o, tl, tc, tr, ml, mr, bl, bc, br){

    // add up the states of the neighboring cells
    // console.log( "cells " + c.index + " neighbors: " + c.neighbors );
    var score = 0;

    score += cells[ tl ].currentState;
    score += cells[ tc ].currentState;
    score += cells[ tr ].currentState;
    score += cells[ ml ].currentState;
    score += cells[ mr ].currentState;
    score += cells[ bl ].currentState;
    score += cells[ bc ].currentState;
    score += cells[ br ].currentState;

    // console.log( "***" + "cell " + c.index + " score:: " + score );
    // check the score with the rules
    // pick rule from currentRule
    let cr = 'r' + String(currentRule);
    if (currentRule === 0){
        rules.r0(score, o);
    } else if (currentRule === 1){
        rules.r1(score, o);
    } else if (currentRule === 4){
        rules.r4(score, o);
    } else if (currentRule === 6){
        rules.r6(score, o);
    } else if (currentRule === 7){
        rules.r7(score, o);
    } else if (currentRule === 9){
        rules.r9(score, o);
    } else if (currentRule === 11){
        rules.r11(score, o);
    } else if (currentRule === 35){
        rules.r35(score, o);
    } else if (currentRule === 12){
        rules.r12(score, o);
    } else if (currentRule === 13){
        rules.r13(score, o);
    } else if (currentRule === 110){
        rules.r110(score, o);
    } else if (currentRule === 222){
        rules.r222(score, o);
    } else if (currentRule === 12345){
        rules.r12345(score, o);
    } else if (currentRule === 45){
        rules.r45(score, o);
    } else if (currentRule === 46){
        rules.r46(score, o)
    }


}


let Cell = {
    currentState: 0,
    nextState: 0,
    value: 0
}

//define CA rules for each tone.
let rules = {

    r0: function(s, o){

        if (cells[ o ].currentState === 1){
            if (( s === 2 ) || ( s === 3 )){
                cells[ o ].nextState = 1;
            } else {
                cells[ o ].nextState = 0;
            }
        } else {
            if (s === 3 || s === 6){
                cells[ o ].nextState = 1;
            } else {
                cells[ o ].nextState =  0;
            }
        }
    },

    r1: function(s, o){

        if ((cCurrent / capturePix.pixels.length) > (avgPixel/capturePix.pixels.length + 15)){
            if (cells[ o ].currentState === 1){
                if ( (s === 2 || s === 3) || ((s >= 4) && (s < 9 )) ){
                    cells[ o ].nextState = 1;
                } else {
                    cells[ o ].nextState = 0;
                }
            } else {
                if ((s === 3 || s >= 6 )){
                    cells[ o ].nextState = 1;
                } else {
                    cells[ o ].nextState = 0;
                }
            }
        }

    },

    r4: function(s, o){
        if (cells[ o ].currentState === 1){
            if ( s === 1 ){
                cells[o].nextState = 1;
            } else {
                cells[ o ].nextState = 0
              }
        } else {
            if (s === 1){
                cells[ o ].nextState = 1;
            } else {
                cells[ o ].nextState = 0;
            }
        }
    },

    r6: function(s, o ){
        if( cells[o].currentState === 1 ) {
            // was s < 2
            if (s < 2){
                cells[o].nextState = 1;
            } else {
                cells[ o ].nextState = 0;
            }
        } else {
            if ((s > 0) && (s < 7)){
                cells[ o ].nextState = 1;
            } else {
                cells[ o ].nextState = 0;
            }
        }

    },

    r7: function (s, o){
        if (cells[ o ].currentState === 1){
            if ((s >= 2) && (s <= 5)){
                cells[ o ].nextState = 1;
            } else {
                cells[ o ].nextState = 0;
            }
        } else {
            if ((s >= 4) && (s <= 7 )){
                cells[ o ].nextState = 1;
            } else {
                cells[ o ].nextState = 0;
            }
        }
    },

    r9: function(s, o){
       if (cells[ o ].currentState === 1){
           if(s === 5){
               cells[ o ].nextState = 1;
         } else {
             cells[ o ].nextState = 0;
           }
       } else {
           if ((s > 2) && (s < 6)){
               cells[ o ].nextState = 1;
           } else {
               cells[ o ].nextState = 0;
           }
       }
   },

   r11: function(s, o){

      if ((cCurrent / capturePix.pixels.length) > (avgPixel/capturePix.pixels.length + 15)){
          if(cells[o].currentState === 1){
              if ((s === 2) || (s === 3) || (s === 5) || (s === 6) || (s === 7) || (keyCode === BACKSPACE)){
                  cells[o].nextState = 1;
              } else {
                  cells[ o ].nextState = 0;
              }
          } else {
              if ((s === 3) || (s === 7) || (s === 8)){
                  cells[ o ].nextState = 1;
              } else {
                  cells[ o ].nextState = 0;
              }
          }
      }
  },

   r35: function(s, o){

     if ((cCurrent / capturePix.pixels.length) > (avgPixel/capturePix.pixels.length + 80)){
         if(cells[ o ].currentState === 1){
             if(( s > 1 ) && ( s < 6 ) && keyCode === BACKSPACE){
                cells[ o ].nextState = 1;
             } else {
                cells[ o ].nextState = 0;
               }
         } else {
             if ((s >= 1) && (s < 8)){
                 cells[ o ].nextState = 1;
             } else {
                 cells[ o ].nextState = 0;
               }
           }
       }
   },

   r12: function(s, o){
       if (cells[ o ].currentState === 1){
           if((s === 1) || (s === 2) || (s === 5)){
               cells[ o ].nextState = 1;
         } else {
             cells[ o ].nextState = 0;
           }
       } else {
           if ((s === 3) || (s === 6)){
               cells[ o ].nextState = 1;
           } else {
               cells[ o ].nextState = 0;
           }
       }

   },

   //old rule for fear was r9
   r13: function(s, o){
     if(cells[ o ].currentState === 1){
         if(( s > 4 ) && ( s < 9 )){
            cells[ o ].nextState = 1;
         } else {
            cells[ o ].nextState = 0;
           }
     } else {
         if (s === 3){
             cells[ o ].nextState = 1;
         } else {
             cells[ o ].nextState = 0;
           }
       }
   },

   r222: function(s, o){
     if( cells[ o ].value > 254 ){
       cells[ o ].nextState = 0;
     } else {
       cells[ o ].nextState = 1;
     }

   },

   r110: function(s, o){

          // if ((cCurrent / capturePix.pixels.length) > (avgPixel/capturePix.pixels.length + 15)){
              if(cells[o].currentState === 1){
                  if ((s > 2) && (s < 4) && (keyCode === BACKSPACE)){
                      cells[o].nextState = 1;
                  } else {
                      cells[ o ].nextState = 0;
                  }
              } else {
                  if ((s > 0) && (s < 8)){
                      cells[ o ].nextState = 1;
                  } else {
                      cells[ o ].nextState = 0;
                  }
              }
          // }

    },

    r12345: function(s, o){

       if(cells[o].currentState === 1){
           if ((s > 0) && (s < 6)){
               cells[o].nextState = 1;
           } else {
               cells[ o ].nextState = 0;
           }
       } else {
           if (s == 3){
               cells[ o ].nextState = 1;
           } else {
               cells[ o ].nextState = 0;
           }
       }

   },

   r45: function(s, o){
     if(cells[ o ].currentState === 1){
         if((s == 4) || (s == 5) || (s == 6) || (s == 7)){
            cells[ o ].nextState = 1;
         } else {
            cells[ o ].nextState = 0;
           }
     } else {
         if ((s == 3) || (s == 4) || (s == 5)){
             cells[ o ].nextState = 1;
         } else {
             cells[ o ].nextState = 0;
           }
       }
   },

   r46: function (s, o){
     if(cells[ o ].currentState === 1){
         if((s == 4) || (s == 5) || (s == 6) || (s == 7) || (s == 8)){
            cells[ o ].nextState = 1;
         } else {
            cells[ o ].nextState = 0;
           }
     } else {
         if (s == 3){
             cells[ o ].nextState = 1;
         } else {
             cells[ o ].nextState = 0;
           }
       }
   },

}
