import should from 'should'
import MarSummary, { MS } from '../mar-summary'
import { getSchedule } from '../mar-today'
import MedOrder from '../med-order'

const constantValues = [
  'medOrder',
  'empty',
  'mar',
  'Administered',
  'Not scheduled',
  'medication',
  'administered',
  'notApplicable',
]

const mockedEmptyCell = {
  type: 'empty',
  value: {}
}

const mockedScheduledCell = {
  type: 'medOrder',
  value: {
    
    name: 'name',
    profession: 'profession',
    day: '0',
    time: '12:00',
    medication: 'ag-amitriptyline',
    dose: 'asd',
    route: 'Oral',
    startMeds: 'startMeds',
    endMeds: 'endMeds',
    administration: 'sched',
    scheduled: 'TID',
    instructions: 'instructions',
    reason: 'reason',
    notes: 'notes',
  }
}

const mockedAdministeredCell = {
  type: 'mar',
  value: {
    _data: {
      whoAdministered: 'asd',
      day: 1,
      actualTime: '12:00',
      comment: 'asd',
      scheduledTime: '08:00',
      medications: [
        {
          _data: {
            medication: 'ag-amitriptyline',
            route: 'Oral',
            reason: 'asd'
          },
          _scheduleTimes: []
        }
      ]
    }
  }
}


let marSummary

describe('testing mar-summary constants', () => {
  it('MS', () => {
    Object.keys(MS).map((key, index) => {
      should.exist(MS[key])
      MS[key].should.equal(constantValues[index])
    })
  }) 
})

describe('mar-summary testing', () => {
  it('Properly instantiates the class', () => {
    marSummary = new MarSummary()
    should.exist(marSummary)
  })

  it.skip('summaryRefresh', () => {
    const result = marSummary.summaryRefresh(marRecords, medOrders)
    should.exist(result)
  })


  it('marCellContent | has medOrder', () => {
    const result = marSummary.marCellContent(mockedScheduledCell)
    const { medication, route, reason } = mockedScheduledCell.value
    should.exist(result)
    result.should.equal(`${medication}, ${route}, ${reason}`)
  })
  
  it('marCellContent | has MAR', () => {
    const result = marSummary.marCellContent(mockedAdministeredCell)
    should.exist(result)
    result.should.equal(MS.DISPLAYED_WHEN_MAR)
  })

  it('marCellContent | empty cell (no MAR)', () => {
    const result = marSummary.marCellContent(mockedEmptyCell)
    should.exist(result)
    result.should.equal(MS.DISPLAYED_WHEN_NO_MAR)
  })

  
  it('marCellStyle | has medOrder', () => {
    const result = marSummary.marCellStyle(mockedScheduledCell)
    should.exist(result)
    result.should.equal(MS.CSS_CLASS_MED)
  })
  
  it('marCellStyle | has MAR', () => {
    const result = marSummary.marCellStyle(mockedAdministeredCell)
    should.exist(result)
    result.should.equal(MS.CSS_CLASS_MAR)
  })

  it('marCellStyle | empty cell (no MAR)', () => {
    const result = marSummary.marCellStyle(mockedEmptyCell)
    should.exist(result)
    result.should.equal(MS.CSS_CLASS_NO_MAR)
  })
})