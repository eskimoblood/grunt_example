buster.spec.expose();
describe('doubleIt', function() {
  it('doubles the input', function() {
    assert.equals(doubleIt(4), 8);
  });
});