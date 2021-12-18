// TIME CALCULATIONS
// assumes 24 fps

/**
 * Converts timecode to frames. Takes HH:MM:SS:FF format. Assumes 24 fps.
 *
 * @param {Object} input - Input can be a cell (A1) or timecode in quotes ("HH:MM:SS:FF")
 * @customfunction
 */
function timecode2frames(input) {
  input = input.toString()

  var array = [{}];

  array = input.toString().split(":");

  h = parseInt(array[0], 10);
  m = parseInt(array[1], 10);
  s = parseInt(array[2], 10);
  f = parseInt(array[3], 10);

  var frame = f + ( (s + (m * 60) + (h * 3600) ) * Math.round(24) );

  return frame;
}

/**
 * Converts timecode to seconds. Takes HH:MM:SS:FF format. Assumes 24 fps.
 *
 * @param {Object} input - Input can be a cell (A1) or timecode in quotes ("HH:MM:SS:FF")
 * @customfunction
 */
function timecode2sec(input) {
  input = input.toString()

  var array = [{}];

  array = input.toString().split(":");

  h = parseInt(array[0], 10);
  m = parseInt(array[1], 10);
  s = parseInt(array[2], 10);
  f = parseInt(array[3], 10);

  var second = (f + ( (s + (m * 60) + (h * 3600) ) * Math.round(24) ))/24;

  return second;
}

/**
 * Converts footage to seconds. Assumes 24 fps.
 *
 * @customfunction
 */
function feet2sec(input) {
  var sec = (input*16) / 24;

  return sec;
}

/**
 * Converts seconds to footage. Assumes 24 fps.
 *
 * @customfunction
 */
function sec2feet(input) {
  var feet = (input*24) / 16;

  return feet;
}

/**
 * Converts frames to timecode. Assumes 24 fps.
 *
 * @customfunction
 */
function frames2timecode(input) {
  var f = input % 24;
  var s = Math.floor(input / 24)
  var h = Math.floor(s / 3600);
  var m = Math.floor( (s / 60) % 60);
  var s = (s % 60);

  var timecode = ("00" + String(h)).slice(-2).concat( ":", ("00" + String(m)).slice(-2), ":", ("00" + String(s)).slice(-2), ":", ("00" + String(f)).slice(-2) );

  return timecode;
}

/**
 * Converts seconds to timecode. Assumes 24 fps.
 *
 * @customfunction
 */
function sec2timecode(input) {
  var frame = input * 24;

  return frames2timecode(frame);
}

/**
* Adds timecodes.

* @customfunction
*/
function add_timecode(input) {

}

/**
 * Multiplies the input value by 2.
 *
 * @param {number|Array<Array<number>>} input The value or range of cells
 *     to multiply.
 * @return The input multiplied by 2.
 * @customfunction
 */
function DOUBLE(input) {
  return Array.isArray(input) ?
      input.map(row => row.map(cell => cell * 4)) :
      input * 4;
}

/**
 * Subtract timecodes. input1 - input2
 *
 * @param Two cells containing HH:MM:SS:FF timecodes
 * @customfunction
 */
function subtract_timecode(input1, input2) {
  var frame = timecode2frames(input1) - timecode2frames(input2);
  return frames2timecode(frame);
}
