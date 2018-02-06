var Meeting = require('../models/meeting.model');
var operationService = require('../services/operation.service');

function getAllMeeting() {
    return new Promise(function(resolve, reject) {
      Meeting.find({}).sort({date : '-1'}).lean()
      .exec(function (err, meetings) {
          if (err) reject(err);
          else resolve(meetings);
      })
  }) 
}

function addMeeting(params) {
  return new Promise(function(resolve, reject) {
    let newMeeting = {}
    newMeeting.date = params.date
    newMeeting.meetingData = []
    operationService.getAllOperation()
    .then(operations => {
      var d = new Date();
      var m = d.getMonth();
      var y = d.getFullYear();
      operations.forEach(element => {
        let newOperation = {} 
        newOperation.name = element
        newOperation.capa = []
        newOperation.capaMax = []
        newOperation.forecasts = []
        newOperation.done = []
        newOperation.stock = []
        newOperation.data = []

        for (var i = 0; i < params.params.nextMonth; i++) {
          let tempDate = new Date(y, m+i+1, 1)
          console.log(tempDate)
          let month = new Date(y, m+i, 1).toLocaleString('fr-fr', {year: 'numeric', month: "numeric" })
          console.log(new Date(y, m+i, 2))
          let workingDay = workingDaysBetweenDates(new Date(y, m+i, 2), tempDate)
          newOperation.data.push({month: month, workingDay: workingDay, teamNbHour: 8, teamNb: 1, capa: (workingDay * 8), workingDayMax: workingDay, teamNbHourMax: 8, teamNbMax: 1, capaMax: (workingDay * 8)})
          //newOperation.capaMax.push({month: month, workingDay: workingDay, teamNbHour: 8, teamNb: 1, capa: (workingDay * 8)})
        }
        newMeeting.meetingData.push(newOperation)
      });
      new Meeting(newMeeting)
      .save(function (err, meetings) {
          if (err) reject(err);
          else resolve(meetings);
      })
    })
    .catch(err => {
      reject(err)
    })
  }) 
}

function workingDaysBetweenDates(startDate, endDate) {
  
  // Validate input
  if (endDate < startDate)
      return 0;
  
  // Calculate days between dates
  var millisecondsPerDay = 86400 * 1000; // Day in milliseconds
  startDate.setHours(0,0,0,1);  // Start just after midnight
  endDate.setHours(23,59,59,999);  // End just before midnight
  var diff = endDate - startDate;  // Milliseconds between datetime objects    
  var days = Math.ceil(diff / millisecondsPerDay);
  
  // Subtract two weekend days for every week in between
  var weeks = Math.floor(days / 7);
  days = days - (weeks * 2);

  // Handle special cases
  var startDay = startDate.getDay();
  var endDay = endDate.getDay();
  
  // Remove weekend not previously removed.   
  if (startDay - endDay > 1)         
      days = days - 2;      
  
  // Remove start day if span starts on Sunday but ends before Saturday
  if (startDay == 0 && endDay != 6)
      days = days - 1  
          
  // Remove end day if span ends on Saturday but starts after Sunday
  if (endDay == 6 && startDay != 0)
      days = days - 1  
  
  return days;
}

function deleteMeeting(params) {
  return new Promise(function(resolve, reject) {
    Meeting.deleteMany({ _id: params.toDelete })
    .exec(function (err, meeting) {
        if (err) reject(err);
        else resolve(meeting);
    })
}) 
}

////////////////////////////////////////////

var self = {
    getAllMeeting: getAllMeeting,
    addMeeting: addMeeting,
    deleteMeeting: deleteMeeting
};

module.exports = self;