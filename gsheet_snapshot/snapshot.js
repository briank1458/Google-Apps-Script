function snapshot() {

  // setting some variables
  var spreadsheetId = DriveApp.getFileById(SpreadsheetApp.getActiveSpreadsheet().getId());
  var destinationFolderId = "1DapIhsudi6an_H0EG75Fog9x2uShPqV6"; // Set the folder ID here.

  var destinationFolder = DriveApp.getFolderById(destinationFolderId);

  // grabbing the time and formatting for copied file name
  var timeZone = Session.getScriptTimeZone();
  var formattedDate = Utilities.formatDate(new Date(), timeZone, "yyyy-MM-dd' 'HH:mm:ss");

  // copy each sheet in the source Spreadsheet by removing the formulas as the temporal sheets.
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var tempSheets = ss.getSheets().map(function(sheet) {
    var dstSheet = sheet.copyTo(ss).setName(sheet.getSheetName() + "_temp");
    var src = dstSheet.getDataRange();
    src.copyTo(src, {contentsOnly: true});
    return dstSheet;
});

  // copy the source Spreadsheet.
  var copiedFile = ss.copy(ss.getName() + " Copy " + formattedDate);

  // delete the temporary sheets in the source Spreadsheet.
  tempSheets.forEach(function(sheet) {ss.deleteSheet(sheet)});

  // delete the original sheets from the copied Spreadsheet and rename the copied sheets.
  copiedFile.getSheets().forEach(function(sheet) {
    var sheetName = sheet.getSheetName();
    if (sheetName.indexOf("_temp") == -1) {
      copiedFile.deleteSheet(sheet);}
    // else {
    //   sheet.setName(sheetName.slice(0, -5));
    //   }
});

  // move file to the destination folder.
  var file = DriveApp.getFileById(copiedFile.getId());
  destinationFolder.addFile(file);
  file.getParents().next().removeFile(file);
}
