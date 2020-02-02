r8: function( s, o ) {

   // 1357 - 1357
   if ( cells[ o ].currentState === 1 ) {
       if ( s === 1 || s === 3 ||  s === 5 ||  s ===7 || keyCode === BACKSPACE ) {
           cells[ o ].nextState = 1;
       } else {
           cells[ o ].nextState = 0;
       }
   } else {
       if ( (s === 1 || s === 3 ||  s === 5 ||  s ===7) ) {
           cells[ o ].nextState = 1;
       } else {
           cells[ o ].nextState = 0;
       }
   }
},

r35: function ( s, o ) {
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
},

r10: function ( s, o ){
    if( cells[o].currentState === 1 ) {
        if ( ( s > 3 ) && ( s < 9 ) ){
            cells[o].nextState = 1;
        } else {
            cells[ o ].nextState = 0;
        }
    } else {
        if ( ( s === 3 ) || ( s > 5 ) && ( s < 9 ) && keyCode === BACKSPACE ){
            cells[ o ].nextState = 1;
        } else {
            cells[ o ].nextState = 0;
        }
    }

},

r5: function ( s, o ) {
    if( cells[ o ].currentState === 1 ) {
        if( ( s > 1 ) && ( s < 6 ) || (keyCode === BACKSPACE)  ) {
            cells[ o ].nextState = 1;
        } else {
            cells[ o ].nextState = 0;
          }
    } else {
        if ( (s === 1 || s === 3 ||  s === 5 ||  s ===7)  ) {
            cells[ o ].nextState = 1;
        } else {
            cells[ o ].nextState = 0;
        }
    }
},

r2: function( s, o ) {
    // flakes
    // 012345678-3
    if ( cells[ o ].currentState === 1 ) {
        if ( (s < 9) ) {
            cells[ o ].nextState = 1;
        } else {
            cells[ o ].nextState = 0;
        }
    } else {
        if ( (s === 3) ) {
            cells[ o ].nextState = 1;
        } else {
            cells[ o ].nextState = 0;
        }
    }
},

r3: function( s, o ) {
    if ( cells[ o ].currentState === 1 ) {
        if( ( s >= 5 ) && ( s < 9 ) ) {
            cells[ o ].nextState = 1;
      } else {
          cells[ o ].nextState = 0;
        }
    } else {
        if ( s === 1 ) {
            cells[ o ].nextState = 1;
        } else {
            cells[ o ].nextState = 0;
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

r13: function ( s, o ) {
  if( cells[ o ].currentState === 1 ) {
      if( ( s > 2 ) && ( s < 9) )  {
         cells[ o ].nextState = 1;
      } else {
         cells[ o ].nextState = 0;
        }
  } else {
      if ( ( s === 3 ) || ( ( s > 5 ) && ( s < 9) ) ) {
          cells[ o ].nextState = 1;
      } else {
          cells[ o ].nextState = 0;
        }
    }
},

r13: function ( s, o ) {
  if( cells[ o ].currentState === 1 ) {
      if( ( s === 3 ) || ( s === 4) || ( ( s > 5 ) && ( s < 9 ) ) )  {
         cells[ o ].nextState = 1;
      } else {
         cells[ o ].nextState = 0;
        }
  } else {
      if ( ( s === 4 ) || ( ( s > 5 ) && ( s < 9) ) ) {
          cells[ o ].nextState = 1;
      } else {
          cells[ o ].nextState = 0;
        }
    }
},
//old rule for confidence
r11: function ( s, o ){
    if( cells[o].currentState === 1 ) {
        if ( ( s === 2 ) || ( s === 3 ) || ( s === 5 ) || ( s === 6 ) || ( s === 7 ) || ( s === 8 )){
            cells[o].nextState = 1;
        } else {
            cells[ o ].nextState = 0;
        }
    } else {
        if ( ( s === 3 ) || ( s === 7 ) || ( s === 8 )  ){
            cells[ o ].nextState = 1;
        } else {
            cells[ o ].nextState = 0;
        }
    }

},


//34678-3678

r13: function ( s, o ) {
  if( cells[ o ].currentState === 1 ) {
      if( ( s > 3 ) && ( s < 9 ) ) )  {
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

r13: function ( s, o ) {
  if( cells[ o ].currentState === 1 ) {
      if( ( s > 3 ) && ( s < 9 ) ) )  {
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

//boundry

r13: function ( s, o ) {
  if( cells[ o ].currentState === 1 ) {
      if( ( s > 2 ) || ( s < 5 ) ) )  {
         cells[ o ].nextState = 0;
      } else {
         cells[ o ].nextState = 1;
        }
  } else {
      if ( ( s > 4 ) || ( s < 4 ) ) {
          cells[ o ].nextState = 0;
      } else {
          cells[ o ].nextState = 1;
        }
    }
},

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
    },

    // r4: function ( s, o ) {
    //   if( cells[ o ].currentState === 1 ) {
    //       if( ( s === 3 ) || ( s === 4) || ( ( s > 5 ) && ( s < 9 ) ) )  {
    //          cells[ o ].nextState = 1;
    //       } else {
    //          cells[ o ].nextState = 0;
    //         }
    //   } else {
    //       if ( ( s === 4 ) || ( ( s > 5 ) && ( s < 9) ) ) {
    //           cells[ o ].nextState = 1;
    //       } else {
    //           cells[ o ].nextState = 0;
    //         }
    //     }
    // },

    r4: function ( s, o ) {
        if ( cells[ o ].currentState === 1 ) {
            if ( (s === 1 )  ){
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
            if ( ( keyCode === BACKSPACE ) ){
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

    },

    // r6: function ( s, o ) {
    //     if (cells[o].currentState === 1) {
    //         if( (s >= 1) && (s <= 5) || keyCode === BACKSPACE){
    //             cells[ o ].nextState = 1;
    //         } else {
    //             cells[ o ].nextState = 0;
    //         }
    //     } else {
    //         if ( (s === 3 || s === 7) ) {
    //             cells[ o ].nextState = 1;
    //         } else {
    //             cells[ o ].nextState = 0;
    //         }
    //     }
    // },

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

   // r11: function ( s, o ) {
   //   if( cells[ o ].currentState === 1 ) {
   //       if( ( s > 7 ) && ( s < 9 )  )  {
   //          cells[ o ].nextState = 1;
   //       } else {
   //          cells[ o ].nextState = 0;
   //         }
   //   } else {
   //       if ( ( s > 2 ) ) {
   //           cells[ o ].nextState = 1;
   //       } else {
   //           cells[ o ].nextState = 0;
   //         }
   //     }
   // },
//old confidence slow growth
r11: function ( s, o ){
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

},

   r35: function ( s, o ) {
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

   r110: function ( s, o ){
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

},


}
