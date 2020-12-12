var passive = require('../passive');

describe('passive', function () {

  it('should detect passive voice', function () {
    expect(passive('He was judged.')).toEqual([{ index: 3, offset: 10 }]);
  });

  it('should detect passive voice over line breaks', function () {
    expect(passive('He was\njudged.')).toEqual([{ index: 3, offset: 10 }]);
  });

  it('should detect passive voice with irregular verbs', function () {
    expect(passive('She was given an apple.')).toEqual([{ index: 4, offset: 9 }]);
  });

  it('should not mark "is indeed" as passive', function () {
    expect(passive('This sentence is indeed active.')).toEqual([]);
  });

  it('should not mark passive voice in "by" mode', function () {
    expect(passive('The mixture was heated to 300°C.', { by: true })).toEqual([]);
  });

  it('should mark passive voice followed by "by" in "by" mode', function () {
    expect(passive('The mixture was heated by the apparatus to 300°C.', { by: true })).
        toEqual([{ index : 12, offset : 13 }]);
  });

  it('should work with half-space', function () {
    expect(passive("The mixture was " + String.fromCharCode(8204)+  "heated to 300°C.")).
        toEqual([{ index : 12, offset : 11 }]);
  });

  it('should work with half-space in "by" mode', function () {
    expect(passive("The mixture was heated " + String.fromCharCode(8204)+  "by the apparatus to 300°C.", { by: true })).
        toEqual([{ index : 12, offset : 14 }]);
  });

});
