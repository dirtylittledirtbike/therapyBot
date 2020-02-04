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


function preload() {

    img = loadImage( 'therapist.jpg' );

}


function setup() {

    let width = 624;
    let height = 468;
    createCanvas( width, height) ;

    let socket = io.connect('http://206.189.165.184:3000');
    socket.on('apiRes', tones.toneGlitch);

    capture = createCapture( VIDEO );
    capture.hide();

    capturePix = createImage( width, height );
    buffer = createImage( width, height );
    buffer2 = createImage( width, height );
    // button = createButton('pay me');

    setTimeout(function(){
                    alert("Ready to begin our therapy session? Press ENTER to continue.");
                }, 2000);

}


var tones = {

    toneGlitch: function(json) {

              // avgPixelValue = getPixelAvg();
              // console.log(avgPixelValue)
              console.log(json)
              json = JSON.parse(json);
              let tones = json.document_tone.tones;

              console.log(tones)

               let highestTone= {
                  toneId:'empty',
                  tone_name:'empty',
                  score:0
               }

               for (var i = 0; i < tones.length; i++){
                   if( tones[i].score > highestTone.score){
                       highestTone = tones[i]
                      // console.log(tones.length)
                   }
               }

                if (tones.length >= 3){

                    window.alert("hmm interesting i picked up a few emotions, ur like deep... i dunno if i have a glitch to mirror your complexity.");
                    if( Math.random() > 0.5 ) {
                        currentRule = 12345;
                    } else {
                        currentRule = 11;
                    }

                } else if (highestTone.tone_id == "anger") {

                    window.alert("anger does nothing for your appearance");
                    currentRule = 0;

                } else if (highestTone.tone_id == "fear"){

                    window.alert("fear will cripple your personal growth 💅");
                    currentRule = 9;

                } else if (highestTone.tone_id == "joy"){

                    window.alert('happiness will do wonders for your self-image 💁‍');
                    if( Math.random() > 0.5 ) {
                        currentRule = 1;
                    } else {
                        currentRule = 12345;
                    }

                } else if (highestTone.tone_id == "analytical"){

                    window.alert("ur so analytical ur like a puzzle");
                    if( Math.random() > 0.5 ) {
                        currentRule = 12345;
                    } else {
                        currentRule = 11;
                    }


                } else if (highestTone.tone_id == "confident"){

                    window.alert("omg you sound so confident, that will definitely improve your look!");
                    currentRule = 110;

                } else if (highestTone.tone_id == "tentative"){

                    window.alert("wow you sound really unsure of yourself and kinda insecure, its kinda gross");

                    if( Math.random() > 0.5 ) {
                        currentRule = 9;
                    } else {
                        currentRule = 6;
                    }

                } else if (highestTone.tone_id == "sadness"){

                    window.alert("wow you're such a downer, sadness will get you nowhere... honestly it sucks to be around you when ur like this");

                    if( Math.random() > 0.5 ) {
                        currentRule = 7;
                    } else {
                        currentRule = 9;
                    }

                } else {
                    console.log('no tone');
                    if( Math.random() > 0.2 ) {
                        window.alert("i didnt pick up any emotions. you must be emotionally stunted... ");
                        currentRule = 12
                    } else {
                        window.alert("hmmm i didnt pick up any emotions. You need to get in touch with your feelings, come back when you have some... ");
                        location.reload();
                    }

                }

            let toneID = highestTone.tone_id;

            console.log(toneID);

            // if (cCurrent >= 255){
            //     window.alert("Congrats!!!! your wide range of emotions managed to kill every live pixels, I recommend a mood stabilizer. Refresh your browser to start again.")
            // }
        },

}


function draw() {

    if ( mouseIsPressed ) {
        counter ++;

        if (counter == 1){
            getCameraPixels();
        }

    }

    // load pixels
    if ( useCamera ) {
        if ( keyIsPressed === true) {

            capturePix.loadPixels();
            buffer2.loadPixels();
            buffer.loadPixels();

            for ( let x = 0; x < capturePix.width; x++ ) {
                for ( let y = 0; y < capturePix.height; y++ ) {

                    // current pixel we are on
                    let xMinus = x - 1;
                    if ( xMinus < 0 ) {
                        xMinus = capturePix.width - 1;
                    }
                    let xAdd = x + 1;
                    if ( xAdd > ( capturePix.width - 1 ) ) {
                        xAdd = 0;
                    }
                    let yMinus = y - 1;
                    if ( yMinus < 0 ) {
                        yMinus = capturePix.height - 1;
                    }
                    let yAdd = y + 1;
                    if ( yAdd > ( capturePix.height - 1 ) ) {
                        yAdd = 0;
                    }
                    // convert that into 1d array
                    // x + y * width to get pixels index #
                    // color data is stored in a 1d pixel array
                    let topLeft = 4 * ( xMinus + yMinus * capturePix.width );
                    let topCenter = 4 * ( x + yMinus * capturePix.width );
                    let topRight = 4 * ( xAdd + yMinus * capturePix.width );
                    let midLeft = 4 * ( xMinus + y * capturePix.width );
                    let origin = 4 * ( x + y * capturePix.width );
                    let midRight = 4 * ( xAdd + y * capturePix.width );
                    let bottomLeft = 4 * ( xMinus + yAdd * capturePix.width );
                    let bottomCenter = 4 * ( x + yAdd * capturePix.width );
                    let bottomRight = 4 * ( xAdd + yAdd * capturePix.width );
                    let index = 4 * ( x + y * capturePix.width );

                    generate( origin, topLeft, topCenter, topRight,
                      midLeft, midRight, bottomLeft, bottomCenter, bottomRight
                    );
                    generate( origin + 1, topLeft + 1, topCenter + 1, topRight + 1,
                      midLeft + 1, midRight + 1, bottomLeft + 1, bottomCenter + 1, bottomRight + 1
                    );
                    generate( origin + 2, topLeft + 2, topCenter + 2, topRight + 2,
                      midLeft + 2, midRight + 2, bottomLeft + 2, bottomCenter + 2, bottomRight + 2
                    );

                }
            }

            cCurrent = 0;
            avgPixel = 0;
            for ( let i = 0; i < capturePix.pixels.length; i++) {
                cCurrent += capturePix.pixels[i];
                avgPixel += buffer2.pixels[i];
            }

            // console.log("average pixel", avgPixel / capturePix.pixels.length);
            // console.log("cCurrent", cCurrent / capturePix.pixels.length);

            for ( let i = 0; i < capturePix.pixels.length; i++ ) {

                cells[ i ].currentState = cells[ i ].nextState;

                if ( cells[ i ].currentState === 1 ) {
                    capturePix.pixels[ i ] = cells[ i ].value;
                } else {
                    capturePix.pixels[ i ] = 255;
                }

            }

            capturePix.updatePixels();
            buffer2.updatePixels();
            image(capturePix, 0, 0)

        }

    } else {

        img.loadPixels();
        buffer.loadPixels();

        for ( let x = 0; x < img.width; x++ ) {

            for ( let y = 0; y < img.height; y++ ) {

                // get the current pixel we are on
                let currentPixel = 4 * ( x + y * img.width );

                // grab a pixel in relation to the current pixel we are on
                // pixel to the left
                let xMinus = x - 1;
                if ( xMinus < 0 ) {

                    xMinus = img.width - 1;

                }

                // row above
                let yMinus = y - 1;
                if ( yMinus < 0 ) {

                    yMinus = img.height -1;

                }

                // row below
                let yPlus = y + 1;
                if ( yPlus > img.height - 1 ) {

                    yPlus = 0;

                }

                let toLeft = 4 * ( xMinus + y * img.width );
                let rowAbove = 4 * ( x + yMinus * img.width );
                let rowBelow = 4 * ( x + yPlus * img.width );

                // set the buffers currentPixel color channel, using other pixel locations from the image
                buffer.pixels[ currentPixel + 0 ] = img.pixels[ rowAbove + 0 ];
                buffer.pixels[ currentPixel + 1 ] = img.pixels[ toLeft + 1 ];
                buffer.pixels[ currentPixel + 2 ] = img.pixels[ rowBelow + 2 ];
                buffer.pixels[ currentPixel + 3 ] = img.pixels[ currentPixel + 3 ];

              }
        }

// now iterate through the buffer and set the images pixels from the buffer
        for ( let i = 0; i < img.pixels.length; i++ ) {

            img.pixels[i] = buffer.pixels[i];

        }

// update the pixels
        buffer.updatePixels();
        img.updatePixels();
        image(img, 0, 0);
    }


}


function getCameraPixels() {

    capturePix = capture.get( 0, 0, capture.width, capture.height );
    buffer2 = capture.get(0, 0, capture.width, capture.height);
    capturePix.loadPixels();
    buffer2.loadPixels();

    for ( let i = 0; i < capturePix.pixels.length; i += 4 ) {
        for ( let channel = 0; channel < 3; channel++ ) {
          //console.log(cells[1])
            let cell = Object.create( Cell );
            //ask about notation here
            cell.currentState = (
                capturePix.pixels[ i + channel ] >= 127
                ? 1
                : 0
            );
            cell.value = capturePix.pixels[ i + channel ];
            //console.log(console.log(cells[1]))
            cells.push( cell );
        }

      let alphaCell = Object.create( Cell );
      alphaCell.currentState = 1;
      alphaCell.nextState = 1;
      alphaCell.value = 255;
      cells.push( alphaCell );
    }
    //console.log(Cell)
    capturePix.updatePixels();
    buffer2.updatePixels();
    useCamera = true;

}



function generate( o, tl, tc, tr, ml, mr, bl, bc, br  ) {

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
    let cr = 'r' + String( currentRule );
    if ( currentRule === 0 ) {
        rules.r0( score, o );
    } else if ( currentRule === 1 ) {
        rules.r1( score, o );
    } else if ( currentRule === 4 ) {
        rules.r4( score, o );
    } else if ( currentRule === 6) {
        rules.r6( score, o);
    } else if ( currentRule === 7 ) {
        rules.r7( score, o);
    } else if ( currentRule === 9 ) {
        rules.r9( score, o );
    } else if ( currentRule === 11 ) {
        rules.r11( score, o );
    } else if ( currentRule === 35 ) {
        rules.r35( score, o );
    } else if ( currentRule === 12 ) {
        rules.r12( score, o );
    } else if ( currentRule === 13 ) {
        rules.r13( score, o );
    } else if ( currentRule === 110 ) {
        rules.r110( score, o );
    } else if ( currentRule === 222 ) {
        rules.r222( score, o );
    } else if ( currentRule === 12345 ){
        rules.r12345( score, o );
    }
}


let Cell = {
    currentState: 0,
    nextState: 0,
    value: 0
}


let rules = {

    r0: function( s, o ) {

        if ( cells[ o ].currentState === 1 ) {
            if ( ( s === 2 ) || ( s === 3 ) ) {
                cells[ o ].nextState = 1;
            } else {
                cells[ o ].nextState = 0;
            }
        } else {
            if ( s === 3 || s === 6) {
                cells[ o ].nextState = 1;
            } else {
                cells[ o ].nextState =  0;
            }
        }
    },

    r1: function( s, o ) {

        if ((cCurrent / capturePix.pixels.length) > (avgPixel/capturePix.pixels.length + 15)){
            if ( cells[ o ].currentState === 1 ) {
                if ( s === 2 || s === 3 || ((s >= 4) && (s < 9 ))) {
                    cells[ o ].nextState = 1;
                } else {
                    cells[ o ].nextState = 0;
                }
            } else {
                if ( (s === 3 || s >= 6 ) ) {
                    cells[ o ].nextState = 1;
                } else {
                    cells[ o ].nextState = 0;
                }
            }
        }

    },


    r4: function ( s, o ) {
        if ( cells[ o ].currentState === 1 ) {
            if ( ( s === 1 ) ) {
                cells[o].nextState = 1;
            } else {
                cells[ o ].nextState = 0
              }
        } else {
            if ( s === 1 ) {
                cells[ o ].nextState = 1;
            } else {
                cells[ o ].nextState = 0;
            }
        }
    },

    r6: function ( s, o ){
        if( cells[o].currentState === 1 ) {
            // was s < 2
            if ( s < 2 ){
                cells[o].nextState = 1;
            } else {
                cells[ o ].nextState = 0;
            }
        } else {
            if ( ( s > 0 ) && ( s < 7 )  ){
                cells[ o ].nextState = 1;
            } else {
                cells[ o ].nextState = 0;
            }
        }

    },

    r7: function ( s, o ) {
        if ( cells[ o ].currentState === 1 ) {
            if ( ( s >= 2 ) && ( s <= 5 ) ){
                cells[ o ].nextState = 1;
            } else {
                cells[ o ].nextState = 0;
            }
        } else {
            if ( ( s >= 4 ) && ( s <= 7 ) ) {
                cells[ o ].nextState = 1;
            } else {
                cells[ o ].nextState = 0;
            }
        }
    },

    r9: function( s, o ) {
       if ( cells[ o ].currentState === 1 ) {
           if( s === 5 ) {
               cells[ o ].nextState = 1;
         } else {
             cells[ o ].nextState = 0;
           }
       } else {
           if ( (s > 2) && (s < 6) ) {
               cells[ o ].nextState = 1;
           } else {
               cells[ o ].nextState = 0;
           }
       }
   },

  r11: function ( s, o ){

      if ((cCurrent / capturePix.pixels.length) > (avgPixel/capturePix.pixels.length + 15)){
          if( cells[o].currentState === 1 ) {
              if ( ( s === 2 ) || ( s === 3 ) || ( s === 5 ) || ( s === 6 ) || ( s === 7 ) || ( keyCode === BACKSPACE )){
                  cells[o].nextState = 1;
              } else {
                  cells[ o ].nextState = 0;
              }
          } else {
              if ( ( s === 3 ) || ( s === 7 ) || ( s === 8 ) ) {
                  cells[ o ].nextState = 1;
              } else {
                  cells[ o ].nextState = 0;
              }
          }
      }
  },

   r35: function ( s, o ) {

     if ((cCurrent / capturePix.pixels.length) > (avgPixel/capturePix.pixels.length + 80)){
         if( cells[ o ].currentState === 1 ) {
             if( ( s > 1 ) && ( s < 6 ) && keyCode === BACKSPACE) {
                cells[ o ].nextState = 1;
             } else {
                cells[ o ].nextState = 0;
               }
         } else {
             if ( (s >= 1) && ( s < 8 ) ) {
                 cells[ o ].nextState = 1;
             } else {
                 cells[ o ].nextState = 0;
               }
           }
       }
   },

   r12: function( s, o ) {
       if ( cells[ o ].currentState === 1 ) {
           if( ( s === 1 ) || ( s === 2 ) || ( s === 5 ) ) {
               cells[ o ].nextState = 1;
         } else {
             cells[ o ].nextState = 0;
           }
       } else {
           if ( ( s === 3 ) || ( s === 6) ) {
               cells[ o ].nextState = 1;
           } else {
               cells[ o ].nextState = 0;
           }
       }

   },

   //old rule for fear was r9

   r13: function ( s, o ) {
     if( cells[ o ].currentState === 1 ) {
         if( ( s > 4 ) && ( s < 9 ) )  {
            cells[ o ].nextState = 1;
         } else {
            cells[ o ].nextState = 0;
           }
     } else {
         if ( ( s === 3 ) ) {
             cells[ o ].nextState = 1;
         } else {
             cells[ o ].nextState = 0;
           }
       }
   },

   r222: function( s, o ) {
     if( cells[ o ].value > 254 ) {
       cells[ o ].nextState = 0;
     } else {
       cells[ o ].nextState = 1;
     }

   },

   r110: function ( s, o ){

          if ((cCurrent / capturePix.pixels.length) > (avgPixel/capturePix.pixels.length + 20)){
              if( cells[o].currentState === 1 ) {
                  if ( ( s > 2 ) && ( s < 9 ) && ( keyCode === BACKSPACE ) ){
                      cells[o].nextState = 1;
                  } else {
                      cells[ o ].nextState = 0;
                  }
              } else {
                  if ( ( s > 0 ) && ( s < 8 )  ){
                      cells[ o ].nextState = 1;
                  } else {
                      cells[ o ].nextState = 0;
                  }
              }
          }

      },

    r12345: function ( s, o ){

       if( cells[o].currentState === 1 ) {
           if ( ( s > 0 ) && ( s < 6 ) ){
               cells[o].nextState = 1;
           } else {
               cells[ o ].nextState = 0;
           }
       } else {
           if ( s == 3 ){
               cells[ o ].nextState = 1;
           } else {
               cells[ o ].nextState = 0;
           }
       }

   },
}
