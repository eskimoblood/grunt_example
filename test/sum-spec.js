buster.spec.expose();
describe('sum', function() {
  it('add the passing args', function() {
    assert.equals(sum(4, 2), 6);
  });
});