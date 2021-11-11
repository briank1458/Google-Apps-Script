// TIMECODE CALCULATIONS
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

function timecode2seconds(input) {
  input = input.toString()

  var array = [{}];

  array = input.toString().split(":");

  h = parseInt(array[0], 10);
  m = parseInt(array[1], 10);
  s = parseInt(array[2], 10);
  f = parseInt(array[3], 10);

  var frame = (f + ( (s + (m * 60) + (h * 3600) ) * Math.round(24) ))/24;

  return frame;
}
