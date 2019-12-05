import { Wire, Coordinate, OrthogonalSegment, Segment, Axis } from "./interfaces";
import { convertWireToOrthogonalSegmentList } from "./convert-wire-to-orthogonal-segment-list";

describe ('convertWireToOrthogonalSegmentList', function() {
  const testData = [
    {
      wire: ["R13","U2"],
      correctOutput: [
        {
          coordinate1: {x:0, y:0},
          coordinate2: {x:13, y:0},
          axis: Axis.X
        },
        {
          coordinate1: {x:13, y:0},
          coordinate2: {x:13, y:2},
          axis: Axis.Y
        }
      ]
    }
  ]

  for (let testDatum of testData) {
    it(`should convert a Wire to a list of OrthogonalSegments with wire 
        ${testDatum.wire}`, function() {
      const result = convertWireToOrthogonalSegmentList(testDatum.wire);
      expect(result).toEqual(testDatum.correctOutput);
    });
  }
});
