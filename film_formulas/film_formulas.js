// TIME CALCULATIONS
// assumes 24 fps

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

function feet2sec(input) {
  var sec = (input*16) / 24;

  return sec;
}

function sec2feet(input) {
  var feet = (input*24) / 16;

  return feet;
}

function frames2timecode(input) {
  var f = input % 24;
  var s = Math.floor(input / 24)
  var h = Math.floor(s / 3600);
  var m = Math.floor( (s / 60) % 60);
  var s = (s % 60);

  var timecode = ("00" + String(h)).slice(-2).concat( ":", ("00" + String(m)).slice(-2), ":", ("00" + String(s)).slice(-2), ":", ("00" + String(f)).slice(-2) );

  return timecode;
}

function sec2timecode(input) {
  var frame = input * 24;

  return frames2timecode(frame);
}
