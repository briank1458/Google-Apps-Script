function snapshotv2() {

  // setting some variables
  var spreadsheetId = DriveApp.getFileById(SpreadsheetApp.getActiveSpreadsheet().getId());
  var destinationFolderId = "154XnOwnTaS0ympP5od3hJyh7mbIJhhT5"; // Set the folder ID here.

  var destinationFolder = DriveApp.getFolderById(destinationFolderId);

  // grabbing the time and formatting for copied file name
  var timeZone = Session.getScriptTimeZone();
  var formattedDate = Utilities.formatDate(new Date(), timeZone, "yyyy-MM-dd' 'HH:mm:ss");

  // copy each sheet in the source Spreadsheet by removing the formulas as the temporal sheets.
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var tempSheets = ss.getSheets().map(function(sheet) {
    console.log(sheet.getSheetName());
    var srcSheetName = sheet.getSheetName();
    var srcData = sheet.getDataRange();
    var tmpSheet = ss.insertSheet().setName(srcSheetName + "_temp");
    srcData.copyTo(tmpSheet.getRange(1,1), {contentsOnly: true});
    return tmpSheet;
});

  // copy the source Spreadsheet.
  var copiedFile = ss.copy(ss.getName() + " Copy " + formattedDate);

  // delete the temporary sheets in the source Spreadsheet.
  tempSheets.forEach(function(sheet) {ss.deleteSheet(sheet)});

  // delete the original sheets from the copied Spreadsheet and rename the copied sheets.
  copiedFile.getSheets().forEach(function(sheet) {
    var sheetName = sheet.getSheetName();
    if (sheetName.indexOf("_temp") == -1) {
      copiedFile.deleteSheet(sheet);
    }
  //   else {
  //     sheet.setName(sheetName.slice(0, -5));
  // }
});

  // move file to the destination folder.
  var file = DriveApp.getFileById(copiedFile.getId());
  destinationFolder.addFile(file);
  file.getParents().next().removeFile(file);
}
